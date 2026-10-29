import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { useCallback } from "react";

import { LinkHub } from "#/components/shared/link-hub/link-hub";
import { pageMeta } from "#/lib/seo";
import { listSearchDefaults, listSearchSchema } from "#/lib/search-params";
import { PAGE_DRAWINGS } from "#/lib/university/drawings";
import { PAYMENT_GROUPS, PAYMENTS } from "#/lib/university/payments";
import { m } from "#/paraglide/messages";

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/payments")({
  validateSearch: listSearchSchema,
  search: { middlewares: [stripSearchParams(listSearchDefaults)] },
  head: (args) => pageMeta({ args, title: m.payments_title(), description: m.payments_description() }),
  component: PaymentsPage,
});

/*===== Page =====*/

/** The payment gateways, grouped by who pays, so a person picks the right payment ID before paying. */
function PaymentsPage() {
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
      id="payments"
      crumbs={[{ label: m.nav_systems(), href: "/services" }, { label: m.payments_title() }]}
      title={m.payments_title()}
      lede={m.payments_lede()}
      drawing={PAGE_DRAWINGS.hub}
      searchLabel={m.payments_search_label()}
      searchPlaceholder={m.payments_search_placeholder()}
      groups={PAYMENT_GROUPS.map((paymentGroup) => ({
        id: paymentGroup.id,
        title: paymentGroup.title(),
        summary: paymentGroup.summary(),
        items: PAYMENTS.filter((payment) => payment.group === paymentGroup.id).map((payment) => ({
          id: payment.id,
          href: payment.href,
          title: payment.title(),
          description: payment.description(),
          icon: payment.icon,
          keywords: payment.keywords,
        })),
      }))}
      group={group}
      query={q}
      onGroupChange={changeGroup}
      onQueryChange={changeQuery}
    />
  );
}
