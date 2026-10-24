import { type RefObject, useEffect } from "react";

/*===== Dismiss =====*/

/**
 * Calls `onDismiss` while `active` when the pointer goes down outside `ref`, or when Escape is pressed. Escape also
 * returns focus to the element inside `ref` that opened it (`[aria-expanded=true]`), so keyboard users don't lose
 * their place.
 */
export function useDismiss(ref: RefObject<HTMLElement | null>, active: boolean, onDismiss: () => void) {
  useEffect(() => {
    if (!active) return;

    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onDismiss();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      ref.current?.querySelector<HTMLElement>("[aria-expanded=true]")?.focus();
      onDismiss();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [ref, active, onDismiss]);
}
