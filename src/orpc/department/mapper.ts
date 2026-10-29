import { localize, localizeOptional } from "#/lib/localized-text";
import { oneOf } from "#/orpc/allowed-values";
import {
  ACADEMIC_RANKS,
  DEGREES,
  DOCUMENT_FORMATS,
  HONORIFICS,
  LAB_FILE_FORMATS,
  LAB_ROLES,
  MEMBER_KINDS,
} from "#/orpc/department/constants";
import type { Department, DepartmentMember, DepartmentSummary } from "#/orpc/department/contract";
import type {
  DepartmentDocumentRecord,
  DepartmentFieldRecord,
  DepartmentLabFileRecord,
  DepartmentLabRecord,
  DepartmentRecord,
  DepartmentTrackRecord,
  MemberWithPhoto,
} from "#/orpc/department/repository";
import { toPublicMedia } from "#/orpc/media/mapper";

/*===== Text =====*/
/** Paragraphs separated by a blank line; none for no text. */
function paragraphs(text: string | null): string[] {
  return text
    ? text
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];
}

/*===== Member =====*/
function toPublicMember({ member, photo }: MemberWithPhoto): DepartmentMember {
  return {
    id: member.id,
    kind: oneOf({ allowed: MEMBER_KINDS, value: member.kind, what: "department member kind" }),
    honorific: member.honorific
      ? oneOf({ allowed: HONORIFICS, value: member.honorific, what: "department honorific" })
      : null,
    name: localize(member.name),
    rank: member.rank ? oneOf({ allowed: ACADEMIC_RANKS, value: member.rank, what: "department rank" }) : null,
    jobTitle: localizeOptional(member.jobTitle),
    phone: member.phone,
    email: member.email,
    office: localizeOptional(member.office),
    homepageUrl: member.homepageUrl,
    scholarUrl: member.scholarUrl,
    photo: photo ? toPublicMedia(photo) : null,
    labRole: member.labRole ? oneOf({ allowed: LAB_ROLES, value: member.labRole, what: "department lab role" }) : null,
    labNote: localizeOptional(member.labNote),
  };
}

/** Where a member's rank sorts; members without one come last. */
function rankIndex(member: DepartmentMember): number {
  return member.rank ? ACADEMIC_RANKS.indexOf(member.rank) : ACADEMIC_RANKS.length;
}

/** Highest rank first; the editor's order (already applied) within a rank. */
function byRank(a: DepartmentMember, b: DepartmentMember): number {
  return rankIndex(a) - rankIndex(b);
}

/*===== Department =====*/
/**
 * Converts a department and its child rows into the page's shape, in the request's locale: the faculty sorted by rank,
 * each field with its degree tracks, the intro split into paragraphs.
 */
export function toPublicDepartment({
  department,
  members,
  fields,
  tracks,
  labs,
  documents,
  labFiles,
}: {
  department: DepartmentRecord;
  members: MemberWithPhoto[];
  fields: DepartmentFieldRecord[];
  tracks: DepartmentTrackRecord[];
  labs: DepartmentLabRecord[];
  documents: DepartmentDocumentRecord[];
  labFiles: DepartmentLabFileRecord[];
}): Department {
  const people = members.map(toPublicMember);

  return {
    id: department.id,
    slug: department.slug,
    name: localize(department.name),
    lede: localize(department.lede),
    quote: localizeOptional(department.quote),
    intro: paragraphs(localize(department.intro)),
    milestones: department.milestones
      .toSorted((a, b) => a.on.localeCompare(b.on))
      .map((milestone) => ({ on: milestone.on, label: localize(milestone.label) })),
    studentCount: department.studentCount,
    updatedAt: department.updatedAt,
    head: people.find((person) => person.id === department.headMemberId) ?? null,
    // `toSorted` is stable, so the editor's order holds within each rank.
    faculty: people.filter((person) => person.kind === "faculty").toSorted(byRank),
    staff: people.filter((person) => person.kind === "staff"),
    fields: fields.map((field) => ({
      id: field.id,
      key: field.key,
      name: localize(field.name),
      summary: localize(field.summary),
      tracks: tracks
        .filter((track) => track.fieldId === field.id)
        .map((track) => ({
          id: track.id,
          degree: oneOf({ allowed: DEGREES, value: track.degree, what: "department degree" }),
          name: localize(track.name),
          note: localizeOptional(track.note),
          planUrl: track.planUrl,
          chartUrl: track.chartUrl,
        })),
    })),
    labsIntro: paragraphs(localizeOptional(department.labsIntro)),
    labs: labs.map((lab) => ({
      id: lab.id,
      name: localize(lab.name),
      description: localizeOptional(lab.description),
      equipment: lab.equipment.map(localize),
    })),
    labFiles: labFiles.map((file) => ({
      id: file.id,
      title: localize(file.title),
      url: file.url,
      format: oneOf({ allowed: LAB_FILE_FORMATS, value: file.format, what: "department lab file format" }),
    })),
    documents: documents.map((document) => ({
      id: document.id,
      degree: oneOf({ allowed: DEGREES, value: document.degree, what: "department degree" }),
      title: localize(document.title),
      url: document.url,
      format: oneOf({ allowed: DOCUMENT_FORMATS, value: document.format, what: "department document format" }),
      archived: document.archived,
    })),
  };
}

/*===== Summary =====*/
export function toDepartmentSummary(record: Pick<DepartmentRecord, "slug" | "name" | "updatedAt">): DepartmentSummary {
  return { slug: record.slug, name: localize(record.name), updatedAt: record.updatedAt };
}
