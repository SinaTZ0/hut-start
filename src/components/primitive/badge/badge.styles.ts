import { cva } from "class-variance-authority";
import { composeStyles, defineStyles, joinStyles } from "../styles";

/*===== Shared Styles =====*/

const twSharedStyles = defineStyles({
  layout: "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1",
  geometry: "overflow-hidden border border-transparent px-3",
  geometryIcon: "has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
  typography: "text-caption font-semibold",
  interaction: "transition-colors duration-200",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  invalid: "aria-invalid:border-destructive",
  icon: "[&>svg]:pointer-events-none [&>svg]:size-3.5!",
});

/*===== Appearance =====*/

// `default` is the quiet category chip; `highlight` marks one featured item per card; `media` is the label set on a
// photo («خبر ویژه», «در کانون توجه»). Status tones always pair with an icon or a word.
const twVariant = defineStyles({
  default: {
    appearance: "bg-accent text-heading",
    hover: "[a]:hover:bg-border",
  },
  highlight: {
    appearance: "bg-highlight text-highlight-foreground",
    hover: "[a]:hover:bg-highlight-hover",
  },
  media: {
    typography: "font-bold",
    appearance: "bg-band-deep text-on-band",
  },
  outline: {
    appearance: "border-border text-foreground",
    hover: "[a]:hover:bg-accent",
  },
  success: { appearance: "bg-success-surface text-success" },
  warning: { appearance: "bg-warning-surface text-warning" },
  info: { appearance: "bg-info-surface text-info" },
  destructive: { appearance: "bg-destructive-surface text-destructive" },
});

/*===== Size =====*/

// `default` is a pill of three words at most, so it never wraps or grows. `wrap` is for a label that can run longer
// than its column (a lab's equipment, written as a phrase on the old site): it wraps inside a rounded box instead.
const twSize = defineStyles({
  default: { geometry: "h-6 rounded-full py-0.5", typography: "whitespace-nowrap" },
  wrap: { geometry: "min-h-6 max-w-full rounded-md py-1", typography: "text-start" },
});

/*===== Class Composition =====*/

const badgeVariants = cva(joinStyles(twSharedStyles), {
  variants: {
    variant: composeStyles(twVariant),
    size: composeStyles(twSize),
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export { badgeVariants, twVariant, twSize };
