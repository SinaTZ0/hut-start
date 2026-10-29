import { createFileRoute } from "@tanstack/react-router";
import { CalendarDaysIcon, DownloadIcon, MousePointerClickIcon, PencilIcon } from "lucide-react";
import { useCallback, useMemo, useRef } from "react";
import { z } from "zod";

import { Badge } from "#/components/primitive/badge/badge";
import { Button } from "#/components/primitive/button/button";
import { FilterChips } from "#/components/shared/filter-chips/filter-chips";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatNumber } from "#/lib/locale";
import { pageMeta } from "#/lib/seo";
import { cn } from "#/lib/utils";
import { PAGE_DRAWINGS } from "#/lib/university/drawings";
import {
  CALENDAR_RULES,
  type Cohort,
  cohortName,
  COHORTS,
  fromJalali,
  isForCohort,
  SEMESTER,
  semesterState,
  todayInTehran,
} from "#/lib/university/semester";
import { m } from "#/paraglide/messages";
import { MonthGrid } from "./components/month-grid";
import { MyDates } from "./components/my-dates";
import { KindSwatch, TodaySwatch } from "./components/swatches";
import { datesByDay, dayNumber, KINDS, semesterMonths, weekdays } from "./days";
import { useScrolledPast } from "./hooks/use-scrolled-past";

/*===== Search =====*/
// The reader's entry year (`/calendar?cohort=1403`), so a shared link opens on the same dates. It travels as a number:
// the router reads digits in the URL back as one, and writes a string of digits in quotes (`?cohort=%221403%22`).

const searchSchema = z.object({
  cohort: z
    .number()
    .refine((value) => COHORTS.some((cohort) => Number(cohort) === value))
    .optional()
    .catch(undefined),
});

/** The search's year as the semester's dates name it; none until the reader picks one. */
const cohortOf = (value?: number): Cohort | undefined => COHORTS.find((cohort) => Number(cohort) === value);

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/calendar")({
  validateSearch: searchSchema,
  head: (args) => pageMeta({ args, title: m.nav_education_calendar(), description: m.calendar_lede() }),
  component: CalendarPage,
});

/*===== Helpers =====*/

/** A Jalali year without a thousands separator: «۱۴۰۳», not «۱٬۴۰۳». */
const year = (value: number) => formatNumber(value, { useGrouping: false });

/** The entry years as the picker names them. */
const cohortChips = () => COHORTS.map((cohort) => ({ value: cohort, label: cohortName(cohort) }));

/** «تقویم ورودی ۱۴۰۴», the year in red: the one word that must not go unnoticed when it's the wrong one. */
function CalendarFor({ cohort }: { cohort: Cohort }) {
  return (
    <>
      {m.calendar_for()} <span className="text-destructive">{cohortName(cohort)}</span>
    </>
  );
}

/** The official calendar, as the university published it (an image and a PDF). */
function SourceLink() {
  return (
    <SiteLink
      href={SEMESTER.sourceHref}
      className="inline-flex items-center gap-1.5 text-body-sm font-bold text-brand-text hover:underline"
    >
      <DownloadIcon aria-hidden className="size-4" />
      {m.home_term_source()}
    </SiteLink>
  );
}

/*===== Page =====*/

/**
 * This semester's dates as a wall calendar for one entry year: the reader picks theirs first, then gets one grid per
 * month with each date's kind as a colour, their dates listed beside it, and the rules that go with them after. Until
 * they pick, the calendar of every date shows greyed out under a prompt, so the page still shows what it holds (and
 * crawlers read it).
 */
