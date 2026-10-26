import { toLatinDigits } from "#/lib/digits";

/*===== Tracking Code =====*/
// The code a visitor keeps after sending a public form: `HUT-` + the form's letter + the Jalali year's last two digits
// + 8 random characters, e.g. `HUT-C057K4Q9M2X`. The characters are Crockford's base32 alphabet, which leaves out
// I, L, O and U, so a code read aloud or copied by hand can't mix up 1/I/L or 0/O.

/** The form a code belongs to: `C` for complaints and feedback, `M` for an online consultation. */
export type TrackingCodeKind = "C" | "M";

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const RANDOM_LENGTH = 8;

// A fixed locale on purpose: the year is part of an identifier, not text shown in the visitor's language. Tehran's
// time zone, so the year turns at Nowruz in Iran whatever the server's zone.
const jalaliYear = new Intl.DateTimeFormat("en-u-ca-persian-nu-latn", { year: "numeric", timeZone: "Asia/Tehran" });

/** Matches a well-formed code, after `normalizeTrackingCode`. */
export const TRACKING_CODE_PATTERN = /^HUT-[CM]\d{2}[0-9A-HJKMNP-TV-Z]{8}$/;

/** Creates a new random code for a submission made at `now`. Unique only by chance: the table's unique index decides. */
export function createTrackingCode({ kind, now = new Date() }: { kind: TrackingCodeKind; now?: Date }): string {
  const year = jalaliYear.format(now).replace(/\D/g, "").slice(-2);
  // 32 divides 256, so taking the low 5 bits of each byte picks every character equally often.
  const bytes = crypto.getRandomValues(new Uint8Array(RANDOM_LENGTH));
  const random = Array.from(bytes, (byte) => ALPHABET[byte & 31]).join("");
  return `HUT-${kind}${year}${random}`;
}

/** Brings a code typed by hand to its stored form: trimmed, upper case, Latin digits, no inner spaces. */
export function normalizeTrackingCode(value: string): string {
  return toLatinDigits(value).replace(/\s/g, "").toUpperCase();
}
