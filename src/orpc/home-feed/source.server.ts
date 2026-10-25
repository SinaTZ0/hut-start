import { SOURCE_ORIGIN } from "#/orpc/home-feed/constants";

/*===== Old Site Pages =====*/
const TIMEOUT_MS = 20_000;
// Names the reader, so the old site's admins can tell these requests apart from visitors.
const USER_AGENT = "HUT-demo-sync/1.0 (mirrors the homepage for the new site's demo)";

/**
 * Reads a page of the old site as text.
 *
 * @throws When `url` isn't on the old site, or the page doesn't answer 200 within 20 seconds.
 */
export async function fetchSourcePage(url: string): Promise<string> {
  const { hostname } = new URL(url);
  const sourceHost = new URL(SOURCE_ORIGIN).hostname;
  if (hostname !== sourceHost && hostname !== `www.${sourceHost}`) throw new Error(`Not an old-site page: ${url}`);

  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Old site answered ${response.status} for ${url}`);
  return response.text();
}
