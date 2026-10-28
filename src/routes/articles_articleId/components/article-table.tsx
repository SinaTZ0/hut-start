import type { ArticleTable as ArticleTableNode } from "#/orpc/home-feed/article-body";
import { ArticleInline, inlineText } from "./article-inline";

/*===== Article Table =====*/

/**
 * A restricted table (a header row, then plain cells) ruled on a wide column. On a narrow one each row becomes a card
 * whose cells are labelled by the header row, so a five-column timetable reads on a phone without scrolling sideways.
 * The labels are hidden from screen readers, which read the table's own headers.
 */
export function ArticleTable({ table }: { table: ArticleTableNode }) {
  const [head, ...rows] = table.content;
  if (!head) return null;
  const labels = head.content.map((cell) => cell.content.map((paragraph) => inlineText(paragraph.content)).join(" "));

  return (
    <div className="@container">
      <table className="w-full border-collapse text-body-sm @max-xl:block @xl:overflow-hidden @xl:rounded-lg @xl:bg-card @xl:ring-1 @xl:ring-border">
        <thead className="@max-xl:sr-only">
          <tr>
            {head.content.map((cell, index) => (
              <th key={index} scope="col" className="bg-muted px-4 py-2.5 text-start font-extrabold text-heading">
                {cell.content.map((paragraph, at) => (
                  <ArticleInline key={at} nodes={paragraph.content} />
                ))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="@max-xl:grid @max-xl:gap-2">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="@max-xl:grid @max-xl:rounded-lg @max-xl:bg-card @max-xl:px-4 @max-xl:py-3 @max-xl:ring-1 @max-xl:ring-border"
            >
              {row.content.map((cell, index) => (
                <td
                  key={index}
                  className="border-t px-4 py-3 align-top first:font-bold first:text-heading @max-xl:border-dashed @max-xl:px-0 @max-xl:py-2 @max-xl:first:border-t-0 @max-xl:first:pt-0 @max-xl:last:pb-0"
                >
                  <span aria-hidden className="block text-caption font-bold text-muted-foreground @xl:hidden">
                    {labels[index]}
                  </span>
                  {cell.content.map((paragraph, at) => (
                    <ArticleInline key={at} nodes={paragraph.content} />
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
