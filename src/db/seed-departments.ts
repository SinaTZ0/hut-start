import { eq } from "drizzle-orm";

import { db } from "#/db/client.server";
import type { Database } from "#/db/client.server";
import { bme } from "#/db/departments/bme";
import { bs } from "#/db/departments/bs";
import { ce } from "#/db/departments/ce";
import { chem } from "#/db/departments/chem";
import { ee } from "#/db/departments/ee";
import { departmentLabs, type LabsSeed } from "#/db/departments/labs";
import { materials } from "#/db/departments/materials";
import { mech } from "#/db/departments/mech";
import { mining } from "#/db/departments/mining";
import {
  department,
  departmentDocument,
  departmentField,
  departmentLab,
  departmentLabFile,
  departmentMember,
  departmentTrack,
} from "#/db/schema";
import type { DepartmentMilestone } from "#/db/schema";
import type { LocalizedText } from "#/lib/localized-text";
import { normalizePersianText } from "#/lib/persian-text";
import type { AcademicRank, Degree, DocumentFormat, Honorific, MemberKind } from "#/orpc/department/constants";
import { uploadPhoto, systemUser } from "#/db/seed-media";
import { attachMedia, deleteMedia } from "#/orpc/media/service";

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

/*===== Labs =====*/
/** A name as the lab pages and the department pages both write it: no ZWNJs or spaces, Persian letters. */
function nameKey(name: string): string {
  return normalizePersianText(name).replace(/[\s‌]/g, "");
}

/**
 * The department's members followed by the lab pages' people who aren't among them, added as staff: everyone the
 * department's page and its labs page show, in one list.
 */
function allMembers(seed: DepartmentSeed): DepartmentSeed["members"] {
  const labs = departmentLabs[seed.slug];
  const known = new Set(seed.members.map((member) => nameKey(member.name.fa)));
  const extras = (labs?.people ?? [])
    .filter((person) => !known.has(nameKey(person.name.fa)))
    .map((person) => ({
      kind: "staff" as const,
      honorific: person.honorific,
      name: person.name,
      jobTitle:
        person.role === "expert"
          ? { fa: "کارشناس آزمایشگاه", en: "Lab expert" }
          : { fa: "سرپرست آزمایشگاه", en: "Lab supervisor" },
      phone: person.phone,
      email: person.email,
      photoUrl: person.photoUrl,
    }));
  return [...seed.members, ...extras];
}

/** A member's part on the labs page, from the lab people with the same name. */
function labPart({ labs, name }: { labs: LabsSeed | undefined; name: LocalizedText }) {
  const person = labs?.people.find((candidate) => nameKey(candidate.name.fa) === nameKey(name.fa));
  return { labRole: person?.role ?? null, labNote: person?.note ?? null };
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
  const labs = departmentLabs[seed.slug];

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
      labsIntro: labs?.intro,
    })
    .returning({ id: department.id });
  if (!record) throw new Error(`Inserting ${seed.slug} returned no row`);
  const departmentId = record.id;

  /*------ Members ------*/
  for (const [position, member] of allMembers(seed).entries()) {
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
        ...labPart({ labs, name: member.name }),
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
  // The labs page's list, when the department has one, is fuller than the department page's names.
  const labRows = labs
    ? labs.labs.map((lab, position) => ({
        departmentId,
        name: lab.name,
        description: lab.description && { ...lab.description, fa: normalizePersianText(lab.description.fa) },
        equipment: (lab.equipment ?? []).map((item) => ({ ...item, fa: normalizePersianText(item.fa) })),
        position,
      }))
    : seed.labs.map((name, position) => ({ departmentId, name, position }));
  if (labRows.length > 0) await tx.insert(departmentLab).values(labRows);
  if (labs && labs.files.length > 0) {
    await tx
      .insert(departmentLabFile)
      .values(labs.files.map((file, position) => ({ departmentId, ...file, position })));
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
  for (const member of allMembers(seed)) {
    photos.push(member.photoUrl ? await uploadPhoto({ url: member.photoUrl, uploader: system.id }) : null);
  }

  await db.transaction((tx) => insertDepartment({ tx, seed, photos, uploader: system.id }));
  console.info(`Seeded ${seed.slug}: ${photos.filter(Boolean).length} photos.`);
}

await db.$client.end();
