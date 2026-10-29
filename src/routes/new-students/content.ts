import { m } from "#/paraglide/messages";

/*===== First Steps =====*/
// What a new student does in their first weeks, in about the order they do it: enrol, then find a room, money and
// meals, then settle into classes. The page numbers them. Text is message functions, called in the page.

export type FirstStep = { href: string; title: () => string; description: () => string };

export const FIRST_STEPS: FirstStep[] = [
  {
    href: "https://golestan.hut.ac.ir/",
    title: m.new_students_step_golestan,
    description: m.new_students_step_golestan_description,
  },
  {
    href: "/offices/alumni-affairs",
    title: m.new_students_step_enrolment,
    description: m.new_students_step_enrolment_description,
  },
  {
    href: "/offices/dorms",
    title: m.new_students_step_dorms,
    description: m.new_students_step_dorms_description,
  },
  {
    href: "/offices/welfare",
    title: m.new_students_step_welfare,
    description: m.new_students_step_welfare_description,
  },
  {
    href: "/offices/dining",
    title: m.new_students_step_dining,
    description: m.new_students_step_dining_description,
  },
  {
    href: "https://ec.hut.ac.ir/",
    title: m.new_students_step_courseware,
    description: m.new_students_step_courseware_description,
  },
  {
    href: "/calendar",
    title: m.new_students_step_calendar,
    description: m.new_students_step_calendar_description,
  },
  {
    href: "/consultation",
    title: m.new_students_step_counselling,
    description: m.new_students_step_counselling_description,
  },
  {
    href: "/contact",
    title: m.new_students_step_contact,
    description: m.new_students_step_contact_description,
  },
];
