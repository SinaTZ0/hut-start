import { m } from "#/paraglide/messages";

/*===== Design Variants =====*/
// The design choices still open: each part of the site that has more than one design built, for reviewers to compare
// with the design preview (`DESIGN_PREVIEW_KEY`, `src/components/shared/design-preview/`). Visitors always get the
// default. Once a choice is made, delete the losing designs and the entry, so variants don't pile up.

type DesignVariant = {
  /** What the switch is called in the preview panel. */
  label: () => string;
  /** Each design's id and name. The id goes in the cookie and the share link. */
  options: Record<string, () => string>;
  default: string;
  /** The route paths (as declared in `src/routes.ts`) where the switch shows, or `all` for every page. */
  pages: "all" | readonly string[];
};

export const DESIGN_VARIANTS = {
  header: {
    label: m.design_header,
    options: { pine: m.design_header_pine, glass: m.design_header_glass },
    default: "pine",
    pages: "all",
  },
} as const satisfies Record<string, DesignVariant>;

export type DesignVariantId = keyof typeof DESIGN_VARIANTS;
export type DesignOption<Id extends DesignVariantId> = keyof (typeof DESIGN_VARIANTS)[Id]["options"] & string;
export type DesignChoices = { [Id in DesignVariantId]?: DesignOption<Id> };

const VARIANT_IDS = Object.keys(DESIGN_VARIANTS) as DesignVariantId[];

/*===== Cookies and Links =====*/
/** Holds the preview key once a link with `?preview=` was opened; the browser then sees the preview. */
export const DESIGN_PREVIEW_COOKIE = "design-preview";
/** Holds the picks, in the share link's format. */
export const DESIGN_CHOICES_COOKIE = "design";
/** The search params of a share link: `?preview=<key>&design=header:glass`. */
export const DESIGN_PREVIEW_PARAM = "preview";
export const DESIGN_CHOICES_PARAM = "design";

/**
 * Reads picks written as `header:glass,achievements:b`. Unknown switches and designs are dropped, so a link made before
 * a choice was settled still opens.
 */
export function parseDesignChoices(value: string | undefined): DesignChoices {
  const choices: Record<string, string> = {};
  for (const pair of value?.split(",") ?? []) {
    const [id, option] = pair.split(":");
    if (!id || !option || !isVariantId(id)) continue;
    if (Object.hasOwn(DESIGN_VARIANTS[id].options, option)) choices[id] = option;
  }
  return choices as DesignChoices;
}

/** Writes picks in the format `parseDesignChoices` reads, leaving out defaults. */
export function serializeDesignChoices(choices: DesignChoices): string {
  return VARIANT_IDS.flatMap((id) => {
    const option = choices[id];
    return option && option !== DESIGN_VARIANTS[id].default ? [`${id}:${option}`] : [];
  }).join(",");
}

/** The switches that apply to a page, by its route path (`/`, `/departments/$departmentSlug`). */
export function designVariantsForPage(routePath: string): DesignVariantId[] {
  return VARIANT_IDS.filter((id) => {
    // Widened: with every entry on `all`, TypeScript would narrow the list case away.
    const pages = DESIGN_VARIANTS[id].pages as DesignVariant["pages"];
    return pages === "all" || pages.includes(routePath);
  });
}

function isVariantId(id: string): id is DesignVariantId {
  return Object.hasOwn(DESIGN_VARIANTS, id);
}
