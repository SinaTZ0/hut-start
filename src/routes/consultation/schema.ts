import { z } from "zod";

import { optionalEmail, optionalMobile } from "#/lib/contact-schema";
import { toLatinDigits } from "#/lib/digits";
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

/*===== Consultation Form =====*/
// Written for the form's messages; the server's `validation.ts` is the final authority.
const optionError = { error: () => m.form_error_option_invalid() };
const ageError = { error: () => m.form_error_age_invalid({ min: CONSULTATION_AGE_MIN, max: CONSULTATION_AGE_MAX }) };

export const consultationFormSchema = z.object({
  gender: z.enum(GENDERS, optionError),
  // Typed as text so Persian and Arabic digits work; sent as a number.
  age: z
    .string()
    .overwrite((value) => toLatinDigits(value).trim())
    .refine((value) => /^\d{1,3}$/.test(value), ageError)
    .transform(Number)
    .pipe(z.number().min(CONSULTATION_AGE_MIN, ageError).max(CONSULTATION_AGE_MAX, ageError)),
  maritalStatus: z.enum(MARITAL_STATUSES, optionError),
  faculty: z.enum(FACULTIES, optionError),
  fieldOfStudy: z.enum(FIELDS_OF_STUDY, optionError),
  question: persianText()
    .min(CONSULTATION_QUESTION_MIN_LENGTH, {
      error: () => m.form_error_text_too_short({ min: CONSULTATION_QUESTION_MIN_LENGTH }),
    })
    .max(CONSULTATION_QUESTION_MAX_LENGTH, {
      error: () => m.form_error_text_too_long({ max: CONSULTATION_QUESTION_MAX_LENGTH }),
    }),
  email: optionalEmail(),
  mobile: optionalMobile(),
});

export type ConsultationFormInput = z.input<typeof consultationFormSchema>;
export type ConsultationFormValues = z.output<typeof consultationFormSchema>;
