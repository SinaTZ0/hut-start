import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { TextLink } from "#/components/shared/text-link/text-link";
import { cn } from "#/lib/utils";
import {
  sectionHeadVariants,
  sectionKickerClasses,
  sectionLedeClasses,
  sectionTitleClasses,
} from "./section-head.styles";

/*===== Section Head =====*/

export type SectionHeadProps = VariantProps<typeof sectionHeadVariants> & {
  /** The heading's `id`, for the section's `aria-labelledby`. */
  id: string;
  /** `h1` when it heads a page rather than a section of one. The look is the same. */
  as?: "h1" | "h2";
  kicker: ReactNode;
  title: ReactNode;
  /** One line of context under the title. */
  lede?: ReactNode;
  /** The section's "see all" link, at the far end. */
  more?: { label: ReactNode; href: string };
  className?: string;
};

/**
 * A section's heading block: a gold dash and kicker, the heading, an optional lede, and the "see all" link at the far
 * end. `tone="band"` is for sections on a pine band; `as="h1"` makes it a page's heading.
 */
export function SectionHead({ id, as: Heading = "h2", kicker, title, lede, more, tone, className }: SectionHeadProps) {
  return (
    <div data-slot="section-head" className={cn(sectionHeadVariants({ tone }), className)}>
      <div>
        <p data-slot="section-kicker" className={sectionKickerClasses}>
          {kicker}
        </p>
        <Heading id={id} data-slot="section-title" className={sectionTitleClasses}>
          {title}
        </Heading>
        {lede && (
          <p data-slot="section-lede" className={sectionLedeClasses}>
            {lede}
          </p>
        )}
      </div>
      {more && (
        <TextLink href={more.href} tone={tone === "band" ? "highlight" : "default"}>
          {more.label}
        </TextLink>
      )}
    </div>
  );
}
