import { m } from "#/paraglide/messages";

/*===== Navigation =====*/
// The university's site map, as the header and footer show it. Labels are message functions, called in render
// (docs/frontend/i18n.md). Links point at the university's current pages until this app serves them itself.
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

export type Department = { id: string; name: () => string; href: string; labHref: string };

export const DEPARTMENTS: Department[] = [
  { id: "ee", name: m.site_dept_ee, href: "http://ee.hut.ac.ir/", labHref: "https://hut.ac.ir/آزمایشگاه-مهندسی-برق" },
  {
    id: "ce",
    name: m.site_dept_ce,
    href: "http://ce.hut.ac.ir/",
    labHref: "https://hut.ac.ir/آزمایشگاه-مهندسی-کامپیوتر",
  },
  {
    id: "mech",
    name: m.site_dept_mech,
    href: "http://mech.hut.ac.ir/",
    labHref: "https://hut.ac.ir/آزمایشگاه-مهندسی-مکانیک",
  },
  {
    id: "bme",
    name: m.site_dept_bme,
    href: "http://bme.hut.ac.ir/",
    labHref: "https://hut.ac.ir/آزمایشگاه-مهندسی-پزشکی",
  },
  {
    id: "materials",
    name: m.site_dept_materials,
    href: "http://materials.hut.ac.ir/",
    labHref: "https://hut.ac.ir/آزمایشگاه-مهندسی-مواد",
  },
  {
    id: "chem",
    name: m.site_dept_chem,
    href: "http://chemeng.hut.ac.ir/",
    labHref: "https://hut.ac.ir/آزمایشگاه-مهندسی-شیمی",
  },
  {
    id: "mining",
    name: m.site_dept_mining,
    href: "http://me.hut.ac.ir/",
    labHref: "https://hut.ac.ir/آزمایشگاه-مهندسی-معدن",
  },
  { id: "bs", name: m.site_dept_bs, href: "http://bs.hut.ac.ir/", labHref: "https://hut.ac.ir/آزمایشگاه-علوم-پایه" },
];

/*------ Shared Links ------*/

export const CONTACT_LINK: NavLink = { label: m.nav_contact, href: "https://hut.ac.ir/ارتباط-با-ما" };
const PHONEBOOK_LINK: NavLink = { label: m.nav_about_phonebook, href: "https://hut.ac.ir/تلفن-داخلی" };
const RECRUITMENT_LINK: NavLink = { label: m.nav_about_recruitment, href: "http://jazb.hut.ac.ir/" };

/** The university portal's sign-in, in the utility bar. */
export const PORTAL_HREF = "https://hut.ac.ir/c/portal/login?p_l_id=13";

