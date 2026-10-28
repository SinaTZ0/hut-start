import { cva } from "class-variance-authority";
import { composeStyles, defineStyles, joinStyles } from "../styles";

/*===== Surface Styles =====*/

// Parts space themselves with `--card-spacing`, so a size only has to change that one variable.
const twCardStyles = defineStyles({
  layout: "group/card flex flex-col gap-(--card-spacing) overflow-hidden",
  geometry: "rounded-md border py-(--card-spacing)",
  // Edge-to-edge media replaces the card's top padding; the card's `overflow-hidden` rounds its corners.
  geometryMedia:
    "has-[>[data-slot=card-media]:first-child]:pt-0 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-md *:[img:last-child]:rounded-b-md",
  typography: "text-body-sm",
  // Cards rest flat on a hairline.
  appearance: "border-border bg-card text-card-foreground",
  // The card lift, for a card rendered as a link (`render={<SiteLink … />}`): the edge darkens to `border-strong`, the
  // card takes `shadow-md` and the `accent` wash. It is the one hover for every content card (incubator rows, courses).
  interaction: "transition-[background-color,border-color,box-shadow] duration-200 ease-out outline-none",
  hover: "[a&]:hover:border-border-strong [a&]:hover:bg-accent [a&]:hover:shadow-md",
  focus:
    "focus-visible:border-border-strong focus-visible:bg-accent focus-visible:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  motion: "motion-reduce:transition-none",
});

// `default` is a content card (20px, 24px from `sm`); `lg` is a feature card, such as the featured story or the lead
// achievement (32px from `sm`), whose title is set one step larger.
// `horizontal` sets the media beside a CardBody from `sm` up (stacked on phones). The body carries the padding, so the
// media runs the card's full height.
const twOrientation = defineStyles({
  vertical: {},
  horizontal: {
    layout: "gap-0 sm:flex-row",
    geometry: "py-0",
  },
});

const twSize = defineStyles({
  default: {
    geometry: "[--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]",
  },
  sm: {
    geometry: "[--card-spacing:--spacing(4)]",
  },
  lg: {
    geometry: "[--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(8)]",
  },
});

/*===== Compound Part Styles =====*/

const twHeaderStyles = defineStyles({
  layout:
    "group/card-header @container/card-header grid auto-rows-min items-start gap-1 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
  geometry: "rounded-t-md px-(--card-spacing) [.border-b]:pb-(--card-spacing)",
});

// Card titles keep their colour on hover: the card's edge and shadow carry it.
const twTitleStyles = defineStyles({
  typography: "font-heading text-title group-data-[size=lg]/card:text-h3",
  appearance: "text-heading",
});

// The line above a title: the category in `brand-text`, then any meta (a date, a separator) in muted text.
const twKickerStyles = defineStyles({
  layout: "flex flex-wrap items-center gap-2",
  typography: "text-caption font-bold *:not-first:font-normal",
  appearance: "text-brand-text *:not-first:text-muted-foreground",
});

const twDescriptionStyles = defineStyles({
  typography: "text-body-sm",
  appearance: "text-muted-foreground",
});

// Text that comes from elsewhere (the home feed's lead paragraphs) can run long; `lines` cuts it with an ellipsis so
// cards in a row keep their rhythm. Text written for the card shows in full.
const twDescriptionLines = defineStyles({
  all: {},
  "2": {
    layout: "line-clamp-2",
  },
  "3": {
    layout: "line-clamp-3",
  },
});

const twActionStyles = defineStyles({
  layout: "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
});

const twContentStyles = defineStyles({
  geometry: "px-(--card-spacing)",
});

// The text column of a horizontal card: header, content and the rest, spaced like a vertical card.
const twBodyStyles = defineStyles({
  layout: "flex min-w-0 flex-1 flex-col gap-(--card-spacing)",
  geometry: "py-(--card-spacing)",
});

// The card's last row, pinned to the bottom so calls line up across a row of cards of different heights. A hairline
// inset to the text column sets it off from the content. Meta at the start (a date) is muted; the call goes at the end.
const twFooterStyles = defineStyles({
  layout: "mt-auto flex items-center justify-between gap-3",
  geometry: "mx-(--card-spacing) border-t pt-4",
  typography: "text-caption",
  appearance: "text-muted-foreground",
  icon: "*:[time]:inline-flex *:[time]:items-center *:[time]:gap-1 [&>time>svg]:size-3.5",
});

// A link card's call: its label and a CardArrow, kept at the footer's end even when there is no meta before it.
const twCallStyles = defineStyles({
  layout: "ms-auto flex items-center gap-3",
  typography: "text-body-sm font-bold",
  appearance: "text-brand-text",
});

/*===== Arrow Styles =====*/

