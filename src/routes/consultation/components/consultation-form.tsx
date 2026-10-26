import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { type Control, Controller, useForm, useWatch } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "#/components/primitive/field/field";
import { Input } from "#/components/primitive/input/input";
import { RadioGroup, RadioGroupItem } from "#/components/primitive/radio-group/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/primitive/select/select";
import { Textarea } from "#/components/primitive/textarea/textarea";
import { FormAlert } from "#/components/shared/form-alert/form-alert";
import {
  FormSection,
  FormSubmit,
  OptionalMark,
  RequiredMark,
  type SubmitStage,
  swapFormBody,
  TextCount,
} from "#/components/shared/form-page/form-page";
import { SubmissionReceipt } from "#/components/shared/submission-receipt/submission-receipt";
import { useCaptchaCheck } from "#/hooks/use-captcha-check";
import { describeApiFailure } from "#/lib/api-error";
import { orpc } from "#/orpc/client";
import {
  CONSULTATION_QUESTION_MAX_LENGTH,
  CONSULTATION_QUESTION_MIN_LENGTH,
  FACULTIES,
  FIELDS_OF_STUDY,
  GENDERS,
  MARITAL_STATUSES,
} from "#/orpc/consultation/constants";
import { m } from "#/paraglide/messages";
import {
  FACULTY_LABELS,
  FIELD_OF_STUDY_LABELS,
  GENDER_LABELS,
  MARITAL_STATUS_LABELS,
} from "#/routes/consultation/options";
import {
  consultationFormSchema,
  type ConsultationFormInput,
  type ConsultationFormValues,
} from "#/routes/consultation/schema";

/*===== Consultation Form =====*/

// The four choices start at "unspecified" (FORMS.md → 2): a visitor who would rather not say leaves them.
const EMPTY: ConsultationFormInput = {
  gender: "unspecified",
  age: "",
  maritalStatus: "unspecified",
  faculty: "unspecified",
  fieldOfStudy: "unspecified",
  question: "",
  email: "",
  mobile: "",
};

/**
 * Sends a question to the university's advisors (FORMS.md → 2) and shows its tracking code. The security check starts
 * on the form's first focus, so it is usually done by the time the visitor sends. Server field errors land next to
 * their fields, and nothing typed is lost.
 */
