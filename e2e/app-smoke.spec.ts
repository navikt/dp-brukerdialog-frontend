import { expect, test } from "@playwright/test";

test("appen starter under riktig basepath", async ({ page }) => {
  await page.goto("./");

  await expect(page.locator("body")).toBeVisible();
});
