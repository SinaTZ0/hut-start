import { defineStyles, joinStyles } from "../styles";

/*===== Input Styles =====*/

const twInputStyles = defineStyles({
  layout: "w-full min-w-0",
  // The control edge: 1px `input`, which meets 3:1 on every surface. The field sits a step below the card it is on
  // (`background`), like the search field in the header.
  geometry: "h-11 rounded-sm border px-3.5 py-1",
  // 16px rather than `body` (15px): iOS Safari zooms in on focus below 16px.
  typography: "text-base",
  appearance: "border-input bg-background shadow-sm placeholder:text-muted-foreground",
  // The native file-picker button inside `type="file"` inputs.
  appearanceFile:
    "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
  interaction: "transition-colors duration-200 outline-none",
  hover: "hover:border-muted-foreground",
  focus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
  disabled: "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-45",
  invalid: "aria-invalid:border-destructive",
});

const inputClasses = joinStyles(twInputStyles);

export { inputClasses };
