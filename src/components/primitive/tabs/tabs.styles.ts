import { cva } from "class-variance-authority";
import { composeStyles, defineStyles, joinStyles } from "../styles";

/*===== Tabs Styles =====*/

const twTabsStyles = defineStyles({
  layout: "group/tabs flex gap-2 data-horizontal:flex-col",
});

/*===== List Styles =====*/

const twListStyles = defineStyles({
  layout: "group/tabs-list inline-flex w-fit items-center justify-center group-data-vertical/tabs:flex-col",
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
  state: "data-active:bg-primary data-active:text-primary-foreground data-active:hover:text-primary-foreground",
  // The line variant drops the active fill and shows the current-nav marker instead: `brand-text` over a gold
  // underline (`after:`).
  stateLine:
    "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:text-nav group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:text-brand-text group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
  stateIndicator:
    "after:absolute after:bg-highlight after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:-bottom-1.25 group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-inset-e-1 group-data-vertical/tabs:after:w-0.5",
  icon: "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
});

/*===== Content Styles =====*/

const twContentStyles = defineStyles({
  layout: "flex-1",
  typography: "text-body-sm",
  focus: "outline-none",
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
const tabsContentClasses = joinStyles(twContentStyles);

export { tabsClasses, tabsListVariants, tabsTriggerClasses, tabsContentClasses, twVariant };
