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
  kicker: ReactNode;
  title: ReactNode;
  /** One line of context under the title. */
  lede?: ReactNode;
  /** The section's "see all" link, at the far end. */
  more?: { label: ReactNode; href: string };
  className?: string;
};

/**
 * A section's heading block: a gold dash and kicker, the `h2`, an optional lede, and the "see all" link at the far
 * end. `tone="band"` is for sections on a pine band.
 */
export function SectionHead({ id, kicker, title, lede, more, tone, className }: SectionHeadProps) {
  return (
    <div data-slot="section-head" className={cn(sectionHeadVariants({ tone }), className)}>
      <div>
        <p data-slot="section-kicker" className={sectionKickerClasses}>
          {kicker}
        </p>
        <h2 id={id} data-slot="section-title" className={sectionTitleClasses}>
          {title}
        </h2>
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
