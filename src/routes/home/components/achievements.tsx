import { ExternalLinkIcon } from "lucide-react";
import type { CSSProperties } from "react";

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
import { formatNumber } from "#/lib/locale";
import { HOME_DRAWINGS } from "#/lib/university/drawings";
import { NAV_SECTIONS } from "#/lib/university/navigation";
import type { FeedItem } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { archiveHref } from "#/lib/university/feed";
import { RESEARCH_UNITS } from "../content";
import { FeedList, FeedRow } from "#/components/shared/feed-row/feed-row";

/*===== Constants =====*/

const RESEARCH = NAV_SECTIONS.find((section) => section.id === "research");

/*===== Research Units =====*/

/** The research and technology units: a short introduction over a sketch of a telescope and a microscope, beside a grid
 * of links that leave the site. */
function ResearchUnits() {
  return (
    <div className="mt-section grid grid-cols-1 overflow-hidden rounded-lg border bg-card lg:grid-cols-3">
      {/* The drawing sits behind the text: `isolate` keeps its -z-10 above this panel's background and below its content. */}
      <div className="relative isolate flex flex-col items-start gap-2 overflow-hidden border-b bg-background-alt p-8 sm:p-10 lg:border-e lg:border-b-0">
        <div
          aria-hidden
          style={{ "--art": `url("${HOME_DRAWINGS.research}")` } as CSSProperties}
          className="pointer-events-none absolute end-4 bottom-4 -z-10 aspect-480/448 w-40 mask-art text-art-ink opacity-60 sm:w-52"
        />
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

/** The achievements as numbered rows, then the research units. The units stay when the feed has no achievements. */
export function Achievements({ items }: { items: FeedItem[] }) {
  return (
    <section aria-labelledby="home-achievements">
      <SectionHead
        id="home-achievements"
        ruled
        kicker={m.home_achievements_kicker()}
        title={m.home_achievements_title()}
        lede={m.home_achievements_lede()}
        more={{ label: m.home_achievements_more(), href: archiveHref({ kind: "achievement" }) }}
      />
      {items.length > 0 && (
        <FeedList>
          {items.map((item, index) => (
            <FeedRow
              key={item.id}
              item={item}
              label={m.home_achievement_kicker()}
              number={formatNumber(index + 1, { minimumIntegerDigits: 2 })}
              media="aspect-video w-26 sm:w-75"
            />
          ))}
        </FeedList>
      )}
      <ResearchUnits />
    </section>
  );
}
