import { createHash, timingSafeEqual } from "node:crypto";

import { ORPCError, os } from "@orpc/server";

import { env } from "#/env.server";
import { getHomeFeed } from "#/orpc/home-feed/service";
import { runHomeFeedSync } from "#/orpc/home-feed/sync.server";
import { base } from "#/orpc/implementer.server";
import { provideDbMiddleware } from "#/orpc/middleware/db/db.middleware";
import { rateLimitMiddleware } from "#/orpc/middleware/rate-limit/rate-limit.middleware";

/*===== Get =====*/
// Public: the home page is for every visitor.
export const getHomeFeedProcedure = base.homeFeed.get
  .use(provideDbMiddleware)
  .handler(({ context }) => getHomeFeed({ db: context.db }));

/*===== Sync =====*/
// Each call reads the old site, so it's limited well below the general policy. The secret is long and random, so the
// limit isn't what protects it; it keeps a leaked secret from turning this into a way to load the old site.
const SYNC_RATE_LIMIT = { name: "home-feed-sync", limit: 5, windowMs: 60_000 };

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

/** Compares digests, so the comparison takes the same time whatever the two lengths. */
function sameSecret(given: string, expected: string): boolean {
  return timingSafeEqual(digest(given), digest(expected));
}

/**
 * Lets through only a request carrying `Authorization: Bearer <HOME_FEED_SYNC_SECRET>`. Used by this procedure only,
 * so it stays here (docs/backend/architecture.md → Middleware).
 *
 * @throws `UNAUTHORIZED` when the header is missing or wrong, and always while the variable is unset.
 */
const requireSyncSecretMiddleware = os.$context<{ headers: Headers }>().middleware(async ({ context, next }) => {
  const expected = env.HOME_FEED_SYNC_SECRET;
  const given = context.headers.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1];

  if (!expected || !given || !sameSecret(given, expected)) {
    throw new ORPCError("UNAUTHORIZED", { message: "Sign in to continue.", data: { errors: [], fields: {} } });
  }
  return next();
});

export const syncHomeFeedProcedure = base.homeFeed.sync
  .use(rateLimitMiddleware(SYNC_RATE_LIMIT))
  .use(requireSyncSecretMiddleware)
  .handler(async ({ input, errors }) => {
    const summary = await runHomeFeedSync({ refresh: input?.refresh });
    if (!summary) throw errors.BAD_GATEWAY({ data: { errors: [], fields: {} } });
    return summary;
  });
