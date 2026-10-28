import { ImagesIcon } from "lucide-react";
import { useCallback, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "#/components/primitive/carousel/carousel";
import { m } from "#/paraglide/messages";
import { useOpenPhoto } from "./photo-viewer";

/*===== Article Gallery =====*/

/**
 * The article's photo set as a peek strip: two slides and the edge of a third on a wide column, one and a peek on a
 * phone, so it's plain there are more. Slides are cropped to one landscape shape (a set is the event's photos, not its
 * posters); each opens whole in the page's viewer. It sits in the Persian body on the English page too, so it runs
 * right to left there as well, and its labels (in the page's language) keep their own direction.
 */
export function ArticleGallery({ images }: { images: { src: string; alt: string }[] }) {
  const openPhoto = useOpenPhoto();
  const [current, setCurrent] = useState(0);

  const trackSelection = useCallback((api: CarouselApi) => {
    api?.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, []);

  return (
    <Carousel opts={{ align: "start", direction: "rtl" }} setApi={trackSelection}>
      {/*------ Head ------*/}
      <div className="flex items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-body-sm font-bold text-heading">
          <ImagesIcon aria-hidden className="size-4" />
          <span dir="auto">{m.article_photos({ count: images.length })}</span>
        </h2>
        <div className="inline-flex items-center gap-1.5">
          <span dir="auto" className="min-w-11 text-center text-caption text-muted-foreground tabular-nums">
            {m.article_photo_position({ index: current + 1, count: images.length })}
          </span>
          <CarouselPrevious className="static my-0" />
          <CarouselNext className="static my-0" />
        </div>
      </div>

      {/*------ Strip ------*/}
      <CarouselContent className="mt-3">
        {images.map((image) => (
          <CarouselItem key={image.src} className="basis-5/6 sm:basis-9/20">
            <button
              type="button"
              aria-label={m.article_photo_open()}
              onClick={() => openPhoto(image.src)}
              className="group/slide block w-full cursor-zoom-in overflow-hidden rounded-lg bg-muted outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="block aspect-3/2 w-full object-cover transition-transform duration-300 ease-out group-hover/slide:scale-103 motion-reduce:transition-none"
              />
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
