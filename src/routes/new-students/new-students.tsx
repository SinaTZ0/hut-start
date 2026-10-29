import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { LinkTile } from "#/components/shared/link-tile/link-tile";
import { NoticeList } from "#/components/shared/notice-list/notice-list";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";
import { TextLink } from "#/components/shared/text-link/text-link";
import { pageMeta } from "#/lib/seo";
import { NEW_STUDENTS_DRAWING } from "#/lib/university/drawings";
import { orpc } from "#/orpc/client";
import { m } from "#/paraglide/messages";
import { FIRST_STEPS } from "./content";

/*===== Query =====*/
const newStudentPostsQuery = () => orpc.homeFeed.newStudents.queryOptions();

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/new-students")({
  loader: ({ context }) => context.queryClient.ensureQueryData(newStudentPostsQuery()),
  head: (args) => pageMeta({ args, title: m.new_students_title(), description: m.new_students_lede() }),
  component: NewStudentsPage,
});

/*===== Page =====*/

/**
 * A page for one audience, the year's new students: their first steps as tiles, in the order they take them, then the
 * newest notices addressed to them.
 */
function NewStudentsPage() {
  const { data: posts } = useSuspenseQuery(newStudentPostsQuery());

  return (
    <>
      <PageHero
        id="new-students-title"
        crumbs={[{ label: m.nav_education(), href: "/education" }, { label: m.new_students_title() }]}
        title={m.new_students_title()}
        lede={m.new_students_lede()}
        drawing={NEW_STUDENTS_DRAWING}
      />

      {/*===== First Steps =====*/}
      <section aria-labelledby="new-students-steps" className="mx-auto max-w-site px-gutter pb-section">
        <RuledHeading id="new-students-steps" number={1} title={m.new_students_steps_title()} />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FIRST_STEPS.map((step) => (
            <li key={step.href}>
              <LinkTile href={step.href} title={step.title()} description={step.description()} icon={step.icon} />
            </li>
          ))}
        </ol>
      </section>

      {/*===== Notices =====*/}
      <section aria-labelledby="new-students-notices" className="border-t bg-background-alt">
        <div className="mx-auto max-w-site px-gutter py-section">
          <RuledHeading
            id="new-students-notices"
            number={2}
            title={m.new_students_notices_title()}
            action={<TextLink href="/news">{m.home_notices_more_all()}</TextLink>}
          />
          <div className="mt-8 max-w-4xl">
            {posts.length > 0 ? (
              <NoticeList items={posts} />
            ) : (
              <p className="text-muted-foreground">{m.section_notices_empty()}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
