import type { Database } from "#/db/client.server";
import { DEPARTMENT_SLUG_PATTERN } from "#/orpc/department/constants";
import type { Department, DepartmentSummary } from "#/orpc/department/contract";
import { toDepartmentSummary, toPublicDepartment } from "#/orpc/department/mapper";
import {
  countFaculty,
  countLabs,
  findAllFields,
  findDepartmentBySlug,
  findDepartments,
  findDocuments,
  findFields,
  findLabFiles,
  findLabs,
  findMembers,
  findTracks,
} from "#/orpc/department/repository";

/*===== Get =====*/
type GetDepartmentResult = { kind: "success"; department: Department } | { kind: "not-found" };

/**
 * Loads everything a department's page shows, in the request's locale.
 *
 * @returns `not-found` for an unknown slug, or one that can't be a slug at all.
 */
export async function getDepartment({ db, slug }: { db: Database; slug: string }): Promise<GetDepartmentResult> {
  if (!DEPARTMENT_SLUG_PATTERN.test(slug)) return { kind: "not-found" };

  const record = await findDepartmentBySlug({ db, slug });
  if (!record) return { kind: "not-found" };

  // Independent reads of the same department; the pool runs them side by side.
  const departmentId = record.id;
  const [members, fields, tracks, labs, documents, labFiles] = await Promise.all([
    findMembers({ db, departmentId }),
    findFields({ db, departmentId }),
    findTracks({ db, departmentId }),
    findLabs({ db, departmentId }),
    findDocuments({ db, departmentId }),
    findLabFiles({ db, departmentId }),
  ]);

  return {
    kind: "success",
    department: toPublicDepartment({ department: record, members, fields, tracks, labs, documents, labFiles }),
  };
}

/*===== List =====*/
/** Every department that has a page, with what the index shows of it: its fields and how many faculty and labs. */
export async function listDepartments({ db }: { db: Database }): Promise<DepartmentSummary[]> {
  const [rows, fields, faculty, labs] = await Promise.all([
    findDepartments({ db }),
    findAllFields({ db }),
    countFaculty({ db }),
    countLabs({ db }),
  ]);
  return rows.map((record) =>
    toDepartmentSummary({
      record,
      fields: fields.filter((field) => field.departmentId === record.id),
      facultyCount: faculty.find((row) => row.departmentId === record.id)?.total ?? 0,
      labCount: labs.find((row) => row.departmentId === record.id)?.total ?? 0,
    }),
  );
}
