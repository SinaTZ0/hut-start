import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, type DefaultValues, useForm, useWatch } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "#/components/primitive/field/field";
import { Input } from "#/components/primitive/input/input";
import { RadioGroup, RadioGroupItem } from "#/components/primitive/radio-group/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "#/components/primitive/select/select";
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
  FEEDBACK_BODY_MAX_LENGTH,
  FEEDBACK_BODY_MIN_LENGTH,
  FEEDBACK_KINDS,
  FEEDBACK_UNIT_GROUPS,
  FEEDBACK_UNITS,
} from "#/orpc/feedback/constants";
import { m } from "#/paraglide/messages";
import { KIND_OPTIONS, UNIT_LABELS } from "#/routes/feedback/options";
import { feedbackFormSchema, type FeedbackFormInput, type FeedbackFormValues } from "#/routes/feedback/schema";

/*===== Feedback Form =====*/

// Nothing is chosen for the kind and the unit at first: the visitor has to pick them.
const EMPTY: DefaultValues<FeedbackFormInput> = {
  body: "",
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  studentId: "",
};

/**
 * Sends a complaint, suggestion or criticism (FORMS.md → 1) and shows its tracking code. The security check starts on
 * the form's first focus, so it is usually done by the time the visitor sends. Server field errors land next to their
 * fields, and nothing typed is lost.
 */
