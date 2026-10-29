import type { ArchiveKind, FeedCategory, FeedKind } from "#/orpc/home-feed/constants";
import { m } from "#/paraglide/messages";

/*===== Feed Kinds =====*/

/** What an item is, as a kicker (singular) and as a breadcrumb or filter (plural) name it. */
export const KIND_LABELS: Record<FeedKind, { one: () => string; many: () => string }> = {
  news: { one: m.article_kind_news, many: m.article_kinds_news },
  notice: { one: m.article_kind_notice, many: m.article_kinds_notice },
  achievement: { one: m.article_kind_achievement, many: m.article_kinds_achievement },
  growth: { one: m.article_kind_growth, many: m.article_kinds_growth },
  event: { one: m.article_kind_event, many: m.article_kinds_event },
  occasion: { one: m.article_kind_occasion, many: m.article_kinds_occasion },
};

/** The archive filtered to a kind, and to a category within it. */
export function archiveHref({ kind, category }: { kind?: ArchiveKind; category?: FeedCategory }): string {
  const query = [kind && `kind=${kind}`, category && `category=${category}`].filter(Boolean).join("&");
  return query ? `/news?${query}` : "/news";
}

/*===== Feed Categories =====*/
// A feed item's kicker, and where the rest of its kind is listed: the news archive (`/news`), filtered to the category.
// Text is message functions, called in render.

export const NEWS_CATEGORIES: Record<FeedCategory, { title: () => string; moreHref: string }> = {
  university: { title: m.home_category_university, moreHref: "/news?kind=news" },
  education: { title: m.home_category_education, moreHref: "/news?category=education" },
  graduate: { title: m.home_category_graduate, moreHref: "/news?category=graduate" },
  industry: { title: m.home_category_industry, moreHref: "/news?category=industry" },
  student: { title: m.home_category_student, moreHref: "/news?category=student" },
  growth: { title: m.home_category_growth, moreHref: "/news?category=growth" },
  openEducation: { title: m.home_category_open_education, moreHref: "/news?category=openEducation" },
};

/** Every notice, whatever its category. */
export const ALL_NOTICES_HREF = "/news?kind=notice";
