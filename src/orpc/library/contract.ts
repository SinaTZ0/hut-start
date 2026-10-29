import { oc } from "@orpc/contract";
import { z } from "zod";

import { commonErrors } from "#/orpc/errors";
import { LIBRARY_FORMATS, LIBRARY_ICONS } from "#/orpc/library/constants";

/*===== Schemas =====*/

export const libraryDocumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  format: z.enum(LIBRARY_FORMATS),
});

export type LibraryDocument = z.infer<typeof libraryDocumentSchema>;

export const librarySectionSchema = z.object({
  key: z.string(),
  icon: z.enum(LIBRARY_ICONS),
  title: z.string(),
  groups: z.array(z.object({ id: z.string(), title: z.string(), documents: z.array(libraryDocumentSchema) })),
});

export type LibrarySection = z.infer<typeof librarySectionSchema>;

export const libraryFormsSchema = z.object({
  sections: z.array(librarySectionSchema),
  /** The last change to any section. Null while the library is empty. */
  updatedAt: z.date().nullable(),
});

export type LibraryForms = z.infer<typeof libraryFormsSchema>;

/*===== Procedures =====*/
/** The forms page: every section that belongs to no office, with its groups and files. */
export const getLibraryFormsContract = oc.errors(commonErrors).output(libraryFormsSchema);

export const libraryContract = {
  forms: getLibraryFormsContract,
};
