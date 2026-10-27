import { eq } from "drizzle-orm";

import { db } from "#/db/client.server";
import type { Database } from "#/db/client.server";
import { bme } from "#/db/departments/bme";
import { bs } from "#/db/departments/bs";
import { ce } from "#/db/departments/ce";
import { chem } from "#/db/departments/chem";
import { ee } from "#/db/departments/ee";
import { materials } from "#/db/departments/materials";
import { mech } from "#/db/departments/mech";
import { mining } from "#/db/departments/mining";
import {
  department,
  departmentDocument,
  departmentField,
  departmentLab,
  departmentMember,
  departmentTrack,
  user,
} from "#/db/schema";
import type { DepartmentMilestone } from "#/db/schema";
import type { LocalizedText } from "#/lib/localized-text";
import type { AcademicRank, Degree, DocumentFormat, Honorific, MemberKind } from "#/orpc/department/constants";
import { attachMedia, deleteMedia, uploadMedia } from "#/orpc/media/service";

/*===== Seed Departments =====*/
// Loads the departments' pages from `src/db/departments/`: `pnpm db:seed:departments`, or in production
// `deploy/deploy.sh departments`. Every media row names its uploader, so the photos are uploaded as a system user the
// seed creates (see `systemUser`).
//
// A department that already exists is skipped, so the editor's changes are never overwritten. `--replace` deletes it
// first (its photos too) and loads it again; name slugs after it to limit the run: `-- --replace ee`.

/*===== Types =====*/
export type DepartmentSeed = {
  slug: string;
  name: LocalizedText;
  lede: LocalizedText;
  quote?: LocalizedText;
  /** Paragraphs separated by a blank line. */
  intro: LocalizedText;
  milestones: DepartmentMilestone[];
  foundedOn?: string;
  studentCount?: number;
  labsUrl?: string;
  members: {
    kind: MemberKind;
    /** The department's head; at most one. */
    head?: boolean;
    honorific?: Honorific;
    name: LocalizedText;
    rank?: AcademicRank;
    jobTitle?: LocalizedText;
    phone?: string;
    email?: string;
    office?: LocalizedText;
    homepageUrl?: string;
    scholarUrl?: string;
    /** Downloaded and stored as a `portrait` media. */
    photoUrl?: string;
  }[];
  fields: {
    key: string;
    name: LocalizedText;
    summary: LocalizedText;
    tracks: { degree: Degree; name: LocalizedText; note?: LocalizedText; planUrl?: string; chartUrl?: string }[];
  }[];
  labs: LocalizedText[];
  documents: { degree: Degree; title: LocalizedText; url: string; format: DocumentFormat; archived?: boolean }[];
};

const DEPARTMENTS: DepartmentSeed[] = [ee, ce, mech, bme, materials, chem, mining, bs];

/*===== Photos =====*/
// The university's sites turn away clients that don't look like a browser.
const BROWSER_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  accept: "image/avif,image/webp,image/*,*/*;q=0.8",
};

/**
 * Downloads a photo and stores it as an unattached `portrait`. A photo that can't be fetched or read is skipped with
 * a warning: the member is still seeded, without a photo.
 */
