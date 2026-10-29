import type { DirectoryGroup, DirectoryRole } from "#/orpc/directory/constants";
import { m } from "#/paraglide/messages";

/*===== Labels =====*/

export const GROUP_LABELS: Record<DirectoryGroup, () => string> = {
  leadership: m.phonebook_group_leadership,
  education: m.phonebook_group_education,
  student: m.phonebook_group_student,
  admin: m.phonebook_group_admin,
  departments: m.phonebook_group_departments,
  labs: m.phonebook_group_labs,
  other: m.phonebook_group_other,
};

export const ROLE_LABELS: Record<DirectoryRole, () => string> = {
  faculty: m.phonebook_role_faculty,
  staff: m.phonebook_role_staff,
  "lab-expert": m.phonebook_role_lab_expert,
  conscript: m.phonebook_role_conscript,
  legal: m.phonebook_role_legal,
};
