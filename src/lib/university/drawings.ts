/*===== Drawings =====*/
// The signature drawings (docs/frontend/app-identity.md → Brand) ship with the app as transparent WebPs used as masks:
// each department's in `public/images/departments/<slug>/`, the home page's in `public/images/home/`. A department
// without them yet gets its page, and its home grid cell, without art.

const DRAWN = new Set(["ee", "ce", "mech", "bme", "materials", "chem", "mining", "bs"]);

export type Drawings = {
  hero: string;
  lab: string;
  /** The department's key object, cut from its hero drawing, for its cell in the home page's grid. */
  mark: string;
  /** One instrument cut from its lab drawing, for its cell in the grids that lead to the labs. */
  labMark: string;
  field: (key: string) => string;
};

export function departmentDrawings(slug: string): Drawings | null {
  if (!DRAWN.has(slug)) return null;
  const folder = `/images/departments/${slug}`;
  return {
    hero: `${folder}/hero.webp`,
    lab: `${folder}/lab.webp`,
    mark: `${folder}/mark.webp`,
    labMark: `${folder}/lab-mark.webp`,
    field: (key) => `${folder}/field-${key}.webp`,
  };
}

/**
 * The home page's drawings: the hero's campus (the hero photo's view redrawn, the photo's size, so it lies over it), the
 * glance band's, the incubator and welcome panels' corners, and the research vignette.
 */
export const HOME_DRAWINGS = {
  campus: "/images/home/campus-sketch.webp",
  /** Leonardo's glider over the campus drawing's peaks, placed on its own so it doesn't slide with the photo's crop */
  glider: "/images/home/hero-glider.webp",
  /** The hero's sky: a sun with a face among orbits, constellations and a spiral */
  astronomy: "/images/home/hero-astronomy.webp",
  glance: "/images/home/glance.webp",
  incubator: "/images/home/incubator.webp",
  welcome: "/images/home/welcome.webp",
  research: "/images/home/research.webp",
};

/** The public forms' drawings, in the corner of each page's pine rail: a quill, a sealed letter and a balance scale for
 * complaints and feedback; an open book with dividers, a compass and a lantern for online consultation. */
export const FORM_DRAWINGS = {
  feedback: { src: "/images/forms/feedback.webp", aspect: "aspect-720/493" },
  consultation: { src: "/images/forms/consultation.webp", aspect: "aspect-720/408" },
};

/** The privacy statement's drawing, behind its heading: an exploded padlock with its key and keyhole plate. */
export const PRIVACY_DRAWING = { src: "/images/privacy/privacy.webp", aspect: "aspect-720/468" };

/** The main menu's drawings, one per section's card, laid under the whole card as a wide notebook sheet with its
 * subject in the bottom corner the link groups leave empty: the university building before Alvand for the university, a
 * Pacioli solid over an open book with dividers for education, gears, a worm screw and a wing for research, and students
 * under a chenar for campus life. Keyed by the section's `id` (`NAV_SECTIONS`). */
export const NAV_DRAWINGS: Record<string, string> = {
  about: "/images/nav/about.webp",
  education: "/images/nav/education.webp",
  research: "/images/nav/research.webp",
  "campus-life": "/images/nav/campus.webp",
};

/** The plain pages' drawings, at the end of their title (`PageHero`): an iwan with its office counter for an office, a
 * printing press for the news archive, a switchboard for the phone book, a cabinet of rolled documents for the forms,
 * a hub of gears for the systems and payments, and a Persian astrolabe for the academic calendar (the Jalali calendar's
 * months were set by the sun's passage through the zodiac). */
export const PAGE_DRAWINGS = {
  office: "/images/pages/office.webp",
  archive: "/images/pages/archive.webp",
  directory: "/images/pages/directory.webp",
  documents: "/images/pages/documents.webp",
  hub: "/images/pages/hub.webp",
  calendar: "/images/pages/calendar.webp",
};

/** An office's drawing at the end of its title: its own where it has one (the central laboratory's spectrometer,
 * tensile tester, centrifuge and microscope), otherwise the offices' shared iwan. */
const OFFICE_DRAWINGS: Record<string, string> = {
  "central-lab": "/images/pages/central-lab.webp",
};

/** The central laboratory's tensile tester on its own, for its tile beside the departments' labs (`/research`). */
export const CENTRAL_LAB_MARK = "/images/pages/central-lab-mark.webp";

/** The new students' page's drawing: a satchel of notebooks, keys, and a campus plan with a compass and dividers. */
export const NEW_STUDENTS_DRAWING = "/images/pages/new-students.webp";

export function officeDrawing(slug: string): string {
  return OFFICE_DRAWINGS[slug] ?? PAGE_DRAWINGS.office;
}
