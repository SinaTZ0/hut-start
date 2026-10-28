import { localize, localizeOptional } from "#/lib/localized-text";
import { FEED_CATEGORIES, FEED_KINDS } from "#/orpc/home-feed/constants";
import type { Article, FeedItem } from "#/orpc/home-feed/contract";
import type { FeedArticleRecord, PlacedArticle } from "#/orpc/home-feed/repository";

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
const SUMMARY_MAX_LENGTH = 300;

/** A lead paragraph short enough for a card, cut at a word and marked with an ellipsis. */
function shortSummary(value: string | null): string | null {
  if (!value || value.length <= SUMMARY_MAX_LENGTH) return value;
  const cut = value.slice(0, SUMMARY_MAX_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(" ")).trimEnd()}…`;
}

/** Whether the article has a page here: its old page has been read, and it has the ID the address needs. */
function hasPage(article: FeedArticleRecord): article is FeedArticleRecord & { sourceAssetId: string } {
  return article.body !== null && article.sourceAssetId !== null && article.kind !== null;
}

/** The article's page here, or the old site's until its page has been read. */
function articleHref(article: FeedArticleRecord): string {
  return hasPage(article) ? `/articles/${article.sourceAssetId}` : article.url;
}

/** An article as a card shows it, in the request's locale, filed under `kind` and `category`. */
function toItem({ article, kind, category }: { article: FeedArticleRecord; kind: string; category: string }) {
  return {
    id: article.id,
    kind: oneOf({ allowed: FEED_KINDS, value: kind }),
    category: oneOf({ allowed: FEED_CATEGORIES, value: category }),
    title: localize(article.title),
    summary: shortSummary(localizeOptional(article.summary)),
    publishedOn: article.publishedOn,
    url: articleHref(article),
    imageUrl: article.imageUrl,
  } satisfies FeedItem;
}

/** A placed article as its block's card shows it. */
export function toFeedItem({ placement, article }: PlacedArticle): FeedItem {
  return toItem({ article, kind: placement.kind, category: placement.category });
}

/*===== Article =====*/
// The old site's document library names a file by a UUID in its path, whatever size the URL asks for.
const DOCUMENT_UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

/** Whether the body shows the cover photo itself: the old site often repeats it as the body's first photo. */
function coverInBody(article: FeedArticleRecord): boolean {
  const id = article.imageUrl ? DOCUMENT_UUID.exec(article.imageUrl)?.[0] : undefined;
  if (!id) return false;
  return (article.body?.content ?? []).some((block) => block.type === "image" && block.attrs.src.includes(id));
}

/**
 * An article with a page, in the request's locale, and the articles shown under it.
 *
 * @throws When the article has no page (`hasPage`); the service only asks for those.
 */
export function toArticle({ article, related }: { article: FeedArticleRecord; related: FeedArticleRecord[] }): Article {
  if (!hasPage(article) || !article.body || !article.kind || !article.category) {
    throw new Error(`Article ${article.id} has no page`);
  }
  const kind = oneOf({ allowed: FEED_KINDS, value: article.kind });
  const category = oneOf({ allowed: FEED_CATEGORIES, value: article.category });

  return {
    id: article.sourceAssetId,
    kind,
    category,
    title: localize(article.title),
    summary: localizeOptional(article.summary),
    publishedOn: article.publishedOn,
    cover:
      article.imageUrl && !coverInBody(article)
        ? { src: article.imageUrl, width: article.imageWidth, height: article.imageHeight }
        : null,
    body: article.body,
    source: article.source,
    related: related.map((other) => toItem({ article: other, kind, category })),
  };
}
