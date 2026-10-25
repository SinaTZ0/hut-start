import { readFileSync } from "node:fs";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { db } from "#/db/client.server";
import { feedArticle, feedPlacement } from "#/db/schema";
import { SOURCE_ORIGIN } from "#/orpc/home-feed/constants";
import { getHomeFeed, syncHomeFeed, type FetchPage } from "#/orpc/home-feed/service";

/*===== Home Feed Sync =====*/
// Runs against the real database (`DATABASE_URL`, after `pnpm db:push`), with the old site replaced by the fixtures.
// A sync replaces the whole feed, so the feed already there is saved first and put back afterwards.

const homePage = readFileSync(new URL("fixtures/home.html", import.meta.url), "utf8");
const articlePage = readFileSync(new URL("fixtures/article.html", import.meta.url), "utf8");

let saved: { articles: (typeof feedArticle.$inferSelect)[]; placements: (typeof feedPlacement.$inferSelect)[] };

/** The old site as the fixtures, counting the article pages read. */
function fakeSite() {
  const site = { articlePages: 0, fetchPage: (async () => "") as FetchPage };
  site.fetchPage = async (url) => {
    if (url === `${SOURCE_ORIGIN}/`) return homePage;
    site.articlePages++;
    return articlePage;
  };
  return site;
}

beforeAll(async () => {
  saved = {
    articles: await db.select().from(feedArticle),
    placements: await db.select().from(feedPlacement),
  };
});

afterAll(async () => {
  await db.transaction(async (tx) => {
    await tx.delete(feedArticle);
    if (saved.articles.length > 0) await tx.insert(feedArticle).values(saved.articles);
    if (saved.placements.length > 0) await tx.insert(feedPlacement).values(saved.placements);
  });
  await db.$client.end();
});

describe("home feed sync", () => {
  it("mirrors the old homepage, reading a new article's page once for its full title", async () => {
    const site = fakeSite();

    const first = await syncHomeFeed({ db, fetchPage: site.fetchPage, pauseMs: 0 });
    if (first.kind !== "success") throw new Error("expected the sync to succeed");

    const feed = await getHomeFeed({ db });
    expect(feed.news.map((item) => item.url)).toEqual([
      "https://hut.ac.ir/fa/w/sports-week",
      "https://hut.ac.ir/fa/w/quran-festival",
    ]);
    // The cut-short title is replaced by the article page's; the story and the achievement are one article.
    expect(feed.achievements[0]?.title).toBe(
      "درخشش دو دانشجوی دانشگاه صنعتی همدان در مرحله نیمه‌نهایی چهلمین جشنواره قرآن و عترت",
    );
    expect(feed.achievements[0]?.id).toBe(feed.news[1]?.id);
    // Every notice tab feeds «latest»; the placeholder image counts as none.
    expect(feed.notices.latest).toHaveLength(5);
    expect(feed.notices.graduate[0]?.imageUrl).toBeNull();
    expect(feed.spotlight?.title).toBe("طرح احوال پرسی پسا جنگ");

    // Nothing new on the second run: no article page is read again.
    const pagesBefore = site.articlePages;
    const second = await syncHomeFeed({ db, fetchPage: site.fetchPage, pauseMs: 0 });
    expect(second).toMatchObject({ kind: "success", summary: { added: 0, updated: 0, removed: 0, enriched: 0 } });
    expect(site.articlePages).toBe(pagesBefore);
  });

  it("keeps the last good feed when the old homepage can't be read or has changed", async () => {
    const before = await getHomeFeed({ db });

    const down = await syncHomeFeed({
      db,
      fetchPage: async () => {
        throw new Error("timeout");
      },
    });
    const changed = await syncHomeFeed({ db, fetchPage: async () => "<html><body>new layout</body></html>" });

    expect(down.kind).toBe("source-failed");
    expect(changed.kind).toBe("source-failed");
    expect(await getHomeFeed({ db })).toEqual(before);
  });
});
