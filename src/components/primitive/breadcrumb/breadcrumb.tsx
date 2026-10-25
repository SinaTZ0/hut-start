import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronLeftIcon, MoreHorizontalIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import {
  breadcrumbEllipsisClasses,
  breadcrumbItemClasses,
  breadcrumbLinkClasses,
  breadcrumbListClasses,
  breadcrumbPageClasses,
  breadcrumbSeparatorClasses,
} from "./breadcrumb.styles";

/*===== Breadcrumb =====*/

function Breadcrumb({ className, ...props }: ComponentProps<"nav">) {
  return <nav aria-label={m.common_breadcrumb()} data-slot="breadcrumb" className={cn(className)} {...props} />;
}

/*===== Compound Parts =====*/

function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return <ol data-slot="breadcrumb-list" className={cn(breadcrumbListClasses, className)} {...props} />;
}

function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={cn(breadcrumbItemClasses, className)} {...props} />;
}

/** A step back up the trail. Render it as the app's link: `render={<SiteLink href="/" />}`. */
function BreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">({ className: cn(breadcrumbLinkClasses, className) }, props),
    render,
    state: { slot: "breadcrumb-link" },
  });
}

function BreadcrumbPage({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      // shadcn's pattern: the current page reads as a link that goes nowhere, so the trail is a run of links.
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(breadcrumbPageClasses, className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbSeparatorClasses, className)}
      {...props}
    >
      {children ?? <ChevronLeftIcon />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbEllipsisClasses, className)}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">{m.common_more()}</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
