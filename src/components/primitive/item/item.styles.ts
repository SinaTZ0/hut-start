import { cva } from "class-variance-authority";
import { composeStyles, defineStyles, joinStyles } from "../styles";

/*===== Group Styles =====*/

// Rows are joined into one surface rather than standing apart like cards. `stack` keeps them apart by a hairline gap
// (search results), `divided` rules a line between them (the welcome help list), and `tiled` lays them in a grid
// whose cells share their edges (research units); set the columns on the group.
const twGroupStyles = defineStyles({
  layout: "group/item-group",
});

const twGroupVariant = defineStyles({
  stack: {
    layout: "flex flex-col gap-0.5",
  },
  divided: {
    layout: "flex flex-col",
    appearance: "*:not-first:border-t",
  },
  tiled: {
    // Each cell draws its start and top edge and is pulled one pixel back, so neighbours share one line and the
    // group's own edge hides the outer ones.
    layout: "grid overflow-hidden",
    geometry: "*:-ms-px *:-mt-px *:border-s *:border-t",
  },
});

/*===== Item Styles =====*/

// A row of media, text and a trailing action. As a link (`render={<SiteLink … />}`) it takes the quiet `accent` wash
// on hover, and its action icon turns `brand-text`; the title keeps its colour.
const twItemStyles = defineStyles({
  layout: "group/item flex w-full items-center",
  appearance: "text-foreground",
  interaction: "transition-colors duration-200 ease-out",
  hover: "[a&]:hover:bg-accent",
  // Rows sit in clipped groups, so the focus ring is drawn inside the row.
  focus: "focus-visible:-outline-offset-2",
  motion: "motion-reduce:transition-none",
});

const twVariant = defineStyles({
  default: {},
  outline: {
    geometry: "rounded-sm border",
  },
  muted: {
    appearance: "bg-muted",
  },
});

// `sm` is a row in a menu or popover; `default` a cell in a panel; `lg` a row in a page section, whose title and
// description are set one step larger.
const twSize = defineStyles({
  default: {
    layout: "gap-3",
    geometry: "px-5 py-4",
  },
  sm: {
    layout: "gap-3",
    geometry: "rounded-sm px-3 py-2",
  },
  lg: {
    layout: "gap-4",
    geometry: "h-full px-5 py-6 sm:px-8 sm:py-7",
  },
});

/*===== Part Styles =====*/

// A media block lines up with the title when the row has a description.
const twMediaStyles = defineStyles({
  layout:
    "flex shrink-0 items-center justify-center group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
});

// `default` is a bare icon; `icon` sets it on a bordered tile; `image` is a square thumbnail.
const twMediaVariant = defineStyles({
  default: {
    geometry: "group-has-data-[slot=item-description]/item:translate-y-0.5 [&_svg:not([class*='size-'])]:size-5",
    appearance: "text-brand-text",
  },
  icon: {
    geometry: "size-11 rounded-sm border [&_svg:not([class*='size-'])]:size-5.5",
    appearance: "bg-card text-brand-text",
  },
  image: {
    geometry: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
  },
});

const twContentStyles = defineStyles({
  layout: "flex min-w-0 flex-1 flex-col gap-0.5 [&+[data-slot=item-content]]:flex-none",
});

const twTitleStyles = defineStyles({
  layout: "flex w-fit items-center gap-2",
  typography: "text-title group-data-[size=lg]/item:text-h4",
  appearance: "text-heading",
});

const twDescriptionStyles = defineStyles({
  typography: "text-start text-caption group-data-[size=lg]/item:text-body-sm",
  appearance: "text-muted-foreground",
});

const twActionsStyles = defineStyles({
  layout: "flex shrink-0 items-center gap-2",
  appearance: "text-muted-foreground",
  interaction: "transition-colors duration-200",
  hover: "[a:hover_&]:text-brand-text",
  focus: "[a:focus-visible_&]:text-brand-text",
  motion: "motion-reduce:transition-none",
  icon: "[&>svg:not([class*='size-'])]:size-4",
});

const twHeaderStyles = defineStyles({
  layout: "flex basis-full items-center justify-between gap-2",
});

const twFooterStyles = defineStyles({
  layout: "flex basis-full items-center justify-between gap-2",
});

/*===== Class Composition =====*/

const itemGroupVariants = cva(joinStyles(twGroupStyles), {
  variants: { variant: composeStyles(twGroupVariant) },
  defaultVariants: { variant: "stack" },
});

const itemVariants = cva(joinStyles(twItemStyles), {
  variants: { variant: composeStyles(twVariant), size: composeStyles(twSize) },
  defaultVariants: { variant: "default", size: "default" },
});

const itemMediaVariants = cva(joinStyles(twMediaStyles), {
  variants: { variant: composeStyles(twMediaVariant) },
  defaultVariants: { variant: "default" },
});

const itemContentClasses = joinStyles(twContentStyles);
const itemTitleClasses = joinStyles(twTitleStyles);
const itemDescriptionClasses = joinStyles(twDescriptionStyles);
const itemActionsClasses = joinStyles(twActionsStyles);
const itemHeaderClasses = joinStyles(twHeaderStyles);
const itemFooterClasses = joinStyles(twFooterStyles);

export {
  itemGroupVariants,
  itemVariants,
  itemMediaVariants,
  itemContentClasses,
  itemTitleClasses,
  itemDescriptionClasses,
  itemActionsClasses,
  itemHeaderClasses,
  itemFooterClasses,
  twGroupVariant,
  twVariant,
  twSize,
  twMediaVariant,
};
