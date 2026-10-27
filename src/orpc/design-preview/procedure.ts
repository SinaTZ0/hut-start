import { resolveDesignPreview } from "#/orpc/design-preview/service";
import { base } from "#/orpc/implementer.server";

/*===== Get =====*/
export const getDesignPreviewProcedure = base.designPreview.get.handler(({ context, input }) =>
  resolveDesignPreview({ headers: context.headers, link: input ?? {} }),
);
