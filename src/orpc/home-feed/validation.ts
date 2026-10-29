import { z } from "zod";

import { normalizePersianText, persianText } from "#/lib/persian-text";
import { SOURCE_ORIGIN } from "#/orpc/home-feed/constants";
import type {
  ArticleBlock,
  ArticleBody,
  ArticleInline,
  ArticleParagraph,
  ArticleText,
} from "#/orpc/home-feed/article-body";
import type { RawArticle, RawItem } from "#/orpc/home-feed/parse.server";

/*===== Old Site URLs =====*/
// Only links and images on the old site itself are kept, so a compromised or mistyped block can't point the home page
// anywhere else. The messages are diagnostics for the sync's log; no visitor sees them.

const SOURCE_HOSTS = new Set(["hut.ac.ir", "www.hut.ac.ir"]);

/** The theme's stand-in for an item without a photo. Its size arrives glued to the path: `placeholder.jpg&width=350`. */
const PLACEHOLDER_IMAGE = /\/images\/placeholder\.[a-z]+(&|$)/;

/** `value` as an absolute https URL on the old site, or null. Plain http is upgraded: the old site redirects it. */
function sourceUrl(value: string): URL | null {
  let url: URL;
  try {
    url = new URL(value, SOURCE_ORIGIN);
  } catch {
    return null;
  }
  if (!SOURCE_HOSTS.has(url.hostname) || (url.protocol !== "https:" && url.protocol !== "http:")) return null;
  url.protocol = "https:";
  url.hash = "";
  return url;
}

/**
 * An article's address without `?redirect=` or `?p_l_back_url=` (the archive listings' back link), which only say which
 * page linked to it. Identifies it across runs and across the homepage and the listings.
 */
const articleUrlSchema = z.string().transform((value, context) => {
  const url = sourceUrl(value);
  if (!url) {
    context.addIssue({ code: "custom", message: `Not an old-site link: ${value}` });
    return z.NEVER;
  }
  url.searchParams.delete("redirect");
  url.searchParams.delete("p_l_back_url");
  return url.href;
});

/**
 * A photo at full size (the homepage asks for `width=350` thumbnails, the archive listings for `imagePreview=1`), or
 * null for none or the placeholder.
 */
const imageUrlSchema = z
  .string()
  .nullable()
  .transform((value) => {
    const url = value ? sourceUrl(value) : null;
    if (!url || PLACEHOLDER_IMAGE.test(url.pathname)) return null;
    url.searchParams.delete("width");
    url.searchParams.delete("imagePreview");
    return url.href;
  });

/*===== Text =====*/
const CUT_SHORT = /(\.{3}|…)$/;

/** Whether the old homepage cut the title short; the full one is on the article's page. */
export function isCutShort(title: string): boolean {
  return CUT_SHORT.test(title);
}

// The old site's editors type Latin digits into Persian text («سال 1405», «نیمسال 4051»), where the rest of the page has
// Persian ones. Digits inside a Latin word or code (B2B, IMG_9535) are left as they are.
const LATIN_NUMBER = /(?<![A-Za-z_0-9])[0-9]+(?![A-Za-z_])/g;

/** `value` with its standalone Latin numbers in Persian digits. */
function persianDigits(value: string): string {
  return value.replace(LATIN_NUMBER, (number) =>
    number.replace(/[0-9]/g, (digit) => String.fromCharCode(0x06f0 + Number(digit))),
  );
}

const titleSchema = persianText()
  .min(1)
  // One ellipsis character in place of three dots, in case the title stays cut short.
  .overwrite((value) => persianDigits(value.replace(/\.{3}$/, "…")));

// Posts copied from the university's channel scatter emoji through the text (✅ 🔴 ❇️); in a card's two lines of lead
// they're noise, and some draw as an empty box in the site's font.
const PICTOGRAPHS = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu;

// Stored whole: the article page shows it as the lead, and cards cut it short (`mapper.ts`).
const summarySchema = z
  .string()
  .nullable()
  .transform((value) => {
    const text = value
      ? persianDigits(normalizePersianText(value.replace(PICTOGRAPHS, "").replace(/\s{2,}/g, " ")))
      : "";
    return text || null;
  });

/*===== Items =====*/
const itemSchema = z.object({
  href: articleUrlSchema,
  title: titleSchema,
  summary: summarySchema,
  publishedOn: z.iso.date().nullable(),
  image: imageUrlSchema,
  sourceAssetId: z.string().regex(/^\d+$/).nullable().catch(null),
});

export type FeedItemInput = {
  url: string;
  title: string;
  cutShort: boolean;
  summary: string | null;
  publishedOn: string | null;
  imageUrl: string | null;
  sourceAssetId: string | null;
};

