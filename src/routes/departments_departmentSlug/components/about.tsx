import { PhoneIcon } from "lucide-react";
import type { ReactNode } from "react";

import { buttonVariants } from "#/components/primitive/button/button.styles";
import { Card, CardContent, CardFooter, CardHeader, CardKicker } from "#/components/primitive/card/card";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "#/components/primitive/item/item";
import { MediaImage } from "#/components/shared/media-image/media-image";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatDate } from "#/lib/locale";
import { cn } from "#/lib/utils";
import type { Department, DepartmentMember } from "#/orpc/department/contract";
import { m } from "#/paraglide/messages";
import { formatPhone, isoToDate, memberName, RANK_LABELS } from "../content";
import { RuledHeading } from "./ruled-heading";

/*===== About =====*/

/** The department in its own words, its history as a timeline, and who to reach: the head and the office. */
export function About({ department }: { department: Department }) {
  const tracks = department.fields.flatMap((field) => field.tracks);

  return (
    <section
      id="department-about"
      aria-labelledby="department-about-title"
      className="mx-auto max-w-site scroll-mt-6 px-gutter py-section"
    >
      <RuledHeading id="department-about-title" number={1} title={m.department_about_title()} />

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        {/*===== Story =====*/}
        <div className="lg:col-span-7">
          {department.quote && (
            <blockquote className="border-s-2 border-highlight ps-6 text-h3 text-heading">
              {department.quote}
            </blockquote>
          )}
          <div className="mt-10 flex flex-col gap-6 text-body-lg text-muted-foreground">
            {department.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/*------ Timeline ------*/}
          {/* Each step draws the line to the next, so the line spans the dots however many there are. With no
              history to tell, "today" alone would be a lone dot repeating the hero's figures, so it's left out. */}
          {department.milestones.length > 0 && (
            <ol aria-label={m.department_timeline_label()} className="mt-12 grid auto-cols-fr grid-flow-col">
              {department.milestones.map((milestone) => (
                <Milestone
                  key={milestone.on}
                  when={<time dateTime={milestone.on}>{formatDate(isoToDate(milestone.on), { year: "numeric" })}</time>}
                  label={milestone.label}
                />
              ))}
              <Milestone
                current
                when={m.department_timeline_today()}
                label={
                  tracks.length > 0
                    ? m.department_timeline_now({
                        bsc: tracks.filter((track) => track.degree === "bsc").length,
                        msc: tracks.filter((track) => track.degree === "msc").length,
                      })
                    : m.department_timeline_now_faculty({ count: department.faculty.length })
                }
              />
            </ol>
          )}
        </div>

        {/*===== Contacts =====*/}
        <aside className="flex flex-col gap-5 lg:col-span-5 lg:ps-8">
          {department.head && <HeadCard head={department.head} />}
          {department.staff.map((member) => (
            <Item key={member.id} variant="outline">
              <ItemMedia variant="icon">
                <PhoneIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{memberName(member)}</ItemTitle>
                <ItemDescription>
                  {member.jobTitle}
                  {member.phone && (
                    <>
                      {" · "}
                      <a href={`tel:${member.phone}`} dir="ltr" className="underline-offset-4 hover:underline">
                        {formatPhone(member.phone)}
                      </a>
                    </>
                  )}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </aside>
      </div>
    </section>
  );
}

/*===== Milestone =====*/

function Milestone({ when, label, current = false }: { when: ReactNode; label: string; current?: boolean }) {
  return (
    <li className="relative flex flex-col items-center px-2 text-center after:absolute after:start-1/2 after:top-2 after:h-px after:w-full after:bg-border-strong last:after:hidden">
      <span
        aria-hidden
        className={cn(
          "relative size-4 rounded-full border-2 border-highlight",
          current ? "bg-highlight ring-4 ring-highlight/25" : "bg-background",
        )}
      />
      <strong className="mt-3 text-h4 text-heading">{when}</strong>
      <span className="mt-1 text-body-sm text-muted-foreground">{label}</span>
    </li>
  );
}

/*===== Head of Department =====*/

function HeadCard({ head }: { head: DepartmentMember }) {
  const name = memberName(head);

  return (
    <Card size="lg">
      <CardHeader>
        <CardKicker>{m.department_head()}</CardKicker>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-5">
          {head.photo && (
            <MediaImage media={head.photo} variant="md" alt="" className="aspect-portrait w-22 shrink-0 rounded-sm" />
          )}
          <div>
            <h3 className="text-h3">{name}</h3>
            {head.rank && <p className="mt-1 text-muted-foreground">{RANK_LABELS[head.rank]()}</p>}
          </div>
        </div>
      </CardContent>

      {/* Some departments publish none of these for their head; an empty list would leave a lone rule. */}
      {(head.phone || head.email || head.office) && (
        <CardContent>
          <dl className="border-t text-body-sm *:flex *:items-center *:justify-between *:gap-4 *:py-3 *:not-first:border-t">
            {head.phone && (
              <div>
                <dt className="text-muted-foreground">{m.department_phone()}</dt>
                <dd>
                  <a href={`tel:${head.phone}`} dir="ltr" className="font-semibold underline-offset-4 hover:underline">
                    {formatPhone(head.phone)}
                  </a>
                </dd>
              </div>
            )}
            {head.email && (
              <div>
                <dt className="text-muted-foreground">{m.department_email()}</dt>
                <dd className="min-w-0">
                  <a
                    href={`mailto:${head.email}`}
                    dir="ltr"
                    className="block truncate font-semibold underline-offset-4 hover:underline"
                  >
                    {head.email}
                  </a>
                </dd>
              </div>
            )}
            {head.office && (
              <div>
                <dt className="text-muted-foreground">{m.department_office()}</dt>
                <dd className="font-semibold">{head.office}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      )}

      {(head.homepageUrl || head.scholarUrl) && (
        <CardFooter className="justify-start">
          {head.homepageUrl && (
            <SiteLink href={head.homepageUrl} className={buttonVariants({ size: "sm" })}>
              {m.department_homepage()}
            </SiteLink>
          )}
          {head.scholarUrl && (
            <SiteLink href={head.scholarUrl} className={buttonVariants({ variant: "outline", size: "sm" })}>
              {m.department_publications()}
            </SiteLink>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
