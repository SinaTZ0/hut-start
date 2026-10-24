import { ExternalLinkIcon } from "lucide-react";

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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "#/components/primitive/item/item";
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

/*===== Constants =====*/

const RESEARCH = NAV_SECTIONS.find((section) => section.id === "research");

/*===== Achievement Card =====*/

/** The lead achievement as a tall card; the others as a photo beside the text. */
function AchievementCard({ item, lead = false }: { item: Achievement; lead?: boolean }) {
  const text = (
    <>
      <CardHeader>
        <CardKicker>{item.tag()}</CardKicker>
        <CardTitle>
          <h3>{item.title()}</h3>
        </CardTitle>
      </CardHeader>
      {item.summary && (
        <CardContent>
          <CardDescription>{item.summary()}</CardDescription>
        </CardContent>
      )}
      <CardFooter>
        <CardCall>{m.home_read_more()}</CardCall>
      </CardFooter>
    </>
  );

  return (
    <Card
      render={<SiteLink href={newsHref(item)} />}
      size={lead ? "lg" : "default"}
      orientation={lead ? "vertical" : "horizontal"}
    >
      {item.image && (
        <CardMedia className={lead ? "aspect-2/1" : "aspect-2/1 sm:aspect-auto sm:w-2/5"}>
          <img src={item.image} alt="" loading="lazy" />
          {lead && <Badge variant="media">{m.home_achievements_spotlight()}</Badge>}
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
      <ItemGroup variant="tiled" className="grid-cols-1 sm:grid-cols-2 lg:col-span-2">
        {RESEARCH_UNITS.map((unit) => (
          <li key={unit.href}>
            <Item size="lg" render={<SiteLink href={unit.href} />}>
              <ItemMedia variant="icon">
                <unit.icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{unit.label()}</ItemTitle>
                <ItemDescription>{unit.description()}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ExternalLinkIcon data-icon="external" />
              </ItemActions>
            </Item>
          </li>
        ))}
      </ItemGroup>
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
