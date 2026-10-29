import { ArrowLeftIcon, ExternalLinkIcon, FlaskConicalIcon } from "lucide-react";
import { useMemo } from "react";

import { DepartmentGrid } from "#/components/shared/department-grid/department-grid";
import { LinkTile } from "#/components/shared/link-tile/link-tile";
import { NoticeList } from "#/components/shared/notice-list/notice-list";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { TextLink } from "#/components/shared/text-link/text-link";
import { NAV_DRAWINGS } from "#/lib/university/drawings";
import { type NavGroup, NAV_SECTIONS } from "#/lib/university/navigation";
import { SECTION_PAGES, type SectionId } from "#/lib/university/sections";
import type { FeedItem, HomeFeed } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { UpcomingDates } from "./upcoming-dates";

/*===== Constants =====*/

const NOTICE_COUNT = 6;
const CENTRAL_LAB_HREF = "http://lab.hut.ac.ir/";

/*===== Notices =====*/

/** The section's notices from the home feed, newest first, each once. */
function sectionNotices({ feed, sources }: { feed: HomeFeed; sources: (keyof HomeFeed["notices"] | "news")[] }) {
  const items = new Map<string, FeedItem>();
  for (const source of sources) {
    for (const item of source === "news" ? feed.news : feed.notices[source]) items.set(item.id, item);
  }
  return [...items.values()]
    .toSorted((a, b) => (b.publishedOn ?? "").localeCompare(a.publishedOn ?? ""))
    .slice(0, NOTICE_COUNT);
}

/*===== Section Landing =====*/

/**
 * A main menu section as a page: led by what most visitors come for (the departments, their labs, or the section's
 * first link group), then the section's other links beside its latest notices.
 */
export function SectionLanding({ sectionId, feed }: { sectionId: SectionId; feed: HomeFeed }) {
  const page = SECTION_PAGES[sectionId];
  const section = NAV_SECTIONS.find((candidate) => candidate.id === sectionId);
  // `growth` isn't a notice tab on the home page; its items come from the incubator's own list.
  const notices = useMemo(() => {
    const sources = page.feed.filter((source) => source !== "growth") as (keyof HomeFeed["notices"] | "news")[];
    const items = sectionNotices({ feed, sources });
    return page.feed.includes("growth")
      ? [...items, ...feed.growth]
          .toSorted((a, b) => (b.publishedOn ?? "").localeCompare(a.publishedOn ?? ""))
          .slice(0, NOTICE_COUNT)
      : items;
  }, [feed, page.feed]);

  if (!section) return null;

  const [firstGroup, ...otherGroups] = section.groups;
  // Education's first group is the departments, which the lead already shows; research leads with the labs instead.
  const listedGroups = page.lead === "labs" ? section.groups : otherGroups;
  const titleId = `section-${sectionId}-title`;

  return (
    <>
      <PageHero
        id={titleId}
        crumbs={[{ label: section.title() }]}
        title={section.title()}
        lede={page.lede()}
        drawing={NAV_DRAWINGS[sectionId]}
      />

      {/*===== Lead =====*/}
      <section aria-labelledby={`${titleId}-lead`} className="mx-auto max-w-site px-gutter pb-section">
        <RuledHeading
          id={`${titleId}-lead`}
          number={1}
          title={page.lead === "labs" ? m.nav_research_labs() : firstGroup.title()}
        />
        <div className="mt-8">
          {page.lead === "first-group" && <GroupTiles group={firstGroup} />}
          {page.lead === "departments" && <DepartmentGrid />}
          {page.lead === "labs" && (
            <div className="grid gap-4">
              <DepartmentGrid to="labs" />
              <LinkTile
                href={CENTRAL_LAB_HREF}
                title={m.nav_research_central_lab()}
                description={m.home_unit_lab()}
                icon={FlaskConicalIcon}
              />
            </div>
          )}
        </div>
      </section>

      {/*===== Links and Notices =====*/}
      <section aria-label={section.summary()} className="border-t bg-background-alt">
        <div className="mx-auto grid max-w-site gap-14 px-gutter py-section lg:grid-cols-12 lg:gap-12">
          <div className="grid content-start gap-12 lg:col-span-7">
            {listedGroups.map((group, index) => (
              <div key={group.title()}>
                <RuledHeading id={`${titleId}-group-${index}`} number={index + 2} title={group.title()} />
                <GroupLinks group={group} />
              </div>
            ))}
          </div>

          <div className="grid content-start gap-10 lg:col-span-5">
            <div>
              <RuledHeading
                id={`${titleId}-notices`}
                number={listedGroups.length + 2}
                title={sectionId === "about" ? m.section_news_title() : m.section_notices_title()}
              />
              <div className="mt-6">
                {notices.length > 0 ? (
                  <NoticeList items={notices} />
                ) : (
                  <p className="text-muted-foreground">{m.section_notices_empty()}</p>
                )}
              </div>
              <TextLink href={page.archiveHref} className="mt-5">
                {sectionId === "about" ? m.home_news_more() : m.home_notices_more_all()}
              </TextLink>
            </div>
            {page.semester && <UpcomingDates />}
          </div>
        </div>
      </section>
    </>
  );
}

/*===== Link Groups =====*/

/** A group's links as tiles: where a visitor most often goes from this section. */
function GroupTiles({ group }: { group: NavGroup }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {group.links.map((link) => (
        <li key={link.href}>
          <LinkTile href={link.href} title={link.label()} />
        </li>
      ))}
    </ul>
  );
}

/** A group's links as ruled rows, each with an arrow, or the outward one for another site. */
function GroupLinks({ group }: { group: NavGroup }) {
  return (
    <ul className="mt-5">
      {group.links.map((link) => {
        const external = link.href.startsWith("http");
        return (
          <li key={link.href} className="border-b">
            <SiteLink
              href={link.href}
              className="group/link flex items-center justify-between gap-4 rounded-sm px-2 py-4 text-h4 text-heading transition-colors duration-200 hover:bg-accent focus-visible:bg-accent motion-reduce:transition-none"
            >
              {link.label()}
              {/* Another site gets the outward arrow; the forward arrow points left and flips in English. */}
              {external ? (
                <ExternalLinkIcon aria-hidden className="size-4.5 shrink-0 text-brand-text" />
              ) : (
                <ArrowLeftIcon aria-hidden className="size-4.5 shrink-0 text-brand-text ltr:-scale-x-100" />
              )}
            </SiteLink>
          </li>
        );
      })}
    </ul>
  );
}
