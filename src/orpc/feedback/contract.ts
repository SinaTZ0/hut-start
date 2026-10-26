import { oc } from "@orpc/contract";
import { z } from "zod";

import { commonErrors } from "#/orpc/errors";
import { captchaErrors } from "#/orpc/middleware/captcha/captcha.errors";

/*===== Schemas =====*/
// Structure only. Trimming, limits, the allowed units and contact formats are checked by `validation.ts`.
const submitFeedbackInputSchema = z.strictObject({
  firstName: z.string(),
  lastName: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  studentId: z.string().optional(),
  unit: z.string(),
  kind: z.string(),
  body: z.string(),
  /** A solved Altcha challenge (`captcha.createChallenge`), checked by `captchaMiddleware`. */
  captcha: z.string(),
});

/** What the visitor gets back: the code to follow the message up with. */
export const feedbackReceiptSchema = z.object({
  trackingCode: z.string(),
  createdAt: z.date(),
});

export type FeedbackReceipt = z.infer<typeof feedbackReceiptSchema>;

/*===== Procedures =====*/
export const submitFeedbackContract = oc
  .errors({ ...commonErrors, ...captchaErrors })
  .input(submitFeedbackInputSchema)
  .output(feedbackReceiptSchema);

export const feedbackContract = {
  submit: submitFeedbackContract,
};
