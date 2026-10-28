import { LinkIcon, PrinterIcon, Share2Icon } from "lucide-react";

import { Button } from "#/components/primitive/button/button";
import { toast } from "#/components/primitive/toast/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "#/components/primitive/tooltip/tooltip";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";

/*===== Actions =====*/

async function copyLink() {
  await navigator.clipboard.writeText(window.location.href);
  toast.add({ title: m.article_link_copied(), type: "success" });
}

/** Shares through the system's sheet where there is one (phones), else copies the link. */
async function share(title: string) {
  if (!navigator.share) return copyLink();
  try {
    await navigator.share({ title, url: window.location.href });
  } catch {
    // Closing the sheet rejects too; there's nothing to report.
  }
}

/*===== Article Actions =====*/

/** The article's round tools: share, copy its link, print it (the page's print styles leave the site's chrome out). */
export function ArticleActions({ title, className }: { title: string; className?: string }) {
  const tools = [
    { label: m.article_share(), icon: Share2Icon, run: () => void share(title) },
    { label: m.article_copy_link(), icon: LinkIcon, run: () => void copyLink() },
    { label: m.article_print(), icon: PrinterIcon, run: () => window.print() },
  ];

  return (
    <div className={cn("flex gap-1.5 print:hidden", className)}>
      {tools.map(({ label, icon: Icon, run }) => (
        <Tooltip key={label}>
          <TooltipTrigger render={<Button variant="tool-outline" size="icon-sm" aria-label={label} onClick={run} />}>
            <Icon />
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
