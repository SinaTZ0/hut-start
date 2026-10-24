import { Link } from "@tanstack/react-router";
import { LogInIcon, MenuIcon, UserIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/primitive/button/button";
import { buttonVariants } from "#/components/primitive/button/button.styles";
import { LocaleSwitcher } from "#/components/shared/locale-switcher/locale-switcher";
import { LogoMark } from "#/components/shared/logo-mark/logo-mark";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { ThemeToggle } from "#/components/shared/theme-toggle/theme-toggle";
import { useLocaleLinks } from "#/hooks/use-locale-links";
import { CONTACT_LINK, PORTAL_HREF } from "#/lib/university/navigation";
import { cn } from "#/lib/utils";
import type { Viewer } from "#/orpc/session/contract";
import { m } from "#/paraglide/messages";
import { getLocale, locales } from "#/paraglide/runtime";
import { AccountMenu } from "./account-menu";
import { MainNav } from "./main-nav";
import { ServiceSearch } from "./service-search";

/*===== Styles =====*/

const utilityLinkClasses = "inline-flex min-h-10 items-center gap-1.5 underline-offset-4 hover:underline";

/*===== Brand =====*/

/**
 * The emblem and the university's name, with its name in the other language under it. The English line is set in
 * spaced capitals; spacing would break the joins of Persian letters, so the Persian line isn't.
 */
function Brand() {
  const otherLocale = locales.find((locale) => locale !== getLocale());

  return (
    <Link to="/" className="flex shrink-0 items-center gap-2 rounded-sm text-heading sm:gap-3">
      <span className="grid size-10 place-items-center rounded-sm bg-primary text-primary-foreground sm:size-12">
        <LogoMark className="size-7 sm:size-8" />
      </span>
      <span className="flex flex-col">
        <span className="text-title sm:text-h4">{m.site_name()}</span>
        {otherLocale && (
          <span
            lang={otherLocale}
            className={cn(
              "hidden text-caption text-muted-foreground sm:block",
              otherLocale === "en" && "tracking-wider uppercase",
            )}
          >
            {m.site_name({}, { locale: otherLocale })}
          </span>
        )}
      </span>
    </Link>
  );
}

/*===== Site Header =====*/

/**
 * A pine utility bar (contact, the university portal), then the main bar: brand, the main menu, and the tools
 * (systems search, theme, language, the account menu or sign-in). On phones the menu drops down under the bar and
 * carries the theme and language controls.
 */
export function SiteHeader({ viewer }: { viewer: Viewer | null }) {
  const localeLinks = useLocaleLinks();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-30">
      {/*===== Utility Bar =====*/}
      <div className="bg-band-deep text-caption text-on-band">
        <div className="flex items-center justify-end gap-4 px-edge sm:justify-between">
          <p className="hidden items-center gap-2 before:size-1.5 before:rounded-full before:bg-highlight sm:flex">
            {m.nav_official_site()}
          </p>
          <ul className="flex gap-6">
            <li>
              <SiteLink href={CONTACT_LINK.href} className={utilityLinkClasses}>
                {CONTACT_LINK.label()}
              </SiteLink>
            </li>
            <li>
              <SiteLink href={PORTAL_HREF} className={utilityLinkClasses}>
                {m.nav_portal()}
                <LogInIcon aria-hidden className="size-4 rtl:-scale-x-100" />
              </SiteLink>
            </li>
          </ul>
        </div>
      </div>

      {/*===== Main Bar =====*/}
      <div className="relative border-b bg-background-alt">
        <div className="flex min-h-20 items-center justify-between gap-4 px-edge">
          <Brand />

          <MainNav
            open={menuOpen}
            footer={
              <div className="mx-5 mt-4 flex items-center justify-between sm:hidden">
                <LocaleSwitcher links={localeLinks} />
                <ThemeToggle />
              </div>
            }
          />

          {/*------ Tools ------*/}
          <div className="flex items-center gap-1 border-s ps-2 sm:ps-4">
            <ServiceSearch />
            <ThemeToggle className="max-sm:hidden" />
            <LocaleSwitcher links={localeLinks} className="max-sm:hidden" />
            {viewer ? (
              <AccountMenu viewer={viewer} />
            ) : (
              // A link styled as a button: `<Button render={<Link />}>` would announce it as a button (`role="button"`).
              <Link
                to="/auth"
                aria-label={m.nav_sign_in()}
                className={buttonVariants({ variant: "tool", size: "icon-sm" })}
              >
                <UserIcon />
              </Link>
            )}
            <Button
              variant="tool"
              size="icon-sm"
              className="lg:hidden"
              aria-label={menuOpen ? m.nav_menu_close() : m.nav_menu_open()}
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
