import { cva } from "class-variance-authority";
import { composeStyles, defineStyles, joinStyles } from "../styles";

/*===== Group Styles =====*/

// Rows are joined into one surface rather than standing apart like cards. `stack` keeps them apart by a hairline gap
// (search results), `divided` rules a line between them (the welcome help list), `ruled` also rules the top and the
// bottom, for a list that stands on the page without a panel (a department's files), `index` lays ruled rows in
// columns, `strips` lays links in columns that each stand on their own card from `md` up, and `tiled` lays them in a
// grid
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
  ruled: {
    layout: "flex flex-col",
    geometry: "border-y",
    appearance: "*:not-first:border-t",
  },
  // `ruled` laid in two columns from `md` up, for a list long enough to read as an index (the systems hub, an
  // office's guides). Each row rules its own bottom and the first row of each column its top.
  index: {
    layout: "grid md:grid-cols-2 md:gap-x-12",
    geometry: "*:border-b *:first:border-t md:*:nth-2:border-t",
  },
  // `index` with a third column from `lg` up, for short entries (names alone, a roster of people).
  "index-wide": {
    layout: "grid md:grid-cols-2 md:gap-x-12 lg:grid-cols-3",
    geometry: "*:border-b *:first:border-t md:*:nth-2:border-t lg:*:nth-3:border-t",
  },
  // Links a person picks from (an office's machines, a hub's systems): ruled rows on a phone, where a row is already
  // as wide as a thumb's reach; from `md` up two columns of separate cards (the rows style themselves from the
  // group's `data-variant`), so a wide row reads as something to press. Add `lg:grid-cols-3` for names alone.
  strips: {
    layout: "grid md:grid-cols-2 md:gap-x-4 md:gap-y-3",
    geometry: "max-md:*:border-b max-md:*:first:border-t",
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
  interaction: "transition-[color,background-color,border-color,box-shadow,translate] duration-200 ease-out",
  hover: "[a&]:hover:bg-accent",
  // In a `strips` group, from `md` up: a card that lifts on hover instead of the wash.
  geometryStrip:
    "md:group-data-[variant=strips]/item-group:rounded-md md:group-data-[variant=strips]/item-group:border md:group-data-[variant=strips]/item-group:px-5.5 md:group-data-[variant=strips]/item-group:py-4.5",
  appearanceStrip:
    "md:group-data-[variant=strips]/item-group:bg-card md:group-data-[variant=strips]/item-group:shadow-sm",
  hoverStrip:
    "md:group-data-[variant=strips]/item-group:[a&]:hover:border-border-strong md:group-data-[variant=strips]/item-group:[a&]:hover:bg-card md:group-data-[variant=strips]/item-group:[a&]:hover:shadow-md motion-safe:md:group-data-[variant=strips]/item-group:[a&]:hover:-translate-y-0.5",
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

// `default` is a bare icon; `icon` sets it on a bordered tile; `image` is a square thumbnail; `number` is an entry's
// number in an index, in the gold of the section numbers.
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
  number: {
    geometry: "w-6 justify-start",
    typography: "text-body-sm font-bold",
    appearance: "text-highlight-text",
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
  icon: "[&>svg:not([class*='size-'])]:size-4 ltr:[&>svg[data-icon=forward]]:-scale-x-100",
  // Like a text link's arrow, the icon nudges while its row is hovered or focused: a forward arrow ahead, an external
  // icon up and out (the way it points, in both directions).
  iconMotion:
    "[&>svg]:transition-[translate] [&>svg]:duration-200 [&>svg]:ease-out motion-safe:[a:focus-visible_&>svg[data-icon=external]]:translate-x-0.5 motion-safe:[a:focus-visible_&>svg[data-icon=external]]:-translate-y-0.5 motion-safe:[a:focus-visible_&>svg[data-icon=forward]]:-translate-x-0.5 motion-safe:ltr:[a:focus-visible_&>svg[data-icon=forward]]:translate-x-0.5 motion-safe:[a:hover_&>svg[data-icon=external]]:translate-x-0.5 motion-safe:[a:hover_&>svg[data-icon=external]]:-translate-y-0.5 motion-safe:[a:hover_&>svg[data-icon=forward]]:-translate-x-0.5 motion-safe:ltr:[a:hover_&>svg[data-icon=forward]]:translate-x-0.5",
});

// `pill` is a link row's action as a labelled button from `md` up («مشخصات ↗»): it fills with the primary while its
// row is hovered or focused, so a wide row says what pressing it does. On a phone it stays the bare icon, and the
// label (wrap it in `data-slot="item-action-label"`) is hidden: a narrow row already reads as one tap.
const twActionsVariant = defineStyles({
  default: {},
  pill: {
    layout: "md:gap-1.5 max-md:[&>[data-slot=item-action-label]]:hidden",
    geometry: "md:rounded-full md:border md:border-border-strong md:px-3.5 md:py-1",
    typography: "md:text-caption md:font-bold",
    appearance: "md:bg-card md:text-brand-text",
    hover: "md:[a:hover_&]:border-primary md:[a:hover_&]:bg-primary md:[a:hover_&]:text-primary-foreground",
    focus:
      "md:[a:focus-visible_&]:border-primary md:[a:focus-visible_&]:bg-primary md:[a:focus-visible_&]:text-primary-foreground",
    icon: "md:[&>svg:not([class*='size-'])]:size-3.5",
  },
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
const itemActionsVariants = cva(joinStyles(twActionsStyles), {
  variants: { variant: composeStyles(twActionsVariant) },
  defaultVariants: { variant: "default" },
});
const itemHeaderClasses = joinStyles(twHeaderStyles);
const itemFooterClasses = joinStyles(twFooterStyles);

export {
  itemGroupVariants,
  itemVariants,
  itemMediaVariants,
  itemContentClasses,
  itemTitleClasses,
  itemDescriptionClasses,
  itemActionsVariants,
  itemHeaderClasses,
  itemFooterClasses,
  twGroupVariant,
  twVariant,
  twSize,
  twMediaVariant,
  twActionsVariant,
};
