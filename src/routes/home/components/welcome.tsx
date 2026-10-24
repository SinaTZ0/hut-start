import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  FileTextIcon,
  type LucideIcon,
  MessagesSquareIcon,
  SchoolIcon,
} from "lucide-react";

import { buttonVariants } from "#/components/primitive/button/button.styles";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { SUGGESTIONS_LINK } from "#/lib/university/navigation";
import { SERVICES } from "#/lib/university/services";
import { m } from "#/paraglide/messages";
import { DEPARTMENTS_HREF } from "../content";

/*===== Constants =====*/

const NEW_STUDENTS = SERVICES.find((service) => service.id === "new-students");
const COUNSELING = SERVICES.find((service) => service.id === "counseling");

type HelpLink = { title: () => string; description: () => string; href: string; icon: LucideIcon };

const HELP: HelpLink[] = [
  {
    title: m.home_help_voice,
    description: m.home_help_voice_description,
    href: SUGGESTIONS_LINK.href,
    icon: FileTextIcon,
  },
  ...(COUNSELING
    ? [
        {
          title: m.home_help_counseling,
          description: () =>
            m.home_help_counseling_description({ service: COUNSELING.title(), description: COUNSELING.description() }),
          href: COUNSELING.href,
          icon: MessagesSquareIcon,
        },
      ]
    : []),
];

/*===== Welcome =====*/

/** The closing split card: a welcome for new students on pine, and two ways to reach the university beside it. */
export function Welcome() {
  return (
    <section
      aria-labelledby="home-welcome"
      className="grid grid-cols-1 overflow-hidden rounded-lg border bg-muted lg:grid-cols-2"
    >
      {/*===== Welcome =====*/}
      <div className="relative isolate overflow-hidden bg-band px-5 py-8 text-on-band sm:p-10">
        <SectionHead
          tone="band"
          id="home-welcome"
          kicker={m.home_welcome_kicker()}
          title={m.home_welcome_title()}
          lede={m.home_welcome_lede()}
          className="mb-0"
        />
        <div className="mt-10 flex flex-wrap gap-3">
          {NEW_STUDENTS && (
            <SiteLink href={NEW_STUDENTS.href} className={buttonVariants({ variant: "highlight", size: "lg" })}>
              {NEW_STUDENTS.title()}
              <ArrowLeftIcon data-icon="inline-end" className="ltr:-scale-x-100" />
            </SiteLink>
          )}
          <SiteLink href={DEPARTMENTS_HREF} className={buttonVariants({ variant: "outline-band", size: "lg" })}>
            {m.nav_education_departments()}
            <ExternalLinkIcon data-icon="inline-end" className="size-4" />
          </SiteLink>
        </div>
        <SchoolIcon
          aria-hidden
          className="absolute end-6 -bottom-10 -z-10 size-45 -rotate-12 stroke-1 text-band-decor"
        />
      </div>

      {/*===== Help =====*/}
      <ul className="grid auto-rows-fr">
        {HELP.map((help) => (
          <li key={help.href} className="not-first:border-t">
            <SiteLink
              href={help.href}
              className="group/help flex h-full items-center gap-4 px-5 py-6 transition-colors duration-200 hover:bg-accent focus-visible:-outline-offset-4 motion-reduce:transition-none sm:px-10 sm:py-7"
            >
              <span
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-sm border bg-card text-brand-text"
              >
                <help.icon className="size-5.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-title text-heading underline-offset-4 group-hover/help:text-brand-text group-hover/help:underline">
                  {help.title()}
                </span>
                <span className="block text-caption text-muted-foreground">{help.description()}</span>
              </span>
              <ExternalLinkIcon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
            </SiteLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
