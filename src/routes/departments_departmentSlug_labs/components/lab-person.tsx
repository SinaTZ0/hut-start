import { type LucideIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";

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
import { personName } from "#/lib/university/people";
import type { DepartmentMember } from "#/orpc/department/contract";
import { m } from "#/paraglide/messages";

/*===== Lab Person =====*/

/**
 * A lab supervisor or expert as a compact row: photo, their part («سرپرست آزمایشگاه قدرت»), name, what they look after,
 * and a round button for each way to reach them.
 */
export function LabPerson({ member }: { member: DepartmentMember }) {
  const name = personName(member);
  const role = member.labRole === "supervisor" ? m.labs_role_supervisor() : m.labs_role_expert();
  const contacts: { href: string; label: string; icon: LucideIcon }[] = [
    ...(member.phone ? [{ href: `tel:${member.phone}`, label: m.office_call({ name }), icon: PhoneIcon }] : []),
    ...(member.email ? [{ href: `mailto:${member.email}`, label: m.office_email({ name }), icon: MailIcon }] : []),
  ];

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
          <CardKicker>
            <span>{role}</span>
          </CardKicker>
          <CardTitle>
            <h3>{name}</h3>
          </CardTitle>
          {member.labNote && <CardDescription>{member.labNote}</CardDescription>}
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
