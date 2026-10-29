import { setTimeout as sleep } from "node:timers/promises";

import type { Database } from "#/db/client.server";
import { searchWords } from "#/lib/persian-text";
import { fromJalali, toJalali } from "#/lib/university/semester";
import {
  ARCHIVE_KINDS,
  ARCHIVE_PAGE_SIZE,
  FEED_CATEGORIES,
  SOURCE_ORIGIN,
  type FeedCategory,
  type FeedKind,
} from "#/orpc/home-feed/constants";
import { EMPTY_BODY, type ArticleBlock } from "#/orpc/home-feed/article-body";
import type { ArchiveInput, ArchivePage, Article, FeedItem, HomeFeed, SyncSummary } from "#/orpc/home-feed/contract";
import {
  classifyListed,
  LISTING_PAGE_SIZE,
  LISTINGS,
  listingPageUrl,
  parseListingPage,
} from "#/orpc/home-feed/listing.server";
import { toArticle, toFeedItem, toListedItem } from "#/orpc/home-feed/mapper";
import { parseArticlePage, parseHomePage, type RawBlock } from "#/orpc/home-feed/parse.server";
import {
  archiveWhere,
  countArchive,
  countArchiveCategories,
  countArchiveDates,
  countArchiveKinds,
  findArchivePage,
  findArticlesByUrl,
  findArticlesWithoutPage,
  findArticleWithPage,
  findPlacedArticleIds,
  findPlacedArticles,
  findRelatedArticles,
  insertListedArticles,
  replacePlacements,
  updateArticle,
  upsertArticles,
  type ArchiveFilter,
  type FeedArticleRecord,
  type NewFeedArticle,
} from "#/orpc/home-feed/repository";
import { getLocale } from "#/paraglide/runtime";
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

/*===== Archive =====*/
// Years are the visitor's: Jalali on the Persian site (1404 runs from March 2025 to March 2026), Gregorian on the
// English one. Dates are stored Gregorian, so a Jalali year is a range of them.

type Calendar = "jalali" | "gregorian";

function requestCalendar(): Calendar {
  return getLocale() === "fa" ? "jalali" : "gregorian";
}

/** The year an ISO date falls in. */
function yearOf({ iso, calendar }: { iso: string; calendar: Calendar }): number {
  const date = new Date(`${iso}T12:00:00Z`);
  return calendar === "jalali" ? toJalali(date)[0] : date.getUTCFullYear();
}

const isoDay = (date: Date) => date.toISOString().slice(0, 10);

/** A year's first day and the next year's, as ISO dates. */
function yearRange({ year, calendar }: { year: number; calendar: Calendar }): { from: string; to: string } {
  if (calendar === "gregorian") return { from: `${year}-01-01`, to: `${year + 1}-01-01` };
  return { from: isoDay(fromJalali([year, 1, 1])), to: isoDay(fromJalali([year + 1, 1, 1])) };
}

/** A search's words as the stored text has them: Persian digits, ZWNJs read as spaces (`searchWords`). */
function archiveWords(query: string | undefined): string[] {
  return searchWords(query ?? "").map((word) =>
    word.replace(/[0-9]/g, (digit) => String.fromCharCode(0x06f0 + Number(digit))),
  );
}

/**
 * One page of the archive with what each filter's options would show. Each facet is counted with the other filters
 * applied but not its own, so a visitor sees how many they'd get by switching to it.
 */
