import { formatDate, formatDateParts } from "#/lib/locale";
import { type EventKind, type EventWithStatus, fromJalali, type JDate } from "#/lib/university/semester";
import { m } from "#/paraglide/messages";
import { getLocale, type Locale } from "#/paraglide/runtime";

/*===== Calendar System =====*/
// Persian readers get the Jalali months with the week from Saturday, as the university's own calendar is set; English
// readers the Gregorian months the same dates fall in, with the week from Monday. Friday is the day off in both.

const SYSTEMS: Record<Locale, { jalali: boolean; weekStart: number }> = {
  fa: { jalali: true, weekStart: 6 },
  en: { jalali: false, weekStart: 1 },
};

const DAY_MS = 86_400_000;
const FRIDAY = 5;

/** A date's whole days since 1970, to key days by. Every date here is at UTC noon, so it never lands on an edge. */
export const dayNumber = (date: Date) => Math.floor(date.getTime() / DAY_MS);

const addDays = (date: Date, days: number) => new Date(date.getTime() + days * DAY_MS);

/** A date's column in a week row, 0 at the week's first day. */
const column = (date: Date) => (date.getUTCDay() - SYSTEMS[getLocale()].weekStart + 7) % 7;

/*===== Months =====*/

export type CalendarDay = { date: Date; number: number; isFriday: boolean };

export type Month = {
  key: string;
  /** «شهریور ۱۴۰۵», "September 2026". */
  title: string;
  /** Week rows of seven, `null` before the first day and after the last. */
  weeks: (CalendarDay | null)[][];
};

function buildMonth({ first, length }: { first: Date; length: number }): Month {
  // Month then year, from the parts: Persian's own month-and-year format puts the year first.
  const { month, year } = formatDateParts(first);
  const days: (CalendarDay | null)[] = Array.from({ length: column(first) }, () => null);
  for (let index = 0; index < length; index++) {
    const date = addDays(first, index);
    days.push({ date, number: index + 1, isFriday: date.getUTCDay() === FRIDAY });
  }
  while (days.length % 7 > 0) days.push(null);

  const weeks: (CalendarDay | null)[][] = [];
  for (let index = 0; index < days.length; index += 7) weeks.push(days.slice(index, index + 7));
  return { key: `${dayNumber(first)}`, title: `${month} ${year}`, weeks };
}

/** The months a semester's dates span, in the reader's calendar. */
export function semesterMonths({ start, end }: { start: JDate; end: JDate }): Month[] {
  const months: Month[] = [];

  if (SYSTEMS[getLocale()].jalali) {
    let [year, month] = start;
    while (year * 12 + month <= end[0] * 12 + end[1]) {
      const next: JDate = month === 12 ? [year + 1, 1, 1] : [year, month + 1, 1];
      const first = fromJalali([year, month, 1]);
      months.push(buildMonth({ first, length: dayNumber(fromJalali(next)) - dayNumber(first) }));
      [year, month] = next;
    }
    return months;
  }

  const from = fromJalali(start);
  const to = fromJalali(end);
  let year = from.getUTCFullYear();
  let month = from.getUTCMonth();
  while (year * 12 + month <= to.getUTCFullYear() * 12 + to.getUTCMonth()) {
    const first = new Date(Date.UTC(year, month, 1, 12));
    months.push(buildMonth({ first, length: new Date(Date.UTC(year, month + 1, 0)).getUTCDate() }));
    month++;
    if (month === 12) [year, month] = [year + 1, 0];
  }
  return months;
}

export type Weekday = { short: string; long: string; isFriday: boolean };

/** The week row's headings, from the week's first day. */
export function weekdays(): Weekday[] {
  // Any date will do: step back from it to the start of its week.
  const anchor = fromJalali([1405, 1, 1]);
  const start = addDays(anchor, -column(anchor));
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(start, index);
    return {
      short: formatDate(date, { weekday: "narrow" }),
      long: formatDate(date, { weekday: "long" }),
      isFriday: date.getUTCDay() === FRIDAY,
    };
  });
}

/*===== Dates By Day =====*/

/** Every date on each day it covers, by day number, in the semester's order. */
export function datesByDay(events: EventWithStatus[]): Map<number, EventWithStatus[]> {
  const days = new Map<number, EventWithStatus[]>();
  for (const event of events) {
    const first = dayNumber(fromJalali(event.start));
    const last = dayNumber(fromJalali(event.end ?? event.start));
    for (let day = first; day <= last; day++) days.set(day, [...(days.get(day) ?? []), event]);
  }
  return days;
}

/**
 * A day's dates with the one that colours it first: the milestone where dates overlap (pre-registration inside the
 * evaluation weeks shows as evaluation, and its label names both).
 */
export function headlineFirst(events: EventWithStatus[]): EventWithStatus[] {
  const headline = events.find((event) => event.milestone) ?? events[0];
  return [headline, ...events.filter((event) => event !== headline)];
}

/*===== Kinds =====*/

/** Each kind's `kind-*` utility (styles.css), which sets the hue and ink its days and swatches are drawn in. */
export const KIND_CLASSES: Record<EventKind, string> = {
  registration: "kind-registration",
  classes: "kind-classes",
  changes: "kind-changes",
  evaluation: "kind-evaluation",
  exams: "kind-exams",
};

/** The kinds in the legend's order, which is the semester's. */
export const KINDS: { kind: EventKind; label: () => string }[] = [
  { kind: "registration", label: m.calendar_kind_registration },
  { kind: "classes", label: m.calendar_kind_classes },
  { kind: "changes", label: m.calendar_kind_changes },
  { kind: "evaluation", label: m.calendar_kind_evaluation },
  { kind: "exams", label: m.calendar_kind_exams },
];
