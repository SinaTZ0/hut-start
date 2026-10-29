---
name: how-update-server
description: How a change in this repo reaches the production server (new.hut.ac.ir) and what has to be run there besides `deploy/deploy.sh update`. Use at the end of any task that changes code, data or settings, whenever the user asks "HOW UPDATE SERVER", "what do I run on the server", "does this need a seed", "will the server show this", "how do I deploy this", or before telling the user a change is live. Classifies the diff (code, migration, department/page seed data, home-feed parsing, .env variable, Caddy/Compose, the deploy tool itself) and gives the exact commands in order, with what each one overwrites.
---

# How Update Server

`deploy/deploy.sh update` on the server brings over **code**: it pulls `main`, rebuilds the image, runs pending
migrations and swaps the app without downtime (`docs/deployment.md` → Updating). It never changes **data that's already
in the database**. Seed files, the home feed's stored articles and the admin role are data, so a change to them needs
its own command after the update. This skill works out which ones.

## Steps

1. **Find the changes the server doesn't have yet.** The server runs whatever `origin/main` was at its last update.
   Ask the user which commit the server is on if you don't know; otherwise use the commits of this task:

   ```bash
   git fetch -q && git log --oneline origin/main..HEAD   # committed here, not pushed yet
   git diff --stat <server-commit>..HEAD                  # everything the next update brings
   git status --short                                     # not committed: the server won't get it
   ```

   Uncommitted or unpushed work never reaches the server: `update` pulls from GitHub. Commit and push only when the
   user asks (memory: commit only when asked).

2. **Match every changed path against the table below** and collect the extra steps. Several rows can apply.

3. **Tell the user**, in this order: push (if needed) → `deploy/deploy.sh update` → each extra command → what to check
   on the site. Say plainly when nothing beyond `update` is needed. For every `--replace`, say what it deletes, and ask
   whether editors have changed that content on the site, because those edits are lost.

Run commands on the server only when the user asks; the server is reached over SSH (see the deploy memory), and
everything below is typed in the checkout there (`~/hut`) or picked from the `deploy/deploy.sh` menu.

## What Each Change Needs

| Changed paths                                                                 | On the server, after `update`                                                                                                     |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `src/routes/`, `src/components/`, `src/styles.css`, `src/orpc/**` logic, `messages/*.json`, `public/` | Nothing. The new image serves it.                                                                                   |
| `src/db/schema.ts` **with** a new file in `drizzle/`                          | Nothing: `update` runs the migration. Drops or renames still read by the old code: split over two deploys (`docs/deployment.md` → Database Changes). |
| `src/db/schema.ts` **without** a new `drizzle/` file                          | Stop: the migration is missing. `pnpm db:generate`, check it, commit it with the code. The server would run code against an old schema. |
| `src/db/departments/<slug>.ts` edited                                         | `deploy/deploy.sh seed departments --replace <slug>` (deletes that department's members, tracks, documents, milestones and photos, reloads them, downloads the photos again). |
| `src/db/departments/<slug>.ts` new, or a new entry in `DEPARTMENTS`           | `deploy/deploy.sh seed departments` (loads only the missing ones, no `--replace`).                                                |
| `src/db/pages/offices.ts`                                                     | `deploy/deploy.sh seed pages --replace offices library`. Replacing the offices drops their library sections too (cascade); naming `library` in the same run loads those back. |
| `src/db/pages/library.ts`                                                     | `deploy/deploy.sh seed pages --replace library`                                                                                   |
| `src/db/pages/directory.ts`                                                   | `deploy/deploy.sh seed pages --replace phonebook` (the part is called `phonebook`, the file `directory.ts`).                     |
| `src/db/seed-departments.ts`, `seed-pages.ts`, `seed-media.ts` (how it loads) | Loaded rows don't change. If the fix should reach them, the matching `--replace` above, for every department or part it affects (`--replace` with no names = all of them). |
| `src/orpc/home-feed/parse.server.ts`, `validation.ts`, `article-body.ts` (how an article is read or cleaned before it's stored; `mapper.ts` works on read, so it needs nothing) | Stored articles keep the old result until a refresh: `curl -X POST -H "Authorization: Bearer $HOME_FEED_SYNC_SECRET" -H "content-type: application/json" -d '{"json":{"refresh":true}}' https://new.hut.ac.ir/rpc/homeFeed/sync` (the secret is in the server's `.env`). New articles get it on the next timer run. |
| `src/orpc/home-feed/listing.server.ts` (the archive listings)                 | `deploy/deploy.sh seed archive --listings-only`, or wait: the timer reads the listings every `HOME_FEED_SYNC_MINUTES` (30).       |
| Homepage blocks read by the sync (`sync.server.ts`, `source.server.ts`)       | Nothing; the next timer run (≤ 30 min) uses it. To see it at once, the `curl` above without `refresh`.                            |
| `src/env.server.ts` + `.env.production.example` (a new variable)              | `update` adds it to `.env`, generates it or asks for it. On a terminal, answer the prompt; from cron the update stops before the build until it's set (`deploy/deploy.sh env`). Check all four places in `docs/deployment.md` → Adding a Variable. |
| `deploy/Caddyfile`, `compose.prod.yaml`, `Dockerfile`, `deploy/*.mjs`          | Nothing extra: `update` rebuilds, applies Compose and reloads Caddy.                                                             |
| `tools/deploy/**` (the Go deploy tool)                                        | Before committing: `pnpm deploy:build`, commit `deploy/bin/` with it (the pre-commit hook enforces it). `update` then hands over to the pulled tool. |
| `tools/error-viewer/**`                                                       | Nothing; it restarts in place when its image changes (down a few seconds).                                                        |
| A new admin is needed                                                         | `deploy/deploy.sh admin <email>` after they sign up.                                                                              |

Content an editor adds or edits on the site (departments, offices, news in the app) is already on the server; it needs
no deploy at all.

## Checking It Worked

- `deploy/deploy.sh status`: the app is healthy and on the new version.
- Open the changed page on `https://new.hut.ac.ir` (and `/en/...` when text changed). A seeded department lives at
  `/departments/<slug>`, offices at `/offices/<slug>`, the phone book at `/phonebook`, forms at `/forms`.
- A seed prints `Skipped <name>: it exists` for what it left alone. Seeing that for the thing you meant to change means
  `--replace` was missing.
- Errors from the new code show in the error viewer (`ERRORS_DOMAIN`).

## Keep This Current

When a new kind of server-side data or a new `deploy/deploy.sh` command appears (a new seed part, a new sync, a new
setting), add its row here in the same change.
