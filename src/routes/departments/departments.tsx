import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { DepartmentGrid } from "#/components/shared/department-grid/department-grid";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";
import { pageMeta } from "#/lib/seo";
import { NAV_DRAWINGS } from "#/lib/university/drawings";
import { orpc } from "#/orpc/client";
import { m } from "#/paraglide/messages";
import { DepartmentShelves } from "./components/department-shelves";

/*===== Query =====*/
const departmentsQuery = orpc.department.list.queryOptions();

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/departments")({
  head: (args) => pageMeta({ args, title: m.nav_education_departments(), description: m.departments_lede() }),
  loader: ({ context }) => context.queryClient.ensureQueryData(departmentsQuery),
  component: DepartmentsPage,
});

/*===== Page =====*/

/** The eight departments as shelves of the fields they teach, then the same eight as cards into their labs. */
function DepartmentsPage() {
  const { data: summaries } = useSuspenseQuery(departmentsQuery);

  return (
    <>
      <PageHero
        id="departments-title"
        crumbs={[{ label: m.nav_education(), href: "/education" }, { label: m.nav_education_departments() }]}
        title={m.nav_education_departments()}
        lede={m.departments_lede()}
        drawing={NAV_DRAWINGS.education}
      />
      <section aria-label={m.nav_education_departments()} className="mx-auto max-w-site px-gutter pb-section">
        <DepartmentShelves summaries={summaries} />
      </section>
      <section aria-labelledby="departments-labs" className="border-t bg-background-alt">
        <div className="mx-auto max-w-site px-gutter py-section">
          <RuledHeading id="departments-labs" title={m.nav_research_labs()} />
          <div className="mt-8">
            <DepartmentGrid to="labs" />
          </div>
        </div>
      </section>
    </>
  );
}
