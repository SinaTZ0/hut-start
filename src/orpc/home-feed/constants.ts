/*===== Home Feed Values =====*/
// Browser-safe: the contract and the home page use them too. Stored as plain text (`src/db/schema.ts`, Home Feed).

/** The home page's blocks. */
export const FEED_KINDS = ["news", "notice", "achievement", "growth", "event"] as const;

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
