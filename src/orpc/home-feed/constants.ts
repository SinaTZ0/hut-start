/*===== Home Feed Values =====*/
// Browser-safe: the contract and the home page use them too. Stored as plain text (`src/db/schema.ts`, Home Feed).

/** The home page's blocks. An `occasion` is the poster the old homepage pins over its photo (a mourning, a holiday). */
export const FEED_KINDS = ["news", "notice", "achievement", "growth", "event", "occasion"] as const;

export type FeedKind = (typeof FEED_KINDS)[number];

/** What an item is about, shown as its card's kicker. Notices are split by it into the notices panel's tabs. */
export const FEED_CATEGORIES = [
  "university",
  "education",
  "graduate",
  "industry",
  "student",
  "openEducation",
  "growth",
] as const;

export type FeedCategory = (typeof FEED_CATEGORIES)[number];

/** Where the mirrored content comes from, until the cutover. */
export const SOURCE_ORIGIN = "https://hut.ac.ir";
