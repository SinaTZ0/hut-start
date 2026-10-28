import { setTimeout as sleep } from "node:timers/promises";

import type { Database } from "#/db/client.server";
import { SOURCE_ORIGIN, type FeedCategory, type FeedKind } from "#/orpc/home-feed/constants";
import type { FeedItem, HomeFeed, SyncSummary } from "#/orpc/home-feed/contract";
import { toFeedItem } from "#/orpc/home-feed/mapper";
import { parseArticlePage, parseHomePage, type RawBlock } from "#/orpc/home-feed/parse.server";
import {
  deleteUnplacedArticles,
  findArticlesByUrl,
  findPlacedArticles,
  replacePlacements,
  upsertArticles,
  type FeedArticleRecord,
  type NewFeedArticle,
} from "#/orpc/home-feed/repository";
import {
  type FeedArticleInput,
  type FeedItemInput,
  parseFeedArticle,
  parseFeedItem,
} from "#/orpc/home-feed/validation";

/*===== Read =====*/
const NEWS_SHOWN = 5;
const LATEST_NOTICES_SHOWN = 20;
const CATEGORY_NOTICES_SHOWN = 10;
const ACHIEVEMENTS_SHOWN = 3;
const GROWTH_SHOWN = 2;
const EVENTS_SHOWN = 1;

/** Newest first; undated items after the dated ones, in their block's order. */
function byDateDescending(a: FeedItem, b: FeedItem): number {
  if (a.publishedOn === b.publishedOn) return 0;
  if (!a.publishedOn) return 1;
  if (!b.publishedOn) return -1;
  return a.publishedOn < b.publishedOn ? 1 : -1;
}

/**
 * Everything the home page's feed blocks show, in the request's locale. With nothing synced yet every list is empty,
 * and the spotlight and the occasion null.
 */
export async function getHomeFeed({ db }: { db: Database }): Promise<HomeFeed> {
  const items = (await findPlacedArticles({ db })).map(toFeedItem);
  const block = (kind: FeedKind, category?: FeedCategory) =>
    items.filter((item) => item.kind === kind && (!category || item.category === category));

  // A notice listed under two tabs is one row in the latest list.
  const notices = block("notice");
  const latest = [...new Map(notices.map((item) => [item.id, item])).values()].toSorted(byDateDescending);

  return {
    news: block("news").slice(0, NEWS_SHOWN),
    notices: {
      latest: latest.slice(0, LATEST_NOTICES_SHOWN),
      education: block("notice", "education").slice(0, CATEGORY_NOTICES_SHOWN),
      graduate: block("notice", "graduate").slice(0, CATEGORY_NOTICES_SHOWN),
      student: block("notice", "student").slice(0, CATEGORY_NOTICES_SHOWN),
      industry: block("notice", "industry").slice(0, CATEGORY_NOTICES_SHOWN),
      openEducation: block("notice", "openEducation").slice(0, CATEGORY_NOTICES_SHOWN),
    },
    spotlight: block("notice", "student").find((item) => item.imageUrl) ?? null,
    achievements: block("achievement").slice(0, ACHIEVEMENTS_SHOWN),
    learning: [...block("growth").slice(0, GROWTH_SHOWN), ...block("event").slice(0, EVENTS_SHOWN)],
    // The old slider's first slide is the one it opens on: the newest occasion.
    occasion: block("occasion")[0] ?? null,
  };
}

/*===== Sync =====*/
/** Reads a page of the old site as text. Throws when it can't (`source.server.ts`). */
export type FetchPage = (url: string) => Promise<string>;

type SyncResult = { kind: "success"; summary: SyncSummary } | { kind: "source-failed"; error: unknown };

/** The most article pages one run reads; the rest wait for the next run. */
const MAX_PAGES_PER_RUN = 40;

/** These blocks show a summary and a date, and the old homepage cuts their titles short. */
const KINDS_NEEDING_PAGE: ReadonlySet<FeedKind> = new Set(["news", "achievement", "growth", "event"]);

/** An article the homepage lists, with every block it's in. */
type Listed = { item: FeedItemInput; placements: { kind: FeedKind; category: FeedCategory; position: number }[] };

/*------ Steps ------*/
/**
 * Validates each block's items and groups them by article: one story can be in two blocks. The first listing's
 * values are kept, except a full title wins over a cut-short one.
 *
 * @throws When a block that isn't optional has no valid item left: something changed on the old site.
 */
function listArticles(blocks: RawBlock[]): Map<string, Listed> {
  const listed = new Map<string, Listed>();

  for (const block of blocks) {
    let position = 0;
    for (const raw of block.items) {
      const parsed = parseFeedItem(raw);
      if (!parsed.ok) continue;

      const { item } = parsed;
      const placement = { kind: block.kind, category: block.category, position: position++ };
      const known = listed.get(item.url);
      if (!known) {
        listed.set(item.url, { item, placements: [placement] });
        continue;
      }
      if (known.item.cutShort && !item.cutShort) known.item = { ...known.item, title: item.title, cutShort: false };
      if (!known.placements.some((p) => p.kind === block.kind && p.category === block.category)) {
        known.placements.push(placement);
      }
    }
    if (position === 0 && !block.optional) {
      throw new Error(`Old homepage block ${block.instance} (${block.kind}) has no valid items`);
    }
  }
  return listed;
}

