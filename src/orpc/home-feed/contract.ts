import { oc } from "@orpc/contract";
import { z } from "zod";

import { authErrors } from "#/orpc/middleware/auth/auth.errors";
import { commonErrors, errorDataSchema } from "#/orpc/errors";
import { FEED_CATEGORIES, FEED_KINDS } from "#/orpc/home-feed/constants";

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
  /** The item's page. */
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

export const syncSummarySchema = z.object({
  added: z.number().int(),
  updated: z.number().int(),
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

/*===== Procedures =====*/
export const getHomeFeedContract = oc.errors(commonErrors).output(homeFeedSchema);

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
  sync: syncHomeFeedContract,
};
