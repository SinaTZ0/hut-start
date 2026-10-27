import { createFileRoute } from "@tanstack/react-router";

import { SectionHead } from "#/components/shared/section-head/section-head";
import { pageMeta } from "#/lib/seo";
import { m } from "#/paraglide/messages";

/*===== Route =====*/
// A throwaway page for checking that an update reached the server. Kept out of search results and the sitemap.
export const Route = createFileRoute("/_site-layout/deploy-test")({
  head: (args) => pageMeta({ args, title: m.deploy_test_title(), description: m.deploy_test_lede(), index: false }),
  component: DeployTestPage,
});

/*===== Page =====*/
function DeployTestPage() {
  return (
    <div className="mx-auto max-w-site px-gutter pt-8 pb-section md:pt-14">
      <SectionHead
        as="h1"
        id="deploy-test-title"
        kicker={m.deploy_test_kicker()}
        title={m.deploy_test_title()}
        lede={m.deploy_test_lede()}
      />
    </div>
  );
}
