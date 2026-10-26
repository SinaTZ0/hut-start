/*===== Consultation Constants =====*/
// Browser-safe values shared by the API and the online consultation form (FORMS.md → 2). Each list starts with
// `unspecified`, the default and a valid answer for a visitor who would rather not say. Stored as these keys, so a
// label can change without touching saved questions.

export const GENDERS = ["unspecified", "male", "female"] as const;
export type Gender = (typeof GENDERS)[number];

export const MARITAL_STATUSES = ["unspecified", "single", "married"] as const;
export type MaritalStatus = (typeof MARITAL_STATUSES)[number];

export const FACULTIES = ["unspecified", "electrical-computer", "engineering", "basic-sciences"] as const;
export type Faculty = (typeof FACULTIES)[number];

export const FIELDS_OF_STUDY = [
  "unspecified",
  "computer",
  "electrical",
  "industrial",
  "polymer",
  "civil",
  "mechanical",
  "engineering-physics",
  "organic-chemistry",
] as const;
export type FieldOfStudy = (typeof FIELDS_OF_STUDY)[number];

export const CONSULTATION_AGE_MIN = 1;
export const CONSULTATION_AGE_MAX = 120;
export const CONSULTATION_QUESTION_MIN_LENGTH = 10;
export const CONSULTATION_QUESTION_MAX_LENGTH = 5000;
