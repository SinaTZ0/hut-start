import { z } from "zod";

/*===== Article Body =====*/
// An article's body as Tiptap (ProseMirror) JSON, limited to the nodes the article page draws. The CMS's editor will
// write the same shape, so the crawler's imported articles need no migration then. Browser-safe: the contract and the
// article page's renderer use it. Images and attachments are hotlinked from the old site until the cutover.

const boldMarkSchema = z.object({ type: z.literal("bold") });
const linkMarkSchema = z.object({ type: z.literal("link"), attrs: z.object({ href: z.string() }) });

export const textNodeSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  marks: z.array(z.discriminatedUnion("type", [boldMarkSchema, linkMarkSchema])).optional(),
});

const hardBreakSchema = z.object({ type: z.literal("hardBreak") });

const inlineSchema = z.discriminatedUnion("type", [textNodeSchema, hardBreakSchema]);

export const paragraphSchema = z.object({
  type: z.literal("paragraph"),
  content: z.array(inlineSchema).optional(),
});

const headingSchema = z.object({
  type: z.literal("heading"),
  attrs: z.object({ level: z.union([z.literal(2), z.literal(3)]) }),
  content: z.array(inlineSchema).optional(),
});

// One paragraph per item: the old site's lists don't nest, and the page draws none.
const listItemSchema = z.object({ type: z.literal("listItem"), content: z.array(paragraphSchema) });

const bulletListSchema = z.object({ type: z.literal("bulletList"), content: z.array(listItemSchema) });
const orderedListSchema = z.object({ type: z.literal("orderedList"), content: z.array(listItemSchema) });

/** Its size is the file's own, when known: the page reserves the space and holds tall ones (posters) to a height. */
const imageSchema = z.object({
  type: z.literal("image"),
  attrs: z.object({
    src: z.string(),
    alt: z.string(),
    width: z.number().int().positive().nullable(),
    height: z.number().int().positive().nullable(),
  }),
});

/** A set of photos shown as one strip. Its slides are cropped to one shape, so no sizes. */
const gallerySchema = z.object({
  type: z.literal("gallery"),
  attrs: z.object({ images: z.array(z.object({ src: z.string(), alt: z.string() })) }),
});

const attachmentSchema = z.object({
  type: z.literal("attachment"),
  attrs: z.object({
    href: z.string(),
    label: z.string(),
    /** Lower case, without the dot: `pdf`, `docx`. */
    ext: z.string(),
    /** In bytes, when the old site said. */
    size: z.number().int().nonnegative().nullable(),
  }),
});

// A restricted table: the first row is the header, every cell one paragraph, no merged cells. On a phone each row
// becomes a card labelled by the header row, which only works with that shape.
const tableCellSchema = z.object({
  type: z.enum(["tableHeader", "tableCell"]),
  content: z.array(paragraphSchema),
});
const tableRowSchema = z.object({ type: z.literal("tableRow"), content: z.array(tableCellSchema) });
const tableSchema = z.object({ type: z.literal("table"), content: z.array(tableRowSchema) });

const blockSchema = z.discriminatedUnion("type", [
  paragraphSchema,
  headingSchema,
  bulletListSchema,
  orderedListSchema,
  imageSchema,
  gallerySchema,
  attachmentSchema,
  tableSchema,
]);

export const articleBodySchema = z.object({ type: z.literal("doc"), content: z.array(blockSchema) });

export type ArticleBody = z.infer<typeof articleBodySchema>;
export type ArticleBlock = z.infer<typeof blockSchema>;
export type ArticleInline = z.infer<typeof inlineSchema>;
export type ArticleText = z.infer<typeof textNodeSchema>;
export type ArticleMark = NonNullable<ArticleText["marks"]>[number];
export type ArticleParagraph = z.infer<typeof paragraphSchema>;
export type ArticleImage = z.infer<typeof imageSchema>;
export type ArticleAttachment = z.infer<typeof attachmentSchema>;
export type ArticleTable = z.infer<typeof tableSchema>;

/** A body with nothing in it: an article whose page had none. */
export const EMPTY_BODY: ArticleBody = { type: "doc", content: [] };
