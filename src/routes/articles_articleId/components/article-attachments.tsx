import { DownloadIcon } from "lucide-react";
import { useId } from "react";

import type { ArticleAttachment } from "#/orpc/home-feed/article-body";
import { m } from "#/paraglide/messages";
import { fileSizeLabel } from "../content";

/*===== Article Attachments =====*/

/**
 * A run of files the article links to, under one label: each a card with the file's type on a folded gold tile, its
 * name, its type and size, and a download disc that fills pine on hover. Files are on the old site.
 */
export function ArticleAttachments({ files }: { files: ArticleAttachment[] }) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="grid gap-2">
      <h2 id={headingId} dir="auto" className="text-caption font-bold text-muted-foreground">
        {m.article_attachments()}
      </h2>
      <ul className="grid gap-2">
        {files.map(({ attrs }) => (
          <li key={attrs.href}>
            <a
              href={attrs.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/file flex items-center gap-3.5 rounded-lg border bg-card px-4 py-3 transition-colors duration-200 outline-none hover:border-border-strong hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid motion-reduce:transition-none"
            >
              <span
                aria-hidden
                className="relative grid h-12 w-10 shrink-0 place-items-center rounded-sm bg-highlight-surface text-caption font-extrabold text-highlight-text uppercase"
              >
                {attrs.ext}
              </span>
              <span className="grid min-w-0 flex-1">
                <span className="text-body font-bold text-heading">{attrs.label}</span>
                <span dir="auto" className="text-caption text-muted-foreground">
                  <bdi className="uppercase">{attrs.ext}</bdi>
                  {attrs.size !== null && <> · {fileSizeLabel(attrs.size)}</>}
                </span>
              </span>
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-heading transition-colors duration-200 group-hover/file:bg-band group-hover/file:text-on-band motion-reduce:transition-none"
              >
                <DownloadIcon className="size-4" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
