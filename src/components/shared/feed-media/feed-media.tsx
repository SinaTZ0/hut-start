import { useEffect, useRef, useState, type ReactNode } from "react";
import { CardMedia, CardMediaBackdrop } from "#/components/primitive/card/card";

/*===== Fit =====*/

// The most of an image its frame may cut off before it's shown whole instead: a photo a little wider or taller than
// its frame still fills it, and a poster loses no more than a sliver of its margin.
const MAX_CROP = 0.1;

/** Whether the frame would cut more than `MAX_CROP` of the loaded image; `undefined` until both have a size. */
function fitFor(img: HTMLImageElement): "cover" | "contain" | undefined {
  const frame = img.parentElement;
  if (!img.naturalWidth || !frame?.clientHeight) return undefined;
  const ratio = img.naturalWidth / img.naturalHeight / (frame.clientWidth / frame.clientHeight);
  return 1 - Math.min(ratio, 1 / ratio) <= MAX_CROP ? "cover" : "contain";
}

/*===== Feed Media =====*/

/**
 * A feed image in its card's frame, never cut where it matters. Many of the old site's images are posters with text to
 * their edges, and nothing tells them from photos, so each is shown whole over a blurred copy of itself; once it has
 * loaded, an image whose shape nearly matches the frame fills it instead. The frame's shape changes with the layout,
 * so the choice is made again whenever the frame resizes. Before hydration every image is whole.
 */
export function FeedMedia({
  src,
  frame,
  className,
  children,
}: {
  src: string;
  frame?: "bleed" | "inset";
  className?: string;
  children?: ReactNode;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [fit, setFit] = useState<"cover" | "contain">("contain");

  // Fires once on observe, which catches an image that loaded before hydration; `onLoad` catches the rest.
  useEffect(() => {
    const img = imgRef.current;
    if (!img?.parentElement) return;
    const observer = new ResizeObserver(() => setFit((current) => fitFor(img) ?? current));
    observer.observe(img.parentElement);
    return () => observer.disconnect();
  }, []);

  return (
    <CardMedia fit={fit} frame={frame} className={className}>
      {/* Hotlinked from the old site; no referrer, so its server never sees where it's shown. */}
      {fit === "contain" && <CardMediaBackdrop src={src} loading="lazy" referrerPolicy="no-referrer" />}
      <img
        ref={imgRef}
        src={src}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={(event) => {
          const next = fitFor(event.currentTarget);
          if (next) setFit(next);
        }}
      />
      {children}
    </CardMedia>
  );
}
