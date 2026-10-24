import { ArrowLeftIcon, ExternalLinkIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import type { ReactNode } from "react";

import { LogoMark } from "#/components/shared/logo-mark/logo-mark";
import { SiteLink } from "#/components/shared/site-link/site-link";
import {
  CONTACT,
  CONTACT_LINK,
  FOOTER_LINKS,
  type NavLink,
  RELATED_SITES,
  SOCIAL_LINKS,
} from "#/lib/university/navigation";
import { STAFF_SERVICES, TOP_SERVICES } from "#/lib/university/services";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import { getLocale, locales } from "#/paraglide/runtime";

/*===== Styles =====*/

// Links on the band brighten and underline on hover. Each keeps a 40px row for touch.
const linkClasses =
  "inline-flex min-h-10 items-center text-on-band-soft underline-offset-4 transition-colors duration-200 hover:text-on-band hover:underline motion-reduce:transition-none";
const headingClasses = "mb-2 text-title text-on-band";
const contactIconClasses = "mt-0.5 size-5 shrink-0 text-highlight";

/*===== Link Column =====*/

function LinkColumn({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className={headingClasses}>
        {title}
      </h2>
      <ul className="grid">{children}</ul>
    </nav>
  );
}

function LinkItem({ link }: { link: NavLink }) {
  return (
    <li>
      <SiteLink href={link.href} className={linkClasses}>
        {link.label()}
      </SiteLink>
    </li>
  );
}

/*===== Site Footer =====*/

/**
 * The pine footer: the brand and social links, three columns of links (the university, student systems, staff
 * systems), the contact details, the related sites, and the copyright line.
 */
export function SiteFooter() {
  const otherLocale = locales.find((locale) => locale !== getLocale());

  return (
    <footer className="bg-band-deep text-body-sm text-on-band-muted">
      <div className="mx-auto max-w-site px-gutter pt-section">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-footer">
          {/*===== Brand =====*/}
          <div className="col-span-full lg:col-auto">
            <p className="flex items-center gap-3 text-on-band">
              <span className="grid size-12 shrink-0 place-items-center rounded-sm border border-band-line">
                <LogoMark />
              </span>
              <span className="flex flex-col">
                <span className="text-h4">{m.site_name()}</span>
                {otherLocale && (
                  <span
                    lang={otherLocale}
                    className={cn(
                      "text-caption text-on-band-muted",
                      otherLocale === "en" && "tracking-wider uppercase",
                    )}
                  >
                    {m.site_name({}, { locale: otherLocale })}
                  </span>
                )}
              </span>
            </p>
            <p className="my-4">{m.site_description()}</p>
            <ul className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <SiteLink
                    href={link.href}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-sm border border-band-line px-3.5 text-caption text-on-band-soft transition-colors duration-200 hover:border-highlight hover:text-on-band motion-reduce:transition-none"
                  >
                    <ExternalLinkIcon aria-hidden className="size-3.5" />
                    {link.label()}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>

          {/*===== Link Columns =====*/}
          <LinkColumn id="footer-links" title={m.nav_footer_links()}>
            {FOOTER_LINKS.map((link) => (
              <LinkItem key={link.href} link={link} />
            ))}
          </LinkColumn>

          <LinkColumn id="footer-student-systems" title={m.nav_footer_student_systems()}>
            {TOP_SERVICES.slice(0, 6).map((service) => (
              <LinkItem key={service.id} link={{ label: service.title, href: service.href }} />
            ))}
          </LinkColumn>

          <LinkColumn id="footer-staff-systems" title={m.service_group_staff()}>
            {STAFF_SERVICES.map((service) => (
              <li key={service.id}>
                <SiteLink href={service.href} className={linkClasses}>
                  {service.short()}
                </SiteLink>
                {service.internalOnly && <span className="text-caption"> {m.nav_footer_internal()}</span>}
              </li>
            ))}
          </LinkColumn>

          {/*===== Contact =====*/}
          <div className="col-span-full sm:col-auto">
            <h2 className={headingClasses}>{m.nav_footer_contact()}</h2>
            <address className="grid gap-2 not-italic">
              <p className="flex items-start gap-2.5">
                <MapPinIcon aria-hidden className={contactIconClasses} />
                <SiteLink href={CONTACT.mapHref} className={cn(linkClasses, "min-h-0")}>
                  {m.site_address()}
                </SiteLink>
              </p>
              <p className="flex items-center gap-2.5">
                <PhoneIcon aria-hidden className={contactIconClasses} />
                <a href={CONTACT.phoneHref} dir="ltr" className={linkClasses}>
                  {m.site_phone()}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <MailIcon aria-hidden className={contactIconClasses} />
                <a href={`mailto:${CONTACT.email}`} dir="ltr" className={linkClasses}>
                  {CONTACT.email}
                </a>
              </p>
              <p className="flex flex-wrap gap-x-4 gap-y-1 text-caption">
                <span className="whitespace-nowrap">
                  {m.nav_fax()} <span dir="ltr">{m.site_fax()}</span>
                </span>
                <span className="whitespace-nowrap">
                  {m.nav_po_box()} <span dir="ltr">{m.site_po_box()}</span>
                </span>
              </p>
            </address>
            <SiteLink
              href={CONTACT_LINK.href}
              className="mt-4 inline-flex min-h-10 items-center gap-2 font-bold text-highlight underline-offset-4 hover:underline"
            >
              {CONTACT_LINK.label()}
              <ArrowLeftIcon aria-hidden className="size-4 ltr:-scale-x-100" />
            </SiteLink>
          </div>
        </div>

        {/*===== Related Sites =====*/}
        <nav aria-labelledby="footer-related" className="mt-10 border-t border-band-line py-6">
          <h2 id="footer-related" className={headingClasses}>
            {m.nav_footer_related()}
          </h2>
          <ul className="flex flex-wrap gap-x-6 text-caption">
            {RELATED_SITES.map((link) => (
              <LinkItem key={link.href} link={link} />
            ))}
          </ul>
        </nav>

        {/*===== Copyright =====*/}
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-band-line py-5 text-caption">
          <p>{m.nav_footer_copyright()}</p>
          <p lang="en" dir="ltr" className="font-semibold tracking-widest">
            {m.site_place()}
          </p>
        </div>
      </div>
    </footer>
  );
}
