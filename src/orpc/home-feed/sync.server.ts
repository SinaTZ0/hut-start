import { db } from "#/db/client.server";
import { env } from "#/env.server";
import { createLogger } from "#/lib/logger.server";
import type { SyncSummary } from "#/orpc/home-feed/contract";
import { syncFeedArchive, syncHomeFeed, type ArchiveSyncSummary } from "#/orpc/home-feed/service";
import { fetchSourcePage, measureSource } from "#/orpc/home-feed/source.server";

const log = createLogger("home-feed");

/*===== Run =====*/
let inFlight: Promise<SyncSummary | null> | null = null;

/**
 * One sync of the home feed from the old site, logged. A call while a run is going joins it instead of starting
 * another, so the timer and a manual trigger never read the old site twice at once.
 *
 * @returns The run's summary, or null when the old homepage couldn't be read (logged and reported as an error).
 */
export function runHomeFeedSync({ refresh = false }: { refresh?: boolean } = {}): Promise<SyncSummary | null> {
  inFlight ??= (async () => {
    try {
      const result = await syncHomeFeed({ db, fetchPage: fetchSourcePage, measure: measureSource, refresh });
      if (result.kind === "source-failed") {
        log.error({ err: result.error }, "home feed sync failed; the last good feed stays");
        return null;
      }
      log.info(result.summary, "synced the home feed");
      return result.summary;
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

let archiveInFlight: Promise<ArchiveSyncSummary> | null = null;

/**
 * One timed update of the archive: the listings' newest posts, then a few article pages of the backlog
 * (`syncFeedArchive`). Joined like the homepage's run; a failed listing page is logged and read again next time.
 */
export function runArchiveSync(): Promise<ArchiveSyncSummary> {
  archiveInFlight ??= (async () => {
    try {
      const summary = await syncFeedArchive({ db, fetchPage: fetchSourcePage, measure: measureSource });
      if (summary.failedPages > 0) log.warn(summary, "some archive listing pages couldn't be read");
      else log.info(summary, "synced the archive");
      return summary;
    } finally {
      archiveInFlight = null;
    }
  })();
  return archiveInFlight;
}

/*===== Schedule =====*/
const FIRST_RUN_DELAY_MS = 30 * 1000;

// Vite re-evaluates server modules on every change in development; the flag lives on `globalThis` so each edit doesn't
// start another timer.
const STARTED = Symbol.for("app.homeFeedSync.started");
const state = globalThis as typeof globalThis & { [STARTED]?: boolean };

/** A timed run, the homepage and then the archive: their failures are already logged, and nothing waits for them. */
function runOnSchedule(): void {
  runHomeFeedSync()
    .catch((error: unknown) => log.error({ err: error }, "home feed sync crashed"))
    .then(() => runArchiveSync())
    .catch((error: unknown) => log.error({ err: error }, "archive sync crashed"));
}

/**
 * Reads the old homepage, then the archive's listings, every `HOME_FEED_SYNC_MINUTES` inside the app's process, like
 * the media cleanup. That fits the single app process `compose.prod.yaml` runs; with several, each would sync, which
 * is wasteful but safe: a run replaces the feed in one transaction, and the archive only adds what isn't stored.
 *
 * The first run waits 30 seconds, so a restart doesn't add the old site's latency to startup. Timers are `unref`ed and
 * never keep the process alive.
 */
export function startHomeFeedSync(): void {
  if (state[STARTED] || env.HOME_FEED_SYNC_MINUTES === 0) return;
  state[STARTED] = true;

  setTimeout(runOnSchedule, FIRST_RUN_DELAY_MS).unref();
  setInterval(runOnSchedule, env.HOME_FEED_SYNC_MINUTES * 60 * 1000).unref();
}
