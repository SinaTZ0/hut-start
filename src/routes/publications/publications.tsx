import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpenTextIcon, NewspaperIcon } from "lucide-react";

import { ArchivePosts } from "#/components/shared/archive-posts/archive-posts";
import { LinkTile } from "#/components/shared/link-tile/link-tile";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";
import { TextLink } from "#/components/shared/text-link/text-link";
import { formatDateParts, isoToDate } from "#/lib/locale";
import { pageMeta } from "#/lib/seo";
import { PAGE_DRAWINGS } from "#/lib/university/drawings";
import { archiveHref } from "#/lib/university/feed";
import { orpc } from "#/orpc/client";
import { m } from "#/paraglide/messages";
import { type Publication, PUBLICATIONS_SEARCH, STUDENT_PUBLICATIONS, UNIVERSITY_JOURNAL } from "./titles";

/*===== Query =====*/
const postsQuery = () => orpc.homeFeed.list.queryOptions({ input: { q: PUBLICATIONS_SEARCH } });

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/publications")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery()),
  head: (args) => pageMeta({ args, title: m.nav_campus_life_publications(), description: m.publications_lede() }),
  component: PublicationsPage,
});

/*===== Constants =====*/
const ASSOCIATIONS_HREF = "https://student.hut.ac.ir/انجمن-های-علمی-صنعتی";

/*===== Page =====*/

/**
 * The student associations' magazines and the university's journal, each with its latest issue and a link to its
 * posts in the archive, then the newest posts about any of them.
 */
function PublicationsPage() {
  const { data: posts } = useSuspenseQuery(postsQuery());

  return (
    <>
      <PageHero
        id="publications-title"
        crumbs={[{ label: m.nav_campus_life(), href: "/campus-life" }, { label: m.nav_campus_life_publications() }]}
        title={m.nav_campus_life_publications()}
        lede={m.publications_lede()}
        drawing={PAGE_DRAWINGS.archive}
      />

      {/*===== Student Publications =====*/}
      <section aria-labelledby="publications-student-title" className="border-t bg-background">
        <div className="mx-auto max-w-site px-gutter py-12 md:py-section">
          <RuledHeading
            id="publications-student-title"
            number={1}
            title={m.publications_student_title()}
            action={<TextLink href={ASSOCIATIONS_HREF}>{m.nav_campus_life_associations()}</TextLink>}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {STUDENT_PUBLICATIONS.map((publication) => (
              <li key={publication.id}>
                <PublicationTile publication={publication} icon="magazine" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*===== Journal =====*/}
      <section aria-labelledby="publications-journal-title" className="border-t bg-background">
        <div className="mx-auto max-w-site px-gutter py-12 md:py-section">
          <RuledHeading id="publications-journal-title" number={2} title={m.publications_journal_title()} />
          <div className="mt-8 sm:max-w-1/2">
            <PublicationTile publication={UNIVERSITY_JOURNAL} icon="journal" />
          </div>
        </div>
      </section>

      {/*===== Posts =====*/}
      {posts.items.length > 0 && (
        <section aria-labelledby="publications-posts-title" className="border-t bg-background-alt">
          <div className="mx-auto max-w-site px-gutter py-12 md:py-section">
            <RuledHeading id="publications-posts-title" number={3} title={m.publications_posts_title()} />
            <div className="mt-8">
              <ArchivePosts
                items={posts.items}
                moreHref={archiveHref({ q: PUBLICATIONS_SEARCH })}
                moreLabel={m.publications_posts_more({ count: posts.total })}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/*===== Publication =====*/

/** A publication as a tile: its name, who publishes it, and its latest issue, linking to its posts in the archive. */
function PublicationTile({ publication, icon }: { publication: Publication; icon: "magazine" | "journal" }) {
  // «آبان ۱۴۰۴», from the parts: Persian's own month-and-year format puts the year first.
  const { month, year } = formatDateParts(isoToDate(publication.issuedOn));
  const issue = m.publications_issue({ issue: publication.issue, date: `${month} ${year}` });
  return (
    <LinkTile
      href={archiveHref({ q: publication.search })}
      title={publication.name()}
      description={publication.publisher ? `${publication.publisher()} · ${issue}` : issue}
      icon={icon === "journal" ? BookOpenTextIcon : NewspaperIcon}
    />
  );
}
