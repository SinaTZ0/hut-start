# Home Feed (Mirror of hut.ac.ir)

The home page's news, notices, achievements and events come from `homeFeed.get` (`src/orpc/home-feed/`). Until the
cutover, editors keep publishing on the old site, so the feed **mirrors hut.ac.ir's homepage**. A sync reads it, stores
what it shows, and the home page reads the stored copy. Images and files are hotlinked: the feed stores their URL on the
old site and never copies them.

Each article also gets a page here, `/articles/<id>` (`homeFeed.article`), where `<id>` is the old site's own ID for it.
The sync reads the article's page on the old site and stores its body as Tiptap JSON (`article-body.ts`), the format
the CMS's editor will write, so imported articles need no migration then. Once that's stored, the home page's card links
to the page here instead of the old one.

Only the source is temporary. The tables (`feed_article`, `feed_placement`), `homeFeed.get`, `homeFeed.article` and the
pages are what an editor will write to after the cutover (see [Removing It](#removing-it)).

## How a Sync Runs

```text
timer / homeFeed.sync / pnpm crawl:home
  → read https://hut.ac.ir/ (parse.server.ts)
  → check and normalize each item (validation.ts)
  → read the page of each article not read yet (at most 40 per timed run, 300 ms apart), measure its photos and files
  → one transaction: store the articles, replace every placement
```

- **The home page mirrors, the pages stay.** After a run the home page shows exactly what the old homepage showed. An
  article it dropped loses its placements but keeps its row, so a shared link to its page here keeps working. The
  run's `removed` counts those articles.
- **A failed run changes nothing.** If the homepage doesn't load, or any block is missing or has no valid item (the
  old site changed its layout), the run stops before writing and logs an error, which goes to the error viewer. The
  home page keeps the last good feed. The one exception is the occasion slider, which is `optional`: the editors take it
  down between occasions, so a run without it just clears the hero's poster.
- **Article pages are read once.** Every article's own page is read on the run that first sees it: for its body, the
  full title (the homepage cuts titles short with `...`), the lead paragraph and the date. Its photos are measured
  (their size lets the page reserve their space and tell a poster from a photo) and its files' sizes asked for. Later
  runs reuse what was stored. A page that fails to load is tried again on the next run; one that loads without an
  article in it is stored with an empty body and not asked for again. An edit made on the old site after that shows
  only after a refresh (`pnpm crawl:home -- --refresh`, or `{"refresh": true}` on the endpoint). On the server, a
  commit that changes how articles are read or cleaned adds a deploy step running `seed feed --refresh`
  (docs/deployment.md → Deploy Steps).
- **The body is cleaned on the way in** (`parseArticlePage`, then `validation.ts`). Only what the page draws is kept:
  paragraphs, headings, lists, bold, links, photos, the photo set, files and simple tables (a header row and plain
  cells). Word's styling is dropped. Posts copied from the university's Telegram channel are given structure: a ✳️ line
  becomes a heading, a run of short ◀️ lines a list, the 🖋 line the article's source, and the channel's footer is
  dropped. A first paragraph that repeats the title, and the lead (shown above the body), are left out. `**bold**` and
  bare `*.hut.ac.ir` addresses become marks. Photos and files must be on the old site; links may go anywhere on the
  web.
- **Only the old site.** Card links, images and files must be on `hut.ac.ir`; anything else is dropped. Text goes through
  `normalizePersianText`, and its standalone Latin numbers become Persian digits («سال 1405» → «سال ۱۴۰۵»), like the
  rest of the page; digits inside a Latin word or code (B2B) stay. Emoji are removed from summaries, and the old site's
  placeholder image counts as no image. A change to this cleaning reaches stored articles whose page was already read
  only after a refresh.
- **Persian only.** The old site's text is stored as `{ fa }` `LocalizedText`, so `/en` shows it in Persian. The
  article page says so on `/en` and keeps the body right to left.

## Archive

`/news` (`homeFeed.list`) lists every stored article except the occasion posters: the homepage's, and everything the
old site's three listings hold (`listing.server.ts`): اخبار, اطلاعیه‌ها and کارگاه‌ها و دوره‌های آموزشی, about 2,400
posts back to 2021. They're Liferay search pages, read newest first (`?sort=createDate-&delta=60&start=<n>`).

```text
timer (after the homepage) / pnpm crawl:archive
  → read each listing's first page (every page with crawl:archive)
  → store posts not stored yet; give stored ones the categories their labels add
  → read the pages of up to 20 articles without a body, newest first (all of them with crawl:archive)
```

- **Only adds.** A listing never removes or replaces anything, and a stored article keeps the kind and category the
  homepage gave it. A listing page that fails is logged and read again next run.
- **Labels become categories.** Each post carries the old site's tags and categories (`آموزش`, `دانشجوئی و فرهنگی`,
  `اخبار تحصلات تکمیلی`), mapped in `LABEL_CATEGORIES`. The narrowest is the article's `category`, its card's kicker;
  the others go in `topics`, so the archive's topic filter finds a notice under each. `LABEL_KINDS` turns a post into
  an achievement, a course or an incubator story. A label not in the maps is ignored; add it there when the editors
  start a new one.
- **Pages come later.** A listed post is stored with its title, date and thumbnail only, and links to the old site
  until its own page is read like a homepage article's (body, lead, date, the old site's ID for `/articles/<id>`). A
  page that fails to load waits behind the untried ones.
- **Years follow the language.** The year filter is Jalali on `/news` and Gregorian on `/en/news`.

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

| Way                  | When                                                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The server's timer   | Every `HOME_FEED_SYNC_MINUTES` (default 30). The first run is 30 seconds after start. `0` turns it off.                                                                                          |
| `pnpm crawl:home`    | By hand, in development; on the server `deploy/deploy.sh seed feed`. Needs no server running and no secret. Reads every page it needs in one go. `--refresh` reads every article's page again.   |
| `pnpm crawl:archive` | The archive, by hand: every listing page, then every unread article page. `-- --listings-only`, `--pages <n>` and `--articles <n>` cut it short. On the server: `deploy/deploy.sh seed archive`. |
| `homeFeed.sync`      | On demand over HTTP, with the secret. A call during a timed run joins it.                                                                                                                        |

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

1. Delete `parse.server.ts`, `listing.server.ts`, `source.server.ts`, `sync.server.ts`, `validation.ts`, the
   `fixtures/` folder, `parse.server.test.ts`, `src/db/sync-home-feed.ts` and `src/db/sync-feed-archive.ts` with their
   `crawl:home` and `crawl:archive` scripts, the `seed archive` and `seed feed` parts in `tools/deploy` with their
   bundles in the `Dockerfile`, and the home-feed lines in `deploy/steps/needs-step.txt`.
2. Delete `syncHomeFeed`, `syncFeedArchive` and their helpers from `service.ts`, the `sync` procedure and contract, and the
   `startHomeFeedSync()` call in `src/server.ts`.
3. Remove both variables from `src/env.server.ts`, `.env.example`, `.env.production.example`, `compose.prod.yaml`,
   the deploy tool's settings registry (`tools/deploy/internal/settings/settings.go`) and `playwright.config.ts`.
4. Keep the tables, `homeFeed.get`, `homeFeed.article`, `homeFeed.list` and `article-body.ts`. Editors' tools write
   the same rows; a placement says where an article shows. Articles written here have no old-site ID, so the page's
   address needs an ID of their own then.
