import { asc, eq } from "drizzle-orm";

import type { Database } from "#/db/client.server";
import { media, office, officeLink, officeMember } from "#/db/schema";
import type { MediaRecord } from "#/orpc/media/repository";

/*===== Types =====*/
export type OfficeRecord = typeof office.$inferSelect;
export type OfficeLinkRecord = typeof officeLink.$inferSelect;
export type OfficeMemberWithPhoto = { member: typeof officeMember.$inferSelect; photo: MediaRecord | null };

/*===== Reads =====*/
export async function findOfficeBySlug({
  db,
  slug,
}: {
  db: Database;
  slug: string;
}): Promise<OfficeRecord | undefined> {
  const [row] = await db.select().from(office).where(eq(office.slug, slug)).limit(1);
  return row;
}

export function findOffices({ db }: { db: Database }): Promise<Pick<OfficeRecord, "slug" | "updatedAt">[]> {
  return db.select({ slug: office.slug, updatedAt: office.updatedAt }).from(office).orderBy(asc(office.slug));
}

export function findOfficeMembers({
  db,
  officeId,
}: {
  db: Database;
  officeId: string;
}): Promise<OfficeMemberWithPhoto[]> {
  return db
    .select({ member: officeMember, photo: media })
    .from(officeMember)
    .leftJoin(media, eq(officeMember.photoMediaId, media.id))
    .where(eq(officeMember.officeId, officeId))
    .orderBy(asc(officeMember.position));
}

export function findOfficeLinks({ db, officeId }: { db: Database; officeId: string }): Promise<OfficeLinkRecord[]> {
  return db.select().from(officeLink).where(eq(officeLink.officeId, officeId)).orderBy(asc(officeLink.position));
}
