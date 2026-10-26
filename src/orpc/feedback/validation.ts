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

/*===== New Feedback =====*/
// Domain rules for a complaints and feedback message (FORMS.md → 1). Messages are user-facing because they surface as
// field errors, so each is a function zod calls when the check fails, in the request's locale.
const STUDENT_ID_PATTERN = new RegExp(`^\\d{${STUDENT_ID_MIN_DIGITS},${STUDENT_ID_MAX_DIGITS}}$`);

export const newFeedbackSchema = z.object({
  firstName: persianText()
    .min(1, { error: () => m.form_error_first_name_required() })
    .max(FEEDBACK_NAME_MAX_LENGTH, { error: () => m.form_error_name_too_long({ max: FEEDBACK_NAME_MAX_LENGTH }) }),
  lastName: persianText()
    .max(FEEDBACK_NAME_MAX_LENGTH, { error: () => m.form_error_name_too_long({ max: FEEDBACK_NAME_MAX_LENGTH }) })
    .optional()
    .transform((value) => value || undefined),
  mobile: optionalMobile().optional(),
  email: optionalEmail().optional(),
  studentId: z
    .string()
    .overwrite((value) => toLatinDigits(value).trim())
    .refine((value) => value === "" || STUDENT_ID_PATTERN.test(value), {
      error: () => m.form_error_student_id_invalid({ min: STUDENT_ID_MIN_DIGITS, max: STUDENT_ID_MAX_DIGITS }),
    })
    .optional()
    .transform((value) => value || undefined),
  unit: z.enum(FEEDBACK_UNITS, { error: () => m.feedback_error_unit_required() }),
  kind: z.enum(FEEDBACK_KINDS, { error: () => m.feedback_error_kind_required() }),
  body: persianText()
    .min(FEEDBACK_BODY_MIN_LENGTH, { error: () => m.form_error_text_too_short({ min: FEEDBACK_BODY_MIN_LENGTH }) })
    .max(FEEDBACK_BODY_MAX_LENGTH, { error: () => m.form_error_text_too_long({ max: FEEDBACK_BODY_MAX_LENGTH }) }),
});

export type NewFeedback = z.output<typeof newFeedbackSchema>;
