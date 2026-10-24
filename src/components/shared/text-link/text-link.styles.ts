import { cva } from "class-variance-authority";
import { composeStyles, defineStyles, joinStyles } from "#/components/primitive/styles";

/*===== Shared Styles =====*/

const twTextLinkStyles = defineStyles({
  layout: "group/text-link inline-flex items-center gap-2",
  // A standalone link keeps the 40px tap target; a call inside a link card is part of the card's target already.
  geometry: "rounded-sm [a&]:min-h-10",
  typography: "text-body-sm font-bold underline-offset-4",
  hover: "[a:hover_&]:underline",
  interaction: "transition-colors duration-200 ease-out outline-none",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid [a:focus-visible_&]:underline",
  motion: "motion-reduce:transition-none",
});

// The arrow nudge. `[a:hover_&]` matches the text link itself or the link card around a call, so both nudge.
// The arrow points left ("forward" in RTL) and flips in LTR, where the nudge goes right.
const twArrowStyles = defineStyles({
  geometry: "size-4 shrink-0 ltr:-scale-x-100",
  interaction: "transition-[translate] duration-200 ease-out",
  hover: "motion-safe:[a:hover_&]:-translate-x-1 motion-safe:ltr:[a:hover_&]:translate-x-1",
  focus: "motion-safe:[a:focus-visible_&]:-translate-x-1 motion-safe:ltr:[a:focus-visible_&]:translate-x-1",
  motion: "motion-reduce:transition-none",
});

/*===== Tones =====*/

// Links underline on hover and focus and keep their colour. `band` is for pine bands; `highlight` is the gold link on
// a band (it stays gold).
const twTone = defineStyles({
  default: {
    appearance: "text-brand-text",
  },
  band: {
    appearance: "text-on-band",
  },
  highlight: {
    appearance: "text-highlight",
  },
});

/*===== Class Composition =====*/

const textLinkVariants = cva(joinStyles(twTextLinkStyles), {
  variants: { tone: composeStyles(twTone) },
  defaultVariants: { tone: "default" },
});

const textLinkArrowClasses = joinStyles(twArrowStyles);

export { textLinkVariants, textLinkArrowClasses, twTone };
