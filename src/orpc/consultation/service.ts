import type { Database } from "#/db/client.server";
import { issuesToErrorData } from "#/lib/schema-issues";
import { withTrackingCode } from "#/lib/tracking-code.server";
import type { ConsultationReceipt } from "#/orpc/consultation/contract";
import { insertConsultation } from "#/orpc/consultation/repository";
import { newConsultationSchema } from "#/orpc/consultation/validation";

/*===== Submit =====*/
type SubmitConsultationResult =
  { kind: "success"; receipt: ConsultationReceipt } | { kind: "invalid"; fields: Record<string, string> };

/**
 * Validates and records a consultation question under a new tracking code (`M`). The academic details are kept so
 * the question can be routed to the right advisor. The procedure has already checked the captcha; parsing drops it
 * with any other unknown key.
 *
 * @returns `invalid` with per-field messages when the input breaks a domain rule.
 */
export async function submitConsultation({
  db,
  input,
}: {
  db: Database;
  input: unknown;
}): Promise<SubmitConsultationResult> {
  const parsed = newConsultationSchema.safeParse(input);
  if (!parsed.success) return { kind: "invalid", fields: issuesToErrorData(parsed.error.issues).fields };

  const row = await withTrackingCode({
    kind: "M",
    insert: (trackingCode) => insertConsultation({ db, values: { ...parsed.data, trackingCode } }),
  });
  return { kind: "success", receipt: { trackingCode: row.trackingCode, createdAt: row.createdAt } };
}
