import { defineStyles, joinStyles } from "../styles";

/*===== Breadcrumb Styles =====*/

// The trail above a page's title: muted links, the current page in the heading colour.
const twListStyles = defineStyles({
  layout: "flex flex-wrap items-center gap-x-1.5 sm:gap-x-2",
  typography: "text-body-sm wrap-break-word",
  appearance: "text-muted-foreground",
});

const twItemStyles = defineStyles({
  layout: "inline-flex items-center gap-1.5",
});

// The row is short text, so each link is padded out to a 40px tap target.
const twLinkStyles = defineStyles({
  layout: "inline-flex min-h-10 items-center",
  interaction: "transition-colors duration-200",
  hover: "hover:text-heading",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  motion: "motion-reduce:transition-none",
});

const twPageStyles = defineStyles({
  typography: "font-semibold",
  appearance: "text-heading",
});

// The chevron points the way the trail reads: left in Persian, right in English.
const twSeparatorStyles = defineStyles({
  appearance: "text-border-strong",
  icon: "[&>svg]:size-3.5 ltr:[&>svg]:-scale-x-100",
});

const twEllipsisStyles = defineStyles({
  layout: "flex items-center justify-center",
  geometry: "size-5",
  icon: "[&>svg]:size-4",
});

/*===== Class Composition =====*/

const breadcrumbListClasses = joinStyles(twListStyles);
const breadcrumbItemClasses = joinStyles(twItemStyles);
const breadcrumbLinkClasses = joinStyles(twLinkStyles);
const breadcrumbPageClasses = joinStyles(twPageStyles);
const breadcrumbSeparatorClasses = joinStyles(twSeparatorStyles);
const breadcrumbEllipsisClasses = joinStyles(twEllipsisStyles);

export {
  breadcrumbListClasses,
  breadcrumbItemClasses,
  breadcrumbLinkClasses,
  breadcrumbPageClasses,
  breadcrumbSeparatorClasses,
  breadcrumbEllipsisClasses,
};
