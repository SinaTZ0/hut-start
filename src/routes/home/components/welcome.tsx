import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  FileTextIcon,
  type LucideIcon,
  MessagesSquareIcon,
  SchoolIcon,
} from "lucide-react";

import { buttonVariants } from "#/components/primitive/button/button.styles";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "#/components/primitive/item/item";
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
      <ItemGroup variant="divided" className="grid auto-rows-fr">
        {HELP.map((help) => (
          <li key={help.href}>
            <Item size="lg" render={<SiteLink href={help.href} />}>
              <ItemMedia variant="icon">
                <help.icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{help.title()}</ItemTitle>
                <ItemDescription>{help.description()}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ExternalLinkIcon data-icon="external" />
              </ItemActions>
            </Item>
          </li>
        ))}
      </ItemGroup>
    </section>
  );
}
