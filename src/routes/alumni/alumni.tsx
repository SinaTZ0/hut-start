import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheckIcon,
  FileTextIcon,
  GraduationCapIcon,
  LandmarkIcon,
  type LucideIcon,
  MailIcon,
  ScaleIcon,
  UsersRoundIcon,
} from "lucide-react";

import { ArchivePosts } from "#/components/shared/archive-posts/archive-posts";
import { LinkTile } from "#/components/shared/link-tile/link-tile";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";
import { pageMeta } from "#/lib/seo";
import { PAGE_DRAWINGS } from "#/lib/university/drawings";
import { archiveHref } from "#/lib/university/feed";
import { SOCIAL_LINKS } from "#/lib/university/navigation";
import { orpc } from "#/orpc/client";
import { m } from "#/paraglide/messages";

/*===== Query =====*/
// «دانش‌آموخت» finds every form of the word in the archive: دانش‌آموخته, دانش‌آموختگان, دانش‌آموختگی.
const ALUMNI_SEARCH = "دانش‌آموخت";
const postsQuery = () => orpc.homeFeed.list.queryOptions({ input: { q: ALUMNI_SEARCH } });

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/alumni")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery()),
  head: (args) => pageMeta({ args, title: m.alumni_title(), description: m.alumni_lede() }),
  component: AlumniPage,
});

/*===== Content =====*/
// The old alumni site (`/web/دانش-آموختگان`) was its template's placeholder slides, so the page gathers what the
// university does for its graduates: the admissions and alumni office's documents, and ways to stay in touch.

type Tile = { href: string; title: () => string; description: () => string; icon: LucideIcon };

const LINKEDIN_HREF = SOCIAL_LINKS.find((link) => link.href.includes("linkedin"))?.href ?? "";

const DOCUMENTS: Tile[] = [
  {
    href: "/offices/alumni-affairs",
    title: m.alumni_office,
    description: m.alumni_office_description,
    icon: LandmarkIcon,
  },
  {
    href: "https://portal.saorg.ir/",
    title: m.alumni_sajad,
    description: m.alumni_sajad_description,
    icon: BadgeCheckIcon,
  },
  {
    href: "https://web.hut.ac.ir/web/edu/آیین-نامه-دانش-آموختگان",
    title: m.alumni_regulations,
    description: m.alumni_regulations_description,
    icon: ScaleIcon,
  },
  { href: "/forms", title: m.alumni_forms, description: m.alumni_forms_description, icon: FileTextIcon },
];

const IN_TOUCH: Tile[] = [
  {
    href: LINKEDIN_HREF,
    title: m.nav_social_linkedin,
    description: m.alumni_linkedin_description,
    icon: UsersRoundIcon,
  },
  {
    href: "/offices/graduate",
    title: m.alumni_graduate,
    description: m.alumni_graduate_description,
    icon: GraduationCapIcon,
  },
  { href: "mailto:egrad@hut.ac.ir", title: m.alumni_email, description: m.alumni_email_description, icon: MailIcon },
];

/*===== Page =====*/

/** The university's graduates: their documents and the office that issues them, ways to stay in touch, then news. */
function AlumniPage() {
  const { data: posts } = useSuspenseQuery(postsQuery());

  const sections = [
    { id: "documents", title: m.alumni_documents_title(), tiles: DOCUMENTS },
    { id: "in-touch", title: m.alumni_in_touch_title(), tiles: IN_TOUCH },
  ];

  return (
    <>
      <PageHero
        id="alumni-title"
        crumbs={[{ label: m.nav_education(), href: "/education" }, { label: m.alumni_title() }]}
        title={m.alumni_title()}
        lede={m.alumni_lede()}
        drawing={PAGE_DRAWINGS.documents}
      />

      {sections.map((section, index) => (
        <section key={section.id} aria-labelledby={`alumni-${section.id}-title`} className="border-t bg-background">
          <div className="mx-auto max-w-site px-gutter py-12 md:py-section">
            <RuledHeading id={`alumni-${section.id}-title`} number={index + 1} title={section.title} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.tiles.map((tile) => (
                <li key={tile.href}>
                  <LinkTile href={tile.href} title={tile.title()} description={tile.description()} icon={tile.icon} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/*===== News =====*/}
      {posts.items.length > 0 && (
        <section aria-labelledby="alumni-news-title" className="border-t bg-background-alt">
          <div className="mx-auto max-w-site px-gutter py-12 md:py-section">
            <RuledHeading id="alumni-news-title" number={sections.length + 1} title={m.alumni_news_title()} />
            <div className="mt-8">
              <ArchivePosts
                items={posts.items}
                moreHref={archiveHref({ q: ALUMNI_SEARCH })}
                moreLabel={m.publications_posts_more({ count: posts.total })}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
