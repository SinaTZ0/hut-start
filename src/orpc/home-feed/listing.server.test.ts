import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { classifyListed, LISTINGS, parseListingPage } from "#/orpc/home-feed/listing.server";
import { parseFeedItem } from "#/orpc/home-feed/validation";

/*===== Old Site Listings =====*/
// Like the homepage's parser, checked against the listings' real markup, cut down (`fixtures/listing.html`): a notice
// tagged both «تحصیلات تکمیلی» and «آموزش», an achievement from the news listing, and a workshop dated in a script.

const listingPage = readFileSync(new URL("fixtures/listing.html", import.meta.url), "utf8");
function listing(name: string) {
  const found = LISTINGS.find((candidate) => candidate.name === name);
  if (!found) throw new Error(`No listing ${name}`);
  return found;
}
const [news, notices, workshops] = [listing("news"), listing("notices"), listing("workshops")];

describe("parseListingPage", () => {
  it("reads each post's link, title, date, thumbnail and labels", () => {
    const [notice, achievement, workshop] = parseListingPage(listingPage);

    expect(notice).toMatchObject({
      title: "اطلاعیه دفاع دانشجویان کارشناسی ارشد",
      publishedOn: "2026-10-04",
      labels: ["تحصیلات تکمیلی", "آموزش", "اطلاعیه ها"],
    });
    expect(achievement).toMatchObject({ publishedOn: "2026-10-25", labels: ["اخبار", "دستاوردها و افتخارات"] });
    // The workshops listing writes its date into a script, in English.
    expect(workshop).toMatchObject({ publishedOn: "2025-11-04", image: null, labels: [] });
  });

  it("stores a post under the same address the homepage links to, with its photo at full size", () => {
    const [notice] = parseListingPage(listingPage);
    const parsed = notice && parseFeedItem(notice);

    expect(parsed?.ok && parsed.item.url).toBe("https://hut.ac.ir/fa/w/defense-notice");
    expect(parsed?.ok && parsed.item.imageUrl).not.toContain("imagePreview");
  });

  it("reads nothing from a page past the last", () => {
    expect(parseListingPage("<html><body><p>۰ نتیجه</p></body></html>")).toEqual([]);
  });
});

describe("classifyListed", () => {
  it("files a notice under its narrowest category and keeps the others as topics", () => {
    expect(classifyListed({ listing: notices, labels: ["تحصیلات تکمیلی", "آموزش", "اطلاعیه ها"] })).toEqual({
      kind: "notice",
      category: "graduate",
      topics: ["education"],
    });
  });

  it("turns a labelled news story into an achievement, and leaves an unlabelled notice the university's", () => {
    expect(classifyListed({ listing: news, labels: ["اخبار", "دستاوردها و افتخارات"] })).toMatchObject({
      kind: "achievement",
      category: "university",
    });
    expect(classifyListed({ listing: notices, labels: ["اطلاعیه ها"] })).toEqual({
      kind: "notice",
      category: "university",
      topics: [],
    });
    expect(classifyListed({ listing: workshops, labels: [] })).toMatchObject({
      kind: "event",
      category: "openEducation",
    });
  });
});
