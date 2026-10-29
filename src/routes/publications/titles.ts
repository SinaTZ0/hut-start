import { m } from "#/paraglide/messages";

/*===== Publications =====*/
// The university's publications as its news archive knows them (posts about their issues, 2021–2025). The old
// «پایگاه نشریات دانشجویی» page was empty, so this list is gathered from those posts; `search` is the word that finds
// a title's posts in the archive. The vital-signs magazine's posts don't say which association publishes it.

export type Publication = {
  id: string;
  name: () => string;
  publisher?: () => string;
  /** The latest issue the archive has a post for, and that post's date. */
  issue: number;
  issuedOn: string;
  search: string;
};

export const STUDENT_PUBLICATIONS: Publication[] = [
  {
    id: "vista",
    name: m.publications_vista,
    publisher: m.publications_vista_publisher,
    issue: 5,
    issuedOn: "2025-11-10",
    search: "ویستا",
  },
  {
    id: "pulse",
    name: m.publications_pulse,
    publisher: m.publications_pulse_publisher,
    issue: 9,
    issuedOn: "2025-03-03",
    search: "پالس",
  },
  {
    id: "nels",
    name: m.publications_nels,
    publisher: m.publications_nels_publisher,
    issue: 1,
    issuedOn: "2021-05-31",
    search: "نلس",
  },
  { id: "vital-signal", name: m.publications_vital_signal, issue: 15, issuedOn: "2021-05-31", search: "سیگنال حیاتی" },
];

/** The university's own scientific journal, licensed in 2023. */
export const UNIVERSITY_JOURNAL: Publication = {
  id: "seai",
  name: m.publications_journal,
  publisher: m.publications_journal_publisher,
  issue: 4,
  issuedOn: "2025-10-06",
  search: "انرژی پایدار و هوش مصنوعی",
};

/** The word that finds every post about a publication. */
export const PUBLICATIONS_SEARCH = "نشریه";
