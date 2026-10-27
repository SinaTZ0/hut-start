import { Link, useMatches } from "@tanstack/react-router";
import { LogInIcon, UserIcon } from "lucide-react";

import type { NavigationMenuTone } from "#/components/primitive/navigation-menu/navigation-menu";
import { buttonVariants } from "#/components/primitive/button/button.styles";
import { LocaleSwitcher } from "#/components/shared/locale-switcher/locale-switcher";
import { LogoMark } from "#/components/shared/logo-mark/logo-mark";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { ThemeToggle } from "#/components/shared/theme-toggle/theme-toggle";
import { useLocaleLinks } from "#/hooks/use-locale-links";
import { PORTAL_HREF } from "#/lib/university/navigation";
import { cn } from "#/lib/utils";
import type { Viewer } from "#/orpc/session/contract";
import { m } from "#/paraglide/messages";
import { getLocale, locales } from "#/paraglide/runtime";
import { AccountMenu } from "./account-menu";
import { MainNav } from "./main-nav";
import { ServiceSearch } from "./service-search";
import { TabBar } from "./tab-bar";
import { useScrolled } from "./use-scrolled";

/*===== Tones =====*/
// The bar is transparent over the page's top, so what it sits on decides its tone (`navigation-menu.styles.ts` →
// Tones), and the tone the tools' button variants.

type HeaderTone = NavigationMenuTone;

const TOOL_VARIANT = { paper: "tool", glass: "tool-glass", frost: "tool-frost" } as const;
const LOCALE_VARIANT = { paper: "ghost", glass: "tool-glass", frost: "tool-frost" } as const;
const PORTAL_VARIANT = { paper: "outline", glass: "tool-glass", frost: "tool-frost" } as const;

const brandTone = {
  paper: { name: "text-heading", other: "text-muted-foreground" },
  frost: { name: "text-heading", other: "text-muted-foreground" },
  glass: { name: "text-on-band text-shadow-photo", other: "text-on-band-soft text-shadow-photo" },
} as const satisfies Record<HeaderTone, { name: string; other: string }>;

/*===== Brand =====*/

/**
 * The emblem and the university's name, with its name in the other language under it on wide screens until the bar
 * turns compact. The English line is set in spaced capitals; spacing would break the joins of Persian letters, so the
 * Persian line isn't.
 */
function Brand({ tone, compact }: { tone: HeaderTone; compact: boolean }) {
  const otherLocale = locales.find((locale) => locale !== getLocale());
  const styles = brandTone[tone];

  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5 rounded-sm sm:gap-3">
      <LogoMark className={cn("size-7.5 text-current", !compact && "lg:size-9", styles.name)} />
      <span className="flex flex-col">
        <span className={cn("text-title sm:text-h4", styles.name)}>{m.site_name()}</span>
        {otherLocale && !compact && (
          <span
            lang={otherLocale}
            className={cn(
              "hidden text-caption sm:block",
              otherLocale === "en" && "tracking-wider uppercase",
              styles.other,
            )}
          >
            {m.site_name({}, { locale: otherLocale })}
          </span>
        )}
      </span>
    </Link>
  );
}

/*===== Portal =====*/

/** The university portal: an icon on phones, labelled «پرتال» on wide screens. */
function PortalLink({ tone, iconOnly = false }: { tone: HeaderTone; iconOnly?: boolean }) {
  return (
    <SiteLink
      href={PORTAL_HREF}
      aria-label={iconOnly ? m.nav_portal() : undefined}
      className={buttonVariants({ variant: PORTAL_VARIANT[tone], size: iconOnly ? "icon-sm" : "sm" })}
    >
      <LogInIcon data-icon={iconOnly ? undefined : "inline-start"} className="rtl:-scale-x-100" />
      {!iconOnly && m.nav_portal_short()}
    </SiteLink>
  );
}

/*===== Tools =====*/

/** Systems search, theme, language, and the account menu or sign-in, then the portal: wide screens only. */
function HeaderTools({ viewer, tone }: { viewer: Viewer | null; tone: HeaderTone }) {
  const localeLinks = useLocaleLinks();
  const toolVariant = TOOL_VARIANT[tone];

  return (
    <div className="hidden items-center gap-1.5 lg:flex">
      <ServiceSearch variant={toolVariant} />
      <ThemeToggle variant={toolVariant} />
      <LocaleSwitcher links={localeLinks} variant={LOCALE_VARIANT[tone]} />
      {viewer ? (
        <AccountMenu viewer={viewer} variant={toolVariant} />
      ) : (
        // A link styled as a button: `<Button render={<Link />}>` would announce it as a button (`role="button"`).
        <Link
          to="/auth"
          aria-label={m.nav_sign_in()}
          className={buttonVariants({ variant: toolVariant, size: "icon-sm" })}
        >
          <UserIcon />
        </Link>
      )}
      <PortalLink tone={tone} />
    </div>
  );
}

/*===== Site Header =====*/

/**
 * A transparent bar laid over the page's top: white on the home page's photo, under a scrim that keeps it readable, with
 * the menu in a glass capsule; ink on the other pages, in frosted paper. On wide screens it sticks to the top and
 * turns to frosted paper once the page scrolls. It takes no room in the page: `main` and the hero leave room for it
 * (`--header-height` in `styles.css`). Below `lg` the bar keeps only the brand and the portal, and the menu and tools
 * move to the tab bar at the bottom of the screen.
 */
export function SiteHeader({ viewer }: { viewer: Viewer | null }) {
  const scrolled = useScrolled();
  const onPhoto = useMatches({ select: (matches) => matches.at(-1)?.fullPath === "/" });
  const tone: HeaderTone = scrolled ? "paper" : onPhoto ? "glass" : "frost";

  return (
    <>
      <header
        data-site-header
        className="pointer-events-none absolute inset-x-0 top-0 isolate z-30 lg:sticky lg:-mb-19 lg:h-19"
      >
        {tone === "glass" && (
          <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-30 bg-header-scrim lg:h-42.5" />
        )}
        <div
          className={cn(
            "pointer-events-auto relative flex h-15 items-center gap-6 border-b border-transparent px-edge transition-all duration-300 ease-out motion-reduce:transition-none",
            scrolled ? "border-border text-heading shadow-lg" : "lg:h-19",
            tone === "glass" ? "text-on-band" : "text-heading",
          )}
        >
          {/*------ Frosted Paper ------*/}
          {/* A layer of its own that fades, not the bar's background: an element with a backdrop filter cuts off the
              backdrop of the blurs inside it, so on the bar the menu's glass capsule would only blur the photo once
              the bar's own filter finished fading, and pop in at the end. */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 -z-10 bg-background-alt/78 backdrop-blur-lg backdrop-saturate-140 transition-opacity duration-300 ease-out motion-reduce:transition-none",
              !scrolled && "opacity-0",
            )}
          />
          <Brand tone={tone} compact={scrolled} />
          <MainNav tone={tone} className="mx-auto hidden lg:flex" />
          <HeaderTools viewer={viewer} tone={tone} />
          <div className="ms-auto lg:hidden">
            <PortalLink tone={tone} iconOnly />
          </div>
        </div>
      </header>
      <TabBar viewer={viewer} />
    </>
  );
}
