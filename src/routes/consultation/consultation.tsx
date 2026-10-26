import { createFileRoute } from "@tanstack/react-router";

import { FormPage } from "#/components/shared/form-page/form-page";
import { pageMeta } from "#/lib/seo";
import { FORM_DRAWINGS } from "#/lib/university/drawings";
import { m } from "#/paraglide/messages";
import { ConsultationForm } from "#/routes/consultation/components/consultation-form";

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/consultation")({
  head: (args) => pageMeta({ args, title: m.consultation_title(), description: m.consultation_description() }),
  component: ConsultationPage,
});

/*===== Page =====*/
function ConsultationPage() {
  return (
    <FormPage
      id="consultation"
      kicker={m.consultation_kicker()}
      title={m.consultation_title()}
      lede={m.consultation_lede()}
      steps={[
        { title: m.consultation_step_details(), description: m.consultation_step_details_description() },
        { title: m.consultation_step_send(), description: m.consultation_step_send_description() },
        { title: m.form_step_code(), description: m.form_step_code_description() },
      ]}
      privacy={m.consultation_privacy()}
      drawing={FORM_DRAWINGS.consultation}
    >
      <ConsultationForm />
    </FormPage>
  );
}
