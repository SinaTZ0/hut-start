import type { ArticleAttachment, ArticleBlock, ArticleImage } from "#/orpc/home-feed/article-body";
import type { Article } from "#/orpc/home-feed/contract";
import { m } from "#/paraglide/messages";
import { ArticleAttachments } from "./article-attachments";
import { ArticleFigure } from "./article-figure";
import { ArticleGallery } from "./article-gallery";
import { ArticleInline } from "./article-inline";
import { ArticleTable } from "./article-table";

/*===== Grouping =====*/
// Photos in a row show as pairs, and files in a row as one list under one label.

type Group =
  | { type: "images"; items: ArticleImage[] }
  | { type: "files"; items: ArticleAttachment[] }
  | Exclude<ArticleBlock, ArticleImage | ArticleAttachment>;

function grouped(blocks: ArticleBlock[]): Group[] {
  const out: Group[] = [];
  for (const block of blocks) {
    const last = out.at(-1);
    if (block.type === "image") {
      if (last?.type === "images") last.items.push(block);
      else out.push({ type: "images", items: [block] });
    } else if (block.type === "attachment") {
      if (last?.type === "files") last.items.push(block);
      else out.push({ type: "files", items: [block] });
    } else out.push(block);
  }
  return out;
}

/** Splits photos into rows of two, a last odd one on its own. */
function rowsOfTwo<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += 2) rows.push(items.slice(index, index + 2));
  return rows;
}

/*===== Blocks =====*/

function Block({ block }: { block: Group }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          <ArticleInline nodes={block.content} />
        </p>
      );
    case "heading": {
      const Heading = block.attrs.level === 2 ? "h2" : "h3";
      return (
        <Heading
          className={
            block.attrs.level === 2 ? "mt-5 text-h4 text-heading" : "mt-3 text-prose font-extrabold text-heading"
          }
        >
          <ArticleInline nodes={block.content} />
        </Heading>
      );
    }
    case "bulletList":
    case "orderedList": {
      const List = block.type === "bulletList" ? "ul" : "ol";
      return (
        <List
          className={`grid gap-2.5 ps-5.5 marker:text-highlight-text ${block.type === "bulletList" ? "list-disc" : "list-decimal"}`}
        >
          {block.content.map((item, index) => (
            <li key={index} className="text-justify hyphens-auto">
              {item.content.map((paragraph, at) => (
                <ArticleInline key={at} nodes={paragraph.content} />
              ))}
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return <ArticleTable table={block} />;
    case "images":
      return rowsOfTwo(block.items).map((row) =>
        row.length === 1 && row[0] ? (
          <ArticleFigure key={row[0].attrs.src} image={row[0].attrs} />
        ) : (
          <div key={row[0]?.attrs.src} className="grid grid-cols-2 items-start gap-2 sm:gap-3">
            {row.map((image) => (
              <ArticleFigure key={image.attrs.src} image={image.attrs} paired />
            ))}
          </div>
        ),
      );
    case "files":
      return <ArticleAttachments files={block.items} />;
    case "gallery":
      return <ArticleGallery images={block.attrs.images} />;
  }
}

/*===== Article Body =====*/

/**
 * The article's body, from its Tiptap JSON, in one reading column. It's Persian on the English page too (the old site
 * has no translations), so it's marked as such and keeps its own direction. The sign-off closes it.
 */
export function ArticleBody({ article }: { article: Article }) {
  return (
    <div dir="rtl" lang="fa" className="mt-2 grid gap-5 text-prose text-foreground">
      {grouped(article.body.content).map((block, index) => (
        <Block key={index} block={block} />
      ))}
      {article.source && (
        <p dir="auto" className="text-body-sm text-muted-foreground">
          {m.article_source({ source: article.source })}
        </p>
      )}
    </div>
  );
}
