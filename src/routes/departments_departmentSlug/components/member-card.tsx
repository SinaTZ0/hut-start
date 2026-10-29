import { GraduationCapIcon, HouseIcon, type LucideIcon, MailIcon, PhoneIcon } from "lucide-react";

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
import type { DepartmentMember } from "#/orpc/department/contract";
import { m } from "#/paraglide/messages";
import { memberName } from "../content";
import { RANK_LABELS } from "#/lib/university/people";

/*===== Member Card =====*/

/**
 * A faculty member as a compact row: photo, rank, name and office, then a round button for each way to reach them.
 * Stays a row on phones, where a stacked 4:5 photo would fill the screen.
 */
export function MemberCard({ member, isHead }: { member: DepartmentMember; isHead: boolean }) {
  const name = memberName(member);
  const contacts: { href: string; label: string; icon: LucideIcon }[] = [
    ...(member.phone
      ? [{ href: `tel:${member.phone}`, label: m.department_member_phone({ name }), icon: PhoneIcon }]
      : []),
    ...(member.email
      ? [{ href: `mailto:${member.email}`, label: m.department_member_email({ name }), icon: MailIcon }]
      : []),
    ...(member.homepageUrl
      ? [{ href: member.homepageUrl, label: m.department_member_homepage({ name }), icon: HouseIcon }]
      : []),
    ...(member.scholarUrl
      ? [{ href: member.scholarUrl, label: m.department_member_scholar({ name }), icon: GraduationCapIcon }]
      : []),
  ];

  return (
    <Card size="sm" orientation="horizontal" className="h-full flex-row">
      <CardMedia className="w-24 shrink-0">
        {member.photo && <MediaImage media={member.photo} variant="thumb" alt="" className="size-full object-top" />}
      </CardMedia>
      <CardBody>
        <CardHeader>
          <CardKicker>
            {member.rank && <span>{RANK_LABELS[member.rank]()}</span>}
            {isHead && <span>{m.department_head()}</span>}
          </CardKicker>
          <CardTitle>
            <h3>{name}</h3>
          </CardTitle>
          {member.office && <CardDescription>{member.office}</CardDescription>}
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