/*------ Main Menu ------*/

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "about",
    title: m.nav_about,
    summary: m.nav_about_summary,
    href: "https://hut.ac.ir/معرفی-دانشگاه",
    groups: [
      {
        title: m.nav_about_intro,
        links: [
          { label: m.nav_about_university, href: "https://hut.ac.ir/معرفی-دانشگاه" },
          { label: m.nav_about_faculty, href: "https://hut.ac.ir/اعضای-هیات-علمی" },
          { label: m.nav_about_presidents, href: "https://hut.ac.ir/روسای-پیشین-دانشگاه" },
          { label: m.nav_about_international, href: "https://hut.ac.ir/اداره-همکاری-های-علمی-بین-المللی" },
        ],
      },
      {
        title: m.nav_about_management,
        links: [
          { label: m.nav_about_president, href: "https://hut.ac.ir/رئیس-دانشگاه1" },
          { label: m.nav_about_vp_education, href: "https://edu.hut.ac.ir/" },
          { label: m.nav_about_vp_student, href: "https://student.hut.ac.ir/" },
          { label: m.nav_about_vp_admin, href: "https://daf.hut.ac.ir/" },
          { label: m.nav_about_trustees, href: "https://omana.basu.ac.ir/" },
        ],
      },
      {
        title: m.nav_about_reach,
        links: [
          CONTACT_LINK,
          PHONEBOOK_LINK,
          { label: m.nav_about_public_relations, href: "https://hut.ac.ir/روابط-عمومی" },
          RECRUITMENT_LINK,
        ],
      },
    ],
  },
  {
    id: "education",
    title: m.nav_education,
    summary: m.nav_education_summary,
    href: "https://hut.ac.ir/اموزش",
    groups: [
      {
        title: m.nav_education_departments,
        href: "https://hut.ac.ir/groups",
        links: DEPARTMENTS.map((department) => ({ label: department.name, href: department.href })),
      },
      {
        title: m.nav_education_affairs,
        links: [
          { label: m.nav_education_services, href: "http://web.hut.ac.ir/web/edu/مدیریت-خدمات-آموزشی" },
          { label: m.nav_education_graduate, href: "http://web.hut.ac.ir/web/edu/اداره-تحصیلات-تکمیلی2" },
          { label: m.nav_education_admissions, href: "http://web.hut.ac.ir/web/edu/اداره-دانش-آموختگان" },
          { label: m.nav_education_calendar, href: "https://hut.ac.ir/web/edu/تقویم-آموزشی" },
        ],
      },
      {
        title: m.nav_education_open,
        links: [
          { label: m.nav_education_online, href: "https://hut.ac.ir/آموزش-مجازی" },
          { label: m.nav_education_continuing, href: "https://hut.ac.ir/fa/آموزش-آزاد" },
        ],
      },
    ],
  },
  {
    id: "research",
    title: m.nav_research,
    summary: m.nav_research_summary,
    href: "https://hut.ac.ir/پژوهش",
    groups: [
      {
        title: m.nav_research_research,
        links: [
          { label: m.nav_research_affairs, href: "https://edu.hut.ac.ir/مدیریت-پژوهشی" },
          { label: m.nav_research_journal, href: "https://enai.hut.ac.ir/" },
          { label: m.nav_research_press, href: "http://press.hut.ac.ir/" },
          { label: m.nav_research_library, href: "http://library.hut.ac.ir/" },
        ],
      },
      {
        title: m.nav_research_technology,
        links: [
          { label: m.nav_research_incubator, href: "https://hut.ac.ir/web/roshd" },
          { label: m.nav_research_industry, href: "http://industry.hut.ac.ir/" },
          { label: m.nav_research_central_lab, href: "http://lab.hut.ac.ir/" },
          { label: m.nav_research_labs, href: "https://hut.ac.ir/آزمایشگاه" },
        ],
      },
    ],
  },
  {
    id: "campus-life",
    title: m.nav_campus_life,
    summary: m.nav_campus_life_summary,
    href: "https://hut.ac.ir/دانشجویی-فرهنگی",
    groups: [
      {
        title: m.nav_campus_life_welfare,
        links: [
          { label: m.nav_campus_life_welfare_services, href: "https://student.hut.ac.ir/خدمات-رفاهی-دانشجویی" },
          { label: m.nav_campus_life_dorms, href: "https://student.hut.ac.ir/اداره-خوابگاه-ها" },
          { label: m.nav_campus_life_dining, href: "https://student.hut.ac.ir/اداره-تغذیه" },
          { label: m.nav_campus_life_sports, href: "http://web.hut.ac.ir/web/student/اداره-تربیت-بدنی" },
        ],
      },
      {
        title: m.nav_campus_life_culture,
        links: [
          { label: m.nav_campus_life_clubs, href: "https://student.hut.ac.ir/کانون-های-فرهنگی" },
          { label: m.nav_campus_life_associations, href: "https://student.hut.ac.ir/انجمن-های-علمی-صنعتی" },
          { label: m.nav_campus_life_organizations, href: "https://student.hut.ac.ir/tashakol" },
          { label: m.nav_campus_life_publications, href: "https://hut.ac.ir/پایگاه-نشریات-دانشجویی" },
        ],
      },
      {
        title: m.nav_campus_life_support,
        links: [
          { label: m.nav_campus_life_counseling, href: "http://counseling.hut.ac.ir/" },
          { label: m.nav_campus_life_discipline, href: "https://student.hut.ac.ir/شورای-انضباطی" },
          { label: m.nav_campus_life_shahed, href: "https://hut.ac.ir/امور-دانشجویان-شاهد-و-ایثارگر" },
        ],
      },
    ],
  },
  {
    id: "systems",
    title: m.nav_systems,
    summary: m.nav_systems_summary,
    href: "https://hut.ac.ir/سامانه-ها",
    groups: [],
  },
];

/*------ Footer ------*/

export const FOOTER_LINKS: NavLink[] = [
  { label: m.nav_sitemap, href: "https://hut.ac.ir/fa/نقشه-سایت" },
  CONTACT_LINK,
  PHONEBOOK_LINK,
  { label: m.nav_ethics, href: "https://hut.ac.ir/documents/38165/453653/نظامنامه+اخلاق+آموزش.pdf" },
  { label: m.nav_suggestions, href: "https://hut.ac.ir/فرم نظرات پیشنهادات" },
  { label: m.nav_alumni, href: "https://hut.ac.ir/web/دانش-آموختگان" },
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
