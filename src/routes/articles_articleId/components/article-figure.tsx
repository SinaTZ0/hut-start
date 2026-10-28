import type { ArticleImage } from "#/orpc/home-feed/article-body";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import { useOpenPhoto } from "./photo-viewer";

/*===== Shape =====*/
// Taller than this (height over width) is a poster or a scanned page rather than a photo.
const TALL_RATIO = 1.1;

function isTall({ width, height }: ArticleImage["attrs"]): boolean {
  return width !== null && height !== null && height / width > TALL_RATIO;
}

/*===== Article Figure =====*/

/**
 * A photo in the article, never cropped: the media team's banners and posters carry text to their edges. A tall one
 * (a poster, a scanned page) is held to a height on a muted mat; a photo fills the column. Its size, when the crawler
 * measured it, reserves the space before it loads. It opens in the page's viewer.
 *
 * @param paired One of two side by side: tall ones are held lower.
 * @param priority Above the fold (the cover): loaded at once rather than lazily.
 */
export function ArticleFigure({
  image,
  paired = false,
  priority = false,
}: {
  image: ArticleImage["attrs"];
  paired?: boolean;
  priority?: boolean;
}) {
  const openPhoto = useOpenPhoto();
  const tall = isTall(image);

  return (
    <figure className="m-0">
      <button
        type="button"
        aria-label={m.article_photo_open()}
        onClick={() => openPhoto(image.src)}
        className={cn(
          "grid w-full cursor-zoom-in place-items-center overflow-hidden rounded-lg bg-muted outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
          tall && (paired ? "p-2 sm:p-4" : "p-4"),
        )}
      >
        <img
          src={image.src}
          alt={image.alt}
          width={image.width ?? undefined}
          height={image.height ?? undefined}
          loading={priority ? "eager" : "lazy"}
          referrerPolicy="no-referrer"
          className={cn(
            "block h-auto",
            tall
              ? cn("w-auto max-w-full rounded-xs shadow-md", paired ? "max-h-105" : "max-h-120 sm:max-h-140")
              : "w-full",
          )}
        />
      </button>
    </figure>
  );
}
