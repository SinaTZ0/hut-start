import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { SectionLanding } from "#/components/shared/section-landing/section-landing";
import { pageMeta } from "#/lib/seo";
import { orpc } from "#/orpc/client";
import { m } from "#/paraglide/messages";

/*===== Query =====*/
// The section's notices are the home feed's, already cached when the visitor comes from the home page.
const homeFeedQuery = () => orpc.homeFeed.get.queryOptions();

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/campus-life")({
  loader: ({ context }) => context.queryClient.ensureQueryData(homeFeedQuery()),
  head: (args) => pageMeta({ args, title: m.nav_campus_life(), description: m.section_campus_life_lede() }),
  component: CampusLifePage,
});

/*===== Page =====*/
function CampusLifePage() {
  const { data: feed } = useSuspenseQuery(homeFeedQuery());
  return <SectionLanding sectionId="campus-life" feed={feed} />;
}
