import { ArrowLeftIcon, BookOpenIcon, ClockIcon } from "lucide-react";

import {
  Card,
  CardBody,
  CardCall,
  CardDescription,
  CardFooter,
  CardHeader,
  CardKicker,
  CardMedia,
  CardTitle,
} from "#/components/primitive/card/card";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { textLinkArrowClasses } from "#/components/shared/text-link/text-link.styles";
import { formatDate } from "#/lib/locale";
import { cn } from "#/lib/utils";
import type { FeedItem } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { NEWS_CATEGORIES } from "../content";
import { isoToDate } from "../semester";

/*===== Learning =====*/

/** A pine panel with one link to the incubator; the events and short courses listed beside it as compact cards, each
 * ending like a news card: the date (when it has one) and the call below a hairline. */
export function Learning({ items }: { items: FeedItem[] }) {
  return (
    <section aria-labelledby="home-learning" className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      {/*===== Panel =====*/}
      <div className="relative isolate flex flex-col overflow-hidden rounded-lg bg-band px-5 py-6 text-on-band after:absolute after:-end-35 after:-bottom-55 after:-z-10 after:size-105 after:rounded-full after:border after:border-band-decor sm:p-8">
        <span
          aria-hidden
          className="mb-6 grid size-12 place-items-center self-end rounded-sm border border-band-line text-highlight"
        >
          <BookOpenIcon className="size-6" />
        </span>
        <SectionHead
          tone="band"
          id="home-learning"
          kicker={m.home_learning_kicker()}
          title={m.home_learning_title()}
          lede={m.home_learning_lede()}
          className="mb-6"
        />
        <SiteLink
          href={NEWS_CATEGORIES.growth.moreHref}
          className="mt-auto flex min-h-10 items-center justify-between gap-3 border-t border-band-line pt-5 text-body-sm font-bold text-highlight underline-offset-4 hover:underline"
        >
          {m.nav_research_incubator()}
          <ArrowLeftIcon aria-hidden className={cn(textLinkArrowClasses, "size-4.5")} />
        </SiteLink>
      </div>

      {/*===== Rows =====*/}
      <ul className="grid content-start gap-4 lg:col-span-2">
        {items.map((item) => (
          <li key={item.id}>
            <Card render={<SiteLink href={item.url} />} size="sm" orientation="horizontal">
              {item.imageUrl && (
                <CardMedia className="aspect-wide sm:aspect-4/3 sm:w-44">
                  <img src={item.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
                </CardMedia>
              )}
              <CardBody>
                <CardHeader>
                  <CardKicker>{NEWS_CATEGORIES[item.category].title()}</CardKicker>
                  <CardTitle>
                    <h3>{item.title}</h3>
                  </CardTitle>
                  {item.summary && <CardDescription lines="2">{item.summary}</CardDescription>}
                </CardHeader>
                <CardFooter>
                  {item.publishedOn && (
                    <time dateTime={item.publishedOn}>
                      <ClockIcon aria-hidden />
                      {formatDate(isoToDate(item.publishedOn), { day: "numeric", month: "long", year: "numeric" })}
                    </time>
                  )}
                  <CardCall>{m.home_read_more()}</CardCall>
                </CardFooter>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
