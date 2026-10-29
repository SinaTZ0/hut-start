import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ArrowLeftIcon, ArrowRightIcon, MoreHorizontalIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { buttonVariants } from "#/components/primitive/button/button.styles";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import {
  paginationArrowClasses,
  paginationClasses,
  paginationContentClasses,
  paginationEllipsisClasses,
} from "./pagination.styles";

/*===== Pagination =====*/

/** The way through a long list's pages. Named for screen readers; pass `aria-label` to name what it pages. */
function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      aria-label={m.common_pagination()}
      data-slot="pagination"
      className={cn(paginationClasses, className)}
      {...props}
    />
  );
}

/*===== Compound Parts =====*/

function PaginationContent({ className, ...props }: ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn(paginationContentClasses, className)} {...props} />;
}

function PaginationItem(props: ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = useRender.ComponentProps<"a"> & { isActive?: boolean };

/**
 * One page's number. Render it as the router's link (`render={<Link search={…} />}`), so changing page keeps the
 * other filters. The current page is marked for screen readers and drawn pine.
 */
function PaginationLink({ className, isActive = false, render, ...props }: PaginationLinkProps) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        "aria-current": isActive ? "page" : undefined,
        className: cn(
          buttonVariants({ variant: isActive ? "default" : "ghost", size: "icon-sm" }),
          "tabular-nums",
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: "pagination-link", active: isActive },
  });
}

type PaginationStepProps = useRender.ComponentProps<"a"> & { text?: string };

/** Back a page, with its word beside the arrow on wider screens («قبلی», or «جدیدتر» on a list newest first). */
function PaginationPrevious({
  className,
  text = m.common_previous(),
  render,
  children,
  ...props
}: PaginationStepProps) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(buttonVariants({ variant: "outline", size: "sm" }), className),
        children: (
          <>
            <ArrowLeftIcon data-icon="inline-start" className={paginationArrowClasses} />
            <span>{children ?? text}</span>
          </>
        ),
      },
      props,
    ),
    render,
    state: { slot: "pagination-previous" },
  });
}

/** On a page, with its word beside the arrow («بعدی», or «قدیمی‌تر»). */
function PaginationNext({ className, text = m.common_next(), render, children, ...props }: PaginationStepProps) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(buttonVariants({ variant: "outline", size: "sm" }), className),
        children: (
          <>
            <span>{children ?? text}</span>
            <ArrowRightIcon data-icon="inline-end" className={paginationArrowClasses} />
          </>
        ),
      },
      props,
    ),
    render,
    state: { slot: "pagination-next" },
  });
}

/** Pages left out between the numbers shown. */
function PaginationEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span data-slot="pagination-ellipsis" className={cn(paginationEllipsisClasses, className)} {...props}>
      <MoreHorizontalIcon aria-hidden />
      <span className="sr-only">{m.common_more_pages()}</span>
    </span>
  );
}

/*===== Page Range =====*/

/**
 * The page numbers to show around `page`: the first and last always, the current one and `siblings` either side, and
 * `"…"` for each gap of more than one page (a gap of one shows the page instead, so it never hides just one number).
 */
function paginationRange({
  page,
  pageCount,
  siblings = 1,
}: {
  page: number;
  pageCount: number;
  siblings?: number;
}): (number | "…")[] {
  const shown = new Set([1, pageCount]);
  for (let candidate = page - siblings; candidate <= page + siblings; candidate++) {
    if (candidate >= 1 && candidate <= pageCount) shown.add(candidate);
  }
  const sorted = [...shown].toSorted((a, b) => a - b);
  return sorted.flatMap((value, index) => {
    const previous = sorted[index - 1];
    if (previous === undefined || value - previous === 1) return [value];
    return value - previous === 2 ? [previous + 1, value] : ["…" as const, value];
  });
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationRange,
};
