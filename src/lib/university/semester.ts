/*===== Jalali Dates =====*/
// The academic calendar is set in the Jalali (Solar Hijri) calendar. These helpers do date arithmetic on it through
// the platform's `Intl` Persian calendar, so leap years follow the platform. They compute, never display: showing a
// date is `formatDate` / `formatDateRange` (src/lib/locale.ts). Every date is taken at UTC noon, so a time zone a few
// hours either side never moves it to another day.

/** A Jalali date as [year, month, day]. */
export type JDate = readonly [number, number, number];

import { formatNumber, isoToDate } from "#/lib/locale";
import { m } from "#/paraglide/messages";

const DAY_MS = 86_400_000;

// Latin digits and the Persian calendar in a fixed locale: these parts are parsed back into numbers, not shown.
const partsFormats = new Map<string, Intl.DateTimeFormat>();
function partsFormat(timeZone: string): Intl.DateTimeFormat {
  let format = partsFormats.get(timeZone);
  if (!format) {
    format = new Intl.DateTimeFormat("en-u-ca-persian-nu-latn", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timeZone,
    });
    partsFormats.set(timeZone, format);
  }
  return format;
}

export function toJalali(date: Date, timeZone = "UTC"): JDate {
  const parts = Object.fromEntries(
    partsFormat(timeZone)
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );
  return [Number(parts.year), Number(parts.month), Number(parts.day)];
}

/** Orders Jalali dates as plain numbers (YYYYMMDD). */
const jKey = ([year, month, day]: JDate) => year * 10_000 + month * 100 + day;

/** The Gregorian `Date` (UTC noon) of a Jalali date. */
export function fromJalali(date: JDate): Date {
  const [year, month, day] = date;
  const dayOfYear = month <= 6 ? (month - 1) * 31 + day : 186 + (month - 7) * 30 + day;
  // 1 Farvardin falls on 20 or 21 March: start from 21 March and step at most a few days to the exact date.
  const guess = new Date(Date.UTC(year + 621, 2, 21 + dayOfYear - 1, 12));
  const target = jKey(date);
  for (let step = 0; step < 4; step++) {
    const key = jKey(toJalali(guess));
    if (key === target) break;
    guess.setUTCDate(guess.getUTCDate() + (key < target ? 1 : -1));
  }
  return guess;
}

/** Whole days from `from` to `to` (negative when `to` is earlier). */
export function daysBetween(from: JDate, to: JDate): number {
  return Math.round((fromJalali(to).getTime() - fromJalali(from).getTime()) / DAY_MS);
}

/** Today in Tehran, where the calendar's days begin and end. */
export function todayInTehran(): JDate {
  return toJalali(new Date(), "Asia/Tehran");
}

/*===== Semester =====*/

export type CalendarEvent = {
  id: string;
  label: () => string;
  /** Who it applies to, e.g. «ورودی ۱۴۰۳». */
  cohort?: () => string;
  start: JDate;
  end?: JDate;
  /** Milestones are the headline events: the hero's notice and the calendar's cells. */
  milestone?: boolean;
};

export type EventStatus = "past" | "current" | "upcoming";

export type EventWithStatus = CalendarEvent & {
  status: EventStatus;
  /** Days from today to the start; negative once it has started. */
  daysUntil: number;
  /** Where the event starts on the semester's span, 0–1. */
  position: number;
};

export type SemesterState = {
  today: JDate;
  /** Today's place on the semester's span, clamped to 0–1. */
  progress: number;
  events: EventWithStatus[];
  /** The next milestone that hasn't ended: under way or upcoming. */
  nextMilestone?: EventWithStatus;
  totalDays: number;
};

function statusOf(event: CalendarEvent, today: JDate): EventStatus {
  if (jKey(today) < jKey(event.start)) return "upcoming";
  if (jKey(today) > jKey(event.end ?? event.start)) return "past";
  return "current";
}

