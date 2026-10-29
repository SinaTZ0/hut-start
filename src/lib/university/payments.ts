import {
  BedDoubleIcon,
  BookOpenIcon,
  CoinsIcon,
  DumbbellIcon,
  FileSearchIcon,
  FlaskConicalIcon,
  KeyRoundIcon,
  LibraryBigIcon,
  type LucideIcon,
  PartyPopperIcon,
  RecycleIcon,
  SparklesIcon,
} from "lucide-react";

import { m } from "#/paraglide/messages";

/*===== Payments =====*/
// The university's payment gateways: each one is a payment ID for one kind of income, run by the office that collects
// it. The gateways stay on the old portal (and edu.hut.ac.ir) until the finance office moves them; this page only
// helps a person pick the right one. Static, like `services.ts`.

export type PaymentGroupId = "students" | "others";

export type Payment = {
  id: string;
  title: () => string;
  description: () => string;
  href: string;
  group: PaymentGroupId;
  icon: LucideIcon;
  /** Extra search terms. Not shown, so not messages. */
  keywords: string[];
};

export const PAYMENT_GROUPS: { id: PaymentGroupId; title: () => string; summary: () => string }[] = [
  { id: "students", title: m.payment_group_students, summary: m.payment_group_students_summary },
  { id: "others", title: m.payment_group_others, summary: m.payment_group_others_summary },
];

export const PAYMENTS: Payment[] = [
  /*------ Students ------*/
  {
    id: "dorm",
    title: m.payment_dorm,
    description: m.payment_dorm_description,
    href: "https://hut.ac.ir/web/refahi/هزینه-اقامت-خوابگاه",
    group: "students",
    icon: BedDoubleIcon,
    keywords: ["خوابگاه", "اسکان", "dorm"],
  },
  {
    id: "library",
    title: m.payment_library,
    description: m.payment_library_description,
    href: "https://hut.ac.ir/web/library/پرداخت-آنلاین",
    group: "students",
    icon: LibraryBigIcon,
    keywords: ["کتابخانه", "دیرکرد", "جریمه", "library"],
  },
  {
    id: "books",
    title: m.payment_books,
    description: m.payment_books_description,
    href: "https://www.hut.ac.ir/web/press/خرید-الکترونیکی-کتاب",
    group: "students",
    icon: BookOpenIcon,
    keywords: ["انتشارات", "کتاب", "press"],
  },
  {
    id: "sports",
    title: m.payment_sports,
    description: m.payment_sports_description,
    href: "https://hut.ac.ir/web/ws11/درگاه-پرداخت-واحد-تربیت-بدنی",
    group: "students",
    icon: DumbbellIcon,
    keywords: ["ورزش", "سالن", "استخر", "sport"],
  },
  {
    id: "labs",
    title: m.payment_labs,
    description: m.payment_labs_description,
    href: "https://hut.ac.ir/web/lab/درگاه-آزمایشگاه",
    group: "students",
    icon: FlaskConicalIcon,
    keywords: ["آزمایشگاه", "آزمون", "lab"],
  },

  /*------ Organisations and Others ------*/
  {
    id: "research",
    title: m.payment_research,
    description: m.payment_research_description,
    href: "https://edu.hut.ac.ir/پرداخت-الکترونیکی",
    group: "others",
    icon: FileSearchIcon,
    keywords: ["طرح", "پژوهش", "قرارداد", "research"],
  },
  {
    id: "events",
    title: m.payment_events,
    description: m.payment_events_description,
    href: "https://hut.ac.ir/web/ws6/شناسه-برگزاری-مراسم",
    group: "others",
    icon: PartyPopperIcon,
    keywords: ["مراسم", "سالن", "همایش"],
  },
  {
    id: "rent",
    title: m.payment_rent,
    description: m.payment_rent_description,
    href: "https://hut.ac.ir/web/student/پرداخت-الکترونیکی",
    group: "others",
    icon: KeyRoundIcon,
    keywords: ["اجاره", "غرفه", "rent"],
  },
  {
    id: "talent",
    title: m.payment_talent,
    description: m.payment_talent_description,
    href: "https://www.hut.ac.ir/web/ws1/پرداخت-الکترونیکی",
    group: "others",
    icon: SparklesIcon,
    keywords: ["کانون", "شکوفایی"],
  },
  {
    id: "surplus",
    title: m.payment_surplus,
    description: m.payment_surplus_description,
    href: "https://hut.ac.ir/web/سایت-خیرین/پرداخت-الکترونیکی",
    group: "others",
    icon: RecycleIcon,
    keywords: ["اسقاط", "اموال", "مزایده"],
  },
  {
    id: "other",
    title: m.payment_other,
    description: m.payment_other_description,
    href: "https://hut.ac.ir/web/daf/پرداخت-الکترونیکی",
    group: "others",
    icon: CoinsIcon,
    keywords: ["سایر", "درآمد", "واریز"],
  },
];