export async function listArchive({ db, input }: { db: Database; input: ArchiveInput }): Promise<ArchivePage> {
  const calendar = requestCalendar();
  const filter: ArchiveFilter = {
    kind: input.kind,
    category: input.category,
    words: archiveWords(input.q),
    published: input.year === undefined ? undefined : yearRange({ year: input.year, calendar }),
  };
  const where = archiveWhere({ filter });
  const page = input.page ?? 1;

  const [total, rows, kinds, categories, dates] = await Promise.all([
    countArchive({ db, where }),
    findArchivePage({
      db,
      where,
      oldestFirst: input.sort === "oldest",
      limit: ARCHIVE_PAGE_SIZE,
      offset: (page - 1) * ARCHIVE_PAGE_SIZE,
    }),
    countArchiveKinds({ db, where: archiveWhere({ filter, except: "kind" }) }),
    countArchiveCategories({ db, where: archiveWhere({ filter, except: "category" }) }),
    countArchiveDates({ db, where: archiveWhere({ filter, except: "published" }) }),
  ]);

  const years = new Map<number, number>();
  for (const row of dates) {
    if (!row.publishedOn) continue;
    const year = yearOf({ iso: row.publishedOn, calendar });
    years.set(year, (years.get(year) ?? 0) + row.count);
  }

  return {
    items: rows.map(toListedItem),
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / ARCHIVE_PAGE_SIZE)),
    pageSize: ARCHIVE_PAGE_SIZE,
    facets: {
      // In the constants' order, which is the order the page shows them in.
      kinds: ARCHIVE_KINDS.flatMap((value) => {
        const found = kinds.find((row) => row.value === value);
        return found ? [{ value, count: found.count }] : [];
      }),
      categories: FEED_CATEGORIES.flatMap((value) => {
        const found = categories.find((row) => row.value === value);
        return found ? [{ value, count: found.count }] : [];
      }),
      years: [...years].map(([value, count]) => ({ value, count })).toSorted((a, b) => b.value - a.value),
    },
  };
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

/*===== Archive Sync =====*/
// The homepage only shows the newest posts. The old site's listings (`listing.server.ts`) hold the rest, newest first:
// a run reads their first pages for what's new, stores what isn't stored yet, and adds the categories a listing gives
// to what is. It then reads the pages of a few articles still without a body, so the archive's links move to the
// article pages here a few at a time. The first run on a new server reads every listing page (`pnpm crawl:archive`).

export type ArchiveSyncSummary = {
  /** Posts on the listing pages read. */
  listed: number;
  added: number;
  /** Stored posts a listing gave another category. */
  retagged: number;
  /** Article pages read. */
  enriched: number;
  /** Listing pages that failed to load; the next run reads them again. */
  failedPages: number;
  durationMs: number;
};

/** The most article pages a timed run reads; the backlog after a full listing read drains over the following runs. */
const MAX_ARCHIVE_PAGES_PER_RUN = 20;

/** A listed post, checked, with where the archive files it. */
type ListedPost = { item: FeedItemInput; kind: FeedKind; category: FeedCategory; topics: Set<FeedCategory> };

/**
 * Reads the listings' first `listingPages` pages each (all of them with `Infinity`), stops at the first short page.
 * A post on two listings keeps the first one's kind and gains the second's categories.
 */
async function readListings({
  fetchPage,
  listingPages,
  pauseMs,
}: {
  fetchPage: FetchPage;
  listingPages: number;
  pauseMs: number;
}): Promise<{ posts: Map<string, ListedPost>; failedPages: number }> {
  const posts = new Map<string, ListedPost>();
  let failedPages = 0;

  for (const listing of LISTINGS) {
    for (let page = 1; page <= listingPages; page++) {
      if (posts.size > 0 && pauseMs > 0) await sleep(pauseMs);
      let raws;
      try {
        raws = parseListingPage(await fetchPage(listingPageUrl({ listing, page })));
      } catch {
        failedPages++;
        break;
      }

      for (const raw of raws) {
        const parsed = parseFeedItem(raw);
        if (!parsed.ok) continue;
        const { kind, category, topics } = classifyListed({ listing, labels: raw.labels });
        const known = posts.get(parsed.item.url);
        if (known) {
          for (const topic of [category, ...topics]) if (topic !== known.category) known.topics.add(topic);
          continue;
        }
        posts.set(parsed.item.url, { item: parsed.item, kind, category, topics: new Set(topics) });
      }
      if (raws.length < LISTING_PAGE_SIZE) break;
    }
  }
  return { posts, failedPages };
}

/**
 * Reads one stored article's own page and stores what it says: the full title, the lead, the body, its date and the
 * old site's ID, which gives it a page here. A page that fails to load is touched instead, so the next runs try the
 * others first.
 *
 * @returns Whether the page loaded.
 */
