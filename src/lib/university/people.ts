import type { AcademicRank, Honorific } from "#/orpc/department/constants";
import { m } from "#/paraglide/messages";

/*===== People =====*/

export const RANK_LABELS: Record<AcademicRank, () => string> = {
  professor: m.department_rank_professor,
  associate: m.department_rank_associate,
  assistant: m.department_rank_assistant,
  lecturer: m.department_rank_lecturer,
};

/** The name as it is addressed: «دکتر …», «مهندس …», or bare. */
export function personName({ honorific, name }: { honorific: Honorific | null; name: string }): string {
  if (honorific === "doctor") return m.department_honorific_doctor({ name });
  if (honorific === "engineer") return m.department_honorific_engineer({ name });
  return name;
}
