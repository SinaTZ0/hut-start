import { FeedList, FeedRow } from "#/components/shared/feed-row/feed-row";
import { SectionHead } from "#/components/shared/section-head/section-head";
import type { FeedItem } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { CATEGORY_LABELS } from "../content";

/*===== Related Articles =====*/

/** Three more of the article's kind and category, newest first, as the home page's ruled rows. */
export function RelatedArticles({ items }: { items: FeedItem[] }) {
  return (
    <section aria-labelledby="related-title" className="mx-auto mt-16 max-w-190 print:hidden">
      <SectionHead
        id="related-title"
        kicker={m.article_related_kicker()}
        title={m.article_related_title()}
        ruled
        className="mb-6"
      />
      <FeedList>
        {items.map((item) => (
          <FeedRow
            key={item.id}
            item={item}
            label={CATEGORY_LABELS[item.category]()}
            media="aspect-photo w-26 sm:w-40"
          />
        ))}
      </FeedList>
    </section>
  );
}
