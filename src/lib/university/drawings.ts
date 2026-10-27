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
  field: (key: string) => string;
};

export function departmentDrawings(slug: string): Drawings | null {
  if (!DRAWN.has(slug)) return null;
  const folder = `/images/departments/${slug}`;
  return {
    hero: `${folder}/hero.webp`,
    lab: `${folder}/lab.webp`,
    mark: `${folder}/mark.webp`,
    field: (key) => `${folder}/field-${key}.webp`,
  };
}

/**
 * The home page's drawings: the hero's campus (the hero photo's view redrawn, the photo's size, so it lies over it), the
 * glance band's, the learning and welcome panels' corners, and the research vignette.
 */
export const HOME_DRAWINGS = {
  campus: "/images/home/campus-sketch.webp",
  glance: "/images/home/glance.webp",
  learning: "/images/home/learning.webp",
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
