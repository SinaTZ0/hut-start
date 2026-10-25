import { getDepartment, listDepartments } from "#/orpc/department/service";
import { base } from "#/orpc/implementer.server";
import { provideDbMiddleware } from "#/orpc/middleware/db/db.middleware";

/*===== Get =====*/
// Public: a department's page is for every visitor.
export const getDepartmentProcedure = base.department.get
  .use(provideDbMiddleware)
  .handler(async ({ context, input, errors }) => {
    const result = await getDepartment({ db: context.db, slug: input.slug });

    if (result.kind === "not-found") throw errors.NOT_FOUND({ data: { errors: [], fields: {} } });

    return result.department;
  });

/*===== List =====*/
export const listDepartmentsProcedure = base.department.list
  .use(provideDbMiddleware)
  .handler(({ context }) => listDepartments({ db: context.db }));
