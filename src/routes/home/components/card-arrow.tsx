import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";

import { cn } from "#/lib/utils";

/*===== Card Arrow =====*/

/**
 * The round arrow at a link card's end: a quiet `accent` disc that fills pine while its card is hovered or focused.
 * `external` for a card that leaves the site; the forward arrow flips with the text direction.
 */
export function CardArrow({ icon = "forward", className }: { icon?: "forward" | "external"; className?: string }) {
  const Icon = icon === "external" ? ExternalLinkIcon : ArrowLeftIcon;

  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full bg-accent text-heading transition-colors duration-200 motion-reduce:transition-none [a:focus-visible_&]:bg-primary [a:focus-visible_&]:text-primary-foreground [a:hover_&]:bg-primary [a:hover_&]:text-primary-foreground",
        className,
      )}
    >
      <Icon className={cn("size-4", icon === "forward" && "ltr:-scale-x-100")} />
    </span>
  );
}
