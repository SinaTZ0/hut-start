import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  inArray,
  isNotNull,
  isNull,
  lt,
  ne,
  notInArray,
  or,
  sql,
  type SQL,
} from "drizzle-orm";

import type { Database } from "#/db/client.server";
import { feedArticle, feedPlacement } from "#/db/schema";
import { ARCHIVE_KINDS, type ArchiveKind, type FeedCategory } from "#/orpc/home-feed/constants";

/*===== Types =====*/
export type FeedArticleRecord = typeof feedArticle.$inferSelect;
export type FeedPlacementRecord = typeof feedPlacement.$inferSelect;

export type NewFeedArticle = Pick<
  typeof feedArticle.$inferInsert,
  | "url"
  | "kind"
  | "category"
  | "title"
  | "summary"
  | "publishedOn"
  | "imageUrl"
  | "imageWidth"
  | "imageHeight"
  | "body"
  | "source"
  | "sourceAssetId"
  | "enrichedAt"
>;

export type NewFeedPlacement = Omit<typeof feedPlacement.$inferInsert, "id">;

/** A placement with its article. */
export type PlacedArticle = { placement: FeedPlacementRecord; article: FeedArticleRecord };

/*===== Reads =====*/
export function findArticlesByUrl({ db, urls }: { db: Database; urls: string[] }): Promise<FeedArticleRecord[]> {
  if (urls.length === 0) return Promise.resolve([]);
  return db.select().from(feedArticle).where(inArray(feedArticle.url, urls));
}

/** Every placement with its article, each block in its order. The feed is a few dozen rows. */
export function findPlacedArticles({ db }: { db: Database }): Promise<PlacedArticle[]> {
  return db
    .select({ placement: feedPlacement, article: feedArticle })
    .from(feedPlacement)
    .innerJoin(feedArticle, eq(feedPlacement.articleId, feedArticle.id))
    .orderBy(asc(feedPlacement.kind), asc(feedPlacement.category), asc(feedPlacement.position));
}

/** The IDs of the articles some block shows. */
export async function findPlacedArticleIds({ db }: { db: Database }): Promise<Set<string>> {
  const rows = await db.selectDistinct({ id: feedPlacement.articleId }).from(feedPlacement);
  return new Set(rows.map((row) => row.id));
}

/** The article with a page under the old site's ID: its body has been read. The newest, should two share it. */
export async function findArticleWithPage({
  db,
  sourceAssetId,
}: {
  db: Database;
  sourceAssetId: string;
}): Promise<FeedArticleRecord | undefined> {
  const [row] = await db
    .select()
    .from(feedArticle)
    .where(and(eq(feedArticle.sourceAssetId, sourceAssetId), isNotNull(feedArticle.body)))
    .orderBy(desc(feedArticle.updatedAt))
    .limit(1);
  return row;
}

/** The newest other articles of a kind and category, with a page or not. */
export function findRelatedArticles({
  db,
  article,
  limit,
}: {
  db: Database;
  article: Pick<FeedArticleRecord, "id" | "kind" | "category">;
  limit: number;
}): Promise<FeedArticleRecord[]> {
  if (!article.kind || !article.category) return Promise.resolve([]);
  return db
    .select()
    .from(feedArticle)
    .where(
      and(
        eq(feedArticle.kind, article.kind),
        eq(feedArticle.category, article.category),
        ne(feedArticle.id, article.id),
      ),
    )
    .orderBy(sql`${feedArticle.publishedOn} desc nulls last`, desc(feedArticle.createdAt))
    .limit(limit);
}

/** The newest articles of a category, kind any, for an office's notices. */
export function findLatestInCategory({
  db,
  category,
  limit,
}: {
  db: Database;
  category: string;
  limit: number;
}): Promise<(FeedArticleRecord & { kind: string; category: string })[]> {
  return db
    .select()
    .from(feedArticle)
    .where(and(eq(feedArticle.category, category), isNotNull(feedArticle.kind)))
    .orderBy(sql`${feedArticle.publishedOn} desc nulls last`, desc(feedArticle.createdAt))
    .limit(limit) as Promise<(FeedArticleRecord & { kind: string; category: string })[]>;
}

/*===== Archive =====*/
// The archive (`/news`) lists every stored article of the kinds in `ARCHIVE_KINDS`, the homepage's and the old site's
// listings' alike. Its filters are combined here; the service counts what each one would show.

export type ArchiveFilter = {
  kind?: ArchiveKind;
  category?: FeedCategory;
  /** Each a normalized word in Persian digits; an article must contain all of them. */
  words: string[];
  /** ISO dates, `to` excluded. */
  published?: { from: string; to: string };
};

