import { Link } from "@tanstack/react-router";
import { LogOutIcon, NotebookTextIcon, UserIcon } from "lucide-react";

import { Button } from "#/components/primitive/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/primitive/dropdown-menu/dropdown-menu";
import { useSignOut } from "#/hooks/use-sign-out";
import type { Viewer } from "#/orpc/session/contract";
import { m } from "#/paraglide/messages";

/*===== Account Menu =====*/

export type AccountMenuProps = {
  viewer: Viewer;
  /** `tool`: the header's round icon button. `tab`: a phone tab bar item, labelled, with the menu opening above it. */
  variant?: "tool" | "tab";
};

/** The signed-in viewer's menu: who they are, their notes, and signing out. */
export function AccountMenu({ viewer, variant = "tool" }: AccountMenuProps) {
  const signOut = useSignOut();

  return (
    <DropdownMenu>
      {variant === "tab" ? (
        <DropdownMenuTrigger render={<Button variant="tab" size="tab" />}>
          <UserIcon />
          {m.nav_account()}
        </DropdownMenuTrigger>
      ) : (
        <DropdownMenuTrigger render={<Button variant="tool" size="icon-sm" aria-label={m.nav_account()} />}>
          <UserIcon />
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent
        side={variant === "tab" ? "top" : "bottom"}
        align={variant === "tab" ? "center" : "end"}
        className="min-w-56"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="block text-foreground">{viewer.name}</span>
            <span dir="ltr" className="block text-start">
              {viewer.email}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link to="/notes" />}>
          <NotebookTextIcon />
          {m.nav_notes()}
        </DropdownMenuItem>
        <DropdownMenuItem disabled={signOut.isPending} onClick={() => signOut.mutate()}>
          <LogOutIcon />
          {m.nav_sign_out()}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
