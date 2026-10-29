import { createFileRoute } from "@tanstack/react-router";
import { SITE_ORIGIN } from "#/lib/site.server";
import {
  CALENDAR_RULES,
  type CalendarEvent,
  type Cohort,
  cohortName,
  COHORTS,
  fromJalali,
  isForCohort,
  type JDate,
  SEMESTER,
} from "#/lib/university/semester";
import { m } from "#/paraglide/messages";
import { localizeHref } from "#/paraglide/runtime";

/*===== iCalendar =====*/
// RFC 5545, as calendar apps import it: CRLF line ends, text values escaped, and lines folded at 75 octets.

/** A Jalali date as an iCalendar DATE (`20260906`). */
function icsDate(date: JDate, addDays = 0): string {
  const day = fromJalali(date);
  day.setUTCDate(day.getUTCDate() + addDays);
  return day.toISOString().slice(0, 10).replaceAll("-", "");
}

/** Escapes a TEXT value: backslashes, commas, semicolons and line breaks. */
function icsText(value: string): string {
  return value.replace(/[\\,;]/g, (char) => `\\${char}`).replace(/\r?\n/g, "\\n");
}

/** Folds a content line into lines of at most 75 octets, never splitting a character's UTF-8 bytes. */
function fold(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  let size = 0;
  for (const char of line) {
    const bytes = encoder.encode(char).length;
    // Continuation lines begin with a space, which counts toward their 75.
    if (size + bytes > (parts.length === 0 ? 75 : 74)) {
      parts.push(current);
      current = "";
      size = 0;
    }
    current += char;
    size += bytes;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

/** One date as an all-day event: the end is the day after its last day, as all-day events count it. */
function icsEvent({ event, stamp, url }: { event: CalendarEvent; stamp: string; url: string }): string[] {
  const summary = event.cohort
    ? m.calendar_event_cohort({ event: event.label(), cohort: event.cohort() })
    : event.label();
  const rule = CALENDAR_RULES.find((candidate) => candidate.id === event.rule);
  return [
    "BEGIN:VEVENT",
    `UID:${event.id}-${SEMESTER.code}@hut.ac.ir`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${icsDate(event.start)}`,
    `DTEND;VALUE=DATE:${icsDate(event.end ?? event.start, 1)}`,
    `SUMMARY:${icsText(summary)}`,
    ...(rule ? [`DESCRIPTION:${icsText(rule.text())}`] : []),
    `URL:${url}`,
    "TRANSP:TRANSPARENT",
    "END:VEVENT",
  ];
}

/*===== calendar.ics =====*/
/**
 * `GET /calendar.ics` (`/en/calendar.ics` in English): this semester's dates for a calendar app, in the page's
 * language. `?cohort=1403` keeps only the dates for that entry year and the ones for everyone, as the page's filter
 * does; any other value gives every date.
 */
function handleGet({ request }: { request: Request }) {
  const param = new URL(request.url).searchParams.get("cohort");
  const cohort: Cohort | "all" = COHORTS.find((candidate) => candidate === param) ?? "all";

  // The year in the calendar's name, so it still says whose dates these are in the reader's calendar app.
  const calendarName =
    cohort === "all"
      ? m.calendar_ics_name({ term: SEMESTER.name() })
      : m.calendar_ics_name_cohort({ cohort: cohortName(cohort), term: SEMESTER.name() });
  const stamp = `${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`;
  const url = `${SITE_ORIGIN}${localizeHref("/calendar")}`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hamedan University of Technology//Academic calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${icsText(calendarName)}`,
    "X-WR-TIMEZONE:Asia/Tehran",
    ...SEMESTER.events
      .filter((event) => isForCohort({ event, cohort }))
      .flatMap((event) => icsEvent({ event, stamp, url })),
    "END:VCALENDAR",
  ];

  return new Response(`${lines.map(fold).join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="hut-calendar-${SEMESTER.code}${cohort === "all" ? "" : `-${cohort}`}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

/*===== Route =====*/
export const Route = createFileRoute("/calendar.ics")({
  server: { handlers: { GET: handleGet } },
});
