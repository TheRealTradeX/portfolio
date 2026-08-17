/**
 * Regenerates public/resume.pdf from docs/resume-print.html.
 * Run after editing the resume template: `npm run resume:pdf`.
 * Requires the Playwright chromium browser (`npx playwright install chromium`).
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("file://" + join(root, "docs", "resume-print.html").replace(/\\/g, "/"));
await page.pdf({
  path: join(root, "public", "resume.pdf"),
  format: "Letter",
  printBackground: true,
  margin: { top: "0.55in", bottom: "0.55in", left: "0.65in", right: "0.65in" },
});
await browser.close();
console.log("public/resume.pdf regenerated from docs/resume-print.html");
