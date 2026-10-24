import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { type VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils";
import type { ComponentProps } from "react";
import { Separator } from "#/components/primitive/separator/separator";
import {
  itemActionsClasses,
  itemContentClasses,
  itemDescriptionClasses,
  itemFooterClasses,
  itemGroupVariants,
  itemHeaderClasses,
  itemMediaVariants,
  itemTitleClasses,
  itemVariants,
} from "./item.styles";

/*===== Group =====*/

/**
 * A list of rows joined into one surface. Unlike shadcn's `div role="list"`, it renders a `<ul>`: wrap each Item in
 * an `<li>`, so a row that is a link keeps its link role.
 */
function ItemGroup({ className, variant, ...props }: ComponentProps<"ul"> & VariantProps<typeof itemGroupVariants>) {
  return (
    <ul
      data-slot="item-group"
      data-variant={variant ?? "stack"}
      {...props}
      className={cn(itemGroupVariants({ variant }), className)}
    />
  );
}

function ItemSeparator({ className, ...props }: ComponentProps<typeof Separator>) {
  return <Separator data-slot="item-separator" orientation="horizontal" className={cn("my-2", className)} {...props} />;
}

/*===== Item =====*/

export type ItemProps = useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>;

/**
 * A row of media, text and a trailing action. A row that is a link renders as that link
 * (`render={<SiteLink href="…" />}`) and takes the row hover. `data-size` is kept on the root because the title and
 * description scale from it.
 */
function Item({ className, variant = "default", size = "default", render, ...props }: ItemProps) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-size": size,
        "data-variant": variant,
        className: cn(itemVariants({ variant, size }), className),
      } as ComponentProps<"div">,
      props,
    ),
    render,
    state: { slot: "item", variant, size },
  });
}

/*===== Parts =====*/

function ItemMedia({
  className,
  variant = "default",
  ...props
}: ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      {...props}
      className={cn(itemMediaVariants({ variant }), className)}
    />
  );
}

function ItemContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="item-content" {...props} className={cn(itemContentClasses, className)} />;
}

function ItemTitle({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="item-title" {...props} className={cn(itemTitleClasses, className)} />;
}

function ItemDescription({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="item-description" {...props} className={cn(itemDescriptionClasses, className)} />;
}

/** The trailing icon or controls; an icon here turns `brand-text` while its row is hovered or focused. */
function ItemActions({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="item-actions" {...props} className={cn(itemActionsClasses, className)} />;
}

function ItemHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="item-header" {...props} className={cn(itemHeaderClasses, className)} />;
}

function ItemFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="item-footer" {...props} className={cn(itemFooterClasses, className)} />;
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
