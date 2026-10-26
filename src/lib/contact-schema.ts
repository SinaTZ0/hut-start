import { z } from "zod";

import { toLatinDigits } from "#/lib/digits";
import { m } from "#/paraglide/messages";

/*===== Contact Fields =====*/
// Optional contact details on the public forms, shared by their browser schemas and the API's validation. A blank
// field means "not given" and comes out as `undefined`. Not `.server`: the forms use these too.

// Any of 0912…, 912…, +98912…, 0098912… or 98912…, once the digits are Latin and the separators gone.
const MOBILE_FORMS = /^(?:\+98|0098|98|0)?(9\d{9})$/;
const MOBILE_SEPARATORS = /[\s\-()]/g;
const email = z.email();

/** Brings an Iranian mobile number to `09xxxxxxxxx`; anything that isn't one is returned cleaned but unchanged. */
export function normalizeMobile(value: string): string {
  const cleaned = toLatinDigits(value).replace(MOBILE_SEPARATORS, "");
  const match = MOBILE_FORMS.exec(cleaned);
  return match ? `0${match[1]}` : cleaned;
}

/**
 * An optional Iranian mobile number. Accepts Persian, Arabic or Latin digits, spaces, dashes and the +98 prefix, and
 * stores the number as `09xxxxxxxxx`.
 */
export function optionalMobile() {
  return z
    .string()
    .overwrite(normalizeMobile)
    .refine((value) => value === "" || /^09\d{9}$/.test(value), { error: () => m.form_error_mobile_invalid() })
    .transform((value) => value || undefined);
}

/** An optional e-mail address, trimmed. Kept byte-exact otherwise: no Persian text normalization. */
export function optionalEmail() {
  return z
    .string()
    .trim()
    .refine((value) => value === "" || email.safeParse(value).success, {
      error: () => m.form_error_email_invalid(),
    })
    .transform((value) => value || undefined);
}
