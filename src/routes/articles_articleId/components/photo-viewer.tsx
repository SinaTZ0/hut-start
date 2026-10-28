import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "#/components/primitive/carousel/carousel";
import { Dialog, DialogContent, DialogTitle } from "#/components/primitive/dialog/dialog";
import type { Article } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";

/*===== Photos =====*/

type Photo = { src: string; alt: string };

/** Every photo the page shows, in reading order: the cover, the body's photos, then its photo sets. */
function articlePhotos(article: Article): Photo[] {
  const photos: Photo[] = article.cover ? [{ src: article.cover.src, alt: "" }] : [];
  for (const block of article.body.content) {
    if (block.type === "image") photos.push({ src: block.attrs.src, alt: block.attrs.alt });
    if (block.type === "gallery") photos.push(...block.attrs.images);
  }
  // A photo shown twice (in the body and again in the set) is one stop in the viewer.
  return [...new Map(photos.map((photo) => [photo.src, photo])).values()];
}

/*===== Context =====*/

const PhotoViewerContext = createContext<((src: string) => void) | null>(null);

/** Opens the page's photo viewer at the photo with this `src`. */
export function useOpenPhoto() {
  const open = useContext(PhotoViewerContext);
  if (!open) throw new Error("useOpenPhoto must be used within a <PhotoViewerProvider />");
  return open;
}

/*===== Viewer =====*/

/**
 * One viewer for every photo on an article's page: a full-screen dialog with a carousel, opened at the photo clicked
 * and stepping through all the others. Photos are shown whole on a dark ground: the media team's posters carry text
 * to their edges.
 */
export function PhotoViewerProvider({ article, children }: { article: Article; children: ReactNode }) {
  const photos = useMemo(() => articlePhotos(article), [article]);
  const [start, setStart] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);

  const open = useCallback(
    (src: string) => {
      const index = Math.max(
        0,
        photos.findIndex((photo) => photo.src === src),
      );
      setCurrent(index);
      setStart(index);
    },
    [photos],
  );

  const trackSelection = useCallback((api: CarouselApi) => {
    api?.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, []);

  return (
    <PhotoViewerContext.Provider value={open}>
      {children}
      <Dialog open={start !== null} onOpenChange={(next) => !next && setStart(null)}>
        <DialogContent size="fullscreen" className="flex flex-col">
          <div className="flex h-18 shrink-0 items-center px-6">
            <DialogTitle className="sr-only">{m.article_viewer_title()}</DialogTitle>
            <p aria-live="polite" className="text-body-sm text-on-band-soft tabular-nums">
              {m.article_photo_position({ index: current + 1, count: photos.length })}
            </p>
          </div>
          {start !== null && (
            <Carousel
              opts={{ startIndex: start }}
              setApi={trackSelection}
              className="min-h-0 flex-1 *:data-[slot=carousel-content]:h-full"
            >
              <CarouselContent className="h-full">
                {photos.map((photo) => (
                  <CarouselItem key={photo.src} className="flex items-center justify-center">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full rounded-xs object-contain"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {photos.length > 1 && (
                <div className="absolute inset-x-0 -bottom-18 flex h-18 items-center justify-center gap-3">
                  <CarouselPrevious variant="tool-glass" className="static my-0 translate-none" />
                  <CarouselNext variant="tool-glass" className="static my-0 translate-none" />
                </div>
              )}
            </Carousel>
          )}
          <div aria-hidden className="h-18 shrink-0" />
        </DialogContent>
      </Dialog>
    </PhotoViewerContext.Provider>
  );
}
