import { eq } from "drizzle-orm";

import { db } from "#/db/client.server";
import { directory } from "#/db/pages/directory";
import { library as forms } from "#/db/pages/library";
import { offices as mainOffices } from "#/db/pages/offices";
import { researchOffices, researchOfficeFiles } from "#/db/pages/offices-research";
import { studentOffices, studentOfficeFiles } from "#/db/pages/offices-student";
import { vicePresidencies, vicePresidencyFiles } from "#/db/pages/offices-vice-presidencies";
import { systemUser, uploadPhoto } from "#/db/seed-media";
import {
  directoryEntry,
  directoryUnit,
  libraryDocument,
  libraryGroup,
  librarySection,
  office,
  officeLink,
  officeList,
  officeListItem,
  officeMember,
} from "#/db/schema";
import { normalizePersianText } from "#/lib/persian-text";
import { attachMedia, deleteMedia } from "#/orpc/media/service";

/*===== Seed Pages =====*/
// Loads the pages moved from the old site that hold content rather than links (`src/db/pages/`): the offices, the forms
// library (and the offices' files) and the phone book.
// `pnpm db:seed:pages`, or in production `deploy/deploy.sh seed pages`.
//
// A part that already has rows is skipped, so an editor's changes are never overwritten; the offices and the library
// only add what's missing (an office or a section added to the seed since). `--replace` deletes a part first and loads
// it again; name parts after it to limit the run: `-- --replace phonebook`.

// The offices of hut.ac.ir, then the ones moved from the university's own subsites (the vice-presidencies and their
// units). The files of those come in their own seed files.
const offices = [...mainOffices, ...vicePresidencies, ...researchOffices, ...studentOffices];
const library = [...forms, ...vicePresidencyFiles, ...researchOfficeFiles, ...studentOfficeFiles];

/*===== Phone Book =====*/
async function seedPhonebook(): Promise<string> {
  await db.transaction(async (tx) => {
    for (const [position, unit] of directory.entries()) {
      const [row] = await tx
        .insert(directoryUnit)
        .values({ key: unit.key, group: unit.group, name: unit.name, position })
        .returning({ id: directoryUnit.id });
      if (!row) throw new Error(`Inserting the unit ${unit.key} returned no row`);

      await tx.insert(directoryEntry).values(
        unit.entries.map((entry, index) => ({
          unitId: row.id,
          name: { ...entry.name, fa: normalizePersianText(entry.name.fa) },
          role: entry.role,
          extensions: entry.extensions,
          position: index,
        })),
      );
    }
  });
  return `${directory.reduce((sum, unit) => sum + unit.entries.length, 0)} lines`;
}

/*===== Offices =====*/
// Photos are uploaded before each office's transaction, so it doesn't hold a connection open over the network; if the
// transaction fails, they stay unattached and the media cleanup deletes them.
/** The offices in the seed that aren't stored: all of them on a first run, then the ones added since. */
async function missingOffices() {
  const stored = new Set((await db.select({ slug: office.slug }).from(office)).map((row) => row.slug));
  return offices.filter((seed) => !stored.has(seed.slug));
}

async function seedOffices(): Promise<string> {
  const system = await systemUser();
  const missing = await missingOffices();
  let photoCount = 0;

  for (const seed of missing) {
    const photos: (string | null)[] = [];
    for (const member of seed.members) {
      photos.push(member.photoUrl ? await uploadPhoto({ url: member.photoUrl, uploader: system.id }) : null);
    }
    // A list's pictures (book covers) are portraits too, one array per list.
    const pictures: (string | null)[][] = [];
    for (const list of seed.lists ?? []) {
      const row: (string | null)[] = [];
      for (const item of list.items) {
        row.push(item.imageUrl ? await uploadPhoto({ url: item.imageUrl, uploader: system.id }) : null);
      }
      pictures.push(row);
    }
    photoCount += [...photos, ...pictures.flat()].filter(Boolean).length;

    await db.transaction(async (tx) => {
      const [row] = await tx
        .insert(office)
        .values({
          slug: seed.slug,
          section: seed.section,
          name: seed.name,
          lede: seed.lede,
          intro: seed.intro,
          duties: seed.duties ?? [],
          notes: seed.notes ?? [],
          place: seed.place,
          hours: seed.hours,
          phone: seed.phone,
          fax: seed.fax,
          email: seed.email,
          feedCategory: seed.feedCategory,
          faq: seed.faq ?? [],
          schedules: seed.schedules ?? [],
        })
        .returning({ id: office.id });
      if (!row) throw new Error(`Inserting the office ${seed.slug} returned no row`);

      for (const [index, member] of seed.members.entries()) {
        const photoMediaId = photos[index] ?? null;
        if (photoMediaId) {
          const attached = await attachMedia({ db: tx, mediaId: photoMediaId, kind: "portrait", userId: system.id });
          if (attached.kind !== "ok") throw new Error(`Could not attach the photo of ${member.name.fa}`);
        }
        const { photoUrl: _photoUrl, ...fields } = member;
        await tx.insert(officeMember).values({ officeId: row.id, ...fields, photoMediaId, position: index });
      }

      if (seed.links.length > 0) {
        await tx
          .insert(officeLink)
          .values(seed.links.map((link, index) => ({ officeId: row.id, ...link, position: index })));
      }

      for (const [listIndex, list] of (seed.lists ?? []).entries()) {
        const [listRow] = await tx
          .insert(officeList)
          .values({ officeId: row.id, title: list.title, position: listIndex })
          .returning({ id: officeList.id });
        if (!listRow) throw new Error(`Inserting a list of ${seed.slug} returned no row`);

        for (const [index, item] of list.items.entries()) {
          const imageMediaId = pictures[listIndex]?.[index] ?? null;
          if (imageMediaId) {
            const attached = await attachMedia({ db: tx, mediaId: imageMediaId, kind: "portrait", userId: system.id });
            if (attached.kind !== "ok") throw new Error(`Could not attach the picture of ${item.title.fa}`);
          }
          const { imageUrl: _imageUrl, ...fields } = item;
          await tx.insert(officeListItem).values({ listId: listRow.id, ...fields, imageMediaId, position: index });
        }
      }
    });
  }
  return `${missing.length} offices, ${photoCount} photos`;
}

