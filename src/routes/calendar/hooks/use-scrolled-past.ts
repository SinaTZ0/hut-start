import { type RefObject, useEffect, useState } from "react";

/*===== Scrolled Past =====*/

// The desktop header stays on screen over the page's top (`lg:h-19`, 76px), so an element under it is already out of
// sight. On phones the header scrolls away and this only brings the answer forward a little.
const HIDDEN_TOP = "-80px 0px 0px 0px";

/**
 * Whether an element has scrolled up out of sight, for a bar that takes over from it while the reader is further down.
 * False until the browser has measured, so the server's render and the first one in the browser agree, and false
 * whenever `enabled` is.
 */
export function useScrolledPast({ ref, enabled }: { ref: RefObject<HTMLElement | null>; enabled: boolean }): boolean {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsPast(!entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0)),
      { rootMargin: HIDDEN_TOP },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, enabled]);

  return enabled && isPast;
}
