import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ComponentProps,
  type KeyboardEvent,
} from "react";

import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";

import { Button } from "../button/button";
import { useDirection } from "../direction/direction";
import {
  carouselArrowIconClasses,
  carouselClasses,
  carouselItemClasses,
  carouselNextClasses,
  carouselPreviousClasses,
  carouselTrackClasses,
  carouselViewportClasses,
} from "./carousel.styles";

/*===== Types =====*/

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

/*===== Context =====*/

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

/*===== Carousel =====*/

/**
 * shadcn's Embla carousel, made to follow the page's direction: in Persian the slides run right to left (Embla's
 * `direction`, from the `DirectionProvider` unless `opts` sets it), and the arrow keys move the way they point, so
 * ArrowLeft is "next" there.
 */
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: ComponentProps<"section"> & CarouselProps) {
  const direction = useDirection();
  const [carouselRef, api] = useEmblaCarousel(
    { direction, ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins,
  );
  // Read from Embla as it moves, rather than copied into state: nothing to resync when it re-initialises. Before
  // hydration neither way can scroll, so the arrows render disabled.
  const subscribe = useCallback(
    (notify: () => void) => {
      if (!api) return () => {};
      api.on("select", notify).on("reInit", notify);
      return () => {
        api.off("select", notify).off("reInit", notify);
      };
    },
    [api],
  );
  const canScrollPrev = useSyncExternalStore(
    subscribe,
    () => api?.canScrollPrev() ?? false,
    () => false,
  );
  const canScrollNext = useSyncExternalStore(
    subscribe,
    () => api?.canScrollNext() ?? false,
    () => false,
  );

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const rtl = (opts?.direction ?? direction) === "rtl";
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const back = rtl ? "ArrowRight" : "ArrowLeft";
      const forward = rtl ? "ArrowLeft" : "ArrowRight";
      if (event.key === back) {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === forward) {
        event.preventDefault();
        scrollNext();
      }
    },
    [rtl, scrollPrev, scrollNext],
  );

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  return (
    <CarouselContext.Provider
      value={{ carouselRef, api, opts, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
    >
      <section
        onKeyDownCapture={handleKeyDown}
        className={cn(carouselClasses, className)}
        aria-roledescription={m.common_carousel()}
        data-slot="carousel"
        data-orientation={orientation}
        {...props}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className={carouselViewportClasses} data-slot="carousel-content">
      <div data-orientation={orientation} className={cn(carouselTrackClasses, className)} {...props} />
    </div>
  );
}

function CarouselItem({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      // The carousel pattern (WAI-ARIA APG): each slide is a group described as a slide; a fieldset would be a form's.
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="group"
      aria-roledescription={m.common_slide()}
      data-slot="carousel-item"
      className={cn(carouselItemClasses, className)}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "tool-outline",
  size = "icon-sm",
  ...props
}: ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(carouselPreviousClasses, className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon className={carouselArrowIconClasses} />
      <span className="sr-only">{m.common_previous_slide()}</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "tool-outline",
  size = "icon-sm",
  ...props
}: ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(carouselNextClasses, className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon className={carouselArrowIconClasses} />
      <span className="sr-only">{m.common_next_slide()}</span>
    </Button>
  );
}

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel };
