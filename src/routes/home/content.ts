import { BookMarkedIcon, FlaskConicalIcon, FactoryIcon, type LucideIcon, SproutIcon } from "lucide-react";

import { formatNumber } from "#/lib/locale";
import { m } from "#/paraglide/messages";
import type { CalendarEvent } from "./semester";

/*===== Home Content =====*/
// What the home page shows until the features behind it exist. Text is message functions, called in render; each
// block names the procedure that will replace it. Images are in public/images/home/.

/*------ Categories ------*/

export type NewsCategory = "university" | "education" | "graduate" | "student" | "growth" | "openEducation";

export const NEWS_CATEGORIES: Record<NewsCategory, { title: () => string; moreHref: string }> = {
  university: { title: m.home_category_university, moreHref: "https://hut.ac.ir/web/hut/اخبار" },
  education: { title: m.home_category_education, moreHref: "https://hut.ac.ir/web/hut/اطلاعیه-ها" },
  graduate: { title: m.home_category_graduate, moreHref: "https://hut.ac.ir/web/hut/اطلاعیه-ها" },
  student: { title: m.home_category_student, moreHref: "https://student.hut.ac.ir/" },
  growth: { title: m.home_category_growth, moreHref: "https://hut.ac.ir/web/roshd" },
  openEducation: {
    title: m.home_category_open_education,
    moreHref: "https://hut.ac.ir/web/hut/کارگاه-ها-و-دوره-های-اموزشی",
  },
};

export type NewsItem = {
  id: string;
  title: () => string;
  summary?: () => string;
  /** Publication date, ISO (Gregorian). */
  date?: string;
  /** The item's own page; without one it links to its category's list. */
  href?: string;
  image?: string;
  category: NewsCategory;
};

/** Where an item links: its own page, or its category's list. */
export function newsHref(item: NewsItem): string {
  return item.href ?? NEWS_CATEGORIES[item.category].moreHref;
}

/*------ News ------*/
// Replaced by a `news.list` procedure (the latest university stories with photos).

export const FEATURED_STORY: NewsItem = {
  id: "elites-council",
  title: m.home_news_elites,
  summary: m.home_news_elites_summary,
  date: "2026-10-11",
  image: "/images/home/news-president-elites.jpg",
  category: "university",
};

export const STORIES: NewsItem[] = [
  {
    id: "crisis-day",
    title: m.home_news_crisis_day,
    date: "2026-10-12",
    image: "/images/home/news-crisis-day.jpg",
    category: "university",
  },
  {
    id: "ee-head",
    title: m.home_news_ee_head,
    date: "2026-10-07",
    image: "/images/home/news-ee-head.jpg",
    category: "university",
  },
];

/*------ Notices ------*/
// Replaced by a `notice.list` procedure, newest first, per category.

