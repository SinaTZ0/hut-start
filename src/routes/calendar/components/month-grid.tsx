import { formatDate, formatNumber } from "#/lib/locale";
import type { EventWithStatus } from "#/lib/university/semester";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import { type CalendarDay, dayNumber, headlineFirst, KIND_CLASSES, type Month, type Weekday } from "../days";

/*===== Month Grid =====*/

/** One month as a wall calendar's page: a table of weeks whose date days carry their kind as a tint; today wears a ring. */
export function MonthGrid({
  month,
  weekdays,
  dates,
  today,
}: {
  month: Month;
  weekdays: Weekday[];
  /** The dates to show on each day, by day number (`datesByDay`). */
  dates: Map<number, EventWithStatus[]>;
  /** Today's day number (`dayNumber`). */
  today: number;
}) {
  const titleId = `calendar-month-${month.key}`;

  return (
    <div>
      <h3 id={titleId} className="mb-2 border-b-2 border-heading pb-1.5 text-h4">
        {month.title}
      </h3>
      <table
        aria-labelledby={titleId}
        className="w-full table-fixed border-separate border-spacing-1 lg:border-spacing-0.5"
      >
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th key={weekday.long} scope="col" className="pb-1 text-caption font-bold text-muted-foreground">
                <span aria-hidden>{weekday.short}</span>
                <span className="sr-only">{weekday.long}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {month.weeks.map((week, index) => (
            // A week has no identity of its own beyond its place in the month.
            // oxlint-disable-next-line react/no-array-index-key
            <tr key={index}>
              {week.map((day, column) => (
                <td key={day ? day.number : `blank-${column}`} className="p-0">
                  {day && <Day day={day} events={dates.get(dayNumber(day.date))} today={today} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/*===== Day =====*/

const TODAY_RING =
  "outline-2 outline-offset-1 outline-heading after:absolute after:bottom-0.5 after:size-1 after:rounded-full after:bg-current";

function Day({ day, events, today }: { day: CalendarDay; events?: EventWithStatus[]; today: number }) {
  const isToday = dayNumber(day.date) === today;
  const number = formatNumber(day.number);

  if (!events) {
    return (
      <span
        className={cn(
          "relative grid aspect-square place-items-center rounded-sm text-body leading-none sm:text-body-sm",
          day.isFriday ? "text-muted-foreground opacity-55" : "text-foreground",
          isToday && ["font-bold text-heading opacity-100", TODAY_RING],
        )}
      >
        {number}
      </span>
    );
  }

  const shown = headlineFirst(events);
  const what = shown
    .map((event) =>
      event.cohort ? m.calendar_event_cohort({ event: event.label(), cohort: event.cohort() }) : event.label(),
    )
    .reduce((first, second) => m.calendar_events_and({ first, second }));
  const label = m.calendar_day_label({ date: formatDate(day.date, { day: "numeric", month: "long" }), event: what });

  return (
    <span
      title={label}
      className={cn(
        "relative grid aspect-square place-items-center rounded-sm text-body leading-none font-extrabold text-heading day-tint sm:text-body-sm",
        KIND_CLASSES[shown[0].kind],
        isToday && TODAY_RING,
      )}
    >
      <span aria-hidden>{number}</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
