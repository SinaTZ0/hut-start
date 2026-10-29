import { Link } from "@tanstack/react-router";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationRange,
} from "#/components/primitive/pagination/pagination";
import { formatNumber } from "#/lib/locale";
import type { ArchiveSort } from "#/orpc/home-feed/constants";
import { m } from "#/paraglide/messages";

/*===== Archive Pages =====*/

/** Where a page link lands: the list's top, under the filters, rather than the page's. */
export const RESULTS_ID = "news-results";

/**
 * The archive's page links. Each keeps the filters and lands on the list's top. A step back is «جدیدتر» while the list
 * runs newest first, «قدیمی‌تر» when it's turned round. Nothing when everything fits on one page.
 */
export function ArchivePages({ page, pageCount, sort }: { page: number; pageCount: number; sort: ArchiveSort }) {
  if (pageCount <= 1) return null;
  const [back, on] = sort === "newest" ? [m.news_newer(), m.news_older()] : [m.news_older(), m.news_newer()];
  // Moving between pages pushes a history entry, so Back returns to the page before (docs/frontend/search-params.md).
  const to = (value: number) => (
    <Link
      from="/news"
      search={(prev) => ({ ...prev, page: value })}
      hash={RESULTS_ID}
      aria-label={m.news_page_label({ page: value })}
    />
  );

  return (
    <Pagination aria-label={m.news_pages_label()} className="mt-10">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              render={<Link from="/news" search={(prev) => ({ ...prev, page: page - 1 })} hash={RESULTS_ID} />}
              text={back}
            />
          </PaginationItem>
        )}
        {paginationRange({ page, pageCount }).map((value, index) => (
          <PaginationItem key={value === "…" ? `gap-${index}` : value}>
            {value === "…" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink render={to(value)} isActive={value === page}>
                {formatNumber(value)}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        {page < pageCount && (
          <PaginationItem>
            <PaginationNext
              render={<Link from="/news" search={(prev) => ({ ...prev, page: page + 1 })} hash={RESULTS_ID} />}
              text={on}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
