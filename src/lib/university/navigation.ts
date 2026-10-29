import { m } from "#/paraglide/messages";

/*===== Navigation =====*/
// The university's site map, as the header and footer show it. Labels are message functions, called in render
// (docs/frontend/i18n.md). Pages this app serves are plain paths; the rest still point at the old site or a unit's own
// subdomain.
// Departments, services and contact details are shared with the home page.

/** A link with its label as a message function. */
export type NavLink = { label: () => string; href: string };

export type NavGroup = { title: () => string; href?: string; links: NavLink[] };

/** A top-level menu section. One with no groups is a plain link; the others open a panel of grouped links. */
export type NavSection = {
  id: string;
  title: () => string;
  summary: () => string;
  href: string;
  groups: NavGroup[];
};

/*------ Departments ------*/

/** The university's list of departments. */
export const DEPARTMENTS_HREF = "/departments";

/** `name` is the department's subject («مهندسی برق»), `short` the word that tells it apart («برق»). */
export type Department = { id: string; name: () => string; short: () => string; href: string; labHref: string };

/** A department's labs page. */
const labsHref = (slug: string) => `/departments/${slug}/labs`;

export const DEPARTMENTS: Department[] = [
  {
    id: "ee",
    name: m.site_dept_ee,
    short: m.site_dept_ee_short,
    href: "/departments/ee",
    labHref: labsHref("ee"),
  },
  {
    id: "ce",
    name: m.site_dept_ce,
    short: m.site_dept_ce_short,
    href: "/departments/ce",
    labHref: labsHref("ce"),
  },
  {
    id: "mech",
    name: m.site_dept_mech,
    short: m.site_dept_mech_short,
    href: "/departments/mech",
    labHref: labsHref("mech"),
  },
  {
    id: "bme",
    name: m.site_dept_bme,
    short: m.site_dept_bme_short,
    href: "/departments/bme",
    labHref: labsHref("bme"),
  },
  {
    id: "materials",
    name: m.site_dept_materials,
    short: m.site_dept_materials_short,
    href: "/departments/materials",
    labHref: labsHref("materials"),
  },
  {
    id: "chem",
    name: m.site_dept_chem,
    short: m.site_dept_chem_short,
    href: "/departments/chem",
    labHref: labsHref("chem"),
  },
  {
    id: "mining",
    name: m.site_dept_mining,
    short: m.site_dept_mining_short,
    href: "/departments/mining",
    labHref: labsHref("mining"),
  },
  {
    id: "bs",
    name: m.site_dept_bs,
    short: m.site_dept_bs_short,
    href: "/departments/bs",
    labHref: labsHref("bs"),
  },
];

/*------ Shared Links ------*/

export const CONTACT_LINK: NavLink = { label: m.nav_contact, href: "/contact" };
const PHONEBOOK_LINK: NavLink = { label: m.nav_about_phonebook, href: "/phonebook" };
const RECRUITMENT_LINK: NavLink = { label: m.nav_about_recruitment, href: "/offices/recruitment" };

/** The university portal's sign-in, in the utility bar. */
export const PORTAL_HREF = "https://hut.ac.ir/c/portal/login?p_l_id=13";

