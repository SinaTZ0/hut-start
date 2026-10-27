import { cva } from "class-variance-authority";

import { composeStyles, defineStyles, joinStyles } from "../styles";

/*===== Root Styles =====*/

const twRootStyles = defineStyles({
  layout: "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
});

const twListStyles = defineStyles({
  layout: "flex flex-1 list-none items-center justify-center",
});

/*===== Tones =====*/
// What the menu sits on. `paper`: a light bar. `band`: a pine bar, where each tab fills the bar's height and a gold
// rule under it marks hover and the open section, and the card opens as a full-width panel under the bar (anchor it to
// the bar). `glass`: a photo, with the tabs in a frosted glass capsule and the card in dark glass. `frost`: the same
// capsule in frosted paper, for a bar laid over a light page.

const twListTone = defineStyles({
  paper: { layout: "gap-1" },
  band: { layout: "h-full gap-0" },
  glass: {
    layout: "gap-0.5",
    geometry: "rounded-full border p-1",
    appearance: "border-glass-edge bg-glass backdrop-blur-md",
  },
  frost: {
    layout: "gap-0.5",
    geometry: "rounded-full border p-1",
    appearance: "border-border bg-background-alt/78 backdrop-blur-md",
  },
});

const twItemTone = defineStyles({
  paper: { layout: "relative" },
  band: { layout: "relative h-full" },
  glass: { layout: "relative" },
  frost: { layout: "relative" },
});

/*===== Trigger Styles =====*/

// A compact tab in the header bar. Hover and an open menu share the quiet `accent` wash; plain links use the same
// look (`navigationMenuTriggerStyle`), so the row reads as one set.
const twTriggerStyles = defineStyles({
  layout: "group/navigation-menu-trigger inline-flex w-max items-center justify-center gap-1",
  typography: "text-nav whitespace-nowrap",
  interaction: "transition-colors duration-200 outline-none select-none",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  disabled: "disabled:pointer-events-none disabled:opacity-45",
  motion: "motion-reduce:transition-none motion-reduce:after:transition-none",
});

const twTriggerTone = defineStyles({
  paper: {
    geometry: "h-10 rounded-sm px-3",
    appearance: "text-foreground",
    hover: "hover:bg-accent hover:text-heading",
    state: "data-popup-open:bg-accent data-popup-open:text-heading",
  },
  // The gold rule sits on the bar's bottom edge, drawn from the middle out.
  band: {
    layout: "relative",
    geometry: "h-full px-4",
    appearance:
      "text-on-band-soft after:absolute after:inset-x-4 after:-bottom-px after:h-0.5 after:scale-x-0 after:rounded-full after:bg-highlight after:transition-transform after:duration-200 after:ease-out",
    hover: "hover:text-on-band hover:after:scale-x-100",
    state: "data-popup-open:text-on-band data-popup-open:after:scale-x-100",
  },
  glass: {
    geometry: "h-9 rounded-full px-4",
    appearance: "text-on-band",
    hover: "hover:bg-glass-hover",
    state: "data-popup-open:bg-glass-hover",
  },
  frost: {
    geometry: "h-9 rounded-full px-4",
    appearance: "text-heading",
    hover: "hover:bg-accent",
    state: "data-popup-open:bg-accent",
  },
});

const twTriggerIconStyles = defineStyles({
  layout: "relative top-px",
  geometry: "size-4",
  interaction: "transition-transform duration-300",
  state: "group-data-popup-open/navigation-menu-trigger:rotate-180",
  motion: "motion-reduce:transition-none",
});

const twTriggerIconTone = defineStyles({
  paper: { appearance: "text-muted-foreground" },
  band: { appearance: "opacity-70" },
  glass: { appearance: "opacity-70" },
  frost: { appearance: "text-muted-foreground" },
});

/*===== Content Styles =====*/

// A section's panel inside the shared popup. Moving to another trigger slides the old panel out and the new one in
// from the side the pointer travelled to (`data-activation-direction` is physical, so RTL needs no flipping).
const twContentStyles = defineStyles({
  geometry: "h-full w-max",
  interaction: "transition-[opacity,translate] duration-300 ease-glide",
  state:
    "data-ending-style:opacity-0 data-starting-style:opacity-0 data-[activation-direction=left]:data-ending-style:translate-x-1/2 data-[activation-direction=left]:data-starting-style:-translate-x-1/2 data-[activation-direction=right]:data-ending-style:-translate-x-1/2 data-[activation-direction=right]:data-starting-style:translate-x-1/2",
  motion: "motion-reduce:transition-none",
});

// The band's panel spans the bar, so its content lines up with the bar's own edge.
const twContentTone = defineStyles({
  paper: { geometry: "p-6" },
  band: { geometry: "px-edge pt-7 pb-8" },
  glass: { geometry: "p-6" },
  frost: { geometry: "p-6" },
});

/*===== Popup Styles =====*/

// The positioner follows the open trigger. Its `before` strip bridges the gap down to the popup (the `sideOffset`),
// so the pointer can cross it without the menu closing.
const twPositionerStyles = defineStyles({
  layout: "isolate z-50 before:absolute before:inset-x-0 before:-top-4 before:h-4",
  geometry: "h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)",
  interaction: "transition-[top,left,right,bottom] duration-300 ease-glide",
  state: "data-instant:transition-none",
  motion: "motion-reduce:transition-none",
});

