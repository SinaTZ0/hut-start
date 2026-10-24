import { CalendarIcon } from "lucide-react";
import type { CSSProperties } from "react";

import { Badge } from "#/components/primitive/badge/badge";
import { buttonVariants } from "#/components/primitive/button/button.styles";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatDate, formatDateParts, formatDateRange, formatRelativeDays } from "#/lib/locale";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import { SEMESTER } from "../content";
import { daysBetween, type EventWithStatus, fromJalali, type SemesterState } from "../semester";

/*===== Helpers =====*/

/** The tile's large day line and small month line. A range in one month reads «۲۶–۲۹»; across months the month
 * line names both. */
function tileText(event: EventWithStatus): { day: string; month: string } {
  const start = formatDateParts(fromJalali(event.start));
  if (!event.end) return { day: start.day, month: `${start.month} ${start.year}` };

  const end = formatDateParts(fromJalali(event.end));
  const month =
    start.month === end.month
      ? `${start.month} ${start.year}`
      : m.home_term_months({ from: start.month, to: end.month });
  return { day: `${start.day}–${end.day}`, month };
}

/** The full dates for screen readers, with the year. */
function fullDates(event: EventWithStatus): string {
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  const start = fromJalali(event.start);
  return event.end ? formatDateRange({ start, end: fromJalali(event.end), options }) : formatDate(start, options);
}

/** The tip on a milestone: how far away it starts, how long it still runs, or how long ago it ended. */
function distance({ event, state }: { event: EventWithStatus; state: SemesterState }): string {
  const ranged = event.end !== undefined;
  if (event.status === "upcoming") {
    if (!ranged) return formatRelativeDays(event.daysUntil);
    return event.daysUntil === 1 ? m.home_term_starts_tomorrow() : m.home_term_starts_in({ days: event.daysUntil });
  }

  const toEnd = daysBetween(state.today, event.end ?? event.start);
  if (event.status === "past") {
    if (!ranged) return formatRelativeDays(toEnd);
    return toEnd === -1 ? m.home_term_ended_yesterday() : m.home_term_ended_ago({ days: -toEnd });
  }
  if (toEnd === 0) return m.home_term_last_day();
  return toEnd === 1 ? m.home_term_ends_tomorrow() : m.home_term_ends_in({ days: toEnd });
}

/*===== Milestone =====*/

function Milestone({ event, state, isNext }: { event: EventWithStatus; state: SemesterState; isNext: boolean }) {
  const { day, month } = tileText(event);
  const isPast = event.status === "past";
  const isMarked = isNext || event.status === "current";
  const tipId = `home-term-tip-${event.id}`;

  return (
    <li
      // Focusable so keyboard users get the same tip as a hover; the tip is its description.
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      aria-describedby={tipId}
      className={cn(
        "group/stop relative flex grow basis-2/5 flex-col px-5 pt-4 pb-5 transition-colors duration-200 focus-visible:-outline-offset-2 motion-reduce:transition-none md:basis-34",
        isMarked ? "bg-highlight-surface" : "bg-card hover:bg-accent focus-visible:bg-accent",
      )}
    >
      {/*------ Tip ------*/}
      <span
        id={tipId}
        role="tooltip"
        className="pointer-events-none absolute start-3.5 bottom-full z-10 -mb-1.5 translate-y-1 rounded-sm bg-heading px-3 py-1 text-caption font-semibold whitespace-nowrap text-card opacity-0 shadow-md transition duration-200 group-hover/stop:translate-y-0 group-hover/stop:opacity-100 group-focus-visible/stop:translate-y-0 group-focus-visible/stop:opacity-100 after:absolute after:start-3 after:-bottom-1 after:size-2.5 after:rotate-45 after:bg-heading motion-reduce:transition-none"
      >
        {distance({ event, state })}
      </span>

      <span aria-hidden className={cn("text-stat-sm", isPast ? "text-brand-text" : "text-heading")}>
        {day}
      </span>
      <span aria-hidden className="text-caption whitespace-nowrap text-muted-foreground">
        {month}
      </span>
      <span className={cn("mt-1.5 text-body-sm font-bold", isPast ? "text-muted-foreground" : "text-foreground")}>
        {event.label()}
      </span>
      <span className="sr-only">
        {isPast ? m.home_term_dates_past({ dates: fullDates(event) }) : m.home_term_dates({ dates: fullDates(event) })}
      </span>
      {isMarked && (
        <Badge variant="highlight" className="mt-2.5">
          {event.status === "current" ? m.home_under_way() : formatRelativeDays(event.daysUntil)}
        </Badge>
      )}
    </li>
  );
}

/*===== Semester Section =====*/

/**
 * The semester on one card: a thin track at true scale, one cell per day, pine once passed and gold while under way,
 * with a line for today; under it the milestones as large cells, the next one picked out in gold.
 */
export function SemesterSection({ state }: { state: SemesterState }) {
  const milestones = state.events.filter((event) => event.milestone);
  const nextId = state.nextMilestone?.id;
  const segments = milestones.map((event, index) => {
    const to = milestones[index + 1]?.position ?? 1;
    const status = state.progress >= to ? "past" : state.progress >= event.position ? "current" : "upcoming";
    return { id: event.id, from: event.position, to, status };
  });

  return (
    <section id="home-calendar" aria-labelledby="home-term">
      <SectionHead
        id="home-term"
        kicker={m.home_term_kicker()}
        title={m.home_term_title()}
        lede={m.home_term_lede()}
        more={{ label: m.home_term_more(), href: SEMESTER.calendarHref }}
      />

      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 md:px-8 md:py-5">
          <p className="flex items-center gap-2 font-bold text-heading">
            <CalendarIcon aria-hidden className="size-4.5 text-brand-text" />
            {SEMESTER.name()}
          </p>
          <SiteLink href={SEMESTER.sourceHref} className={buttonVariants({ variant: "secondary", size: "sm" })}>
            {m.home_term_source()}
          </SiteLink>
        </div>

        {/*===== Track =====*/}
        {/* The days and positions travel as custom properties; the `term-*` utilities in styles.css lay them out. */}
        <div aria-hidden className="relative mx-5 mt-13 mb-8 md:mx-8">
          <div
            className="relative h-3.5 overflow-hidden rounded-xs bg-border term-track"
            style={{ "--days": state.totalDays } as CSSProperties}
          >
            {segments.map((segment) => (
              <span
                key={segment.id}
                data-status={segment.status}
                className="absolute inset-y-0 term-segment data-[status=current]:bg-highlight data-[status=past]:bg-brand-text"
                style={{ "--from": segment.from, "--to": segment.to } as CSSProperties}
              />
            ))}
          </div>
          <span
            className="absolute -inset-y-2 term-marker w-0.75 rounded-xs bg-heading"
            style={{ "--at": state.progress } as CSSProperties}
          >
            {/* Centred over the line: `left-1/2 -translate-x-1/2` centres the same way in either direction. */}
            <span className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded-full bg-heading px-2.5 text-caption font-semibold whitespace-nowrap text-card">
              {m.home_term_today()}
            </span>
          </span>
        </div>

        {/*===== Milestones =====*/}
        <ol className="flex flex-wrap gap-px border-t bg-border">
          {milestones.map((event) => (
            <Milestone key={event.id} event={event} state={state} isNext={event.id === nextId} />
          ))}
        </ol>
      </div>
    </section>
  );
}