/** Deletes every office, its rows (cascade) and then its photos' and covers' files. */
async function clearOffices(): Promise<void> {
  const photos = await db.select({ id: officeMember.photoMediaId }).from(officeMember);
  const covers = await db.select({ id: officeListItem.imageMediaId }).from(officeListItem);
  await db.delete(office);
  for (const { id } of [...photos, ...covers]) if (id) await deleteMedia({ db, mediaId: id });
}

/*===== Library =====*/
/** The sections in the seed that aren't stored: all of them on a first run, an office's after its office was replaced. */
async function missingSections() {
  const stored = new Set((await db.select({ key: librarySection.key }).from(librarySection)).map((row) => row.key));
  return library.filter((section) => !stored.has(section.key));
}

async function seedLibrary(): Promise<string> {
  const missing = new Set((await missingSections()).map((section) => section.key));
  let count = 0;
  await db.transaction(async (tx) => {
    for (const [position, section] of library.entries()) {
      if (!missing.has(section.key)) continue;
      let officeId: string | null = null;
      if (section.office) {
        const [owner] = await tx.select({ id: office.id }).from(office).where(eq(office.slug, section.office));
        if (!owner)
          throw new Error(`The section ${section.key} names the office ${section.office}, which isn't loaded`);
        officeId = owner.id;
      }

      const [row] = await tx
        .insert(librarySection)
        .values({ key: section.key, officeId, icon: section.icon, title: section.title, position })
        .returning({ id: librarySection.id });
      if (!row) throw new Error(`Inserting the section ${section.key} returned no row`);

      for (const [groupPosition, group] of section.groups.entries()) {
        const [groupRow] = await tx
          .insert(libraryGroup)
          .values({ sectionId: row.id, title: group.title, position: groupPosition })
          .returning({ id: libraryGroup.id });
        if (!groupRow) throw new Error(`Inserting a group of ${section.key} returned no row`);

        await tx
          .insert(libraryDocument)
          .values(group.documents.map((document, index) => ({ groupId: groupRow.id, ...document, position: index })));
        count += group.documents.length;
      }
    }
  });
  return `${count} files`;
}

/*===== Parts =====*/
type Part = { has: () => Promise<boolean>; clear: () => Promise<void>; seed: () => Promise<string> };

// In load order: the library's office sections need their offices.
const PARTS: Record<string, Part> = {
  offices: {
    has: async () => (await missingOffices()).length === 0,
    clear: clearOffices,
    seed: seedOffices,
  },
  library: {
    // Replacing the offices drops their sections (cascade); this part then loads just those again.
    has: async () => (await missingSections()).length === 0,
    // Groups and files go with their section (cascade).
    clear: async () => void (await db.delete(librarySection)),
    seed: seedLibrary,
  },
  phonebook: {
    has: async () => (await db.select({ id: directoryUnit.id }).from(directoryUnit).limit(1)).length > 0,
    // Entries go with their unit (cascade).
    clear: async () => void (await db.delete(directoryUnit)),
    seed: seedPhonebook,
  },
};

/*===== Run =====*/
const args = process.argv.slice(2);
const replace = args.includes("--replace");
const only = args.filter((arg) => !arg.startsWith("--"));

for (const unknown of only.filter((name) => !(name in PARTS))) {
  throw new Error(`Unknown part ${unknown}; the parts are ${Object.keys(PARTS).join(", ")}.`);
}

for (const [name, part] of Object.entries(PARTS)) {
  if (only.length > 0 && !only.includes(name)) continue;

  if (await part.has()) {
    if (!replace) {
      console.info(`Skipped ${name}: it has rows. Pass --replace to load it again.`);
      continue;
    }
    await part.clear();
  }
  console.info(`Seeded ${name}: ${await part.seed()}.`);
}

await db.$client.end();
