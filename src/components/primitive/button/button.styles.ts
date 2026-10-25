import { cva } from "class-variance-authority";
import { cn } from "#/lib/utils";
import { composeStyles, defineStyles, joinStyles } from "../styles";

/*===== Shared Styles =====*/

const twSharedStyles = defineStyles({
  // `group/button` lets icons and labels react to the button's own state.
  layout: "group/button inline-flex shrink-0 items-center justify-center",
  // A 1px edge, transparent unless a variant draws it, so every variant has the same size.
  geometry: "rounded-sm border",
  appearance: "border-transparent bg-clip-padding",
  typography: "text-button whitespace-nowrap",
  interaction:
    "transition-[color,background-color,border-color,translate] duration-200 ease-out outline-none select-none",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  // The press: a 1px drop while held. Transforms only run with motion allowed.
  active: "motion-safe:active:not-disabled:translate-y-px",
  disabled: "disabled:pointer-events-none disabled:opacity-45",
  invalid: "aria-invalid:border-destructive",
  icon: "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  // The arrow nudge: a trailing forward arrow moves 4px ahead (left in RTL, right in LTR) on hover and keyboard focus.
  iconNudge:
    "**:data-[icon=inline-end]:transition-[translate] **:data-[icon=inline-end]:duration-200 **:data-[icon=inline-end]:ease-out motion-safe:**:data-[icon=inline-end]:group-hover/button:-translate-x-1 motion-safe:**:data-[icon=inline-end]:group-focus-visible/button:-translate-x-1 motion-safe:ltr:**:data-[icon=inline-end]:group-hover/button:translate-x-1 motion-safe:ltr:**:data-[icon=inline-end]:group-focus-visible/button:translate-x-1",
  motion: "motion-reduce:transition-none",
});

/*===== Appearance =====*/

// One `highlight` (gold) button per band: the main call to action. `default` (pine) is for in-app actions, and
// `outline-band` is the quiet button beside the gold one on a pine band. Hover tints by one step; the movement is the
// shared press and arrow nudge above.
const twVariant = defineStyles({
  default: {
    appearance: "bg-primary text-primary-foreground",
    hover: "hover:bg-primary-hover",
  },
  highlight: {
    appearance: "bg-highlight text-highlight-foreground",
    hover: "hover:bg-highlight-hover",
  },
  outline: {
    appearance: "border-input bg-transparent text-heading",
    hover: "hover:bg-accent",
    state: "aria-expanded:bg-accent",
  },
  "outline-band": {
    appearance: "border-band-control bg-transparent text-on-band",
    hover: "hover:border-on-band hover:bg-band-hover",
    state: "aria-expanded:bg-band-hover",
  },
  secondary: {
    appearance: "bg-secondary text-secondary-foreground",
    hover: "hover:bg-accent",
    state: "aria-expanded:bg-accent",
  },
  // The header's round icon tools (search, theme, account, menu): use with an `icon-*` size.
  tool: {
    geometry: "rounded-full",
    appearance: "text-heading",
    hover: "hover:bg-accent",
    state: "aria-expanded:bg-accent data-popup-open:bg-accent",
  },
  ghost: {
    appearance: "text-brand-text",
    hover: "hover:bg-accent",
    state: "aria-expanded:bg-accent",
  },
  destructive: {
    appearance: "bg-destructive-surface text-destructive",
    hover: "hover:border-destructive",
  },
  link: {
    appearance: "text-brand-text underline-offset-4",
    hover: "hover:underline",
  },
  // A phone tab bar item (use with the `tab` size): muted until it's the current page (`aria-current`) or its sheet is
  // open, then its icon sits in a pine pill. The pill is the icon's own padding and background, so no wrapper is needed.
  tab: {
    appearance: "text-muted-foreground",
    hover: "hover:text-heading",
    state:
      "aria-[current=page]:text-heading data-popup-open:text-heading aria-[current=page]:[&_svg]:bg-primary aria-[current=page]:[&_svg]:text-primary-foreground data-popup-open:[&_svg]:bg-primary data-popup-open:[&_svg]:text-primary-foreground",
    icon: "[&_svg]:box-content [&_svg]:rounded-full [&_svg]:px-4 [&_svg]:py-1 [&_svg]:transition-colors [&_svg]:duration-200",
  },
});

/*===== Geometry =====*/

// Heights line up with the 44px inputs; `sm` and every icon size keep a 40px minimum tap target.
// `geometryIcon` tightens the padding on the side holding a `data-icon` child so the icon looks optically centered.
const twSize = defineStyles({
  xs: {
    layout: "gap-1",
    geometry: "h-8 px-3",
    geometryIcon: "has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
    typography: "text-caption font-bold",
    icon: "[&_svg:not([class*='size-'])]:size-4",
  },
  sm: {
    layout: "gap-1.5",
    geometry: "h-10 px-4",
    geometryIcon: "has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3",
    icon: "[&_svg:not([class*='size-'])]:size-4",
  },
  default: {
    layout: "gap-2",
    geometry: "h-11 px-5",
    geometryIcon: "has-data-[icon=inline-end]:pe-4 has-data-[icon=inline-start]:ps-4",
  },
  lg: {
    layout: "gap-2",
    geometry: "h-12 px-6",
    geometryIcon: "has-data-[icon=inline-end]:pe-5 has-data-[icon=inline-start]:ps-5",
  },
  "icon-xs": {
    geometry: "size-8",
    icon: "[&_svg:not([class*='size-'])]:size-4",
  },
  "icon-sm": {
    geometry: "size-10",
  },
  icon: {
    geometry: "size-11",
  },
  "icon-lg": {
    geometry: "size-12",
    icon: "[&_svg:not([class*='size-'])]:size-6",
  },
  // A phone tab bar item: icon over label, filling its cell and the bar's height.
  tab: {
    layout: "flex-col gap-0.5",
    geometry: "h-tab-bar w-full rounded-none px-1",
    typography: "text-caption font-semibold",
  },
});

/*===== Class Composition =====*/

const buttonCva = cva(joinStyles(twSharedStyles), {
  variants: {
    variant: composeStyles(twVariant),
    size: composeStyles(twSize),
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

/**
 * The button's classes, already merged: a variant's edge colour replaces the base `border-transparent`. Links styled as
 * buttons (`className={buttonVariants(…)}`) use them without passing through `cn`, so the merge happens here.
 */
const buttonVariants = (props?: Parameters<typeof buttonCva>[0]) => cn(buttonCva(props));

export { buttonVariants, twVariant, twSize };
