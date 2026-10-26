import { LightbulbIcon, type LucideIcon, MessageSquareWarningIcon } from "lucide-react";

import type { FeedbackKind, FeedbackUnit } from "#/orpc/feedback/constants";
import { m } from "#/paraglide/messages";

/*===== Option Labels =====*/
// The form's names for the stored keys (`src/orpc/feedback/constants.ts`). Message functions, never strings: a
// module is evaluated once per server process (docs/frontend/i18n.md).

export const UNIT_LABELS: Record<FeedbackUnit, () => string> = {
  "complaints-office": m.feedback_unit_complaints_office,
  president: m.feedback_unit_president,
  "monitoring-evaluation": m.feedback_unit_monitoring_evaluation,
  "admin-finance": m.feedback_unit_admin_finance,
  "representative-office": m.feedback_unit_representative_office,
  "vp-education-research": m.feedback_unit_vp_education_research,
  security: m.feedback_unit_security,
  education: m.feedback_unit_education,
  math: m.feedback_unit_math,
  "ee-telecom-electronics": m.feedback_unit_ee_telecom_electronics,
  "ee-control-power": m.feedback_unit_ee_control_power,
  civil: m.feedback_unit_civil,
  "islamic-studies": m.feedback_unit_islamic_studies,
  industrial: m.feedback_unit_industrial,
  computer: m.feedback_unit_computer,
  chemistry: m.feedback_unit_chemistry,
};

export const KIND_OPTIONS: Record<FeedbackKind, { label: () => string; description: () => string; icon: LucideIcon }> =
  {
    complaint: {
      label: m.feedback_kind_complaint,
      description: m.feedback_kind_complaint_description,
      icon: MessageSquareWarningIcon,
    },
    suggestion: {
      label: m.feedback_kind_suggestion,
      description: m.feedback_kind_suggestion_description,
      icon: LightbulbIcon,
    },
  };
