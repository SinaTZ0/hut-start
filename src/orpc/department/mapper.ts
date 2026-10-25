import { localize, localizeOptional } from "#/lib/localized-text";
import { ACADEMIC_RANKS, DEGREES, DOCUMENT_FORMATS, HONORIFICS, MEMBER_KINDS } from "#/orpc/department/constants";
import type { Department, DepartmentMember, DepartmentSummary } from "#/orpc/department/contract";
import type {
  DepartmentDocumentRecord,
  DepartmentFieldRecord,
  DepartmentLabRecord,
  DepartmentRecord,
  DepartmentTrackRecord,
  MemberWithPhoto,
} from "#/orpc/department/repository";
import { toPublicMedia } from "#/orpc/media/mapper";

/*===== Allowed Values =====*/
/**
 * Narrows a stored plain-text value to its allowed set.
 *
 * @throws When the value isn't allowed. Only code writes these columns, so this means corrupted data that should
 * surface instead of rendering a guess.
 */
function oneOf<const T extends readonly string[]>({
  allowed,
  value,
  what,
}: {
  allowed: T;
  value: string;
  what: string;
}) {
  if (!allowed.includes(value)) throw new Error(`Unknown department ${what}: ${value}`);
  return value as T[number];
}

/*===== Member =====*/
function toPublicMember({ member, photo }: MemberWithPhoto): DepartmentMember {
  return {
    id: member.id,
    kind: oneOf({ allowed: MEMBER_KINDS, value: member.kind, what: "member kind" }),
    honorific: member.honorific ? oneOf({ allowed: HONORIFICS, value: member.honorific, what: "honorific" }) : null,
    name: localize(member.name),
    rank: member.rank ? oneOf({ allowed: ACADEMIC_RANKS, value: member.rank, what: "rank" }) : null,
    jobTitle: localizeOptional(member.jobTitle),
    phone: member.phone,
    email: member.email,
    office: localizeOptional(member.office),
    homepageUrl: member.homepageUrl,
    scholarUrl: member.scholarUrl,
    photo: photo ? toPublicMedia(photo) : null,
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
}: {
  department: DepartmentRecord;
  members: MemberWithPhoto[];
  fields: DepartmentFieldRecord[];
  tracks: DepartmentTrackRecord[];
  labs: DepartmentLabRecord[];
  documents: DepartmentDocumentRecord[];
}): Department {
  const people = members.map(toPublicMember);

  return {
    id: department.id,
    slug: department.slug,
    name: localize(department.name),
    lede: localize(department.lede),
    quote: localizeOptional(department.quote),
    intro: localize(department.intro)
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
    milestones: department.milestones
      .toSorted((a, b) => a.on.localeCompare(b.on))
      .map((milestone) => ({ on: milestone.on, label: localize(milestone.label) })),
    studentCount: department.studentCount,
    labsUrl: department.labsUrl,
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
          degree: oneOf({ allowed: DEGREES, value: track.degree, what: "degree" }),
          name: localize(track.name),
          note: localizeOptional(track.note),
          planUrl: track.planUrl,
          chartUrl: track.chartUrl,
        })),
    })),
    labs: labs.map((lab) => ({ id: lab.id, name: localize(lab.name) })),
    documents: documents.map((document) => ({
      id: document.id,
      degree: oneOf({ allowed: DEGREES, value: document.degree, what: "degree" }),
      title: localize(document.title),
      url: document.url,
      format: oneOf({ allowed: DOCUMENT_FORMATS, value: document.format, what: "document format" }),
      archived: document.archived,
    })),
  };
}

/*===== Summary =====*/
export function toDepartmentSummary(record: Pick<DepartmentRecord, "slug" | "name" | "updatedAt">): DepartmentSummary {
  return { slug: record.slug, name: localize(record.name), updatedAt: record.updatedAt };
}
