import { useSyncExternalStore } from "react";

/*===== Scrolled =====*/

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * Whether the page is scrolled away from the top: the sticky header then turns compact. `false` on the server and
 * during hydration, so a page restored mid-scroll switches right after.
 */
export function useScrolled(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > 0,
    () => false,
  );
}
