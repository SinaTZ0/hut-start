import type { Database } from "#/db/client.server";
import { feedbackMessage } from "#/db/schema";

/*===== Types =====*/
export type FeedbackRecord = typeof feedbackMessage.$inferSelect;
type NewFeedbackRecord = typeof feedbackMessage.$inferInsert;

/*===== Writes =====*/
/** Inserts a message and returns the stored row. A taken tracking code fails on its unique index. */
export async function insertFeedback({
  db,
  values,
}: {
  db: Database;
  values: NewFeedbackRecord;
}): Promise<FeedbackRecord> {
  const [row] = await db.insert(feedbackMessage).values(values).returning();
  if (!row) throw new Error("insertFeedback: insert returned no row");
  return row;
}
