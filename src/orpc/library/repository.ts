import { asc, eq, inArray, isNull } from "drizzle-orm";

import type { Database } from "#/db/client.server";
import { libraryDocument, libraryGroup, librarySection } from "#/db/schema";

/*===== Types =====*/
export type LibrarySectionRecord = typeof librarySection.$inferSelect;
export type LibraryGroupRecord = typeof libraryGroup.$inferSelect;
export type LibraryDocumentRecord = typeof libraryDocument.$inferSelect;

/*===== Reads =====*/
/** The sections of one office, or (`officeId: null`) of the forms page, in order. */
export function findSections({
  db,
  officeId,
}: {
  db: Database;
  officeId: string | null;
}): Promise<LibrarySectionRecord[]> {
  return db
    .select()
    .from(librarySection)
    .where(officeId === null ? isNull(librarySection.officeId) : eq(librarySection.officeId, officeId))
    .orderBy(asc(librarySection.position));
}

export function findGroups({ db, sectionIds }: { db: Database; sectionIds: string[] }): Promise<LibraryGroupRecord[]> {
  if (sectionIds.length === 0) return Promise.resolve([]);
  return db
    .select()
    .from(libraryGroup)
    .where(inArray(libraryGroup.sectionId, sectionIds))
    .orderBy(asc(libraryGroup.position));
}

export function findDocuments({
  db,
  groupIds,
}: {
  db: Database;
  groupIds: string[];
}): Promise<LibraryDocumentRecord[]> {
  if (groupIds.length === 0) return Promise.resolve([]);
  return db
    .select()
    .from(libraryDocument)
    .where(inArray(libraryDocument.groupId, groupIds))
    .orderBy(asc(libraryDocument.position));
}
