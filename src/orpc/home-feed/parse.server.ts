import { load, type Cheerio, type CheerioAPI } from "cheerio";

import type {
  ArticleAttachment,
  ArticleBlock,
  ArticleInline,
  ArticleMark,
  ArticleParagraph,
  ArticleText,
} from "#/orpc/home-feed/article-body";
import { SOURCE_ORIGIN, type FeedCategory, type FeedKind } from "#/orpc/home-feed/constants";

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
  { instance: "smis", kind: "growth", category: "growth", keep: 3 },
  { instance: "qill", kind: "event", category: "openEducation", keep: 3 },
  { instance: "jclk", kind: "occasion", category: "university", keep: 1, optional: true },
];

const PORTLET_ID_PREFIX = "p_p_id_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_";

/*===== Types =====*/
// cheerio's node types, named without depending on `domhandler`, which defines them.
type Element = ReturnType<Cheerio<never>["children"]> extends Cheerio<infer T> ? T : never;
type AnyNode = Parameters<CheerioAPI["html"]>[0] extends infer T ? Exclude<T, string | undefined | null> : never;

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

/**
 * An article's own page. `body` is raw like the rest: its text is as typed and its links as written, made absolute;
 * `validation.ts` cleans both.
 */
export type RawArticle = Omit<RawItem, "href"> & { body: ArticleBlock[]; source: string | null };

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
// An article's page repeats its template twice (`.header` + `.body`, once more for print); the first is read. Its body
// is CKEditor HTML, often pasted from Word or from the university's Telegram channel, and is turned into the article
// page's Tiptap JSON (`article-body.ts`), keeping only what that page draws.