// A card like the popovers, which resizes to each section's panel. Its edge is a ring, not a border: the popup is
// sized to the panel exactly (`--popup-width`), and a border would eat into that.
const twPopupStyles = defineStyles({
  layout: "relative origin-(--transform-origin)",
  geometry: "h-(--popup-height)",
  focus: "outline-none",
  interaction: "transition-[opacity,scale,width,height] duration-300 ease-glide",
  state:
    "data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:scale-95 data-starting-style:opacity-0",
  motion: "motion-reduce:transition-none",
});

const twPopupTone = defineStyles({
  paper: {
    geometry: "w-(--popup-width) rounded-md",
    appearance: "bg-popover text-popover-foreground shadow-md ring-1 ring-border",
  },
  // As wide as the bar it's anchored to, with a hairline foot instead of a ring around it.
  band: {
    geometry: "w-(--anchor-width) border-b",
    appearance: "border-border bg-card text-card-foreground shadow-lg",
  },
  glass: {
    geometry: "w-(--popup-width) rounded-lg",
    appearance:
      "bg-band-deep/72 text-on-band-soft shadow-glass ring-1 ring-glass-edge backdrop-blur-xl backdrop-saturate-130",
  },
  frost: {
    geometry: "w-(--popup-width) rounded-lg",
    appearance:
      "bg-background-alt/78 text-popover-foreground shadow-md ring-1 ring-border backdrop-blur-xl backdrop-saturate-130",
  },
});

const twViewportStyles = defineStyles({
  layout: "relative overflow-hidden",
  geometry: "size-full rounded-[inherit]",
});

/*===== Link Styles =====*/

const twLinkStyles = defineStyles({
  layout: "flex items-center gap-1.5",
  geometry: "min-h-9 rounded-sm px-2",
  typography: "text-body-sm",
  appearance: "text-foreground",
  interaction: "transition-colors duration-200 outline-none",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  icon: "[&_svg:not([class*='size-'])]:size-4",
  motion: "motion-reduce:transition-none",
});

const twLinkTone = defineStyles({
  paper: {
    hover: "hover:bg-accent hover:text-heading",
    state: "data-active:bg-accent data-active:text-heading",
  },
  band: {
    hover: "hover:bg-accent hover:text-heading",
    state: "data-active:bg-accent data-active:text-heading",
  },
  glass: {
    appearance: "text-on-band-soft",
    hover: "hover:bg-glass hover:text-on-band",
    state: "data-active:bg-glass data-active:text-on-band",
  },
  frost: {
    hover: "hover:bg-accent hover:text-heading",
    state: "data-active:bg-accent data-active:text-heading",
  },
});

/*===== Indicator Styles =====*/

const twIndicatorStyles = defineStyles({
  layout: "top-full z-1 flex items-end justify-center overflow-hidden",
  geometry: "h-1.5",
  state:
    "data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
});

const twIndicatorArrowStyles = defineStyles({
  layout: "relative top-3/5 rotate-45",
  geometry: "size-2 rounded-xs",
  appearance: "bg-border shadow-md",
});

/*===== Class Composition =====*/

/** A part's classes in one tone. */
const toned = (base: string, tones: Record<NavigationMenuTone, string>) =>
  cva(base, { variants: { tone: tones }, defaultVariants: { tone: "paper" } });

export type NavigationMenuTone = keyof typeof twTriggerTone;

const navigationMenuRootClasses = joinStyles(twRootStyles);
const navigationMenuListVariants = toned(joinStyles(twListStyles), composeStyles(twListTone));
const navigationMenuItemVariants = toned("", composeStyles(twItemTone));
const navigationMenuTriggerVariants = toned(joinStyles(twTriggerStyles), composeStyles(twTriggerTone));
const navigationMenuTriggerIconVariants = toned(joinStyles(twTriggerIconStyles), composeStyles(twTriggerIconTone));
const navigationMenuContentVariants = toned(joinStyles(twContentStyles), composeStyles(twContentTone));
const navigationMenuPositionerClasses = joinStyles(twPositionerStyles);
const navigationMenuPopupVariants = toned(joinStyles(twPopupStyles), composeStyles(twPopupTone));
const navigationMenuViewportClasses = joinStyles(twViewportStyles);
const navigationMenuLinkVariants = toned(joinStyles(twLinkStyles), composeStyles(twLinkTone));
const navigationMenuIndicatorClasses = joinStyles(twIndicatorStyles);
const navigationMenuIndicatorArrowClasses = joinStyles(twIndicatorArrowStyles);

/**
 * The trigger's look, for a plain link that sits in the row beside the triggers (shadcn's helper). Pass the menu's
 * tone: a link in the row isn't told it by the menu.
 */
const navigationMenuTriggerStyle = (tone: NavigationMenuTone = "paper") => navigationMenuTriggerVariants({ tone });

export {
  navigationMenuRootClasses,
  navigationMenuListVariants,
  navigationMenuItemVariants,
  navigationMenuTriggerVariants,
  navigationMenuTriggerIconVariants,
  navigationMenuContentVariants,
  navigationMenuPositionerClasses,
  navigationMenuPopupVariants,
  navigationMenuViewportClasses,
  navigationMenuLinkVariants,
  navigationMenuIndicatorClasses,
  navigationMenuIndicatorArrowClasses,
  navigationMenuTriggerStyle,
};
