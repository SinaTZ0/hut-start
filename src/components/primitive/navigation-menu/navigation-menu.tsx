import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import { cn } from "#/lib/utils";
import {
  navigationMenuContentClasses,
  navigationMenuIndicatorArrowClasses,
  navigationMenuIndicatorClasses,
  navigationMenuItemClasses,
  navigationMenuLinkClasses,
  navigationMenuListClasses,
  navigationMenuPopupClasses,
  navigationMenuPositionerClasses,
  navigationMenuRootClasses,
  navigationMenuTriggerClasses,
  navigationMenuTriggerIconClasses,
  navigationMenuTriggerStyle,
  navigationMenuViewportClasses,
} from "./navigation-menu.styles";

/*===== Navigation Menu =====*/

/**
 * A `<nav>` of triggers and links. Triggers open on hover (after `delay`) as well as on click and keyboard, and every
 * section's content shows in one shared popup, rendered here, that follows the open trigger and resizes to fit.
 */
function NavigationMenu({
  align = "start",
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props & Pick<NavigationMenuPrimitive.Positioner.Props, "align">) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn(navigationMenuRootClasses, className)}
      {...props}
    >
      {children}
      <NavigationMenuPositioner align={align} />
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({ className, ...props }: ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(navigationMenuListClasses, className)}
      {...props}
    />
  );
}

function NavigationMenuItem({ className, ...props }: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn(navigationMenuItemClasses, className)}
      {...props}
    />
  );
}

/*===== Trigger =====*/

function NavigationMenuTrigger({ className, children, ...props }: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerClasses, className)}
      {...props}
    >
      {children}
      <ChevronDownIcon aria-hidden className={navigationMenuTriggerIconClasses} />
    </NavigationMenuPrimitive.Trigger>
  );
}

/*===== Content =====*/

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(navigationMenuContentClasses, className)}
      {...props}
    />
  );
}

/**
 * The shared popup and its viewport. The 16px `sideOffset` drops the card just under the header bar; the positioner
 * bridges that gap for the pointer (see `navigation-menu.styles.ts`). It slides along the bar instead of flipping.
 */
function NavigationMenuPositioner({
  className,
  side = "bottom",
  sideOffset = 16,
  align = "start",
  alignOffset = 0,
  collisionPadding = 16,
  collisionAvoidance = { side: "none" },
  ...props
}: NavigationMenuPrimitive.Positioner.Props) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
        collisionAvoidance={collisionAvoidance}
        className={cn(navigationMenuPositionerClasses, className)}
        {...props}
      >
        <NavigationMenuPrimitive.Popup className={navigationMenuPopupClasses}>
          <NavigationMenuPrimitive.Viewport className={navigationMenuViewportClasses} />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}

/*===== Link =====*/

/** A link in the menu. Inside content it's a panel row; beside the triggers, give it `navigationMenuTriggerStyle()`. */
function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(navigationMenuLinkClasses, className)}
      {...props}
    />
  );
}

function NavigationMenuIndicator({ className, ...props }: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-indicator"
      className={cn(navigationMenuIndicatorClasses, className)}
      {...props}
    >
      <div className={navigationMenuIndicatorArrowClasses} />
    </NavigationMenuPrimitive.Icon>
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
};
