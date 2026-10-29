import { useMemo } from "react";

import { formatDate, formatDateParts, formatDateRange } from "#/lib/locale";
import { fromJalali, SEMESTER, semesterState, todayInTehran } from "#/lib/university/semester";
import { m } from "#/paraglide/messages";

/*===== Constants =====*/

const DATE_COUNT = 3;

/*===== Upcoming Dates =====*/

/** The semester's next milestones, under way or ahead, as calendar leaves with their dates. */
export function UpcomingDates() {
  // Today in Tehran, once per page view, as on the home page.
  const events = useMemo(() => {
    const state = semesterState({ events: SEMESTER.events, today: todayInTehran() });
    return state.events.filter((event) => event.milestone && event.status !== "past").slice(0, DATE_COUNT);
  }, []);

  if (events.length === 0) return null;

  return (
    <aside aria-labelledby="upcoming-dates-title" className="rounded-md border bg-card p-5 sm:p-6">
      <p className="text-caption text-muted-foreground">{SEMESTER.name()}</p>
      <h3 id="upcoming-dates-title" className="text-h4">
        {m.section_upcoming_title()}
      </h3>
      <ul className="mt-3">
        {events.map((event) => {
          const start = fromJalali(event.start);
          const parts = formatDateParts(start, { month: "short" });
          return (
            <li key={event.id} className="flex gap-4 py-3 not-first:border-t">
              <span
                aria-hidden
                className="flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-sm border bg-background"
              >
                <span className="text-h4 text-heading">{parts.day}</span>
                <span className="text-caption text-muted-foreground">{parts.month}</span>
              </span>
              <span className="min-w-0">
                <span className="block text-body-sm font-bold text-heading">
                  {event.label()}
                  {event.cohort && <span className="font-normal text-muted-foreground"> · {event.cohort()}</span>}
                </span>
                <span className="block text-caption text-muted-foreground">
                  {event.end
                    ? formatDateRange({ start, end: fromJalali(event.end) })
                    : formatDate(start, { day: "numeric", month: "long" })}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
