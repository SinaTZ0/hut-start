import { load } from "cheerio";

import type { FeedCategory, FeedKind } from "#/orpc/home-feed/constants";

/*===== Old Homepage Blocks =====*/
// hut.ac.ir is Liferay: each homepage block is an asset publisher, found by its instance ID. Its news and notices have
// no feed or open API (the headless API answers 403, the publishers' RSS redirects), so the HTML is read. When the old
// site moves or replaces a block, its instance ID changes; fix it here. `keep` is how many of the block's items the
// home page can show, so no more of their pages are read than that. An `optional` block may be gone or empty (the
// editors take the occasion slider down between occasions); every other block must be there.

type Block = { instance: string; kind: FeedKind; category: FeedCategory; keep: number; optional?: boolean };

export const BLOCKS: readonly Block[] = [
  { instance: "ekjl", kind: "news", category: "university", keep: 5 },
  { instance: "yaez", kind: "notice", category: "education", keep: 12 },
  { instance: "qicz", kind: "notice", category: "graduate", keep: 12 },
  { instance: "goeq", kind: "notice", category: "industry", keep: 12 },
  { instance: "srha", kind: "notice", category: "student", keep: 12 },
  { instance: "jtsr", kind: "notice", category: "openEducation", keep: 12 },
  { instance: "djmo", kind: "achievement", category: "university", keep: 3 },
  { instance: "smis", kind: "growth", category: "growth", keep: 2 },
  { instance: "qill", kind: "event", category: "openEducation", keep: 1 },
  { instance: "jclk", kind: "occasion", category: "university", keep: 1, optional: true },
];

const PORTLET_ID_PREFIX = "p_p_id_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_";

/*===== Types =====*/
/** An item as the page has it: raw text and attribute values, checked and normalized by `validation.ts`. */
export type RawItem = {
  href: string;
  title: string;
  summary: string | null;
  /** ISO date. */
  publishedOn: string | null;
  /** As written in the page: often relative, with the old site's own size parameters. */
  image: string | null;
  sourceAssetId: string | null;
};

export type RawBlock = Block & { items: RawItem[] };

export type RawArticle = Omit<RawItem, "href">;

