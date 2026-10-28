import { setTimeout as sleep } from "node:timers/promises";

import type { Database } from "#/db/client.server";
import { SOURCE_ORIGIN, type FeedCategory, type FeedKind } from "#/orpc/home-feed/constants";
import { EMPTY_BODY, type ArticleBlock } from "#/orpc/home-feed/article-body";
import type { Article, FeedItem, HomeFeed, SyncSummary } from "#/orpc/home-feed/contract";
import { toArticle, toFeedItem } from "#/orpc/home-feed/mapper";
import { parseArticlePage, parseHomePage, type RawBlock } from "#/orpc/home-feed/parse.server";
import {
  findArticlesByUrl,
  findArticleWithPage,
  findPlacedArticleIds,
  findPlacedArticles,
  findRelatedArticles,
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
const GROWTH_SHOWN = 3;
const COURSES_SHOWN = 3;

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
    growth: block("growth").slice(0, GROWTH_SHOWN),
    courses: block("event").slice(0, COURSES_SHOWN),
    // The old slider's first slide is the one it opens on: the newest occasion.
    occasion: block("occasion")[0] ?? null,
  };
}

/*===== Article =====*/
const RELATED_SHOWN = 3;

/** One article's page by the old site's ID, with the newest others of its kind and category. */
export async function getArticle({
  db,
  id,
}: {
  db: Database;
  id: string;
}): Promise<{ kind: "success"; article: Article } | { kind: "not-found" }> {
  // The old site's IDs are numbers; anything else can't name an article.
  if (!/^\d{1,20}$/.test(id)) return { kind: "not-found" };

  const article = await findArticleWithPage({ db, sourceAssetId: id });
  if (!article?.kind || !article.category) return { kind: "not-found" };

  const related = await findRelatedArticles({ db, article, limit: RELATED_SHOWN });
  return { kind: "success", article: toArticle({ article, related }) };
}

/*===== Sync =====*/
/** Reads a page of the old site as text. Throws when it can't (`source.server.ts`). */
export type FetchPage = (url: string) => Promise<string>;

/** Measures the old site's files (`source.server.ts`); null when it can't. */
export type Measure = {
  image: (url: string) => Promise<{ width: number; height: number } | null>;
  file: (url: string) => Promise<number | null>;
};

/** An article page's fields with its cover's size, measured when it was read. */
type ReadArticle = FeedArticleInput & { imageWidth: number | null; imageHeight: number | null };

type SyncResult = { kind: "success"; summary: SyncSummary } | { kind: "source-failed"; error: unknown };

/** The most article pages a timed run reads; the rest wait for the next run. */
const MAX_PAGES_PER_RUN = 40;

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

/**
 * Whether to read the article's own page this run: once for every article, for its body, full title and lead. A page
 * that loaded without them is stored with an empty body, so it isn't asked for again.
 */
function needsPage({ stored, refresh }: { stored?: FeedArticleRecord; refresh: boolean }) {
  return refresh || !stored?.body;
}

/**
 * The article with its photos and files measured: the cover, each body photo without a size in the page's markup,
 * and each attachment. One at a time, like the pages.
 */
