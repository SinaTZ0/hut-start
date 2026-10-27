import { queryOptions, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import {
  DESIGN_CHOICES_COOKIE,
  DESIGN_CHOICES_PARAM,
  DESIGN_PREVIEW_COOKIE,
  DESIGN_PREVIEW_PARAM,
  DESIGN_VARIANTS,
  type DesignChoices,
  type DesignOption,
  type DesignVariantId,
  serializeDesignChoices,
} from "#/lib/design-variants";
import { client, orpc } from "#/orpc/client";
import type { DesignLink } from "#/orpc/design-preview/contract";

/*===== Query =====*/
/**
 * The design preview state (`designPreview.get`), loaded by the site layout. One cache entry whatever link the page was
 * opened with, so components read it without knowing the link. It only changes when this browser switches a design,
 * which writes the cache directly, so it never goes stale.
 */
export function designPreviewQueryOptions(link?: DesignLink) {
  return queryOptions({
    queryKey: orpc.designPreview.get.queryKey(),
    queryFn: () => client.designPreview.get(link),
    staleTime: Infinity,
  });
}

/** A share link's params in the page's search, or `undefined` when it has none. */
export function readDesignLink(search: Record<string, unknown>): DesignLink | undefined {
  const preview = search[DESIGN_PREVIEW_PARAM];
  const design = search[DESIGN_CHOICES_PARAM];
  if (preview === undefined && design === undefined) return undefined;
  // The router parses search values as JSON where it can, so a key of digits arrives as a number.
  return {
    preview: preview === undefined ? undefined : String(preview),
    design: design === undefined ? undefined : String(design),
  };
}

/*===== Variant =====*/
/** The design this browser sees for a switch: its pick in the preview, else the default. */
export function useDesignVariant<Id extends DesignVariantId>(id: Id): DesignOption<Id> {
  const { data } = useSuspenseQuery(designPreviewQueryOptions());
  return (data.choices[id] as DesignOption<Id> | undefined) ?? DESIGN_VARIANTS[id].default;
}

/*===== Preview =====*/
// Long enough for a review round; opening the share link again renews it.
const COOKIE_MAX_AGE = 90 * 24 * 60 * 60;

/**
 * Writes one of the preview's cookies. The browser writes them, and the server only reads them
 * (`src/orpc/design-preview/service.ts`), so there is one writer.
 */
function writeCookie(name: string, value: string) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  // oxlint-disable-next-line unicorn/no-document-cookie -- the Cookie Store API is missing from Safari before 18.4
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

/**
 * The preview state, and what the panel does with it. Switching writes the cookie, so the server renders the same
 * designs on the next page, and the cache, so this page changes at once.
 */
export function useDesignPreview() {
  const queryClient = useQueryClient();
  const { data: preview } = useSuspenseQuery(designPreviewQueryOptions());
  // The server checked them against the registry.
  const current = preview.choices as DesignChoices;

  const save = (choices: DesignChoices) => {
    writeCookie(DESIGN_CHOICES_COOKIE, serializeDesignChoices(choices));
    queryClient.setQueryData(designPreviewQueryOptions().queryKey, { ...preview, choices });
  };

  return {
    preview,
    choices: current,
    /** Shows `option` for switch `id`. */
    choose: <Id extends DesignVariantId>(id: Id, option: DesignOption<Id>) => save({ ...current, [id]: option }),
    /** Back to every default. */
    reset: () => save({}),
    /** Keeps what a share link opened: its key and picks, for the pages after this one. */
    remember: () => {
      if (!preview.key) return;
      writeCookie(DESIGN_PREVIEW_COOKIE, preview.key);
      writeCookie(DESIGN_CHOICES_COOKIE, serializeDesignChoices(current));
    },
  };
}
