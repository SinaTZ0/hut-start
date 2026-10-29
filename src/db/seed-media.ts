import { db } from "#/db/client.server";
import { user } from "#/db/schema";
import { uploadMedia } from "#/orpc/media/service";

/*===== Seed Media =====*/
// What the seeds share to store people's photos (`seed-departments.ts`, `seed-pages.ts`).

/*===== Photos =====*/
// The university's sites turn away clients that don't look like a browser.
const BROWSER_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  accept: "image/avif,image/webp,image/*,*/*;q=0.8",
};

/**
 * Downloads a photo and stores it as an unattached `portrait`. A photo that can't be fetched or read is skipped with
 * a warning: the member is still seeded, without a photo.
 */
export async function uploadPhoto({ url, uploader }: { url: string; uploader: string }): Promise<string | null> {
  try {
    const response = await fetch(url, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(30_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const file = new File([await response.arrayBuffer()], "photo", {
      type: response.headers.get("content-type") ?? "",
    });

    // The role only passes the upload's kind check (portraits are an admin's); the stored row records just the id.
    const result = await uploadMedia({ db, user: { id: uploader, role: "admin" }, kind: "portrait", file });
    if (result.kind !== "success") throw new Error(`upload refused: ${result.kind}`);
    return result.media.id;
  } catch (error) {
    console.warn(`Skipped a photo (${error instanceof Error ? error.message : error}): ${url}`);
    return null;
  }
}

/*===== System User =====*/
const SYSTEM_USER = { id: "system", name: "System", email: "system@system.invalid" };

/**
 * Returns the user the seed's photos are credited to, creating it on the first run. It can't sign in: it has no
 * password (no `account` row), it's blocked, and `.invalid` mail is never delivered. Its email also keeps anyone from
 * signing up as it.
 */
export async function systemUser(): Promise<{ id: string }> {
  await db
    .insert(user)
    .values({ ...SYSTEM_USER, role: "user", status: "blocked" })
    .onConflictDoNothing({ target: user.id });
  return { id: SYSTEM_USER.id };
}
