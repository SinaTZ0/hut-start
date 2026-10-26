import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpIcon } from "lucide-react";
import type { CSSProperties } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/primitive/breadcrumb/breadcrumb";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { TextLink } from "#/components/shared/text-link/text-link";
import { formatNumber } from "#/lib/locale";
import { pageMeta } from "#/lib/seo";
import { PRIVACY_DRAWING } from "#/lib/university/drawings";
import { CONTACT_LINK } from "#/lib/university/navigation";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import { STATEMENT_SECTIONS } from "#/routes/privacy/content";

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/privacy")({
  head: (args) => pageMeta({ args, title: m.privacy_title(), description: m.privacy_description() }),
  component: PrivacyPage,
});

/** Two-digit section numbers in gold, as the department pages set them. */
function sectionNumber(value: number): string {
  return formatNumber(value, { minimumIntegerDigits: 2 });
}

/*===== Page =====*/
function PrivacyPage() {
  return (
    <div className="relative isolate mx-auto max-w-site px-gutter pt-8 pb-section md:pt-14">
      {/*===== Drawing =====*/}
      {/* Behind the heading's empty end side, clear of the text. */}
      <div
        aria-hidden
        style={{ "--art": `url("${PRIVACY_DRAWING.src}")` } as CSSProperties}
        className={cn(
          "pointer-events-none absolute end-gutter top-16 -z-10 hidden w-md mask-art text-art-ink lg:block",
          PRIVACY_DRAWING.aspect,
        )}
      />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<SiteLink href="/" />}>{m.nav_tab_home()}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{m.privacy_kicker()}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/*===== Heading =====*/}
      <SectionHead
        as="h1"
        id="privacy-title"
        kicker={m.privacy_kicker()}
        title={m.privacy_title()}
        lede={m.privacy_lede()}
        className="mt-10 max-w-3xl md:mt-14"
      />

      <div className="grid gap-10 lg:grid-cols-4 lg:gap-16">
        {/*===== Contents =====*/}
        <nav aria-labelledby="privacy-toc" className="lg:sticky lg:top-10 lg:self-start">
          <h2 id="privacy-toc" className="text-kicker font-bold text-muted-foreground">
            {m.privacy_toc()}
          </h2>
          <ol className="mt-3 border-s">
            {STATEMENT_SECTIONS.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="-ms-px flex min-h-10 items-baseline gap-3 border-s-2 border-transparent py-2 ps-4 text-body-sm text-muted-foreground transition-colors duration-200 hover:border-highlight hover:text-foreground focus-visible:border-highlight focus-visible:text-foreground motion-reduce:transition-none"
                >
                  <span aria-hidden className="text-kicker font-bold text-highlight-text">
                    {sectionNumber(index + 1)}
                  </span>
                  {section.title()}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/*===== Statement =====*/}
        <article aria-labelledby="privacy-title" className="max-w-3xl lg:col-span-3">
          {STATEMENT_SECTIONS.map((section, index) => (
            <section key={section.id} aria-labelledby={section.id} className="scroll-mt-6 py-10 first:pt-0">
              {/*------ Heading ------*/}
              <div className="flex items-end gap-4 sm:gap-5">
                <span aria-hidden className="pb-1 text-kicker font-bold text-highlight-text">
                  {sectionNumber(index + 1)}
                </span>
                <h2 id={section.id} className="text-h3">
                  {section.title()}
                </h2>
                <span aria-hidden className="mb-2.5 h-3 min-w-8 flex-1 ruler text-border-strong" />
              </div>

              {/*------ Text ------*/}
              <div className="mt-5 space-y-4 text-body-lg">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph()}</p>
                ))}
              </div>

              {section.id === "university-contact" && (
                <TextLink href={CONTACT_LINK.href} className="mt-4">
                  {CONTACT_LINK.label()}
                </TextLink>
              )}
            </section>
          ))}

          <a
            href="#privacy-title"
            className="inline-flex min-h-10 items-center gap-2 text-body-sm text-muted-foreground transition-colors duration-200 hover:text-foreground motion-reduce:transition-none"
          >
            <ArrowUpIcon aria-hidden className="size-4" />
            {m.privacy_back_to_top()}
          </a>
        </article>
      </div>
    </div>
  );
}
