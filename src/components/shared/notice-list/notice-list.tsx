import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatDate, formatDateParts, isoToDate } from "#/lib/locale";
import { NEWS_CATEGORIES } from "#/lib/university/feed";
import type { FeedItem } from "#/orpc/home-feed/contract";

/*===== Notice List =====*/

/**
 * Notices as rows: each one's date as a calendar leaf, its title, and its category and full date under it. Feed text is
 * Persian on the English page too, so the title keeps its own direction.
 */
export function NoticeList({ items }: { items: FeedItem[] }) {
  return (
    <ul className="grid border-t-2 border-heading">
      {items.map((item) => {
        const date = item.publishedOn ? isoToDate(item.publishedOn) : undefined;
        const parts = date && formatDateParts(date, { month: "short" });

        return (
          <li key={item.id} className="not-first:border-t">
            <SiteLink
              href={item.url}
              className="group/notice flex gap-4 rounded-sm px-2 py-4 transition-colors duration-200 hover:bg-accent focus-visible:bg-accent motion-reduce:transition-none"
            >
              {parts && (
                <span
                  aria-hidden
                  className="flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-sm border bg-card"
                >
                  <span className="text-h4 text-heading">{parts.day}</span>
                  <span className="text-caption text-muted-foreground">{parts.month}</span>
                </span>
              )}
              <span className="min-w-0">
                <span
                  dir="auto"
                  className="line-clamp-2 text-body-sm font-bold text-heading decoration-highlight underline-offset-4 group-hover/notice:underline"
                >
                  {item.title}
                </span>
                <span className="mt-0.5 block text-caption text-muted-foreground">
                  {NEWS_CATEGORIES[item.category].title()}
                  {item.publishedOn && date && (
                    <>
                      {" · "}
                      <time dateTime={item.publishedOn}>
                        {formatDate(date, { day: "numeric", month: "long", year: "numeric" })}
                      </time>
                    </>
                  )}
                </span>
              </span>
            </SiteLink>
          </li>
        );
      })}
    </ul>
  );
}
