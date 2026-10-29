import type { LucideIcon } from "lucide-react";
import { SearchXIcon } from "lucide-react";

import { FilterChips } from "#/components/shared/filter-chips/filter-chips";
import { LinkTile } from "#/components/shared/link-tile/link-tile";
import { type Crumb, PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";
import { SearchField } from "#/components/shared/search-field/search-field";
import { useSearchText } from "#/hooks/use-search-text";
import { matchesSearch, searchWords } from "#/lib/persian-text";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";

/*===== Types =====*/

export type HubItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  internalOnly?: boolean;
  /** Extra search terms, not shown. */
  keywords?: string[];
};

export type HubGroup = { id: string; title: string; summary: string; items: HubItem[] };

/** The chip that shows every group. */
export const ALL_GROUPS = "all";

/*===== Link Hub =====*/

/**
 * A page of links grouped by what a person goes there to do (the systems, the payment gateways): a search field and a
 * chip per group over numbered sections of tiles. The page owns `group` and `query` (they live in its URL) and is told
 * of changes.
 */
export function LinkHub({
  id,
  crumbs,
  title,
  lede,
  drawing,
  searchLabel,
  searchPlaceholder,
  groups,
  group,
  query,
  onGroupChange,
  onQueryChange,
}: {
  id: string;
  crumbs: Crumb[];
  title: string;
  lede: string;
  drawing: string;
  searchLabel: string;
  searchPlaceholder: string;
  groups: HubGroup[];
  /** A group's id, or `ALL_GROUPS`. */
  group: string;
  query: string;
  onGroupChange: (group: string) => void;
  onQueryChange: (query: string) => void;
}) {
  const [text, setText] = useSearchText({ value: query, onCommit: onQueryChange });
  const words = searchWords(query);
  const current = groups.some((candidate) => candidate.id === group) ? group : ALL_GROUPS;

  const shown = groups
    .filter((candidate) => current === ALL_GROUPS || candidate.id === current)
    .map((candidate) => ({
      ...candidate,
      items: candidate.items.filter((item) =>
        matchesSearch(words, [item.title, item.description, ...(item.keywords ?? [])]),
      ),
    }))
    .filter((candidate) => candidate.items.length > 0);
  const total = groups.reduce((sum, candidate) => sum + candidate.items.length, 0);

  return (
    <>
      <PageHero id={id} crumbs={crumbs} title={title} lede={lede} drawing={drawing}>
        <SearchField label={searchLabel} placeholder={searchPlaceholder} value={text} onValueChange={setText} />
        <FilterChips
          label={m.hub_filter_label()}
          value={current}
          onValueChange={onGroupChange}
          chips={[
            { value: ALL_GROUPS, label: m.common_all(), count: total },
            ...groups.map((candidate) => ({
              value: candidate.id,
              label: candidate.title,
              count: candidate.items.length,
            })),
          ]}
        />
      </PageHero>

      {/*===== Groups =====*/}
      <div aria-live="polite">
        {shown.length === 0 && (
          <div className="mx-auto max-w-site px-gutter pb-section">
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border-strong bg-card px-6 py-16 text-center text-muted-foreground">
              <SearchXIcon aria-hidden className="size-8 text-brand-text" />
              <p>{m.hub_empty({ query })}</p>
            </div>
          </div>
        )}
        {shown.map((candidate, index) => (
          <section
            key={candidate.id}
            aria-labelledby={`${id}-${candidate.id}`}
            className={cn("border-t", index % 2 === 0 ? "bg-background-alt" : "bg-background")}
          >
            <div className="mx-auto max-w-site px-gutter py-12 md:py-14">
              <RuledHeading
                id={`${id}-${candidate.id}`}
                number={groups.findIndex((each) => each.id === candidate.id) + 1}
                title={candidate.title}
              />
              <p className="mt-2 text-body-sm text-muted-foreground">{candidate.summary}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {candidate.items.map((item) => (
                  <li key={item.id}>
                    <LinkTile
                      href={item.href}
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      internalOnly={item.internalOnly}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
