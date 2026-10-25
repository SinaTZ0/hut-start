import { asc, eq, inArray, notExists, sql } from "drizzle-orm";

import type { Database } from "#/db/client.server";
import { feedArticle, feedPlacement } from "#/db/schema";

/*===== Types =====*/
export type FeedArticleRecord = typeof feedArticle.$inferSelect;
export type FeedPlacementRecord = typeof feedPlacement.$inferSelect;

export type NewFeedArticle = Pick<
  typeof feedArticle.$inferInsert,
  "url" | "title" | "summary" | "publishedOn" | "imageUrl" | "sourceAssetId" | "enrichedAt"
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
        title: sqlExcluded("title"),
        summary: sqlExcluded("summary"),
        publishedOn: sqlExcluded("published_on"),
        imageUrl: sqlExcluded("image_url"),
        sourceAssetId: sqlExcluded("source_asset_id"),
        enrichedAt: sqlExcluded("enriched_at"),
        updatedAt: sqlExcluded("updated_at"),
      },
    })
    .returning({ id: feedArticle.id, url: feedArticle.url });

  return new Map(rows.map((row) => [row.url, row.id]));
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

/** Deletes the articles no block shows any more. Returns how many. */
export async function deleteUnplacedArticles({ db }: { db: Database }): Promise<number> {
  const rows = await db
    .delete(feedArticle)
    .where(
      notExists(
        db.select({ id: feedPlacement.id }).from(feedPlacement).where(eq(feedPlacement.articleId, feedArticle.id)),
      ),
    )
    .returning({ id: feedArticle.id });
  return rows.length;
}
