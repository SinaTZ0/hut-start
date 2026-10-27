import type { CSSProperties } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  type NavigationMenuTone,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "#/components/primitive/navigation-menu/navigation-menu";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { TextLink } from "#/components/shared/text-link/text-link";
import { NAV_DRAWINGS } from "#/lib/university/drawings";
import { NAV_SECTIONS, type NavSection } from "#/lib/university/navigation";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import { useClosedOnNavigation } from "./use-closed-on-navigation";

/*===== Styles =====*/

// The summary tile, the group headings and the card's drawing, per tone: quiet ink in the paper cards, light in the
// dark glass card.
const panelTone = {
  paper: {
    summary: "bg-accent text-muted-foreground",
    title: "text-heading",
    art: "text-art-menu",
    link: "default",
    group: "",
  },
  frost: {
    summary: "bg-accent text-muted-foreground",
    title: "text-heading",
    art: "text-art-menu",
    link: "default",
    group: "",
  },
  glass: {
    summary: "border border-band-line-strong bg-glass text-on-band-soft",
    title: "text-on-band",
    art: "text-art-menu-glass",
    link: "highlight",
    group: "text-highlight",
  },
} as const satisfies Record<
  NavigationMenuTone,
  { summary: string; title: string; art: string; link: "default" | "highlight"; group: string }
>;

/*===== Section Panel =====*/

/**
 * A section's card: a summary tile with the section page's link, then a column per link group, over the section's
 * drawing. The drawing is the card's ground, a notebook page whose subject fills the empty corner past the groups and
 * fades out under the links (`art-card`); it spreads over the card's padding, so the layer sits outside the panel's box.
 */
function SectionPanel({ section, tone }: { section: NavSection; tone: NavigationMenuTone }) {
  const styles = panelTone[tone];
  const drawing = NAV_DRAWINGS[section.id];

  return (
    <div className="relative isolate flex gap-6">
      {/*------ Drawing ------*/}
      {drawing && (
        <div
          aria-hidden
          style={{ "--art": `url("${drawing}")` } as CSSProperties}
          className={cn("pointer-events-none absolute -inset-6 -z-10 art-card ltr:-scale-x-100", styles.art)}
        />
      )}

      {/*------ Summary ------*/}
      <div className={cn("flex w-56 flex-col gap-2 rounded-sm p-5 text-body-sm", styles.summary)}>
        <p className={cn("text-h4", styles.title)}>{section.title()}</p>
        <p>{section.summary()}</p>
        <TextLink href={section.href} tone={styles.link} className="mt-auto">
          {m.nav_section_page({ title: section.title() })}
        </TextLink>
      </div>

      {/*------ Groups ------*/}
      {section.groups.map((group) => (
        <div key={group.title()} className="w-44">
          <h2 className={cn("mb-1 px-2 text-title text-highlight-text", styles.group)}>
            {group.href ? (
              <SiteLink href={group.href} className="underline-offset-4 hover:underline">
                {group.title()}
              </SiteLink>
            ) : (
              group.title()
            )}
          </h2>
          <ul className="grid">
            {group.links.map((link) => (
              <li key={link.href}>
                <NavigationMenuLink render={<SiteLink href={link.href} />}>{link.label()}</NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/*===== Main Nav =====*/

export type MainNavProps = {
  /** What the header bar under the menu is (`navigation-menu.styles.ts` → Tones). */
  tone: NavigationMenuTone;
  className?: string;
};

/**
 * The university's main menu on wide screens (phones use the tab bar's menu sheet). Each section with groups opens its
 * card on hover or click; a section without groups is a plain link in the row.
 */
export function MainNav({ tone, className }: MainNavProps) {
  const [openId, setOpenId] = useClosedOnNavigation<string | null>(null);

  return (
    <NavigationMenu
      aria-label={m.nav_main()}
      tone={tone}
      align="center"
      sideOffset={12}
      value={openId}
      onValueChange={(value) => setOpenId(value)}
      className={className}
    >
      <NavigationMenuList>
        {NAV_SECTIONS.map((section) => (
          <NavigationMenuItem key={section.id} value={section.id}>
            {section.groups.length === 0 ? (
              <NavigationMenuLink
                render={<SiteLink href={section.href} />}
                className={navigationMenuTriggerStyle(tone)}
              >
                {section.title()}
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger>{section.title()}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <SectionPanel section={section} tone={tone} />
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