/** A filter's facet: the same conditions without that one, so its options count what choosing them would show. */
export type ArchiveFacet = "kind" | "category" | "published";

/** `%`, `_` and `\` matched as themselves in a `like` pattern. */
function likeLiteral(value: string): string {
  return value.replace(/[\\%_]/g, (character) => `\\${character}`);
}

// Titles and leads are stored with Persian digits, but an editor sometimes kept Latin ones in a code (B2B): both are
// read as Persian for searching, like the words.
const SEARCHED_TEXT = sql`translate(
  lower(coalesce(${feedArticle.title} ->> 'fa', '') || ' ' || coalesce(${feedArticle.summary} ->> 'fa', '')),
  '0123456789‌',
  '۰۱۲۳۴۵۶۷۸۹ '
)`;

/** The conditions of `filter`, leaving out `except`'s. */
export function archiveWhere({ filter, except }: { filter: ArchiveFilter; except?: ArchiveFacet }): SQL | undefined {
  const { kind, category, words, published } = filter;
  return and(
    inArray(feedArticle.kind, [...ARCHIVE_KINDS]),
    isNotNull(feedArticle.category),
    kind && except !== "kind" ? eq(feedArticle.kind, kind) : undefined,
    category && except !== "category"
      ? or(eq(feedArticle.category, category), sql`${category} = any(${feedArticle.topics})`)
      : undefined,
    published && except !== "published"
      ? and(gte(feedArticle.publishedOn, published.from), lt(feedArticle.publishedOn, published.to))
      : undefined,
    ...words.map((word) => sql`${SEARCHED_TEXT} like ${`%${likeLiteral(word)}%`}`),
  );
}

/*===== New Students =====*/
// The old site tags nothing as being for new students, so they're found by what the posts say: «نودانشجو»,
// «نوورود», «جدیدالورود», «ورودی‌های جدید», «پذیرفته‌شدگان», each spelled with and without its spaces and ZWNJs (read
// as spaces in `SEARCHED_TEXT`).
const NEW_STUDENT_PATTERN = "(نو ?دانشجو|نو ?ورود|جدید ?ال ?ورود|ورودی( ?های)? جدید|پذیرفته ?شدگان)";

/** The newest archive posts addressed to new students: enrolment, their first days, their dorm and meals. */
export function findNewStudentArticles({
  db,
  limit,
}: {
  db: Database;
  limit: number;
}): Promise<(FeedArticleRecord & { kind: string; category: string })[]> {
  return db
    .select()
    .from(feedArticle)
    .where(
      and(
        inArray(feedArticle.kind, [...ARCHIVE_KINDS]),
        isNotNull(feedArticle.category),
        sql`${SEARCHED_TEXT} ~ ${NEW_STUDENT_PATTERN}`,
      ),
    )
    .orderBy(sql`${feedArticle.publishedOn} desc nulls last`, desc(feedArticle.createdAt))
    .limit(limit) as Promise<(FeedArticleRecord & { kind: string; category: string })[]>;
}

/** One page of the archive, newest or oldest first; undated articles last either way. */
export function findArchivePage({
  db,
  where,
  oldestFirst,
  limit,
  offset,
}: {
  db: Database;
  where: SQL | undefined;
  oldestFirst: boolean;
  limit: number;
  offset: number;
}): Promise<(FeedArticleRecord & { kind: string; category: string })[]> {
  const order = oldestFirst
    ? [sql`${feedArticle.publishedOn} asc nulls last`, asc(feedArticle.createdAt)]
    : [sql`${feedArticle.publishedOn} desc nulls last`, desc(feedArticle.createdAt)];
  // `archiveWhere` keeps only rows with a kind and a category.
  return db
    .select()
    .from(feedArticle)
    .where(where)
    .orderBy(...order, asc(feedArticle.id))
    .limit(limit)
    .offset(offset) as Promise<(FeedArticleRecord & { kind: string; category: string })[]>;
}

export async function countArchive({ db, where }: { db: Database; where: SQL | undefined }): Promise<number> {
  const [row] = await db.select({ total: count() }).from(feedArticle).where(where);
  return row?.total ?? 0;
}

/** How many articles each kind has under `where`. */
export function countArchiveKinds({ db, where }: { db: Database; where: SQL | undefined }) {
  return db
    .select({ value: feedArticle.kind, count: count() })
    .from(feedArticle)
    .where(where)
    .groupBy(feedArticle.kind);
}

