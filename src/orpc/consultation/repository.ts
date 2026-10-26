import type { Database } from "#/db/client.server";
import { consultationRequest } from "#/db/schema";

/*===== Types =====*/
export type ConsultationRecord = typeof consultationRequest.$inferSelect;
type NewConsultationRecord = typeof consultationRequest.$inferInsert;

/*===== Writes =====*/
/** Inserts a question and returns the stored row. A taken tracking code fails on its unique index. */
export async function insertConsultation({
  db,
  values,
}: {
  db: Database;
  values: NewConsultationRecord;
}): Promise<ConsultationRecord> {
  const [row] = await db.insert(consultationRequest).values(values).returning();
  if (!row) throw new Error("insertConsultation: insert returned no row");
  return row;
}
