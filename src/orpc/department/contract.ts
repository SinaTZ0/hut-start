import { oc } from "@orpc/contract";
import { z } from "zod";

import { ACADEMIC_RANKS, DEGREES, DOCUMENT_FORMATS, HONORIFICS, MEMBER_KINDS } from "#/orpc/department/constants";
import { commonErrors, errorDataSchema } from "#/orpc/errors";
import { mediaSchema } from "#/orpc/media/contract";

/*===== Schemas =====*/
// Text arrives in the request's locale (`localize`), falling back to Persian where no translation exists yet. The query
// key doesn't name the locale, which is safe because changing language loads the page again (docs/frontend/i18n.md).

export const departmentMemberSchema = z.object({
  id: z.string(),
  kind: z.enum(MEMBER_KINDS),
  honorific: z.enum(HONORIFICS).nullable(),
  name: z.string(),
  rank: z.enum(ACADEMIC_RANKS).nullable(),
  jobTitle: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  office: z.string().nullable(),
  homepageUrl: z.string().nullable(),
  scholarUrl: z.string().nullable(),
  /** A `portrait` media. */
  photo: mediaSchema.nullable(),
});

export type DepartmentMember = z.infer<typeof departmentMemberSchema>;

export const departmentTrackSchema = z.object({
  id: z.string(),
  degree: z.enum(DEGREES),
  name: z.string(),
  note: z.string().nullable(),
  planUrl: z.string().nullable(),
  chartUrl: z.string().nullable(),
});

export type DepartmentTrack = z.infer<typeof departmentTrackSchema>;

export const departmentFieldSchema = z.object({
  id: z.string(),
  /** Names the field's drawing. */
  key: z.string(),
  name: z.string(),
  summary: z.string(),
  tracks: z.array(departmentTrackSchema),
});

export type DepartmentField = z.infer<typeof departmentFieldSchema>;

export const departmentDocumentSchema = z.object({
  id: z.string(),
  degree: z.enum(DEGREES),
  title: z.string(),
  url: z.string(),
  format: z.enum(DOCUMENT_FORMATS),
  archived: z.boolean(),
});

export type DepartmentDocument = z.infer<typeof departmentDocumentSchema>;

export const departmentSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  lede: z.string(),
  quote: z.string().nullable(),
  /** The intro's paragraphs. */
  intro: z.array(z.string()),
  /** Oldest first; `on` is an ISO date. */
  milestones: z.array(z.object({ on: z.iso.date(), label: z.string() })),
  studentCount: z.number().int().nullable(),
  labsUrl: z.string().nullable(),
  /** The last change to the department or anything on its page. */
  updatedAt: z.date(),
  head: departmentMemberSchema.nullable(),
  /** Highest rank first, then in the editor's order. The head is among them. */
  faculty: z.array(departmentMemberSchema),
  staff: z.array(departmentMemberSchema),
  fields: z.array(departmentFieldSchema),
  labs: z.array(z.object({ id: z.string(), name: z.string() })),
  documents: z.array(departmentDocumentSchema),
});

export type Department = z.infer<typeof departmentSchema>;

export const departmentSummarySchema = z.object({
  slug: z.string(),
  name: z.string(),
  updatedAt: z.date(),
});

export type DepartmentSummary = z.infer<typeof departmentSummarySchema>;

// Structure only. An unknown or malformed slug is a `NOT_FOUND`, decided by the service.
const getDepartmentInputSchema = z.strictObject({ slug: z.string() });

/*===== Errors =====*/
const notFoundErrors = {
  NOT_FOUND: { message: "Department not found.", data: errorDataSchema },
};

/*===== Procedures =====*/
export const getDepartmentContract = oc
  .errors({ ...commonErrors, ...notFoundErrors })
  .input(getDepartmentInputSchema)
  .output(departmentSchema);

/** Every department with a page, for the sitemap. */
export const listDepartmentsContract = oc.errors(commonErrors).output(z.array(departmentSummarySchema));

export const departmentContract = {
  get: getDepartmentContract,
  list: listDepartmentsContract,
};
