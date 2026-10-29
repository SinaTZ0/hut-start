import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/primitive/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/primitive/card/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "#/components/primitive/collapsible/collapsible";
import { formatDigits } from "#/lib/university/phone";
import { DIRECT_DIAL_PREFIX } from "#/orpc/directory/constants";
import type { DirectoryEntry, DirectoryUnit } from "#/orpc/directory/contract";
import { m } from "#/paraglide/messages";
import { ROLE_LABELS } from "../content";

/*===== Constants =====*/

// A card shows this many people and folds the rest, so a department of fourteen doesn't push the next office a screen
// down.
const FOLD_AFTER = 7;

/*===== Unit Card =====*/

/**
 * One office's card: its name and head count, then its people with their extensions. A long list folds after the
 * first few unless the page is showing search results, which are never hidden.
 */
export function UnitCard({
  unit,
  entries,
  searching,
}: {
  unit: DirectoryUnit;
  entries: DirectoryEntry[];
  searching: boolean;
}) {
  const [open, setOpen] = useState(false);
  const folds = !searching && entries.length > FOLD_AFTER + 1;
  const shown = folds ? entries.slice(0, FOLD_AFTER) : entries;
  const titleId = `unit-${unit.key}`;

  return (
    <Card size="sm" render={<section aria-labelledby={titleId} />} className="break-inside-avoid">
      <CardHeader>
        <div className="flex items-baseline justify-between gap-3">
          <CardTitle>
            <h2 id={titleId}>{unit.name}</h2>
          </CardTitle>
          <span className="shrink-0 text-caption text-muted-foreground">
            {m.phonebook_people({ count: entries.length })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <EntryList entries={shown} />
        {folds && (
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleContent>
              <EntryList entries={entries.slice(FOLD_AFTER)} />
            </CollapsibleContent>
            <CollapsibleTrigger render={<Button variant="ghost" className="group/fold mt-2 w-full" />}>
              {open ? m.phonebook_fold() : m.phonebook_show_all({ count: entries.length })}
              <ChevronDownIcon
                aria-hidden
                className="size-4 transition-transform group-aria-expanded/fold:rotate-180"
              />
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}

/*===== Entries =====*/

/** People as rows: the name and role, and each extension as a call link that dials it directly from outside. */
function EntryList({ entries }: { entries: DirectoryEntry[] }) {
  return (
    <ul>
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="flex items-center justify-between gap-3 border-b border-dashed py-2.5 last:border-b-0"
        >
          <span className="min-w-0">
            <span dir="auto" className="block text-body-sm font-bold text-heading">
              {entry.name}
            </span>
            {entry.role && (
              <span className="block text-caption text-muted-foreground">{ROLE_LABELS[entry.role]()}</span>
            )}
          </span>
          <span className="flex shrink-0 gap-1.5">
            {entry.extensions.map((extension) => (
              <a
                key={extension}
                href={`tel:${DIRECT_DIAL_PREFIX}${extension}`}
                aria-label={m.phonebook_call({ name: entry.name, extension: formatDigits(extension) })}
                dir="ltr"
                className="rounded-sm bg-accent px-2.5 py-1 text-body-sm font-bold text-heading tabular-nums transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                {formatDigits(extension)}
              </a>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** How many people a set of units holds. */
export function countEntries(units: { entries: unknown[] }[]): number {
  return units.reduce((sum, unit) => sum + unit.entries.length, 0);
}
