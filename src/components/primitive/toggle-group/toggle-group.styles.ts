import { defineStyles, joinStyles } from "../styles";

/*===== Toggle Group Styles =====*/

const twToggleGroupStyles = defineStyles({
  layout: "group/toggle-group flex flex-wrap items-center gap-2 data-vertical:flex-col data-vertical:items-stretch",
});

const toggleGroupClasses = joinStyles(twToggleGroupStyles);

export { toggleGroupClasses };
