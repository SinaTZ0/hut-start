import type { LucideIcon } from "lucide-react";

import { Card, CardArrow, CardContent, CardDescription, CardTitle } from "#/components/primitive/card/card";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { m } from "#/paraglide/messages";

/*===== Link Tile =====*/

/** Where an outside link lands, as a person reads it: `golestan.hut.ac.ir`. */
function hostOf(href: string): string | null {
  if (!href.startsWith("http")) return null;
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * A system, a payment gateway or an office's tool as one card: its icon, name and what a person does there, and the
 * address it opens, so a visitor sees they're leaving this site. `internalOnly` systems say they need the campus
 * network.
 */
export function LinkTile({
  href,
  title,
  description,
  icon: Icon,
  internalOnly = false,
}: {
  href: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  internalOnly?: boolean;
}) {
  const host = hostOf(href);

  return (
    <Card render={<SiteLink href={href} />} size="sm" className="h-full">
      <CardContent>
        <div className="flex items-start gap-4">
          {Icon && (
            <Icon aria-hidden className="box-content size-5.5 shrink-0 rounded-sm bg-accent p-2.5 text-brand-text" />
          )}
          {/* Centred so a title alone lines up with the arrow; with a description it is the tallest item anyway. */}
          <div className="flex min-w-0 flex-1 flex-col gap-1 self-center">
            <CardTitle>
              <h3>{title}</h3>
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
            {(host || internalOnly) && (
              <p className="mt-1 flex flex-wrap gap-x-3 text-caption text-muted-foreground">
                {host && (
                  <span dir="ltr" className="font-mono">
                    {host}
                  </span>
                )}
                {internalOnly && <span>{m.nav_internal_only()}</span>}
              </p>
            )}
          </div>
          <CardArrow external={host !== null} className="self-center" />
        </div>
      </CardContent>
    </Card>
  );
}
