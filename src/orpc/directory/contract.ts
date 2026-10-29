import { oc } from "@orpc/contract";
import { z } from "zod";

import { DIRECTORY_GROUPS, DIRECTORY_ROLES } from "#/orpc/directory/constants";
import { commonErrors } from "#/orpc/errors";

/*===== Schemas =====*/
// Names come from the old phone book in Persian only, so `/en` shows them in Persian; unit names are translated.

export const directoryEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.enum(DIRECTORY_ROLES).nullable(),
  /** The first is the main one. */
  extensions: z.array(z.string()),
});

export type DirectoryEntry = z.infer<typeof directoryEntrySchema>;

export const directoryUnitSchema = z.object({
  key: z.string(),
  group: z.enum(DIRECTORY_GROUPS),
  name: z.string(),
  entries: z.array(directoryEntrySchema),
});

export type DirectoryUnit = z.infer<typeof directoryUnitSchema>;

export const phonebookSchema = z.object({
  /** In the page's order; every unit has at least one entry. */
  units: z.array(directoryUnitSchema),
  /** The last change to any unit. Null while the phone book is empty. */
  updatedAt: z.date().nullable(),
});

export type Phonebook = z.infer<typeof phonebookSchema>;

/*===== Procedures =====*/
/** The whole phone book: about 130 people, small enough to filter in the browser. */
export const getPhonebookContract = oc.errors(commonErrors).output(phonebookSchema);

export const directoryContract = {
  phonebook: getPhonebookContract,
};
