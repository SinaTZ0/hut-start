import { getPhonebook } from "#/orpc/directory/service";
import { base } from "#/orpc/implementer.server";
import { provideDbMiddleware } from "#/orpc/middleware/db/db.middleware";

/*===== Phone Book =====*/
// Public: the old site published it on its front page.
export const getPhonebookProcedure = base.directory.phonebook
  .use(provideDbMiddleware)
  .handler(({ context }) => getPhonebook({ db: context.db }));
