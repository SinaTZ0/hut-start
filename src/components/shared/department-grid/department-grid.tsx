import type { CSSProperties } from "react";

import { Card, CardArrow, CardContent } from "#/components/primitive/card/card";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { departmentDrawings } from "#/lib/university/drawings";
import { DEPARTMENTS } from "#/lib/university/navigation";

/*===== Department Grid =====*/

/**
 * The eight departments as cards, each with its key object drawn from its hero: a way into each department's page, or
 * (`to="labs"`) into its labs.
 */
export function DepartmentGrid({ to = "page" }: { to?: "page" | "labs" }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {DEPARTMENTS.map((department) => {
        const mark = departmentDrawings(department.id)?.mark;
        return (
          <li key={department.id}>
            <Card
              render={<SiteLink href={to === "labs" ? department.labHref : department.href} />}
              size="sm"
              className="h-full"
            >
              <CardContent className="h-full">
                <div className="grid h-full content-between gap-3">
                  {mark && (
                    <span
                      aria-hidden
                      style={{ "--art": `url("${mark}")` } as CSSProperties}
                      className="block h-20 w-full mask-art text-art-ink sm:h-24"
                    />
                  )}
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-title text-heading">{department.name()}</span>
                    <CardArrow />
                  </span>
                </div>
              </CardContent>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
