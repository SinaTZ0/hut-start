import { db } from "#/db/client.server";
import { syncFeedArchive } from "#/orpc/home-feed/service";
import { fetchSourcePage, measureSource } from "#/orpc/home-feed/source.server";

/*===== Sync Feed Archive =====*/
// Fills the archive (`/news`) from the old site's listings (docs/backend/home-feed.md → Archive). Run with
// `pnpm crawl:archive`; on the server, `deploy/deploy.sh archive`. By default it reads every listing page (about 45)
// and then every article page not read yet (about 2,400 on a new server, a few seconds each: an hour or more).
// `--pages <n>` reads only the first n pages of each listing, `--articles <n>` at most n article pages, and
// `--listings-only` none. Stopping it midway is safe: the next run, or the server's timer, carries on.

/** The number after `flag`, or `fallback` when it isn't given. */
function numberArg(flag: string, fallback: number): number {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  const value = Number(process.argv[index + 1]);
  if (!Number.isInteger(value) || value < 0) throw new Error(`${flag} needs a whole number`);
  return value;
}

const listingPages = numberArg("--pages", Number.POSITIVE_INFINITY);
const maxArticles = process.argv.includes("--listings-only") ? 0 : numberArg("--articles", Number.POSITIVE_INFINITY);

const summary = await syncFeedArchive({
  db,
  fetchPage: fetchSourcePage,
  measure: measureSource,
  listingPages,
  maxArticles,
  onProgress: (done) => {
    if (done % 50 === 0) console.info(`Read ${done} article pages…`);
  },
});

console.info("Synced the archive:", summary);
if (summary.failedPages > 0) process.exitCode = 1;
await db.$client.end();
