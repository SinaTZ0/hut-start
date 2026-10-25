import { Link } from "@tanstack/react-router";
import { HouseIcon, MenuIcon, SearchIcon, UserIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#/components/primitive/accordion/accordion";
import { Button } from "#/components/primitive/button/button";
import { buttonVariants } from "#/components/primitive/button/button.styles";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#/components/primitive/sheet/sheet";
import { LocaleSwitcher } from "#/components/shared/locale-switcher/locale-switcher";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { TextLink } from "#/components/shared/text-link/text-link";
import { ThemeToggle } from "#/components/shared/theme-toggle/theme-toggle";
import { useLocaleLinks } from "#/hooks/use-locale-links";
import { NAV_SECTIONS } from "#/lib/university/navigation";
import type { Viewer } from "#/orpc/session/contract";
import { m } from "#/paraglide/messages";
import { AccountMenu } from "./account-menu";
import { ServiceSearchPanel } from "./service-search";
import { useClosedOnNavigation } from "./use-closed-on-navigation";

/*===== Styles =====*/

const tabLinkClasses = buttonVariants({ variant: "tab", size: "tab" });

const panelLinkClasses =
  "inline-flex min-h-10 items-center text-foreground underline-offset-4 transition-colors duration-200 hover:text-brand-text hover:underline motion-reduce:transition-none";

/*===== Menu Sheet =====*/

/**
 * The main menu on phones: a bottom sheet with a row per section. A section with groups expands in place to its links;
 * one without is a plain link. The theme and language controls, which the header bar has no room for, sit at its foot.
 */
function MenuSheet() {
  const [open, setOpen] = useClosedOnNavigation(false);
  const localeLinks = useLocaleLinks();
  const sections = NAV_SECTIONS.filter((section) => section.groups.length > 0);
  const links = NAV_SECTIONS.filter((section) => section.groups.length === 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="tab" size="tab" />}>
        <MenuIcon />
        {m.nav_menu_open()}
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>{m.nav_main()}</SheetTitle>
        </SheetHeader>

        {/*------ Sections ------*/}
        <nav aria-label={m.nav_main()} className="min-h-0 flex-1 overflow-y-auto px-6">
          <Accordion>
            {sections.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger>{section.title()}</AccordionTrigger>
                <AccordionContent>
                  <TextLink href={section.href}>{m.nav_section_page({ title: section.title() })}</TextLink>
                  {section.groups.map((group) => (
                    <div key={group.title()} className="mt-4">
                      <h4 className="text-title text-highlight-text">
                        {group.href ? (
                          <SiteLink href={group.href} className="underline-offset-4 hover:underline">
                            {group.title()}
                          </SiteLink>
                        ) : (
                          group.title()
                        )}
                      </h4>
                      <ul className="grid">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <SiteLink href={link.href} className={panelLinkClasses}>
                              {link.label()}
                            </SiteLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <ul className="border-t">
            {links.map((section) => (
              <li key={section.id}>
                <SiteLink
                  href={section.href}
                  className="flex min-h-12 items-center text-body font-semibold text-foreground hover:text-heading"
                >
                  {section.title()}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>

        {/*------ Preferences ------*/}
        <SheetFooter className="flex-row items-center justify-between">
          <LocaleSwitcher links={localeLinks} />
          <ThemeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

/*===== Search Sheet =====*/

/** The systems search on phones: the header popover's panel, in a bottom sheet. */
function SearchSheet() {
  const [open, setOpen] = useClosedOnNavigation(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="tab" size="tab" />}>
        <SearchIcon />
        {m.nav_tab_search()}
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>{m.nav_search_services()}</SheetTitle>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-3 px-6 pb-6">
          <ServiceSearchPanel />
        </div>
      </SheetContent>
    </Sheet>
  );
}

/*===== Tab Bar =====*/

/**
 * The app-style bar fixed to the bottom of the screen below `lg`, where the header has no room for the menu: home, the
 * menu sheet, the systems search, and the account menu or sign-in. The current page and an open sheet light up.
 */
export function TabBar({ viewer }: { viewer: Viewer | null }) {
  return (
    <nav aria-label={m.nav_tab_bar()} className="fixed inset-x-0 bottom-0 z-40 border-t bg-card lg:hidden">
      <ul className="grid grid-cols-4">
        <li>
          <Link to="/" activeOptions={{ exact: true }} className={tabLinkClasses}>
            <HouseIcon />
            {m.nav_tab_home()}
          </Link>
        </li>
        <li>
          <MenuSheet />
        </li>
        <li>
          <SearchSheet />
        </li>
        <li>
          {viewer ? (
            <AccountMenu viewer={viewer} variant="tab" />
          ) : (
            <Link to="/auth" className={tabLinkClasses}>
              <UserIcon />
              {m.nav_sign_in()}
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
