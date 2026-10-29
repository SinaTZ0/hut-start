import { defineStyles, joinStyles } from "../styles";

/*===== Table Styles =====*/

// Scrolls sideways on its own when the columns don't fit, so a wide table never widens the page.
const twContainerStyles = defineStyles({
  layout: "relative w-full overflow-x-auto",
  geometry: "rounded-md border",
});

const twTableStyles = defineStyles({
  layout: "w-full caption-bottom",
  typography: "text-start text-body-sm",
});

/*===== Compound Part Styles =====*/

const twHeaderStyles = defineStyles({
  appearance: "bg-background-alt [&_tr]:border-b",
});

const twBodyStyles = defineStyles({
  appearance: "[&_tr:last-child]:border-0",
});

const twFooterStyles = defineStyles({
  typography: "font-medium",
  appearance: "border-t bg-background-alt [&>tr]:last:border-b-0",
});

const twRowStyles = defineStyles({
  appearance: "border-b",
  motion: "transition-colors duration-200 motion-reduce:transition-none",
  hover: "hover:bg-accent/40",
  state: "has-aria-expanded:bg-accent/40 data-[state=selected]:bg-accent",
});

// Headings wrap rather than run off: Persian day ranges («شنبه تا چهارشنبه») are long.
const twHeadStyles = defineStyles({
  geometry: "h-12 px-4",
  layout: "text-start align-middle",
  typography: "text-caption font-bold text-heading",
});

const twCellStyles = defineStyles({
  geometry: "px-4 py-3",
  layout: "align-middle",
});

const twCaptionStyles = defineStyles({
  geometry: "mt-4",
  typography: "text-caption text-muted-foreground",
});

export const tableContainerClasses = joinStyles(twContainerStyles);
export const tableClasses = joinStyles(twTableStyles);
export const tableHeaderClasses = joinStyles(twHeaderStyles);
export const tableBodyClasses = joinStyles(twBodyStyles);
export const tableFooterClasses = joinStyles(twFooterStyles);
export const tableRowClasses = joinStyles(twRowStyles);
export const tableHeadClasses = joinStyles(twHeadStyles);
export const tableCellClasses = joinStyles(twCellStyles);
export const tableCaptionClasses = joinStyles(twCaptionStyles);
