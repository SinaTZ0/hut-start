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

/*===== Action =====*/

// The site's forms, where a row's button says the visitor fills something in rather than reads.
const FORM_PATHS = new Set(["/feedback", "/consultation"]);

/** What pressing a row does, by where it goes: write an email, fill in a form, visit another site, or view a page. */
export function actionOf(href: string): string {
  if (href.startsWith("mailto:")) return m.link_row_email();
  if (FORM_PATHS.has(href)) return m.link_row_form();
  return hostOf(href) ? m.link_row_visit() : m.link_row_view();
}

/*===== Link Row =====*/

/**
 * A link as one row of a list of links (`ItemGroup variant="strips"`): its icon or its number, its name and what a
 * person does there, the address it opens, so a visitor sees they're leaving this site, and, from `md` up, a button
 * saying what pressing it does (a phone keeps today's bare icon) («مشاهده», «ورود به سایت»; `action` names it when the destination alone can't, a machine's
 * «مشخصات»). `internalOnly` systems say they need the campus network. The whole row is the link; the button only
 * makes it look pressable. Rows replace the old grids of link tiles, and the few links that matter more get their own
 * place beside them (an office's systems desk).
 */
export function LinkRow({
  href,
  title,
  description,
  icon: Icon,
  number,
  internalOnly = false,
  action,
}: {
  href: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** A step's or an entry's number, shown in the icon's place. */
  number?: number;
  internalOnly?: boolean;
  /** The button's label, when the destination's kind doesn't say it. */
  action?: string;
}) {
  const host = hostOf(href);
  const Arrow = host ? ExternalLinkIcon : ArrowLeftIcon;

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
        <ItemActions variant="pill">
          <span data-slot="item-action-label">{action ?? actionOf(href)}</span>
          <Arrow aria-hidden data-icon={host ? "external" : "forward"} />
        </ItemActions>
      </Item>
    </li>
  );
}
