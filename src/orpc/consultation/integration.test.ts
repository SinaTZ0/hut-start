import { inArray } from "drizzle-orm";
import { afterAll, describe, expect, it } from "vitest";

import { db } from "#/db/client.server";
import { consultationRequest } from "#/db/schema";
import { TRACKING_CODE_PATTERN } from "#/lib/tracking-code";
import { submitConsultation } from "#/orpc/consultation/service";

/*===== Consultation =====*/
// Runs against the real database (`DATABASE_URL`, after `pnpm db:push`). Every row is created per run and removed
// afterwards.

const codes: string[] = [];

afterAll(async () => {
  if (codes.length) await db.delete(consultationRequest).where(inArray(consultationRequest.trackingCode, codes));
  await db.$client.end();
});

const question = {
  gender: "unspecified",
  age: 21,
  maritalStatus: "unspecified",
  faculty: "unspecified",
  fieldOfStudy: "unspecified",
  question: "برای انتخاب گرایش کارشناسی ارشد از چه کسی راهنمایی بگیرم؟",
};

describe("consultation", () => {
  it("accepts 'unspecified' for every choice and issues a consultation code", async () => {
    const result = await submitConsultation({ db, input: question });
    if (result.kind !== "success") throw new Error(`expected success, got ${JSON.stringify(result)}`);
    codes.push(result.receipt.trackingCode);

    expect(result.receipt.trackingCode).toMatch(TRACKING_CODE_PATTERN);
    expect(result.receipt.trackingCode.startsWith("HUT-M")).toBe(true);
  });

  it("rejects an age out of range and an unknown field of study with field messages", async () => {
    const result = await submitConsultation({ db, input: { ...question, age: 0, fieldOfStudy: "astrology" } });
    expect(result).toMatchObject({
      kind: "invalid",
      fields: { age: expect.any(String), fieldOfStudy: expect.any(String) },
    });
  });
});
