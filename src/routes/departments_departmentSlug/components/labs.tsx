import type { CSSProperties } from "react";

import { TextLink } from "#/components/shared/text-link/text-link";
import type { Department } from "#/orpc/department/contract";
import { m } from "#/paraglide/messages";
import type { Drawings } from "#/lib/university/drawings";
import { memberName } from "../content";
import { formatPhone } from "#/lib/university/phone";
import { RuledHeading, sectionNumber } from "#/components/shared/ruled-heading/ruled-heading";

/*===== Labs =====*/

/**
 * The labs and workshops, numbered, on a pine band under the department's lab drawing, with who to call to book one.
 */
export function Labs({ department, drawings }: { department: Department; drawings: Drawings | null }) {
  // The office's first staff member runs the labs' bookings.
  const contact = department.staff[0];

  return (
    <section
      id="department-labs"
      aria-labelledby="department-labs-title"
      className="relative isolate scroll-mt-6 overflow-hidden bg-band text-on-band"
    >
      {drawings && (
        <div
          aria-hidden
          style={{ "--art": `url("${drawings.lab}")` } as CSSProperties}
          className="pointer-events-none absolute inset-0 -z-10 art-band ltr:-scale-x-100"
        />
      )}

      <div className="mx-auto max-w-site px-gutter py-section">
        <RuledHeading id="department-labs-title" number={4} title={m.department_labs_title()} tone="band" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {department.labs.map((lab, index) => (
              <li key={lab.id} className="flex items-baseline gap-4 border-b border-band-line py-4">
                <span aria-hidden className="w-6 shrink-0 text-body-sm text-on-band-muted">
                  {sectionNumber(index + 1)}
                </span>
                <span className="text-h4">{lab.name}</span>
              </li>
            ))}
          </ol>

          {contact ? (
            <div className="self-start rounded-lg border border-band-line bg-band-hover p-7 lg:col-span-4">
              <p className="text-body-sm text-on-band-muted">{m.department_labs_contact()}</p>
              <p className="mt-2 text-h4 text-on-band">{memberName(contact)}</p>
              {contact.jobTitle && <p className="mt-1 text-on-band-soft">{contact.jobTitle}</p>}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  dir="ltr"
                  className="mt-6 block text-end text-stat-sm text-highlight underline-offset-8 hover:underline"
                >
                  {formatPhone(contact.phone)}
                </a>
              )}
              {
                <TextLink href={`/departments/${department.slug}/labs`} tone="highlight" className="mt-6">
                  {m.department_labs_page()}
                </TextLink>
              }
            </div>
          ) : (
            // With no one to call, the card would hold only the link, so the link stands alone.
            <TextLink
              href={`/departments/${department.slug}/labs`}
              tone="highlight"
              className="self-start lg:col-span-4 lg:mt-4"
            >
              {m.department_labs_page()}
            </TextLink>
          )}
        </div>
      </div>
    </section>
  );
}
