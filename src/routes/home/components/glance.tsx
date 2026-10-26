import { ExternalLinkIcon, PlayIcon } from "lucide-react";
import type { CSSProperties } from "react";

import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { TextLink } from "#/components/shared/text-link/text-link";
import { textLinkExternalClasses } from "#/components/shared/text-link/text-link.styles";
import { formatDate, formatNumber } from "#/lib/locale";
import { departmentDrawings, HOME_DRAWINGS } from "#/lib/university/drawings";
import { DEPARTMENTS, DEPARTMENTS_HREF, SOCIAL_LINKS } from "#/lib/university/navigation";
import { cn } from "#/lib/utils";
import type { FeedItem } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { STATS } from "../content";
import { isoToDate } from "../semester";

/*===== Constants =====*/

const VIDEO_CHANNEL = SOCIAL_LINKS.find((link) => link.href.includes("aparat"));

/*===== Glance =====*/

/**
 * The pine band under the home page's drawing (Avicenna's tomb before Alvand): the mission and six figures hung from
 * dimension lines beside a campus-life photo with a play link to the video channel; the departments as a grid below,
 * each cell with its department's mark. The photo is the newest campus-life notice; until the feed has one, the play
 * link stands alone on the band's deep green.
 */
export function Glance({ spotlight }: { spotlight: FeedItem | null }) {
  return (
    <section aria-labelledby="home-glance" className="relative isolate overflow-hidden bg-band text-on-band">
      {/*===== Drawing =====*/}
      {/* Its own 21:9 across the top, so none of it is cropped on wide screens; taller on phones, where it crops to the
          middle. The figures sit on its start side, so English mirrors it. */}
      <div
        aria-hidden
        style={{ "--art": `url("${HOME_DRAWINGS.glance}")` } as CSSProperties}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 aspect-21/9 min-h-96 art-band ltr:-scale-x-100"
      />

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

          {/* Each figure hangs from a dimension line, as on a department's page. */}
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.value} className="flex flex-col">
                <span
                  aria-hidden
                  className="relative block h-3 border-x border-band-line-strong before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-band-line-strong"
                />
                <dt className="order-last mt-1 text-caption text-on-band-muted">{stat.label()}</dt>
                <dd className="mt-3 text-stat text-highlight">{formatNumber(stat.value)}+</dd>
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
            {spotlight ? (
              <SiteLink
                href={spotlight.url}
                className="group/photo relative block aspect-photo overflow-hidden rounded-lg bg-band-deep text-on-band"
              >
                {spotlight.imageUrl && (
                  <img
                    src={spotlight.imageUrl}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 size-full object-cover transition-transform duration-300 motion-safe:group-hover/photo:scale-103"
                  />
                )}
                <span className="absolute inset-x-0 bottom-0 flex flex-col bg-linear-to-t from-band-deep/90 to-transparent px-6 pt-15 pb-5">
                  <span className="text-caption text-highlight">{m.home_glance_life()}</span>
                  <span className="text-h4">{spotlight.title}</span>
                </span>
              </SiteLink>
            ) : (
              <div className="aspect-photo rounded-lg bg-band-deep" />
            )}
          </div>
          <figcaption className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-2 text-caption text-on-band-muted">
            <span>
              {spotlight?.publishedOn &&
                m.home_glance_caption({
                  date: formatDate(isoToDate(spotlight.publishedOn), {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }),
                  name: m.site_name(),
                })}
            </span>
            {VIDEO_CHANNEL && (
              <SiteLink
                href={VIDEO_CHANNEL.href}
                className="inline-flex min-h-10 items-center gap-1.5 text-on-band underline-offset-4 hover:underline"
              >
                {m.home_glance_videos({ channel: VIDEO_CHANNEL.label() })}
                <ExternalLinkIcon aria-hidden className={cn(textLinkExternalClasses, "size-3.5")} />
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
            {DEPARTMENTS.map((department) => {
              const drawings = departmentDrawings(department.id);
              return (
                <li key={department.id}>
                  {/* The one gold hover on the page besides the buttons: a department is where a visitor goes next. */}
                  <SiteLink
                    href={department.href}
                    className="group/dept relative isolate flex h-full flex-col justify-center gap-0.5 bg-band px-4 py-4 text-on-band transition-colors duration-200 hover:bg-highlight hover:text-highlight-foreground focus-visible:-outline-offset-4 motion-reduce:transition-none sm:px-7 sm:py-6"
                  >
                    {/* The department's mark at the far end, faint on pine and fainter dark ink on the gold hover. Left
                      out on phones, where the cell is too narrow to keep it clear of the name. */}
                    {drawings && (
                      <span
                        aria-hidden
                        style={{ "--art": `url("${drawings.mark}")` } as CSSProperties}
                        className="pointer-events-none absolute inset-y-2 end-3 -z-10 hidden w-2/5 mask-art text-art-band transition-colors duration-200 group-hover/dept:text-highlight-foreground/15 motion-reduce:transition-none sm:block ltr:-scale-x-100"
                      />
                    )}
                    <span className="text-h3">{department.short()}</span>
                    <span className="text-caption text-on-band-muted transition-colors duration-200 group-hover/dept:text-highlight-foreground motion-reduce:transition-none">
                      {m.home_department_full({ name: department.name() })}
                    </span>
                  </SiteLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
