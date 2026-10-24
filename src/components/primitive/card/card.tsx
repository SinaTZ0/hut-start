import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { type VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils";
import type { ComponentProps } from "react";
import {
  cardActionClasses,
  cardBodyClasses,
  cardContentClasses,
  cardDescriptionClasses,
  cardFooterClasses,
  cardHeaderClasses,
  cardMediaVariants,
  cardTitleClasses,
  cardVariants,
} from "./card.styles";

/*===== Card =====*/

export type CardProps = useRender.ComponentProps<"div"> & VariantProps<typeof cardVariants>;

/**
 * A styled surface whose parts share the size's spacing.
 * A whole card that is a link renders as that link: `render={<SiteLink href="…" />}`. The link card then gets the
 * card lift, and its CardTitle, CardMedia and any trailing arrow react to the card's hover and keyboard focus.
 * Keep other links and buttons out of a link card. `data-size` is kept on the root because CardTitle scales its text
 * from it.
 */
function Card({ className, size = "default", orientation = "vertical", render, ...props }: CardProps) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-size": size,
        "data-orientation": orientation,
        className: cn(cardVariants({ size, orientation }), className),
      } as ComponentProps<"div">,
      props,
    ),
    render,
    state: { slot: "card", size, orientation },
  });
}

/*===== Compound Parts =====*/

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-header" {...props} className={cn(cardHeaderClasses, className)} />;
}

function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-title" {...props} className={cn(cardTitleClasses, className)} />;
}

function CardDescription({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-description" {...props} className={cn(cardDescriptionClasses, className)} />;
}

function CardAction({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-action" {...props} className={cn(cardActionClasses, className)} />;
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-content" {...props} className={cn(cardContentClasses, className)} />;
}

/** The text column beside the media in a horizontal card (`orientation="horizontal"`). */
function CardBody({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-body" {...props} className={cn(cardBodyClasses, className)} />;
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-footer" {...props} className={cn(cardFooterClasses, className)} />;
}

/*===== Media =====*/

export type CardMediaProps = ComponentProps<"div"> & VariantProps<typeof cardMediaVariants>;

/**
 * The `overflow-hidden` frame for a card's image, flush with the card's top corners when it comes first.
 * Size the frame (`aspect-video`, a width in a row card); the image fills it. Use `fit="top"` or `fit="contain"` for
 * images that contain text, so the poster's own title survives.
 */
function CardMedia({ className, fit, ...props }: CardMediaProps) {
  return <div data-slot="card-media" {...props} className={cn(cardMediaVariants({ fit }), className)} />;
}

export { Card, CardMedia, CardHeader, CardBody, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
