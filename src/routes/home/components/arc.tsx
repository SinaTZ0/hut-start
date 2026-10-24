/*===== Arc =====*/

/** A shallow arc hanging under the hero, lowest at the centre, in the hero's deep pine. Drawn in a 1000×100 box and
 * stretched to the width. */
export function Arc() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      className="-mt-px block h-arc w-full fill-band-deep"
    >
      <path d="M0,0 H1000 Q500,200 0,0Z" />
    </svg>
  );
}
