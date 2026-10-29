import { base } from "#/orpc/implementer.server";
import { getLibraryForms } from "#/orpc/library/service";
import { provideDbMiddleware } from "#/orpc/middleware/db/db.middleware";

/*===== Forms =====*/
// Public: the university's forms and regulations are for everyone.
export const getLibraryFormsProcedure = base.library.forms
  .use(provideDbMiddleware)
  .handler(({ context }) => getLibraryForms({ db: context.db }));
