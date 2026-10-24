import { SearchIcon } from "lucide-react";
import { useDeferredValue, useId, useState } from "react";

import { Button } from "#/components/primitive/button/button";
import { Input } from "#/components/primitive/input/input";
import { Label } from "#/components/primitive/label/label";
import { Popover, PopoverContent, PopoverTrigger } from "#/components/primitive/popover/popover";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { searchServices } from "#/lib/university/services";
import { m } from "#/paraglide/messages";

/*===== Constants =====*/

// The first few matches fit the panel without scrolling; a longer query narrows them.
const MAX_RESULTS = 7;

/*===== Service Search =====*/

/** The header's search button: a panel that filters the university's systems as the visitor types. */
export function ServiceSearch() {
  const [query, setQuery] = useState("");
  // Typing stays responsive; the list catches up.
  const deferredQuery = useDeferredValue(query);
  const results = searchServices(deferredQuery).slice(0, MAX_RESULTS);
  const inputId = useId();

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="tool" size="icon-sm" aria-label={m.nav_search_services()} />}>
        <SearchIcon />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={12} className="w-95">
        <Label htmlFor={inputId}>{m.nav_search_label()}</Label>
        <Input
          id={inputId}
          type="search"
          placeholder={m.nav_search_placeholder()}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {/*------ Results ------*/}
        <ul aria-live="polite" className="grid max-h-90 gap-0.5 overflow-y-auto">
          {results.map((service) => (
            <li key={service.id}>
              <SiteLink
                href={service.href}
                className="flex items-start gap-3 rounded-sm px-3 py-2 text-foreground transition-colors duration-200 hover:bg-accent motion-reduce:transition-none"
              >
                <service.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-text" />
                <span>
                  <span className="block text-title">{service.title()}</span>
                  <span className="block text-caption text-muted-foreground">
                    {service.description()}
                    {service.internalOnly && ` (${m.nav_internal_only()})`}
                  </span>
                </span>
              </SiteLink>
            </li>
          ))}
          {results.length === 0 && <li className="px-3 py-2 text-muted-foreground">{m.nav_search_empty()}</li>}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
