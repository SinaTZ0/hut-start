import { cn } from "#/lib/utils";

/*===== Arc =====*/

/** A shallow arc hanging under a band, lowest at the centre. `deep` is the hero's pine, `band` the glance band's. Drawn
 * in a 1000×100 box and stretched to the width. */
export function Arc({ tone = "deep" }: { tone?: "deep" | "band" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      className={cn("-mt-px block h-arc w-full", tone === "deep" ? "fill-band-deep" : "fill-band")}
    >
      <path d="M0,0 H1000 Q500,200 0,0Z" />
    </svg>
  );
}