/*===== Dates =====*/
// The old site writes every date into a script that formats it in the browser:
// `document.getElementById("pDate-u-id-0").innerHTML = moment('2026 10 25', 'YYYY MM DD')…`. The dates are Gregorian;
// the format string says which number is which.
const ELEMENT_ID = /getElementById\("([^"]+)"\)/;
const MOMENT_CALL = /moment\(['"](\d{1,4}) (\d{1,4}) (\d{1,4})['"],\s*['"]([YMD]+) ([YMD]+) ([YMD]+)['"]\)/;

/** The ISO date a `moment(…)` call in the script names, if it has one. */
function scriptDate(script: string): string | null {
  const match = MOMENT_CALL.exec(script);
  if (!match) return null;

  const parts: Record<string, string> = {};
  for (let index = 0; index < 3; index++) parts[match[4 + index]?.[0] ?? ""] = match[1 + index] ?? "";
  const { Y: year, M: month, D: day } = parts;
  if (!year || !month || !day) return null;
  return `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

/** Each date element's ISO date, from the scripts' sources. One script fills one element. */
function datesById(scripts: string[]): Map<string, string> {
  const dates = new Map<string, string>();
  for (const source of scripts) {
    const id = ELEMENT_ID.exec(source)?.[1];
    const date = scriptDate(source);
    if (id && date) dates.set(id, date);
  }
  return dates;
}

/*===== Fields =====*/
const BACKGROUND_URL = /url\(\s*['"]?([^'")]+)['"]?\s*\)/;

/** Whitespace collapsed; null when nothing is left. */
function cleanText(value: string | undefined): string | null {
  const text = value?.replace(/\s+/g, " ").trim();
  return text ? text : null;
}

/** The image an inline style sets as the background. */
function backgroundImage(style: string | undefined): string | null {
  return style ? (BACKGROUND_URL.exec(style)?.[1] ?? null) : null;
}

/*===== Homepage =====*/
// News slides are `.new`, the rest `a.splide__slide`, except the occasion slider's: a `div` with the photo as an
// `<img>` and the title as the link (`.parent-description`).
const SLIDES = ".new, a.splide__slide, .splide__slide:has(> .parent-description)";

/**
 * Reads the blocks in `BLOCKS` from the old homepage's HTML, in page order, each item once.
 *
 * @throws When a block that isn't optional is missing or has no items: the page's layout changed, and a partial
 * result would empty a block of the home page. The caller keeps the last good data.
 */
export function parseHomePage(html: string): RawBlock[] {
  const $ = load(html);

  return BLOCKS.map((block) => {
    const portlet = $(`[id="${PORTLET_ID_PREFIX}${block.instance}_"]`);
    if (portlet.length === 0) {
      if (block.optional) return { ...block, items: [] };
      throw new Error(`Old homepage block ${block.instance} (${block.kind}) not found`);
    }

    // `.html()`: a script's content is raw text, which `.text()` may leave out.
    const dates = datesById(
      portlet
        .find("script")
        .toArray()
        .map((script) => $(script).html() ?? ""),
    );
    const items = new Map<string, RawItem>();

    // The slider repeats slides for its loop, hence the dedupe.
    portlet.find(SLIDES).each((_, element) => {
      const slide = $(element);
      const href = slide.is("a") ? slide.attr("href") : slide.find("a[href]").first().attr("href");
      if (!href || items.has(href)) return;

      const titled = slide.find("[data-analytics-asset-title]").first();
      // The asset title is the full one; the visible heading is cut short with `...`.
      const title =
        cleanText(titled.attr("data-analytics-asset-title")) ?? cleanText(slide.find(".title").first().text());
      if (!title) return;

      const dateId = slide
        .find("[id]")
        .toArray()
        .map((node) => $(node).attr("id") ?? "")
        .find((id) => dates.has(id));

      items.set(href, {
        href,
        title,
        summary: cleanText(slide.find(".desc, .description").first().text()),
        publishedOn: dateId ? (dates.get(dateId) ?? null) : null,
        image:
          backgroundImage(slide.find('[style*="url("]').first().attr("style")) ??
          cleanText(slide.find("img[src]").first().attr("src")),
        sourceAssetId: cleanText(titled.attr("data-analytics-asset-id")),
      });
    });

    if (items.size === 0 && !block.optional) {
      throw new Error(`Old homepage block ${block.instance} (${block.kind}) has no items`);
    }
    return { ...block, items: [...items.values()].slice(0, block.keep) };
  });
}

/*===== Article Page =====*/
// Shorter paragraphs in an article's body are a dateline or the channel's sign-off.
const LEAD_MIN_LENGTH = 60;
// Posts copied from the university's channel start paragraphs with an emoji or a bullet (✳️ 🎖 ◀️).
const LEADING_SYMBOLS = /^[^\p{L}\p{N}«"(]+/u;

/** The first paragraph of the article's body that is its lead: long enough, and not the title repeated. */
function leadParagraph({ $, title }: { $: ReturnType<typeof load>; title: string }): string | null {
  for (const paragraph of $(".main-new-content .body p").toArray()) {
    const text = cleanText($(paragraph).text())?.replace(LEADING_SYMBOLS, "");
    if (text && text.length >= LEAD_MIN_LENGTH && !text.startsWith(title)) return text;
  }
  return null;
}

/** An article's own page: its full title, its lead paragraph as the summary, its date, photo and ID. */
export function parseArticlePage(html: string): RawArticle | null {
  const $ = load(html);
  const title = cleanText($('meta[property="og:title"]').attr("content"));
  if (!title) return null;

  // The article's own date is in its header; the page's other blocks have dates of their own.
  const date = [
    ...datesById(
      $(".main-new-content script")
        .toArray()
        .map((script) => $(script).html() ?? ""),
    ).values(),
  ][0];

  return {
    title,
    // The editor's description when there is one, else the body's lead.
    summary:
      cleanText($('meta[property="og:description"]').attr("content")) ??
      cleanText($('meta[name="description"]').attr("content")) ??
      leadParagraph({ $, title }),
    publishedOn: date ?? null,
    image: cleanText($(".main-new-content .header img").first().attr("src")),
    sourceAssetId: cleanText($("[data-analytics-asset-id]").first().attr("data-analytics-asset-id")),
  };
}
