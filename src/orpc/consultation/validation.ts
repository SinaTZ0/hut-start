import { z } from "zod";

import { optionalEmail, optionalMobile } from "#/lib/contact-schema";
import { persianText } from "#/lib/persian-text";
import {
  CONSULTATION_AGE_MAX,
  CONSULTATION_AGE_MIN,
  CONSULTATION_QUESTION_MAX_LENGTH,
  CONSULTATION_QUESTION_MIN_LENGTH,
  FACULTIES,
  FIELDS_OF_STUDY,
  GENDERS,
  MARITAL_STATUSES,
} from "#/orpc/consultation/constants";
import { m } from "#/paraglide/messages";

/*===== New Consultation =====*/
// Domain rules for an online consultation question (FORMS.md → 2). Messages are user-facing because they surface as
// field errors, so each is a function zod calls when the check fails, in the request's locale.
const optionError = { error: () => m.form_error_option_invalid() };

export const newConsultationSchema = z.object({
  gender: z.enum(GENDERS, optionError),
  age: z
    .number()
    .int({ error: () => m.form_error_age_invalid({ min: CONSULTATION_AGE_MIN, max: CONSULTATION_AGE_MAX }) })
    .min(CONSULTATION_AGE_MIN, {
      error: () => m.form_error_age_invalid({ min: CONSULTATION_AGE_MIN, max: CONSULTATION_AGE_MAX }),
    })
    .max(CONSULTATION_AGE_MAX, {
      error: () => m.form_error_age_invalid({ min: CONSULTATION_AGE_MIN, max: CONSULTATION_AGE_MAX }),
    }),
  maritalStatus: z.enum(MARITAL_STATUSES, optionError),
  email: optionalEmail().optional(),
  mobile: optionalMobile().optional(),
  faculty: z.enum(FACULTIES, optionError),
  fieldOfStudy: z.enum(FIELDS_OF_STUDY, optionError),
  question: persianText()
    .min(CONSULTATION_QUESTION_MIN_LENGTH, {
      error: () => m.form_error_text_too_short({ min: CONSULTATION_QUESTION_MIN_LENGTH }),
    })
    .max(CONSULTATION_QUESTION_MAX_LENGTH, {
      error: () => m.form_error_text_too_long({ max: CONSULTATION_QUESTION_MAX_LENGTH }),
    }),
});

export type NewConsultation = z.output<typeof newConsultationSchema>;
