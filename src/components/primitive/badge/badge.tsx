import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { type VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils";
import { badgeVariants } from "./badge.styles";

/*===== Badge =====*/

/** A short pill label, or with `size="wrap"` a longer one that wraps. Render it as a link with the `render` prop; the hover wash applies to anchors only. */
function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">({ className: cn(badgeVariants({ variant, size }), className) }, props),
    render,
    state: { slot: "badge", variant, size },
  });
}

export { Badge };
