import { CalendarPlusIcon } from "lucide-react";

import { buttonVariants } from "#/components/primitive/button/button.styles";
import { formatDate, formatDateRange, formatRelativeDays } from "#/lib/locale";
import { type Cohort, cohortName, type EventWithStatus, fromJalali } from "#/lib/university/semester";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import { localizeHref } from "#/paraglide/runtime";
import { KindSwatch } from "./swatches";

/*===== My Dates =====*/

/**
 * The reader's dates as a list beside the grids: each with its day's square, its dates, and how far off it is, the next
 * one in gold; then a download of the same dates for a calendar app.
 */
export function MyDates({ events, cohort }: { events: EventWithStatus[]; cohort?: Cohort }) {
  const next = events.find((event) => event.status !== "past");
  // A server route, not a page: a plain link, so the router doesn't try to render it.
  const icsHref = localizeHref(cohort ? `/calendar.ics?cohort=${cohort}` : "/calendar.ics");

  return (
    <aside aria-labelledby="calendar-mine-title" className="self-start rounded-md border bg-card p-5">
      <h2 id="calendar-mine-title" className="border-b pb-2 text-h4">
        {cohort ? (
          <>
            {m.calendar_mine_for()} <span className="text-destructive">{cohortName(cohort)}</span>
          </>
        ) : (
          m.calendar_mine_title()
        )}
      </h2>
      <ul>
        {events.map((event) => {
          const start = fromJalali(event.start);
          const dates = event.end
            ? formatDateRange({ start, end: fromJalali(event.end) })
            : formatDate(start, { day: "numeric", month: "long" });
          const isPast = event.status === "past";

          return (
            <li key={event.id} className="flex items-center gap-3 border-b py-2.5">
              <KindSwatch kind={event.kind} className="size-6 rounded-sm" />
              <span className="min-w-0 grow">
                <span className={cn("block text-body-sm font-bold", isPast ? "text-muted-foreground" : "text-heading")}>
                  {event.label()}
                </span>
                <span className="block text-caption text-muted-foreground">
                  {dates}
                  {event.cohort && ` · ${event.cohort()}`}
                </span>
              </span>
              <span
                className={cn(
                  "text-caption font-bold whitespace-nowrap",
                  event === next ? "text-highlight-text" : "text-muted-foreground",
                )}
              >
                {event.status === "past"
                  ? m.calendar_past()
                  : event.status === "current"
                    ? m.home_under_way()
                    : formatRelativeDays(event.daysUntil)}
              </span>
            </li>
          );
        })}
      </ul>
      <a href={icsHref} download className={cn(buttonVariants({ size: "sm" }), "mt-4 w-full")}>
        <CalendarPlusIcon aria-hidden />
        {m.calendar_ics()}
      </a>
    </aside>
  );
}
