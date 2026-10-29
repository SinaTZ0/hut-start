import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { ItemGroup } from "#/components/primitive/item/item";
import { hostOf, LinkRow } from "#/components/shared/link-row/link-row";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { PAGE_DRAWINGS } from "#/lib/university/drawings";
import { cn } from "#/lib/utils";
import type { Office } from "#/orpc/office/contract";
import { m } from "#/paraglide/messages";
import { LINK_ICONS } from "../content";

type OfficeLink = Office["links"][number];

const HUB_ART = { "--art": `url("${PAGE_DRAWINGS.hub}")` } as CSSProperties;

/*===== Office Tools =====*/

/**
 * An office's systems and links. The links with a description are the systems a person signs in to (Golestan, the
 * online classes); they get the desk, a paper panel with the hub drawing in its corner. The rest are documents and
 * guides, listed as link rows beside it, in one column there. Every office's data splits this way; an office with only one kind shows
 * only that part, and the drawing takes the empty column.
 */
export function OfficeTools({ links }: { links: OfficeLink[] }) {
  const systems = links.filter((link) => link.description);
  const others = links.filter((link) => !link.description);

  if (systems.length === 0) {
    return (
      <ItemGroup variant="strips">
        {others.map((link) => (
          <LinkRow key={link.id} href={link.url} title={link.title} icon={LINK_ICONS[link.icon]} />
        ))}
      </ItemGroup>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-11 lg:gap-12">
      <Part title={m.office_tools_systems()} className="lg:col-span-6">
        <div className="relative overflow-hidden rounded-lg border bg-card px-5 py-1 sm:px-8 sm:py-2">
          {/* With links beside it the drawing sits in the desk's far corner, under the entries' end. */}
          {others.length > 0 && (
            <span
              aria-hidden
              style={HUB_ART}
              className="pointer-events-none absolute -inset-e-8 -bottom-8 size-48 mask-art text-art-ink opacity-60 sm:size-72"
            />
          )}
          <ul className="relative">
            {systems.map((link) => (
              // On a phone the drawing spans the desk, so the last entry leaves it room.
              <li
                key={link.id}
                className={cn("border-t first:border-t-0", others.length > 0 && "last:pb-16 sm:last:pb-0")}
              >
                <SystemEntry link={link} />
              </li>
            ))}
          </ul>
        </div>
      </Part>

      {others.length > 0 ? (
        <Part title={m.office_tools_links()} className="lg:col-span-5">
          <ItemGroup variant="strips" className="lg:grid-cols-1">
            {others.map((link) => (
              <LinkRow key={link.id} href={link.url} title={link.title} icon={LINK_ICONS[link.icon]} />
            ))}
          </ItemGroup>
        </Part>
      ) : (
        <span
          aria-hidden
          style={HUB_ART}
          className="hidden size-full min-h-80 mask-art text-art-ink lg:col-span-5 lg:block"
        />
      )}
    </div>
  );
}

/*===== Parts =====*/

function Part({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <h3 className="text-kicker font-bold text-muted-foreground">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/**
 * One system on the desk, the whole entry a link: its icon chip, name, what a person does there, and «ورود به سامانه»
 * with the address it opens. The text keeps clear of the drawing in the desk's corner.
 */
function SystemEntry({ link }: { link: OfficeLink }) {
  const Icon = LINK_ICONS[link.icon];
  const host = hostOf(link.url);
  const Arrow = host ? ExternalLinkIcon : ArrowLeftIcon;

  return (
    <SiteLink
      href={link.url}
      className="group/system flex items-start gap-4 py-6 focus-visible:outline-offset-4 sm:gap-5"
    >
      <span
        aria-hidden
        className="grid size-11 shrink-0 place-items-center rounded-sm bg-accent text-brand-text transition-colors duration-200 group-hover/system:bg-primary group-hover/system:text-primary-foreground motion-reduce:transition-none"
      >
        <Icon className="size-5.5" />
      </span>
      <span className="grid min-w-0 gap-1 sm:max-w-3/4">
        <span className="text-h4 text-heading transition-colors duration-200 group-hover/system:text-brand-text motion-reduce:transition-none">
          {link.title}
        </span>
        <span dir="auto" className="text-body-sm text-muted-foreground">
          {link.description}
        </span>
        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption">
          <span className="flex items-center gap-1.5 font-bold text-brand-text">
            {m.office_tools_open()}
            {/* An outside system's icon nudges up and out; a page of this site's arrow, forward. */}
            <Arrow
              aria-hidden
              className={cn(
                "size-3.5 transition-transform duration-200 ease-out",
                host
                  ? "motion-safe:group-hover/system:translate-x-0.5 motion-safe:group-hover/system:-translate-y-0.5"
                  : "motion-safe:group-hover/system:-translate-x-0.5 ltr:-scale-x-100 motion-safe:ltr:group-hover/system:translate-x-0.5",
              )}
            />
          </span>
          {host && (
            <span dir="ltr" className="font-mono text-muted-foreground">
              {host}
            </span>
          )}
        </span>
      </span>
    </SiteLink>
  );
}
