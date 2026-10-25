import { SearchIcon } from "lucide-react";
import { useDeferredValue, useId, useState } from "react";

import { Button } from "#/components/primitive/button/button";
import { Input } from "#/components/primitive/input/input";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "#/components/primitive/item/item";
import { Label } from "#/components/primitive/label/label";
import { Popover, PopoverContent, PopoverTrigger } from "#/components/primitive/popover/popover";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { searchServices } from "#/lib/university/services";
import { m } from "#/paraglide/messages";

/*===== Constants =====*/

// The first few matches fit the panel without scrolling; a longer query narrows them.
const MAX_RESULTS = 7;

/*===== Service Search Panel =====*/

/** The search field and its matches, filtered as the visitor types: in the header's popover, and in the phone sheet. */
export function ServiceSearchPanel() {
  const [query, setQuery] = useState("");
  // Typing stays responsive; the list catches up.
  const deferredQuery = useDeferredValue(query);
  const results = searchServices(deferredQuery).slice(0, MAX_RESULTS);
  const inputId = useId();

  return (
    <>
      <Label htmlFor={inputId}>{m.nav_search_label()}</Label>
      <Input
        id={inputId}
        type="search"
        placeholder={m.nav_search_placeholder()}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {/*------ Results ------*/}
      <ItemGroup aria-live="polite" className="max-h-90 overflow-y-auto">
        {results.map((service) => (
          <li key={service.id}>
            <Item size="sm" render={<SiteLink href={service.href} />}>
              <ItemMedia>
                <service.icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{service.title()}</ItemTitle>
                <ItemDescription>
                  {service.description()}
                  {service.internalOnly && ` (${m.nav_internal_only()})`}
                </ItemDescription>
              </ItemContent>
            </Item>
          </li>
        ))}
        {results.length === 0 && <li className="px-3 py-2 text-muted-foreground">{m.nav_search_empty()}</li>}
      </ItemGroup>
    </>
  );
}

/*===== Service Search =====*/

/** The header's search button on wide screens: a panel that filters the university's systems as the visitor types. */
export function ServiceSearch() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="tool" size="icon-sm" aria-label={m.nav_search_services()} />}>
        <SearchIcon />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={16} className="w-95">
        <ServiceSearchPanel />
      </PopoverContent>
    </Popover>
  );
}
