import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { type VariantProps } from "class-variance-authority";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import { cn } from "#/lib/utils";
import type { ComponentProps } from "react";
import {
  cardActionClasses,
  cardArrowClasses,
  cardBodyClasses,
  cardCallClasses,
  cardContentClasses,
  cardDescriptionVariants,
  cardFooterClasses,
  cardHeaderClasses,
  cardKickerClasses,
  cardMediaVariants,
  cardTitleClasses,
  cardVariants,
} from "./card.styles";

/*===== Card =====*/

export type CardProps = useRender.ComponentProps<"div"> & VariantProps<typeof cardVariants>;

/**
 * A styled surface whose parts share the size's spacing.
 * A content card reads, in order: CardMedia, a CardHeader holding CardKicker, CardTitle (and CardDescription), and a
 * CardFooter below a hairline with the date at its start and a CardCall at its end. A compact row (`size="sm"`) ends
 * with a CardArrow alone.
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

/** The category above a title; later children (a date, a separator) are set as muted meta. */
function CardKicker({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="card-kicker" {...props} className={cn(cardKickerClasses, className)} />;
}

/** A card's supporting text. `lines` clamps text that comes from elsewhere and may run long. */
function CardDescription({
  className,
  lines = "all",
  ...props
}: ComponentProps<"div"> & VariantProps<typeof cardDescriptionVariants>) {
  return <div data-slot="card-description" {...props} className={cn(cardDescriptionVariants({ lines }), className)} />;
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

/** The card's last row below a hairline, pinned to the bottom: muted meta and a CardCall, or a card's buttons. */
function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-footer" {...props} className={cn(cardFooterClasses, className)} />;
}

/** A link card's call at the footer's end: the label, then a CardArrow. */
function CardCall({ className, children, external, ...props }: ComponentProps<"span"> & { external?: boolean }) {
  return (
    <span data-slot="card-call" {...props} className={cn(cardCallClasses, className)}>
      {children}
      <CardArrow external={external} />
    </span>
  );
}

/**
 * The round arrow of a link card's call; it fills pine while the card is hovered or focused.
 * `external` for a card that leads to another system rather than more of this site's content.
 */
function CardArrow({ className, external = false, ...props }: ComponentProps<"span"> & { external?: boolean }) {
  const Icon = external ? ExternalLinkIcon : ArrowLeftIcon;

  return (
    <span data-slot="card-arrow" aria-hidden {...props} className={cn(cardArrowClasses, className)}>
      <Icon data-icon={external ? "external" : "forward"} />
    </span>
  );
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

export {
  Card,
  CardMedia,
  CardHeader,
  CardBody,
  CardFooter,
  CardKicker,
  CardTitle,
  CardAction,
  CardArrow,
  CardCall,
  CardDescription,
  CardContent,
};
