import type { ReactNode } from "react";

import { SiteLink } from "#/components/shared/site-link/site-link";
import type { ArticleInline as ArticleInlineNode } from "#/orpc/home-feed/article-body";

/*===== Text =====*/

/** The plain text of a run of inline nodes, a line break as a space. */
export function inlineText(nodes: ArticleInlineNode[] | undefined): string {
  return (nodes ?? []).map((node) => (node.type === "text" ? node.text : " ")).join("");
}

/*===== Article Inline =====*/

/**
 * A paragraph's text with its marks: bold, and links. A link's text may be an address in Latin letters inside Persian
 * prose, so it's isolated in its own direction.
 */
export function ArticleInline({ nodes }: { nodes: ArticleInlineNode[] | undefined }) {
  return (nodes ?? []).map((node, index) => {
    if (node.type === "hardBreak") return <br key={index} />;

    let content: ReactNode = node.text;
    for (const mark of node.marks ?? []) {
      if (mark.type === "bold") content = <strong className="font-extrabold text-heading">{content}</strong>;
      if (mark.type === "link") {
        content = (
          <SiteLink
            href={mark.attrs.href}
            dir="auto"
            className="text-brand-text underline decoration-brand-text/40 underline-offset-4 transition-colors duration-200 hover:decoration-brand-text motion-reduce:transition-none"
          >
            {content}
          </SiteLink>
        );
      }
    }
    return <span key={index}>{content}</span>;
  });
}
