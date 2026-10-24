import { expect, test } from "@playwright/test";

test("the home page renders and links to sign-in", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // Exact: the utility bar's «ورود به پرتال» (the university portal) contains the same word.
  await page.getByRole("link", { name: "ورود", exact: true }).click();
  await expect(page).toHaveURL(/\/auth$/);
});
