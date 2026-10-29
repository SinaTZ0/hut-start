import { ArrowLeftIcon, ExternalLinkIcon, type LucideIcon } from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "#/components/primitive/item/item";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatNumber } from "#/lib/locale";
import { m } from "#/paraglide/messages";

/*===== Host =====*/

/** Where an outside link lands, as a person reads it: `golestan.hut.ac.ir`. `null` for a page of this site. */
export function hostOf(href: string): string | null {
  if (!href.startsWith("http")) return null;
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/*===== Link Row =====*/

/**
 * A link as one row of a ruled list (`ItemGroup variant="ruled"` or `"index"`): its icon or its number, its name and
 * what a person does there, and the address it opens, so a visitor sees they're leaving this site. `internalOnly`
 * systems say they need the campus network. Rows replace the old grids of link tiles: a list reads down a page, and
 * the few links that matter more get their own place beside it (an office's systems desk).
 */
export function LinkRow({
  href,
  title,
  description,
  icon: Icon,
  number,
  internalOnly = false,
}: {
  href: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** A step's or an entry's number, shown in the icon's place. */
  number?: number;
  internalOnly?: boolean;
}) {
  const host = hostOf(href);

  return (
    <li>
      <Item render={<SiteLink href={href} />} className="h-full">
        {Icon ? (
          <ItemMedia>
            <Icon />
          </ItemMedia>
        ) : (
          number !== undefined && <ItemMedia variant="number">{formatNumber(number)}</ItemMedia>
        )}
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          {/* The text reads in its own direction (a machine's English model on the Persian page) but keeps the row's
              alignment, so the column's edge stays straight. */}
          {description && (
            <ItemDescription>
              <bdi>{description}</bdi>
            </ItemDescription>
          )}
          {(host || internalOnly) && (
            <p className="flex flex-wrap gap-x-3 text-caption text-muted-foreground">
              {host && (
                <span dir="ltr" className="font-mono">
                  {host}
                </span>
              )}
              {internalOnly && <span>{m.nav_internal_only()}</span>}
            </p>
          )}
        </ItemContent>
        <ItemActions>
          {host ? <ExternalLinkIcon data-icon="external" /> : <ArrowLeftIcon data-icon="forward" />}
        </ItemActions>
      </Item>
    </li>
  );
}
