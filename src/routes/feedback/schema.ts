import { z } from "zod";

import { optionalEmail, optionalMobile } from "#/lib/contact-schema";
import { toLatinDigits } from "#/lib/digits";
import { persianText } from "#/lib/persian-text";
import {
  FEEDBACK_BODY_MAX_LENGTH,
  FEEDBACK_BODY_MIN_LENGTH,
  FEEDBACK_KINDS,
  FEEDBACK_NAME_MAX_LENGTH,
  FEEDBACK_UNITS,
  STUDENT_ID_MAX_DIGITS,
  STUDENT_ID_MIN_DIGITS,
} from "#/orpc/feedback/constants";
import { m } from "#/paraglide/messages";

/*===== Feedback Form =====*/
// Written for the form's messages; the server's `validation.ts` is the final authority.
const STUDENT_ID_PATTERN = new RegExp(`^\\d{${STUDENT_ID_MIN_DIGITS},${STUDENT_ID_MAX_DIGITS}}$`);
const nameTooLong = { error: () => m.form_error_name_too_long({ max: FEEDBACK_NAME_MAX_LENGTH }) };

export const feedbackFormSchema = z.object({
  kind: z.enum(FEEDBACK_KINDS, { error: () => m.feedback_error_kind_required() }),
  unit: z.enum(FEEDBACK_UNITS, { error: () => m.feedback_error_unit_required() }),
  body: persianText()
    .min(FEEDBACK_BODY_MIN_LENGTH, { error: () => m.form_error_text_too_short({ min: FEEDBACK_BODY_MIN_LENGTH }) })
    .max(FEEDBACK_BODY_MAX_LENGTH, { error: () => m.form_error_text_too_long({ max: FEEDBACK_BODY_MAX_LENGTH }) }),
  firstName: persianText()
    .min(1, { error: () => m.form_error_first_name_required() })
    .max(FEEDBACK_NAME_MAX_LENGTH, nameTooLong),
  lastName: persianText().max(FEEDBACK_NAME_MAX_LENGTH, nameTooLong),
  mobile: optionalMobile(),
  email: optionalEmail(),
  // Digits only, typed in any script.
  studentId: z
    .string()
    .overwrite((value) => toLatinDigits(value).trim())
    .refine((value) => value === "" || STUDENT_ID_PATTERN.test(value), {
      error: () => m.form_error_student_id_invalid({ min: STUDENT_ID_MIN_DIGITS, max: STUDENT_ID_MAX_DIGITS }),
    }),
});

export type FeedbackFormInput = z.input<typeof feedbackFormSchema>;
export type FeedbackFormValues = z.output<typeof feedbackFormSchema>;
