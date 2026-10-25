import { db } from "#/db/client.server";
import { env } from "#/env.server";
import { createLogger } from "#/lib/logger.server";
import type { SyncSummary } from "#/orpc/home-feed/contract";
import { syncHomeFeed } from "#/orpc/home-feed/service";
import { fetchSourcePage } from "#/orpc/home-feed/source.server";

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
      const result = await syncHomeFeed({ db, fetchPage: fetchSourcePage, refresh });
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

/*===== Schedule =====*/
const FIRST_RUN_DELAY_MS = 30 * 1000;

// Vite re-evaluates server modules on every change in development; the flag lives on `globalThis` so each edit doesn't
// start another timer.
const STARTED = Symbol.for("app.homeFeedSync.started");
const state = globalThis as typeof globalThis & { [STARTED]?: boolean };

/** A timed run: its failures are already logged, and nothing waits for it. */
function runOnSchedule(): void {
  runHomeFeedSync().catch((error: unknown) => log.error({ err: error }, "home feed sync crashed"));
}

/**
 * Reads the old homepage every `HOME_FEED_SYNC_MINUTES` inside the app's process, like the media cleanup. That fits
 * the single app process `compose.prod.yaml` runs; with several, each would sync, which is wasteful but safe because
 * a run replaces the feed in one transaction.
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
