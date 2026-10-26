import { m } from "#/paraglide/messages";

/*===== Statement =====*/
// The university's supplied statement, section by section. The text itself is in the message files (`privacy_s<n>_*`),
// so it is stored here as functions and called in render, never at module scope.

export type StatementSection = {
  id: string;
  title: () => string;
  paragraphs: (() => string)[];
};

export const STATEMENT_SECTIONS: StatementSection[] = [
  {
    id: "user-information",
    title: m.privacy_s1_title,
    paragraphs: [m.privacy_s1_p1, m.privacy_s1_p2],
  },
  { id: "legal-basis", title: m.privacy_s2_title, paragraphs: [m.privacy_s2_p1] },
  { id: "data-minimization", title: m.privacy_s3_title, paragraphs: [m.privacy_s3_p1] },
  { id: "data-security", title: m.privacy_s4_title, paragraphs: [m.privacy_s4_p1] },
  { id: "statement-updates", title: m.privacy_s5_title, paragraphs: [m.privacy_s5_p1] },
  { id: "external-websites", title: m.privacy_s6_title, paragraphs: [m.privacy_s6_p1] },
  { id: "university-contact", title: m.privacy_s7_title, paragraphs: [m.privacy_s7_p1] },
];
