import { oc } from "@orpc/contract";
import { z } from "zod";

import { commonErrors } from "#/orpc/errors";
import { captchaErrors } from "#/orpc/middleware/captcha/captcha.errors";

/*===== Schemas =====*/
// Structure only. Ranges, the allowed options and contact formats are checked by `validation.ts`.
const submitConsultationInputSchema = z.strictObject({
  gender: z.string(),
  age: z.number(),
  maritalStatus: z.string(),
  email: z.string().optional(),
  mobile: z.string().optional(),
  faculty: z.string(),
  fieldOfStudy: z.string(),
  question: z.string(),
  /** A solved Altcha challenge (`captcha.createChallenge`), checked by `captchaMiddleware`. */
  captcha: z.string(),
});

/** What the visitor gets back: the code to follow the question up with. */
export const consultationReceiptSchema = z.object({
  trackingCode: z.string(),
  createdAt: z.date(),
});

export type ConsultationReceipt = z.infer<typeof consultationReceiptSchema>;

/*===== Procedures =====*/
export const submitConsultationContract = oc
  .errors({ ...commonErrors, ...captchaErrors })
  .input(submitConsultationInputSchema)
  .output(consultationReceiptSchema);

export const consultationContract = {
  submit: submitConsultationContract,
};
