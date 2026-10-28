import { readFileSync } from "node:fs";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { db } from "#/db/client.server";
import { feedArticle, feedPlacement } from "#/db/schema";
import { SOURCE_ORIGIN } from "#/orpc/home-feed/constants";
import { getArticle, getHomeFeed, syncHomeFeed, type FetchPage, type Measure } from "#/orpc/home-feed/service";

/*===== Home Feed Sync =====*/
// Runs against the real database (`DATABASE_URL`, after `pnpm db:push`), with the old site replaced by the fixtures.
// A sync replaces the whole feed, so the feed already there is saved first and put back afterwards.

const homePage = readFileSync(new URL("fixtures/home.html", import.meta.url), "utf8");
const articlePage = readFileSync(new URL("fixtures/article.html", import.meta.url), "utf8");

// The fixtures' photos and files aren't fetched: every one measures as unknown.
const measure: Measure = { image: async () => null, file: async () => null };

let saved: { articles: (typeof feedArticle.$inferSelect)[]; placements: (typeof feedPlacement.$inferSelect)[] };

/**
 * The old site as the fixtures, counting the article pages read. Only the festival story's page is in them; every
 * other article's page loads without an article in it.
 */
function fakeSite({ home = homePage }: { home?: string } = {}) {
  const site = { articlePages: 0, fetchPage: (async () => "") as FetchPage };
  site.fetchPage = async (url) => {
    if (url === `${SOURCE_ORIGIN}/`) return home;
    site.articlePages++;
    return url.includes("/quran-festival") ? articlePage : "<html><body></body></html>";
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

    const first = await syncHomeFeed({ db, fetchPage: site.fetchPage, measure, pauseMs: 0 });
    if (first.kind !== "success") throw new Error("expected the sync to succeed");

    const feed = await getHomeFeed({ db });
    // A card links to its article page here once the old one has been read with an article in it.
    expect(feed.news.map((item) => item.url)).toEqual(["https://hut.ac.ir/fa/w/sports-week", "/articles/19148970"]);
    // The cut-short title is replaced by the article page's; the story and the achievement are one article.
    expect(feed.achievements[0]?.title).toBe(
      "درخشش دو دانشجوی دانشگاه صنعتی همدان در مرحله نیمه‌نهایی چهلمین جشنواره قرآن و عترت",
    );
    expect(feed.achievements[0]?.id).toBe(feed.news[1]?.id);
    // Every notice tab feeds «latest»; the placeholder image counts as none.
    expect(feed.notices.latest).toHaveLength(5);
    expect(feed.notices.latest.filter((item) => item.imageUrl?.includes("placeholder"))).toEqual([]);
    expect(feed.spotlight?.title).toBe("طرح احوال پرسی پسا جنگ");

    // Nothing new on the second run: no article page is read again.
    const pagesBefore = site.articlePages;
    const second = await syncHomeFeed({ db, fetchPage: site.fetchPage, measure, pauseMs: 0 });
    expect(second).toMatchObject({ kind: "success", summary: { added: 0, updated: 0, removed: 0, enriched: 0 } });
    expect(site.articlePages).toBe(pagesBefore);
  });

  it("keeps an article's page after the old homepage drops the article", async () => {
    const site = fakeSite();
    await syncHomeFeed({ db, fetchPage: site.fetchPage, measure, pauseMs: 0 });
    expect(await getArticle({ db, id: "19148970" })).toMatchObject({ kind: "success", article: { kind: "news" } });

    // The story (news and an achievement) leaves the old homepage: its cards go, its page stays.
    const dropped = fakeSite({ home: homePage.replaceAll("/fa/w/quran-festival", "/fa/w/next-story") });
    const run = await syncHomeFeed({ db, fetchPage: dropped.fetchPage, measure, pauseMs: 0 });
    expect(run).toMatchObject({ kind: "success", summary: { removed: 1 } });
    expect((await getHomeFeed({ db })).achievements.map((item) => item.url)).not.toContain("/articles/19148970");
    expect(await getArticle({ db, id: "19148970" })).toMatchObject({ kind: "success", article: { kind: "news" } });
  });

  it("keeps the last good feed when the old homepage can't be read or has changed", async () => {
    const before = await getHomeFeed({ db });

    const down = await syncHomeFeed({
      db,
      measure,
      fetchPage: async () => {
        throw new Error("timeout");
      },
    });
    const changed = await syncHomeFeed({
      db,
      measure,
      fetchPage: async () => "<html><body>new layout</body></html>",
    });

    expect(down.kind).toBe("source-failed");
    expect(changed.kind).toBe("source-failed");
    expect(await getHomeFeed({ db })).toEqual(before);
  });
});
