import type { Faculty, FieldOfStudy, Gender, MaritalStatus } from "#/orpc/consultation/constants";
import { m } from "#/paraglide/messages";

/*===== Option Labels =====*/
// The form's names for the stored keys (`src/orpc/consultation/constants.ts`). Message functions, never strings: a
// module is evaluated once per server process (docs/frontend/i18n.md).

export const GENDER_LABELS: Record<Gender, () => string> = {
  unspecified: m.form_unspecified,
  male: m.consultation_gender_male,
  female: m.consultation_gender_female,
};

export const MARITAL_STATUS_LABELS: Record<MaritalStatus, () => string> = {
  unspecified: m.form_unspecified,
  single: m.consultation_marital_single,
  married: m.consultation_marital_married,
};

export const FACULTY_LABELS: Record<Faculty, () => string> = {
  unspecified: m.form_unspecified,
  "electrical-computer": m.consultation_faculty_electrical_computer,
  engineering: m.consultation_faculty_engineering,
  "basic-sciences": m.consultation_faculty_basic_sciences,
};

export const FIELD_OF_STUDY_LABELS: Record<FieldOfStudy, () => string> = {
  unspecified: m.form_unspecified,
  computer: m.consultation_field_computer,
  electrical: m.consultation_field_electrical,
  industrial: m.consultation_field_industrial,
  polymer: m.consultation_field_polymer,
  civil: m.consultation_field_civil,
  mechanical: m.consultation_field_mechanical,
  "engineering-physics": m.consultation_field_engineering_physics,
  "organic-chemistry": m.consultation_field_organic_chemistry,
};
