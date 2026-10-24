import { defineStyles, joinStyles } from "../styles";

/*===== Content Styles =====*/

// The panel opens by growing from 0 to its measured height (`--collapsible-panel-height`, set by Base UI) while it
// fades in, and closes the same way, a little faster. Whatever follows the panel glides along with it instead of
// jumping. Content that must not be clipped while it grows (a shadow) needs room inside the panel.
const twContentStyles = defineStyles({
  geometry: "h-(--collapsible-panel-height) overflow-hidden",
  interaction: "transition-[height,opacity] duration-300 ease-out data-ending-style:duration-200",
  state: "data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0",
  motion: "motion-reduce:transition-none",
});

/*===== Class Composition =====*/

const collapsibleContentClasses = joinStyles(twContentStyles);

export { collapsibleContentClasses };
