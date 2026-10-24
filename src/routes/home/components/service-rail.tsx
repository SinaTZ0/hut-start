import { ArrowLeftIcon, ChevronDownIcon, MenuIcon } from "lucide-react";
import { addTransitionType, startTransition, useId, useState, ViewTransition } from "react";

import { SiteLink } from "#/components/shared/site-link/site-link";
import { textLinkArrowClasses } from "#/components/shared/text-link/text-link.styles";
import { NAV_SECTIONS } from "#/lib/university/navigation";
import { STUDENT_SERVICES, TOP_SERVICES } from "#/lib/university/services";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";

/*===== Constants =====*/

// Five daily systems on the rail; the sixth cell opens the rest.
const RAIL_SERVICES = TOP_SERVICES.slice(0, 5);
const MORE_SERVICES = STUDENT_SERVICES.filter((service) => !RAIL_SERVICES.includes(service));
const ALL_SERVICES_HREF = NAV_SECTIONS.find((section) => section.id === "systems")?.href ?? "";

/*===== Styles =====*/

// Seams are borders on every cell, pulled 1px out so the outer ones fall outside the rounded clip: borders snap to
// whole pixels, where 1px gaps between fractional columns blur or double.
const seamClasses = "-ms-px -mt-px border-s border-t";
// Cells sit inside a clipped rail, so their focus ring is drawn inside.
const cellFocusClasses = "focus-visible:-outline-offset-4";

/*===== Service Rail =====*/

/**
 * The daily systems as one white rail along the foot of the hero. Its last cell opens the other student systems:
 * above the rail on wide screens, under it on phones, with the `home-open` view transition.
 */
export function ServiceRail() {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  // In a transition, so the panel's <ViewTransition> animates it; the type keeps the page from cross-fading.
  const toggle = () =>
    startTransition(() => {
      addTransitionType("home-services");
      setOpen((isOpen) => !isOpen);
    });

  return (
    <nav aria-labelledby="home-services" className="relative z-10 flex flex-col md:flex-col-reverse">
      <h2 id="home-services" className="sr-only">
        {m.home_services_title()}
      </h2>

      {/*===== Rail =====*/}
      <ViewTransition default="home-slide">
        <ul className="grid grid-cols-2 overflow-hidden rounded-md shadow-md sm:grid-cols-3 lg:grid-cols-6">
          {RAIL_SERVICES.map((service) => (
            <li key={service.id} className={seamClasses}>
              <SiteLink
                href={service.href}
                className={`flex h-full flex-col items-center gap-1 bg-card px-3 py-5 text-center text-foreground transition-colors duration-200 hover:bg-accent motion-reduce:transition-none ${cellFocusClasses}`}
              >
                <service.icon aria-hidden className="mb-1.5 size-6 text-brand-text" />
                <span className="text-title text-heading">{service.title()}</span>
                <span className="line-clamp-1 text-caption text-muted-foreground sm:line-clamp-2">
                  {service.description()}
                </span>
              </SiteLink>
            </li>
          ))}
          <li className={seamClasses}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={open ? panelId : undefined}
              onClick={toggle}
              className={`group/all flex size-full flex-col items-center justify-center gap-1 bg-band px-3 py-5 text-center text-on-band transition-colors duration-200 hover:bg-band-deep aria-expanded:bg-band-deep motion-reduce:transition-none ${cellFocusClasses}`}
            >
              <MenuIcon aria-hidden className="mb-1.5 size-6 text-highlight" />
              <span className="text-title">
                {open ? m.home_services_close() : m.home_services_all({ count: STUDENT_SERVICES.length })}
              </span>
              {/* Points to where the list opens: down on phones, up on wide screens; it turns when open. */}
              <ChevronDownIcon
                aria-hidden
                className="size-4.5 text-highlight transition-transform duration-300 group-aria-expanded/all:rotate-180 motion-reduce:transition-none md:rotate-180 md:group-aria-expanded/all:rotate-0"
              />
            </button>
          </li>
        </ul>
      </ViewTransition>

      {/*===== More Systems =====*/}
      {open && (
        <ViewTransition enter="home-open" exit="home-open">
          <div id={panelId} className="mt-4 md:mt-0 md:mb-4">
            <ul className="grid grid-cols-1 overflow-hidden rounded-md shadow-md sm:grid-cols-2 lg:grid-cols-4">
              {MORE_SERVICES.map((service) => (
                <li key={service.id} className={seamClasses}>
                  <SiteLink
                    href={service.href}
                    className={`flex h-full items-start gap-3 bg-card px-5 py-4 text-foreground transition-colors duration-200 hover:bg-accent motion-reduce:transition-none ${cellFocusClasses}`}
                  >
                    <service.icon aria-hidden className="mt-0.5 size-5.5 shrink-0 text-brand-text" />
                    <span>
                      <span className="block text-title text-heading">{service.title()}</span>
                      <span className="block text-caption text-muted-foreground">{service.description()}</span>
                    </span>
                  </SiteLink>
                </li>
              ))}
              <li className={`${seamClasses} sm:col-span-2`}>
                <SiteLink
                  href={ALL_SERVICES_HREF}
                  className={`flex h-full items-center justify-between gap-3 bg-band px-5 py-4 text-title text-on-band transition-colors duration-200 hover:bg-band-deep motion-reduce:transition-none ${cellFocusClasses}`}
                >
                  {m.home_services_guide()}
                  <ArrowLeftIcon aria-hidden className={cn(textLinkArrowClasses, "size-4.5 text-highlight")} />
                </SiteLink>
              </li>
            </ul>
          </div>
        </ViewTransition>
      )}
    </nav>
  );
}
