import { defineStyles, joinStyles } from "../styles";

/*===== Root Styles =====*/

const twRootStyles = defineStyles({
  layout: "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
});

const twListStyles = defineStyles({
  layout: "flex flex-1 list-none items-center justify-center gap-1",
});

const twItemStyles = defineStyles({
  layout: "relative",
});

/*===== Trigger Styles =====*/

// A compact tab in the header bar. Hover and an open menu share the quiet `accent` wash; plain links use the same
// look (`navigationMenuTriggerStyle`), so the row reads as one set.
const twTriggerStyles = defineStyles({
  layout: "group/navigation-menu-trigger inline-flex w-max items-center justify-center gap-1",
  geometry: "h-10 rounded-sm px-3",
  typography: "text-nav whitespace-nowrap",
  appearance: "text-foreground",
  interaction: "transition-colors duration-200 outline-none select-none",
  hover: "hover:bg-accent hover:text-heading",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  disabled: "disabled:pointer-events-none disabled:opacity-45",
  state: "data-popup-open:bg-accent data-popup-open:text-heading",
  motion: "motion-reduce:transition-none",
});

const twTriggerIconStyles = defineStyles({
  layout: "relative top-px",
  geometry: "size-4",
  appearance: "text-muted-foreground",
  interaction: "transition-transform duration-300",
  state: "group-data-popup-open/navigation-menu-trigger:rotate-180",
  motion: "motion-reduce:transition-none",
});

/*===== Content Styles =====*/

// A section's panel inside the shared popup. Moving to another trigger slides the old panel out and the new one in
// from the side the pointer travelled to (`data-activation-direction` is physical, so RTL needs no flipping).
const twContentStyles = defineStyles({
  geometry: "h-full w-max p-6",
  interaction: "transition-[opacity,translate] duration-300 ease-glide",
  state:
    "data-ending-style:opacity-0 data-starting-style:opacity-0 data-[activation-direction=left]:data-ending-style:translate-x-1/2 data-[activation-direction=left]:data-starting-style:-translate-x-1/2 data-[activation-direction=right]:data-ending-style:-translate-x-1/2 data-[activation-direction=right]:data-starting-style:translate-x-1/2",
  motion: "motion-reduce:transition-none",
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
  geometry: "h-(--popup-height) w-(--popup-width) rounded-md",
  appearance: "bg-popover text-popover-foreground shadow-md ring-1 ring-border",
  focus: "outline-none",
  interaction: "transition-[opacity,scale,width,height] duration-300 ease-glide",
  state:
    "data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:scale-95 data-starting-style:opacity-0",
  motion: "motion-reduce:transition-none",
});

const twViewportStyles = defineStyles({
  layout: "relative overflow-hidden",
  geometry: "size-full rounded-md",
});

/*===== Link Styles =====*/

const twLinkStyles = defineStyles({
  layout: "flex items-center gap-1.5",
  geometry: "min-h-9 rounded-sm px-2",
  typography: "text-body-sm",
  appearance: "text-foreground",
  interaction: "transition-colors duration-200 outline-none",
  hover: "hover:bg-accent hover:text-heading",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  state: "data-active:bg-accent data-active:text-heading",
  icon: "[&_svg:not([class*='size-'])]:size-4",
  motion: "motion-reduce:transition-none",
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

const navigationMenuRootClasses = joinStyles(twRootStyles);
const navigationMenuListClasses = joinStyles(twListStyles);
const navigationMenuItemClasses = joinStyles(twItemStyles);
const navigationMenuTriggerClasses = joinStyles(twTriggerStyles);
const navigationMenuTriggerIconClasses = joinStyles(twTriggerIconStyles);
const navigationMenuContentClasses = joinStyles(twContentStyles);
const navigationMenuPositionerClasses = joinStyles(twPositionerStyles);
const navigationMenuPopupClasses = joinStyles(twPopupStyles);
const navigationMenuViewportClasses = joinStyles(twViewportStyles);
const navigationMenuLinkClasses = joinStyles(twLinkStyles);
const navigationMenuIndicatorClasses = joinStyles(twIndicatorStyles);
const navigationMenuIndicatorArrowClasses = joinStyles(twIndicatorArrowStyles);

/** The trigger's look, for a plain link that sits in the row beside the triggers (shadcn's helper). */
const navigationMenuTriggerStyle = () => navigationMenuTriggerClasses;

export {
  navigationMenuRootClasses,
  navigationMenuListClasses,
  navigationMenuItemClasses,
  navigationMenuTriggerClasses,
  navigationMenuTriggerIconClasses,
  navigationMenuContentClasses,
  navigationMenuPositionerClasses,
  navigationMenuPopupClasses,
  navigationMenuViewportClasses,
  navigationMenuLinkClasses,
  navigationMenuIndicatorClasses,
  navigationMenuIndicatorArrowClasses,
  navigationMenuTriggerStyle,
};