// The round arrow of a link card's call: a quiet `accent` disc that fills pine while its card is hovered or focused.
const twArrowStyles = defineStyles({
  layout: "grid shrink-0 place-items-center",
  geometry: "size-10 rounded-full",
  appearance: "bg-accent text-heading",
  interaction: "transition-colors duration-200",
  hover: "[a:hover_&]:bg-primary [a:hover_&]:text-primary-foreground",
  focus: "[a:focus-visible_&]:bg-primary [a:focus-visible_&]:text-primary-foreground",
  motion: "motion-reduce:transition-none",
  // The forward arrow points left (RTL) and flips in LTR. Like a text link's arrow, it nudges ahead while its card is
  // hovered or focused; the external icon nudges up and out, the way it points.
  icon: "[&>svg]:size-4 ltr:[&>svg[data-icon=forward]]:-scale-x-100",
  iconMotion:
    "[&>svg]:transition-[translate] [&>svg]:duration-200 [&>svg]:ease-out motion-safe:[a:focus-visible_&>svg[data-icon=external]]:translate-x-0.5 motion-safe:[a:focus-visible_&>svg[data-icon=external]]:-translate-y-0.5 motion-safe:[a:focus-visible_&>svg[data-icon=forward]]:-translate-x-0.5 motion-safe:ltr:[a:focus-visible_&>svg[data-icon=forward]]:translate-x-0.5 motion-safe:[a:hover_&>svg[data-icon=external]]:translate-x-0.5 motion-safe:[a:hover_&>svg[data-icon=external]]:-translate-y-0.5 motion-safe:[a:hover_&>svg[data-icon=forward]]:-translate-x-0.5 motion-safe:ltr:[a:hover_&>svg[data-icon=forward]]:translate-x-0.5",
});

/*===== Media Styles =====*/

// The media frame clips its image so the media zoom stays inside it. `bg-accent` shows while the image loads and
// around a contained poster without a backdrop. `isolate` keeps the backdrop's negative layers inside the frame.
const twMediaStyles = defineStyles({
  layout: "relative isolate shrink-0 overflow-hidden",
  appearance: "bg-accent",
  geometry: "[&_img]:size-full",
  // The backdrop: a copy of the image filling the frame behind it, blurred by the `contain` fit.
  layoutBackdrop:
    "*:data-[slot=card-media-backdrop]:absolute *:data-[slot=card-media-backdrop]:inset-0 *:data-[slot=card-media-backdrop]:-z-20 *:data-[slot=card-media-backdrop]:object-cover",
  // A badge in the frame is the photo's label («خبر ویژه»), pinned to its top-start corner.
  layoutBadge: "*:data-[slot=badge]:absolute *:data-[slot=badge]:start-4 *:data-[slot=badge]:top-4",
  // The media zoom: the photo scales to 1.03 inside a hovered or focused link card.
  interaction: "[&_img]:transition-[scale] [&_img]:duration-300 [&_img]:ease-out",
  hover: "motion-safe:[a:hover_&_img]:scale-[1.03]",
  focus: "motion-safe:[a:focus-visible_&_img]:scale-[1.03]",
});

// Images that contain text (posters, flyers, certificates) must keep their own title readable: crop from the top,
// or show the whole image, over a blurred copy of itself when it has a CardMediaBackdrop. Photos fill the frame.
const twMediaFit = defineStyles({
  cover: {
    geometry: "[&_img]:object-cover",
  },
  top: {
    geometry: "[&_img]:object-cover [&_img]:object-top",
  },
  contain: {
    geometry: "[&_img]:object-contain",
    // Blurs the backdrop from above rather than with `blur`, which would fade its edges into the frame's colour.
    appearanceBackdrop: "before:absolute before:inset-0 before:-z-10 before:backdrop-blur-2xl",
  },
});

// `bleed` is a frame inside a card, whose corners the card clips; `inset` is a frame standing on the page by itself (a
// story row's photo), so it rounds its own corners.
const twMediaFrame = defineStyles({
  bleed: {},
  inset: {
    geometry: "rounded-sm",
  },
});

/*===== Class Composition =====*/

const cardVariants = cva(joinStyles(twCardStyles), {
  variants: {
    size: composeStyles(twSize),
    orientation: composeStyles(twOrientation),
  },
  defaultVariants: { size: "default", orientation: "vertical" },
});

const cardMediaVariants = cva(joinStyles(twMediaStyles), {
  variants: {
    fit: composeStyles(twMediaFit),
    frame: composeStyles(twMediaFrame),
  },
  defaultVariants: { fit: "cover", frame: "bleed" },
});

const cardDescriptionVariants = cva(joinStyles(twDescriptionStyles), {
  variants: {
    lines: composeStyles(twDescriptionLines),
  },
  defaultVariants: { lines: "all" },
});

const cardHeaderClasses = joinStyles(twHeaderStyles);
const cardTitleClasses = joinStyles(twTitleStyles);
const cardKickerClasses = joinStyles(twKickerStyles);
const cardActionClasses = joinStyles(twActionStyles);
const cardContentClasses = joinStyles(twContentStyles);
const cardBodyClasses = joinStyles(twBodyStyles);
const cardFooterClasses = joinStyles(twFooterStyles);
const cardCallClasses = joinStyles(twCallStyles);
const cardArrowClasses = joinStyles(twArrowStyles);

export {
  cardVariants,
  cardMediaVariants,
  cardHeaderClasses,
  cardTitleClasses,
  cardKickerClasses,
  cardDescriptionVariants,
  cardActionClasses,
  cardContentClasses,
  cardBodyClasses,
  cardFooterClasses,
  cardCallClasses,
  cardArrowClasses,
  twSize,
  twOrientation,
  twMediaFit,
  twMediaFrame,
};
