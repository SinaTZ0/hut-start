import { cva } from "class-variance-authority";
import { composeStyles, defineStyles, joinStyles } from "../styles";

/*===== Shared Styles =====*/

const twSharedStyles = defineStyles({
  layout: "group/toggle inline-flex shrink-0 items-center justify-center gap-1.5",
  typography: "font-semibold whitespace-nowrap",
  interaction: "cursor-pointer transition-colors duration-200",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  disabled: "disabled:pointer-events-none disabled:opacity-45",
  icon: "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
});

/*===== Appearance =====*/

// `chip` is the filter tag over a list (the phone book's offices, the systems' groups): a hairline pill that fills pine
// when pressed, its count turning gold (`data-slot=toggle-count`). `ghost` is a plain pressed/unpressed button.
const twVariant = defineStyles({
  chip: {
    geometry: "rounded-full border",
    appearance: "border-border bg-card text-heading",
    hover: "hover:border-border-strong hover:bg-accent",
    state:
      "data-pressed:border-primary data-pressed:bg-primary data-pressed:text-primary-foreground data-pressed:hover:bg-primary-hover",
    stateCount:
      "**:data-[slot=toggle-count]:text-muted-foreground data-pressed:**:data-[slot=toggle-count]:text-highlight",
  },
  ghost: {
    geometry: "rounded-md",
    appearance: "bg-transparent text-muted-foreground",
    hover: "hover:bg-accent hover:text-heading",
    state: "data-pressed:bg-accent data-pressed:text-heading",
  },
});

// 40px keeps the tap target on phones; `sm` is for a dense row on a desktop-only panel.
const twSize = defineStyles({
  default: { geometry: "h-10 px-4", typography: "text-caption" },
  sm: { geometry: "h-8 px-3", typography: "text-caption" },
});

/*===== Class Composition =====*/

const toggleVariants = cva(joinStyles(twSharedStyles), {
  variants: {
    variant: composeStyles(twVariant),
    size: composeStyles(twSize),
  },
  defaultVariants: { variant: "chip", size: "default" },
});

export { toggleVariants, twVariant, twSize };