/** A homepage item checked and normalized for storing, or the reason it can't be. */
export function parseFeedItem(raw: RawItem): { ok: true; item: FeedItemInput } | { ok: false; reason: string } {
  const result = itemSchema.safeParse(raw);
  if (!result.success) return { ok: false, reason: z.prettifyError(result.error) };

  const { href, title, image, ...rest } = result.data;
  return { ok: true, item: { ...rest, url: href, title, cutShort: isCutShort(title), imageUrl: image } };
}

/*===== Article Body =====*/
// The body keeps the editors' emoji: in running text they're the channel's tone, not noise. Photos and files must be
// on the old site, like the cards' (they're hotlinked); links in the text may go anywhere on the web, but only there.

const LINK_PROTOCOLS = new Set(["https:", "http:", "mailto:", "tel:"]);

/** A text run normalized like the rest of the page, keeping the spaces at its ends that part it from its neighbours. */
function cleanRun(node: ArticleText): ArticleText | null {
  const marks = node.marks?.filter((mark) => {
    if (mark.type !== "link") return true;
    try {
      return LINK_PROTOCOLS.has(new URL(mark.attrs.href).protocol);
    } catch {
      return false;
    }
  });
  // A link's own text is often its address, whose digits stay as typed.
  const linked = marks?.some((mark) => mark.type === "link") ?? false;
  const inner = normalizePersianText(node.text);
  const text = `${/^\s/.test(node.text) ? " " : ""}${linked ? inner : persianDigits(inner)}${/\s$/.test(node.text) && inner ? " " : ""}`;
  if (!text) return null;
  return { type: "text", text, ...(marks && marks.length > 0 ? { marks } : {}) };
}

function cleanInline(nodes: ArticleInline[] | undefined): ArticleInline[] {
  return (nodes ?? []).flatMap((node): ArticleInline[] => {
    if (node.type !== "text") return [node];
    const run = cleanRun(node);
    return run ? [run] : [];
  });
}

function cleanParagraph(paragraph: ArticleParagraph): ArticleParagraph {
  return { type: "paragraph", content: cleanInline(paragraph.content) };
}

/** A photo or file on the old site, as a full-size https URL; null for anything else. */
function sourceFile(value: string): string | null {
  const url = sourceUrl(value);
  if (!url || PLACEHOLDER_IMAGE.test(url.pathname)) return null;
  url.searchParams.delete("width");
  return url.href;
}

function cleanBlock(block: ArticleBlock): ArticleBlock | null {
  switch (block.type) {
    case "paragraph":
      return cleanParagraph(block);
    case "heading":
      return { ...block, content: cleanInline(block.content) };
    case "bulletList":
    case "orderedList":
      return {
        ...block,
        content: block.content.map((item) => ({ ...item, content: item.content.map(cleanParagraph) })),
      };
    case "table":
      return {
        ...block,
        content: block.content.map((row) => ({
          ...row,
          content: row.content.map((cell) => ({ ...cell, content: cell.content.map(cleanParagraph) })),
        })),
      };
    case "image": {
      const src = sourceFile(block.attrs.src);
      return src ? { ...block, attrs: { ...block.attrs, src, alt: normalizePersianText(block.attrs.alt) } } : null;
    }
    case "gallery": {
      const images = block.attrs.images.flatMap((image) => {
        const src = sourceFile(image.src);
        return src ? [{ src, alt: normalizePersianText(image.alt) }] : [];
      });
      return images.length > 0 ? { type: "gallery", attrs: { images } } : null;
    }
    case "attachment": {
      const href = sourceUrl(block.attrs.href)?.href;
      const label = persianDigits(normalizePersianText(block.attrs.label));
      return href ? { ...block, attrs: { ...block.attrs, href, label } } : null;
    }
  }
}

/** The body with its text normalized and anything pointing off the old site (photos, files) or nowhere left out. */
function cleanBody(blocks: ArticleBlock[]): ArticleBody {
  return { type: "doc", content: blocks.map(cleanBlock).filter((block) => block !== null) };
}

/*===== Article Page =====*/
const articleSchema = itemSchema.omit({ href: true }).extend({
  source: z
    .string()
    .nullable()
    .transform((value) => (value ? persianDigits(normalizePersianText(value)) || null : null)),
});

export type FeedArticleInput = Omit<FeedItemInput, "url" | "cutShort"> & { body: ArticleBody; source: string | null };

/** An article page's fields, checked and normalized, or null when the page doesn't have them. */
export function parseFeedArticle(raw: RawArticle): FeedArticleInput | null {
  const { body, ...fields } = raw;
  const result = articleSchema.safeParse(fields);
  if (!result.success) return null;

  const { image, ...rest } = result.data;
  return { ...rest, imageUrl: image, body: cleanBody(body) };
}