/** Whether to read the article's own page this run. */
function needsPage({ listed, stored, refresh }: { listed: Listed; stored?: FeedArticleRecord; refresh: boolean }) {
  if (stored?.enrichedAt && !refresh) return false;
  return listed.item.cutShort || listed.placements.some((placement) => KINDS_NEEDING_PAGE.has(placement.kind));
}

/**
 * The row to store: the article page's values where it was read, else the homepage's, else what's stored. `page` is
 * undefined when it wasn't read this run, and null when it loaded without the fields (it isn't asked for again).
 */
function articleRow({
  listed,
  stored,
  page,
  now,
}: {
  listed: Listed;
  stored?: FeedArticleRecord;
  page: FeedArticleInput | null | undefined;
  now: Date;
}): NewFeedArticle {
  const { item } = listed;
  // What an earlier run read from the article's page outranks the homepage, so a title doesn't flip between the two
  // from run to run: the page's is the full one, and its summary the lead rather than the homepage's teaser. An edit
  // made on the old site later shows after a `refresh`.
  const earlier = stored?.enrichedAt ? stored : undefined;
  const title = page?.title ?? earlier?.title.fa ?? item.title;
  const summary = page?.summary ?? earlier?.summary?.fa ?? item.summary;

  return {
    url: item.url,
    title: { fa: title },
    summary: summary ? { fa: summary } : null,
    publishedOn: item.publishedOn ?? page?.publishedOn ?? stored?.publishedOn ?? null,
    imageUrl: item.imageUrl ?? page?.imageUrl ?? stored?.imageUrl ?? null,
    sourceAssetId: page?.sourceAssetId ?? item.sourceAssetId ?? stored?.sourceAssetId ?? null,
    enrichedAt: page === undefined ? (stored?.enrichedAt ?? null) : now,
  };
}

/** Whether storing `row` changes what the page shows. */
function changes({ row, stored }: { row: NewFeedArticle; stored: FeedArticleRecord }): boolean {
  return (
    row.title.fa !== stored.title.fa ||
    (row.summary?.fa ?? null) !== (stored.summary?.fa ?? null) ||
    row.publishedOn !== stored.publishedOn ||
    row.imageUrl !== stored.imageUrl
  );
}

/*------ Run ------*/
/**
 * Mirrors the old homepage's blocks into the feed: reads the homepage, reads the pages of articles it hasn't seen
 * (for the full title and summary), then in one transaction stores the articles, replaces every placement and drops
 * the articles nothing shows any more.
 *
 * An article page that fails to load keeps the homepage's values and is tried again on the next run. A homepage that
 * fails to load or parse changes nothing: the home page keeps the last good feed.
 *
 * @param refresh Reads every listed article's page again, for edits made on the old site after it was first read.
 * @param pauseMs The wait between article pages, to go easy on the old site.
 */
export async function syncHomeFeed({
  db,
  fetchPage,
  refresh = false,
  pauseMs = 300,
}: {
  db: Database;
  fetchPage: FetchPage;
  refresh?: boolean;
  pauseMs?: number;
}): Promise<SyncResult> {
  const started = performance.now();

  /*------ Homepage ------*/
  let listed: Map<string, Listed>;
  try {
    listed = listArticles(parseHomePage(await fetchPage(`${SOURCE_ORIGIN}/`)));
  } catch (error) {
    return { kind: "source-failed", error };
  }

  /*------ Article Pages ------*/
  const stored = new Map(
    (await findArticlesByUrl({ db, urls: [...listed.keys()] })).map((article) => [article.url, article]),
  );
  const pages = new Map<string, FeedArticleInput | null>();
  const toRead = [...listed.values()]
    .filter((entry) => needsPage({ listed: entry, stored: stored.get(entry.item.url), refresh }))
    .slice(0, MAX_PAGES_PER_RUN);

  for (const [index, entry] of toRead.entries()) {
    if (index > 0 && pauseMs > 0) await sleep(pauseMs);
    try {
      const page = parseArticlePage(await fetchPage(entry.item.url));
      pages.set(entry.item.url, page ? parseFeedArticle(page) : null);
    } catch {
      // Left unread: the homepage's values are stored, and the next run tries again.
    }
  }

  /*------ Store ------*/
  const now = new Date();
  const rows = [...listed.values()].map((entry) =>
    articleRow({ listed: entry, stored: stored.get(entry.item.url), page: pages.get(entry.item.url), now }),
  );
  const added = rows.filter((row) => !stored.has(row.url)).length;
  const updated = rows.filter((row) => {
    const before = stored.get(row.url);
    return before !== undefined && changes({ row, stored: before });
  }).length;

  const removed = await db.transaction(async (tx) => {
    const ids = await upsertArticles({ db: tx, articles: rows, now });
    const placements = [...listed.values()].flatMap((entry) => {
      const articleId = ids.get(entry.item.url);
      return articleId ? entry.placements.map((placement) => ({ ...placement, articleId })) : [];
    });
    await replacePlacements({ db: tx, placements });
    return deleteUnplacedArticles({ db: tx });
  });

  return {
    kind: "success",
    summary: {
      added,
      updated,
      removed,
      enriched: pages.size,
      durationMs: Math.round(performance.now() - started),
    },
  };
}
