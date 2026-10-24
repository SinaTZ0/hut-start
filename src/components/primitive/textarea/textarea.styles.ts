import { defineStyles, joinStyles } from "../styles";

/*===== Textarea Styles =====*/

const twTextareaStyles = defineStyles({
  // `field-sizing-content` grows the textarea with its content, starting from `min-h-28`.
  layout: "flex field-sizing-content w-full",
  // Same 1px `input` edge as Input.
  geometry: "min-h-28 rounded-sm border px-3.5 py-3",
  // The `body` style at 16px also keeps iOS Safari from zooming in on focus.
  typography: "text-base",
  appearance: "border-input bg-background shadow-sm placeholder:text-muted-foreground",
  interaction: "transition-colors duration-200 outline-none",
  hover: "hover:border-muted-foreground",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  disabled: "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-45",
  invalid: "aria-invalid:border-destructive",
});

const textareaClasses = joinStyles(twTextareaStyles);

export { textareaClasses };