/** How many articles each category has under `where`, counting an article under its category and its topics. */
export async function countArchiveCategories({
  db,
  where,
}: {
  db: Database;
  where: SQL | undefined;
}): Promise<{ value: string; count: number }[]> {
  const result = await db.execute<{ value: string; count: number }>(sql`
    select topic as value, count(distinct ${feedArticle.id})::int as count
    from ${feedArticle} cross join lateral unnest(array_append(${feedArticle.topics}, ${feedArticle.category})) as topic
    where ${where ?? sql`true`}
    group by topic
  `);
  return result.rows;
}

/** How many articles each publishing date has under `where`; the service sorts them into years. */
export function countArchiveDates({ db, where }: { db: Database; where: SQL | undefined }) {
  return db
    .select({ publishedOn: feedArticle.publishedOn, count: count() })
    .from(feedArticle)
    .where(and(where, isNotNull(feedArticle.publishedOn)))
    .groupBy(feedArticle.publishedOn);
}

/**
 * Articles the old site's listings stored whose own page hasn't been read, newest first. One whose page failed to load
 * was touched then (its `updatedAt` moved past its `createdAt`), so it waits behind every untried one.
 */
export function findArticlesWithoutPage({ db, limit }: { db: Database; limit: number }): Promise<FeedArticleRecord[]> {
  return db
    .select()
    .from(feedArticle)
    .where(and(isNull(feedArticle.body), isNotNull(feedArticle.kind), notInArray(feedArticle.kind, ["occasion"])))
    .orderBy(
      sql`${feedArticle.updatedAt} > ${feedArticle.createdAt}`,
      sql`${feedArticle.publishedOn} desc nulls last`,
      asc(feedArticle.updatedAt),
    )
    .limit(limit);
}

/*===== Writes =====*/
/** In an upsert's update: the value the conflicting insert would have written. */
function sqlExcluded(column: string) {
  return sql.raw(`excluded.${column}`);
}

/** Inserts new articles and overwrites known ones (by `url`). Returns each one's ID by URL. */
export async function upsertArticles({
  db,
  articles,
  now,
}: {
  db: Database;
  articles: NewFeedArticle[];
  now: Date;
}): Promise<Map<string, string>> {
  if (articles.length === 0) return new Map();

  const rows = await db
    .insert(feedArticle)
    .values(articles.map((article) => ({ ...article, updatedAt: now })))
    .onConflictDoUpdate({
      target: feedArticle.url,
      set: {
        kind: sqlExcluded("kind"),
        category: sqlExcluded("category"),
        title: sqlExcluded("title"),
        summary: sqlExcluded("summary"),
        publishedOn: sqlExcluded("published_on"),
        imageUrl: sqlExcluded("image_url"),
        imageWidth: sqlExcluded("image_width"),
        imageHeight: sqlExcluded("image_height"),
        body: sqlExcluded("body"),
        source: sqlExcluded("source"),
        sourceAssetId: sqlExcluded("source_asset_id"),
        enrichedAt: sqlExcluded("enriched_at"),
        updatedAt: sqlExcluded("updated_at"),
      },
    })
    .returning({ id: feedArticle.id, url: feedArticle.url });

  return new Map(rows.map((row) => [row.url, row.id]));
}

/** Stores articles the listings found and nothing has stored yet. One already stored (by `url`) is left alone. */
export async function insertListedArticles({
  db,
  articles,
}: {
  db: Database;
  articles: (NewFeedArticle & { topics: string[] })[];
}): Promise<void> {
  // A few hundred rows at a time keeps each statement's parameters well under Postgres' limit.
  for (let start = 0; start < articles.length; start += 500) {
    await db
      .insert(feedArticle)
      .values(articles.slice(start, start + 500))
      .onConflictDoNothing({ target: feedArticle.url });
  }
}

/** Changes a stored article's fields: its topics from a listing, or what its page said once read. */
export async function updateArticle({
  db,
  id,
  values,
}: {
  db: Database;
  id: string;
  values: Partial<Omit<typeof feedArticle.$inferInsert, "id" | "url" | "createdAt">>;
}): Promise<void> {
  await db.update(feedArticle).set(values).where(eq(feedArticle.id, id));
}

/** Replaces every placement: the feed mirrors the old homepage as it is now. */
export async function replacePlacements({
  db,
  placements,
}: {
  db: Database;
  placements: NewFeedPlacement[];
}): Promise<void> {
  await db.delete(feedPlacement);
  if (placements.length > 0) await db.insert(feedPlacement).values(placements);
}
