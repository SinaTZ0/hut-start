/*===== Library Constants =====*/
// Browser-safe values shared by the API, the seed and the pages that list files. Stored as plain text.

/** A section's icon, by name; the page maps each to a Lucide icon. */
export const LIBRARY_ICONS = [
  "graduation",
  "education",
  "research",
  "faculty",
  "guides",
  "regulations",
  "files",
] as const;

export type LibraryIcon = (typeof LIBRARY_ICONS)[number];

export const LIBRARY_FORMATS = ["pdf", "doc", "docx", "xls", "xlsx", "zip"] as const;

export type LibraryFormat = (typeof LIBRARY_FORMATS)[number];
