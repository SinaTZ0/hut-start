import { ORPCError } from "@orpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeftIcon, FlaskConicalIcon } from "lucide-react";
import type { CSSProperties } from "react";

import { Badge } from "#/components/primitive/badge/badge";
import { buttonVariants } from "#/components/primitive/button/button.styles";
import { ItemGroup } from "#/components/primitive/item/item";
import { FileRow } from "#/components/shared/file-row/file-row";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading, sectionNumber } from "#/components/shared/ruled-heading/ruled-heading";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { TextLink } from "#/components/shared/text-link/text-link";
import { absoluteUrl, jsonLd, pageMeta } from "#/lib/seo";
import { departmentDrawings } from "#/lib/university/drawings";
import { DEPARTMENTS, DEPARTMENTS_HREF } from "#/lib/university/navigation";
import { cn } from "#/lib/utils";
import { orpc } from "#/orpc/client";
import type { Department } from "#/orpc/department/contract";
import { m } from "#/paraglide/messages";
import { localizeHref } from "#/paraglide/runtime";
import { LabPerson } from "./components/lab-person";

/*===== Query =====*/
// The department's own query: its page and its labs page share one cache entry.
const departmentQuery = (slug: string) => orpc.department.get.queryOptions({ input: { slug } });

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/departments/$departmentSlug/labs")({
  loader: async ({ context, params }) => {
    try {
      const department = await context.queryClient.ensureQueryData(departmentQuery(params.departmentSlug));
      // A department without a labs page (no labs, no introduction) has nothing to show here.
      if (department.labs.length === 0 && department.labsIntro.length === 0) throw notFound();
      return department;
    } catch (error) {
      if (error instanceof ORPCError && error.code === "NOT_FOUND") throw notFound();
      throw error;
    }
  },
  head: (args) => {
    const department = args.loaderData;
    if (!department) return pageMeta({ args, title: m.department_not_found_title(), index: false });
    const title = m.labs_title({ name: department.name });
    const description = department.labsIntro[0] ?? m.labs_lede({ name: department.name });
    return {
      ...pageMeta({ args, title, description }),
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Place",
          name: title,
          url: absoluteUrl({ matches: args.matches, path: localizeHref(`/departments/${department.slug}/labs`) }),
          containedInPlace: { "@type": "CollegeOrUniversity", name: m.site_name() },
        }),
      ],
    };
  },
  component: LabsPage,
  notFoundComponent: LabsNotFound,
});

/*===== Page =====*/

/**
 * A department's labs as a ruled sheet: the introduction with the lab experts beside it, the labs with what they're for
 * and their equipment, the supervisors, the files, and the way to the other departments' labs.
 */
