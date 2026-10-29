import { FeedList, FeedRow } from "#/components/shared/feed-row/feed-row";
import { TextLink } from "#/components/shared/text-link/text-link";
import { archiveRowLabel } from "#/lib/university/feed";
import type { ArchiveKind } from "#/orpc/home-feed/constants";
import type { FeedItem } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { getLocale } from "#/paraglide/runtime";

/*===== Archive Posts =====*/

/**
 * A page's own slice of the news archive (`homeFeed.list` with a search, say «نشریه»): its newest posts as archive
 * rows, then a link to the archive with the same search for the rest. Renders nothing when the archive has none.
 */
export function ArchivePosts({
  items,
  moreHref,
  moreLabel,
  count = 6,
}: {
  items: FeedItem[];
  /** The archive with the same filter (`archiveHref`). */
  moreHref: string;
  moreLabel: string;
  count?: number;
}) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-5">
      {getLocale() !== "fa" && <p className="text-body-sm text-muted-foreground">{m.news_persian_only()}</p>}
      <FeedList>
        {items.slice(0, count).map((item) => (
          <FeedRow
            key={item.id}
            item={item}
            // The archive lists only its kinds (`ARCHIVE_KINDS`); an occasion never reaches it.
            label={archiveRowLabel({ kind: item.kind as ArchiveKind, category: item.category })}
            media="aspect-photo w-26 sm:w-40"
          />
        ))}
      </FeedList>
      <TextLink href={moreHref}>{moreLabel}</TextLink>
    </div>
  );
}
