import { ArrowLeftIcon, CheckIcon, CopyIcon, RotateCcwIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "#/components/primitive/button/button";
import { buttonVariants } from "#/components/primitive/button/button.styles";
import { SiteLink } from "#/components/shared/site-link/site-link";
import { formatDate } from "#/lib/locale";
import { m } from "#/paraglide/messages";

/*===== Submission Receipt =====*/

const COPIED_FOR_MS = 2000;

/**
 * What a public form shows once it is sent: that it arrived, when, and the tracking code to keep, with a copy button,
 * a way home and a way to send another. Its heading takes focus when it appears, so a screen reader announces the
 * result in place of the form.
 */
export function SubmissionReceipt({
  title,
  description,
  trackingCode,
  createdAt,
  againLabel,
  onAgain,
}: {
  title: string;
  description: string;
  trackingCode: string;
  createdAt: Date;
  againLabel: string;
  onAgain: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (copy !== "copied") return;
    const timer = setTimeout(() => setCopy("idle"), COPIED_FOR_MS);
    return () => clearTimeout(timer);
  }, [copy]);

  // The clipboard needs a secure context and the visitor's permission; when it refuses, the code is still selectable.
  const copyCode = () => {
    navigator.clipboard.writeText(trackingCode).then(
      () => setCopy("copied"),
      () => setCopy("failed"),
    );
  };

  return (
    <div className="flex flex-col items-start">
      {/*===== Result =====*/}
      <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
        <CheckIcon aria-hidden className="size-6" />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-h2 text-heading outline-none">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-body text-muted-foreground">{description}</p>

      {/*===== Tracking Code =====*/}
      {/* The code hangs from a dimension line, the way the department pages give a measure. */}
      <div className="mt-10 w-full rounded-lg border border-dashed border-border-strong bg-background-alt p-5 sm:p-8">
        <p className="text-body-sm text-muted-foreground">{m.form_receipt_code_label()}</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
          <div dir="ltr" className="flex flex-col">
            <span
              aria-hidden
              className="relative block h-3 border-x border-border-strong before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-border-strong"
            />
            <p className="mt-2 text-stat-sm tracking-wider break-all text-heading tabular-nums select-all sm:text-stat">
              {trackingCode}
            </p>
          </div>
          <Button type="button" variant="outline" size="lg" onClick={copyCode}>
            {copy === "copied" ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
            {copy === "copied" ? m.form_receipt_copied() : m.form_receipt_copy()}
          </Button>
        </div>
        <p className="mt-5 text-body-sm text-muted-foreground">
          {m.form_receipt_keep({ date: formatDate(createdAt, { dateStyle: "long", timeStyle: "short" }) })}
        </p>
        <p aria-live="polite" className={copy === "failed" ? "mt-2 text-body-sm text-destructive" : "sr-only"}>
          {copy === "copied" ? m.form_receipt_copied_announce() : copy === "failed" ? m.form_receipt_copy_failed() : ""}
        </p>
      </div>

      {/*===== Next =====*/}
      <div className="mt-10 flex flex-wrap gap-3">
        <SiteLink href="/" className={buttonVariants({ variant: "outline", size: "lg" })}>
          {m.form_receipt_home()}
          <ArrowLeftIcon data-icon="inline-end" className="ltr:-scale-x-100" />
        </SiteLink>
        <Button type="button" variant="ghost" size="lg" onClick={onAgain}>
          <RotateCcwIcon data-icon="inline-start" />
          {againLabel}
        </Button>
      </div>
    </div>
  );
}
