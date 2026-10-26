import { createFileRoute } from "@tanstack/react-router";

import { FormPage } from "#/components/shared/form-page/form-page";
import { pageMeta } from "#/lib/seo";
import { FORM_DRAWINGS } from "#/lib/university/drawings";
import { m } from "#/paraglide/messages";
import { FeedbackForm } from "#/routes/feedback/components/feedback-form";

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/feedback")({
  head: (args) => pageMeta({ args, title: m.feedback_title(), description: m.feedback_description() }),
  component: FeedbackPage,
});

/*===== Page =====*/
function FeedbackPage() {
  return (
    <FormPage
      id="feedback"
      kicker={m.feedback_kicker()}
      title={m.feedback_title()}
      lede={m.feedback_lede()}
      steps={[
        { title: m.feedback_step_fill(), description: m.feedback_step_fill_description() },
        { title: m.feedback_step_send(), description: m.feedback_step_send_description() },
        { title: m.form_step_code(), description: m.form_step_code_description() },
      ]}
      privacy={m.feedback_privacy()}
      drawing={FORM_DRAWINGS.feedback}
    >
      <FeedbackForm />
    </FormPage>
  );
}
