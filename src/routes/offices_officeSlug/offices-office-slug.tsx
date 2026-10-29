import { ORPCError } from "@orpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, PrinterIcon } from "lucide-react";
import type { ReactNode } from "react";

import { ItemGroup } from "#/components/primitive/item/item";
import { Spinner } from "#/components/primitive/spinner/spinner";
import { FileRow } from "#/components/shared/file-row/file-row";
import { NoticeList } from "#/components/shared/notice-list/notice-list";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";
import { TextLink } from "#/components/shared/text-link/text-link";
import { formatDate, formatNumber } from "#/lib/locale";
import { absoluteUrl, jsonLd, pageMeta } from "#/lib/seo";
import { officeDrawing } from "#/lib/university/drawings";
import { NEWS_CATEGORIES } from "#/lib/university/feed";
import { formatPhone } from "#/lib/university/phone";
import { cn } from "#/lib/utils";
import { orpc } from "#/orpc/client";
import type { FeedCategory } from "#/orpc/home-feed/constants";
import type { Office } from "#/orpc/office/contract";
import { m } from "#/paraglide/messages";
import { localizeHref } from "#/paraglide/runtime";
import { CardList } from "./components/card-list";
import { FaqList } from "./components/faq-list";
import { PeopleRoster, PersonCard } from "./components/person-card";
import { ScheduleTables } from "./components/schedule-tables";
import { OfficeTools } from "./components/tools";
import { SECTION_CRUMBS } from "./content";

/*===== Query =====*/
const officeQuery = (slug: string) => orpc.office.get.queryOptions({ input: { slug } });

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/offices/$officeSlug")({
  loader: async ({ context, params }) => {
    try {
      return await context.queryClient.ensureQueryData(officeQuery(params.officeSlug));
    } catch (error) {
      if (error instanceof ORPCError && error.code === "NOT_FOUND") throw notFound();
      throw error;
    }
  },
  head: (args) => {
    const office = args.loaderData;
    if (!office) return pageMeta({ args, title: m.office_not_found_title(), index: false });
    return {
      ...pageMeta({ args, title: office.name, description: office.lede }),
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "GovernmentOffice",
          name: office.name,
          description: office.lede,
          url: absoluteUrl({ matches: args.matches, path: localizeHref(`/offices/${office.slug}`) }),
          parentOrganization: { "@type": "CollegeOrUniversity", name: m.site_name() },
        }),
      ],
    };
  },
  component: OfficePage,
  pendingComponent: OfficePending,
  notFoundComponent: OfficeNotFound,
});

/*===== Page =====*/

/**
 * A university office as a ruled sheet: who it is and how to reach it, then numbered sections for what it has (its
 * tools, what it does, its card lists, its notices, its hours, its questions and answers, its files, its people, and
 * for the president's office the former presidents).
 * Sections without content are left out, and the numbers follow what is shown.
 */
function OfficePage() {
  const { officeSlug } = Route.useParams();
  const { data: office } = useSuspenseQuery(officeQuery(officeSlug));
  const crumb = SECTION_CRUMBS[office.section];

  const head = office.members.find((member) => member.role === "head");
  const staff = office.members.filter((member) => member.role === "staff");
  const former = office.members.filter((member) => member.role === "former");
  const hasAbout = office.intro.length > 0 || office.duties.length > 0;

  /*------ Sections ------*/
  // Built in order, then numbered, so the numbers never skip.
  const sections: { id: string; title: string; band?: boolean; body: ReactNode; action?: ReactNode }[] = [];
  if (office.links.length > 0) {
    sections.push({
      id: "tools",
      title: m.office_tools_title(),
      body: <OfficeTools links={office.links} />,
    });
  }
  if (hasAbout) {
    sections.push({ id: "about", title: m.office_about_title(), body: <About office={office} head={head} /> });
  }
  for (const list of office.lists) {
    sections.push({ id: `list-${list.id}`, title: list.title, body: <CardList list={list} /> });
  }
  if (office.notices.length > 0) {
    const category = office.feedCategory as FeedCategory | null;
    sections.push({
      id: "notices",
      title: m.office_notices_title(),
      band: true,
      action: category && <TextLink href={NEWS_CATEGORIES[category].moreHref}>{m.home_notices_more_all()}</TextLink>,
      body: (
        <div className={cn("grid gap-10", office.notes.length > 0 && "lg:grid-cols-12")}>
          <div className="lg:col-span-7">
            <NoticeList items={office.notices} />
          </div>
          {office.notes.length > 0 && <Notes notes={office.notes} />}
        </div>
      ),
    });
  } else if (office.notes.length > 0) {
    sections.push({ id: "notes", title: m.office_notes_title(), band: true, body: <Notes notes={office.notes} /> });
  }
  if (office.schedules.length > 0) {
    sections.push({
      id: "hours",
      title: m.office_hours_title(),
      body: <ScheduleTables schedules={office.schedules} />,
    });
  }
  if (office.faq.length > 0) {
    sections.push({ id: "faq", title: m.office_faq_title(), band: true, body: <FaqList faq={office.faq} /> });
  }
  for (const section of office.sections) {
    sections.push({
      id: section.key,
      title: section.title,
      body: (
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
          {section.groups.map((group) => (
            <div key={group.id}>
              <h3 className="flex items-baseline gap-2 text-h4">
                {group.title}
                <span className="text-caption font-normal text-muted-foreground">
                  {m.forms_file_count({ count: group.documents.length })}
                </span>
              </h3>
              <ItemGroup variant="ruled" className="mt-3">
                {group.documents.map((document) => (
                  <FileRow key={document.id} title={document.title} url={document.url} format={document.format} />
                ))}
              </ItemGroup>
            </div>
          ))}
        </div>
      ),
    });
  }
  // The head is shown beside the intro when there is one; otherwise with the staff.
  const people = [...(head && !hasAbout ? [head] : []), ...staff];
  if (people.length > 0) {
    sections.push({
      id: "people",
      title: people[0]?.role === "head" ? m.office_people_with_head_title() : m.office_people_title(),
      body: <PeopleRoster members={people} />,
    });
  }
  if (former.length > 0) {
    sections.push({
      id: "former",
      title: m.office_former_title(),
      body: <PeopleRoster members={former} ordered />,
    });
  }

  return (
    <>
      <PageHero
        id="office-title"
        crumbs={[{ label: crumb.label(), href: crumb.href }, { label: office.name }]}
        title={office.name}
        lede={office.lede}
        drawing={officeDrawing(office.slug)}
      >
        <ContactLines office={office} />
      </PageHero>

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={`office-${section.id}`}
          aria-labelledby={`office-${section.id}-title`}
          className={cn("scroll-mt-24 border-t", section.band ? "bg-background-alt" : "bg-background")}
        >
          <div className="mx-auto max-w-site px-gutter py-12 md:py-section">
            <RuledHeading
              id={`office-${section.id}-title`}
              number={index + 1}
              title={section.title}
              action={section.action}
            />
            <div className="mt-8">{section.body}</div>
          </div>
        </section>
      ))}

      <p className="mx-auto flex max-w-site flex-wrap items-center gap-2 border-t px-gutter py-8 text-body-sm text-muted-foreground">
        <ClockIcon aria-hidden className="size-4" />
        {m.department_updated()}
        <time dateTime={office.updatedAt.toISOString()} className="font-semibold text-foreground">
          {formatDate(office.updatedAt, { dateStyle: "long" })}
        </time>
      </p>
    </>
  );
}

