import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { useCallback } from "react";

import { LinkHub } from "#/components/shared/link-hub/link-hub";
import { pageMeta } from "#/lib/seo";
import { listSearchDefaults, listSearchSchema } from "#/lib/search-params";
import { PAGE_DRAWINGS } from "#/lib/university/drawings";
import { SERVICE_GROUPS, SERVICES } from "#/lib/university/services";
import { m } from "#/paraglide/messages";

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/services")({
  validateSearch: listSearchSchema,
  search: { middlewares: [stripSearchParams(listSearchDefaults)] },
  head: (args) => pageMeta({ args, title: m.services_title(), description: m.services_description() }),
  component: ServicesPage,
});

/*===== Page =====*/

/** Every online system, grouped by what a person goes there to do, with a search and a chip per group. */
function ServicesPage() {
  const { q, group } = Route.useSearch();
  const navigate = Route.useNavigate();

  // Filters, not new pages: no history entry and no jump to the top.
  const changeGroup = useCallback(
    (next: string) =>
      void navigate({ search: (prev) => ({ ...prev, group: next }), replace: true, resetScroll: false }),
    [navigate],
  );
  const changeQuery = useCallback(
    (next: string) => void navigate({ search: (prev) => ({ ...prev, q: next }), replace: true, resetScroll: false }),
    [navigate],
  );

  return (
    <LinkHub
      id="services"
      crumbs={[{ label: m.nav_systems() }]}
      title={m.services_title()}
      lede={m.services_lede({ count: SERVICES.length })}
      drawing={PAGE_DRAWINGS.hub}
      searchLabel={m.nav_search_label()}
      searchPlaceholder={m.nav_search_placeholder()}
      groups={SERVICE_GROUPS.map((serviceGroup) => ({
        id: serviceGroup.id,
        title: serviceGroup.title(),
        summary: serviceGroup.summary(),
        items: SERVICES.filter((service) => service.group === serviceGroup.id).map((service) => ({
          id: service.id,
          href: service.href,
          title: service.title(),
          description: service.description(),
          icon: service.icon,
          internalOnly: service.internalOnly,
          keywords: [service.short(), ...service.keywords],
        })),
      }))}
      group={group}
      query={q}
      onGroupChange={changeGroup}
      onQueryChange={changeQuery}
    />
  );
}