async function enrichArticle({
  db,
  article,
  fetchPage,
  measure,
}: {
  db: Database;
  article: FeedArticleRecord;
  fetchPage: FetchPage;
  measure: Measure;
}): Promise<boolean> {
  const now = new Date();
  let page: ReadArticle | null;
  try {
    const raw = parseArticlePage(await fetchPage(article.url));
    const parsed = raw ? parseFeedArticle(raw) : null;
    const cover = article.imageUrl ?? parsed?.imageUrl ?? null;
    page = parsed ? await measured({ article: parsed, cover, measure }) : null;
  } catch {
    await updateArticle({ db, id: article.id, values: { updatedAt: now } });
    return false;
  }

  await updateArticle({
    db,
    id: article.id,
    values: page
      ? {
          title: { fa: page.title },
          summary: page.summary ? { fa: page.summary } : null,
          publishedOn: page.publishedOn ?? article.publishedOn,
          imageUrl: article.imageUrl ?? page.imageUrl,
          imageWidth: page.imageWidth,
          imageHeight: page.imageHeight,
          body: page.body,
          source: page.source,
          sourceAssetId: page.sourceAssetId ?? article.sourceAssetId,
          enrichedAt: now,
          updatedAt: now,
        }
      : // Loaded without an article in it: stored empty, so it isn't asked for again.
        { body: EMPTY_BODY, enrichedAt: now, updatedAt: now },
  });
  return true;
}

/**
 * Brings the archive up to date with the old site's listings, then reads the pages of up to `maxArticles` articles
 * still without one. Unlike the homepage's sync, nothing is replaced: posts are only added or given categories, and a
 * listing page that fails is counted and skipped.
 *
 * @param listingPages How many pages of each listing to read (1 on the timer: the newest 60 posts).
 * @param maxArticles The most article pages to read this run.
 * @param pauseMs The wait between pages, to go easy on the old site.
 */
export async function syncFeedArchive({
  db,
  fetchPage,
  measure,
  listingPages = 1,
  maxArticles = MAX_ARCHIVE_PAGES_PER_RUN,
  pauseMs = 300,
  onProgress,
}: {
  db: Database;
  fetchPage: FetchPage;
  measure: Measure;
  listingPages?: number;
  maxArticles?: number;
  pauseMs?: number;
  /** Called after each article page, for a long run's console. */
  onProgress?: (done: number) => void;
}): Promise<ArchiveSyncSummary> {
  const started = performance.now();

  /*------ Listings ------*/
  const { posts, failedPages } = await readListings({ fetchPage, listingPages, pauseMs });

  /*------ Store ------*/
  const urls = [...posts.keys()];
  const stored = new Map<string, FeedArticleRecord>();
  for (let start = 0; start < urls.length; start += 500) {
    for (const article of await findArticlesByUrl({ db, urls: urls.slice(start, start + 500) })) {
      stored.set(article.url, article);
    }
  }

  const added = [...posts.values()].filter((post) => !stored.has(post.item.url));
  await insertListedArticles({
    db,
    articles: added.map(({ item, kind, category, topics }) => ({
      url: item.url,
      kind,
      category,
      topics: [...topics],
      title: { fa: item.title },
      summary: null,
      publishedOn: item.publishedOn,
      imageUrl: item.imageUrl,
      sourceAssetId: null,
    })),
  });

  // A stored article keeps the kind and category it has (the homepage's block decides those), and gains the others.
  let retagged = 0;
  for (const post of posts.values()) {
    const article = stored.get(post.item.url);
    if (!article) continue;
    const topics = new Set(article.topics);
    for (const topic of [post.category, ...post.topics]) if (topic !== article.category) topics.add(topic);
    if (topics.size === article.topics.length) continue;
    await updateArticle({ db, id: article.id, values: { topics: [...topics] } });
    retagged++;
  }

  /*------ Article Pages ------*/
  let enriched = 0;
  const unread = await findArticlesWithoutPage({ db, limit: Number.isFinite(maxArticles) ? maxArticles : 100_000 });
  for (const [index, article] of unread.entries()) {
    if (index > 0 && pauseMs > 0) await sleep(pauseMs);
    if (await enrichArticle({ db, article, fetchPage, measure })) enriched++;
    onProgress?.(index + 1);
  }

  return {
    listed: posts.size,
    added: added.length,
    retagged,
    enriched,
    failedPages,
    durationMs: Math.round(performance.now() - started),
  };
}
