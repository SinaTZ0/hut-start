import { UsersIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/primitive/tabs/tabs";
import { formatNumber } from "#/lib/locale";
import type { Department } from "#/orpc/department/contract";
import { m } from "#/paraglide/messages";
import { RANK_LABELS } from "#/lib/university/people";
import { RANK_FILTERS, type RankFilter } from "../search-params";
import { MemberCard } from "./member-card";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";

/*===== Faculty =====*/

/**
 * The faculty directory, highest rank first, with a tab per rank the department has. The chosen rank lives in the URL
 * (`rank`), which the page owns, so this takes it and reports a change.
 */
export function Faculty({
  department,
  rank,
  onRankChange,
}: {
  department: Department;
  rank: RankFilter;
  onRankChange: (rank: RankFilter) => void;
}) {
  const { faculty } = department;
  const countOf = (filter: RankFilter) =>
    filter === "all" ? faculty.length : faculty.filter((member) => member.rank === filter).length;
  // Only ranks someone holds; a link to an empty one falls back to everyone.
  const filters = RANK_FILTERS.filter((filter) => countOf(filter) > 0);
  const current = filters.includes(rank) ? rank : "all";

  return (
    <section
      id="department-faculty"
      aria-labelledby="department-faculty-title"
      className="mx-auto max-w-site scroll-mt-6 px-gutter py-section"
    >
      <RuledHeading id="department-faculty-title" number={3} title={m.department_faculty_title()} />

      {faculty.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-lg border border-dashed border-border-strong bg-card px-6 py-16 text-center text-muted-foreground">
          <UsersIcon aria-hidden className="size-8 text-brand-text" />
          <p>{m.department_faculty_empty()}</p>
        </div>
      ) : (
        <Tabs value={current} onValueChange={(value: RankFilter) => onRankChange(value)} className="mt-8">
          {/* English rank names are long; on a phone the row scrolls instead of squeezing them. */}
          <div className="-mx-gutter overflow-x-auto px-gutter">
            <TabsList aria-label={m.department_faculty_filter()}>
              {filters.map((filter) => (
                <TabsTrigger key={filter} value={filter}>
                  {filter === "all" ? m.department_rank_all() : RANK_LABELS[filter]()}
                  <span className="opacity-70">{formatNumber(countOf(filter))}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {filters.map((filter) => (
            <TabsContent key={filter} value={filter} className="mt-6">
              <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {faculty
                  .filter((member) => filter === "all" || member.rank === filter)
                  .map((member) => (
                    <li key={member.id}>
                      <MemberCard member={member} isHead={member.id === department.head?.id} />
                    </li>
                  ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </section>
  );
}
