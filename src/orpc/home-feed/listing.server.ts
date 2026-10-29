import { load } from "cheerio";

import { toLatinDigits } from "#/lib/digits";
import { SOURCE_ORIGIN, type FeedCategory, type FeedKind } from "#/orpc/home-feed/constants";
import type { RawItem } from "#/orpc/home-feed/parse.server";

/*===== Old Site Listings =====*/
// The old site's archive is three Liferay search pages, one per kind. Each lists every post ever filed there, read
// newest first (`sort=createDate-`), 60 a page (`delta`), paged by `start` (from 1). They fill the archive (`/news`)
// with what the homepage no longer shows. When the old site moves one, its path changes here.

export type Listing = { name: string; path: string; kind: FeedKind };

export const LISTINGS: readonly Listing[] = [
  { name: "news", path: "/web/hut/اخبار", kind: "news" },
  { name: "notices", path: "/web/hut/اطلاعیه-ها", kind: "notice" },
  { name: "workshops", path: "/web/hut/کارگاه-ها-و-دوره-های-اموزشی", kind: "event" },
];

export const LISTING_PAGE_SIZE = 60;

/** One page of a listing, newest first. `page` counts from 1. */
export function listingPageUrl({ listing, page }: { listing: Listing; page: number }): string {
  const url = new URL(listing.path, SOURCE_ORIGIN);
  url.searchParams.set("delta", String(LISTING_PAGE_SIZE));
  url.searchParams.set("sort", "createDate-");
  url.searchParams.set("start", String(page));
  return url.href;
}

/*===== Labels =====*/
// Each post carries the old site's tags (`آموزش`, `دانشجوئی و فرهنگی`) and categories (`اخبار تحصلات تکمیلی`), mixed
// and spelled as its editors typed them. These are the ones that say which of the home page's categories it belongs
// to; the rest (a department, «جنگ», «ثبت نام») say nothing the archive filters by.

const LABEL_CATEGORIES: Record<string, FeedCategory> = {
  آموزش: "education",
  "تحصیلات تکمیلی": "graduate",
  "اخبار تحصلات تکمیلی": "graduate",
  "نودانشجویان-ارشد": "graduate",
  "نودانشجویان-دکتری": "graduate",
  "دانشجوئی و فرهنگی": "student",
  "تربیت بدنی": "student",
  خوابگاه: "student",
  تغذیه: "student",
  رفاهی: "student",
  رفاهیات: "student",
  "انجمن های علمی": "student",
  "کانون های فرهنگی": "student",
  "رویداد دانشجویی": "student",
  "بسیج دانشجویی": "student",
  "هیات های دانشجویی": "student",
  "پژوهش و ارتباط با صنعت": "industry",
  "ارتباط با صنعت": "industry",
  "آموزش های آزاد": "openEducation",
  "کارگاه ها و دوره های اموزشی": "openEducation",
  "لینک ثبت نام مرکز آموزش آزاد": "openEducation",
  "لینک آموزش آزاد": "openEducation",
  "سمینار آموزش آزاد": "openEducation",
  "مرکز رشد، فناوری و کارآفرینی": "growth",
};

// Labels that make a post another kind than its listing's: the news listing holds the achievements, and both
// listings hold courses and the incubator's stories.
const LABEL_KINDS: Record<string, FeedKind> = {
  "دستاوردها و افتخارات": "achievement",
  "افتخارات پژوهشی": "achievement",
  "افتخارات علمی": "achievement",
  "پژوهشگران برگزیده": "achievement",
  "دانشجویان برتر": "achievement",
  "کارگاه ها و دوره های اموزشی": "event",
  "مرکز رشد، فناوری و کارآفرینی": "growth",
};

/** Which category a notice is filed under when its labels give several: the narrower office first. */
const CATEGORY_ORDER: readonly FeedCategory[] = [
  "graduate",
  "education",
  "industry",
  "student",
  "openEducation",
  "growth",
];

/** The category some kinds are always filed under: news and achievements the university's, courses open education's. */
const KIND_CATEGORIES: Partial<Record<FeedKind, FeedCategory>> = {
  news: "university",
  achievement: "university",
  event: "openEducation",
  growth: "growth",
};

