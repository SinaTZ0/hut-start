import type { CSSProperties } from "react";

import { CardArrow } from "#/components/primitive/card/card";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatNumber } from "#/lib/locale";
import { departmentDrawings } from "#/lib/university/drawings";
import { DEPARTMENTS } from "#/lib/university/navigation";
import type { DepartmentSummary } from "#/orpc/department/contract";
import { m } from "#/paraglide/messages";

/*===== Department Shelves =====*/

/**
 * The eight departments as an atlas of what is taught: each a ruled row with its number, name and counts at the start
 * and, on a shelf at the end, the small drawing of each of its fields. A row leads to the department's page; the
 * vignettes are part of that one link, not links of their own. On a phone the shelf drops under the name, two
 * vignettes to a line.
 */
export function DepartmentShelves({ summaries }: { summaries: DepartmentSummary[] }) {
  return (
    <ol className="border-t-2 border-heading">
      {DEPARTMENTS.map((department, index) => {
        const summary = summaries.find((item) => item.slug === department.id);
        const drawings = departmentDrawings(department.id);
        return (
          <li key={department.id} className="border-b">
            <SiteLink
              href={department.href}
              className="group/row flex flex-wrap items-center gap-x-3 gap-y-4 px-1 py-4 transition-colors duration-200 ease-out hover:bg-accent focus-visible:bg-accent motion-reduce:transition-none lg:flex-nowrap lg:gap-7 lg:px-3 lg:py-5"
            >
              {/*------ Name and counts ------*/}
              <span className="flex min-w-0 flex-1 items-start gap-2.5 lg:w-68 lg:flex-none">
                <span className="w-9 shrink-0 text-h4 text-highlight-text tabular-nums">{formatNumber(index + 1)}</span>
                <span className="grid min-w-0 gap-1">
                  <span className="text-h4 text-heading">{department.name()}</span>
                  {summary && (
                    <span className="flex flex-wrap gap-x-3.5 text-xs text-muted-foreground">
                      <span>
                        <b className="font-extrabold text-heading">{formatNumber(summary.facultyCount)}</b>{" "}
                        {m.department_stat_faculty()}
                      </span>
                      <span>
                        <b className="font-extrabold text-heading">{formatNumber(summary.labCount)}</b>{" "}
                        {m.department_stat_labs()}
                      </span>
                    </span>
                  )}
                </span>
              </span>

              {/*------ Arrow, which sits beside the name on a phone ------*/}
              <CardArrow className="lg:order-last" />

              {/*------ Shelf of the fields' vignettes ------*/}
              {summary && drawings && (
                <span className="grid w-full grid-cols-2 gap-x-2.5 gap-y-3 lg:flex lg:w-auto lg:flex-1 lg:flex-wrap lg:items-end lg:gap-3.5 lg:border-b lg:pb-1.5">
                  {summary.fields.map((field) => (
                    <span key={field.key} className="grid justify-items-center gap-0.5 text-center lg:w-33">
                      <span
                        aria-hidden
                        style={{ "--art": `url("${drawings.field(field.key)}")` } as CSSProperties}
                        className="block aspect-square w-full max-w-33 mask-art text-art-ink transition-transform duration-250 ease-out group-hover/row:-translate-y-1 motion-reduce:transition-none"
                      />
                      <span className="text-xs text-muted-foreground">{field.name}</span>
                    </span>
                  ))}
                </span>
              )}
            </SiteLink>
          </li>
        );
      })}
    </ol>
  );
}
