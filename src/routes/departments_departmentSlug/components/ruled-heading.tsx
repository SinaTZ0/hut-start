import { cn } from "#/lib/utils";
import { sectionNumber } from "../content";

/*===== Ruled Heading =====*/

/**
 * A section's heading as a draughtsman sets it: its number in gold, the title, and a rule with ticks running to the
 * far end. `tone="band"` is for a section on a pine band.
 */
export function RuledHeading({
  id,
  number,
  title,
  tone = "default",
}: {
  /** The heading's `id`, for the section's `aria-labelledby`. */
  id: string;
  number: number;
  title: string;
  tone?: "default" | "band";
}) {
  const band = tone === "band";

  return (
    <div className="flex items-end gap-4 sm:gap-5">
      <span aria-hidden className={cn("pb-1 text-kicker font-bold", band ? "text-highlight" : "text-highlight-text")}>
        {sectionNumber(number)}
      </span>
      <h2 id={id} className={cn("text-h1", band && "text-on-band")}>
        {title}
      </h2>
      <span
        aria-hidden
        className={cn("mb-3 h-3 min-w-8 flex-1 ruler", band ? "text-band-line-strong" : "text-border-strong")}
      />
    </div>
  );
}
