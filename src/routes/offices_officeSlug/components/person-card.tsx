import { FileUserIcon, type LucideIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";

import { buttonVariants } from "#/components/primitive/button/button.styles";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardKicker,
  CardMedia,
  CardTitle,
} from "#/components/primitive/card/card";
import { MediaImage } from "#/components/shared/media-image/media-image";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { ItemGroup } from "#/components/primitive/item/item";
import { formatDigits } from "#/lib/university/phone";
import { cn } from "#/lib/utils";
import type { OfficeMember } from "#/orpc/office/contract";
import { m } from "#/paraglide/messages";
import { personName, RANK_LABELS } from "#/lib/university/people";

/*===== Person Lines =====*/

type Contact = { href: string; label: string; icon: LucideIcon };

/** What a card or a row says about someone: their name, role line, detail line and the ways to reach them. */
function personLines(member: OfficeMember, kicker?: string) {
  const name = personName(member);
  const contacts: Contact[] = [
    ...(member.phone ? [{ href: `tel:${member.phone}`, label: m.office_call({ name }), icon: PhoneIcon }] : []),
    ...(member.email ? [{ href: `mailto:${member.email}`, label: m.office_email({ name }), icon: MailIcon }] : []),
    ...(member.resumeUrl ? [{ href: member.resumeUrl, label: m.office_resume({ name }), icon: FileUserIcon }] : []),
  ];
  const rank = member.rank ? RANK_LABELS[member.rank]() : undefined;
  // A former head is placed by their years: the term heads the row, then rank and degree under the name.
  if (member.role === "former" && member.term) {
    const term = formatDigits(member.term.replace("-", "–"));
    const detail = [rank, member.degree].filter(Boolean).join(" · ");
    return { name, contacts, role: kicker ?? term, detail };
  }
  const role = kicker ?? member.jobTitle ?? rank;
  const detail = member.degree;
  return { name, contacts, role, detail };
}

/** A person's photo, or a figure when there is none; size the frame. */
function Photo({ member, className }: { member: OfficeMember; className?: string }) {
  return member.photo ? (
    <MediaImage media={member.photo} variant="thumb" alt="" className={cn("object-top", className)} />
  ) : (
    <span className={cn("grid place-items-center bg-muted text-muted-foreground", className)}>
      <UserIcon aria-hidden className="size-7" />
    </span>
  );
}

/*===== Person Card =====*/

/**
 * The office's head beside its intro, as a compact card: photo, role, name, degree, then a round button for each way
 * to reach them. `kicker` replaces the role line (the head's card says «مدیر»).
 */
export function PersonCard({ member, kicker }: { member: OfficeMember; kicker?: string }) {
  const { name, contacts, role, detail } = personLines(member, kicker);

  return (
    <Card size="sm" orientation="horizontal" className="h-full flex-row">
      <CardMedia className="w-24 shrink-0">
        <Photo member={member} className="size-full" />
      </CardMedia>
      <CardBody>
        <CardHeader>
          {role && (
            <CardKicker>
              <span>{role}</span>
            </CardKicker>
          )}
          <CardTitle>
            <h3>{name}</h3>
          </CardTitle>
          {detail && <CardDescription>{detail}</CardDescription>}
        </CardHeader>
        {contacts.length > 0 && (
          <CardFooter className="justify-start">
            <ContactButtons contacts={contacts} variant="outline" />
          </CardFooter>
        )}
      </CardBody>
    </Card>
  );
}

/*===== People Roster =====*/

/**
 * An office's staff, or the president's office's former presidents, as a roster: ruled rows in columns, each a small
 * portrait, the role over the name, the degree or term, and quiet buttons to call, write or read a résumé. A roster
 * reads down like the office's own staff list, where a grid of cards made every person a separate box.
 */
export function PeopleRoster({ members, ordered = false }: { members: OfficeMember[]; ordered?: boolean }) {
  return (
    <ItemGroup variant="index-wide" ordered={ordered}>
      {members.map((member) => (
        <li key={member.id}>
          <PersonRow member={member} />
        </li>
      ))}
    </ItemGroup>
  );
}

function PersonRow({ member }: { member: OfficeMember }) {
  const { name, contacts, role, detail } = personLines(member);

  return (
    <div className="flex h-full items-start gap-4 py-5">
      <Photo member={member} className="aspect-portrait w-16 shrink-0 overflow-hidden rounded-sm" />
      <div className="grid min-w-0 flex-1 gap-0.5">
        {role && <p className="text-caption font-bold text-brand-text">{role}</p>}
        <h3 className="text-title text-heading">{name}</h3>
        {detail && <p className="text-caption text-muted-foreground">{detail}</p>}
        {contacts.length > 0 && (
          <div className="-ms-2 mt-1 flex">
            <ContactButtons contacts={contacts} variant="ghost" />
          </div>
        )}
      </div>
    </div>
  );
}

/*===== Contacts =====*/

function ContactButtons({ contacts, variant }: { contacts: Contact[]; variant: "outline" | "ghost" }) {
  return contacts.map((contact) => (
    <SiteLink
      key={contact.href}
      href={contact.href}
      title={contact.label}
      className={buttonVariants({ variant, size: "icon-sm" })}
    >
      <contact.icon aria-hidden className="size-4" />
      <span className="sr-only">{contact.label}</span>
    </SiteLink>
  ));
}
