import { randomUUID } from "node:crypto";

import { eq } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { db } from "#/db/client.server";
import { department, departmentMember } from "#/db/schema";
import { getDepartment } from "#/orpc/department/service";

/*===== Departments =====*/
// Runs against the real database (`DATABASE_URL`, after `pnpm db:push`). The department is created per run and its
// rows go with it (cascade).

const slug = `test-${randomUUID().slice(0, 8)}`;

beforeAll(async () => {
  const [created] = await db
    .insert(department)
    .values({ slug, name: { fa: "آزمون" }, lede: { fa: "معرفی" }, intro: { fa: "یک\n\nدو" } })
    .returning({ id: department.id });
  if (!created) throw new Error("setup failed");

  // Stored lecturer first, so the page's order has to come from the rank.
  const members = await db
    .insert(departmentMember)
    .values([
      { departmentId: created.id, kind: "faculty", rank: "lecturer", name: { fa: "مربی" }, position: 0 },
      { departmentId: created.id, kind: "faculty", rank: "associate", name: { fa: "دانشیار" }, position: 1 },
      { departmentId: created.id, kind: "staff", name: { fa: "کارشناس" }, position: 2 },
    ])
    .returning({ id: departmentMember.id });
  await db.update(department).set({ headMemberId: members[1]?.id }).where(eq(department.id, created.id));
});

afterAll(async () => {
  await db.delete(department).where(eq(department.slug, slug));
  await db.$client.end();
});

describe("departments", () => {
  it("lists faculty by rank, apart from staff, with the head and the intro's paragraphs", async () => {
    const result = await getDepartment({ db, slug });
    if (result.kind !== "success") throw new Error("expected the department");

    expect(result.department.faculty.map((member) => member.name)).toEqual(["دانشیار", "مربی"]);
    expect(result.department.staff.map((member) => member.name)).toEqual(["کارشناس"]);
    expect(result.department.head?.name).toBe("دانشیار");
    expect(result.department.intro).toEqual(["یک", "دو"]);
  });

  it("treats an unknown or malformed slug as not found", async () => {
    expect(await getDepartment({ db, slug: "no-such-department" })).toEqual({ kind: "not-found" });
    expect(await getDepartment({ db, slug: "../ee" })).toEqual({ kind: "not-found" });
  });
});
