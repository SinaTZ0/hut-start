import { asc } from "drizzle-orm";

import type { Database } from "#/db/client.server";
import { directoryEntry, directoryUnit } from "#/db/schema";

/*===== Types =====*/
export type DirectoryUnitRecord = typeof directoryUnit.$inferSelect;
export type DirectoryEntryRecord = typeof directoryEntry.$inferSelect;

/*===== Reads =====*/
export function findUnits({ db }: { db: Database }): Promise<DirectoryUnitRecord[]> {
  return db.select().from(directoryUnit).orderBy(asc(directoryUnit.position));
}

export function findEntries({ db }: { db: Database }): Promise<DirectoryEntryRecord[]> {
  return db.select().from(directoryEntry).orderBy(asc(directoryEntry.position));
}