function LabsPage() {
  const { departmentSlug } = Route.useParams();
  const { data: department } = useSuspenseQuery(departmentQuery(departmentSlug));
  const drawings = departmentDrawings(department.slug);
  const people = [...department.faculty, ...department.staff];
  const supervisors = people.filter((member) => member.labRole === "supervisor");
  const experts = people.filter((member) => member.labRole === "expert");
  const title = m.labs_title({ name: department.name });

  let number = 0;
  return (
    <>
      <PageHero
        id="labs-title"
        crumbs={[
          { label: m.nav_education_departments(), href: DEPARTMENTS_HREF },
          { label: department.name, href: `/departments/${department.slug}` },
          { label: m.nav_research_labs() },
        ]}
        title={title}
        lede={m.labs_lede({ name: department.name })}
        drawing={drawings?.lab}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#labs-list" className={buttonVariants({ variant: "highlight", size: "lg" })}>
            {m.labs_cta_list({ count: department.labs.length })}
            <ArrowLeftIcon data-icon="inline-end" className="ltr:-scale-x-100" />
          </a>
          {supervisors.length > 0 && (
            <a href="#labs-people" className={buttonVariants({ variant: "outline", size: "lg" })}>
              {m.labs_cta_people()}
            </a>
          )}
        </div>
      </PageHero>

      {/*===== Introduction =====*/}
      {department.labsIntro.length > 0 && (
        <section aria-labelledby="labs-intro" className="border-t">
          <div className="mx-auto max-w-site px-gutter py-section">
            <RuledHeading id="labs-intro" number={++number} title={m.labs_intro_title()} />
            <div className="mt-8 grid gap-10 lg:grid-cols-12">
              <div className="grid content-start gap-5 lg:col-span-7">
                {department.labsIntro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} dir="auto" className="text-body-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
              {experts.length > 0 && (
                <div className="grid content-start gap-4 lg:col-span-5">
                  <h3 className="text-kicker text-muted-foreground">{m.labs_experts_title()}</h3>
                  {experts.map((member) => (
                    <LabPerson key={member.id} member={member} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/*===== Labs =====*/}
      {department.labs.length > 0 && (
        <section id="labs-list" aria-labelledby="labs-list-title" className="scroll-mt-24 border-t bg-background-alt">
          <div className="mx-auto max-w-site px-gutter py-section">
            <RuledHeading id="labs-list-title" number={++number} title={m.labs_list_title()} />
            <ol className="mt-8 border-t">
              {department.labs.map((lab, index) => (
                <li key={lab.id} className="border-b">
                  <LabEntry lab={lab} index={index} />
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/*===== Supervisors =====*/}
      {supervisors.length > 0 && (
        <section id="labs-people" aria-labelledby="labs-people-title" className="scroll-mt-24 border-t">
          <div className="mx-auto max-w-site px-gutter py-section">
            <RuledHeading id="labs-people-title" number={++number} title={m.labs_supervisors_title()} />
            <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {supervisors.map((member) => (
                <li key={member.id}>
                  <LabPerson member={member} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/*===== Files and Other Labs =====*/}
      <section aria-labelledby="labs-files-title" className="border-t bg-background-alt">
        <div className="mx-auto max-w-site px-gutter py-section">
          {department.labFiles.length > 0 && (
            <>
              <RuledHeading id="labs-files-title" number={++number} title={m.labs_files_title()} />
              <ItemGroup variant="ruled" className="mt-8">
                {department.labFiles.map((file) => (
                  <FileRow key={file.id} title={file.title} url={file.url} format={file.format} />
                ))}
              </ItemGroup>
            </>
          )}
          <OtherLabs department={department} />
        </div>
      </section>
    </>
  );
}

/*===== Lab Entry =====*/

/**
 * One lab as a line of the labs ledger: its number and name, what students do there, and its equipment as chips, in
 * columns from `lg` up so labs can be compared down the page; a lab without equipment gives its description the room. Lab text is Persian on `/en` too.
 */
function LabEntry({ lab, index }: { lab: Department["labs"][number]; index: number }) {
  return (
    <div className="grid gap-3 py-6 lg:grid-cols-12 lg:gap-10 lg:py-8">
      <div className="flex items-baseline gap-4 lg:col-span-4">
        <span aria-hidden className="w-7 shrink-0 text-kicker font-bold text-highlight-text">
          {sectionNumber(index + 1)}
        </span>
        <h3 className="text-h4">{lab.name}</h3>
      </div>
      {lab.description && (
        <p
          dir="auto"
          className={cn(
            "max-w-prose ps-11 text-body-sm text-muted-foreground lg:ps-0",
            lab.equipment.length > 0 ? "lg:col-span-4" : "lg:col-span-8",
          )}
        >
          {lab.description}
        </p>
      )}
      {lab.equipment.length > 0 && (
        <ul
          aria-label={m.labs_equipment()}
          className={cn(
            "flex flex-wrap content-start gap-1.5 ps-11 lg:col-span-4 lg:ps-0",
            !lab.description && "lg:col-start-9",
          )}
          dir="auto"
        >
          {lab.equipment.map((item) => (
            <li key={item}>
              <Badge variant="outline" size="wrap">
                {item}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/*===== Other Labs =====*/

/** The way to the other departments' labs, each with its department's mark. */
function OtherLabs({ department }: { department: Department }) {
  const others = DEPARTMENTS.filter((other) => other.id !== department.slug);
  return (
    <nav aria-labelledby="labs-others" className={department.labFiles.length > 0 ? "mt-14 border-t pt-8" : undefined}>
      <h2 id="labs-others" className="text-kicker text-muted-foreground">
        {m.labs_others()}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {others.map((other) => {
          const mark = departmentDrawings(other.id)?.mark;
          return (
            <li key={other.id}>
              <SiteLink href={other.labHref} className={buttonVariants({ variant: "outline", size: "sm" })}>
                {mark ? (
                  <span
                    aria-hidden
                    data-icon="inline-start"
                    style={{ "--art": `url("${mark}")` } as CSSProperties}
                    className="block size-5 mask-art text-art-ink"
                  />
                ) : (
                  <FlaskConicalIcon data-icon="inline-start" />
                )}
                {other.name()}
              </SiteLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/*===== States =====*/

function LabsNotFound() {
  return (
    <div className="mx-auto flex max-w-site flex-col items-center gap-4 px-gutter py-section text-center">
      <h1 className="text-h1">{m.labs_not_found_title()}</h1>
      <TextLink href={DEPARTMENTS_HREF}>{m.department_not_found_back()}</TextLink>
    </div>
  );
}
