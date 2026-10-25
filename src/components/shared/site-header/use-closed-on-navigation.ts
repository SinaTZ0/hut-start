import { useLocation } from "@tanstack/react-router";
import { useState } from "react";

/*===== Closed On Navigation =====*/

/**
 * A menu's open state that falls back to `closed` whenever the page changes. The header's menus stay mounted across
 * in-app navigations, so following one of their links would otherwise leave the menu open over the new page.
 */
export function useClosedOnNavigation<T>(closed: T) {
  const href = useLocation({ select: (location) => location.href });
  const [state, setState] = useState(closed);
  const [lastHref, setLastHref] = useState(href);

  // Reset during render rather than in an effect, so the new page never paints with the menu still open.
  if (href !== lastHref) {
    setLastHref(href);
    setState(closed);
  }

  return [state, setState] as const;
}
