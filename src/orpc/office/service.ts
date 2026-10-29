import type { Database } from "#/db/client.server";
import { localize, localizeOptional } from "#/lib/localized-text";
import { oneOf } from "#/orpc/allowed-values";
import { ACADEMIC_RANKS, HONORIFICS } from "#/orpc/department/constants";
import { toListedItem } from "#/orpc/home-feed/mapper";
import { findLatestInCategory } from "#/orpc/home-feed/repository";
import { loadSections } from "#/orpc/library/service";
import { toPublicMedia } from "#/orpc/media/mapper";
import { OFFICE_LINK_ICONS, OFFICE_ROLES, OFFICE_SECTIONS, OFFICE_SLUG_PATTERN } from "#/orpc/office/constants";
import type { Office, OfficeSummary } from "#/orpc/office/contract";
import {
  findOfficeBySlug,
  findOfficeLinks,
  findOfficeLists,
  findOfficeMembers,
  findOffices,
} from "#/orpc/office/repository";

/*===== Constants =====*/
const NOTICE_COUNT = 5;

/** Paragraphs separated by a blank line. */
function paragraphs(text: string | null): string[] {
  return text
    ? text
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];
}

/*===== Get =====*/
type GetOfficeResult = { kind: "success"; office: Office } | { kind: "not-found" };

/**
 * Loads everything an office's page shows, in the request's locale: its people, tools, files and newest notices.
 *
 * @returns `not-found` for an unknown slug, or one that can't be a slug at all.
 */
export async function getOffice({ db, slug }: { db: Database; slug: string }): Promise<GetOfficeResult> {
  if (!OFFICE_SLUG_PATTERN.test(slug)) return { kind: "not-found" };
  const record = await findOfficeBySlug({ db, slug });
  if (!record) return { kind: "not-found" };

  // Independent reads; the pool runs them side by side.
  const [members, links, lists, library, notices] = await Promise.all([
    findOfficeMembers({ db, officeId: record.id }),
    findOfficeLinks({ db, officeId: record.id }),
    findOfficeLists({ db, officeId: record.id }),
    loadSections({ db, officeId: record.id }),
    record.feedCategory
      ? findLatestInCategory({ db, category: record.feedCategory, limit: NOTICE_COUNT })
      : Promise.resolve([]),
  ]);

  return {
    kind: "success",
    office: {
      slug: record.slug,
      section: oneOf({ allowed: OFFICE_SECTIONS, value: record.section, what: "office section" }),
      name: localize(record.name),
      lede: localize(record.lede),
      intro: paragraphs(localizeOptional(record.intro)),
      duties: record.duties.map(localize),
      notes: record.notes.map(localize),
      place: localizeOptional(record.place),
      hours: localizeOptional(record.hours),
      phone: record.phone,
      fax: record.fax,
      email: record.email,
      feedCategory: record.feedCategory,
      updatedAt: record.updatedAt,
      members: members.map(({ member, photo }) => ({
        id: member.id,
        role: oneOf({ allowed: OFFICE_ROLES, value: member.role, what: "office role" }),
        honorific: member.honorific
          ? oneOf({ allowed: HONORIFICS, value: member.honorific, what: "office honorific" })
          : null,
        name: localize(member.name),
        jobTitle: localizeOptional(member.jobTitle),
        rank: member.rank ? oneOf({ allowed: ACADEMIC_RANKS, value: member.rank, what: "office rank" }) : null,
        degree: localizeOptional(member.degree),
        term: member.term,
        phone: member.phone,
        email: member.email,
        resumeUrl: member.resumeUrl,
        photo: photo ? toPublicMedia(photo) : null,
      })),
      links: links.map((link) => ({
        id: link.id,
        title: localize(link.title),
        description: localizeOptional(link.description),
        url: link.url,
        icon: oneOf({ allowed: OFFICE_LINK_ICONS, value: link.icon, what: "office link icon" }),
      })),
      lists: lists.map((list) => ({
        id: list.id,
        title: localize(list.title),
        items: list.items.map(({ item, image }) => ({
          id: item.id,
          title: localize(item.title),
          text: localizeOptional(item.text),
          url: item.url,
          image: image ? toPublicMedia(image) : null,
        })),
      })),
      faq: record.faq.map((entry) => ({ question: localize(entry.question), answer: localize(entry.answer) })),
      schedules: record.schedules.map((schedule) => ({
        title: localize(schedule.title),
        columns: schedule.columns.map(localize),
        rows: schedule.rows.map((row) => ({ label: localize(row.label), cells: row.cells.map(localize) })),
      })),
      sections: library.sections,
      notices: notices.map(toListedItem),
    },
  };
}

/*===== List =====*/
export async function listOffices({ db }: { db: Database }): Promise<OfficeSummary[]> {
  const rows = await findOffices({ db });
  return rows.map((row) => ({
    ...row,
    section: oneOf({ allowed: OFFICE_SECTIONS, value: row.section, what: "office section" }),
    name: localize(row.name),
  }));
}
