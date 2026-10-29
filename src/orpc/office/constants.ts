/*===== Office Constants =====*/
// Browser-safe values shared by the API, the seed and the office page. Stored as plain text (`src/db/schema.ts`).

/** The menu section an office sits under, for its breadcrumb. */
export const OFFICE_SECTIONS = ["about", "education", "research", "campus-life"] as const;

export type OfficeSection = (typeof OFFICE_SECTIONS)[number];

/** `former` is a past head: the president's office lists the former presidents. */
export const OFFICE_ROLES = ["head", "staff", "former"] as const;

export type OfficeRole = (typeof OFFICE_ROLES)[number];

/** A tool's icon, by name; the page maps each to a Lucide icon. */
export const OFFICE_LINK_ICONS = [
  "system",
  "classroom",
  "courseware",
  "thesis",
  "plagiarism",
  "certificate",
  "regulations",
  "guide",
  "calendar",
  "list",
  "contact",
  "website",
] as const;

export type OfficeLinkIcon = (typeof OFFICE_LINK_ICONS)[number];

export const OFFICE_SLUG_PATTERN = /^[a-z][a-z0-9-]{0,47}$/;
