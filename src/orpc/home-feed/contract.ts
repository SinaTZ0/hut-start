import { oc } from "@orpc/contract";
import { z } from "zod";

import { authErrors } from "#/orpc/middleware/auth/auth.errors";
import { commonErrors, errorDataSchema } from "#/orpc/errors";
import { articleBodySchema } from "#/orpc/home-feed/article-body";
import {
  ARCHIVE_KINDS,
  ARCHIVE_PAGE_SIZE,
  ARCHIVE_SORTS,
  FEED_CATEGORIES,
  FEED_KINDS,
} from "#/orpc/home-feed/constants";

/*===== Schemas =====*/
// Text arrives in the request's locale (`localize`), falling back to Persian, which is all the old site has.

export const feedItemSchema = z.object({
  id: z.string(),
  kind: z.enum(FEED_KINDS),
  category: z.enum(FEED_CATEGORIES),
  title: z.string(),
  summary: z.string().nullable(),
  /** ISO date (Gregorian). */
  publishedOn: z.iso.date().nullable(),
  /** The item's page: its article page here (`/articles/<id>`) once the old one has been read, else the old one. */
  url: z.string(),
  /** Hotlinked from the old site. */
  imageUrl: z.string().nullable(),
});

export type FeedItem = z.infer<typeof feedItemSchema>;

export const homeFeedSchema = z.object({
  /** The featured story first. */
  news: z.array(feedItemSchema),
  notices: z.object({
    /** Every category's, newest first. */
    latest: z.array(feedItemSchema),
    education: z.array(feedItemSchema),
    graduate: z.array(feedItemSchema),
    student: z.array(feedItemSchema),
    industry: z.array(feedItemSchema),
    openEducation: z.array(feedItemSchema),
  }),
  /** The newest campus-life notice with a photo. */
  spotlight: feedItemSchema.nullable(),
  /** The lead first. */
  achievements: z.array(feedItemSchema),
  /** The incubator's newest stories. */
  growth: z.array(feedItemSchema),
  /** The open-education center's newest courses and workshops. */
  courses: z.array(feedItemSchema),
  /** The old homepage's current occasion poster, if it shows one. */
  occasion: feedItemSchema.nullable(),
});

export type HomeFeed = z.infer<typeof homeFeedSchema>;

export const articleSchema = z.object({
  /** The old site's ID for it, the page's address. */
  id: z.string(),
  kind: z.enum(FEED_KINDS),
  category: z.enum(FEED_CATEGORIES),
  title: z.string(),
  /** The lead paragraph, whole. */
  summary: z.string().nullable(),
  /** ISO date (Gregorian). */
  publishedOn: z.iso.date().nullable(),
  /** Hotlinked from the old site. Null when there is none, or when the body opens with the same photo. */
  cover: z
    .object({ src: z.string(), width: z.number().int().nullable(), height: z.number().int().nullable() })
    .nullable(),
  body: articleBodySchema,
  /** Who wrote it («روابط‌عمومی …»). */
  source: z.string().nullable(),
  /** Three more of its kind and category, newest first. */
  related: z.array(feedItemSchema),
});

export type Article = z.infer<typeof articleSchema>;

// Every filter is optional: none lists everything. A page past the last is an empty one, not an error.
export const archiveInputSchema = z.strictObject({
  kind: z.enum(ARCHIVE_KINDS).optional(),
  category: z.enum(FEED_CATEGORIES).optional(),
  q: z.string().trim().max(100).optional(),
  /** In the request locale's calendar: 1404 in Persian, 2025 in English. */
  year: z.number().int().min(1300).max(2200).optional(),
  sort: z.enum(ARCHIVE_SORTS).default("newest"),
  page: z.number().int().min(1).max(10_000).default(1),
});

export type ArchiveInput = z.input<typeof archiveInputSchema>;

const facetCountSchema = <T extends z.ZodType>(value: T) => z.object({ value, count: z.number().int() });

export const archivePageSchema = z.object({
  items: z.array(feedItemSchema),
  total: z.number().int(),
  page: z.number().int(),
  pageCount: z.number().int(),
  pageSize: z.literal(ARCHIVE_PAGE_SIZE),
  /** What each option of a filter would show with the other filters as they are. Options with none are left out. */
  facets: z.object({
    kinds: z.array(facetCountSchema(z.enum(ARCHIVE_KINDS))),
    categories: z.array(facetCountSchema(z.enum(FEED_CATEGORIES))),
    /** Newest first, in the request locale's calendar. */
    years: z.array(facetCountSchema(z.number().int())),
  }),
});

export type ArchivePage = z.infer<typeof archivePageSchema>;

// Structure only. An unknown ID is a `NOT_FOUND`, decided by the service.
const getArticleInputSchema = z.strictObject({ id: z.string() });

export const syncSummarySchema = z.object({
  added: z.number().int(),
  updated: z.number().int(),
  /** Articles the old homepage no longer shows. They're kept, so their pages here keep working. */
  removed: z.number().int(),
  /** Article pages read in this run. */
  enriched: z.number().int(),
  durationMs: z.number().int(),
});

export type SyncSummary = z.infer<typeof syncSummarySchema>;

/*===== Errors =====*/
const sourceErrors = {
  BAD_GATEWAY: { message: "The old site couldn't be read.", data: errorDataSchema },
};

const notFoundErrors = {
  NOT_FOUND: { message: "Article not found.", data: errorDataSchema },
};

/*===== Procedures =====*/
export const getHomeFeedContract = oc.errors(commonErrors).output(homeFeedSchema);

/** One article's page, for `/articles/<id>`. Only an article whose page on the old site has been read has one. */
export const getArticleContract = oc
  .errors({ ...commonErrors, ...notFoundErrors })
  .input(getArticleInputSchema)
  .output(articleSchema);

/** The archive (`/news`): every stored post of the archive's kinds, filtered, a page at a time. */
export const listArchiveContract = oc.errors(commonErrors).input(archiveInputSchema).output(archivePageSchema);

/** The newest posts addressed to new students, for `/new-students`. */
export const listNewStudentPostsContract = oc.errors(commonErrors).output(z.array(feedItemSchema));

/**
 * Reads the old homepage now, instead of waiting for the timer. Needs the sync secret
 * (`Authorization: Bearer <HOME_FEED_SYNC_SECRET>`); without that variable set it always answers `UNAUTHORIZED`.
 */
export const syncHomeFeedContract = oc
  .errors({ ...commonErrors, ...authErrors, ...sourceErrors })
  .input(z.strictObject({ refresh: z.boolean().optional() }).optional())
  .output(syncSummarySchema);

export const homeFeedContract = {
  get: getHomeFeedContract,
  article: getArticleContract,
  list: listArchiveContract,
  newStudents: listNewStudentPostsContract,
  sync: syncHomeFeedContract,
};
