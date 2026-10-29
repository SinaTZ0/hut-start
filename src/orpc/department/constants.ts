/*===== Department Constants =====*/
// Browser-safe values shared by the API, the seed and the department page. Stored as plain text (`src/db/schema.ts`),
// so adding a value is a code change, not a migration.

/** Faculty teach and hold an academic rank; staff run the office and the labs. */
export const MEMBER_KINDS = ["faculty", "staff"] as const;

export type MemberKind = (typeof MEMBER_KINDS)[number];

/** Academic ranks, highest first: the page lists faculty in this order. */
export const ACADEMIC_RANKS = ["professor", "associate", "assistant", "lecturer"] as const;

export type AcademicRank = (typeof ACADEMIC_RANKS)[number];

/** The title before a name: «دکتر» for a doctorate, «مهندس» for an engineering degree. */
export const HONORIFICS = ["doctor", "engineer"] as const;

export type Honorific = (typeof HONORIFICS)[number];

export const DEGREES = ["bsc", "msc"] as const;

export type Degree = (typeof DEGREES)[number];

export const DOCUMENT_FORMATS = ["pdf", "doc", "docx"] as const;

export type DocumentFormat = (typeof DOCUMENT_FORMATS)[number];

/** On the labs page: a faculty member in charge of a lab, or staff who run them. */
export const LAB_ROLES = ["supervisor", "expert"] as const;

export type LabRole = (typeof LAB_ROLES)[number];

/** A lab file's format; manuals sometimes come as an archive. */
export const LAB_FILE_FORMATS = ["pdf", "doc", "docx", "zip", "rar"] as const;

export type LabFileFormat = (typeof LAB_FILE_FORMATS)[number];

/** Slugs are the URL segment (`/departments/ee`) and the folder of the department's drawings. */
export const DEPARTMENT_SLUG_PATTERN = /^[a-z][a-z0-9-]{0,31}$/;