// Shorter paragraphs in an article's body are a dateline or the channel's sign-off.
const LEAD_MIN_LENGTH = 60;
// Posts copied from the university's channel start paragraphs with an emoji or a bullet (✳️ 🎖 ◀️).
const LEADING_SYMBOLS = /^[^\p{L}\p{N}«"(]+/u;
// A news lead opens with who reports it: «به گزارش روابط‌عمومی دانشگاه صنعتی همدان:».
const DATELINE = /^به گزارش [^:]{0,80}:\s*/;

/** Whitespace collapsed; null when nothing is left. */
function plainOf(nodes: ArticleInline[] | undefined): string {
  return (nodes ?? [])
    .map((node) => (node.type === "text" ? node.text : " "))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

/** Text reduced to its letters and digits' order, for telling whether two lines say the same thing. */
function comparable(value: string): string {
  return value.replace(/[\s‌«»:؛،.!?"'()\-–—]/g, "").replace(LEADING_SYMBOLS, "");
}

/** Whether one line opens with the other: a first paragraph repeating the title, or a description that only does. */
function repeats({ line, title }: { line: string; title: string }): boolean {
  const a = comparable(line);
  const b = comparable(title);
  if (!a || !b) return false;
  return a.startsWith(b.slice(0, 30)) || b.startsWith(a.slice(0, 30));
}

/*------ Inline ------*/
// Marks the page keeps: bold and links. The rest (spans, fonts, underline, Word's styling) is dropped, its text kept.

function withMark(marks: ArticleMark[], mark: ArticleMark): ArticleMark[] {
  return marks.some((known) => known.type === mark.type) ? marks : [...marks, mark];
}

/** An `href` as written in the page, made absolute; null for one that isn't a URL or that goes nowhere (`#`). */
function absoluteHref(href: string | undefined): string | null {
  if (!href || href.startsWith("#")) return null;
  try {
    return new URL(href, SOURCE_ORIGIN).href;
  } catch {
    return null;
  }
}

function inlineOf({ $, element, marks = [] }: { $: CheerioAPI; element: AnyNode; marks?: ArticleMark[] }) {
  const out: ArticleInline[] = [];
  for (const child of $(element).contents().toArray()) {
    if (child.type === "text") {
      // A soft hyphen pasted from Word stands where a half-space belongs.
      const text = child.data.replace(/­/g, "‌").replace(/[\s​]+/g, " ");
      if (text) out.push({ type: "text", text, ...(marks.length > 0 ? { marks } : {}) });
      continue;
    }
    if (child.type !== "tag") continue;

    const tag = child.tagName.toLowerCase();
    if (tag === "br") out.push({ type: "hardBreak" });
    else if (tag === "img" || tag === "script" || tag === "style") continue;
    else if (tag === "b" || tag === "strong") {
      out.push(...inlineOf({ $, element: child, marks: withMark(marks, { type: "bold" }) }));
    } else if (tag === "a") {
      const href = absoluteHref($(child).attr("href"));
      const linked = href ? withMark(marks, { type: "link", attrs: { href } }) : marks;
      out.push(...inlineOf({ $, element: child, marks: linked }));
    } else out.push(...inlineOf({ $, element: child, marks }));
  }
  return out;
}

const sameMarks = (a: ArticleText, b: ArticleText) => JSON.stringify(a.marks) === JSON.stringify(b.marks);
const isBlank = (node: ArticleInline | undefined) =>
  node?.type === "hardBreak" || (node?.type === "text" && !node.text.trim());

// Editors type `**bold**` as in Telegram, and write the old site's subdomains as bare text.
const INLINE_HINTS = /(\*\*[^*]+\*\*|\b(?:[a-z0-9-]+\.)*hut\.ac\.ir\b)/i;

/** Splits a run on `**bold**` and bare `*.hut.ac.ir` addresses, which become marks. */
function hinted(node: ArticleText): ArticleText[] {
  const marks = node.marks ?? [];
  return node.text
    .split(INLINE_HINTS)
    .filter(Boolean)
    .map((part): ArticleText => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return { type: "text", text: part.slice(2, -2), marks: withMark(marks, { type: "bold" }) };
      }
      if (/hut\.ac\.ir$/i.test(part) && !marks.some((mark) => mark.type === "link")) {
        return {
          type: "text",
          text: part,
          marks: withMark(marks, { type: "link", attrs: { href: `https://${part.toLowerCase()}` } }),
        };
      }
      return { ...node, text: part };
    });
}

/** Neighbouring runs with the same marks merged, blank lines at either end dropped, the ends trimmed. */
function tidy(nodes: ArticleInline[]): ArticleInline[] {
  const merged: ArticleInline[] = [];
  for (const node of nodes) {
    const previous = merged.at(-1);
    if (node.type === "text" && previous?.type === "text" && sameMarks(previous, node)) {
      merged[merged.length - 1] = { ...previous, text: previous.text + node.text };
    } else merged.push(node);
  }
  while (isBlank(merged[0])) merged.shift();
  while (isBlank(merged.at(-1))) merged.pop();

  const first = merged[0];
  if (first?.type === "text") merged[0] = { ...first, text: first.text.trimStart() };
  const last = merged.at(-1);
  if (last?.type === "text") merged[merged.length - 1] = { ...last, text: last.text.trimEnd() };

  return merged.flatMap((node): ArticleInline[] => (node.type === "text" ? hinted(node) : [node]));
}

function paragraphOf(content: ArticleInline[]): ArticleParagraph {
  return { type: "paragraph", content };
}

/*------ Blocks ------*/
// A link into the old site's document library, to a file rather than a photo, is an attachment wherever it sits.
const FILE_PATH = /\/documents\/.+\.(pdf|docx?|xlsx?|pptx?|zip|rar)(\/|$)/i;

function attachmentOf({ $, link }: { $: CheerioAPI; link: Element }): ArticleAttachment | null {
  const href = absoluteHref($(link).attr("href"));
  if (!href) return null;
  const path = decodeURIComponent(new URL(href).pathname);
  const match = FILE_PATH.exec(path);
  if (!match) return null;

  const fileName =
    path
      .split("/")
      .find((part) => /\.\w{2,4}$/.test(part))
      ?.replace(/\+/g, " ") ?? "";
  const label = cleanText($(link).text().replace(/[​]/g, "")) ?? fileName;
  return { type: "attachment", attrs: { href, label, ext: (match[1] ?? "").toLowerCase(), size: null } };
}

/** A size attribute as a whole number of pixels, or null. */
function pixels(value: string | undefined): number | null {
  const number = Number.parseInt(value ?? "", 10);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function tableOf({ $, table }: { $: CheerioAPI; table: Element }): ArticleBlock | null {
  const rows = $(table)
    .find("tr")
    .toArray()
    .map((row) =>
      $(row)
        .find("td, th")
        .toArray()
        .map((cell) => tidy(inlineOf({ $, element: cell }))),
    )
    .filter((cells) => cells.some((cell) => plainOf(cell)));
  const [head, ...rest] = rows;
  if (!head || rest.length === 0) return null;

  return {
    type: "table",
    content: [
      { type: "tableRow", content: head.map((cell) => ({ type: "tableHeader", content: [paragraphOf(cell)] })) },
      ...rest.map((cells) => ({
        type: "tableRow" as const,
        content: cells.map((cell) => ({ type: "tableCell" as const, content: [paragraphOf(cell)] })),
      })),
    ],
  };
}

/** The body's top-level elements as blocks, in order. */
function blocksOf({ $, body }: { $: CheerioAPI; body: Element }): ArticleBlock[] {
  const out: ArticleBlock[] = [];

  for (const element of $(body).children().toArray()) {
    const tag = element.tagName.toLowerCase();
    const node = $(element);
    if (["link", "script", "style"].includes(tag) || node.is("#inline-gallery-container")) continue;

    if (tag === "table") {
      const table = tableOf({ $, table: element });
      if (table) out.push(table);
      continue;
    }

    if (tag === "ul" || tag === "ol") {
      const items = node
        .children("li")
        .toArray()
        .map((item) => tidy(inlineOf({ $, element: item })))
        .filter((content) => plainOf(content))
        .map((content) => ({ type: "listItem" as const, content: [paragraphOf(content)] }));
      if (items.length > 0) out.push({ type: tag === "ol" ? "orderedList" : "bulletList", content: items });
      continue;
    }

    const images = node.find("img").toArray();
    const files = node
      .find("a[href]")
      .toArray()
      .map((link) => attachmentOf({ $, link }))
      .filter((file) => file !== null);
    if (files.length > 0 && images.length === 0) {
      out.push(...files);
      continue;
    }

    // A photo splits its paragraph: the photo, then the text around it.
    for (const image of images) {
      const src = absoluteHref($(image).attr("src"));
      if (!src) continue;
      out.push({
        type: "image",
        attrs: {
          src,
          alt: cleanText($(image).attr("alt")) ?? "",
          width: pixels($(image).attr("width")),
          height: pixels($(image).attr("height")),
        },
      });
    }

    const content = tidy(inlineOf({ $, element }));
    if (!plainOf(content)) continue;
    if (/^h[1-6]$/.test(tag)) {
      out.push({ type: "heading", attrs: { level: tag === "h1" || tag === "h2" ? 2 : 3 }, content });
    } else out.push(paragraphOf(content));
  }
  return out;
}

/*------ Channel Habits ------*/
// Posts copied from the channel mark their structure with emoji: ✳️ before a heading, ◀️ before each point, 🖋 before
// the sign-off, and a footer of ornaments and the channel's handle. They become a heading, a list, the article's
// source, and nothing.

const MARKER = /^[\s‌]*(✳️|✳|◀️|◀|🔹|🔸|▪️|🔻|🎖|📌|🖋️|🖋)\s*/u;
const CHANNEL_FOOTER = /┅|🆔|hut_univ|@hut/u;
const HEADING_MAX_LENGTH = 90;
const POINT_MAX_LENGTH = 180;

function markerOf(text: string): string | null {
  return MARKER.exec(text)?.[1]?.replace("️", "") ?? null;
}

/** The paragraph without its leading marker. */
function unmarked(paragraph: ArticleParagraph): ArticleInline[] {
  const [first, ...rest] = paragraph.content ?? [];
  if (first?.type !== "text") return paragraph.content ?? [];
  const text = first.text.replace(MARKER, "");
  return text ? [{ ...first, text }, ...rest] : rest;
}

/**
 * The channel's markers turned into structure, and what the page shows elsewhere dropped: a first paragraph that
 * repeats the title, and the lead (shown above the body), which may carry a dateline («به گزارش …:») before it.
 */
function structured({ blocks, title, lead }: { blocks: ArticleBlock[]; title: string; lead: string | null }) {
  let source: string | null = null;
  const out: ArticleBlock[] = [];
  let openList: Extract<ArticleBlock, { type: "bulletList" }> | null = null;

  for (const block of blocks) {
    if (block.type !== "paragraph") {
      out.push(block);
      openList = null;
      continue;
    }

    const text = plainOf(block.content);
    if (CHANNEL_FOOTER.test(text)) continue;
    const marker = markerOf(text);
    if (marker === "🖋") {
      source = text.replace(MARKER, "");
      continue;
    }

    const content = marker ? unmarked(block) : (block.content ?? []);
    const line = plainOf(content);
    if (out.length === 0 && repeats({ line, title })) continue;
    if (lead && comparable(line).includes(comparable(lead)) && line.length <= lead.length + 60) continue;

    if (marker === "✳" && line.length <= HEADING_MAX_LENGTH) {
      // A heading's weight is its own; bold inside it is the editor's emphasis on the whole line.
      const unbolded = content.map((node) =>
        node.type === "text" ? { type: "text" as const, text: node.text } : node,
      );
      out.push({ type: "heading", attrs: { level: 2 }, content: unbolded });
      openList = null;
      continue;
    }
    if (marker === "◀" && line.length <= POINT_MAX_LENGTH) {
      const item = { type: "listItem" as const, content: [paragraphOf(content)] };
      if (openList) openList.content.push(item);
      else {
        openList = { type: "bulletList", content: [item] };
        out.push(openList);
      }
      continue;
    }
    out.push(paragraphOf(content));
    openList = null;
  }

  // A list of one was a marked paragraph.
  const blocksOut = out.map((block) =>
    block.type === "bulletList" && block.content.length === 1 ? (block.content[0]?.content[0] ?? block) : block,
  );
  return { blocks: blocksOut, source };
}

/*------ Gallery ------*/
// The page's photo set is a lightGallery whose slides are listed in a script: `dynamicEl: [{ src: '…', thumb: … }]`.
const GALLERY_SLIDE = /src:\s*'([^']+)',\s*thumb/g;

function galleryOf(scripts: string[]): ArticleBlock | null {
  const sources = new Set<string>();
  for (const script of scripts) {
    for (const match of script.matchAll(GALLERY_SLIDE)) {
      const src = absoluteHref(match[1]);
      if (src) sources.add(src);
    }
  }
  if (sources.size === 0) return null;
  return { type: "gallery", attrs: { images: [...sources].map((src) => ({ src, alt: "" })) } };
}

/*------ Page ------*/
/** The first paragraph of the article's body that is its lead: long enough, and not the title repeated. */
function leadParagraph({ blocks, title }: { blocks: ArticleBlock[]; title: string }): string | null {
  for (const block of blocks) {
    if (block.type !== "paragraph") continue;
    const text = plainOf(block.content).replace(LEADING_SYMBOLS, "").replace(DATELINE, "");
    if (text.length >= LEAD_MIN_LENGTH && !repeats({ line: text, title })) return text;
  }
  return null;
}

/**
 * An article's own page: its full title, its lead as the summary, its date, photo and ID, and its body as blocks
 * with the lead and a repeated title left out. Null when the page has no title (not an article).
 */
export function parseArticlePage(html: string): RawArticle | null {
  const $ = load(html);
  const title = cleanText($('meta[property="og:title"]').attr("content"));
  if (!title) return null;

  const content = $(".main-new-content").first();
  const body = content.find(".body").first();
  const scripts = content
    .find("script")
    .toArray()
    .map((script) => $(script).html() ?? "");

  // The article's own date is in its header; the page's other blocks have dates of their own.
  const date = [...datesById(scripts).values()][0];
  const blocks = body.length > 0 ? blocksOf({ $, body: body.get(0) as Element }) : [];

  // The editor's description when there is one, else the body's lead. A description that only repeats the title
  // isn't a lead.
  const description =
    cleanText($('meta[property="og:description"]').attr("content")) ??
    cleanText($('meta[name="description"]').attr("content"));
  const summary =
    description && !repeats({ line: description, title: title }) ? description : leadParagraph({ blocks, title });

  const structuredBody = structured({ blocks, title, lead: summary });
  const gallery = galleryOf(scripts);
  if (gallery) structuredBody.blocks.push(gallery);

  return {
    title,
    summary,
    publishedOn: date ?? null,
    image: cleanText(content.find(".header img").first().attr("src")),
    sourceAssetId: cleanText($("[data-analytics-asset-id]").first().attr("data-analytics-asset-id")),
    body: structuredBody.blocks,
    source: structuredBody.source,
  };
}