/*------ Main Menu ------*/

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "about",
    title: m.nav_about,
    summary: m.nav_about_summary,
    href: "/about",
    groups: [
      {
        title: m.nav_about_intro,
        links: [
          { label: m.nav_about_university, href: "/about" },
          { label: m.nav_about_faculty, href: DEPARTMENTS_HREF },
          { label: m.nav_about_presidents, href: "/offices/president#office-former" },
          { label: m.nav_about_international, href: "/offices/international" },
        ],
      },
      {
        title: m.nav_about_management,
        links: [
          { label: m.nav_about_president, href: "/offices/president" },
          { label: m.nav_about_vp_education, href: "/offices/vp-education" },
          { label: m.nav_about_vp_student, href: "/offices/vp-student-affairs" },
          { label: m.nav_about_vp_admin, href: "/offices/vp-admin" },
          { label: m.nav_about_trustees, href: "https://omana.basu.ac.ir/" },
        ],
      },
      {
        title: m.nav_about_reach,
        links: [
          CONTACT_LINK,
          PHONEBOOK_LINK,
          { label: m.nav_about_public_relations, href: "/offices/public-relations" },
          { label: m.news_title, href: "/news" },
          RECRUITMENT_LINK,
        ],
      },
    ],
  },
  {
    id: "education",
    title: m.nav_education,
    summary: m.nav_education_summary,
    href: "/education",
    groups: [
      {
        title: m.nav_education_departments,
        href: DEPARTMENTS_HREF,
        links: DEPARTMENTS.map((department) => ({ label: department.name, href: department.href })),
      },
      {
        title: m.nav_education_affairs,
        links: [
          { label: m.nav_education_services, href: "/offices/academic-services" },
          { label: m.nav_education_graduate, href: "/offices/graduate" },
          { label: m.nav_education_admissions, href: "/offices/alumni-affairs" },
          { label: m.nav_education_calendar, href: "/calendar" },
        ],
      },
      {
        title: m.nav_education_open,
        links: [
          { label: m.nav_education_online, href: "/offices/online-learning" },
          { label: m.nav_education_continuing, href: "/offices/continuing-education" },
        ],
      },
    ],
  },
  {
    id: "research",
    title: m.nav_research,
    summary: m.nav_research_summary,
    href: "/research",
    groups: [
      {
        title: m.nav_research_research,
        links: [
          { label: m.nav_research_affairs, href: "/offices/research-affairs" },
          { label: m.nav_research_journal, href: "https://enai.hut.ac.ir/" },
          { label: m.nav_research_press, href: "/offices/press" },
          { label: m.nav_research_library, href: "/offices/library" },
        ],
      },
      {
        title: m.nav_research_technology,
        links: [
          { label: m.nav_research_incubator, href: "/offices/incubator" },
          { label: m.nav_research_industry, href: "/offices/industry" },
          { label: m.nav_research_central_lab, href: "/offices/central-lab" },
          { label: m.nav_research_labs, href: "/research" },
        ],
      },
    ],
  },
  {
    id: "campus-life",
    title: m.nav_campus_life,
    summary: m.nav_campus_life_summary,
    href: "/campus-life",
    groups: [
      {
        title: m.nav_campus_life_welfare,
        links: [
          { label: m.nav_campus_life_welfare_services, href: "/offices/welfare" },
          { label: m.nav_campus_life_dorms, href: "/offices/dorms" },
          { label: m.nav_campus_life_dining, href: "/offices/dining" },
          { label: m.nav_campus_life_sports, href: "/offices/sports" },
        ],
      },
      {
        title: m.nav_campus_life_culture,
        links: [
          { label: m.nav_campus_life_clubs, href: "/offices/clubs" },
          { label: m.nav_campus_life_associations, href: "/offices/associations" },
          { label: m.nav_campus_life_organizations, href: "/offices/organizations" },
          { label: m.nav_campus_life_publications, href: "/publications" },
        ],
      },
      {
        title: m.nav_campus_life_support,
        links: [
          { label: m.nav_campus_life_counseling, href: "/consultation" },
          { label: m.nav_campus_life_discipline, href: "/offices/discipline" },
          { label: m.nav_campus_life_shahed, href: "/offices/shahed" },
        ],
      },
    ],
  },
  {
    id: "systems",
    title: m.nav_systems,
    summary: m.nav_systems_summary,
    href: "/services",
    groups: [],
  },
];

/*------ Footer ------*/

/** The university's suggestions and complaints form. */
export const SUGGESTIONS_LINK: NavLink = { label: m.nav_suggestions, href: "/feedback" };

export const FOOTER_LINKS: NavLink[] = [
  { label: m.nav_sitemap, href: "/sitemap" },
  CONTACT_LINK,
  PHONEBOOK_LINK,
  { label: m.nav_ethics, href: "https://hut.ac.ir/documents/38165/453653/نظامنامه+اخلاق+آموزش.pdf" },
  SUGGESTIONS_LINK,
  { label: m.nav_privacy, href: "/privacy" },
  { label: m.nav_alumni, href: "/alumni" },
  RECRUITMENT_LINK,
];

export const RELATED_SITES: NavLink[] = [
  { label: m.nav_related_msrt, href: "https://www.msrt.ir/fa" },
  { label: m.nav_related_isti, href: "http://isti.ir/" },
  { label: m.nav_related_park, href: "https://hstp.ir/" },
  { label: m.nav_related_elites, href: "https://hamedan.bmn.ir/" },
  { label: m.nav_related_insf, href: "http://insf.org/fa" },
  { label: m.nav_related_governorate, href: "https://www.ostan-hm.ir" },
  { label: m.nav_related_leader, href: "https://www.leader.ir/fa" },
  { label: m.nav_related_president, href: "https://www.president.ir/fa/" },
  { label: m.nav_related_complaints, href: "https://erp.msrt.ir/Dashboard" },
];

export const SOCIAL_LINKS: NavLink[] = [
  { label: m.nav_social_eitaa, href: "https://eitaa.com/info_hut" },
  { label: m.nav_social_linkedin, href: "https://www.linkedin.com/school/hamedan-university-of-technology/" },
  { label: m.nav_social_aparat, href: "https://www.aparat.com/hut.university" },
];

/*------ Contact ------*/

/** Contact details that aren't text: the address, phone and fax wording are `site_*` messages. */
export const CONTACT = {
  email: "info@hut.ac.ir",
  phoneHref: "tel:+988138411000",
  mapHref: "https://balad.ir/embed?p=42j1sJdgp1Qvp6",
};
