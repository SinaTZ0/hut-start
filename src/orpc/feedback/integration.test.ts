import { eq, inArray } from "drizzle-orm";
import { afterAll, describe, expect, it } from "vitest";

import { db } from "#/db/client.server";
import { feedbackMessage } from "#/db/schema";
import { TRACKING_CODE_PATTERN } from "#/lib/tracking-code";
import { submitFeedback } from "#/orpc/feedback/service";

/*===== Feedback =====*/
// Runs against the real database (`DATABASE_URL`, after `pnpm db:push`): the tracking code's uniqueness is the
// table's. Every row is created per run and removed afterwards.

const codes: string[] = [];

afterAll(async () => {
  if (codes.length) await db.delete(feedbackMessage).where(inArray(feedbackMessage.trackingCode, codes));
  await db.$client.end();
});

describe("feedback", () => {
  it("stores a message with normalized contact details under a complaint code", async () => {
    const result = await submitFeedback({
      db,
      input: {
        firstName: "  علي ",
        lastName: "",
        mobile: "۰۹۱۲ ۱۲۳-۴۵۶۷",
        email: "",
        studentId: "۴۰۰۱۲۳",
        unit: "security",
        kind: "complaint",
        body: "چراغ‌های پارکینگ شب‌ها خاموش است.",
        captcha: "checked by the procedure",
      },
    });
    if (result.kind !== "success") throw new Error(`expected success, got ${JSON.stringify(result)}`);
    codes.push(result.receipt.trackingCode);

    expect(result.receipt.trackingCode).toMatch(TRACKING_CODE_PATTERN);
    expect(result.receipt.trackingCode.startsWith("HUT-C")).toBe(true);
    const [row] = await db
      .select()
      .from(feedbackMessage)
      .where(eq(feedbackMessage.trackingCode, result.receipt.trackingCode));
    expect(row).toMatchObject({
      firstName: "علی",
      lastName: null,
      mobile: "09121234567",
      email: null,
      studentId: "400123",
    });
  });

  it("rejects a missing unit, a short message and a bad mobile with field messages", async () => {
    const result = await submitFeedback({
      db,
      input: { firstName: "سارا", unit: "nobody", kind: "suggestion", body: "کوتاه", mobile: "0811234567" },
    });
    expect(result).toMatchObject({
      kind: "invalid",
      fields: { unit: expect.any(String), body: expect.any(String), mobile: expect.any(String) },
    });
  });
});
