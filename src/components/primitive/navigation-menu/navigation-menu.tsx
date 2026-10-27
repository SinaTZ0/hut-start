import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import { type ComponentPropsWithRef, createContext, useContext } from "react";

import { cn } from "#/lib/utils";
import {
  navigationMenuContentVariants,
  navigationMenuIndicatorArrowClasses,
  navigationMenuIndicatorClasses,
  navigationMenuItemVariants,
  navigationMenuLinkVariants,
  navigationMenuListVariants,
  navigationMenuPopupVariants,
  navigationMenuPositionerClasses,
  navigationMenuRootClasses,
  type NavigationMenuTone,
  navigationMenuTriggerIconVariants,
  navigationMenuTriggerStyle,
  navigationMenuTriggerVariants,
  navigationMenuViewportClasses,
} from "./navigation-menu.styles";

/*===== Tone =====*/

// Set once on the root; every part, the portalled popup included, reads it from here.
const ToneContext = createContext<NavigationMenuTone>("paper");

/*===== Navigation Menu =====*/

export type NavigationMenuProps = NavigationMenuPrimitive.Root.Props &
  Pick<NavigationMenuPrimitive.Positioner.Props, "align" | "anchor" | "sideOffset" | "collisionPadding"> & {
    /** What the menu sits on (`navigation-menu.styles.ts` → Tones). */
    tone?: NavigationMenuTone;
  };

/**
 * A `<nav>` of triggers and links. Triggers open on hover (after `delay`) as well as on click and keyboard, and every
 * section's content shows in one shared popup, rendered here, that follows the open trigger and resizes to fit. Give
 * it an `anchor` to open under that element instead, such as the whole header bar.
 */
function NavigationMenu({
  align = "start",
  anchor,
  sideOffset,
  collisionPadding,
  tone = "paper",
  className,
  children,
  ...props
}: NavigationMenuProps) {
  return (
    <ToneContext value={tone}>
      <NavigationMenuPrimitive.Root
        data-slot="navigation-menu"
        className={cn(navigationMenuRootClasses, className)}
        {...props}
      >
        {children}
        <NavigationMenuPositioner
          align={align}
          anchor={anchor}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
        />
      </NavigationMenuPrimitive.Root>
    </ToneContext>
  );
}

function NavigationMenuList({ className, ...props }: ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
  const tone = useContext(ToneContext);
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(navigationMenuListVariants({ tone }), className)}
      {...props}
    />
  );
}

function NavigationMenuItem({ className, ...props }: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
  const tone = useContext(ToneContext);
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn(navigationMenuItemVariants({ tone }), className)}
      {...props}
    />
  );
}

/*===== Trigger =====*/

function NavigationMenuTrigger({ className, children, ...props }: NavigationMenuPrimitive.Trigger.Props) {
  const tone = useContext(ToneContext);
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerVariants({ tone }), className)}
      {...props}
    >
      {children}
      <ChevronDownIcon aria-hidden className={navigationMenuTriggerIconVariants({ tone })} />
    </NavigationMenuPrimitive.Trigger>
  );
}

/*===== Content =====*/

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  const tone = useContext(ToneContext);
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(navigationMenuContentVariants({ tone }), className)}
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
  const tone = useContext(ToneContext);
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
        <NavigationMenuPrimitive.Popup className={navigationMenuPopupVariants({ tone })}>
          <NavigationMenuPrimitive.Viewport className={navigationMenuViewportClasses} />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}

/*===== Link =====*/

/** A link in the menu. Inside content it's a panel row; beside the triggers, give it `navigationMenuTriggerStyle()`. */
function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  const tone = useContext(ToneContext);
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(navigationMenuLinkVariants({ tone }), className)}
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

export type { NavigationMenuTone };

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
