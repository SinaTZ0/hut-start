import type { ArticleBlock, ArticleBody, ArticleInline } from "#/orpc/home-feed/article-body";
import type { FeedCategory } from "#/orpc/home-feed/constants";
import { m } from "#/paraglide/messages";

/*===== Labels =====*/

/** The same names the home page's kickers use. */
export const CATEGORY_LABELS: Record<FeedCategory, () => string> = {
  university: m.home_category_university,
  education: m.home_category_education,
  graduate: m.home_category_graduate,
  industry: m.home_category_industry,
  student: m.home_category_student,
  growth: m.home_category_growth,
  openEducation: m.home_category_open_education,
};

/*===== Reading Time =====*/
// Persian prose reads at about 200 words a minute.
const WORDS_PER_MINUTE = 200;

function inlineText(nodes: ArticleInline[] | undefined): string {
  return (nodes ?? []).map((node) => (node.type === "text" ? node.text : " ")).join("");
}

function blockText(block: ArticleBlock): string {
  switch (block.type) {
    case "paragraph":
    case "heading":
      return inlineText(block.content);
    case "bulletList":
    case "orderedList":
      return block.content.map((item) => item.content.map((p) => inlineText(p.content)).join(" ")).join(" ");
    case "table":
      return block.content
        .flatMap((row) => row.content.flatMap((cell) => cell.content.map((p) => inlineText(p.content))))
        .join(" ");
    default:
      return "";
  }
}

/** Whole minutes to read the lead and the body, at least one. */
export function readingMinutes({ summary, body }: { summary: string | null; body: ArticleBody }): number {
  const text = [summary ?? "", ...body.content.map(blockText)].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/*===== File Size =====*/

/** A file's size in kilobytes, or in megabytes to one decimal from a megabyte up. */
export function fileSizeLabel(bytes: number): string {
  if (bytes >= 1_000_000) return m.article_file_size_mb({ size: Math.round(bytes / 100_000) / 10 });
  return m.article_file_size_kb({ size: Math.max(1, Math.round(bytes / 1000)) });
}
