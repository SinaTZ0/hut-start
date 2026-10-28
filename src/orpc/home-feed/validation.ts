import { z } from "zod";

import { normalizePersianText, persianText } from "#/lib/persian-text";
import { SOURCE_ORIGIN } from "#/orpc/home-feed/constants";
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

/** An article's address without `?redirect=`, which only says which page linked to it. Identifies it across runs. */
const articleUrlSchema = z.string().transform((value, context) => {
  const url = sourceUrl(value);
  if (!url) {
    context.addIssue({ code: "custom", message: `Not an old-site link: ${value}` });
    return z.NEVER;
  }
  url.searchParams.delete("redirect");
  return url.href;
});

/** A photo at full size (the old site asks for `width=350` thumbnails), or null for none or the placeholder. */
const imageUrlSchema = z
  .string()
  .nullable()
  .transform((value) => {
    const url = value ? sourceUrl(value) : null;
    if (!url || PLACEHOLDER_IMAGE.test(url.pathname)) return null;
    url.searchParams.delete("width");
    return url.href;
  });

/*===== Text =====*/
const CUT_SHORT = /(\.{3}|…)$/;
const SUMMARY_MAX_LENGTH = 300;

/** Whether the old homepage cut the title short; the full one is on the article's page. */
export function isCutShort(title: string): boolean {
  return CUT_SHORT.test(title);
}

/** A lead paragraph short enough for a card, cut at a word and marked with an ellipsis. */
function shortSummary(value: string): string {
  if (value.length <= SUMMARY_MAX_LENGTH) return value;
  const cut = value.slice(0, SUMMARY_MAX_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(" ")).trimEnd()}…`;
}

// The old site's editors type Latin digits into Persian text («سال 1405», «نیمسال 4051»), where the rest of the page has
// Persian ones. Digits inside a Latin word or code (B2B, IMG_9535) are left as they are.
const LATIN_NUMBER = /(?<![A-Za-z_])[0-9]+(?![A-Za-z_])/g;

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

const summarySchema = z
  .string()
  .nullable()
  .transform((value) => {
    const text = value
      ? persianDigits(normalizePersianText(value.replace(PICTOGRAPHS, "").replace(/\s{2,}/g, " ")))
      : "";
    return text ? shortSummary(text) : null;
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

const articleSchema = itemSchema.omit({ href: true });

export type FeedArticleInput = Omit<FeedItemInput, "url" | "cutShort">;

/** An article page's fields, checked and normalized, or null when the page doesn't have them. */
export function parseFeedArticle(raw: RawArticle): FeedArticleInput | null {
  const result = articleSchema.safeParse(raw);
  if (!result.success) return null;

  const { image, ...rest } = result.data;
  return { ...rest, imageUrl: image };
}
