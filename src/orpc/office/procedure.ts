import { base } from "#/orpc/implementer.server";
import { provideDbMiddleware } from "#/orpc/middleware/db/db.middleware";
import { getOffice, listOffices } from "#/orpc/office/service";

/*===== Get =====*/
// Public: an office's page is for every visitor.
export const getOfficeProcedure = base.office.get
  .use(provideDbMiddleware)
  .handler(async ({ context, input, errors }) => {
    const result = await getOffice({ db: context.db, slug: input.slug });
    if (result.kind === "not-found") throw errors.NOT_FOUND({ data: { errors: [], fields: {} } });
    return result.office;
  });

/*===== List =====*/
export const listOfficesProcedure = base.office.list
  .use(provideDbMiddleware)
  .handler(({ context }) => listOffices({ db: context.db }));
