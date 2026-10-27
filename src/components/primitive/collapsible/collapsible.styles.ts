import { defineStyles, joinStyles } from "../styles";

/*===== Content Styles =====*/

// The panel opens by growing from 0 to its measured height (`--collapsible-panel-height`, set by Base UI) and closes
// the same way, a little faster. Whatever follows the panel glides along with it instead of jumping. Content that
// must not be clipped while it grows (a shadow) needs room inside the panel.
const twContentStyles = defineStyles({
  geometry: "h-(--collapsible-panel-height) overflow-hidden",
  interaction: "transition-[height] duration-300 ease-out data-ending-style:duration-200",
  state: "data-ending-style:h-0 data-starting-style:h-0",
  motion: "motion-reduce:transition-none",
});

// By default it also fades in and out as it grows. Panels holding frosted glass skip the fade: while an ancestor is
// translucent the browser gives backdrop-filter nothing to blur, so the glass would show as a thin, unblurred film
// until the fade ended.
const twFadeStyles = defineStyles({
  interaction: "transition-[height,opacity]",
  state: "data-ending-style:opacity-0 data-starting-style:opacity-0",
});

/*===== Class Composition =====*/

const collapsibleContentClasses = joinStyles(twContentStyles);
const collapsibleFadeClasses = joinStyles(twFadeStyles);

export { collapsibleContentClasses, collapsibleFadeClasses };
