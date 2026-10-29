import { BookIcon } from "lucide-react";

import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "#/components/primitive/item/item";
import { LinkRow } from "#/components/shared/link-row/link-row";
import { MediaImage } from "#/components/shared/media-image/media-image";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatNumber } from "#/lib/locale";
import type { Office } from "#/orpc/office/contract";

type OfficeList = Office["lists"][number];
type OfficeListItem = OfficeList["items"][number];

/*===== Card List =====*/

/**
 * One of an office's lists. A list with pictures (the press's books) stands on a shelf; the rest are a numbered index
 * of ruled rows: a link row for an entry that leads somewhere (a unit's page, a machine's old page), a plain row for
 * one that doesn't. Names alone (the clubs, the agreements) are short enough for three columns.
 */
export function CardList({ list }: { list: OfficeList }) {
  if (list.items.some((item) => item.image)) return <Shelf items={list.items} />;

  const namesOnly = list.items.every((item) => !item.text);
  return (
    <ItemGroup variant={namesOnly ? "index-wide" : "index"}>
      {list.items.map((item, index) =>
        item.url ? (
          <LinkRow
            key={item.id}
            href={item.url}
            title={item.title}
            description={item.text ?? undefined}
            number={index + 1}
          />
        ) : (
          <li key={item.id}>
            <Item className="h-full">
              <ItemMedia variant="number">{formatNumber(index + 1)}</ItemMedia>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                {item.text && (
                  <ItemDescription>
                    <bdi>{item.text}</bdi>
                  </ItemDescription>
                )}
              </ItemContent>
            </Item>
          </li>
        ),
      )}
    </ItemGroup>
  );
}

/*===== Shelf =====*/

/**
 * Books standing on shelves: covers without a frame, each row of them on one shelf line (the cells have no gap, so
 * their bottom edges join), with the title and credit line under it. Credits may be Persian on `/en`.
 */
function Shelf({ items }: { items: OfficeListItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {items.map((item) => (
        <li key={item.id}>
          {item.url ? (
            <SiteLink href={item.url} className="group/book block focus-visible:outline-offset-4">
              <Book item={item} />
            </SiteLink>
          ) : (
            <Book item={item} />
          )}
        </li>
      ))}
    </ul>
  );
}

function Book({ item }: { item: OfficeListItem }) {
  return (
    <>
      <div className="border-b-2 border-border-strong px-3 sm:px-5">
        <div className="aspect-portrait overflow-hidden rounded-xs bg-muted shadow-md transition-transform duration-200 ease-out group-hover/book:-translate-y-1.5 motion-reduce:transition-none">
          {item.image ? (
            <MediaImage media={item.image} variant="md" alt="" className="size-full" />
          ) : (
            <span className="grid size-full place-items-center text-muted-foreground">
              <BookIcon aria-hidden className="size-8" />
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 grid gap-1 px-3 sm:px-5">
        <h3 className="text-body-sm font-bold text-heading transition-colors duration-200 group-hover/book:text-brand-text motion-reduce:transition-none">
          {item.title}
        </h3>
        {item.text && (
          <p dir="auto" className="line-clamp-2 text-caption text-muted-foreground">
            {item.text}
          </p>
        )}
      </div>
    </>
  );
}
