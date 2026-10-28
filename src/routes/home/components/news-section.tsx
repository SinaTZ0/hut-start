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
  CardTitle,
} from "#/components/primitive/card/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/primitive/tabs/tabs";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { textLinkArrowClasses } from "#/components/shared/text-link/text-link.styles";
import { formatDate, formatDateParts, formatRelativeDays } from "#/lib/locale";
import type { FeedItem, HomeFeed } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { ALL_NOTICES_HREF, NEWS_CATEGORIES } from "../content";
import { daysFromToday, isoToDate, type JDate } from "../semester";
import { FeedMedia } from "./feed-media";

/*===== Constants =====*/

type NoticeTab = keyof HomeFeed["notices"];

/** The notices panel's tabs: every notice first, then each of the old homepage's categories, the ones students check
 * most first. A tab's label is shorter than its category's name where it has to be, so six fit in two rows. */
const NOTICE_TABS: { value: NoticeTab; title: () => string; more: () => string; href: string }[] = [
  { value: "latest", title: m.home_notices_tab_latest, more: m.home_notices_more_all, href: ALL_NOTICES_HREF },
  ...(
    [
      ["education", m.home_notices_tab_education],
      ["graduate", m.home_notices_tab_graduate],
      ["student", m.home_notices_tab_student],
      ["industry", m.home_notices_tab_industry],
      ["openEducation", m.home_notices_tab_open_education],
    ] as const
  ).map(([category, title]) => ({
    value: category,
    title,
    more: () => m.home_notices_more({ category: NEWS_CATEGORIES[category].title() }),
    href: NEWS_CATEGORIES[category].moreHref,
  })),
];

/*===== Story =====*/

/** A news card: photo, category, title, then the date and the call. The featured one sits beside its photo and adds
 * its summary. */
function Story({ item, featured = false }: { item: FeedItem; featured?: boolean }) {
  const text = (
    <>
      <CardHeader>
        <CardKicker>{NEWS_CATEGORIES[item.category].title()}</CardKicker>
        <CardTitle>
          <h3>{item.title}</h3>
        </CardTitle>
      </CardHeader>
      {featured && item.summary && (
        <CardContent>
          <CardDescription lines="3">{item.summary}</CardDescription>
        </CardContent>
      )}
      <CardFooter>
        {item.publishedOn && (
          <time dateTime={item.publishedOn}>
            <ClockIcon aria-hidden />
            {formatDate(isoToDate(item.publishedOn), { day: "numeric", month: "long", year: "numeric" })}
          </time>
        )}
        <CardCall>{m.home_news_continue()}</CardCall>
      </CardFooter>
    </>
  );

  return (
    <Card
      render={<SiteLink href={item.url} />}
      size={featured ? "lg" : "default"}
      orientation={featured ? "horizontal" : "vertical"}
      className={featured ? "sm:col-span-2" : undefined}
    >
      {item.imageUrl && (
        <FeedMedia
          src={item.imageUrl}
          className={featured ? "aspect-video sm:aspect-auto sm:min-h-70 sm:flex-1" : "aspect-wide"}
        >
          {featured && <Badge variant="media">{m.home_news_featured()}</Badge>}
        </FeedMedia>
      )}
      {featured ? <CardBody className="justify-center sm:flex-1">{text}</CardBody> : text}
    </Card>
  );
}

/*===== Headline =====*/

/** A story after the first three: its photo as a thumbnail beside the title and the date, without a call. */
function Headline({ item }: { item: FeedItem }) {
  return (
    <Card render={<SiteLink href={item.url} />} size="sm" orientation="horizontal" className="h-full">
      {item.imageUrl && <FeedMedia src={item.imageUrl} className="aspect-wide sm:aspect-square sm:w-28" />}
      <CardBody className="justify-center">
        <CardHeader>
          <CardKicker>
            <span>{NEWS_CATEGORIES[item.category].title()}</span>
            {item.publishedOn && (
              <time dateTime={item.publishedOn}>
                {formatDate(isoToDate(item.publishedOn), { day: "numeric", month: "long", year: "numeric" })}
              </time>
            )}
          </CardKicker>
          <CardTitle>
            <h3 className="line-clamp-3">{item.title}</h3>
          </CardTitle>
        </CardHeader>
      </CardBody>
    </Card>
  );
}

/*===== Notices =====*/

/** A notice: its date as a calendar leaf, the title, then how long ago (the leaf has the date, the `<time>` the year).
 * Under «latest» it names its category. */
