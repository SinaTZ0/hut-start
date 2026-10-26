import { ArrowLeftIcon, ExternalLinkIcon, FileTextIcon, type LucideIcon, MessagesSquareIcon } from "lucide-react";
import type { CSSProperties } from "react";

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
import { HOME_DRAWINGS } from "#/lib/university/drawings";
import { DEPARTMENTS_HREF, SUGGESTIONS_LINK } from "#/lib/university/navigation";
import { SERVICES } from "#/lib/university/services";
import { m } from "#/paraglide/messages";

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

/** The closing split card: a welcome for new students on pine, over a drawing of a book, dividers and an iwan, and two
 * ways to reach the university beside it. */
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
        {/* Small, in the far corner: the panel is short, and the drawing stays clear of the lede and the buttons. Its
            subject keeps to its start-bottom corner, so English mirrors it. */}
        <div
          aria-hidden
          style={{ "--art": `url("${HOME_DRAWINGS.welcome}")` } as CSSProperties}
          className="pointer-events-none absolute end-0 bottom-0 -z-10 aspect-720/666 w-28 mask-art text-art-band sm:w-36 lg:w-40 ltr:-scale-x-100"
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
                <ArrowLeftIcon data-icon="forward" />
              </ItemActions>
            </Item>
          </li>
        ))}
      </ItemGroup>
    </section>
  );
}
