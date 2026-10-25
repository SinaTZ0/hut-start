import { localize, localizeOptional } from "#/lib/localized-text";
import { FEED_CATEGORIES, FEED_KINDS } from "#/orpc/home-feed/constants";
import type { FeedItem } from "#/orpc/home-feed/contract";
import type { PlacedArticle } from "#/orpc/home-feed/repository";

/*===== Allowed Values =====*/
/**
 * Narrows a stored plain-text value to its allowed set.
 *
 * @throws When the value isn't allowed. Only the sync writes these columns, so this means corrupted data that should
 * surface instead of rendering a guess.
 */
function oneOf<const T extends readonly string[]>({ allowed, value }: { allowed: T; value: string }) {
  if (!allowed.includes(value)) throw new Error(`Unknown home feed value: ${value}`);
  return value as T[number];
}

/*===== Item =====*/
/** A placed article as a card shows it, in the request's locale. */
export function toFeedItem({ placement, article }: PlacedArticle): FeedItem {
  return {
    id: article.id,
    kind: oneOf({ allowed: FEED_KINDS, value: placement.kind }),
    category: oneOf({ allowed: FEED_CATEGORIES, value: placement.category }),
    title: localize(article.title),
    summary: localizeOptional(article.summary),
    publishedOn: article.publishedOn,
    url: article.url,
    imageUrl: article.imageUrl,
  };
}
