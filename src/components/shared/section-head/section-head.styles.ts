import { cva } from "class-variance-authority";
import { composeStyles, defineStyles, joinStyles } from "#/components/primitive/styles";

/*===== Section Head =====*/

const twSectionHeadStyles = defineStyles({
  layout: "flex flex-wrap items-end justify-between gap-x-10 gap-y-4",
  geometry: "mb-10",
});

// The kicker opens with a short gold dash.
const twKickerStyles = defineStyles({
  layout: "flex items-center gap-2.5",
  typography: "text-kicker",
  geometry: "before:block before:h-1 before:w-4.5 before:rounded-xs",
  appearance: "before:bg-highlight",
});

const twTitleStyles = defineStyles({
  geometry: "mt-2 mb-1",
  typography: "text-h1",
});

const twLedeStyles = defineStyles({
  typography: "text-body-sm",
});

/*===== Tones =====*/

// `band` is for a section head on a pine band: gold kicker, light title and lede.
const twTone = defineStyles({
  default: {
    appearance:
      "**:data-[slot=section-kicker]:text-brand-text **:data-[slot=section-lede]:text-muted-foreground **:data-[slot=section-title]:text-heading",
  },
  band: {
    appearance:
      "**:data-[slot=section-kicker]:text-highlight **:data-[slot=section-lede]:text-on-band-muted **:data-[slot=section-title]:text-on-band",
  },
});

/*===== Class Composition =====*/

const sectionHeadVariants = cva(joinStyles(twSectionHeadStyles), {
  variants: { tone: composeStyles(twTone) },
  defaultVariants: { tone: "default" },
});

const sectionKickerClasses = joinStyles(twKickerStyles);
const sectionTitleClasses = joinStyles(twTitleStyles);
const sectionLedeClasses = joinStyles(twLedeStyles);

export { sectionHeadVariants, sectionKickerClasses, sectionTitleClasses, sectionLedeClasses, twTone };
