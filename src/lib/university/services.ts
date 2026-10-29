import {
  BedDoubleIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ChartColumnIcon,
  ClockIcon,
  CreditCardIcon,
  FileTextIcon,
  GraduationCapIcon,
  HandCoinsIcon,
  LibraryBigIcon,
  type LucideIcon,
  MailIcon,
  MessagesSquareIcon,
  MonitorPlayIcon,
  NotebookPenIcon,
  PresentationIcon,
  ReceiptTextIcon,
  SchoolIcon,
  UserPlusIcon,
  UsersIcon,
  UtensilsIcon,
} from "lucide-react";

import { matchesSearch, searchWords } from "#/lib/persian-text";
import { m } from "#/paraglide/messages";

/*===== Services =====*/
// The university's online systems, grouped by what a student or employee goes there to do. The header's search, the
// footer and the home page's systems rail all read this list. Static until a `service.list` procedure serves it.

export type ServiceGroupId = "education" | "living" | "library" | "support" | "staff";

export type Service = {
  id: string;
  /** Full name, as the university uses it. */
  title: () => string;
  /** Short name for tiles and chips. */
  short: () => string;
  /** What a person does there, in plain words. */
  description: () => string;
  href: string;
  group: ServiceGroupId;
  icon: LucideIcon;
  /** 1 = daily, 2 = weekly, 3 = occasional: how prominently a layout shows it. */
  priority: 1 | 2 | 3;
  /** Extra search terms, in Persian and Latin script. Not shown, so not messages. */
  keywords: string[];
  /** Reachable only from the campus network. */
  internalOnly?: boolean;
};

export const SERVICE_GROUPS: { id: ServiceGroupId; title: () => string; summary: () => string }[] = [
  { id: "education", title: m.service_group_education, summary: m.service_group_education_summary },
  { id: "living", title: m.service_group_living, summary: m.service_group_living_summary },
  { id: "library", title: m.service_group_library, summary: m.service_group_library_summary },
  { id: "support", title: m.service_group_support, summary: m.service_group_support_summary },
  { id: "staff", title: m.service_group_staff, summary: m.service_group_staff_summary },
];

