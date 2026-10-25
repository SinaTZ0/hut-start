import { db } from "#/db/client.server";
import { syncHomeFeed } from "#/orpc/home-feed/service";
import { fetchSourcePage } from "#/orpc/home-feed/source.server";

/*===== Sync Home Feed =====*/
// Reads hut.ac.ir's homepage into the home feed now, the same run the server's timer does (docs/backend/home-feed.md).
// Run with `pnpm crawl:home`; `-- --refresh` reads every listed article's page again.

const refresh = process.argv.includes("--refresh");
const result = await syncHomeFeed({ db, fetchPage: fetchSourcePage, refresh });

if (result.kind === "source-failed") {
  console.error("The old homepage couldn't be read; the feed is unchanged.", result.error);
  process.exitCode = 1;
} else {
  console.info("Synced the home feed:", result.summary);
}
await db.$client.end();
