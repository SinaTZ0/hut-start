import { ArrowLeftIcon, BellIcon, ClockIcon } from "lucide-react";
import { useState } from "react";

import { Badge } from "#/components/primitive/badge/badge";
import {
  Card,
  CardBody,
  CardCall,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardKicker,
  CardMedia,
  CardTitle,
} from "#/components/primitive/card/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/primitive/tabs/tabs";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { textLinkArrowClasses } from "#/components/shared/text-link/text-link.styles";
import { formatDate, formatDateParts, formatRelativeDays } from "#/lib/locale";
import { m } from "#/paraglide/messages";
import {
  FEATURED_STORY,
  NEWS_CATEGORIES,
  type NewsCategory,
  type NewsItem,
  NOTICES,
  STORIES,
  newsHref,
} from "../content";
import { daysFromToday, isoToDate, type JDate } from "../semester";

/*===== Constants =====*/

const NOTICES_SHOWN = 4;

/*===== Story =====*/

/** A news card: photo, category, title, then the date and the call. The featured one sits beside its photo and adds
 * its summary. */
function Story({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  const text = (
    <>
      <CardHeader>
        <CardKicker>{NEWS_CATEGORIES[item.category].title()}</CardKicker>
        <CardTitle>
          <h3>{item.title()}</h3>
        </CardTitle>
      </CardHeader>
      {featured && item.summary && (
        <CardContent>
          <CardDescription>{item.summary()}</CardDescription>
        </CardContent>
      )}
      <CardFooter>
        {item.date && (
          <time dateTime={item.date}>
            <ClockIcon aria-hidden />
            {formatDate(isoToDate(item.date), { day: "numeric", month: "long", year: "numeric" })}
          </time>
        )}
        <CardCall>{m.home_news_continue()}</CardCall>
      </CardFooter>
    </>
  );

  return (
    <Card
      render={<SiteLink href={newsHref(item)} />}
      size={featured ? "lg" : "default"}
      orientation={featured ? "horizontal" : "vertical"}
      className={featured ? "sm:col-span-2" : undefined}
    >
      {item.image && (
        <CardMedia className={featured ? "aspect-video sm:aspect-auto sm:min-h-70 sm:flex-1" : "aspect-wide"}>
          <img src={item.image} alt="" loading="lazy" />
          {featured && <Badge variant="media">{m.home_news_featured()}</Badge>}
        </CardMedia>
      )}
      {featured ? <CardBody className="justify-center sm:flex-1">{text}</CardBody> : text}
    </Card>
  );
}

/*===== Notices =====*/

function NoticeRow({ item, today }: { item: NewsItem; today: JDate }) {
  const date = item.date ? isoToDate(item.date) : undefined;
  const parts = date && formatDateParts(date, { month: "short" });

  return (
    <li className="flex gap-3 py-4 not-first:border-t">
      {parts && (
        <span
          aria-hidden
          className="flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-sm border bg-card"
        >
          <span className="text-h4 text-heading">{parts.day}</span>
          <span className="text-caption text-muted-foreground">{parts.month}</span>
        </span>
      )}
      <div className="min-w-0">
        <SiteLink
          href={newsHref(item)}
          className="text-body-sm font-bold text-heading underline-offset-4 transition-colors duration-200 hover:text-brand-text hover:underline motion-reduce:transition-none"
        >
          {item.title()}
        </SiteLink>
        {item.date && date && (
          <p className="mt-0.5 text-caption text-muted-foreground">
            <time dateTime={item.date}>{formatDate(date, { day: "numeric", month: "long", year: "numeric" })}</time>
            {" · "}
            {formatRelativeDays(daysFromToday({ today, iso: item.date }))}
          </p>
        )}
      </div>
    </li>
  );
}

/** The notices panel: one tab per category, its newest few, and a link to the category's full list. */
function Notices({ today }: { today: JDate }) {
  const [active, setActive] = useState<NewsCategory>(NOTICES[0].category);
  const category = NEWS_CATEGORIES[active];

  return (
    <aside aria-labelledby="home-notices" className="flex flex-col overflow-hidden rounded-md border bg-muted">
      <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
        <div>
          <p className="text-caption text-muted-foreground">{m.home_notices_kicker()}</p>
          <h3 id="home-notices" className="text-h3">
            {m.home_notices_title()}
          </h3>
        </div>
        <span
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-full bg-highlight-surface text-heading"
        >
          <BellIcon className="size-5" />
        </span>
      </div>

      <Tabs value={active} onValueChange={(value) => setActive(value as NewsCategory)} className="flex-1">
        <TabsList aria-label={m.home_notices_tabs()} className="mx-5 mt-4 w-auto self-stretch sm:mx-6">
          {NOTICES.map((notices) => (
            <TabsTrigger key={notices.category} value={notices.category}>
              {NEWS_CATEGORIES[notices.category].title()}
            </TabsTrigger>
          ))}
        </TabsList>
        {NOTICES.map((notices) => (
          <TabsContent key={notices.category} value={notices.category} className="mx-5 sm:mx-6">
            <ul className="grid">
              {notices.items.slice(0, NOTICES_SHOWN).map((item) => (
                <NoticeRow key={item.id} item={item} today={today} />
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>

      <SiteLink
        href={category.moreHref}
        className="flex min-h-14 items-center justify-between gap-3 border-t px-5 py-4 text-body-sm font-bold text-brand-text underline-offset-4 hover:underline sm:px-6"
      >
        {m.home_notices_more({ category: category.title() })}
        <ArrowLeftIcon aria-hidden className={textLinkArrowClasses} />
      </SiteLink>
    </aside>
  );
}

/*===== News Section =====*/

/** The featured story and two more on the start side; the notices panel on the end side. */
export function NewsSection({ today }: { today: JDate }) {
  return (
    <section aria-labelledby="home-news">
      <SectionHead
        id="home-news"
        kicker={m.home_news_kicker()}
        title={m.home_news_title()}
        lede={m.home_news_lede()}
        more={{ label: m.home_news_more(), href: NEWS_CATEGORIES.university.moreHref }}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
          <Story item={FEATURED_STORY} featured />
          {STORIES.map((item) => (
            <Story key={item.id} item={item} />
          ))}
        </div>
        <Notices today={today} />
      </div>
    </section>
  );
}
