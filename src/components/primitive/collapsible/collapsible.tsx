import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cn } from "#/lib/utils";
import { collapsibleContentClasses, collapsibleFadeClasses } from "./collapsible.styles";

/*===== Collapsible =====*/

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

/*===== Compound Parts =====*/

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />;
}

/**
 * The panel; it slides open and shut (see `collapsible.styles.ts`), and unmounts once it has closed. `fade: false`
 * keeps it opaque while it moves, for panels holding frosted glass.
 */
function CollapsibleContent({
  className,
  fade = true,
  ...props
}: CollapsiblePrimitive.Panel.Props & { fade?: boolean }) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn(collapsibleContentClasses, fade && collapsibleFadeClasses, className)}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
