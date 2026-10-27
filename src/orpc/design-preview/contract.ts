import { oc } from "@orpc/contract";
import { z } from "zod";

import { commonErrors } from "#/orpc/errors";

/*===== Schemas =====*/
/** A share link's search params, when the page was opened from one (`?preview=<key>&design=header:glass`). */
const designLinkSchema = z.object({
  preview: z.string().max(200).optional(),
  design: z.string().max(500).optional(),
});

export type DesignLink = z.infer<typeof designLinkSchema>;

const designPreviewSchema = z.object({
  /** Whether this browser may see the preview: `DESIGN_PREVIEW_KEY` is set and it holds the key. */
  enabled: z.boolean(),
  /** The key, for the share link the panel copies. `null` when the preview is off. */
  key: z.string().nullable(),
  /** The picks (`header` → `glass`), already checked against the registry; empty when the preview is off. */
  choices: z.record(z.string(), z.string()),
});

export type DesignPreview = z.infer<typeof designPreviewSchema>;

/*===== Procedures =====*/
/**
 * Which designs this browser sees (`src/lib/design-variants.ts`), from its cookies, or from the share link it was
 * opened with, which wins. Public: everyone without the key gets the defaults.
 */
export const getDesignPreviewContract = oc
  .errors(commonErrors)
  .input(designLinkSchema.optional())
  .output(designPreviewSchema);

export const designPreviewContract = {
  get: getDesignPreviewContract,
};
