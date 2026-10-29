import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  BookUserIcon,
  HeartHandshakeIcon,
  type LucideIcon,
  MailIcon,
  MapPinIcon,
  MessageSquareTextIcon,
  PhoneIcon,
  PrinterIcon,
  ScaleIcon,
  StampIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { LinkTile } from "#/components/shared/link-tile/link-tile";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { pageMeta } from "#/lib/seo";
import { PAGE_DRAWINGS } from "#/lib/university/drawings";
import { CONTACT } from "#/lib/university/navigation";
import { formatPhone } from "#/lib/university/phone";
import { orpc } from "#/orpc/client";
import { OFFICE_SECTIONS, type OfficeSection } from "#/orpc/office/constants";
import type { OfficeSummary } from "#/orpc/office/contract";
import { m } from "#/paraglide/messages";

/*===== Query =====*/
const officesQuery = () => orpc.office.list.queryOptions();

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/contact")({
  loader: ({ context }) => context.queryClient.ensureQueryData(officesQuery()),
  head: (args) => pageMeta({ args, title: m.nav_contact(), description: m.contact_lede() }),
  component: ContactPage,
});

/*===== Content =====*/

/** Where to write, by what the message is about. The old page's form only asked which office to send it to. */
const WRITE_TO: { href: string; title: () => string; description: () => string; icon: LucideIcon }[] = [
  {
    href: "/feedback",
    title: m.nav_suggestions,
    description: m.contact_write_feedback,
    icon: MessageSquareTextIcon,
  },
  {
    href: "/consultation",
    title: m.nav_campus_life_counseling,
    description: m.contact_write_consultation,
    icon: HeartHandshakeIcon,
  },
  { href: "/phonebook", title: m.nav_about_phonebook, description: m.contact_write_phonebook, icon: BookUserIcon },
  {
    href: "https://erp.msrt.ir/Dashboard",
    title: m.nav_related_complaints,
    description: m.contact_write_ministry,
    icon: ScaleIcon,
  },
];

const SECTION_TITLES: Record<OfficeSection, () => string> = {
  about: m.nav_about,
  education: m.nav_education,
  research: m.nav_research,
  "campus-life": m.nav_campus_life,
};

/*===== Page =====*/

/**
 * How to reach the university: its address and numbers in the head, then where to write by subject, then every
 * office with its own phone and email, under the menu section it belongs to.
 */
function ContactPage() {
  const { data: offices } = useSuspenseQuery(officesQuery());
  const sections = OFFICE_SECTIONS.map((section) => ({
    section,
    offices: offices.filter((office) => office.section === section),
  })).filter((group) => group.offices.length > 0);

  return (
    <>
      <PageHero
        id="contact-title"
        crumbs={[{ label: m.nav_about(), href: "/about" }, { label: m.nav_contact() }]}
        title={m.nav_contact()}
        lede={m.contact_lede()}
        drawing={PAGE_DRAWINGS.directory}
      >
        <ContactLines />
      </PageHero>

      {/*===== Write To =====*/}
      <section aria-labelledby="contact-write-title" className="border-t bg-background">
        <div className="mx-auto max-w-site px-gutter py-12 md:py-section">
          <RuledHeading id="contact-write-title" number={1} title={m.contact_write_title()} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {WRITE_TO.map((item) => (
              <li key={item.href}>
                <LinkTile href={item.href} title={item.title()} description={item.description()} icon={item.icon} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*===== Offices =====*/}
      <section aria-labelledby="contact-offices-title" className="border-t bg-background-alt">
        <div className="mx-auto max-w-site px-gutter py-12 md:py-section">
          <RuledHeading id="contact-offices-title" number={2} title={m.contact_offices_title()} />
          <div className="mt-8 grid gap-x-12 gap-y-10 lg:grid-cols-2">
            {sections.map((group) => (
              <div key={group.section}>
                <h3 className="text-h4">{SECTION_TITLES[group.section]()}</h3>
                <ul className="mt-3">
                  {group.offices.map((office) => (
                    <OfficeRow key={office.slug} office={office} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/*===== Contact =====*/

/** The university's own address and numbers, as the office pages show theirs. */
function ContactLines() {
  const lines: { icon: LucideIcon; label: string; value: ReactNode }[] = [
    {
      icon: PhoneIcon,
      label: m.department_phone(),
      value: (
        <a href={CONTACT.phoneHref} dir="ltr" className="hover:underline">
          {m.site_phone()}
        </a>
      ),
    },
    { icon: PrinterIcon, label: m.office_fax(), value: <span dir="ltr">{m.site_fax()}</span> },
    {
      icon: MailIcon,
      label: m.office_email_label(),
      value: (
        <a href={`mailto:${CONTACT.email}`} dir="ltr" className="hover:underline">
          {CONTACT.email}
        </a>
      ),
    },
    { icon: StampIcon, label: m.contact_postal_code(), value: <span dir="ltr">{m.site_postal_code()}</span> },
    {
      icon: MapPinIcon,
      label: m.office_place(),
      value: (
        <>
          {m.site_address()}{" "}
          <SiteLink href={CONTACT.mapHref} className="text-body-sm font-normal text-brand-text hover:underline">
            {m.contact_map()}
          </SiteLink>
        </>
      ),
    },
  ];

  return (
    <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {lines.map((line) => (
        <div key={line.label} className="flex items-start gap-3">
          <line.icon aria-hidden className="mt-1 size-4.5 shrink-0 text-brand-text" />
          <div>
            <dt className="text-caption text-muted-foreground">{line.label}</dt>
            <dd className="text-body font-semibold text-heading">{line.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

/** An office's name, linking to its page, with its phone and email beside it. */
function OfficeRow({ office }: { office: OfficeSummary }) {
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-4">
      <SiteLink href={`/offices/${office.slug}`} className="text-body font-semibold text-heading hover:underline">
        {office.name}
      </SiteLink>
      <span className="flex flex-wrap gap-x-5 gap-y-1 text-body-sm text-muted-foreground">
        {office.phone && (
          <a href={`tel:${office.phone}`} dir="ltr" className="hover:text-foreground hover:underline">
            {formatPhone(office.phone)}
          </a>
        )}
        {office.email && (
          <a href={`mailto:${office.email}`} dir="ltr" className="hover:text-foreground hover:underline">
            {office.email}
          </a>
        )}
      </span>
    </li>
  );
}
