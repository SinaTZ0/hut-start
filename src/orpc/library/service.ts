import type { Database } from "#/db/client.server";
import { localize } from "#/lib/localized-text";
import { oneOf } from "#/orpc/allowed-values";
import { LIBRARY_FORMATS, LIBRARY_ICONS } from "#/orpc/library/constants";
import type { LibraryForms, LibrarySection } from "#/orpc/library/contract";
import { findDocuments, findGroups, findSections } from "#/orpc/library/repository";

/*===== Sections =====*/
/**
 * The sections of one office's page, or (`officeId: null`) of the forms page, with their groups and files, in the
 * request's locale. Empty groups and sections are left out.
 */
export async function loadSections({
  db,
  officeId,
}: {
  db: Database;
  officeId: string | null;
}): Promise<{ sections: LibrarySection[]; updatedAt: Date | null }> {
  const sections = await findSections({ db, officeId });
  const groups = await findGroups({ db, sectionIds: sections.map((section) => section.id) });
  const documents = await findDocuments({ db, groupIds: groups.map((group) => group.id) });

  const result = sections
    .map((section) => ({
      key: section.key,
      icon: oneOf({ allowed: LIBRARY_ICONS, value: section.icon, what: "library icon" }),
      title: localize(section.title),
      groups: groups
        .filter((group) => group.sectionId === section.id)
        .map((group) => ({
          id: group.id,
          title: localize(group.title),
          documents: documents
            .filter((document) => document.groupId === group.id)
            .map((document) => ({
              id: document.id,
              title: localize(document.title),
              url: document.url,
              format: oneOf({ allowed: LIBRARY_FORMATS, value: document.format, what: "library format" }),
            })),
        }))
        .filter((group) => group.documents.length > 0),
    }))
    .filter((section) => section.groups.length > 0);

  const updatedAt = sections.reduce<Date | null>(
    (latest, section) => (latest && latest > section.updatedAt ? latest : section.updatedAt),
    null,
  );
  return { sections: result, updatedAt };
}

/*===== Forms =====*/
export function getLibraryForms({ db }: { db: Database }): Promise<LibraryForms> {
  return loadSections({ db, officeId: null });
}
