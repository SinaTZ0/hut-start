import { cva } from "class-variance-authority";
import { composeStyles, defineStyles, joinStyles } from "../styles";

/*===== Tabs Styles =====*/

// Horizontal tabs are a one-column grid with every panel in the second row: while the panels cross-fade, the outgoing
// and the incoming one share that cell instead of stacking. `content-start` keeps a stretched root from growing the
// list's row.
const twTabsStyles = defineStyles({
  layout: "group/tabs flex gap-2 data-horizontal:grid data-horizontal:grid-cols-1 data-horizontal:content-start",
});

/*===== List Styles =====*/

const twListStyles = defineStyles({
  // `isolate` keeps the sliding indicator (`-z-10`) above the list's own background.
  layout:
    "group/tabs-list relative isolate inline-flex w-fit items-center justify-center group-data-vertical/tabs:flex-col",
  geometry: "rounded-md p-1 data-[variant=line]:rounded-none",
  appearance: "text-muted-foreground",
});

// `default` is the switcher from the notices panel: a hairline track with the chosen tab filled pine. The tab's radius
// is the track's minus its padding, so the two corners stay concentric.
// `data-variant` stays on the list as well, because TabsTrigger styles itself from it.
const twVariant = defineStyles({
  default: {
    layout: "gap-1.5",
    geometry: "border",
    appearance: "border-border bg-card",
  },
  line: {
    layout: "gap-1",
    appearance: "bg-transparent",
  },
});

/*===== Trigger Styles =====*/

const twTriggerStyles = defineStyles({
  layout:
    "relative inline-flex flex-1 items-center justify-center gap-1.5 group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start",
  // 40px keeps the tap target; the line variant is sized by its list.
  geometry: "h-10 rounded-sm border px-3",
  geometryIcon: "has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
  typography: "text-caption font-semibold whitespace-nowrap",
  appearance: "border-transparent text-muted-foreground",
  interaction: "transition-colors duration-200",
  hover: "hover:text-heading",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  disabled:
    "disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45",
  // The pine fill is the list's sliding indicator once it has measured the tab. Until then (before hydration) the
  // active tab fills itself, in the same place, so nothing jumps when the indicator takes over.
  state:
    "data-active:bg-primary data-active:text-primary-foreground group-has-data-[slot=tabs-indicator]/tabs-list:data-active:bg-transparent data-active:hover:text-primary-foreground",
  // The line variant drops the active fill and shows the current-nav marker instead: `brand-text` over a gold
  // underline (`after:`).
  stateLine:
    "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:text-nav group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:text-brand-text group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
  stateIndicator:
    "after:absolute after:bg-highlight after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:-bottom-1.25 group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-inset-e-1 group-data-vertical/tabs:after:w-0.5",
  icon: "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
});

/*===== Indicator Styles =====*/

// The pine fill behind the active tab of a `default` list; it slides to the chosen tab. Base UI measures the tab
// against the list's physical left edge, so the position uses physical `left` in both directions.
const twIndicatorStyles = defineStyles({
  layout: "absolute -z-10",
  geometry: "top-(--active-tab-top) left-(--active-tab-left) h-(--active-tab-height) w-(--active-tab-width) rounded-sm",
  appearance: "bg-primary",
  interaction: "transition-[left,top,width,height] duration-300 ease-out",
  motion: "motion-reduce:transition-none",
});

/*===== Content Styles =====*/

// The chosen panel fades in and slides a few pixels from the side of the tab it replaces (Base UI's physical
// `data-activation-direction`, so the shift is physical too); the old one fades out faster, the other way.
const twContentStyles = defineStyles({
  layout: "flex-1 data-horizontal:col-start-1 data-horizontal:row-start-2",
  typography: "text-body-sm",
  focus: "outline-none",
  interaction: "transition-[opacity,translate] duration-300 ease-out data-ending-style:duration-150",
  state:
    "data-ending-style:opacity-0 data-starting-style:opacity-0 data-[activation-direction=left]:data-ending-style:translate-x-3 data-[activation-direction=left]:data-starting-style:-translate-x-3 data-[activation-direction=right]:data-ending-style:-translate-x-3 data-[activation-direction=right]:data-starting-style:translate-x-3",
  motion: "motion-reduce:transition-none",
});

/*===== Class Composition =====*/

const tabsClasses = joinStyles(twTabsStyles);

const tabsListVariants = cva(joinStyles(twListStyles), {
  variants: {
    variant: composeStyles(twVariant),
  },
  defaultVariants: { variant: "default" },
});

const tabsTriggerClasses = joinStyles(twTriggerStyles);
const tabsIndicatorClasses = joinStyles(twIndicatorStyles);
const tabsContentClasses = joinStyles(twContentStyles);

export { tabsClasses, tabsListVariants, tabsTriggerClasses, tabsIndicatorClasses, tabsContentClasses, twVariant };
