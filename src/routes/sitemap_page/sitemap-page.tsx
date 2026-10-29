import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { TextLink } from "#/components/shared/text-link/text-link";
import { pageMeta } from "#/lib/seo";
import { FOOTER_LINKS, type NavGroup, NAV_SECTIONS } from "#/lib/university/navigation";
import { SERVICES } from "#/lib/university/services";
import { m } from "#/paraglide/messages";

/*===== Route =====*/
// `/sitemap`; the slice isn't `sitemap/`, which is the search engines' `/sitemap.xml`.
export const Route = createFileRoute("/_site-layout/sitemap")({
  head: (args) => pageMeta({ args, title: m.nav_sitemap(), description: m.sitemap_lede() }),
  component: SitemapPage,
});

/*===== Page =====*/

/** Every page and system the menus link to, built from the same lists the header and footer read. */
function SitemapPage() {
  const systemsSection = NAV_SECTIONS.find((section) => section.id === "systems");
  const sections = NAV_SECTIONS.filter((section) => section.groups.length > 0);
  const extras: NavGroup[] = [
    {
      title: m.nav_systems,
      href: systemsSection?.href,
      links: SERVICES.map((s) => ({ label: s.title, href: s.href })),
    },
    { title: m.sitemap_more, links: FOOTER_LINKS.filter((link) => link.href !== "/sitemap") },
  ];

  return (
    <>
      <PageHero
        id="sitemap-title"
        crumbs={[{ label: m.nav_sitemap() }]}
        title={m.nav_sitemap()}
        lede={m.sitemap_lede()}
      />
      {[
        ...sections.map((section) => ({
          id: section.id,
          title: section.title(),
          href: section.href,
          groups: section.groups,
        })),
        { id: "more", title: m.sitemap_more(), href: undefined, groups: extras },
      ].map((section, index) => (
        <section key={section.id} aria-labelledby={`sitemap-${section.id}`} className="border-t">
          <div className="mx-auto max-w-site px-gutter py-12">
            <RuledHeading
              id={`sitemap-${section.id}`}
              number={index + 1}
              title={section.title}
              action={section.href && <TextLink href={section.href}>{m.sitemap_open_section()}</TextLink>}
            />
            <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {section.groups.map((group) => (
                <div key={group.title()}>
                  <h3 className="text-h4">
                    {group.href ? (
                      <SiteLink href={group.href} className="hover:underline">
                        {group.title()}
                      </SiteLink>
                    ) : (
                      group.title()
                    )}
                  </h3>
                  <ul className="mt-3 grid gap-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <SiteLink
                          href={link.href}
                          className="text-body text-muted-foreground underline-offset-4 hover:text-brand-text hover:underline"
                        >
                          {link.label()}
                        </SiteLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