export const SERVICES: Service[] = [
  /*------ Education ------*/
  {
    id: "golestan",
    title: m.service_golestan,
    short: m.service_golestan_short,
    description: m.service_golestan_description,
    href: "https://golestan.hut.ac.ir/",
    group: "education",
    icon: GraduationCapIcon,
    priority: 1,
    keywords: ["golestan", "انتخاب واحد", "نمره", "کارنامه", "ثبت نام", "حذف و اضافه"],
  },
  {
    id: "lms",
    title: m.service_lms,
    short: m.service_lms_short,
    description: m.service_lms_description,
    href: "http://lms.hut.ac.ir/",
    group: "education",
    icon: MonitorPlayIcon,
    priority: 2,
    keywords: ["lms", "adobe connect", "ادوبی", "کلاس آنلاین", "مجازی"],
  },
  {
    id: "courseware",
    title: m.service_courseware,
    short: m.service_courseware_short,
    description: m.service_courseware_description,
    href: "https://ec.hut.ac.ir/",
    group: "education",
    icon: NotebookPenIcon,
    priority: 1,
    keywords: ["ec", "courseware", "تمرین", "تکلیف", "جزوه"],
  },
  {
    id: "open-ed",
    title: m.service_open_ed,
    short: m.service_open_ed_short,
    description: m.service_open_ed_description,
    href: "https://academics.hut.ac.ir/",
    group: "education",
    icon: SchoolIcon,
    priority: 3,
    keywords: ["academics", "دوره", "کارگاه", "آموزش آزاد"],
  },
  {
    id: "new-students",
    title: m.service_new_students,
    short: m.service_new_students_short,
    description: m.service_new_students_description,
    href: "/new-students",
    group: "education",
    icon: UserPlusIcon,
    priority: 3,
    keywords: ["ورودی جدید", "ثبت نام", "نودانشجو"],
  },

  /*------ Living ------*/
  {
    id: "nutrition",
    title: m.service_nutrition,
    short: m.service_nutrition_short,
    description: m.service_nutrition_description,
    href: "http://nutrition.hut.ac.ir/",
    group: "living",
    icon: UtensilsIcon,
    priority: 1,
    keywords: ["nutrition", "غذا", "سلف", "ژتون", "رزرو"],
  },
  {
    id: "welfare-fund",
    title: m.service_welfare_fund,
    short: m.service_welfare_fund_short,
    description: m.service_welfare_fund_description,
    href: "https://swf.ir/",
    group: "living",
    icon: HandCoinsIcon,
    priority: 2,
    keywords: ["swf", "وام", "شهریه", "رفاه"],
  },
  {
    id: "dorm",
    title: m.service_dorm,
    short: m.service_dorm_short,
    description: m.service_dorm_description,
    href: "/offices/dorms",
    group: "living",
    icon: BedDoubleIcon,
    priority: 2,
    keywords: ["خوابگاه", "اسکان", "dorm"],
  },
  {
    id: "welfare",
    title: m.service_welfare,
    short: m.service_welfare_short,
    description: m.service_welfare_description,
    href: "/offices/welfare",
    group: "living",
    icon: CreditCardIcon,
    priority: 3,
    keywords: ["رفاهی", "بیمه"],
  },

  /*------ Library ------*/
  {
    id: "elibrary",
    title: m.service_elibrary,
    short: m.service_elibrary_short,
    description: m.service_elibrary_description,
    href: "http://elibrary.hut.ac.ir/diglibguest/WebUI/Index.aspx",
    group: "library",
    icon: LibraryBigIcon,
    priority: 2,
    keywords: ["elibrary", "کتابخانه", "پایان نامه", "منابع"],
  },
  {
    id: "book-renew",
    title: m.service_book_renew,
    short: m.service_book_renew_short,
    description: m.service_book_renew_description,
    href: "http://simorgh.hut.ac.ir/simwebclt/WebAccess/SimWebPortal.dll/CircPage",
    group: "library",
    icon: BookOpenIcon,
    priority: 3,
    keywords: ["simorgh", "سیمرغ", "تمدید", "رزرو کتاب", "امانت"],
  },

  /*------ Support ------*/
  {
    id: "counseling",
    title: m.service_counseling,
    short: m.service_counseling_short,
    description: m.service_counseling_description,
    href: "/consultation",
    group: "support",
    icon: MessagesSquareIcon,
    priority: 2,
    keywords: ["مشاوره", "مشاوره آنلاین", "counseling", "روانشناس"],
  },
  {
    id: "student-affairs",
    title: m.service_student_affairs,
    short: m.service_student_affairs_short,
    description: m.service_student_affairs_description,
    href: "/offices/vp-student-affairs",
    group: "support",
    icon: UsersIcon,
    priority: 3,
    keywords: ["کانون", "انجمن علمی", "تشکل", "فرهنگی"],
  },
  {
    id: "forms",
    title: m.service_forms,
    short: m.service_forms_short,
    description: m.service_forms_description,
    href: "/forms",
    group: "support",
    icon: FileTextIcon,
    priority: 2,
    keywords: ["فرم", "آیین نامه", "پایان نامه", "مقررات"],
  },
  {
    id: "payment",
    title: m.service_payment,
    short: m.service_payment_short,
    description: m.service_payment_description,
    href: "/payments",
    group: "support",
    icon: CreditCardIcon,
    priority: 3,
    keywords: ["پرداخت", "شهریه", "payment"],
  },

  /*------ Staff and Faculty ------*/
  {
    id: "eoffice",
    title: m.service_eoffice,
    short: m.service_eoffice_short,
    description: m.service_eoffice_description,
    href: "https://eoffice.hut.ac.ir/",
    group: "staff",
    icon: BriefcaseIcon,
    priority: 1,
    keywords: ["eoffice", "اتوماسیون", "نامه"],
  },
  {
    id: "mail",
    title: m.service_mail,
    short: m.service_mail_short,
    description: m.service_mail_description,
    href: "http://mail.hut.ac.ir/",
    group: "staff",
    icon: MailIcon,
    priority: 1,
    keywords: ["mail", "email", "ایمیل"],
  },
  {
    id: "faculty-portal",
    title: m.service_faculty_portal,
    short: m.service_faculty_portal_short,
    description: m.service_faculty_portal_description,
    // The old link only ever opened the list of departments; each department page lists its faculty.
    href: "/departments",
    group: "staff",
    icon: PresentationIcon,
    priority: 2,
    keywords: ["استاد", "هیئت علمی", "faculty"],
  },
  {
    id: "attendance",
    title: m.service_attendance,
    short: m.service_attendance_short,
    description: m.service_attendance_description,
    href: "http://kasra.hut.ac.ir/Lego.Web/Kevlar/Account/Login",
    group: "staff",
    icon: ClockIcon,
    priority: 2,
    keywords: ["kasra", "کسرا", "حضور"],
  },
  {
    id: "evaluation",
    title: m.service_evaluation,
    short: m.service_evaluation_short,
    description: m.service_evaluation_description,
    href: "http://arzyabi.hut.ac.ir/",
    group: "staff",
    icon: ChartColumnIcon,
    priority: 3,
    keywords: ["ارزیابی", "arzyabi"],
  },
  {
    id: "staff-training",
    title: m.service_staff_training,
    short: m.service_staff_training_short,
    description: m.service_staff_training_description,
    href: "http://ste.hut.ac.ir/",
    group: "staff",
    icon: SchoolIcon,
    priority: 3,
    keywords: ["ضمن خدمت", "ste"],
  },
  {
    id: "payslip",
    title: m.service_payslip,
    short: m.service_payslip_short,
    description: m.service_payslip_description,
    href: "http://192.168.3.230:88/auth/login",
    group: "staff",
    icon: ReceiptTextIcon,
    priority: 2,
    keywords: ["فیش", "حقوق"],
    internalOnly: true,
  },
];

export const STUDENT_SERVICES = SERVICES.filter((service) => service.group !== "staff");
export const STAFF_SERVICES = SERVICES.filter((service) => service.group === "staff");

/** The student systems used daily or weekly, daily ones first: the home rail and the footer list these. */
export const TOP_SERVICES = STUDENT_SERVICES.filter((service) => service.priority <= 2).toSorted(
  (a, b) => a.priority - b.priority,
);

/*===== Search =====*/

/**
 * The services whose names, description or keywords contain every word of `query`, in list order. An empty query
 * returns the whole list. Call it in render: it reads the current locale's messages.
 */
export function searchServices(query: string, services: Service[] = SERVICES): Service[] {
  const words = searchWords(query);
  return services.filter((service) =>
    matchesSearch(words, [service.title(), service.short(), service.description(), ...service.keywords]),
  );
}
