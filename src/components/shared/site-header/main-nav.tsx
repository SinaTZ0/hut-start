import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "#/components/primitive/navigation-menu/navigation-menu";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { TextLink } from "#/components/shared/text-link/text-link";
import { NAV_SECTIONS, type NavSection } from "#/lib/university/navigation";
import { m } from "#/paraglide/messages";
import { useClosedOnNavigation } from "./use-closed-on-navigation";

/*===== Section Panel =====*/

/** A section's card: a summary tile with the section page's link, then a column per link group. */
function SectionPanel({ section }: { section: NavSection }) {
  return (
    <div className="flex gap-6">
      {/*------ Summary ------*/}
      <div className="flex w-56 flex-col gap-2 rounded-sm bg-accent p-5 text-body-sm text-muted-foreground">
        <p className="text-h4 text-heading">{section.title()}</p>
        <p>{section.summary()}</p>
        <TextLink href={section.href} className="mt-auto">
          {m.nav_section_page({ title: section.title() })}
        </TextLink>
      </div>

      {/*------ Groups ------*/}
      {section.groups.map((group) => (
        <div key={group.title()} className="w-44">
          <h2 className="mb-1 px-2 text-title text-highlight-text">
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

/**
 * The university's main menu on wide screens (phones use the tab bar's menu sheet). Each section with groups opens its
 * card on hover or click; a section without groups is a plain link in the row.
 */
export function MainNav({ className }: { className?: string }) {
  const [openId, setOpenId] = useClosedOnNavigation<string | null>(null);

  return (
    <NavigationMenu
      aria-label={m.nav_main()}
      align="center"
      value={openId}
      onValueChange={(value) => setOpenId(value)}
      className={className}
    >
      <NavigationMenuList>
        {NAV_SECTIONS.map((section) => (
          <NavigationMenuItem key={section.id} value={section.id}>
            {section.groups.length === 0 ? (
              <NavigationMenuLink render={<SiteLink href={section.href} />} className={navigationMenuTriggerStyle()}>
                {section.title()}
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger>{section.title()}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <SectionPanel section={section} />
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
