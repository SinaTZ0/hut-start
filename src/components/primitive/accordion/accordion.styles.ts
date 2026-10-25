import { defineStyles, joinStyles } from "../styles";

/*===== Root Styles =====*/

const twRootStyles = defineStyles({
  layout: "flex w-full flex-col",
});

const twItemStyles = defineStyles({
  appearance: "not-last:border-b",
});

/*===== Trigger Styles =====*/

// A full-width row: the title at the start, a chevron at the end that turns over while open. The open row takes the
// heading colour, so the expanded section stands out from the ones around it.
const twTriggerStyles = defineStyles({
  layout: "group/accordion-trigger relative flex flex-1 items-center justify-between gap-4",
  geometry: "min-h-12 py-3",
  typography: "text-start text-body font-semibold",
  appearance: "text-foreground",
  interaction: "transition-colors duration-200 outline-none",
  hover: "hover:text-heading",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  disabled: "aria-disabled:pointer-events-none aria-disabled:opacity-45",
  state: "aria-expanded:text-heading",
  icon: "**:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
  motion: "motion-reduce:transition-none",
});

const twTriggerIconStyles = defineStyles({
  layout: "pointer-events-none shrink-0",
  interaction: "transition-transform duration-300",
  state: "group-aria-expanded/accordion-trigger:rotate-180",
  motion: "motion-reduce:transition-none",
});

/*===== Content Styles =====*/

// Like the collapsible: the panel grows from 0 to its measured height (`--accordion-panel-height`) as it fades in, and
// closes the same way, a little faster.
const twContentStyles = defineStyles({
  geometry: "h-(--accordion-panel-height) overflow-hidden",
  typography: "text-body-sm",
  interaction: "transition-[height,opacity] duration-300 ease-out data-ending-style:duration-200",
  state: "data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0",
  motion: "motion-reduce:transition-none",
});

const twContentInnerStyles = defineStyles({
  geometry: "pb-4",
});

/*===== Class Composition =====*/

const accordionClasses = joinStyles(twRootStyles);
const accordionItemClasses = joinStyles(twItemStyles);
const accordionTriggerClasses = joinStyles(twTriggerStyles);
const accordionTriggerIconClasses = joinStyles(twTriggerIconStyles);
const accordionContentClasses = joinStyles(twContentStyles);
const accordionContentInnerClasses = joinStyles(twContentInnerStyles);

export {
  accordionClasses,
  accordionItemClasses,
  accordionTriggerClasses,
  accordionTriggerIconClasses,
  accordionContentClasses,
  accordionContentInnerClasses,
};
