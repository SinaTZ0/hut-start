import { cn } from "#/lib/utils";

/*===== Logo Mark =====*/

/**
 * The university emblem in `currentColor`: pine on light grounds, white on bands. Decorative (`aria-hidden`), because
 * it always sits beside the visible university name. Size it with `size-*`.
 */
export function LogoMark({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block size-8 shrink-0 mask-logo", className)} />;
}
