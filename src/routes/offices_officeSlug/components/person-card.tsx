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
import { formatDigits } from "#/lib/university/phone";
import type { OfficeMember } from "#/orpc/office/contract";
import { m } from "#/paraglide/messages";
import { personName, RANK_LABELS } from "#/lib/university/people";

/*===== Person Card =====*/

/**
 * Someone on an office's page as a compact row: photo, role, name, degree or term, then a round button for each way
 * to reach them. `kicker` replaces the role line (the head's card says «مدیر»).
 */
export function PersonCard({ member, kicker }: { member: OfficeMember; kicker?: string }) {
  const name = personName(member);
  const contacts: { href: string; label: string; icon: LucideIcon }[] = [
    ...(member.phone ? [{ href: `tel:${member.phone}`, label: m.office_call({ name }), icon: PhoneIcon }] : []),
    ...(member.email ? [{ href: `mailto:${member.email}`, label: m.office_email({ name }), icon: MailIcon }] : []),
    ...(member.resumeUrl ? [{ href: member.resumeUrl, label: m.office_resume({ name }), icon: FileUserIcon }] : []),
  ];
  const role = kicker ?? member.jobTitle ?? (member.rank ? RANK_LABELS[member.rank]() : undefined);
  // A former head's line: their years, then rank and degree.
  const detail =
    member.role === "former"
      ? [
          member.term && formatDigits(member.term.replace("-", "–")),
          member.rank && RANK_LABELS[member.rank](),
          member.degree,
        ]
          .filter(Boolean)
          .join(" · ")
      : member.degree;

  return (
    <Card size="sm" orientation="horizontal" className="h-full flex-row">
      <CardMedia className="w-24 shrink-0">
        {member.photo ? (
          <MediaImage media={member.photo} variant="thumb" alt="" className="size-full object-top" />
        ) : (
          <span className="grid size-full place-items-center text-muted-foreground">
            <UserIcon aria-hidden className="size-8" />
          </span>
        )}
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
            {contacts.map((contact) => (
              <SiteLink
                key={contact.href}
                href={contact.href}
                title={contact.label}
                className={buttonVariants({ variant: "outline", size: "icon-sm" })}
              >
                <contact.icon aria-hidden className="size-4" />
                <span className="sr-only">{contact.label}</span>
              </SiteLink>
            ))}
          </CardFooter>
        )}
      </CardBody>
    </Card>
  );
}
