// Types `<altcha-widget>` in JSX.
/// <reference types="altcha/types/react" />

import { CheckIcon, LockIcon, SendIcon, ShieldCheckIcon } from "lucide-react";
import { type CSSProperties, type ReactNode, useEffect, useEffectEvent, useId, useRef } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/primitive/breadcrumb/breadcrumb";
import { Button } from "#/components/primitive/button/button";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "#/components/primitive/field/field";
import { Spinner } from "#/components/primitive/spinner/spinner";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { SiteLink } from "#/components/shared/site-link/site-link";
import type { CaptchaCheck, CaptchaCheckState } from "#/hooks/use-captcha-check";
import { formatNumber } from "#/lib/locale";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";

/*===== Form Page =====*/
// The public forms' page (FORMS.md): the heading, then one card with the form beside a pine rail that says what
// happens after sending and how the details are used. On phones the rail follows the form.

export type FormStep = { title: string; description: string };

/** Two-digit step and section numbers, as the department pages set them. */
function stepNumber(value: number): string {
  return formatNumber(value, { minimumIntegerDigits: 2 });
}

/**
 * A public form's page. `children` is the form, or the receipt after sending: the rail stays either way.
 *
 * @param drawing - The page's signature drawing (`FORM_DRAWINGS`), drawn small in the rail's far corner.
 */
export function FormPage({
  id,
  kicker,
  title,
  lede,
  steps,
  privacy,
  drawing,
  children,
}: {
  /** Prefix for the page's element ids. */
  id: string;
  kicker: string;
  title: string;
  lede: string;
  steps: FormStep[];
  privacy: string;
  drawing: { src: string; aspect: string };
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-site px-gutter pt-8 pb-section md:pt-14">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<SiteLink href="/" />}>{m.nav_tab_home()}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/*===== Heading =====*/}
      <SectionHead
        as="h1"
        id={`${id}-title`}
        kicker={kicker}
        title={title}
        lede={lede}
        className="mt-10 max-w-3xl md:mt-14"
      />

      <div className="grid overflow-hidden rounded-lg border bg-card lg:grid-cols-3">
        {/*===== Form =====*/}
        <div className="px-5 py-8 sm:p-10 lg:col-span-2">{children}</div>

        {/*===== Rail =====*/}
        {/* Room under the text for the drawing, so it stays clear of the privacy note when the form side is short. */}
        <aside
          aria-labelledby={`${id}-steps`}
          className="relative isolate overflow-hidden bg-band px-5 pt-8 pb-44 text-on-band sm:px-10 sm:pt-10 lg:pb-52"
        >
          <div className="lg:sticky lg:top-10">
            <h2 id={`${id}-steps`} className="text-kicker font-bold text-on-band-muted">
              {m.form_steps_title()}
            </h2>
            <ol className="mt-4">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4 border-b border-band-line py-5">
                  <span aria-hidden className="pt-0.5 text-kicker font-bold text-highlight">
                    {stepNumber(index + 1)}
                  </span>
                  <div>
                    <p className="text-h4">{step.title}</p>
                    <p className="mt-1 text-body-sm text-on-band-soft">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex gap-3 rounded-lg border border-band-line bg-band-hover p-5">
              <ShieldCheckIcon aria-hidden className="mt-0.5 size-5 shrink-0 text-highlight" />
              <p className="text-body-sm text-on-band-soft">{privacy}</p>
            </div>
          </div>

          {/* Its subject keeps to its start-bottom corner, so English mirrors it. */}
          <div
            aria-hidden
            style={{ "--art": `url("${drawing.src}")` } as CSSProperties}
            className={cn(
              "pointer-events-none absolute end-0 bottom-0 -z-10 w-64 mask-art text-art-band sm:w-72 ltr:-scale-x-100",
              drawing.aspect,
            )}
          />
        </aside>
      </div>
    </div>
  );
}

/*===== Form Section =====*/

/** A numbered group of fields, its number in gold like the department pages' section numbers. */
export function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <FieldSet>
      <FieldLegend className="flex items-baseline">
        <span aria-hidden className="me-3 text-kicker font-bold text-highlight-text">
          {stepNumber(number)}
        </span>
        {title}
      </FieldLegend>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldGroup className="mt-2">{children}</FieldGroup>
    </FieldSet>
  );
}

/*===== Field Marks =====*/
// FORMS.md → Shared rules: a star on required fields, «(اختیاری)» on optional ones. The star is decoration: the
// control itself carries `aria-required`.

export function RequiredMark() {
  return (
    <span aria-hidden className="text-destructive">
      *
    </span>
  );
}

export function OptionalMark() {
  return <span className="font-normal text-muted-foreground">{m.form_optional()}</span>;
}

/*===== Text Count =====*/

