import { cva } from "class-variance-authority";

import { composeStyles, defineStyles, joinStyles } from "../styles";

/*===== Overlay =====*/

const twOverlayStyles = defineStyles({
  layout: "fixed inset-0 isolate z-50",
  appearance: "bg-heading/30 supports-backdrop-filter:backdrop-blur-sm",
  interaction: "transition-opacity duration-150",
  state: "data-ending-style:opacity-0 data-starting-style:opacity-0",
  motion: "motion-reduce:transition-none",
});

/*===== Content =====*/

const twContentStyles = defineStyles({
  layout: "fixed z-50 grid",
  interaction: "transition duration-150 ease-out outline-none",
  state: "data-ending-style:opacity-0 data-starting-style:opacity-0",
  motion: "motion-reduce:transition-none",
});

// `default` is a centred panel; `fullscreen` covers the screen on the dark viewer ground (a photo viewer), with its
// own overlay colour, so the page under it doesn't show through.
const twSize = defineStyles({
  default: {
    layout: "inset-x-4 top-1/2 mx-auto max-w-md -translate-y-1/2 gap-6",
    geometry: "rounded-lg p-6",
    appearance: "bg-popover text-popover-foreground shadow-md ring-1 ring-border",
    typography: "text-body-sm",
    state: "data-ending-style:scale-95 data-starting-style:scale-95",
  },
  fullscreen: {
    layout: "inset-0",
    appearance: "bg-viewer text-on-band",
  },
});

const twCloseStyles = defineStyles({
  layout: "absolute inset-e-4 top-4",
});

/*===== Parts =====*/

const twHeaderStyles = defineStyles({ layout: "flex flex-col gap-2" });
const twFooterStyles = defineStyles({ layout: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end" });
const twTitleStyles = defineStyles({ typography: "font-heading text-title" });
const twDescriptionStyles = defineStyles({ typography: "text-body-sm", appearance: "text-muted-foreground" });

/*===== Class Composition =====*/

const dialogContentVariants = cva(joinStyles(twContentStyles), {
  variants: { size: composeStyles(twSize) },
  defaultVariants: { size: "default" },
});

const dialogOverlayClasses = joinStyles(twOverlayStyles);
const dialogCloseClasses = joinStyles(twCloseStyles);
const dialogHeaderClasses = joinStyles(twHeaderStyles);
const dialogFooterClasses = joinStyles(twFooterStyles);
const dialogTitleClasses = joinStyles(twTitleStyles);
const dialogDescriptionClasses = joinStyles(twDescriptionStyles);

export {
  dialogCloseClasses,
  dialogContentVariants,
  dialogDescriptionClasses,
  dialogFooterClasses,
  dialogHeaderClasses,
  dialogOverlayClasses,
  dialogTitleClasses,
  twSize,
};
