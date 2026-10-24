import { ExternalLinkIcon, PlayIcon } from "lucide-react";

import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { TextLink } from "#/components/shared/text-link/text-link";
import { formatDate, formatNumber } from "#/lib/locale";
import { DEPARTMENTS, SOCIAL_LINKS } from "#/lib/university/navigation";
import { m } from "#/paraglide/messages";
import { DEPARTMENTS_HREF, newsHref, SPOTLIGHT, STATS } from "../content";
import { isoToDate } from "../semester";

/*===== Constants =====*/

const VIDEO_CHANNEL = SOCIAL_LINKS.find((link) => link.href.includes("aparat"));

/*===== Glance =====*/

/**
 * The pine band: the mission and six ruled figures beside a campus-life photo with a play link to the video channel;
 * the departments as a grid below. Two faint rings decorate the band.
 */
export function Glance() {
  return (
    <section
      aria-labelledby="home-glance"
      className="relative isolate overflow-hidden bg-band text-on-band before:absolute before:-start-40 before:-top-75 before:-z-10 before:size-130 before:rounded-full before:border before:border-band-decor after:absolute after:-end-65 after:-bottom-105 after:-z-10 after:size-160 after:rounded-full after:border after:border-band-decor"
    >
      <div className="mx-auto grid max-w-site grid-cols-1 gap-y-10 px-gutter py-section lg:grid-cols-2 lg:gap-x-20">
        {/*===== Mission and Figures =====*/}
        <div>
          <SectionHead
            tone="band"
            id="home-glance"
            kicker={m.home_glance_kicker()}
            title={
              <>
                {m.site_name()}
                <br />
                {m.home_glance_title()}
              </>
            }
            className="mb-6"
          />
          <p className="text-body-sm text-on-band-soft">{m.home_glance_mission()}</p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.value} className="flex flex-col-reverse border-t border-band-line py-5">
                <dt className="text-caption text-on-band-muted">{stat.label()}</dt>
                <dd className="text-stat text-highlight">{formatNumber(stat.value)}+</dd>
              </div>
            ))}
          </dl>
        </div>

        {/*===== Spotlight =====*/}
        <figure className="self-center">
          <div className="relative">
            {VIDEO_CHANNEL && (
              <SiteLink
                href={VIDEO_CHANNEL.href}
                className="absolute inset-0 z-10 m-auto grid size-15 place-items-center rounded-full bg-highlight text-highlight-foreground shadow-play transition duration-200 hover:scale-106 hover:shadow-play-hover motion-reduce:transition-none"
              >
                {/* The triangle sits a little right of centre so it looks centred; play never mirrors. */}
                <PlayIcon aria-hidden className="size-5.5 translate-x-0.5 fill-current" />
                <span className="sr-only">{m.home_glance_videos({ channel: VIDEO_CHANNEL.label() })}</span>
              </SiteLink>
            )}
            <SiteLink
              href={newsHref(SPOTLIGHT)}
              className="group/photo relative block aspect-photo overflow-hidden rounded-lg bg-band-deep text-on-band"
            >
              {SPOTLIGHT.image && (
                <img
                  src={SPOTLIGHT.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-300 motion-safe:group-hover/photo:scale-103"
                />
              )}
              <span className="absolute inset-x-0 bottom-0 flex flex-col bg-linear-to-t from-band-deep/90 to-transparent px-6 pt-15 pb-5">
                <span className="text-caption text-highlight">{m.home_glance_life()}</span>
                <span className="text-h4">{SPOTLIGHT.title()}</span>
              </span>
            </SiteLink>
          </div>
          <figcaption className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-2 text-caption text-on-band-muted">
            <span>
              {SPOTLIGHT.date &&
                m.home_glance_caption({
                  date: formatDate(isoToDate(SPOTLIGHT.date), { day: "numeric", month: "long", year: "numeric" }),
                  name: m.site_name(),
                })}
            </span>
            {VIDEO_CHANNEL && (
              <SiteLink
                href={VIDEO_CHANNEL.href}
                className="inline-flex min-h-10 items-center gap-1.5 text-on-band underline-offset-4 hover:underline"
              >
                {m.home_glance_videos({ channel: VIDEO_CHANNEL.label() })}
                <ExternalLinkIcon aria-hidden className="size-3.5" />
              </SiteLink>
            )}
          </figcaption>
        </figure>

        {/*===== Departments =====*/}
        <div className="border-t border-band-line pt-10 lg:col-span-2">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="text-h2 text-on-band">{m.home_glance_departments({ count: DEPARTMENTS.length })}</h3>
            <TextLink href={DEPARTMENTS_HREF} tone="highlight">
              {m.home_glance_all_departments()}
            </TextLink>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-band-line-strong bg-band-line-strong sm:grid-cols-4">
            {DEPARTMENTS.map((department) => (
              <li key={department.id}>
                {/* The one gold hover on the page besides the buttons: a department is where a visitor goes next. */}
                <SiteLink
                  href={department.href}
                  className="group/dept flex h-full flex-col justify-center gap-0.5 bg-band px-4 py-4 text-on-band transition-colors duration-200 hover:bg-highlight hover:text-highlight-foreground focus-visible:-outline-offset-4 motion-reduce:transition-none sm:px-7 sm:py-6"
                >
                  <span className="text-h3">{department.short()}</span>
                  <span className="text-caption text-on-band-muted transition-colors duration-200 group-hover/dept:text-highlight-foreground motion-reduce:transition-none">
                    {m.home_department_full({ name: department.name() })}
                  </span>
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
