import sharp from "sharp";

import { SOURCE_ORIGIN } from "#/orpc/home-feed/constants";
import type { Measure } from "#/orpc/home-feed/service";

/*===== Old Site Pages =====*/
const TIMEOUT_MS = 20_000;
// Names the reader, so the old site's admins can tell these requests apart from visitors.
const USER_AGENT = "HUT-demo-sync/1.0 (mirrors the homepage for the new site's demo)";

/**
 * Asks the old site for `url`.
 *
 * @throws When `url` isn't on the old site, or it doesn't answer 200 within 20 seconds.
 */
async function fetchSource({ url, method = "GET", accept }: { url: string; method?: string; accept: string }) {
  const { hostname } = new URL(url);
  const sourceHost = new URL(SOURCE_ORIGIN).hostname;
  if (hostname !== sourceHost && hostname !== `www.${sourceHost}`) throw new Error(`Not an old-site page: ${url}`);

  const response = await fetch(url, {
    method,
    headers: { "user-agent": USER_AGENT, accept },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Old site answered ${response.status} for ${url}`);
  return response;
}

/**
 * Reads a page of the old site as text.
 *
 * @throws When `url` isn't on the old site, or the page doesn't answer 200 within 20 seconds.
 */
export async function fetchSourcePage(url: string): Promise<string> {
  return (await fetchSource({ url, accept: "text/html" })).text();
}

/*===== Old Site Files =====*/
// Measured once, when the article's page is read, so the article page can reserve each photo's space and tell a
// poster from a photo. A measurement that fails is left out; the page then draws the photo at whatever size it loads.

/** A photo's size as shown (its EXIF orientation applied), or null when it can't be read. */
export async function measureSourceImage(url: string): Promise<{ width: number; height: number } | null> {
  try {
    const response = await fetchSource({ url, accept: "image/*" });
    const { autoOrient } = await sharp(Buffer.from(await response.arrayBuffer())).metadata();
    return autoOrient.width > 0 && autoOrient.height > 0
      ? { width: autoOrient.width, height: autoOrient.height }
      : null;
  } catch {
    return null;
  }
}

/** A file's size in bytes, from a `HEAD` request, or null when the old site doesn't say. */
export async function measureSourceFile(url: string): Promise<number | null> {
  try {
    const length = Number((await fetchSource({ url, method: "HEAD", accept: "*/*" })).headers.get("content-length"));
    return Number.isInteger(length) && length > 0 ? length : null;
  } catch {
    return null;
  }
}

/** The measurements a sync takes of the old site's files. */
export const measureSource: Measure = { image: measureSourceImage, file: measureSourceFile };
