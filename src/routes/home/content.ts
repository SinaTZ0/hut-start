import { BookMarkedIcon, FlaskConicalIcon, FactoryIcon, type LucideIcon, SproutIcon } from "lucide-react";

import { formatNumber } from "#/lib/locale";
import type { FeedCategory } from "#/orpc/home-feed/constants";
import { m } from "#/paraglide/messages";
import type { CalendarEvent } from "./semester";

/*===== Home Content =====*/
// What the home page shows beside the feed. The news, notices, achievements and events come from `homeFeed.get`
// (src/orpc/home-feed/), which mirrors hut.ac.ir's homepage until the cutover. Text is message functions, called in
// render. Images are in public/images/home/.

/*------ Categories ------*/
// A feed item's kicker, and where the old site lists the rest of its kind.

export const NEWS_CATEGORIES: Record<FeedCategory, { title: () => string; moreHref: string }> = {
  university: { title: m.home_category_university, moreHref: "https://hut.ac.ir/web/hut/اخبار" },
  education: { title: m.home_category_education, moreHref: "https://hut.ac.ir/web/hut/اطلاعیه-ها" },
  graduate: { title: m.home_category_graduate, moreHref: "https://hut.ac.ir/web/hut/اطلاعیه-ها" },
  industry: { title: m.home_category_industry, moreHref: "https://hut.ac.ir/web/hut/اطلاعیه-ها" },
  student: { title: m.home_category_student, moreHref: "https://student.hut.ac.ir/" },
  growth: { title: m.home_category_growth, moreHref: "https://hut.ac.ir/web/roshd" },
  openEducation: {
    title: m.home_category_open_education,
    moreHref: "https://hut.ac.ir/web/hut/کارگاه-ها-و-دوره-های-اموزشی",
  },
};

/** Every notice, whatever its category. */
export const ALL_NOTICES_HREF = "https://hut.ac.ir/web/hut/اطلاعیه-ها";

/*------ Glance ------*/
// Maintained by hand. The spotlight beside them is the newest campus-life notice from the feed.

export const STATS: { value: number; label: () => string }[] = [
  { value: 2300, label: m.home_stat_students },
  { value: 400, label: m.home_stat_masters },
  { value: 115, label: m.home_stat_faculty },
  { value: 2400, label: m.home_stat_papers },
  { value: 2200, label: m.home_stat_alumni },
  { value: 75, label: m.home_stat_staff },
];

/*------ Research Units ------*/

export const RESEARCH_UNITS: { label: () => string; description: () => string; href: string; icon: LucideIcon }[] = [
  {
    label: m.nav_research_journal,
    description: m.home_unit_journal,
    href: "https://enai.hut.ac.ir/",
    icon: BookMarkedIcon,
  },
  {
    label: m.nav_research_incubator,
    description: m.home_unit_incubator,
    href: "https://hut.ac.ir/web/roshd",
    icon: SproutIcon,
  },
  {
    label: m.nav_research_industry,
    description: m.home_unit_industry,
    href: "http://industry.hut.ac.ir/",
    icon: FactoryIcon,
  },
  {
    label: m.nav_research_central_lab,
    description: m.home_unit_lab,
    href: "http://lab.hut.ac.ir/",
    icon: FlaskConicalIcon,
  },
];

/*------ Semester ------*/
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
