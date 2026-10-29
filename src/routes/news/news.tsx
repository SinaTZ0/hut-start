import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { SearchXIcon } from "lucide-react";
import { useCallback } from "react";

import { Button } from "#/components/primitive/button/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/primitive/select/select";
import { FeedList, FeedRow } from "#/components/shared/feed-row/feed-row";
import { FilterChips } from "#/components/shared/filter-chips/filter-chips";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { SearchField } from "#/components/shared/search-field/search-field";
import { useSearchText } from "#/hooks/use-search-text";
import { formatNumber } from "#/lib/locale";
import { pageMeta } from "#/lib/seo";
import { PAGE_DRAWINGS } from "#/lib/university/drawings";
import { KIND_LABELS, NEWS_CATEGORIES } from "#/lib/university/feed";
import { orpc } from "#/orpc/client";
import { ARCHIVE_SORTS, type ArchiveKind, type ArchiveSort, type FeedCategory } from "#/orpc/home-feed/constants";
import type { ArchivePage } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { getLocale } from "#/paraglide/runtime";
import { ArchivePages, RESULTS_ID } from "./components/archive-pages";
import { newsSearchDefaults, newsSearchSchema, type NewsSearch } from "./search-params";

/*===== Query =====*/
// An empty search is left out, so `/news` and `/news?q=` share one cached result.
const archiveQuery = ({ q, ...filters }: NewsSearch) =>
  orpc.homeFeed.list.queryOptions({ input: { ...filters, q: q || undefined } });

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/news")({
  validateSearch: newsSearchSchema,
  search: { middlewares: [stripSearchParams(newsSearchDefaults)] },
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(archiveQuery(deps)),
  head: (args) => pageMeta({ args, title: m.news_title(), description: m.news_description() }),
  component: NewsPage,
});

/*===== Labels =====*/

const SORT_LABELS: Record<ArchiveSort, () => string> = {
  newest: m.news_sort_newest,
  oldest: m.news_sort_oldest,
};

/** A year as a year, without the thousands separator a count would have: «۱۴۰۴», not «۱٬۴۰۴». */
const yearLabel = (year: number) => formatNumber(year, { useGrouping: false });

/** «اطلاعیه · تحصیلات تکمیلی»; the incubator's stories, whose kind and category are both the incubator, name it once. */
function rowLabel({ kind, category }: { kind: ArchiveKind; category: FeedCategory }): string {
  const one = KIND_LABELS[kind].one();
  const topic = NEWS_CATEGORIES[category].title();
  return one === topic ? one : `${one} · ${topic}`;
}

/*===== Page =====*/

/**
 * The archive of every news story, notice, achievement, course and incubator story: a search and the kinds as chips
 * in the head, then the topics, the year and the order over the list, a page of twenty at a time. The list, its
 * counts and the pages come from the server; every filter lives in the URL, so a filtered list can be shared.
 */
function NewsPage() {
  const search = Route.useSearch();
  const { data: archive } = useSuspenseQuery(archiveQuery(search));
  const navigate = Route.useNavigate();

  // A filter change starts again from the first page, which might otherwise be past the new list's end.
  const filter = useCallback(
    (next: Partial<NewsSearch>) =>
      void navigate({ search: (prev) => ({ ...prev, ...next, page: 1 }), replace: true, resetScroll: false }),
    [navigate],
  );
  const commitText = useCallback((q: string) => filter({ q }), [filter]);
  const [text, setText] = useSearchText({ value: search.q, onCommit: commitText });

  const filtered = Boolean(search.kind || search.category || search.q || search.year !== undefined);

  return (
    <>
      <PageHero
        id="news-title"
        crumbs={[{ label: m.news_title() }]}
        title={m.news_title()}
        lede={m.news_lede()}
        drawing={PAGE_DRAWINGS.archive}
      >
        <SearchField
          label={m.news_search_label()}
          placeholder={m.news_search_placeholder()}
          value={text}
          onValueChange={setText}
        />
        <KindChips archive={archive} value={search.kind} onValueChange={(kind) => filter({ kind })} />
        {getLocale() !== "fa" && <p className="text-body-sm text-muted-foreground">{m.news_persian_only()}</p>}
      </PageHero>

      <div className="mx-auto max-w-site px-gutter pb-section">
        {/*===== Filters =====*/}
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
          <TopicChips archive={archive} value={search.category} onValueChange={(category) => filter({ category })} />
          <div className="flex flex-wrap gap-3">
            <YearSelect archive={archive} value={search.year} onValueChange={(year) => filter({ year })} />
            <SortSelect value={search.sort} onValueChange={(sort) => filter({ sort })} />
          </div>
        </div>

        {/*===== Results =====*/}
        <div id={RESULTS_ID} aria-live="polite" className="mt-8 scroll-mt-24">
          <p className="flex flex-wrap justify-between gap-2 pb-3 text-body-sm text-muted-foreground">
            <span>{m.news_results({ count: archive.total })}</span>
            {archive.pageCount > 1 && (
              <span>{m.news_page_of({ page: archive.page, pageCount: archive.pageCount })}</span>
            )}
          </p>

          {archive.items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-border-strong bg-card px-6 py-16 text-center text-muted-foreground">
              <SearchXIcon aria-hidden className="size-8 text-brand-text" />
              <p>{m.news_empty()}</p>
              {filtered && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setText("");
                    filter({ kind: undefined, category: undefined, q: "", year: undefined });
                  }}
                >
                  {m.news_clear()}
                </Button>
              )}
            </div>
          ) : (
            <FeedList>
              {archive.items.map((item) => (
                <FeedRow
                  key={item.id}
                  item={item}
                  // The archive lists only its kinds (`ARCHIVE_KINDS`); an occasion never reaches it.
                  label={rowLabel({ kind: item.kind as ArchiveKind, category: item.category })}
                  media="aspect-photo w-26 sm:w-44"
                />
              ))}
            </FeedList>
          )}

          <ArchivePages page={archive.page} pageCount={archive.pageCount} sort={search.sort} />
        </div>
      </div>
    </>
  );
}

