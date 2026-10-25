import { z } from "zod";

import { ACADEMIC_RANKS } from "#/orpc/department/constants";

/*===== Search Params =====*/
// The faculty list's rank filter (`?rank=assistant`), so a filtered list can be shared. It only filters what the page
// already has, so the loader doesn't read it.

export const RANK_FILTERS = ["all", ...ACADEMIC_RANKS] as const;

export type RankFilter = (typeof RANK_FILTERS)[number];

export const departmentSearchDefaults = { rank: "all" } as const;

export const departmentSearchSchema = z.object({
  rank: z.enum(RANK_FILTERS).default(departmentSearchDefaults.rank).catch(departmentSearchDefaults.rank),
});
