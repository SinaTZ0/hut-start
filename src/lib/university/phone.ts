import { formatNumber } from "#/lib/locale";

/*===== Phone Numbers =====*/

/** Each digit in the page's digits, kept as written: an extension «526» as «۵۲۶». */
export function formatDigits(value: string): string {
  return value.replace(/\d/g, (digit) => formatNumber(Number(digit)));
}

/** `08138411526` as «۰۸۱-۳۸۴۱۱۵۲۶»: the area code apart, in the page's digits, like the site's own number. */
export function formatPhone(phone: string): string {
  return formatDigits(phone.replace(/^(0\d{2})(\d+)$/, "$1-$2"));
}
