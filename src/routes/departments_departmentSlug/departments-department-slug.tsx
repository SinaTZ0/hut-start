import { ORPCError } from "@orpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, stripSearchParams } from "@tanstack/react-router";

import { Spinner } from "#/components/primitive/spinner/spinner";
import { TextLink } from "#/components/shared/text-link/text-link";
import { absoluteUrl, jsonLd, pageMeta } from "#/lib/seo";
import { DEPARTMENTS_HREF } from "#/lib/university/navigation";
import { orpc } from "#/orpc/client";
import { m } from "#/paraglide/messages";
import { localizeHref } from "#/paraglide/runtime";
import { About } from "./components/about";
import { Documents } from "./components/documents";
import { Faculty } from "./components/faculty";
import { Fields } from "./components/fields";
import { Hero } from "./components/hero";
import { Labs } from "./components/labs";
import { OtherDepartments } from "./components/others";
import { departmentDrawings } from "./content";
import { departmentSearchDefaults, departmentSearchSchema, type RankFilter } from "./search-params";

/*===== Query =====*/
const departmentQuery = (slug: string) => orpc.department.get.queryOptions({ input: { slug } });

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/departments/$departmentSlug")({
  validateSearch: departmentSearchSchema,
  // Keeps the default out of the URL: `/departments/ee`, not `/departments/ee?rank=all`.
  search: { middlewares: [stripSearchParams(departmentSearchDefaults)] },
  // Returns the department as well as caching it, for `head`. An unknown slug is the route's not-found page.
  loader: async ({ context, params }) => {
    try {
      return await context.queryClient.ensureQueryData(departmentQuery(params.departmentSlug));
    } catch (error) {
      if (error instanceof ORPCError && error.code === "NOT_FOUND") throw notFound();
      throw error;
    }
  },
  head: (args) => {
    const department = args.loaderData;
    if (!department) return pageMeta({ args, title: m.department_not_found_title(), index: false });

    const title = m.department_title({ name: department.name });
    return {
      ...pageMeta({ args, title, description: department.lede }),
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: title,
          description: department.lede,
          url: absoluteUrl({ matches: args.matches, path: localizeHref(`/departments/${department.slug}`) }),
          parentOrganization: { "@type": "CollegeOrUniversity", name: m.site_name() },
        }),
      ],
    };
  },
  component: DepartmentPage,
  pendingComponent: DepartmentPending,
  notFoundComponent: DepartmentNotFound,
});

/*===== Page =====*/

/**
 * A department's page: its name over its signature drawing, the intro and who runs it, its fields, faculty, labs and
 * curriculum files, and the other departments.
 */
function DepartmentPage() {
  const { departmentSlug } = Route.useParams();
  const { rank } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: department } = useSuspenseQuery(departmentQuery(departmentSlug));
  const drawings = departmentDrawings(department.slug);

  // A filter, not a new page: no history entry and no jump to the top.
  const changeRank = (next: RankFilter) =>
    void navigate({ search: (prev) => ({ ...prev, rank: next }), replace: true, resetScroll: false });

  return (
    <>
      <Hero department={department} drawings={drawings} />
      <About department={department} />
      {department.fields.length > 0 && <Fields fields={department.fields} drawings={drawings} />}
      <Faculty department={department} rank={rank} onRankChange={changeRank} />
      {department.labs.length > 0 && <Labs department={department} drawings={drawings} />}
      {department.documents.length > 0 && <Documents department={department} />}
      <OtherDepartments department={department} />
    </>
  );
}

/*===== States =====*/

/** Shown only when the page takes longer than a second (`pendingMs`), as on a slow connection. */
function DepartmentPending() {
  return (
    <div className="grid min-h-art-hero place-items-center">
      <Spinner className="size-8" />
    </div>
  );
}

function DepartmentNotFound() {
  return (
    <div className="mx-auto flex max-w-site flex-col items-center gap-4 px-gutter py-section text-center">
      <h1 className="text-h1">{m.department_not_found_title()}</h1>
      <p className="max-w-xl text-muted-foreground">{m.department_not_found_details()}</p>
      <TextLink href={DEPARTMENTS_HREF}>{m.department_not_found_back()}</TextLink>
    </div>
  );
}
