import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { PhoneIcon, SearchXIcon } from "lucide-react";
import { useCallback } from "react";

import { Card, CardContent } from "#/components/primitive/card/card";
import { FilterChips } from "#/components/shared/filter-chips/filter-chips";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { SearchField } from "#/components/shared/search-field/search-field";
import { useSearchText } from "#/hooks/use-search-text";
import { formatDate } from "#/lib/locale";
import { matchesSearch, searchWords } from "#/lib/persian-text";
import { listSearchDefaults, listSearchSchema } from "#/lib/search-params";
import { pageMeta } from "#/lib/seo";
import { PAGE_DRAWINGS } from "#/lib/university/drawings";
import { formatPhone } from "#/lib/university/phone";
import { DIRECTORY_GROUPS, MAIN_NUMBER } from "#/orpc/directory/constants";
import { orpc } from "#/orpc/client";
import { m } from "#/paraglide/messages";
import { countEntries, UnitCard } from "./components/unit-card";
import { GROUP_LABELS, ROLE_LABELS } from "./content";

/*===== Query =====*/
const phonebookQuery = () => orpc.directory.phonebook.queryOptions();

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/phonebook")({
  validateSearch: listSearchSchema,
  search: { middlewares: [stripSearchParams(listSearchDefaults)] },
  loader: ({ context }) => context.queryClient.ensureQueryData(phonebookQuery()),
  head: (args) => pageMeta({ args, title: m.nav_about_phonebook(), description: m.phonebook_description() }),
  component: PhonebookPage,
});

/*===== Page =====*/

/**
 * The internal phone book as one card per office, filtered by division (chips with head counts) and by a search over
 * names, roles, offices and extensions. Everything is already loaded; filtering happens in the browser.
 */
function PhonebookPage() {
  const { data: phonebook } = useSuspenseQuery(phonebookQuery());
  const { q, group } = Route.useSearch();
  const navigate = Route.useNavigate();

  const changeGroup = useCallback(
    (next: string) =>
      void navigate({ search: (prev) => ({ ...prev, group: next }), replace: true, resetScroll: false }),
    [navigate],
  );
  const changeQuery = useCallback(
    (next: string) => void navigate({ search: (prev) => ({ ...prev, q: next }), replace: true, resetScroll: false }),
    [navigate],
  );
  const [text, setText] = useSearchText({ value: q, onCommit: changeQuery });

  /*------ Filter ------*/
  const groups = DIRECTORY_GROUPS.filter((candidate) => phonebook.units.some((unit) => unit.group === candidate));
  const current = (groups as readonly string[]).includes(group) ? group : "all";
  const words = searchWords(q);
  const shown = phonebook.units
    .filter((unit) => current === "all" || unit.group === current)
    .map((unit) => ({
      unit,
      entries: unit.entries.filter((entry) =>
        matchesSearch(words, [entry.name, entry.role && ROLE_LABELS[entry.role](), unit.name, ...entry.extensions]),
      ),
    }))
    .filter(({ entries }) => entries.length > 0);

  return (
    <>
      <PageHero
        id="phonebook-title"
        crumbs={[{ label: m.nav_about(), href: "/about" }, { label: m.nav_about_phonebook() }]}
        title={m.nav_about_phonebook()}
        lede={m.phonebook_lede()}
        drawing={PAGE_DRAWINGS.directory}
        aside={
          <Card size="sm">
            <CardContent>
              <p className="text-caption text-muted-foreground">{m.phonebook_main_label()}</p>
              <a
                href={`tel:${MAIN_NUMBER}`}
                dir="ltr"
                className="mt-1 flex items-center justify-end gap-2 text-stat-sm text-heading underline-offset-8 hover:underline"
              >
                {formatPhone(MAIN_NUMBER)}
                <PhoneIcon aria-hidden className="size-5 text-brand-text" />
              </a>
              <p className="mt-2 text-caption text-muted-foreground">{m.phonebook_direct_hint()}</p>
            </CardContent>
          </Card>
        }
      >
        <SearchField
          label={m.phonebook_search_label()}
          placeholder={m.phonebook_search_placeholder()}
          value={text}
          onValueChange={setText}
        />
        <FilterChips
          label={m.phonebook_filter_label()}
          value={current}
          onValueChange={changeGroup}
          chips={[
            { value: "all", label: m.common_all(), count: countEntries(phonebook.units) },
            ...groups.map((candidate) => ({
              value: candidate,
              label: GROUP_LABELS[candidate](),
              count: countEntries(phonebook.units.filter((unit) => unit.group === candidate)),
            })),
          ]}
        />
      </PageHero>

      {/*===== Offices =====*/}
      <div aria-live="polite" className="mx-auto max-w-site px-gutter pb-section">
        {shown.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border-strong bg-card px-6 py-16 text-center text-muted-foreground">
            <SearchXIcon aria-hidden className="size-8 text-brand-text" />
            <p>{m.hub_empty({ query: q })}</p>
          </div>
        ) : (
          <div className="columns-1 gap-4 *:mb-4 md:columns-2 xl:columns-3">
            {shown.map(({ unit, entries }) => (
              <UnitCard key={unit.key} unit={unit} entries={entries} searching={words.length > 0} />
            ))}
          </div>
        )}

        {phonebook.updatedAt && (
          <p className="mt-8 border-t pt-6 text-body-sm text-muted-foreground">
            {m.phonebook_updated({ date: formatDate(phonebook.updatedAt, { dateStyle: "long" }) })}
          </p>
        )}
      </div>
    </>
  );
}