function CalendarPage() {
  const cohort = cohortOf(Route.useSearch().cohort);
  const navigate = Route.useNavigate();

  // Today in Tehran, once per page view, as on the home page.
  const state = useMemo(() => semesterState({ events: SEMESTER.events, today: todayInTehran() }), []);
  const last = SEMESTER.events.at(-1) ?? SEMESTER.events[0];
  const months = semesterMonths({ start: SEMESTER.events[0].start, end: last.end ?? last.start });
  const weekRow = weekdays();
  // Registration and add and drop fall on different days per entry year: once a year is picked, the others' dates drop
  // out, and a date for several years (1403 and 1404) stays for each of them.
  const mine = useMemo(
    () => state.events.filter((event) => isForCohort({ event, cohort: cohort ?? "all" })),
    [state, cohort],
  );
  const dates = useMemo(() => datesByDay(mine), [mine]);
  const today = dayNumber(fromJalali(state.today));

  // A filter, not a new page: no history entry and no jump to the top.
  const changeCohort = useCallback(
    (next: Cohort) =>
      void navigate({
        search: (prev) => ({ ...prev, cohort: Number(next) }),
        replace: true,
        resetScroll: false,
      }),
    [navigate],
  );
  // Back to the prompt and its chips, wherever the reader is in the calendar.
  const clearCohort = useCallback(
    () =>
      void navigate({
        search: (prev) => ({ ...prev, cohort: undefined }),
        replace: true,
        resetScroll: false,
      }),
    [navigate],
  );

  // A reader deep in the calendar no longer sees its heading; the bar keeps their year in sight.
  const headingRef = useRef<HTMLDivElement>(null);
  const showBar = useScrolledPast({ ref: headingRef, enabled: cohort !== undefined });

  return (
    <>
      <PageHero
        id="calendar-title"
        crumbs={[{ label: m.nav_education(), href: "/education" }, { label: m.nav_education_calendar() }]}
        title={m.nav_education_calendar()}
        lede={m.calendar_lede()}
        drawing={PAGE_DRAWINGS.calendar}
      >
        {/*------ Term ------*/}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Badge variant="highlight-soft">
            <CalendarDaysIcon aria-hidden />
            {SEMESTER.name()} · {m.calendar_term_code({ code: year(SEMESTER.code) })}
          </Badge>
          <SourceLink />
        </div>
      </PageHero>

      {/*===== Calendar =====*/}
      <section aria-labelledby="calendar-term-title" className="border-t bg-background-alt">
        <div className="mx-auto max-w-site px-gutter py-12 md:py-section">
          {/*------ Entry Year ------*/}
          {/* Unpicked, the chips; picked, the year as the section's heading, so the calendar says whose it is. */}
          <div ref={headingRef} className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
            {cohort ? (
              <>
                <h2 id="calendar-term-title" className="text-h2">
                  <CalendarFor cohort={cohort} />
                </h2>
                <Button variant="secondary" size="sm" onClick={clearCohort}>
                  <PencilIcon aria-hidden />
                  {m.calendar_change_year()}
                </Button>
              </>
            ) : (
              <>
                <h2 id="calendar-term-title" className="sr-only">
                  {SEMESTER.name()}
                </h2>
                <span aria-hidden className="text-body font-bold text-heading">
                  {m.calendar_cohort_caption()}
                </span>
                <FilterChips
                  label={m.calendar_cohort_label()}
                  value={cohort}
                  onValueChange={changeCohort}
                  chips={cohortChips()}
                />
              </>
            )}
          </div>
          <hr className="my-8 border-border" />

          {/*------ Year Bar ------*/}
          {/* Sticks under the header while the calendar is on screen, once its heading has scrolled away. It hangs from a
              zero-height holder, so showing it never moves the calendar. */}
          {cohort && (
            <div className="sticky top-2 z-20 h-0 lg:top-21">
              <div
                inert={!showBar}
                className={cn(
                  "absolute inset-x-0 top-0 flex justify-center transition duration-200 motion-reduce:transition-none",
                  !showBar && "pointer-events-none -translate-y-2 opacity-0",
                )}
              >
                <p className="flex items-center gap-3 rounded-full border border-highlight bg-highlight-surface py-1 ps-4 pe-1 text-body font-bold text-heading shadow-md">
                  <span>
                    <CalendarFor cohort={cohort} />
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearCohort}>
                    <PencilIcon aria-hidden />
                    {m.calendar_change_year()}
                  </Button>
                </p>
              </div>
            </div>
          )}

          <div className="relative">
            {/* Unpicked, the calendar stays in view but out of reach (`inert`): grey, faint and blurred under the prompt. */}
            <div
              inert={!cohort}
              className={cn(
                "grid gap-10 transition duration-300 motion-reduce:transition-none lg:grid-cols-12",
                !cohort && "opacity-45 blur-xs grayscale select-none",
              )}
            >
              <div className="lg:col-span-8">
                {/*------ Legend ------*/}
                <ul className="mb-6 flex flex-wrap gap-x-4.5 gap-y-1.5 text-body-sm font-semibold text-foreground">
                  {KINDS.map(({ kind, label }) => (
                    <li key={kind} className="inline-flex items-center gap-2">
                      <KindSwatch kind={kind} />
                      {label()}
                    </li>
                  ))}
                  <li className="inline-flex items-center gap-2">
                    <TodaySwatch />
                    {m.home_term_today()}
                  </li>
                </ul>

                {/*------ Months ------*/}
                <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                  {months.map((month) => (
                    <MonthGrid key={month.key} month={month} weekdays={weekRow} dates={dates} today={today} />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4">
                <MyDates events={mine} cohort={cohort} />
              </div>
            </div>

            {/*------ Prompt ------*/}
            {/* It rides down the calendar with the reader, so it's in view wherever they are in it, and holds the same
                year chips as the row above, so the reader picks right where they're asked to. */}
            {!cohort && (
              <div className="absolute inset-0 flex justify-center px-4 pt-16">
                <div className="sticky top-1/3 flex h-fit flex-col items-center gap-4 rounded-md border bg-card px-6 py-5 text-center shadow-md">
                  <p className="flex items-center gap-3 text-h4">
                    <MousePointerClickIcon aria-hidden className="size-5 shrink-0 text-brand-text" />
                    {m.calendar_pick_year()}
                  </p>
                  <FilterChips
                    label={m.calendar_cohort_label()}
                    value={cohort}
                    onValueChange={changeCohort}
                    chips={cohortChips()}
                    className="justify-center"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/*===== Rules =====*/}
      <section aria-labelledby="calendar-rules-title" className="border-t bg-background">
        <div className="mx-auto max-w-site px-gutter py-12 md:py-section">
          <RuledHeading id="calendar-rules-title" title={m.calendar_rules_title()} action={<SourceLink />} />
          <ol className="mt-6 max-w-4xl">
            {CALENDAR_RULES.map((rule, index) => (
              <li
                key={rule.id}
                className="flex gap-3 border-b py-3.5 text-justify text-body leading-loose hyphens-auto"
              >
                <span aria-hidden className="w-6 shrink-0 font-extrabold text-highlight-text">
                  {formatNumber(index + 1)}
                </span>
                {rule.text()}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
