import {
  BedDoubleIcon,
  CalendarDaysIcon,
  GraduationCapIcon,
  HandCoinsIcon,
  type LucideIcon,
  MapPinIcon,
  MessagesSquareIcon,
  NotebookPenIcon,
  UserPlusIcon,
  UtensilsIcon,
} from "lucide-react";

import { m } from "#/paraglide/messages";

/*===== First Steps =====*/
// What a new student does in their first weeks, in about the order they do it: enrol, then find a room, money and
// meals, then settle into classes. Text is message functions, called in the page.

export type FirstStep = { href: string; title: () => string; description: () => string; icon: LucideIcon };

export const FIRST_STEPS: FirstStep[] = [
  {
    href: "https://golestan.hut.ac.ir/",
    title: m.new_students_step_golestan,
    description: m.new_students_step_golestan_description,
    icon: GraduationCapIcon,
  },
  {
    href: "/offices/alumni-affairs",
    title: m.new_students_step_enrolment,
    description: m.new_students_step_enrolment_description,
    icon: UserPlusIcon,
  },
  {
    href: "/offices/dorms",
    title: m.new_students_step_dorms,
    description: m.new_students_step_dorms_description,
    icon: BedDoubleIcon,
  },
  {
    href: "/offices/welfare",
    title: m.new_students_step_welfare,
    description: m.new_students_step_welfare_description,
    icon: HandCoinsIcon,
  },
  {
    href: "/offices/dining",
    title: m.new_students_step_dining,
    description: m.new_students_step_dining_description,
    icon: UtensilsIcon,
  },
  {
    href: "https://ec.hut.ac.ir/",
    title: m.new_students_step_courseware,
    description: m.new_students_step_courseware_description,
    icon: NotebookPenIcon,
  },
  {
    href: "/calendar",
    title: m.new_students_step_calendar,
    description: m.new_students_step_calendar_description,
    icon: CalendarDaysIcon,
  },
  {
    href: "/consultation",
    title: m.new_students_step_counselling,
    description: m.new_students_step_counselling_description,
    icon: MessagesSquareIcon,
  },
  {
    href: "/contact",
    title: m.new_students_step_contact,
    description: m.new_students_step_contact_description,
    icon: MapPinIcon,
  },
];
