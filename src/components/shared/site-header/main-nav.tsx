import { ChevronDownIcon } from "lucide-react";
import { type ReactNode, useCallback, useRef, useState } from "react";

import { SiteLink } from "#/components/shared/site-link/site-link";
import { TextLink } from "#/components/shared/text-link/text-link";
import { NAV_SECTIONS, type NavSection } from "#/lib/university/navigation";
import { m } from "#/paraglide/messages";
import { useDismiss } from "./use-dismiss";

/*===== Styles =====*/

// A top-level item: a full-width row in the phone menu, a compact tab on wide screens. Open and hover share the
// quiet `accent` wash.
const sectionLinkClasses =
  "group/section inline-flex w-full items-center justify-between gap-1 border-b px-5 py-4 text-body font-semibold text-foreground transition-colors duration-200 hover:bg-accent hover:text-heading aria-expanded:bg-accent aria-expanded:text-heading motion-reduce:transition-none lg:min-h-10 lg:w-auto lg:justify-start lg:rounded-sm lg:border-b-0 lg:px-3 lg:py-2 lg:text-nav";

const panelLinkClasses =
  "inline-flex min-h-10 items-center text-foreground underline-offset-4 transition-colors duration-200 hover:text-brand-text hover:underline motion-reduce:transition-none";

/*===== Section Panel =====*/

/** A section's links: under its button in the phone menu, a full-width panel under the header on wide screens. */
function SectionPanel({ section, open }: { section: NavSection; open: boolean }) {
  return (
    <div
      id={`nav-panel-${section.id}`}
      hidden={!open}
      className="lg:absolute lg:inset-x-0 lg:top-full lg:border-y lg:bg-card lg:shadow-md"
    >
      <div className="mx-auto grid max-w-site gap-6 px-5 py-4 lg:grid-cols-mega lg:gap-10 lg:px-gutter lg:py-10">
        {/*------ Summary ------*/}
        <div className="flex flex-col gap-2 text-body-sm text-muted-foreground lg:border-e lg:pe-10">
          <p className="hidden text-h3 text-heading lg:block">{section.title()}</p>
          <p>{section.summary()}</p>
          <TextLink href={section.href}>{m.nav_section_page({ title: section.title() })}</TextLink>
        </div>

        {/*------ Groups ------*/}
        {section.groups.map((group) => (
          <div key={group.title()}>
            <h2 className="mb-1 text-title text-highlight-text">
              {group.href ? (
                <SiteLink href={group.href} className="underline-offset-4 hover:underline">
                  {group.title()}
                </SiteLink>
              ) : (
                group.title()
              )}
            </h2>
            <ul className="grid text-body-sm">
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
      </div>
    </div>
  );
}

/*===== Main Nav =====*/

export type MainNavProps = {
  /** The phone menu is open. On wide screens the nav always shows. */
  open: boolean;
  /** Shown at the foot of the phone menu: the controls the header bar has no room for there. */
  footer?: ReactNode;
};

/**
 * The university's main menu. Each section with groups is a disclosure button that opens its panel; one panel is open
 * at a time, and a click outside or Escape closes it. On phones the whole nav drops down under the header.
 */
export function MainNav({ open, footer }: MainNavProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpenId(null), []);
  useDismiss(navRef, openId !== null, close);

  return (
    <nav
      id="site-nav"
      ref={navRef}
      aria-label={m.nav_main()}
      data-open={open}
      className="absolute inset-x-0 top-full hidden max-h-drawer overflow-y-auto border-b bg-card pb-6 shadow-md data-[open=true]:block lg:static lg:flex lg:max-h-none lg:flex-1 lg:justify-center lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
    >
      <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
        {NAV_SECTIONS.map((section) => {
          if (section.groups.length === 0) {
            return (
              <li key={section.id}>
                <SiteLink href={section.href} className={sectionLinkClasses}>
                  {section.title()}
                </SiteLink>
              </li>
            );
          }

          const isOpen = openId === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                className={sectionLinkClasses}
                aria-expanded={isOpen}
                aria-controls={`nav-panel-${section.id}`}
                onClick={() => setOpenId(isOpen ? null : section.id)}
              >
                {section.title()}
                <ChevronDownIcon
                  aria-hidden
                  className="size-4 text-muted-foreground transition-transform duration-300 group-aria-expanded/section:rotate-180 motion-reduce:transition-none"
                />
              </button>
              <SectionPanel section={section} open={isOpen} />
            </li>
          );
        })}
      </ul>
      {footer}
    </nav>
  );
}