/** Where `today` falls in the semester: each event's status and position, and the next milestone. */
export function semesterState({ events, today }: { events: CalendarEvent[]; today: JDate }): SemesterState {
  const first = events[0].start;
  const lastEvent = events.at(-1) ?? events[0];
  const totalDays = Math.max(1, daysBetween(first, lastEvent.end ?? lastEvent.start));
  const position = (date: JDate) => Math.min(1, Math.max(0, daysBetween(first, date) / totalDays));

  const withStatus = events.map<EventWithStatus>((event) => ({
    ...event,
    status: statusOf(event, today),
    daysUntil: daysBetween(today, event.start),
    position: position(event.start),
  }));

  return {
    today,
    progress: position(today),
    events: withStatus,
    nextMilestone: withStatus.find((event) => event.status !== "past" && event.milestone),
    totalDays,
  };
}

/** Whole days from `today` to a publication date (negative for the past). */
export function daysFromToday({ today, iso }: { today: JDate; iso: string }): number {
  return Math.round((isoToDate(iso).getTime() - fromJalali(today).getTime()) / DAY_MS);
}

/*===== This Semester =====*/
// The first semester of 1405–1406 (term 4051), from the official calendar. Replaced by a `calendar.current` procedure.

/** A Jalali year without a thousands separator: «۱۴۰۳», not «۱٬۴۰۳». */
const year = (value: number) => formatNumber(value, { useGrouping: false });

const COHORT_1402_AND_EARLIER = () => m.home_cohort_and_earlier({ year: year(1402) });
const COHORT_1403_AND_1404 = () => m.home_cohort_pair({ first: year(1403), second: year(1404) });

export const SEMESTER: { name: () => string; sourceHref: string; calendarHref: string; events: CalendarEvent[] } = {
  name: () => m.home_term_name({ years: `${year(1405)}–${year(1406)}` }),
  sourceHref: "https://hut.ac.ir/fa/w/-772",
  calendarHref: "https://hut.ac.ir/web/edu/تقویم-آموزشی",
  events: [
    {
      id: "reg-1402",
      label: m.home_event_registration,
      cohort: COHORT_1402_AND_EARLIER,
      start: [1405, 6, 15],
      milestone: true,
    },
    {
      id: "reg-1403",
      label: m.home_event_registration,
      cohort: () => m.home_cohort({ year: year(1403) }),
      start: [1405, 6, 16],
    },
    {
      id: "reg-1404",
      label: m.home_event_registration,
      cohort: () => m.home_cohort({ year: year(1404) }),
      start: [1405, 6, 17],
    },
    { id: "reg-late", label: m.home_event_late_registration, cohort: m.home_cohort_all, start: [1405, 6, 18] },
    { id: "classes-start", label: m.home_event_classes_start, start: [1405, 6, 28], milestone: true },
    {
      id: "adddrop-1402",
      label: m.home_event_add_drop,
      cohort: COHORT_1402_AND_EARLIER,
      start: [1405, 7, 5],
      milestone: true,
    },
    { id: "adddrop-1403", label: m.home_event_add_drop, cohort: COHORT_1403_AND_1404, start: [1405, 7, 6] },
    { id: "single-drop", label: m.home_event_single_drop, start: [1405, 9, 24], end: [1405, 9, 25], milestone: true },
    { id: "evaluation", label: m.home_event_evaluation, start: [1405, 9, 28], end: [1405, 10, 11], milestone: true },
    {
      id: "prereg-1402",
      label: m.home_event_preregistration,
      cohort: COHORT_1402_AND_EARLIER,
      start: [1405, 9, 29],
    },
    { id: "prereg-1403", label: m.home_event_preregistration, cohort: COHORT_1403_AND_1404, start: [1405, 9, 30] },
    { id: "classes-end", label: m.home_event_classes_end, start: [1405, 10, 15], milestone: true },
    { id: "practical-exams", label: m.home_event_practical_exams, start: [1405, 10, 19], end: [1405, 10, 23] },
    { id: "exams", label: m.home_event_exams, start: [1405, 10, 26], end: [1405, 11, 13], milestone: true },
    { id: "project-deadline", label: m.home_event_project_deadline, start: [1405, 11, 15] },
  ],
};
