import { defineStyles, joinStyles } from "../styles";

/*===== Group Styles =====*/

const twGroupStyles = defineStyles({
  layout: "grid w-full gap-3",
});

/*===== Item Styles =====*/

const twItemStyles = defineStyles({
  layout: "group/radio-group-item peer relative flex shrink-0",
  // `after` widens the tap target past the 18px circle without moving the layout.
  geometry: "aspect-square size-4.5 rounded-full border after:absolute after:-inset-x-3 after:-inset-y-2",
  appearance: "border-input bg-background shadow-sm",
  interaction: "transition-colors duration-200 outline-none",
  hover: "hover:border-muted-foreground",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  // Inside a choice card (a FieldLabel wrapping a Field) the card draws the ring instead.
  focusCard: "group-has-focus-visible/field-label:outline-none",
  state: "data-checked:border-primary",
  disabled: "disabled:cursor-not-allowed disabled:opacity-45",
  invalid: "aria-invalid:border-destructive",
});

const twIndicatorStyles = defineStyles({
  layout: "flex size-full items-center justify-center",
});

const twDotStyles = defineStyles({
  geometry: "size-2 rounded-full",
  appearance: "bg-primary",
});

const radioGroupClasses = joinStyles(twGroupStyles);
const radioGroupItemClasses = joinStyles(twItemStyles);
const radioGroupIndicatorClasses = joinStyles(twIndicatorStyles);
const radioGroupDotClasses = joinStyles(twDotStyles);

export { radioGroupClasses, radioGroupDotClasses, radioGroupIndicatorClasses, radioGroupItemClasses };
