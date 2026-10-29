import type { DepartmentField, DepartmentMember } from "#/orpc/department/contract";
import { personName } from "#/lib/university/people";

/*===== Degrees =====*/
/**
 * Whether the department admits students to a degree of its own. One that doesn't (Basic Sciences) only teaches other
 * programmes' courses: its fields are subject areas, with no degree rows to show.
 */
export function admitsStudents(fields: DepartmentField[]): boolean {
  return fields.some((field) => field.tracks.length > 0);
}

/*===== People =====*/
/** The name as it is addressed: «دکتر …», «مهندس …», or bare. */
export function memberName(member: DepartmentMember): string {
  return personName(member);
}

/*===== Sections =====*/
/** An ISO date (`2006-09-23`) at midday UTC, so formatting it in any time zone keeps the day. */
export function isoToDate(value: string): Date {
  return new Date(`${value}T12:00:00Z`);
}
