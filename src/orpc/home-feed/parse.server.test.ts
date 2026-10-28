import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { BLOCKS, parseArticlePage, parseHomePage } from "#/orpc/home-feed/parse.server";

/*===== Old Homepage =====*/
// The parser is the part that breaks when the old site changes, so it's checked against its real markup, cut down
// (`fixtures/`). A missing block must fail the run rather than empty part of the home page.

const homePage = readFileSync(new URL("fixtures/home.html", import.meta.url), "utf8");
const articlePage = readFileSync(new URL("fixtures/article.html", import.meta.url), "utf8");

describe("parseHomePage", () => {
  it("reads every block's items with their link, title, date and image, each once", () => {
    const blocks = parseHomePage(homePage);

    expect(blocks.map((block) => block.instance)).toEqual(BLOCKS.map((block) => block.instance));

    const news = blocks.find((block) => block.kind === "news");
    expect(news?.items.map((item) => item.href)).toEqual([
      "https://hut.ac.ir/fa/w/sports-week?redirect=%2F",
      "https://hut.ac.ir/fa/w/quran-festival?redirect=%2F",
    ]);
    expect(news?.items[1]).toMatchObject({
      title: "درخشش دو دانشجوی دانشگاه صنعتی همدان در مرحله...",
      publishedOn: "2026-10-23",
      image: "/documents/38165/55248/festival.jpg/9c43deeb?t=1792904773956&imagePreview=1",
    });

    // A notice's full title is in its asset attributes; its date is written day first.
    const education = blocks.find((block) => block.category === "education");
    expect(education?.items[0]).toMatchObject({
      title: "اطلاعیه مهم در خصوص تاریخ و چگونگی ثبت‌نام پذیرفته‌شدگان مقطع کارشناسی ارشد سال 1405",
      publishedOn: "2026-10-21",
      sourceAssetId: "19129252",
    });
  });

  it("reads the occasion slider's poster, and leaves it empty when the slider is gone", () => {
    const occasion = parseHomePage(homePage).find((block) => block.kind === "occasion");
    expect(occasion?.items[0]).toMatchObject({
      href: "https://hut.ac.ir/fa/w/-778?redirect=%2F",
      title: "سالروز شهادت حضرت فاطمه زهرا (ع) تسلیت باد",
      image: "/documents/38165/467382/Fatemieh-katibeh.jpg/70e4ce1c?t=1792903443603&imagePreview=1",
    });

    const withoutOccasions = homePage.replace(
      "AssetPublisherPortlet_INSTANCE_jclk_",
      "AssetPublisherPortlet_INSTANCE_gone_",
    );
    expect(parseHomePage(withoutOccasions).find((block) => block.kind === "occasion")?.items).toEqual([]);
  });

  it("fails when a block is missing", () => {
    const withoutNews = homePage.replace(
      "AssetPublisherPortlet_INSTANCE_ekjl_",
      "AssetPublisherPortlet_INSTANCE_gone_",
    );

    expect(() => parseHomePage(withoutNews)).toThrow(/ekjl/);
  });
});

describe("parseArticlePage", () => {
  it("reads the full title, the date, and the body's lead when there is no description", () => {
    expect(parseArticlePage(articlePage)).toEqual({
      title: "درخشش دو دانشجوی دانشگاه صنعتی همدان در مرحله نیمه‌نهایی چهلمین جشنواره قرآن و عترت",
      summary:
        "دو دانشجوی دانشگاه صنعتی همدان در مرحله نیمه‌نهایی چهلمین جشنواره سراسری قرآن و عترت دانشجویان کشور به جمع برگزیدگان راه یافتند.",
      publishedOn: "2026-10-25",
      image: "/image/journal/article?img_id=19148975&t=1792741339978",
      sourceAssetId: "19148970",
    });
  });
});
