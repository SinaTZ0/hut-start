import { ArrowLeftIcon, ClockIcon, SproutIcon } from "lucide-react";
import type { CSSProperties } from "react";

import {
  Card,
  CardBody,
  CardCall,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/primitive/card/card";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { textLinkArrowClasses } from "#/components/shared/text-link/text-link.styles";
import { formatDate } from "#/lib/locale";
import { HOME_DRAWINGS } from "#/lib/university/drawings";
import { cn } from "#/lib/utils";
import type { FeedItem } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { NEWS_CATEGORIES } from "../content";
import { isoToDate } from "../semester";
import { FeedMedia } from "./feed-media";

/*===== Incubator =====*/

/** The incubator: a pine panel with its link, a seedling among gears drawn in its far corner; its newest stories
 * beside it as compact cards, each ending like a news card: the date (when it has one) and the call below a hairline.
 * Every card is the incubator's, so they carry no category kicker. */
export function Incubator({ items }: { items: FeedItem[] }) {
  return (
    <section aria-labelledby="home-incubator" className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      {/*===== Panel =====*/}
      {/* "entrepreneurship" in the English title is wider than the panel just above `lg`; it hyphenates there, and
          breaks anywhere where the browser has no hyphenation for the language, instead of widening the panel's text. */}
      <div className="relative isolate flex flex-col overflow-hidden rounded-lg bg-band px-5 py-6 wrap-anywhere hyphens-auto text-on-band sm:p-8">
        {/* Small while the panel is only as tall as its text; beside the cards it fills the room above the link. The
            drawing's subject keeps to its start-bottom corner, so English mirrors it. */}
        <div
          aria-hidden
          style={{ "--art": `url("${HOME_DRAWINGS.incubator}")` } as CSSProperties}
          className="pointer-events-none absolute end-0 bottom-0 -z-10 aspect-6/7 w-32 mask-art text-art-band sm:w-44 lg:w-3/5 ltr:-scale-x-100"
        />
        <span
          aria-hidden
          className="mb-6 grid size-12 place-items-center self-end rounded-sm border border-band-line text-highlight"
        >
          <SproutIcon className="size-6" />
        </span>
        <SectionHead
          tone="band"
          id="home-incubator"
          kicker={m.home_incubator_kicker()}
          title={m.nav_research_incubator()}
          lede={m.home_incubator_lede()}
          className="mb-6"
        />
        <SiteLink
          href={NEWS_CATEGORIES.growth.moreHref}
          className="mt-auto flex min-h-10 items-center justify-between gap-3 border-t border-band-line pt-5 text-body-sm font-bold text-highlight underline-offset-4 hover:underline"
        >
          {m.home_incubator_more()}
          <ArrowLeftIcon aria-hidden className={cn(textLinkArrowClasses, "size-4.5")} />
        </SiteLink>
      </div>

      {/*===== Rows =====*/}
      <ul className="grid content-start gap-4 lg:col-span-2">
        {items.map((item) => (
          <li key={item.id}>
            <Card render={<SiteLink href={item.url} />} size="sm" orientation="horizontal">
              {item.imageUrl && <FeedMedia src={item.imageUrl} className="aspect-wide sm:aspect-4/3 sm:w-44" />}
              <CardBody>
                <CardHeader>
                  {/* Feed text is Persian on the English page too, so it takes its own direction. */}
                  <CardTitle dir="auto">
                    <h3>{item.title}</h3>
                  </CardTitle>
                  {item.summary && (
                    <CardDescription dir="auto" lines="2" className="max-sm:hidden">
                      {item.summary}
                    </CardDescription>
                  )}
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
