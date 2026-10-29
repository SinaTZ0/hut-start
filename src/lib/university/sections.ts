import type { FeedCategory } from "#/orpc/home-feed/constants";
import { m } from "#/paraglide/messages";

/*===== Section Pages =====*/
// The main menu's four sections as pages of their own (`/about`, `/education`, `/research`, `/campus-life`). The
// old site's pages for them were empty; each is now its menu section (`NAV_SECTIONS`) laid out as a page, led by what
// most visitors come for, with the section's latest notices beside its links.

export type SectionId = "about" | "education" | "research" | "campus-life";

export type SectionPage = {
  id: SectionId;
  lede: () => string;
  /** What leads the page: the departments, their labs, or the section's first link group as cards. */
  lead: "departments" | "labs" | "first-group";
  /** Whose notices the page lists, newest first. `news` is the university's news, not a notice category. */
  feed: (FeedCategory | "news")[];
  /** The archive, filtered to the same notices. */
  archiveHref: string;
  /** Shows the semester's next dates beside the notices. */
  semester?: boolean;
};

export const SECTION_PAGES: Record<SectionId, SectionPage> = {
  about: {
    id: "about",
    lede: m.section_about_lede,
    lead: "first-group",
    feed: ["news"],
    archiveHref: "/news?kind=news",
  },
  education: {
    id: "education",
    lede: m.section_education_lede,
    lead: "departments",
    feed: ["education", "graduate", "openEducation"],
    archiveHref: "/news?kind=notice",
    semester: true,
  },
  research: {
    id: "research",
    lede: m.section_research_lede,
    lead: "labs",
    feed: ["industry", "growth"],
    archiveHref: "/news?category=industry",
  },
  "campus-life": {
    id: "campus-life",
    lede: m.section_campus_life_lede,
    lead: "first-group",
    feed: ["student"],
    archiveHref: "/news?category=student",
  },
};
