import { asc, count, eq } from "drizzle-orm";

import type { Database } from "#/db/client.server";
import {
  department,
  departmentDocument,
  departmentField,
  departmentLab,
  departmentLabFile,
  departmentMember,
  departmentTrack,
  media,
} from "#/db/schema";
import type { MediaRecord } from "#/orpc/media/repository";

/*===== Types =====*/
export type DepartmentRecord = typeof department.$inferSelect;
export type DepartmentMemberRecord = typeof departmentMember.$inferSelect;
export type DepartmentFieldRecord = typeof departmentField.$inferSelect;
export type DepartmentTrackRecord = typeof departmentTrack.$inferSelect;
export type DepartmentLabRecord = typeof departmentLab.$inferSelect;
export type DepartmentDocumentRecord = typeof departmentDocument.$inferSelect;
export type DepartmentLabFileRecord = typeof departmentLabFile.$inferSelect;

/** A member with their photo row, if they have one. */
export type MemberWithPhoto = { member: DepartmentMemberRecord; photo: MediaRecord | null };

/*===== Reads =====*/
export async function findDepartmentBySlug({
  db,
  slug,
}: {
  db: Database;
  slug: string;
}): Promise<DepartmentRecord | undefined> {
  const [row] = await db.select().from(department).where(eq(department.slug, slug)).limit(1);
  return row;
}

/** Every department, in slug order; the page's content stays out. */
export function findDepartments({
  db,
}: {
  db: Database;
}): Promise<Pick<DepartmentRecord, "id" | "slug" | "name" | "updatedAt">[]> {
  return db
    .select({ id: department.id, slug: department.slug, name: department.name, updatedAt: department.updatedAt })
    .from(department)
    .orderBy(asc(department.slug));
}

/** The fields of every department, in the editor's order, for the index. */
export function findAllFields({
  db,
}: {
  db: Database;
}): Promise<Pick<DepartmentFieldRecord, "departmentId" | "key" | "name">[]> {
  return db
    .select({ departmentId: departmentField.departmentId, key: departmentField.key, name: departmentField.name })
    .from(departmentField)
    .orderBy(asc(departmentField.position));
}

/** How many faculty members each department has; a department with none has no row. */
export function countFaculty({ db }: { db: Database }): Promise<{ departmentId: string; total: number }[]> {
  return db
    .select({ departmentId: departmentMember.departmentId, total: count() })
    .from(departmentMember)
    .where(eq(departmentMember.kind, "faculty"))
    .groupBy(departmentMember.departmentId);
}

/** How many labs each department has; a department with none has no row. */
export function countLabs({ db }: { db: Database }): Promise<{ departmentId: string; total: number }[]> {
  return db
    .select({ departmentId: departmentLab.departmentId, total: count() })
    .from(departmentLab)
    .groupBy(departmentLab.departmentId);
}

/** A department's people with their photos, in the editor's order. */
export function findMembers({ db, departmentId }: { db: Database; departmentId: string }): Promise<MemberWithPhoto[]> {
  return db
    .select({ member: departmentMember, photo: media })
    .from(departmentMember)
    .leftJoin(media, eq(departmentMember.photoMediaId, media.id))
    .where(eq(departmentMember.departmentId, departmentId))
    .orderBy(asc(departmentMember.position));
}

export function findFields({
  db,
  departmentId,
}: {
  db: Database;
  departmentId: string;
}): Promise<DepartmentFieldRecord[]> {
  return db
    .select()
    .from(departmentField)
    .where(eq(departmentField.departmentId, departmentId))
    .orderBy(asc(departmentField.position));
}

export function findTracks({
  db,
  departmentId,
}: {
  db: Database;
  departmentId: string;
}): Promise<DepartmentTrackRecord[]> {
  return db
    .select()
    .from(departmentTrack)
    .where(eq(departmentTrack.departmentId, departmentId))
    .orderBy(asc(departmentTrack.position));
}

export function findLabs({ db, departmentId }: { db: Database; departmentId: string }): Promise<DepartmentLabRecord[]> {
  return db
    .select()
    .from(departmentLab)
    .where(eq(departmentLab.departmentId, departmentId))
    .orderBy(asc(departmentLab.position));
}

export function findDocuments({
  db,
  departmentId,
}: {
  db: Database;
  departmentId: string;
}): Promise<DepartmentDocumentRecord[]> {
  return db
    .select()
    .from(departmentDocument)
    .where(eq(departmentDocument.departmentId, departmentId))
    .orderBy(asc(departmentDocument.position));
}

export function findLabFiles({
  db,
  departmentId,
}: {
  db: Database;
  departmentId: string;
}): Promise<DepartmentLabFileRecord[]> {
  return db
    .select()
    .from(departmentLabFile)
    .where(eq(departmentLabFile.departmentId, departmentId))
    .orderBy(asc(departmentLabFile.position));
}
