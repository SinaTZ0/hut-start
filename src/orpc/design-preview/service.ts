import { createHash, timingSafeEqual } from "node:crypto";

import { env } from "#/env.server";
import { DESIGN_CHOICES_COOKIE, DESIGN_PREVIEW_COOKIE, parseDesignChoices } from "#/lib/design-variants";
import type { DesignLink, DesignPreview } from "#/orpc/design-preview/contract";

const OFF: DesignPreview = { enabled: false, key: null, choices: {} };

/*===== Design Preview =====*/
/**
 * The preview state for one request. Off (the defaults for everyone) unless `DESIGN_PREVIEW_KEY` is set and the share
 * link or the browser's cookie holds it. The link's picks replace the cookie's, so it opens exactly the combination it
 * was copied with.
 */
export function resolveDesignPreview({ headers, link }: { headers: Headers; link: DesignLink }): DesignPreview {
  const key = env.DESIGN_PREVIEW_KEY;
  if (!key) return OFF;

  const cookies = readCookies(headers.get("cookie"));
  const enabled = matchesKey(link.preview, key) || matchesKey(cookies.get(DESIGN_PREVIEW_COOKIE), key);
  if (!enabled) return OFF;

  return { enabled, key, choices: parseDesignChoices(link.design ?? cookies.get(DESIGN_CHOICES_COOKIE)) };
}

/*===== Helpers =====*/
const digest = (value: string) => createHash("sha256").update(value).digest();

/** Compares in constant time; hashing first gives both sides the same length. */
function matchesKey(candidate: string | undefined, key: string): boolean {
  if (!candidate) return false;
  return timingSafeEqual(digest(candidate), digest(key));
}

/** A `Cookie` header's values by name. The browser writes them URI-encoded (`useDesignPreview`). */
function readCookies(header: string | null): Map<string, string> {
  const cookies = new Map<string, string>();
  for (const part of header?.split(";") ?? []) {
    const at = part.indexOf("=");
    if (at === -1) continue;
    try {
      cookies.set(part.slice(0, at).trim(), decodeURIComponent(part.slice(at + 1).trim()));
    } catch {
      // A malformed value from some other cookie; it isn't one of ours.
    }
  }
  return cookies;
}