function NoticeRow({ item, today, showCategory }: { item: FeedItem; today: JDate; showCategory: boolean }) {
  const date = item.publishedOn ? isoToDate(item.publishedOn) : undefined;
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
          href={item.url}
          className="text-body-sm font-bold text-heading underline-offset-4 transition-colors duration-200 hover:text-brand-text hover:underline motion-reduce:transition-none"
        >
          {item.title}
        </SiteLink>
        {(showCategory || date) && (
          <p className="mt-0.5 text-caption text-muted-foreground">
            {showCategory && NEWS_CATEGORIES[item.category].title()}
            {showCategory && date && " · "}
            {item.publishedOn && date && (
              <time
                dateTime={item.publishedOn}
                title={formatDate(date, { day: "numeric", month: "long", year: "numeric" })}
              >
                {formatRelativeDays(daysFromToday({ today, iso: item.publishedOn }))}
              </time>
            )}
          </p>
        )}
      </div>
    </li>
  );
}

/**
 * The notices panel: every notice, then one tab per category, each a list that scrolls without a scrollbar, and a
 * link to the old site's full list. The tab panel takes focus, so a keyboard scrolls the list too.
 */
function Notices({ today, notices }: { today: JDate; notices: HomeFeed["notices"] }) {
  const [active, setActive] = useState<NoticeTab>("latest");
  const tab = NOTICE_TABS.find((candidate) => candidate.value === active) ?? NOTICE_TABS[0];

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

      {/* Beside the stories (`lg`), the list fills the panel down to its footer: the panel is as tall as the stories,
          and `h-0` keeps the list from making it taller. Stacked on phones, it is about four rows tall. */}
      <Tabs
        value={active}
        onValueChange={(value) => setActive(value as NoticeTab)}
        className="flex-1 lg:grid-rows-fill-last lg:content-stretch"
      >
        {/* Six tabs don't fit the panel's width on one line: two rows of three. In the narrowest panels the longest
            label («تحصیلات تکمیلی») wraps onto a second line (`compact`). */}
        <TabsList aria-label={m.home_notices_tabs()} className="mx-5 mt-4 grid w-auto grid-cols-3 self-stretch sm:mx-6">
          {NOTICE_TABS.map((candidate) => (
            <TabsTrigger key={candidate.value} value={candidate.value} size="compact">
              {candidate.title()}
            </TabsTrigger>
          ))}
        </TabsList>
        {NOTICE_TABS.map((candidate) => (
          <TabsContent
            key={candidate.value}
            value={candidate.value}
            className="mx-5 scrollbar-none max-h-88 overflow-y-auto sm:mx-6 lg:h-0 lg:max-h-none lg:min-h-full"
          >
            {notices[candidate.value].length > 0 ? (
              <ul className="grid">
                {notices[candidate.value].map((item) => (
                  <NoticeRow key={item.id} item={item} today={today} showCategory={candidate.value === "latest"} />
                ))}
              </ul>
            ) : (
              <p className="py-4 text-body-sm text-muted-foreground">{m.home_notices_empty()}</p>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <SiteLink
        href={tab.href}
        className="flex min-h-14 items-center justify-between gap-3 border-t px-5 py-4 text-body-sm font-bold text-brand-text underline-offset-4 hover:underline sm:px-6"
      >
        {tab.more()}
        <ArrowLeftIcon aria-hidden className={textLinkArrowClasses} />
      </SiteLink>
    </aside>
  );
}

/*===== News Section =====*/

/** The featured story, two more as cards and the rest as headlines on the start side; the notices panel on the end
 * side. */
export function NewsSection({
  today,
  news,
  notices,
}: {
  today: JDate;
  news: FeedItem[];
  notices: HomeFeed["notices"];
}) {
  const [featured, ...rest] = news;
  const stories = rest.slice(0, 2);
  const headlines = rest.slice(2);

  return (
    <section aria-labelledby="home-news">
      <SectionHead
        id="home-news"
        ruled
        kicker={m.home_news_kicker()}
        title={m.home_news_title()}
        lede={m.home_news_lede()}
        more={{ label: m.home_news_more(), href: NEWS_CATEGORIES.university.moreHref }}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
          {featured && <Story item={featured} featured />}
          {stories.map((item) => (
            <Story key={item.id} item={item} />
          ))}
          {headlines.map((item) => (
            <Headline key={item.id} item={item} />
          ))}
        </div>
        <Notices today={today} notices={notices} />
      </div>
    </section>
  );
}
