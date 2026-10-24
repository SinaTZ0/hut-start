import { ExternalLinkIcon } from "lucide-react";

import { Badge } from "#/components/primitive/badge/badge";
import {
  Card,
  CardBody,
  CardContent,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from "#/components/primitive/card/card";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { TextLink } from "#/components/shared/text-link/text-link";
import { NAV_SECTIONS } from "#/lib/university/navigation";
import { m } from "#/paraglide/messages";
import {
  ACHIEVEMENTS,
  type Achievement,
  LEAD_ACHIEVEMENT,
  NEWS_CATEGORIES,
  newsHref,
  RESEARCH_UNITS,
} from "../content";
import { CardArrow } from "./card-arrow";

/*===== Constants =====*/

const RESEARCH = NAV_SECTIONS.find((section) => section.id === "research");

/*===== Achievement Card =====*/

/** The lead achievement as a tall card; the others as a photo beside the text, the photo on the end side. */
function AchievementCard({ item, lead = false }: { item: Achievement; lead?: boolean }) {
  const text = (
    <>
      <CardHeader>
        <p className="flex items-center gap-2 text-caption font-bold text-brand-text before:size-1.5 before:rounded-full before:bg-highlight">
          {item.tag()}
        </p>
        <CardTitle>
          <h3>{item.title()}</h3>
        </CardTitle>
      </CardHeader>
      {item.summary && (
        <CardContent>
          <CardDescription>{item.summary()}</CardDescription>
        </CardContent>
      )}
      <CardContent className="mt-auto">
        <p className="flex items-center justify-between border-t pt-3 text-caption font-bold text-brand-text">
          {m.home_read_more()}
          <CardArrow icon="external" />
        </p>
      </CardContent>
    </>
  );

  return (
    <Card
      render={<SiteLink href={newsHref(item)} />}
      size={lead ? "lg" : "default"}
      orientation={lead ? "vertical" : "horizontal"}
    >
      {item.image && (
        <CardMedia className={lead ? "aspect-2/1" : "aspect-2/1 sm:order-last sm:aspect-auto sm:w-2/5"}>
          <img src={item.image} alt="" loading="lazy" />
          {lead && (
            <Badge variant="media" className="absolute start-4 top-4">
              {m.home_achievements_spotlight()}
            </Badge>
          )}
        </CardMedia>
      )}
      {lead ? text : <CardBody>{text}</CardBody>}
    </Card>
  );
}

/*===== Research Units =====*/

/** The research and technology units: a short introduction beside a grid of links that leave the site. */
function ResearchUnits() {
  return (
    <div className="mt-section grid grid-cols-1 overflow-hidden rounded-lg border bg-card lg:grid-cols-3">
      <div className="flex flex-col items-start gap-2 border-b bg-background-alt p-8 sm:p-10 lg:border-e lg:border-b-0">
        <h3 className="text-h2">{m.home_units_title()}</h3>
        <p className="max-w-xs text-body-sm text-muted-foreground">{m.home_units_lede()}</p>
        {RESEARCH && (
          <TextLink href={RESEARCH.href} className="mt-auto pt-6">
            {m.nav_section_page({ title: RESEARCH.title() })}
          </TextLink>
        )}
      </div>
      <ul className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:col-span-2">
        {RESEARCH_UNITS.map((unit) => (
          <li key={unit.href} className="-ms-px -mt-px border-s border-t">
            <SiteLink
              href={unit.href}
              className="group/unit flex h-full items-start gap-4 px-5 py-6 transition-colors duration-200 hover:bg-accent focus-visible:-outline-offset-4 motion-reduce:transition-none sm:px-7 sm:py-8"
            >
              <unit.icon aria-hidden className="mt-0.5 size-7 shrink-0 text-highlight-text" />
              <span className="min-w-0 flex-1">
                <span className="block text-h4 text-heading">{unit.label()}</span>
                <span className="block text-body-sm text-muted-foreground">{unit.description()}</span>
              </span>
              <ExternalLinkIcon
                aria-hidden
                className="mt-1.5 size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover/unit:text-brand-text motion-reduce:transition-none"
              />
            </SiteLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*===== Achievements =====*/

export function Achievements() {
  return (
    <section aria-labelledby="home-achievements">
      <SectionHead
        id="home-achievements"
        kicker={m.home_achievements_kicker()}
        title={m.home_achievements_title()}
        lede={m.home_achievements_lede()}
        more={{ label: m.home_achievements_more(), href: NEWS_CATEGORIES.university.moreHref }}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AchievementCard item={LEAD_ACHIEVEMENT} lead />
        <div className="grid gap-6">
          {ACHIEVEMENTS.map((item) => (
            <AchievementCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <ResearchUnits />
    </section>
  );
}
