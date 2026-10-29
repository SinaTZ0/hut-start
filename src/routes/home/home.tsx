import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { absoluteUrl, jsonLd, pageMeta } from "#/lib/seo";
import { orpc } from "#/orpc/client";
import { m } from "#/paraglide/messages";
import { localizeHref } from "#/paraglide/runtime";
import { Achievements } from "./components/achievements";
import { Arc } from "./components/arc";
import { Courses } from "./components/courses";
import { Glance } from "./components/glance";
import { Hero } from "./components/hero";
import { Incubator } from "./components/incubator";
import { NewsSection } from "./components/news-section";
import { SemesterSection } from "./components/semester-section";
import { ServiceRail } from "./components/service-rail";
import { Welcome } from "./components/welcome";
import { SEMESTER, semesterState, todayInTehran } from "#/lib/university/semester";

/*===== Query =====*/
const homeFeedQuery = () => orpc.homeFeed.get.queryOptions();

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(homeFeedQuery()),
  // A public page: the full set of tags, plus structured data that tells search engines the site's name.
  head: (args) => ({
    ...pageMeta({ args }),
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: m.site_name(),
        url: absoluteUrl({ matches: args.matches, path: localizeHref("/") }),
      }),
    ],
  }),
  component: Home,
});

/*===== Styles =====*/

// The centred content column every section uses.
const columnClasses = "mx-auto max-w-site px-gutter";

/*===== Home =====*/

/**
 * The university's front door: the campus photo with the daily systems, news and notices, the semester, the glance
 * band, achievements, the incubator, open-education courses, and a welcome for new students.
 */
function Home() {
  const { data: feed } = useSuspenseQuery(homeFeedQuery());
  // Today in Tehran, once per page view. The server and the browser agree on it except across midnight.
  const today = useMemo(() => todayInTehran(), []);
  const semester = useMemo(() => semesterState({ events: SEMESTER.events, today }), [today]);

  return (
    <>
      <Hero next={semester.nextMilestone} occasion={feed.occasion}>
        <ServiceRail />
      </Hero>

      <Arc />
      <div className={`${columnClasses} pt-after-arc pb-section`}>
        <NewsSection today={today} news={feed.news} notices={feed.notices} />
      </div>
      <div className="border-y bg-background-alt">
        <div className={`${columnClasses} py-section`}>
          <SemesterSection state={semester} />
        </div>
      </div>

      <Glance spotlight={feed.spotlight} />
      <Arc tone="band" />

      <div className={`${columnClasses} pt-after-arc pb-section`}>
        <Achievements items={feed.achievements} />
      </div>
      <div className="border-y bg-background-alt">
        <div className={`${columnClasses} py-section`}>
          <Incubator items={feed.growth} />
        </div>
      </div>
      {/* Courses and Welcome share the page's background, so one padding frames both and a gap parts them. */}
      <div className={`${columnClasses} flex flex-col gap-section py-section`}>
        <Courses items={feed.courses} />
        <Welcome />
      </div>
    </>
  );
}
