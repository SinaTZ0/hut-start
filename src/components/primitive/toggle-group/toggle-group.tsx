import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";

import { toggleVariants } from "#/components/primitive/toggle/toggle.styles";
import { cn } from "#/lib/utils";
import { toggleGroupClasses } from "./toggle-group.styles";

/*===== Toggle Group =====*/

type ToggleGroupContextValue = VariantProps<typeof toggleVariants> & { orientation?: "horizontal" | "vertical" };

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  variant: "chip",
  size: "default",
  orientation: "horizontal",
});

/**
 * A set of toggles, one pressed at a time unless `multiple`. Its items take the group's variant and size; the chip row
 * wraps onto more lines instead of scrolling, so every filter stays in view.
 */
function ToggleGroup({
  className,
  variant = "chip",
  size = "default",
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props & ToggleGroupContextValue) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-orientation={orientation}
      orientation={orientation}
      className={cn(toggleGroupClasses, className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, orientation }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const context = useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant ?? variant}
      data-size={context.size ?? size}
      className={cn(toggleVariants({ variant: context.variant ?? variant, size: context.size ?? size }), className)}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
