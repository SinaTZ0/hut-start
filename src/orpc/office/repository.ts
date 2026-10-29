import { asc, eq, inArray } from "drizzle-orm";

import type { Database } from "#/db/client.server";
import { media, office, officeLink, officeList, officeListItem, officeMember } from "#/db/schema";
import type { MediaRecord } from "#/orpc/media/repository";

/*===== Types =====*/
export type OfficeRecord = typeof office.$inferSelect;
export type OfficeLinkRecord = typeof officeLink.$inferSelect;
export type OfficeMemberWithPhoto = { member: typeof officeMember.$inferSelect; photo: MediaRecord | null };
export type OfficeListWithItems = typeof officeList.$inferSelect & {
  items: { item: typeof officeListItem.$inferSelect; image: MediaRecord | null }[];
};

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

export function findOffices({
  db,
}: {
  db: Database;
}): Promise<Pick<OfficeRecord, "slug" | "section" | "name" | "phone" | "email" | "updatedAt">[]> {
  return db
    .select({
      slug: office.slug,
      section: office.section,
      name: office.name,
      phone: office.phone,
      email: office.email,
      updatedAt: office.updatedAt,
    })
    .from(office)
    .orderBy(asc(office.slug));
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

/** The office's card lists in order, each with its cards and their pictures. */
export async function findOfficeLists({
  db,
  officeId,
}: {
  db: Database;
  officeId: string;
}): Promise<OfficeListWithItems[]> {
  const lists = await db
    .select()
    .from(officeList)
    .where(eq(officeList.officeId, officeId))
    .orderBy(asc(officeList.position));
  if (lists.length === 0) return [];

  const items = await db
    .select({ item: officeListItem, image: media })
    .from(officeListItem)
    .leftJoin(media, eq(officeListItem.imageMediaId, media.id))
    .where(
      inArray(
        officeListItem.listId,
        lists.map((list) => list.id),
      ),
    )
    .orderBy(asc(officeListItem.position));
  return lists.map((list) => ({ ...list, items: items.filter(({ item }) => item.listId === list.id) }));
}
