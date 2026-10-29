import { BookIcon } from "lucide-react";

import {
  Card,
  CardArrow,
  CardContent,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from "#/components/primitive/card/card";
import { LinkTile } from "#/components/shared/link-tile/link-tile";
import { MediaImage } from "#/components/shared/media-image/media-image";
import { SiteLink } from "#/components/shared/site-link/site-link";
import type { Office } from "#/orpc/office/contract";

type OfficeList = Office["lists"][number];
type OfficeListItem = OfficeList["items"][number];

/*===== Card List =====*/

/**
 * One of an office's card lists. A list with pictures (the press's books) is a grid of covers; the rest are tiles: a
 * link tile for a card that leads somewhere (a unit's page, a machine's old page), a plain card for one that doesn't.
 */
export function CardList({ list }: { list: OfficeList }) {
  if (list.items.some((item) => item.image)) {
    return (
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {list.items.map((item) => (
          <li key={item.id}>
            <CoverCard item={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.items.map((item) => (
        <li key={item.id}>
          {item.url ? (
            <LinkTile href={item.url} title={item.title} description={item.text ?? undefined} />
          ) : (
            <Card size="sm" className="h-full">
              <CardContent>
                <CardTitle>
                  <h3>{item.title}</h3>
                </CardTitle>
                {item.text && <CardDescription className="mt-1">{item.text}</CardDescription>}
              </CardContent>
            </Card>
          )}
        </li>
      ))}
    </ul>
  );
}

/*===== Cover Card =====*/

/** A book: its cover, title and credit line, leading to its page when it has one. Credits may be Persian on `/en`. */
function CoverCard({ item }: { item: OfficeListItem }) {
  return (
    <Card render={item.url ? <SiteLink href={item.url} /> : undefined} size="sm" className="h-full">
      <CardMedia className="aspect-4/5">
        {item.image ? (
          <MediaImage media={item.image} variant="md" alt="" className="size-full" />
        ) : (
          <span className="grid size-full place-items-center text-muted-foreground">
            <BookIcon aria-hidden className="size-8" />
          </span>
        )}
      </CardMedia>
      <CardHeader>
        <CardTitle>
          <h3 className="text-body-sm">{item.title}</h3>
        </CardTitle>
        {item.text && (
          <CardDescription dir="auto" lines="2">
            {item.text}
          </CardDescription>
        )}
      </CardHeader>
      {item.url && <CardArrow external={item.url.startsWith("http")} className="mx-4 mb-4 self-end" />}
    </Card>
  );
}
