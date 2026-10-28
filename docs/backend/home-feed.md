# Home Feed (Mirror of hut.ac.ir)

The home page's news, notices, achievements and events come from `homeFeed.get` (`src/orpc/home-feed/`). Until the
cutover, editors keep publishing on the old site, so the feed **mirrors hut.ac.ir's homepage**. A sync reads it, stores
what it shows, and the home page reads the stored copy. Images are hotlinked: the feed stores their URL on the old site
and never copies the file.

Only the source is temporary. The tables (`feed_article`, `feed_placement`), `homeFeed.get` and the home page are what
an editor will write to after the cutover (see [Removing It](#removing-it)).

## How a Sync Runs

```text
timer / homeFeed.sync / pnpm crawl:home
  → read https://hut.ac.ir/ (parse.server.ts)
  → check and normalize each item (validation.ts)
  → read the page of each article that's new and needs one (at most 40 per run, 300 ms apart)
  → one transaction: store the articles, replace every placement, delete articles nothing shows
```

- **A mirror, not an archive.** After a run the feed shows exactly what the old homepage showed. An article it dropped
  is deleted.
- **A failed run changes nothing.** If the homepage doesn't load, or any block is missing or has no valid item (the
  old site changed its layout), the run stops before writing and logs an error, which goes to the error viewer. The
  home page keeps the last good feed. The one exception is the occasion slider, which is `optional`: the editors take it
  down between occasions, so a run without it just clears the hero's poster.
- **Article pages are read once.** The homepage cuts the titles of news, achievements and events short (`...`), and
  shows no summary. Each such article's own page is read on the run that first sees it, for the full title, the lead
  paragraph and the date. Later runs reuse what was stored. A page that fails to load is tried again on the next run.
  An edit made on the old site after that shows only after a refresh (`pnpm crawl:home -- --refresh`, or
  `{"refresh": true}` on the endpoint).
- **Only the old site.** Links and images must be on `hut.ac.ir`; anything else is dropped. Text goes through
  `normalizePersianText`, and its standalone Latin numbers become Persian digits («سال 1405» → «سال ۱۴۰۵»), like the
  rest of the page; digits inside a Latin word or code (B2B) stay. Emoji are removed from summaries, and the old site's
  placeholder image counts as no image. A change to this cleaning reaches stored articles whose page was already read
  only after a refresh.
- **Persian only.** The old site's text is stored as `{ fa }` `LocalizedText`, so `/en` shows it in Persian.

## Old Homepage Blocks

Each block on the old homepage is a Liferay asset publisher, found by its instance ID (`BLOCKS` in `parse.server.ts`).
The site has no feed or open API: its headless API answers 403 and the publishers' RSS redirects. So the HTML is read.

| Instance | Old block                | Kind / category              | Shown as                                             |
| -------- | ------------------------ | ---------------------------- | ---------------------------------------------------- |
| `ekjl`   | اخبار                    | `news` / `university`        | the featured story, two more cards and two headlines |
| `yaez`   | tab آموزش                | `notice` / `education`       | its tab, and آخرین                                   |
| `qicz`   | tab تحصیلات تکمیلی       | `notice` / `graduate`        | its tab, and آخرین                                   |
| `goeq`   | tab ارتباط با صنعت       | `notice` / `industry`        | its tab, and آخرین                                   |
| `srha`   | tab دانشجوئی و فرهنگی    | `notice` / `student`         | its tab, آخرین, and the glance band's photo          |
| `jtsr`   | tab آموزش های آزاد       | `notice` / `openEducation`   | its tab, and آخرین                                   |
| `djmo`   | achievements             | `achievement` / `university` | the lead achievement and two more                    |
| `smis`   | growth and career centre | `growth` / `growth`          | the incubator section's three rows                   |
| `qill`   | رویدادها                 | `event` / `openEducation`    | the open-education section's three cards             |
| `jclk`   | occasion slider (hero)   | `occasion` / `university`    | the hero's poster card (its first slide); optional   |

Dates are Gregorian, written into the page's scripts (`moment('2026 10 25', 'YYYY MM DD')`).

**When a sync starts failing**, open hut.ac.ir and find the block's instance ID in its HTML
(`id="p_p_id_…AssetPublisherPortlet_INSTANCE_<id>_"`). A changed ID is a one-line fix in `BLOCKS`. Changed markup inside
a block needs a change in `parseHomePage`, and in `fixtures/home.html` so `parse.server.test.ts` covers it.

The old site's bot filter answers `500` to a browser whose user agent says `HeadlessChrome`, so its images look broken
in headless screenshots. Set a normal Chrome user agent there; real browsers are unaffected.

## Running It

| Way                | When                                                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| The server's timer | Every `HOME_FEED_SYNC_MINUTES` (default 30). The first run is 30 seconds after start. `0` turns it off.                           |
| `pnpm crawl:home`  | By hand, in development or on the server. Needs no server running and no secret. `-- --refresh` reads every article's page again. |
| `homeFeed.sync`    | On demand over HTTP, with the secret. A call during a timed run joins it.                                                         |

```sh
curl -X POST -H "Authorization: Bearer $HOME_FEED_SYNC_SECRET" https://<domain>/rpc/homeFeed/sync
# with a refresh of every article page:
curl -X POST -H "Authorization: Bearer $HOME_FEED_SYNC_SECRET" -H "content-type: application/json" \
  -d '{"json":{"refresh":true}}' https://<domain>/rpc/homeFeed/sync
```

It answers with `{"json":{"added":…,"updated":…,"removed":…,"enriched":…,"durationMs":…}}`. Other answers:

- `401` when the secret is missing or wrong, and always while `HOME_FEED_SYNC_SECRET` is unset;
- `429` after 5 calls in a minute from one address;
- `502` when the old homepage couldn't be read.

| Variable                 | Default | Meaning                                                                                                  |
| ------------------------ | ------- | -------------------------------------------------------------------------------------------------------- |
| `HOME_FEED_SYNC_MINUTES` | `30`    | How often the timer runs; `0` turns it off. Playwright's server sets `0`, so tests never read hut.ac.ir. |
| `HOME_FEED_SYNC_SECRET`  | empty   | Enables `homeFeed.sync`. At least 32 characters; `deploy/deploy.sh` generates it.                        |

A fresh database has an empty feed: the home page hides the blocks it can't fill until the first sync.

## Removing It

At the cutover, when the new site's editors take over:

1. Delete `parse.server.ts`, `source.server.ts`, `sync.server.ts`, `validation.ts`, the `fixtures/` folder,
   `parse.server.test.ts`, `src/db/sync-home-feed.ts` and its `crawl:home` script.
2. Delete `syncHomeFeed` and its helpers from `service.ts`, the `sync` procedure and contract, and the
   `startHomeFeedSync()` call in `src/server.ts`.
3. Remove both variables from `src/env.server.ts`, `.env.example`, `.env.production.example`, `compose.prod.yaml`,
   the deploy tool's settings registry (`tools/deploy/internal/settings/settings.go`) and `playwright.config.ts`.
4. Keep the tables and `homeFeed.get`. Editors' tools write the same rows; a placement says where an article shows.
