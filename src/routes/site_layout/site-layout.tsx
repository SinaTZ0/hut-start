import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import { DesignPreview } from "#/components/shared/design-preview/design-preview";
import { SiteFooter } from "#/components/shared/site-footer/site-footer";
import { SiteHeader } from "#/components/shared/site-header/site-header";
import { designPreviewQueryOptions, readDesignLink, useDesignVariant } from "#/hooks/use-design-preview";
import { setReportedUser } from "#/lib/error-reporting.browser";
import { orpc } from "#/orpc/client";
import { m } from "#/paraglide/messages";

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout")({
  // The header needs the viewer on every page, and every page may have designs in preview (`src/lib/design-variants.ts`),
  // so both are loaded before any page renders. A share link's params only count on the page it opens.
  beforeLoad: async ({ context, location }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(orpc.session.viewer.queryOptions()),
      context.queryClient.ensureQueryData(designPreviewQueryOptions(readDesignLink(location.search))),
    ]);
  },
  component: SiteLayout,
});

/*===== Site Layout =====*/

/** The chrome shared by every page: skip link, header, `main` landmark and footer. */
function SiteLayout() {
  const { data: viewer } = useSuspenseQuery(orpc.session.viewer.queryOptions());
  const userId = viewer?.id ?? null;
  const header = useDesignVariant("header");

  /*------ Error Reports ------*/
  // Browser reports carry the signed-in user's ID, like the server's (docs/backend/logging.md → User ID). Sign-in and
  // sign-out invalidate the viewer query, which updates it.
  useEffect(() => setReportedUser(userId), [userId]);

  return (
    // Below `lg` the tab bar is fixed over the bottom of the screen; the padding keeps the footer clear of it.
    // `data-header` sets how much room the header takes (`styles.css`).
    <div data-header={header} className="relative flex min-h-svh flex-col pb-tab-bar lg:pb-0">
      <a
        href="#main"
        className="sr-only z-50 rounded-sm bg-primary px-4 py-2 text-button text-primary-foreground focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4"
      >
        {m.common_skip_to_content()}
      </a>
      <SiteHeader viewer={viewer} />
      <main id="main" className="flex-1 pt-header-over">
        <Outlet />
      </main>
      <SiteFooter />
      <DesignPreview />
    </div>
  );
}
