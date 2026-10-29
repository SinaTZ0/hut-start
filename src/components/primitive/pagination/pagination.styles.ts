import { defineStyles, joinStyles } from "../styles";

/*===== Pagination Styles =====*/

const twNavStyles = defineStyles({
  layout: "mx-auto flex w-full justify-center",
});

const twContentStyles = defineStyles({
  layout: "flex flex-wrap items-center justify-center gap-1.5",
});

// The page numbers are Button's (`buttonVariants`): ghost, the current one pine, the steps either side outlined. Back
// points to the start and on to the end, so the arrows turn over in Persian.
const twArrowStyles = defineStyles({
  icon: "rtl:-scale-x-100",
});

const twEllipsisStyles = defineStyles({
  layout: "flex items-center justify-center",
  geometry: "size-10",
  appearance: "text-muted-foreground",
  icon: "[&>svg]:size-4",
});

export const paginationClasses = joinStyles(twNavStyles);
export const paginationContentClasses = joinStyles(twContentStyles);
export const paginationArrowClasses = joinStyles(twArrowStyles);
export const paginationEllipsisClasses = joinStyles(twEllipsisStyles);
