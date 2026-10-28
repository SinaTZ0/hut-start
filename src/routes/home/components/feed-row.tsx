import type { ReactNode } from "react";

import { CardDescription, CardKicker } from "#/components/primitive/card/card";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatDate } from "#/lib/locale";
import { cn } from "#/lib/utils";
import type { FeedItem } from "#/orpc/home-feed/contract";
import { isoToDate } from "../semester";
import { FeedMedia } from "./feed-media";

/*===== Feed List =====*/

/** The list the rows sit in: a heavy rule on top, like a newspaper's section front, and a hairline between rows. */
export function FeedList({ children }: { children: ReactNode }) {
  return <ul className="grid content-start border-t-2 border-heading">{children}</ul>;
}

/*===== Feed Row =====*/

/**
 * A feed item as one row of a section front: the label, date, title and summary at the start, the photo at the end in
 * a fixed landscape frame. Every photo the media team sends is landscape, so one fixed landscape frame fits them all
 * without leaving a strip in blur. A `lead` row is the same row larger: its photo takes half the row in the banner
 * shape (2:1) and goes above the text on phones. Elsewhere on phones the photo is a thumbnail and the summary is left
 * out. `number` is a numeral before the text (achievements).
 */
export function FeedRow({
  item,
  label,
  lead = false,
  number,
  media,
}: {
  item: FeedItem;
  label: string;
  lead?: boolean;
  number?: string;
  /** The photo frame's shape and width at the row's end. */
  media: string;
}) {
  return (
    <li className="not-first:border-t">
      <SiteLink
        href={item.url}
        className={cn(
          "group/row flex gap-4 py-5 sm:gap-6",
          lead ? "flex-col-reverse pt-6 sm:flex-row sm:items-start" : "items-start",
        )}
      >
        {number && (
          <span aria-hidden className="w-14 shrink-0 text-h2 text-highlight-text tabular-nums max-sm:hidden">
            {number}
          </span>
        )}
        <div className="grid min-w-0 flex-1 gap-1.5">
          <CardKicker>
            <span>{label}</span>
            {item.publishedOn && (
              <time dateTime={item.publishedOn}>
                {formatDate(isoToDate(item.publishedOn), { day: "numeric", month: "long", year: "numeric" })}
              </time>
            )}
          </CardKicker>
          {/* The title is the link's face: it underlines in the highlight colour on hover and focus. */}
          <h3
            className={cn(
              "font-heading text-heading decoration-highlight decoration-1 underline-offset-6 group-hover/row:underline group-focus-visible/row:underline",
              lead ? "text-h4 sm:text-h3" : "line-clamp-2 text-title",
            )}
          >
            {item.title}
          </h3>
          {/* Clamped: the old site's lead paragraphs run long. */}
          {item.summary && (
            <CardDescription lines={lead ? "3" : "2"} className={lead ? undefined : "max-sm:hidden"}>
              {item.summary}
            </CardDescription>
          )}
        </div>
        {item.imageUrl && <FeedMedia src={item.imageUrl} frame="inset" className={media} />}
      </SiteLink>
    </li>
  );
}
