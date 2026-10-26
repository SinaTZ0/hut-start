/*===== Feedback Constants =====*/
// Browser-safe values shared by the API and the complaints and feedback form (FORMS.md → 1). Stored as these keys, so
// a label can change without touching saved messages.

/** Who a message is for: the university's offices first, then the department heads, in the order the form lists them. */
export const FEEDBACK_UNIT_GROUPS = {
  management: [
    "complaints-office",
    "president",
    "monitoring-evaluation",
    "admin-finance",
    "representative-office",
    "vp-education-research",
    "security",
    "education",
  ],
  departments: [
    "math",
    "ee-telecom-electronics",
    "ee-control-power",
    "civil",
    "islamic-studies",
    "industrial",
    "computer",
    "chemistry",
  ],
} as const;

export const FEEDBACK_UNITS = [...FEEDBACK_UNIT_GROUPS.management, ...FEEDBACK_UNIT_GROUPS.departments] as const;
export type FeedbackUnit = (typeof FEEDBACK_UNITS)[number];

export const FEEDBACK_KINDS = ["complaint", "suggestion"] as const;
export type FeedbackKind = (typeof FEEDBACK_KINDS)[number];

export const FEEDBACK_NAME_MAX_LENGTH = 100;
export const FEEDBACK_BODY_MIN_LENGTH = 10;
export const FEEDBACK_BODY_MAX_LENGTH = 5000;
export const STUDENT_ID_MIN_DIGITS = 3;
export const STUDENT_ID_MAX_DIGITS = 30;
