import { ArrowLeftIcon, BookOpenIcon } from "lucide-react";

import { Badge } from "#/components/primitive/badge/badge";
import { Card, CardBody, CardDescription, CardHeader, CardMedia, CardTitle } from "#/components/primitive/card/card";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { m } from "#/paraglide/messages";
import { LEARNING_ITEMS, NEWS_CATEGORIES, newsHref } from "../content";
import { CardArrow } from "./card-arrow";

/*===== Learning =====*/

/** A pine panel with one link to the incubator; the events and short courses listed beside it as link rows. */
export function Learning() {
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
          <ArrowLeftIcon aria-hidden className="size-4.5 ltr:-scale-x-100" />
        </SiteLink>
      </div>

      {/*===== Rows =====*/}
      <ul className="grid content-start gap-4 lg:col-span-2">
        {LEARNING_ITEMS.map((item) => (
          <li key={item.id}>
            <Card render={<SiteLink href={newsHref(item)} />} size="sm" orientation="horizontal">
              {item.image && (
                <CardMedia className="aspect-wide sm:aspect-4/3 sm:w-44">
                  <img src={item.image} alt="" loading="lazy" />
                </CardMedia>
              )}
              <CardBody className="sm:flex-row sm:items-center">
                <CardHeader className="flex-1">
                  <Badge className="mb-1">{NEWS_CATEGORIES[item.category].title()}</Badge>
                  <CardTitle>
                    <h3>{item.title()}</h3>
                  </CardTitle>
                  {item.summary && <CardDescription>{item.summary()}</CardDescription>}
                </CardHeader>
                <CardArrow className="me-4 hidden sm:grid" />
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