export function ConsultationForm() {
  const captcha = useCaptchaCheck();
  const [stage, setStage] = useState<SubmitStage>("idle");
  const [captchaError, setCaptchaError] = useState<string>();
  const form = useForm<ConsultationFormInput, unknown, ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: EMPTY,
  });
  const { errors } = form.formState;
  const questionLength = useWatch({ control: form.control, name: "question" }).length;

  const submit = useMutation(orpc.consultation.submit.mutationOptions());
  // The receipt on show. Apart from `submit.data`, which React Query sets outside a Transition, so the swap runs in
  // one and the card animates (`swapFormBody`).
  const [sent, setSent] = useState<typeof submit.data>();
  const failure = submit.error ? describeApiFailure({ error: submit.error, fallback: m.form_submit_failed() }) : null;
  const fieldError = (name: keyof ConsultationFormInput) => errors[name]?.message ?? failure?.fields[name];

  const onSubmit = form.handleSubmit(async (values) => {
    setCaptchaError(undefined);
    submit.reset();

    /*------ Captcha ------*/
    // Waits for a check still in progress; the answer is usually ready already.
    if (captcha.state !== "verified") setStage("captcha");
    const answer = await captcha.take();
    if (!answer) {
      setStage("idle");
      return setCaptchaError(m.form_captcha_unavailable());
    }

    /*------ Send ------*/
    // A failure is shown from `submit.error`. The answer was spent either way, so a failed send solves a new one.
    setStage("sending");
    const result = await submit.mutateAsync({ ...values, captcha: answer }).catch(() => undefined);
    if (!result) {
      void captcha.start();
      return setStage("idle");
    }

    /*------ Receipt ------*/
    swapFormBody(() => {
      setStage("idle");
      setSent(result);
    });
  });

  /*===== Sent =====*/
  if (sent) {
    return (
      <SubmissionReceipt
        title={m.consultation_receipt_title()}
        description={m.consultation_receipt_description()}
        trackingCode={sent.trackingCode}
        createdAt={sent.createdAt}
        againLabel={m.consultation_receipt_again()}
        onAgain={() =>
          swapFormBody(() => {
            form.reset(EMPTY);
            submit.reset();
            captcha.reset();
            setSent(undefined);
          })
        }
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-10">
      <FormAlert message={captchaError ?? failure?.message ?? undefined} />

      {/*===== About You =====*/}
      <FormSection number={1} title={m.consultation_section_about()} description={m.consultation_section_about_hint()}>
        <div className="grid gap-5 md:grid-cols-2">
          <ChoiceCards
            control={form.control}
            name="gender"
            label={m.consultation_gender_label()}
            options={GENDERS.map((value) => ({ value, label: GENDER_LABELS[value]() }))}
            error={fieldError("gender")}
          />
          <ChoiceCards
            control={form.control}
            name="maritalStatus"
            label={m.consultation_marital_label()}
            options={MARITAL_STATUSES.map((value) => ({ value, label: MARITAL_STATUS_LABELS[value]() }))}
            error={fieldError("maritalStatus")}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          <Field data-invalid={!!fieldError("age") || undefined}>
            <FieldLabel htmlFor="consultation-age">
              {m.consultation_age_label()} <RequiredMark />
            </FieldLabel>
            <Input
              id="consultation-age"
              inputMode="numeric"
              autoComplete="off"
              maxLength={3}
              aria-required
              aria-invalid={!!fieldError("age")}
              {...form.register("age")}
            />
            <FieldError>{fieldError("age")}</FieldError>
          </Field>
        </div>
      </FormSection>

      {/*===== Studies =====*/}
      <FormSection
        number={2}
        title={m.consultation_section_studies()}
        description={m.consultation_section_studies_hint()}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <OptionSelect
            control={form.control}
            name="faculty"
            id="consultation-faculty"
            label={m.consultation_faculty_label()}
            items={Object.fromEntries(FACULTIES.map((value) => [value, FACULTY_LABELS[value]()]))}
            error={fieldError("faculty")}
          />
          <OptionSelect
            control={form.control}
            name="fieldOfStudy"
            id="consultation-field"
            label={m.consultation_field_label()}
            items={Object.fromEntries(FIELDS_OF_STUDY.map((value) => [value, FIELD_OF_STUDY_LABELS[value]()]))}
            error={fieldError("fieldOfStudy")}
          />
        </div>
      </FormSection>

      {/*===== Question =====*/}
      <FormSection number={3} title={m.consultation_section_question()}>
        <Field data-invalid={!!fieldError("question") || undefined}>
          <FieldLabel htmlFor="consultation-question">
            {m.consultation_question_label()} <RequiredMark />
          </FieldLabel>
          <Textarea
            id="consultation-question"
            rows={6}
            placeholder={m.consultation_question_placeholder()}
            aria-required
            aria-invalid={!!fieldError("question")}
            aria-describedby="consultation-question-hint"
            {...form.register("question")}
          />
          <div className="flex justify-between gap-4">
            <FieldDescription id="consultation-question-hint">
              {m.form_text_hint({ min: CONSULTATION_QUESTION_MIN_LENGTH })}
            </FieldDescription>
            <TextCount length={questionLength} max={CONSULTATION_QUESTION_MAX_LENGTH} />
          </div>
          <FieldError>{fieldError("question")}</FieldError>
        </Field>

        {/*------ Contact ------*/}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!fieldError("email") || undefined}>
            <FieldLabel htmlFor="consultation-email">
              {m.consultation_email_label()} <OptionalMark />
            </FieldLabel>
            <Input
              id="consultation-email"
              type="email"
              dir="ltr"
              autoComplete="email"
              aria-invalid={!!fieldError("email")}
              {...form.register("email")}
            />
            <FieldError>{fieldError("email")}</FieldError>
          </Field>

          <Field data-invalid={!!fieldError("mobile") || undefined}>
            <FieldLabel htmlFor="consultation-mobile">
              {m.form_mobile_label()} <OptionalMark />
            </FieldLabel>
            <Input
              id="consultation-mobile"
              type="tel"
              dir="ltr"
              inputMode="tel"
              autoComplete="tel"
              placeholder={m.form_mobile_placeholder()}
              aria-invalid={!!fieldError("mobile")}
              {...form.register("mobile")}
            />
            <FieldError>{fieldError("mobile")}</FieldError>
          </Field>
        </div>
        <FieldDescription>{m.consultation_contact_hint()}</FieldDescription>
      </FormSection>

      <FormSubmit stage={stage} label={m.consultation_submit()} privacy={m.consultation_privacy()} captcha={captcha} />
    </form>
  );
}

/*===== Choice Cards =====*/

type ChoiceName = "gender" | "maritalStatus";

/** A short required choice as a row of small cards, one already picked («نامعین»). */
function ChoiceCards({
  control,
  name,
  label,
  options,
  error,
}: {
  control: Control<ConsultationFormInput, unknown, ConsultationFormValues>;
  name: ChoiceName;
  label: string;
  options: { value: string; label: string }[];
  error: string | undefined;
}) {
  return (
    <FieldSet data-invalid={!!error || undefined}>
      <FieldLegend variant="label">
        {label} <RequiredMark />
      </FieldLegend>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
            inputRef={field.ref}
            aria-required
            className="grid-cols-3"
          >
            {options.map((option) => (
              <FieldLabel key={option.value} htmlFor={`consultation-${name}-${option.value}`}>
                <Field orientation="horizontal">
                  <RadioGroupItem value={option.value} id={`consultation-${name}-${option.value}`} />
                  <FieldTitle>{option.label}</FieldTitle>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        )}
      />
      <FieldError>{error}</FieldError>
    </FieldSet>
  );
}

/*===== Option Select =====*/

type SelectName = "faculty" | "fieldOfStudy";

/** A required pick from a list that starts at «نامعین». */
function OptionSelect({
  control,
  name,
  id,
  label,
  items,
  error,
}: {
  control: Control<ConsultationFormInput, unknown, ConsultationFormValues>;
  name: SelectName;
  id: string;
  label: string;
  items: Record<string, string>;
  error: string | undefined;
}) {
  return (
    <Field data-invalid={!!error || undefined}>
      <FieldLabel htmlFor={id}>
        {label} <RequiredMark />
      </FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select items={items} value={field.value} onValueChange={field.onChange} name={field.name}>
            <SelectTrigger
              id={id}
              ref={field.ref}
              onBlur={field.onBlur}
              aria-required
              aria-invalid={!!error}
              className="w-full"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(items).map(([value, itemLabel]) => (
                <SelectItem key={value} value={value}>
                  {itemLabel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
}
