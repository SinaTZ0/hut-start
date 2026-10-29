import { createFileRoute } from "@tanstack/react-router";
import { SITE_ORIGIN } from "#/lib/site.server";
import { client } from "#/orpc/client";
import { type Locale, localizeHref, locales } from "#/paraglide/runtime";

/*===== Entries =====*/
type SitemapEntry = { path: string; lastModified?: Date };

// Every public page meant for search results, by its plain path (no locale prefix). Pages with
// `pageMeta({ index: false })` stay out.
const STATIC_ENTRIES: SitemapEntry[] = [
  { path: "/" },
  { path: "/feedback" },
  { path: "/consultation" },
  { path: "/privacy" },
  { path: "/about" },
  { path: "/education" },
  { path: "/research" },
  { path: "/campus-life" },
  { path: "/departments" },
  { path: "/services" },
  { path: "/payments" },
  { path: "/sitemap" },
  { path: "/phonebook" },
  { path: "/forms" },
  { path: "/news" },
  { path: "/contact" },
  { path: "/publications" },
  { path: "/alumni" },
  { path: "/calendar" },
];

/*===== sitemap.xml =====*/
/**
 * `GET /sitemap.xml`: the pages search engines should list, for `robots.txt` to point at. Each page is listed once per
 * locale, and each listing names the page in every locale (`xhtml:link`), as `hreflang` does in the page's head.
 *
 * Content pages (articles, products) add one entry each here, read through the oRPC `client` (`#/orpc/client`) from a
 * procedure that returns only published items, with `lastModified` from their update time (`docs/frontend/seo.md`).
 */
async function handleGet() {
  const [departments, offices] = await Promise.all([client.department.list(), client.office.list()]);
  const entries: SitemapEntry[] = [
    ...STATIC_ENTRIES,
    ...departments.map((department) => ({
      path: `/departments/${department.slug}`,
      lastModified: department.updatedAt,
    })),
    ...departments.map((department) => ({
      path: `/departments/${department.slug}/labs`,
      lastModified: department.updatedAt,
    })),
    ...offices.map((office) => ({ path: `/offices/${office.slug}`, lastModified: office.updatedAt })),
  ];

  const urls = entries.flatMap(({ path, lastModified }) => {
    const lastmod = lastModified ? `<lastmod>${lastModified.toISOString()}</lastmod>` : "";
    const localized = locales.map((locale) => ({ locale, url: localizedUrl({ path, locale }) }));
    const alternates =
      localized.length > 1
        ? localized
            .map(({ locale, url }) => `<xhtml:link rel="alternate" hreflang="${locale}" href="${url}"/>`)
            .join("")
        : "";
    return localized.map(({ url }) => `<url><loc>${url}</loc>${alternates}${lastmod}</url>`);
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}

/** A page's absolute URL in one locale, escaped for XML. */
function localizedUrl({ path, locale }: { path: string; locale: Locale }): string {
  return escapeXml(new URL(localizeHref(path, { locale }), SITE_ORIGIN).href);
}

/** Escapes the characters XML reserves. URLs can hold `&` (a query) and Persian slugs are percent-encoded by `URL`. */
function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/*===== Route =====*/
export const Route = createFileRoute("/sitemap.xml")({
  server: { handlers: { GET: handleGet } },
});
