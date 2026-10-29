import {
  AwardIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  FileSearchIcon,
  GlobeIcon,
  GraduationCapIcon,
  ListIcon,
  type LucideIcon,
  MessageSquareTextIcon,
  MonitorPlayIcon,
  NotebookPenIcon,
  ScaleIcon,
  ScanSearchIcon,
} from "lucide-react";

import type { OfficeLinkIcon, OfficeSection } from "#/orpc/office/constants";
import { m } from "#/paraglide/messages";

/*===== Labels =====*/

/** The menu section an office sits under, for its breadcrumb. */
export const SECTION_CRUMBS: Record<OfficeSection, { label: () => string; href: string }> = {
  about: { label: m.nav_about, href: "/about" },
  education: { label: m.nav_education, href: "/education" },
  research: { label: m.nav_research, href: "/research" },
  "campus-life": { label: m.nav_campus_life, href: "/campus-life" },
};

export const LINK_ICONS: Record<OfficeLinkIcon, LucideIcon> = {
  system: GraduationCapIcon,
  classroom: MonitorPlayIcon,
  courseware: NotebookPenIcon,
  thesis: FileSearchIcon,
  plagiarism: ScanSearchIcon,
  certificate: AwardIcon,
  regulations: ScaleIcon,
  guide: BookOpenIcon,
  calendar: CalendarDaysIcon,
  list: ListIcon,
  contact: MessageSquareTextIcon,
  website: GlobeIcon,
};