export function FeedbackForm() {
  const captcha = useCaptchaCheck();
  const [stage, setStage] = useState<SubmitStage>("idle");
  const [captchaError, setCaptchaError] = useState<string>();
  const form = useForm<FeedbackFormInput, unknown, FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: EMPTY,
  });
  const { errors } = form.formState;
  const bodyLength = useWatch({ control: form.control, name: "body" }).length;

  const submit = useMutation(orpc.feedback.submit.mutationOptions());
  // The receipt on show. Apart from `submit.data`, which React Query sets outside a Transition, so the swap runs in
  // one and the card animates (`swapFormBody`).
  const [sent, setSent] = useState<typeof submit.data>();
  const failure = submit.error ? describeApiFailure({ error: submit.error, fallback: m.form_submit_failed() }) : null;
  const fieldError = (name: keyof FeedbackFormInput) => errors[name]?.message ?? failure?.fields[name];

  const units = Object.fromEntries(FEEDBACK_UNITS.map((unit) => [unit, UNIT_LABELS[unit]()]));

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
        title={m.feedback_receipt_title()}
        description={m.feedback_receipt_description()}
        trackingCode={sent.trackingCode}
        createdAt={sent.createdAt}
        againLabel={m.feedback_receipt_again()}
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

      {/*===== Message =====*/}
      <FormSection number={1} title={m.feedback_section_message()}>
        {/*------ Kind ------*/}
        <FieldSet data-invalid={!!fieldError("kind") || undefined}>
          <FieldLegend variant="label">
            {m.feedback_kind_label()} <RequiredMark />
          </FieldLegend>
          <Controller
            name="kind"
            control={form.control}
            render={({ field }) => (
              <RadioGroup
                name={field.name}
                value={field.value ?? null}
                onValueChange={field.onChange}
                inputRef={field.ref}
                aria-required
                className="sm:grid-cols-2"
              >
                {FEEDBACK_KINDS.map((kind) => {
                  const option = KIND_OPTIONS[kind];
                  return (
                    <FieldLabel key={kind} htmlFor={`feedback-kind-${kind}`}>
                      <Field orientation="horizontal">
                        <option.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-text" />
                        <FieldContent>
                          <FieldTitle>{option.label()}</FieldTitle>
                          <FieldDescription>{option.description()}</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value={kind} id={`feedback-kind-${kind}`} aria-invalid={!!fieldError("kind")} />
                      </Field>
                    </FieldLabel>
                  );
                })}
              </RadioGroup>
            )}
          />
          <FieldError>{fieldError("kind")}</FieldError>
        </FieldSet>

        {/*------ Unit ------*/}
        <Field data-invalid={!!fieldError("unit") || undefined}>
          <FieldLabel htmlFor="feedback-unit">
            {m.feedback_unit_label()} <RequiredMark />
          </FieldLabel>
          <Controller
            name="unit"
            control={form.control}
            render={({ field }) => (
              <Select items={units} value={field.value ?? null} onValueChange={field.onChange} name={field.name}>
                <SelectTrigger
                  id="feedback-unit"
                  ref={field.ref}
                  onBlur={field.onBlur}
                  aria-required
                  aria-invalid={!!fieldError("unit")}
                  className="w-full"
                >
                  <SelectValue placeholder={m.form_select_placeholder()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{m.feedback_unit_group_management()}</SelectLabel>
                    {FEEDBACK_UNIT_GROUPS.management.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {units[unit]}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>{m.feedback_unit_group_departments()}</SelectLabel>
                    {FEEDBACK_UNIT_GROUPS.departments.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {units[unit]}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{fieldError("unit")}</FieldError>
        </Field>

        {/*------ Body ------*/}
        <Field data-invalid={!!fieldError("body") || undefined}>
          <FieldLabel htmlFor="feedback-body">
            {m.feedback_body_label()} <RequiredMark />
          </FieldLabel>
          <Textarea
            id="feedback-body"
            rows={6}
            placeholder={m.feedback_body_placeholder()}
            aria-required
            aria-invalid={!!fieldError("body")}
            aria-describedby="feedback-body-hint"
            {...form.register("body")}
          />
          <div className="flex justify-between gap-4">
            <FieldDescription id="feedback-body-hint">
              {m.form_text_hint({ min: FEEDBACK_BODY_MIN_LENGTH })}
            </FieldDescription>
            <TextCount length={bodyLength} max={FEEDBACK_BODY_MAX_LENGTH} />
          </div>
          <FieldError>{fieldError("body")}</FieldError>
        </Field>
      </FormSection>

      {/*===== Sender =====*/}
      <FormSection number={2} title={m.feedback_section_sender()} description={m.feedback_section_sender_hint()}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!fieldError("firstName") || undefined}>
            <FieldLabel htmlFor="feedback-first-name">
              {m.form_first_name_label()} <RequiredMark />
            </FieldLabel>
            <Input
              id="feedback-first-name"
              autoComplete="given-name"
              aria-required
              aria-invalid={!!fieldError("firstName")}
              {...form.register("firstName")}
            />
            <FieldError>{fieldError("firstName")}</FieldError>
          </Field>

          <Field data-invalid={!!fieldError("lastName") || undefined}>
            <FieldLabel htmlFor="feedback-last-name">
              {m.form_last_name_label()} <OptionalMark />
            </FieldLabel>
            <Input
              id="feedback-last-name"
              autoComplete="family-name"
              aria-invalid={!!fieldError("lastName")}
              {...form.register("lastName")}
            />
            <FieldError>{fieldError("lastName")}</FieldError>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!fieldError("mobile") || undefined}>
            <FieldLabel htmlFor="feedback-mobile">
              {m.form_mobile_label()} <OptionalMark />
            </FieldLabel>
            <Input
              id="feedback-mobile"
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

          <Field data-invalid={!!fieldError("email") || undefined}>
            <FieldLabel htmlFor="feedback-email">
              {m.form_email_label()} <OptionalMark />
            </FieldLabel>
            <Input
              id="feedback-email"
              type="email"
              dir="ltr"
              autoComplete="email"
              aria-invalid={!!fieldError("email")}
              {...form.register("email")}
            />
            <FieldError>{fieldError("email")}</FieldError>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!fieldError("studentId") || undefined}>
            <FieldLabel htmlFor="feedback-student-id">
              {m.form_student_id_label()} <OptionalMark />
            </FieldLabel>
            <Input
              id="feedback-student-id"
              dir="ltr"
              inputMode="numeric"
              autoComplete="off"
              aria-invalid={!!fieldError("studentId")}
              {...form.register("studentId")}
            />
            <FieldError>{fieldError("studentId")}</FieldError>
          </Field>
        </div>
      </FormSection>

      <FormSubmit stage={stage} label={m.feedback_submit()} privacy={m.feedback_privacy()} captcha={captcha} />
    </form>
  );
}
