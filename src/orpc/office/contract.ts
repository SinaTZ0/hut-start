import { oc } from "@orpc/contract";
import { z } from "zod";

import { ACADEMIC_RANKS, HONORIFICS } from "#/orpc/department/constants";
import { commonErrors, errorDataSchema } from "#/orpc/errors";
import { feedItemSchema } from "#/orpc/home-feed/contract";
import { librarySectionSchema } from "#/orpc/library/contract";
import { mediaSchema } from "#/orpc/media/contract";
import { OFFICE_LINK_ICONS, OFFICE_ROLES, OFFICE_SECTIONS } from "#/orpc/office/constants";

/*===== Schemas =====*/
// Text arrives in the request's locale, falling back to Persian, as on the department pages.

export const officeMemberSchema = z.object({
  id: z.string(),
  role: z.enum(OFFICE_ROLES),
  honorific: z.enum(HONORIFICS).nullable(),
  name: z.string(),
  jobTitle: z.string().nullable(),
  rank: z.enum(ACADEMIC_RANKS).nullable(),
  degree: z.string().nullable(),
  /** Jalali years, «1398-1400». */
  term: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  resumeUrl: z.string().nullable(),
  /** A `portrait` media. */
  photo: mediaSchema.nullable(),
});

export type OfficeMember = z.infer<typeof officeMemberSchema>;

export const officeSchema = z.object({
  slug: z.string(),
  section: z.enum(OFFICE_SECTIONS),
  name: z.string(),
  lede: z.string(),
  /** The intro's paragraphs. */
  intro: z.array(z.string()),
  duties: z.array(z.string()),
  notes: z.array(z.string()),
  place: z.string().nullable(),
  hours: z.string().nullable(),
  phone: z.string().nullable(),
  fax: z.string().nullable(),
  email: z.string().nullable(),
  /** The archive category its notices come from, for the «all notices» link. */
  feedCategory: z.string().nullable(),
  updatedAt: z.date(),
  /** In the editor's order. */
  members: z.array(officeMemberSchema),
  links: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      url: z.string(),
      icon: z.enum(OFFICE_LINK_ICONS),
    }),
  ),
  /** Titled sets of cards: its units, its books, its agreements. */
  lists: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      items: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          text: z.string().nullable(),
          /** A path on this site (`/offices/library`) or another site's URL. */
          url: z.string().nullable(),
          /** A `portrait` media: a book's cover. */
          image: mediaSchema.nullable(),
        }),
      ),
    }),
  ),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })),
  /** Opening hours as tables: a cell under each column for every row. */
  schedules: z.array(
    z.object({
      title: z.string(),
      columns: z.array(z.string()),
      rows: z.array(z.object({ label: z.string(), cells: z.array(z.string()) })),
    }),
  ),
  /** Its files, grouped as on the forms page. */
  sections: z.array(librarySectionSchema),
  /** The newest of its category's notices and news. */
  notices: z.array(feedItemSchema),
});

export type Office = z.infer<typeof officeSchema>;
export type OfficeSummary = z.infer<typeof officeSummarySchema>;

/** An office as the sitemap and the contact page list it. */
export const officeSummarySchema = z.object({
  slug: z.string(),
  section: z.enum(OFFICE_SECTIONS),
  name: z.string(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  updatedAt: z.date(),
});

const getOfficeInputSchema = z.strictObject({ slug: z.string() });

/*===== Errors =====*/
const notFoundErrors = {
  NOT_FOUND: { message: "Office not found.", data: errorDataSchema },
};

/*===== Procedures =====*/
export const getOfficeContract = oc
  .errors({ ...commonErrors, ...notFoundErrors })
  .input(getOfficeInputSchema)
  .output(officeSchema);

/** Every office with a page, for the sitemap. */
export const listOfficesContract = oc.errors(commonErrors).output(z.array(officeSummarySchema));

export const officeContract = {
  get: getOfficeContract,
  list: listOfficesContract,
};
