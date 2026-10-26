import type { Database } from "#/db/client.server";
import { issuesToErrorData } from "#/lib/schema-issues";
import { withTrackingCode } from "#/lib/tracking-code.server";
import type { FeedbackReceipt } from "#/orpc/feedback/contract";
import { insertFeedback } from "#/orpc/feedback/repository";
import { newFeedbackSchema } from "#/orpc/feedback/validation";

/*===== Submit =====*/
type SubmitFeedbackResult =
  { kind: "success"; receipt: FeedbackReceipt } | { kind: "invalid"; fields: Record<string, string> };

/**
 * Validates and records a complaint, suggestion or criticism for the chosen unit, under a new tracking code (`C`).
 * The procedure has already checked the captcha; parsing drops it with any other unknown key.
 *
 * @returns `invalid` with per-field messages when the input breaks a domain rule.
 */
export async function submitFeedback({ db, input }: { db: Database; input: unknown }): Promise<SubmitFeedbackResult> {
  const parsed = newFeedbackSchema.safeParse(input);
  if (!parsed.success) return { kind: "invalid", fields: issuesToErrorData(parsed.error.issues).fields };

  const row = await withTrackingCode({
    kind: "C",
    insert: (trackingCode) => insertFeedback({ db, values: { ...parsed.data, trackingCode } }),
  });
  return { kind: "success", receipt: { trackingCode: row.trackingCode, createdAt: row.createdAt } };
}
