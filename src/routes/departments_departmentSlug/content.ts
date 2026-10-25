import type { AcademicRank } from "#/orpc/department/constants";
import type { DepartmentField, DepartmentMember } from "#/orpc/department/contract";
import { formatNumber } from "#/lib/locale";
import { m } from "#/paraglide/messages";

/*===== Drawings =====*/
// Each department's signature drawings (docs/frontend/app-identity.md → Brand) ship with the app, in
// `public/images/departments/<slug>/`, as transparent WebPs used as masks. A department without them yet gets the page
// without art.

const DRAWN = new Set(["ee", "ce", "mech", "bme", "materials", "chem", "mining", "bs"]);

export type Drawings = { hero: string; lab: string; field: (key: string) => string };

export function departmentDrawings(slug: string): Drawings | null {
  if (!DRAWN.has(slug)) return null;
  const folder = `/images/departments/${slug}`;
  return { hero: `${folder}/hero.webp`, lab: `${folder}/lab.webp`, field: (key) => `${folder}/field-${key}.webp` };
}

/*===== Degrees =====*/
/**
 * Whether the department admits students to a degree of its own. One that doesn't (Basic Sciences) only teaches other
 * programmes' courses: its fields are subject areas, with no degree rows to show.
 */
export function admitsStudents(fields: DepartmentField[]): boolean {
  return fields.some((field) => field.tracks.length > 0);
}

/*===== People =====*/
export const RANK_LABELS: Record<AcademicRank, () => string> = {
  professor: m.department_rank_professor,
  associate: m.department_rank_associate,
  assistant: m.department_rank_assistant,
  lecturer: m.department_rank_lecturer,
};

/** The name as it is addressed: «دکتر …», «مهندس …», or bare. */
export function memberName(member: DepartmentMember): string {
  if (member.honorific === "doctor") return m.department_honorific_doctor({ name: member.name });
  if (member.honorific === "engineer") return m.department_honorific_engineer({ name: member.name });
  return member.name;
}

/** `08138411526` as «۰۸۱-۳۸۴۱۱۵۲۶»: the area code apart, in the page's digits, like the site's own number. */
export function formatPhone(phone: string): string {
  return phone.replace(/^(0\d{2})(\d+)$/, "$1-$2").replace(/\d/g, (digit) => formatNumber(Number(digit)));
}

/*===== Sections =====*/
/** A section's number before its heading, «۰۱». */
export function sectionNumber(value: number): string {
  return formatNumber(value, { minimumIntegerDigits: 2 });
}

/** An ISO date (`2006-09-23`) at midday UTC, so formatting it in any time zone keeps the day. */
export function isoToDate(value: string): Date {
  return new Date(`${value}T12:00:00Z`);
}