/*===== Filters =====*/
// Each option counts what choosing it would list with the other filters as they are (`homeFeed.list`'s facets).

/** «همه» and each kind with its count. */
function KindChips({
  archive,
  value,
  onValueChange,
}: {
  archive: ArchivePage;
  value: ArchiveKind | undefined;
  onValueChange: (kind: ArchiveKind | undefined) => void;
}) {
  const kinds = archive.facets.kinds;
  return (
    <FilterChips
      label={m.news_kind_label()}
      value={value ?? "all"}
      onValueChange={(next) => onValueChange(next === "all" ? undefined : next)}
      chips={[
        // Every article has one kind, so the kinds' counts add up to the whole.
        { value: "all", label: m.common_all(), count: kinds.reduce((sum, kind) => sum + kind.count, 0) },
        ...kinds.map((kind) => ({ value: kind.value, label: KIND_LABELS[kind.value].many(), count: kind.count })),
      ]}
    />
  );
}

/**
 * The topics, smaller, under the head. «دانشگاه» is left out: it's every story the old site gave no narrower topic,
 * so it narrows nothing. «همه» has no count: an article can be under two topics, so theirs don't add up.
 */
function TopicChips({
  archive,
  value,
  onValueChange,
}: {
  archive: ArchivePage;
  value: FeedCategory | undefined;
  onValueChange: (category: FeedCategory | undefined) => void;
}) {
  const topics = archive.facets.categories.filter((topic) => topic.value !== "university" || topic.value === value);
  return (
    <FilterChips
      label={m.news_category_label()}
      size="sm"
      value={value ?? "all"}
      onValueChange={(next) => onValueChange(next === "all" ? undefined : next)}
      chips={[
        { value: "all", label: m.news_all_topics() },
        ...topics.map((topic) => ({
          value: topic.value,
          label: NEWS_CATEGORIES[topic.value].title(),
          count: topic.count,
        })),
      ]}
    />
  );
}

const ALL = "all";

/** The years that have posts, newest first, in the visitor's calendar. A year chosen from a link stays listed. */
function YearSelect({
  archive,
  value,
  onValueChange,
}: {
  archive: ArchivePage;
  value: number | undefined;
  onValueChange: (year: number | undefined) => void;
}) {
  const years = archive.facets.years;
  const items: { value: string; label: string; count?: number }[] = [
    { value: ALL, label: m.news_all_years() },
    ...(value !== undefined && !years.some((year) => year.value === value)
      ? [{ value: String(value), label: yearLabel(value), count: 0 }]
      : []),
    ...years.map((year) => ({ value: String(year.value), label: yearLabel(year.value), count: year.count })),
  ];

  return (
    <Select
      items={items}
      value={value === undefined ? ALL : String(value)}
      onValueChange={(next) => onValueChange(next === null || next === ALL ? undefined : Number(next))}
    >
      <SelectTrigger size="sm" aria-label={m.news_year_label()} className="min-w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            <span className="flex w-full justify-between gap-6">
              {item.label}
              {item.count !== undefined && <span className="text-muted-foreground">{formatNumber(item.count)}</span>}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function SortSelect({ value, onValueChange }: { value: ArchiveSort; onValueChange: (sort: ArchiveSort) => void }) {
  const items = ARCHIVE_SORTS.map((sort) => ({ value: sort, label: SORT_LABELS[sort]() }));
  return (
    <Select items={items} value={value} onValueChange={(next) => next && onValueChange(next)}>
      <SelectTrigger size="sm" aria-label={m.news_sort_label()} className="min-w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
