import { cva } from "class-variance-authority";
import { composeStyles, defineStyles, joinStyles } from "../styles";

/*===== Surface Styles =====*/

// Parts space themselves with `--card-spacing`, so a size only has to change that one variable.
const twCardStyles = defineStyles({
  layout: "group/card flex flex-col gap-(--card-spacing) overflow-hidden",
  geometry: "rounded-md border py-(--card-spacing)",
  // The footer brings its own padding, so the card drops its bottom padding.
  geometryFooter: "has-data-[slot=card-footer]:pb-0",
  // Edge-to-edge media replaces the card's top padding; the card's `overflow-hidden` rounds its corners.
  geometryMedia:
    "has-[>[data-slot=card-media]:first-child]:pt-0 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-md *:[img:last-child]:rounded-b-md",
  typography: "text-body-sm",
  // Cards rest flat on a hairline.
  appearance: "border-border bg-card text-card-foreground",
  // The card lift, for a card rendered as a link (`render={<SiteLink … />}`): the edge darkens to `border-strong` and
  // the card takes `shadow-md`. It is the one hover for every content card (news, achievements, learning rows).
  interaction: "transition-[border-color,box-shadow] duration-200 ease-out outline-none",
  hover: "[a&]:hover:border-border-strong [a&]:hover:shadow-md",
  focus:
    "focus-visible:border-border-strong focus-visible:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
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

const twDescriptionStyles = defineStyles({
  typography: "text-body-sm",
  appearance: "text-muted-foreground",
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

const twFooterStyles = defineStyles({
  layout: "flex items-center",
  geometry: "rounded-b-md border-t p-(--card-spacing)",
  appearance: "bg-muted",
});

/*===== Media Styles =====*/

// The media frame clips its image so the media zoom stays inside it. `bg-accent` shows while the image loads and
// around a contained poster.
const twMediaStyles = defineStyles({
  layout: "relative shrink-0 overflow-hidden",
  appearance: "bg-accent",
  geometry: "[&_img]:size-full",
  // The media zoom: the photo scales to 1.03 inside a hovered or focused link card.
  interaction: "[&_img]:transition-[scale] [&_img]:duration-300 [&_img]:ease-out",
  hover: "motion-safe:[a:hover_&_img]:scale-[1.03]",
  focus: "motion-safe:[a:focus-visible_&_img]:scale-[1.03]",
});

// Images that contain text (posters, flyers, certificates) must keep their own title readable: crop from the top,
// or show the whole image on `muted`. Photos fill the frame.
const twMediaFit = defineStyles({
  cover: {
    geometry: "[&_img]:object-cover",
  },
  top: {
    geometry: "[&_img]:object-cover [&_img]:object-top",
  },
  contain: {
    geometry: "[&_img]:object-contain",
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
  },
  defaultVariants: { fit: "cover" },
});

const cardHeaderClasses = joinStyles(twHeaderStyles);
const cardTitleClasses = joinStyles(twTitleStyles);
const cardDescriptionClasses = joinStyles(twDescriptionStyles);
const cardActionClasses = joinStyles(twActionStyles);
const cardContentClasses = joinStyles(twContentStyles);
const cardBodyClasses = joinStyles(twBodyStyles);
const cardFooterClasses = joinStyles(twFooterStyles);

export {
  cardVariants,
  cardMediaVariants,
  cardHeaderClasses,
  cardTitleClasses,
  cardDescriptionClasses,
  cardActionClasses,
  cardContentClasses,
  cardBodyClasses,
  cardFooterClasses,
  twSize,
  twOrientation,
  twMediaFit,
};
