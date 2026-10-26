import { ArrowLeftIcon } from "lucide-react";
import type { CSSProperties } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/primitive/breadcrumb/breadcrumb";
import { buttonVariants } from "#/components/primitive/button/button.styles";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatNumber } from "#/lib/locale";
import { DEPARTMENTS_HREF } from "#/lib/university/navigation";
import type { Department } from "#/orpc/department/contract";
import { m } from "#/paraglide/messages";
import type { Drawings } from "#/lib/university/drawings";
import { admitsStudents } from "../content";

/*===== Hero =====*/

/**
 * The department's name over its signature drawing, with the lede, the two ways into the page, and its figures set as
 * dimension lines.
 */
export function Hero({ department, drawings }: { department: Department; drawings: Drawings | null }) {
  const tracks = department.fields.flatMap((field) => field.tracks);
  const figures = [
    { label: m.department_stat_students, value: department.studentCount, approximate: true },
    { label: m.department_stat_faculty, value: department.faculty.length },
    { label: m.department_stat_bsc, value: tracks.filter((track) => track.degree === "bsc").length },
    { label: m.department_stat_msc, value: tracks.filter((track) => track.degree === "msc").length },
    { label: m.department_stat_labs, value: department.labs.length },
  ].filter((figure) => figure.value);

  return (
    <section aria-labelledby="department-title" className="relative isolate overflow-hidden">
      {/*===== Drawing =====*/}
      {/* Fainter on phones, where the title covers more of it. The drawing's empty side is the start in Persian, so
          English mirrors it. */}
      {drawings && (
        <div
          aria-hidden
          style={{ "--art": `url("${drawings.hero}")` } as CSSProperties}
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-art-hero art-sheet opacity-60 md:opacity-100 ltr:-scale-x-100"
        />
      )}

      <div className="mx-auto max-w-site px-gutter pt-8 pb-section md:pt-14">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<SiteLink href="/" />}>{m.nav_tab_home()}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<SiteLink href={DEPARTMENTS_HREF} />}>
                {m.nav_education_departments()}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{department.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/*===== Title =====*/}
        <div className="mt-10 max-w-3xl md:mt-16">
          <h1 id="department-title" className="text-display-xl">
            {department.name}
          </h1>
          <p className="mt-8 max-w-xl text-body-lg text-muted-foreground">{department.lede}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            {department.fields.length > 0 && (
              <a href="#department-fields" className={buttonVariants({ variant: "highlight", size: "lg" })}>
                {admitsStudents(department.fields) ? m.department_cta_fields() : m.department_cta_areas()}
                <ArrowLeftIcon data-icon="inline-end" className="ltr:-scale-x-100" />
              </a>
            )}
            {department.faculty.length > 0 && (
              <a href="#department-faculty" className={buttonVariants({ variant: "outline", size: "lg" })}>
                {m.department_cta_faculty()}
              </a>
            )}
          </div>
        </div>

        {/*===== Figures =====*/}
        {/* Each figure hangs from a dimension line, the drawing's own way of giving a measure. */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:mt-24 lg:grid-cols-5">
          {figures.map((figure) => (
            <div key={figure.label()} className="flex flex-col">
              <span
                aria-hidden
                className="relative block h-3 border-x border-border-strong before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-border-strong"
              />
              <dt className="order-last mt-1 text-body-sm text-muted-foreground">{figure.label()}</dt>
              <dd className="mt-3 text-stat text-heading">
                {formatNumber(figure.value ?? 0)}
                {figure.approximate && <span className="text-highlight-text">+</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
