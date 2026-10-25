import { asc, eq } from "drizzle-orm";

import type { Database } from "#/db/client.server";
import {
  department,
  departmentDocument,
  departmentField,
  departmentLab,
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
}): Promise<Pick<DepartmentRecord, "slug" | "name" | "updatedAt">[]> {
  return db
    .select({ slug: department.slug, name: department.name, updatedAt: department.updatedAt })
    .from(department)
    .orderBy(asc(department.slug));
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
