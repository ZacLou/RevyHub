import { test, expect } from "@playwright/test";

test.describe("Multi-Explorer Link Generator", () => {
  test("generates explorer links", async ({ page }) => {
    await page.goto("/tools/multi-explorer-link-generator");
    await expect(page.getByText("No links generated yet")).toBeVisible();

    await page.fill('input[type="text"]', "GAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB");
    await page.click("button:has-text('Generate Links')");

    await expect(page.getByText("Explorer Links")).toBeVisible();
  });
});