/**
 * What a listed post is and where the archive files it: its kind (its listing's, unless a label says achievement,
 * course or incubator), the category its card names, and every other category its labels give.
 */
export function classifyListed({ listing, labels }: { listing: Listing; labels: string[] }): {
  kind: FeedKind;
  category: FeedCategory;
  topics: FeedCategory[];
} {
  const named = new Set(labels.flatMap((label) => LABEL_CATEGORIES[label] ?? []));
  // The first label that changes the kind, in the order above (an achievement that's also a course is an achievement).
  const kind = Object.entries(LABEL_KINDS).find(([label]) => labels.includes(label))?.[1] ?? listing.kind;
  const category = KIND_CATEGORIES[kind] ?? CATEGORY_ORDER.find((candidate) => named.has(candidate)) ?? "university";
  named.delete(category);
  return { kind, category, topics: [...named] };
}

/*===== Dates =====*/
// Most listings print the creation date as Persian text: «روی 25 اکتبر 26،‏ 10:47», a Gregorian day, month and
// two-digit year. The workshops listing writes it into a script instead: moment(`Nov 4, 2025 8:55:00 AM`). The article's
// own page has the date it's published under; this one is only kept until that page is read.

const PERSIAN_MONTHS = [
  "ژانویه",
  "فوریه",
  "مارس",
  "آوریل",
  "مه",
  "ژوئن",
  "ژوئیه",
  "اوت",
  "سپتامبر",
  "اکتبر",
  "نوامبر",
  "دسامبر",
];
const LATIN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PERSIAN_DATE = new RegExp(`(\\d{1,2})\\s+(${PERSIAN_MONTHS.join("|")}|می)\\s+(\\d{2,4})`);
const SCRIPT_DATE = /moment\(`([A-Z][a-z]{2}) (\d{1,2}), (\d{4})/;

function isoDate({ year, month, day }: { year: number; month: number; day: number }): string | null {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** The ISO date in a listing's date text or script, if it has one. */
function listedDate(text: string): string | null {
  const persian = PERSIAN_DATE.exec(toLatinDigits(text));
  if (persian) {
    const month = persian[2] === "می" ? 5 : PERSIAN_MONTHS.indexOf(persian[2] ?? "") + 1;
    const year = Number(persian[3]);
    return isoDate({ year: year < 100 ? 2000 + year : year, month, day: Number(persian[1]) });
  }
  const script = SCRIPT_DATE.exec(text);
  if (script) {
    return isoDate({
      year: Number(script[3]),
      month: LATIN_MONTHS.indexOf(script[1] ?? "") + 1,
      day: Number(script[2]),
    });
  }
  return null;
}

/*===== Page =====*/

/** A listed post as the page has it, with its tags and categories. `validation.ts` checks the rest. */
export type RawListedItem = RawItem & { labels: string[] };

/**
 * Reads one page of a listing. An empty array is a page past the last; a changed layout reads as empty too, so the
 * caller can't tell the two apart and stops either way (the homepage's sync is what notices a changed site).
 */
export function parseListingPage(html: string): RawListedItem[] {
  const $ = load(html);

  return $("li.list-group-item")
    .toArray()
    .flatMap((element) => {
      const item = $(element);
      const link = item.find(".list-group-title a").first();
      const href = link.attr("href");
      if (!href) return [];

      const metadata = item.find(".search-results-metadata");
      const labels = item
        .find(".taglib-asset-tags-summary a, .taglib-asset-categories-summary a")
        .toArray()
        .map((label) => $(label).text().replace(/\s+/g, " ").trim())
        .filter(Boolean);

      return [
        {
          href,
          title: link.text().replace(/\s+/g, " ").trim(),
          // The listing's excerpt runs the view count, the old ID and the labels into the text: the lead is read from
          // the article's page instead.
          summary: null,
          publishedOn: listedDate(`${metadata.text()} ${metadata.find("script").text()}`),
          image: item.find("img.sticker-img").attr("src") ?? null,
          sourceAssetId: null,
          labels,
        },
      ];
    });
}
