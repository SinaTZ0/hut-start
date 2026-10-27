import { createCn } from "cn/config";

/**
 * Joins class names and resolves Tailwind conflicts (the last class wins).
 *
 * The merge must know the app's type styles (`--text-<name>` in `src/styles.css`): left unknown, `text-title` reads as
 * a text colour, and `cn("text-title text-heading")` would drop the type style. Keep this list in step with
 * `styles.css`.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "title",
            "stat",
            "stat-sm",
            "lede",
            "body-lg",
            "body",
            "body-sm",
            "caption",
            "kicker",
            "nav",
            "button",
          ],
        },
      ],
    },
  },
});
