import { CalendarIcon, ClockIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/primitive/breadcrumb/breadcrumb";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatDate, formatRelativeDays, isoToDate } from "#/lib/locale";
import type { Article } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { getLocale } from "#/paraglide/runtime";
import { CATEGORY_LABELS, KIND_LABELS, readingMinutes } from "../content";
import { ArticleActions } from "./article-actions";
import { ArticleFigure } from "./article-figure";

/*===== Dates =====*/
const DAY_MS = 86_400_000;
// A date further back reads better as itself than as «۴۰ روز پیش».
const RELATIVE_MAX_DAYS = 30;

/** Whole days since the article was published, or null when that's too long ago to say in days. */
function daysAgo(iso: string): number | null {
  const days = Math.round((Date.now() - isoToDate(iso).getTime()) / DAY_MS);
  return days >= 0 && days <= RELATIVE_MAX_DAYS ? days : null;
}

/*===== Article Header =====*/

/**
 * The article's head: the trail back home, the kicker (kind and category), the title, the date and reading time with
 * the page's actions, the lead, and the cover shown whole. The old site's articles are Persian only, so on the English
 * page the title and lead read in their own direction, under a line that says so.
 */
export function ArticleHeader({ article }: { article: Article }) {
  const kind = KIND_LABELS[article.kind];
  const category = CATEGORY_LABELS[article.category]();
  // The incubator's stories are filed under the incubator twice over (kind and category); it's named once.
  const showCategory = category !== kind.many();
  const days = article.publishedOn ? daysAgo(article.publishedOn) : null;

  return (
    <header className="grid gap-5 sm:gap-6">
      {/*===== Trail =====*/}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<SiteLink href="/" />}>{m.nav_tab_home()}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{showCategory ? kind.many() : <BreadcrumbPage>{kind.many()}</BreadcrumbPage>}</BreadcrumbItem>
          {showCategory && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/*===== Title =====*/}
      <div className="grid gap-3">
        <p className="flex items-center gap-2 text-kicker font-bold text-brand-text before:block before:h-1 before:w-4 before:rounded-xs before:bg-highlight">
          <span>{kind.one()}</span>
          {showCategory && (
            <>
              <span aria-hidden className="size-1 rounded-full bg-current opacity-50" />
              <span>{category}</span>
            </>
          )}
        </p>
        <h1 id="article-title" dir="auto" className="text-h2 text-balance text-heading">
          {article.title}
        </h1>
      </div>

      {/*===== Meta =====*/}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b pb-5 text-caption text-muted-foreground">
        {article.publishedOn && (
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon aria-hidden className="size-3.5" />
            <time dateTime={article.publishedOn}>
              {formatDate(isoToDate(article.publishedOn), { day: "numeric", month: "long", year: "numeric" })}
            </time>
          </span>
        )}
        {days !== null && <span>{formatRelativeDays(-days)}</span>}
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon aria-hidden className="size-3.5" />
          {m.article_reading_time({ minutes: readingMinutes(article) })}
        </span>
        <ArticleActions title={article.title} className="max-sm:w-full sm:ms-auto" />
      </div>

      {/*===== Lead =====*/}
      {getLocale() !== "fa" && <p className="text-body-sm text-muted-foreground">{m.article_persian_only()}</p>}
      {article.summary && (
        <p dir="auto" lang="fa" className="text-body-lg text-foreground">
          {article.summary}
        </p>
      )}
      {article.cover && (
        <ArticleFigure
          image={{ src: article.cover.src, alt: "", width: article.cover.width, height: article.cover.height }}
          priority
        />
      )}
    </header>
  );
}