async function uploadPhoto({ url, uploader }: { url: string; uploader: string }): Promise<string | null> {
  try {
    const response = await fetch(url, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(30_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const file = new File([await response.arrayBuffer()], "photo", {
      type: response.headers.get("content-type") ?? "",
    });

    // The role only passes the upload's kind check (portraits are an admin's); the stored row records just the id.
    const result = await uploadMedia({ db, user: { id: uploader, role: "admin" }, kind: "portrait", file });
    if (result.kind !== "success") throw new Error(`upload refused: ${result.kind}`);
    return result.media.id;
  } catch (error) {
    console.warn(`Skipped a photo (${error instanceof Error ? error.message : error}): ${url}`);
    return null;
  }
}

/*===== System User =====*/
const SYSTEM_USER = { id: "system", name: "System", email: "system@system.invalid" };

/**
 * Returns the user the seed's photos are credited to, creating it on the first run. It can't sign in: it has no
 * password (no `account` row), it's blocked, and `.invalid` mail is never delivered. Its email also keeps anyone from
 * signing up as it.
 */
async function systemUser(): Promise<{ id: string }> {
  await db
    .insert(user)
    .values({ ...SYSTEM_USER, role: "user", status: "blocked" })
    .onConflictDoNothing({ target: user.id });
  return { id: SYSTEM_USER.id };
}

/*===== Remove =====*/
/** Deletes a department, its rows (cascade) and then its photos' files. */
async function removeDepartment({ slug }: { slug: string }): Promise<void> {
  const [record] = await db.select({ id: department.id }).from(department).where(eq(department.slug, slug));
  if (!record) return;

  const photos = await db
    .select({ id: departmentMember.photoMediaId })
    .from(departmentMember)
    .where(eq(departmentMember.departmentId, record.id));
  await db.delete(department).where(eq(department.id, record.id));

  for (const { id } of photos) if (id) await deleteMedia({ db, mediaId: id });
}

/*===== Insert =====*/
/**
 * Writes one department and everything on its page in one transaction, claiming the uploaded photos in it. If it
 * fails, the photos stay unattached and the media cleanup deletes them.
 */
async function insertDepartment({
  tx,
  seed,
  photos,
  uploader,
}: {
  tx: Database;
  seed: DepartmentSeed;
  photos: (string | null)[];
  uploader: string;
}): Promise<void> {
  /*------ Department ------*/
  const [record] = await tx
    .insert(department)
    .values({
      slug: seed.slug,
      name: seed.name,
      lede: seed.lede,
      quote: seed.quote,
      intro: seed.intro,
      milestones: seed.milestones,
      foundedOn: seed.foundedOn,
      studentCount: seed.studentCount,
      labsUrl: seed.labsUrl,
    })
    .returning({ id: department.id });
  if (!record) throw new Error(`Inserting ${seed.slug} returned no row`);
  const departmentId = record.id;

  /*------ Members ------*/
  for (const [position, member] of seed.members.entries()) {
    const photoMediaId = photos[position] ?? null;
    if (photoMediaId) {
      const attached = await attachMedia({ db: tx, mediaId: photoMediaId, kind: "portrait", userId: uploader });
      if (attached.kind !== "ok") throw new Error(`Could not attach the photo of ${member.name.fa}`);
    }

    const [row] = await tx
      .insert(departmentMember)
      .values({
        departmentId,
        kind: member.kind,
        honorific: member.honorific,
        name: member.name,
        rank: member.rank,
        jobTitle: member.jobTitle,
        phone: member.phone,
        email: member.email,
        office: member.office,
        homepageUrl: member.homepageUrl,
        scholarUrl: member.scholarUrl,
        photoMediaId,
        position,
      })
      .returning({ id: departmentMember.id });
    if (member.head && row)
      await tx.update(department).set({ headMemberId: row.id }).where(eq(department.id, departmentId));
  }

  /*------ Fields and Tracks ------*/
  let trackPosition = 0;
  for (const [position, field] of seed.fields.entries()) {
    const [row] = await tx
      .insert(departmentField)
      .values({ departmentId, key: field.key, name: field.name, summary: field.summary, position })
      .returning({ id: departmentField.id });
    if (!row) throw new Error(`Inserting the field ${field.key} returned no row`);

    for (const track of field.tracks) {
      await tx.insert(departmentTrack).values({ departmentId, fieldId: row.id, ...track, position: trackPosition++ });
    }
  }

  /*------ Labs and Files ------*/
  if (seed.labs.length > 0) {
    await tx.insert(departmentLab).values(seed.labs.map((name, position) => ({ departmentId, name, position })));
  }
  if (seed.documents.length > 0) {
    await tx
      .insert(departmentDocument)
      .values(seed.documents.map((document, position) => ({ departmentId, ...document, position })));
  }
}

/*===== Run =====*/
const args = process.argv.slice(2);
const replace = args.includes("--replace");
const only = args.filter((arg) => !arg.startsWith("--"));

const system = await systemUser();

for (const seed of DEPARTMENTS) {
  if (only.length > 0 && !only.includes(seed.slug)) continue;

  const [existing] = await db.select({ id: department.id }).from(department).where(eq(department.slug, seed.slug));
  if (existing && !replace) {
    console.info(`Skipped ${seed.slug}: it exists. Pass --replace to load it again.`);
    continue;
  }
  if (existing) await removeDepartment({ slug: seed.slug });

  // Downloads and uploads happen before the transaction, so it doesn't hold a connection open over the network.
  const photos: (string | null)[] = [];
  for (const member of seed.members) {
    photos.push(member.photoUrl ? await uploadPhoto({ url: member.photoUrl, uploader: system.id }) : null);
  }

  await db.transaction((tx) => insertDepartment({ tx, seed, photos, uploader: system.id }));
  console.info(`Seeded ${seed.slug}: ${photos.filter(Boolean).length} photos.`);
}

await db.$client.end();
