import { ClockIcon } from "lucide-react";

import { Card, CardCall, CardDescription, CardFooter, CardHeader, CardTitle } from "#/components/primitive/card/card";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatDate } from "#/lib/locale";
import type { FeedItem } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { NEWS_CATEGORIES } from "../content";
import { isoToDate } from "../semester";
import { FeedMedia } from "./feed-media";

/*===== Courses =====*/

/** The open-education center's newest courses and workshops: a ruled head with the center's course list at its end,
 * over a row of photo cards. The old site keeps only a few, so the section is left out when there are none. */
export function Courses({ items }: { items: FeedItem[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="home-courses">
      <SectionHead
        id="home-courses"
        ruled
        kicker={m.home_courses_kicker()}
        title={m.home_courses_title()}
        lede={m.home_courses_lede()}
        more={{ label: m.home_courses_more(), href: NEWS_CATEGORIES.openEducation.moreHref }}
      />
      <ul className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="flex">
            <Card render={<SiteLink href={item.url} />} className="flex-1">
              {item.imageUrl && <FeedMedia src={item.imageUrl} className="aspect-3/2" />}
              <CardHeader>
                {/* Feed text is Persian on the English page too, so it takes its own direction. */}
                <CardTitle dir="auto">
                  <h3>{item.title}</h3>
                </CardTitle>
                {item.summary && (
                  <CardDescription dir="auto" lines="3" className="max-sm:hidden">
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
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