/*===== Contact =====*/

/** How to reach the office, as icon lines under its title: phone, fax, email, where it is and when. */
function ContactLines({ office }: { office: Office }) {
  const lines = [
    office.phone && {
      icon: PhoneIcon,
      label: m.department_phone(),
      value: (
        <a href={`tel:${office.phone}`} dir="ltr" className="hover:underline">
          {formatPhone(office.phone)}
        </a>
      ),
    },
    office.fax && { icon: PrinterIcon, label: m.office_fax(), value: <span dir="ltr">{formatPhone(office.fax)}</span> },
    office.email && {
      icon: MailIcon,
      label: m.office_email_label(),
      value: (
        <a href={`mailto:${office.email}`} dir="ltr" className="hover:underline">
          {office.email}
        </a>
      ),
    },
    office.place && { icon: MapPinIcon, label: m.office_place(), value: office.place },
    office.hours && { icon: ClockIcon, label: m.office_hours(), value: office.hours },
  ].filter(Boolean) as { icon: typeof PhoneIcon; label: string; value: ReactNode }[];

  if (lines.length === 0) return null;
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

/*===== About =====*/

/** The intro and the numbered duties, with the head's card beside them. */
function About({ office, head }: { office: Office; head?: Office["members"][number] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="grid content-start gap-6 lg:col-span-7">
        {office.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-body-lg">
            {paragraph}
          </p>
        ))}
        {office.duties.length > 0 && (
          <div>
            <h3 className="text-h4">{m.office_duties_title()}</h3>
            <ol className="mt-3">
              {office.duties.map((duty, index) => (
                <li key={duty} className="flex gap-4 border-b py-3">
                  <span aria-hidden className="w-6 shrink-0 text-body-sm font-bold text-highlight-text">
                    {formatNumber(index + 1)}
                  </span>
                  <span>{duty}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      {head && (
        <div className="lg:col-span-5">
          <PersonCard member={head} kicker={head.jobTitle ?? m.office_head()} />
        </div>
      )}
    </div>
  );
}

/*===== Notes =====*/

/** Rules a visitor must not miss, as gold-edged callouts. */
function Notes({ notes }: { notes: string[] }) {
  return (
    <ul className="grid content-start gap-3 lg:col-span-5">
      {notes.map((note) => (
        <li key={note} className="rounded-md border border-s-4 border-s-highlight bg-card p-4 text-body-sm">
          {note}
        </li>
      ))}
    </ul>
  );
}

/*===== States =====*/

function OfficePending() {
  return (
    <div className="grid min-h-art-page place-items-center">
      <Spinner className="size-8" />
    </div>
  );
}

function OfficeNotFound() {
  return (
    <div className="mx-auto flex max-w-site flex-col items-center gap-4 px-gutter py-section text-center">
      <h1 className="text-h1">{m.office_not_found_title()}</h1>
      <p className="max-w-xl text-muted-foreground">{m.office_not_found_details()}</p>
      <TextLink href="/about">{m.office_not_found_back()}</TextLink>
    </div>
  );
}
