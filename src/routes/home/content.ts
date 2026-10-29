import { BookMarkedIcon, FlaskConicalIcon, FactoryIcon, type LucideIcon, SproutIcon } from "lucide-react";

import { m } from "#/paraglide/messages";

/*===== Home Content =====*/
// What the home page shows beside the feed. The news, notices, achievements and events come from `homeFeed.get`
// (src/orpc/home-feed/), which mirrors hut.ac.ir's homepage until the cutover. Text is message functions, called in
// render. Images are in public/images/home/.

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