/** How much of a long text's room is used, at the field's end. Turns red past the limit. */
export function TextCount({ length, max }: { length: number; max: number }) {
  return (
    <p
      aria-hidden
      data-over={length > max || undefined}
      className="shrink-0 text-caption text-muted-foreground tabular-nums data-over:text-destructive"
    >
      {m.form_text_count({ count: length, max })}
    </p>
  );
}

/*===== Submit =====*/

/** Where a submission is: waiting for the security check, then sending. */
export type SubmitStage = "idle" | "captcha" | "sending";

/**
 * The form's foot: the security check, then the gold send button, which names the step in progress, with the privacy
 * line beside it.
 */
export function FormSubmit({
  stage,
  label,
  privacy,
  captcha,
}: {
  stage: SubmitStage;
  label: string;
  privacy: string;
  captcha: CaptchaCheck;
}) {
  return (
    <div className="flex flex-col gap-6 border-t pt-8">
      <CaptchaCheckBox captcha={captcha} />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="highlight" size="lg" disabled={stage !== "idle"}>
          {stage === "idle" ? (
            <SendIcon data-icon="inline-start" className="rtl:-scale-x-100" />
          ) : (
            <Spinner data-icon="inline-start" />
          )}
          {stage === "captcha" ? m.form_checking() : stage === "sending" ? m.form_sending() : label}
        </Button>
        <p className="flex max-w-sm gap-2 text-body-sm text-muted-foreground">
          <LockIcon aria-hidden className="mt-1 size-4 shrink-0" />
          {privacy}
        </p>
      </div>
    </div>
  );
}

/*===== Captcha Check =====*/
// A visible «من ربات نیستم», so visitors see the form is protected. The work is the same proof-of-work as the sign-up
// form's invisible check: the form's first focus starts it and the box ticks itself when it is done; a click starts
// it too. The ALTCHA widget stays invisible and only solves; this box is the app's own, in its own look.

const CAPTCHA_STATUS: Record<CaptchaCheckState, () => string> = {
  idle: m.form_captcha_idle,
  solving: m.form_captcha_solving,
  verified: m.form_captcha_verified,
  error: m.form_captcha_error,
};

function CaptchaCheckBox({ captcha }: { captcha: CaptchaCheck }) {
  const { state, slow, widgetRef } = captcha;
  const statusId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  // The first step into the form starts the check. Listened for here, so the form that holds the box needs no wiring
  // and a form shown again after «send another» is listened to again.
  const onFormFocus = useEffectEvent(() => void captcha.start());
  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;
    form.addEventListener("focusin", onFormFocus);
    return () => form.removeEventListener("focusin", onFormFocus);
  }, []);

  return (
    <div ref={rootRef} className="flex w-full items-stretch rounded-sm border sm:max-w-sm">
      <label
        className={cn(
          "flex min-h-16 flex-1 cursor-pointer items-center gap-3 rounded-s-sm px-4 py-3 transition-colors duration-200",
          "hover:bg-accent has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring has-focus-visible:outline-solid",
        )}
      >
        {/* A real checkbox for keyboards and screen readers; it only ticks once the work is done. */}
        <input
          type="checkbox"
          className="sr-only"
          checked={state === "verified"}
          onChange={() => void captcha.start()}
          aria-busy={state === "solving"}
          aria-invalid={state === "error"}
          aria-describedby={statusId}
        />
        <span
          aria-hidden
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-xs border-2 transition-colors duration-200",
            state === "idle" && "border-input bg-background",
            state === "solving" && "border-transparent",
            state === "verified" && "border-primary bg-primary text-primary-foreground",
            state === "error" && "border-destructive bg-background",
          )}
        >
          {state === "solving" && <Spinner className="size-5" />}
          {state === "verified" && (
            <CheckIcon className="size-4 stroke-3 motion-safe:animate-in motion-safe:zoom-in-75 motion-safe:fade-in" />
          )}
        </span>
        <span className="flex flex-col">
          <span className="text-body-sm font-semibold">{m.form_captcha_label()}</span>
          <span
            id={statusId}
            aria-live="polite"
            className={cn(
              "text-caption text-muted-foreground",
              state === "verified" && "text-success",
              state === "error" && "text-destructive",
            )}
          >
            {state === "solving" && slow ? m.form_captcha_slow() : CAPTCHA_STATUS[state]()}
          </span>
        </span>
      </label>

      {/* Where Cloudflare puts its logo: what kind of check this is. */}
      <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-1 border-s px-2 text-center text-caption text-muted-foreground">
        <ShieldCheckIcon aria-hidden className="size-5" />
        {m.form_captcha_badge()}
      </div>

      {/* `suppressHydrationWarning` because the custom element upgrades after hydration. */}
      <altcha-widget ref={widgetRef} display="invisible" suppressHydrationWarning />
    </div>
  );
}
