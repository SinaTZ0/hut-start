import { ClockIcon, ExternalLinkIcon } from "lucide-react";

import { buttonVariants } from "#/components/primitive/button/button.styles";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatDate } from "#/lib/locale";
import { DEPARTMENTS } from "#/lib/university/navigation";
import type { Department } from "#/orpc/department/contract";
import { m } from "#/paraglide/messages";

/*===== Other Departments =====*/

/** The page's foot: the other departments, and when this page last changed. */
export function OtherDepartments({ department }: { department: Department }) {
  const others = DEPARTMENTS.filter((other) => other.id !== department.slug);

  return (
    <section aria-labelledby="department-others-title" className="border-t bg-background-alt">
      <div className="mx-auto max-w-site px-gutter py-14">
        <h2 id="department-others-title" className="text-kicker text-muted-foreground">
          {m.department_others()}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((other) => (
            <li key={other.id}>
              <SiteLink href={other.href} className={buttonVariants({ variant: "outline", size: "sm" })}>
                {other.name()}
                {/* Departments not served here yet still open their old site. */}
                {other.href.startsWith("http") && <ExternalLinkIcon aria-hidden className="size-3.5" />}
              </SiteLink>
            </li>
          ))}
        </ul>

        <p className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 border-t pt-6 text-body-sm text-muted-foreground">
          <ClockIcon aria-hidden className="size-4" />
          {m.department_updated()}
          <time dateTime={department.updatedAt.toISOString()} className="font-semibold text-foreground">
            {formatDate(department.updatedAt, { dateStyle: "long" })}
          </time>
        </p>
      </div>
    </section>
  );
}
