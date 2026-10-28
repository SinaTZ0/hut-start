import { defineStyles, joinStyles } from "../styles";

/*===== Carousel =====*/

const twCarouselStyles = defineStyles({
  layout: "group/carousel relative",
});

// The viewport clips the track; the track pulls back by the slides' gap so the first slide sits flush with the edge.
const twViewportStyles = defineStyles({
  layout: "overflow-hidden",
});

const twTrackStyles = defineStyles({
  layout:
    "flex data-[orientation=horizontal]:-ms-4 data-[orientation=vertical]:-mt-4 data-[orientation=vertical]:flex-col",
});

const twItemStyles = defineStyles({
  layout: "min-w-0 shrink-0 grow-0 basis-full",
  geometry: "group-data-[orientation=horizontal]/carousel:ps-4 group-data-[orientation=vertical]/carousel:pt-4",
});

// The arrows sit outside the slides by default; a layout that places them elsewhere passes its own position.
const twArrowStyles = defineStyles({
  layout: "absolute touch-manipulation",
});

const twPreviousStyles = defineStyles({
  layout:
    "group-data-[orientation=horizontal]/carousel:inset-y-0 group-data-[orientation=horizontal]/carousel:-start-12 group-data-[orientation=horizontal]/carousel:my-auto group-data-[orientation=vertical]/carousel:start-1/2 group-data-[orientation=vertical]/carousel:-top-12 group-data-[orientation=vertical]/carousel:-translate-x-1/2 group-data-[orientation=vertical]/carousel:rotate-90 rtl:group-data-[orientation=vertical]/carousel:translate-x-1/2",
});

const twNextStyles = defineStyles({
  layout:
    "group-data-[orientation=horizontal]/carousel:inset-y-0 group-data-[orientation=horizontal]/carousel:-end-12 group-data-[orientation=horizontal]/carousel:my-auto group-data-[orientation=vertical]/carousel:start-1/2 group-data-[orientation=vertical]/carousel:-bottom-12 group-data-[orientation=vertical]/carousel:-translate-x-1/2 group-data-[orientation=vertical]/carousel:rotate-90 rtl:group-data-[orientation=vertical]/carousel:translate-x-1/2",
});

// The arrow icons point the way the slides move: in a right-to-left carousel "previous" points right.
const twArrowIconStyles = defineStyles({
  layout: "rtl:rotate-180",
});

/*===== Class Composition =====*/

export const carouselClasses = joinStyles(twCarouselStyles);
export const carouselViewportClasses = joinStyles(twViewportStyles);
export const carouselTrackClasses = joinStyles(twTrackStyles);
export const carouselItemClasses = joinStyles(twItemStyles);
export const carouselPreviousClasses = `${joinStyles(twArrowStyles)} ${joinStyles(twPreviousStyles)}`;
export const carouselNextClasses = `${joinStyles(twArrowStyles)} ${joinStyles(twNextStyles)}`;
export const carouselArrowIconClasses = joinStyles(twArrowIconStyles);