async function measured({
  article,
  cover,
  measure,
}: {
  article: FeedArticleInput;
  cover: string | null;
  measure: Measure;
}): Promise<ReadArticle> {
  const content: ArticleBlock[] = [];
  for (const block of article.body.content) {
    if (block.type === "image" && (!block.attrs.width || !block.attrs.height)) {
      const size = await measure.image(block.attrs.src);
      content.push({ ...block, attrs: { ...block.attrs, width: size?.width ?? null, height: size?.height ?? null } });
    } else if (block.type === "attachment") {
      content.push({ ...block, attrs: { ...block.attrs, size: await measure.file(block.attrs.href) } });
    } else content.push(block);
  }
  const size = cover ? await measure.image(cover) : null;
  return {
    ...article,
    body: { type: "doc", content },
    imageWidth: size?.width ?? null,
    imageHeight: size?.height ?? null,
  };
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
  page: ReadArticle | null | undefined;
  now: Date;
}): NewFeedArticle {
  const { item, placements } = listed;
  // What an earlier run read from the article's page outranks the homepage, so a title doesn't flip between the two
  // from run to run: the page's is the full one, and its summary the lead rather than the homepage's teaser. An edit
  // made on the old site later shows after a `refresh`.
  const earlier = stored?.enrichedAt ? stored : undefined;
  const title = page?.title ?? earlier?.title.fa ?? item.title;
  const summary = page?.summary ?? earlier?.summary?.fa ?? item.summary;

  const imageUrl = item.imageUrl ?? page?.imageUrl ?? stored?.imageUrl ?? null;
  // A size belongs to the photo it was measured on: the one stored is kept only while the photo stays the same.
  const keptSize = page === undefined && stored?.imageUrl === imageUrl;
  // What it is: the first block listing it, in the old homepage's order (a story that is also an achievement is news).
  const [first] = placements;

  return {
    url: item.url,
    kind: first?.kind ?? stored?.kind ?? null,
    category: first?.category ?? stored?.category ?? null,
    title: { fa: title },
    summary: summary ? { fa: summary } : null,
    publishedOn: item.publishedOn ?? page?.publishedOn ?? stored?.publishedOn ?? null,
    imageUrl,
    imageWidth: page ? page.imageWidth : keptSize ? (stored?.imageWidth ?? null) : null,
    imageHeight: page ? page.imageHeight : keptSize ? (stored?.imageHeight ?? null) : null,
    body: page === undefined ? (stored?.body ?? null) : (page?.body ?? EMPTY_BODY),
    source: page === undefined ? (stored?.source ?? null) : (page?.source ?? null),
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
    row.imageUrl !== stored.imageUrl ||
    row.source !== stored.source ||
    JSON.stringify(row.body) !== JSON.stringify(stored.body)
  );
}

/*------ Run ------*/
/**
 * Mirrors the old homepage's blocks into the feed: reads the homepage, reads the pages of articles it hasn't seen
 * (for the full title, lead and body), then in one transaction stores the articles and replaces every placement. An
 * article the homepage drops keeps its row, so its page here keeps working; only its placements go.
 *
 * An article page that fails to load keeps the homepage's values and is tried again on the next run. A homepage that
 * fails to load or parse changes nothing: the home page keeps the last good feed.
 *
 * @param refresh Reads every listed article's page again, for edits made on the old site after it was first read.
 * @param measure Measures the photos and files of each article page read.
 * @param maxPages The most article pages to read this run (40); the rest wait for the next.
 * @param pauseMs The wait between article pages, to go easy on the old site.
 */
export async function syncHomeFeed({
  db,
  fetchPage,
  measure,
  refresh = false,
  maxPages = MAX_PAGES_PER_RUN,
  pauseMs = 300,
}: {
  db: Database;
  fetchPage: FetchPage;
  measure: Measure;
  refresh?: boolean;
  maxPages?: number;
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
  const pages = new Map<string, ReadArticle | null>();
  const toRead = [...listed.values()]
    .filter((entry) => needsPage({ stored: stored.get(entry.item.url), refresh }))
    .slice(0, maxPages);

  for (const [index, entry] of toRead.entries()) {
    if (index > 0 && pauseMs > 0) await sleep(pauseMs);
    try {
      const raw = parseArticlePage(await fetchPage(entry.item.url));
      const page = raw ? parseFeedArticle(raw) : null;
      const cover = entry.item.imageUrl ?? page?.imageUrl ?? null;
      pages.set(entry.item.url, page ? await measured({ article: page, cover, measure }) : null);
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
    const placedBefore = await findPlacedArticleIds({ db: tx });
    const ids = await upsertArticles({ db: tx, articles: rows, now });
    const placements = [...listed.values()].flatMap((entry) => {
      const articleId = ids.get(entry.item.url);
      return articleId ? entry.placements.map((placement) => ({ ...placement, articleId })) : [];
    });
    await replacePlacements({ db: tx, placements });
    const placedNow = new Set(placements.map((placement) => placement.articleId));
    return [...placedBefore].filter((id) => !placedNow.has(id)).length;
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
