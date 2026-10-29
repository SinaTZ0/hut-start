/*===== Directory Constants =====*/
// Browser-safe values shared by the API, the seed and the phone book page. Stored as plain text (`src/db/schema.ts`).

/** The university's divisions, in the page's order: what a visitor filters the phone book by. */
export const DIRECTORY_GROUPS = [
  "leadership",
  "education",
  "student",
  "admin",
  "departments",
  "labs",
  "other",
] as const;

export type DirectoryGroup = (typeof DIRECTORY_GROUPS)[number];

export const DIRECTORY_ROLES = ["faculty", "staff", "lab-expert", "conscript", "legal"] as const;

export type DirectoryRole = (typeof DIRECTORY_ROLES)[number];

/** Dialled before an extension's three digits to reach it from outside: 081-38411-526. */
export const DIRECT_DIAL_PREFIX = "08138411";

/** The switchboard. */
export const MAIN_NUMBER = "08138411000";
