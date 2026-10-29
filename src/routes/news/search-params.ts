import { z } from "zod";

import { ARCHIVE_KINDS, ARCHIVE_SORTS, FEED_CATEGORIES } from "#/orpc/home-feed/constants";

/*===== Archive Filters =====*/
// The archive's state in the URL: `/news?kind=notice&category=graduate&year=1404&page=2`. A kind, topic or year left
// out means all of them. An unknown value (an old link, a hand edit) falls back instead of failing the page; a year
// from the other language's calendar matches nothing, and the year filter's «all» clears it.

export const newsSearchDefaults = { q: "", sort: "newest", page: 1 } as const;

export const newsSearchSchema = z.object({
  kind: z.enum(ARCHIVE_KINDS).optional().catch(undefined),
  category: z.enum(FEED_CATEGORIES).optional().catch(undefined),
  q: z.string().trim().max(100).default(newsSearchDefaults.q).catch(newsSearchDefaults.q),
  year: z.coerce.number().int().min(1300).max(2200).optional().catch(undefined),
  sort: z.enum(ARCHIVE_SORTS).default(newsSearchDefaults.sort).catch(newsSearchDefaults.sort),
  page: z.coerce.number().int().min(1).max(10_000).default(newsSearchDefaults.page).catch(newsSearchDefaults.page),
});

export type NewsSearch = z.infer<typeof newsSearchSchema>;
