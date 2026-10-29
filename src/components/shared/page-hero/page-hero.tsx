import { Fragment, type CSSProperties, type ReactNode } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/primitive/breadcrumb/breadcrumb";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";

/*===== Page Hero =====*/

export type Crumb = { label: string; href?: string };

/**
 * A plain page's head: the trail from the home page, the title and lede, and whatever helps a visitor start (a search
 * field, filter chips, the main number), over the page's notebook drawing at the end side.
 */
export function PageHero({
  id,
  crumbs,
  title,
  lede,
  drawing,
  aside,
  children,
  className,
}: {
  /** The title's `id`, for the section's `aria-labelledby`. */
  id: string;
  /** The trail after «خانه»; the last one is this page. */
  crumbs: Crumb[];
  title: string;
  lede?: string;
  /** A transparent WebP drawing (`public/images/…`). */
  drawing?: string;
  /** Beside the title on wide screens, under it on phones: a contact card, the main number. */
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn("relative isolate overflow-hidden", className)}>
      {/*===== Drawing =====*/}
      {/* Fainter on phones, where the title runs over it. */}
      {drawing && (
        <div
          aria-hidden
          style={{ "--art": `url("${drawing}")` } as CSSProperties}
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-art-page art-page opacity-60 md:opacity-100 ltr:-scale-x-100"
        />
      )}

      <div className="mx-auto max-w-site px-gutter pt-8 pb-12 md:pt-14 md:pb-16">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<SiteLink href="/" />}>{m.nav_tab_home()}</BreadcrumbLink>
            </BreadcrumbItem>
            {crumbs.map((crumb, index) => (
              <Fragment key={crumb.label}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {crumb.href && index < crumbs.length - 1 ? (
                    <BreadcrumbLink render={<SiteLink href={crumb.href} />}>{crumb.label}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/*===== Title =====*/}
        <div className={cn("mt-8 md:mt-12", aside && "grid gap-8 lg:grid-cols-12 lg:items-end")}>
          <div className={cn("max-w-3xl", aside && "lg:col-span-7")}>
            <h1 id={id} className="text-display">
              {title}
            </h1>
            {lede && <p className="mt-4 max-w-2xl text-lede text-muted-foreground">{lede}</p>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>

        {children && <div className="mt-8 flex max-w-3xl flex-col gap-4">{children}</div>}
      </div>
    </section>
  );
}
