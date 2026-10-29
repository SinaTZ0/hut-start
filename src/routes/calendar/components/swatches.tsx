import type { EventKind } from "#/lib/university/semester";
import { cn } from "#/lib/utils";
import { KIND_CLASSES } from "../days";

/*===== Swatches =====*/
// Small squares drawn the way the grid draws a day, so the legend and the date list point at the days.

/** A kind's square: a date day in small. */
export function KindSwatch({ kind, className }: { kind: EventKind; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-4 shrink-0 rounded-xs day-tint", KIND_CLASSES[kind], className)}
    />
  );
}

/** The ring today's day wears in the grid. */
export function TodaySwatch() {
  return (
    <span
      aria-hidden
      className="inline-block size-3.5 shrink-0 rounded-xs outline-2 outline-offset-1 outline-heading"
    />
  );
}
