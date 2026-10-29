import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { type VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils";
import { toggleVariants } from "./toggle.styles";

/*===== Toggle =====*/

/** A button that stays pressed. Inside a `ToggleGroup` it takes the group's variant and size. */
function Toggle({
  className,
  variant = "chip",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive data-slot="toggle" className={cn(toggleVariants({ variant, size }), className)} {...props} />;
}

export { Toggle };
