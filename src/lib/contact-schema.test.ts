import { describe, expect, it } from "vitest";

import { optionalMobile } from "#/lib/contact-schema";

/*===== Mobile Numbers =====*/
// FORMS.md → Shared rules: any digits, spaces and dashes are fine, and the number is stored one way.

describe("optionalMobile", () => {
  const mobile = optionalMobile();

  it("stores Persian digits, separators and the +98 prefix as 09xxxxxxxxx", () => {
    expect(mobile.parse("۰۹۱۲ ۱۲۳-۴۵۶۷")).toBe("09121234567");
    expect(mobile.parse("+98 912 123 4567")).toBe("09121234567");
  });

  it("treats a blank field as not given and rejects a landline", () => {
    expect(mobile.parse("  ")).toBeUndefined();
    expect(mobile.safeParse("081 3822 1234").success).toBe(false);
  });
});