export const NOTICES: { category: NewsCategory; items: NewsItem[] }[] = [
  {
    category: "education",
    items: [
      {
        id: "a-19057678",
        title: m.home_notice_project_titles,
        date: "2026-10-04",
        href: "https://hut.ac.ir/article/19057678",
        category: "education",
      },
      {
        id: "a-19057712",
        title: m.home_notice_supervised_study,
        date: "2026-10-04",
        href: "https://hut.ac.ir/article/19057712",
        category: "education",
      },
      {
        id: "a-19042273",
        title: m.home_notice_pe_classes,
        date: "2026-09-29",
        href: "https://hut.ac.ir/article/19042273",
        category: "education",
      },
      {
        id: "a-19039509",
        title: m.home_notice_add_drop,
        date: "2026-09-26",
        href: "https://hut.ac.ir/article/19039509",
        category: "education",
      },
      {
        id: "a-18985527",
        title: m.home_notice_registration,
        date: "2026-09-05",
        href: "https://hut.ac.ir/article/18985527",
        category: "education",
      },
    ],
  },
  {
    category: "graduate",
    items: [
      {
        id: "a-19057912",
        title: m.home_notice_defences,
        date: "2026-10-04",
        href: "https://hut.ac.ir/article/19057912",
        category: "graduate",
      },
      {
        id: "a-18989220",
        title: m.home_notice_top_quota,
        date: "2026-09-08",
        href: "https://hut.ac.ir/article/18989220",
        category: "graduate",
      },
      {
        id: "a-18986145",
        title: m.home_notice_mining_seminar,
        date: "2026-09-06",
        href: "https://hut.ac.ir/article/18986145",
        category: "graduate",
      },
      {
        id: "a-18986550",
        title: m.home_notice_thesis_deadline,
        date: "2026-09-06",
        href: "https://hut.ac.ir/article/18986550",
        category: "graduate",
      },
      {
        id: "a-18953187",
        title: m.home_notice_phd_registration,
        date: "2026-08-24",
        href: "https://hut.ac.ir/article/18953187",
        category: "graduate",
      },
    ],
  },
  {
    category: "student",
    items: [
      {
        id: "a-18904770",
        title: m.home_notice_wellbeing,
        date: "2026-08-02",
        href: "https://hut.ac.ir/article/18904770",
        category: "student",
      },
      {
        id: "a-18609450",
        title: m.home_notice_loans,
        date: "2026-04-14",
        href: "https://hut.ac.ir/article/18609450",
        category: "student",
      },
      {
        id: "a-16686617",
        title: m.home_notice_loan_registration,
        date: "2025-12-07",
        href: "https://hut.ac.ir/article/16686617",
        category: "student",
      },
      {
        id: "a-6133335",
        title: m.home_notice_exam_housing,
        date: "2025-08-19",
        href: "https://hut.ac.ir/article/6133335",
        category: "student",
      },
    ],
  },
];

/*------ Glance ------*/
// The figures are maintained by hand; the spotlight becomes the newest campus-life notice from `notice.list`.

export const STATS: { value: number; label: () => string }[] = [
  { value: 2300, label: m.home_stat_students },
  { value: 400, label: m.home_stat_masters },
  { value: 115, label: m.home_stat_faculty },
  { value: 2400, label: m.home_stat_papers },
  { value: 2200, label: m.home_stat_alumni },
  { value: 75, label: m.home_stat_staff },
];

export const SPOTLIGHT: NewsItem = {
  id: "graduation-1405",
  title: m.home_spotlight_graduation,
  date: "2026-10-05",
  href: "https://hut.ac.ir/fa/w/اطلاعیه-شماره-۱-🎓-مراسم-آیین-دانش-آموختگی-سال-1405-دا",
  image: "/images/home/ann-graduation-1405.jpg",
  category: "student",
};

export const DEPARTMENTS_HREF = "https://hut.ac.ir/groups";

/*------ Achievements ------*/
// Replaced by an `achievement.list` procedure.

export type Achievement = NewsItem & { tag: () => string };

export const LEAD_ACHIEVEMENT: Achievement = {
  id: "ach-journal",
  title: m.home_achievement_journal,
  summary: m.home_achievement_journal_summary,
  image: "/images/home/ach-journal.jpg",
  href: "https://enai.hut.ac.ir/",
  category: "university",
  tag: m.home_tag_research,
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-sports",
    title: m.home_achievement_sports,
    summary: m.home_achievement_sports_summary,
    image: "/images/home/ach-sports.jpg",
    category: "university",
    tag: m.home_tag_students,
  },
  {
    id: "ach-smart-city",
    title: m.home_achievement_smart_city,
    image: "/images/home/ach-smart-city.png",
    category: "university",
    tag: m.home_tag_city,
  },
];

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

/*------ Learning ------*/
// Replaced by an `event.list` procedure (the incubator's events and the short courses).

export const LEARNING_ITEMS: NewsItem[] = [
  {
    id: "g-200s",
    title: m.home_learning_200s,
    summary: m.home_learning_200s_summary,
    image: "/images/home/growth-200s.jpg",
    href: "https://hut.ac.ir/web/roshd",
    category: "growth",
  },
  {
    id: "g-career",
    title: m.home_learning_career,
    summary: m.home_learning_career_summary,
    image: "/images/home/growth-career.jpg",
    href: "https://hut.ac.ir/web/roshd",
    category: "growth",
  },
  {
    id: "a-9505501",
    title: m.home_learning_knowledge_based,
    summary: m.home_learning_knowledge_based_summary,
    date: "2025-11-09",
    href: "https://hut.ac.ir/article/9505501",
    category: "openEducation",
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
