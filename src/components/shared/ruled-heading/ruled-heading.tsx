import type { ReactNode } from "react";

import { formatNumber } from "#/lib/locale";
import { cn } from "#/lib/utils";

/*===== Section Number =====*/

/** A section's number before its heading, «۰۱». */
export function sectionNumber(value: number): string {
  return formatNumber(value, { minimumIntegerDigits: 2 });
}

/*===== Ruled Heading =====*/

/**
 * A section's heading as a draughtsman sets it: its number in gold, the title, and a rule with ticks running to the
 * far end, or to `action` (a «همه …» link) when there is one. `tone="band"` is for a section on a pine band.
 */
export function RuledHeading({
  id,
  number,
  title,
  action,
  tone = "default",
  className,
}: {
  /** The heading's `id`, for the section's `aria-labelledby`. */
  id: string;
  /** Left out on a page whose sections aren't a sequence. */
  number?: number;
  title: string;
  action?: ReactNode;
  tone?: "default" | "band";
  className?: string;
}) {
  const band = tone === "band";

  return (
    <div className={cn("flex items-end gap-4 sm:gap-5", className)}>
      {number !== undefined && (
        <span aria-hidden className={cn("pb-1 text-kicker font-bold", band ? "text-highlight" : "text-highlight-text")}>
          {sectionNumber(number)}
        </span>
      )}
      <h2 id={id} className={cn("text-h1", band && "text-on-band")}>
        {title}
      </h2>
      <span
        aria-hidden
        className={cn("mb-3 h-3 min-w-8 flex-1 ruler", band ? "text-band-line-strong" : "text-border-strong")}
      />
      {action && <div className="mb-2 shrink-0">{action}</div>}
    </div>
  );
}
