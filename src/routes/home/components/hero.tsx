import { ArrowLeftIcon, CalendarIcon, ExternalLinkIcon, MapPinIcon } from "lucide-react";
import { type ReactNode, ViewTransition } from "react";

import { buttonVariants } from "#/components/primitive/button/button.styles";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatDate, formatDateRange, formatRelativeDays } from "#/lib/locale";
import { NAV_SECTIONS } from "#/lib/university/navigation";
import { SERVICES } from "#/lib/university/services";
import { m } from "#/paraglide/messages";
import { SEMESTER } from "../content";
import { type EventWithStatus, fromJalali } from "../semester";

/*===== Constants =====*/

const ABOUT_HREF = NAV_SECTIONS.find((section) => section.id === "about")?.href ?? "";
const NEW_STUDENTS_HREF = SERVICES.find((service) => service.id === "new-students")?.href ?? "";

/*===== Helpers =====*/

/** The site's name with the city picked out in gold, wherever the language puts it. */
function NameWithCity() {
  const name = m.site_name();
  const city = m.home_hero_city();
  const at = name.indexOf(city);
  if (at === -1) return name;

  return (
    <>
      {name.slice(0, at)}
      <span className="text-highlight">{city}</span>
      {name.slice(at + city.length)}
    </>
  );
}

/** «۵ مهر» or «۲۸ آذر تا ۱۱ دی», then how far away it is or that it's under way. */
function eventTiming(event: EventWithStatus): string {
  const start = fromJalali(event.start);
  const dates = event.end
    ? formatDateRange({ start, end: fromJalali(event.end) })
    : formatDate(start, { day: "numeric", month: "long" });
  const when = event.status === "current" ? m.home_under_way() : formatRelativeDays(event.daysUntil);
  return `${dates} · ${when}`;
}

/*===== Hero =====*/

/**
 * The first screen: the campus photograph edge to edge under a pine scrim. The name and two actions sit at the top;
 * the place, the next academic milestone and the systems rail stand along its foot.
 */
export function Hero({ next, children }: { next?: EventWithStatus; children: ReactNode }) {
  return (
    <section aria-labelledby="home-hero" className="relative isolate overflow-hidden bg-band-deep text-on-band">
      <img
        src="/images/home/campus-hero.jpg"
        alt={m.home_hero_image_alt()}
        fetchPriority="high"
        className="absolute inset-x-0 top-0 -z-20 h-hero w-full object-cover object-hero"
      />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-hero bg-hero-scrim" />

      <div className="flex min-h-hero flex-col px-edge pt-10 pb-6 md:pt-section">
        {/*===== Name and Actions =====*/}
        <div className="max-w-215">
          <h1 id="home-hero" className="mb-4 text-display text-on-band text-shadow-photo">
            <NameWithCity />
          </h1>
          <p className="text-body-lg text-on-band-soft text-shadow-photo">
            {m.home_hero_lede_1()}
            <br />
            {m.home_hero_lede_2()}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <SiteLink href={ABOUT_HREF} className={buttonVariants({ variant: "highlight", size: "lg" })}>
              {m.home_hero_about()}
              <ArrowLeftIcon data-icon="inline-end" className="ltr:-scale-x-100" />
            </SiteLink>
            <SiteLink href={NEW_STUDENTS_HREF} className={buttonVariants({ variant: "outline-band", size: "lg" })}>
              {m.service_new_students()}
              <ExternalLinkIcon data-icon="inline-end" className="size-4" />
            </SiteLink>
          </div>
        </div>

        {/*===== Foot of the Photo =====*/}
        <div className="mt-auto">
          <ViewTransition default="home-slide">
            <div className="mt-10 mb-4 flex flex-col items-start gap-4 md:my-0 md:ms-auto md:w-fit">
              <p className="inline-flex items-center gap-1.5 text-caption text-on-band-soft text-shadow-photo">
                <MapPinIcon aria-hidden className="size-4 text-highlight" />
                {m.home_hero_place()}
              </p>
              <p aria-hidden className="hidden flex-col border-s-2 border-highlight ps-4 text-body-sm md:flex">
                <span>{m.home_hero_motto_root()}</span>
                <strong className="text-h3 text-on-band">{m.home_hero_motto_future()}</strong>
              </p>
            </div>
          </ViewTransition>

          {/*------ Next Milestone ------*/}
          <ViewTransition default="home-slide">
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-band-line pt-6">
              <CalendarIcon aria-hidden className="size-5 text-highlight" />
              <span className="text-caption font-bold text-highlight">{m.home_hero_notice()}</span>
              <p className="order-1 min-w-0 basis-full md:order-none md:flex-1 md:basis-auto">
                {next ? (
                  <>
                    <strong className="font-extrabold">{next.label()}</strong>
                    {next.cohort && <span className="text-body-sm text-on-band-muted"> ({next.cohort()})</span>}
                    <span className="block text-body-sm text-on-band-muted md:ms-3 md:inline">{eventTiming(next)}</span>
                  </>
                ) : (
                  <strong className="font-extrabold">{m.home_hero_calendar_fallback({ term: SEMESTER.name() })}</strong>
                )}
              </p>
              <a
                href="#home-calendar"
                className="order-2 inline-flex min-h-10 items-center gap-2 text-body-sm font-semibold underline-offset-4 hover:underline md:order-none"
              >
                {m.home_hero_view_calendar()}
                <ArrowLeftIcon aria-hidden className="size-4.5 text-highlight ltr:-scale-x-100" />
              </a>
            </div>
          </ViewTransition>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
