import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import assert from "node:assert/strict";
const out = "qa-results";
await mkdir(out, { recursive: true });
const candidates = [
  process.env.BROWSER_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].filter(Boolean);
const browser = await chromium.launch({
  executablePath: candidates.find((p) => existsSync(p)),
  headless: true,
});
const report = {
  routes: [],
  viewports: [],
  accessibility: [],
  consoleErrors: [],
  checks: [],
};
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const mediaRequests = [];
page.on("request", (request) => {
  if (/\.(mp4|webm)(?:\?|$)/i.test(request.url()))
    mediaRequests.push(request.url());
});
page.on("response", (response) => {
  if (response.status() >= 400)
    console.log("HTTP", response.status(), response.url());
});
page.on("pageerror", (error) => report.consoleErrors.push(error.message));
page.on("console", (msg) => {
  if (msg.type() === "error") report.consoleErrors.push(msg.text());
});
const base = process.env.QA_URL || "http://127.0.0.1:3000";
try {
  for (const route of [
    "/",
    "/work/point-of-sale/",
    "/work/student-performance/",
  ]) {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 200);
    const sourceRepositories = {
      "/work/point-of-sale/": "https://github.com/Rawad-01/mini-market-pos",
      "/work/student-performance/":
        "https://github.com/Rawad-01/student-performance-clustering",
    };
    if (sourceRepositories[route]) {
      const sourceLink = page.getByRole("link", {
        name: "View source on GitHub",
      });
      assert.equal(await sourceLink.count(), 1);
      assert.equal(
        await sourceLink.getAttribute("href"),
        sourceRepositories[route],
      );
    }
    await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((img) => img.decode());
    }
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    report.accessibility.push({
      route,
      violations: axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => n.target),
      })),
    });
    assert.equal(await page.locator("h1").count(), 1);
    report.routes.push({ route, status: 200 });
    for (const width of [320, 768]) {
      await page.setViewportSize({ width, height: 900 });
      const actual = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      assert.ok(actual <= width + 1, `Overflow on ${route} at ${width}`);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  await page.goto(base);
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => document.fonts.ready);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `${out}/hero-${width}.png` });
    const layout = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    report.viewports.push({ width, ...layout });
    assert.ok(layout.document <= width + 1, `Horizontal overflow at ${width}`);
    await page.screenshot({ path: `${out}/home-${width}.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("button", { name: "02 / Stories" }).focus();
  await page.keyboard.press("Enter");
  assert.equal(
    await page
      .getByRole("button", { name: "02 / Stories" })
      .getAttribute("aria-pressed"),
    "true",
  );
  await page.getByRole("button", { name: "01 / Systems" }).click();
  report.checks.push("Signature responds to keyboard and pointer.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page
      .locator(".core")
      .evaluate((el) => getComputedStyle(el).transitionDuration),
    "0s",
  );
  report.checks.push("Reduced motion disables animation.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Menu" }).click();
  assert.equal(await page.locator("#main-nav").isVisible(), true);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Creative lab" })
    .click();
  assert.equal(await page.locator("#main-nav").isVisible(), false);
  report.checks.push("Mobile navigation opens, follows anchors, and closes.");
  await page.setViewportSize({ width: 1440, height: 1000 });
  assert.equal(await page.locator("video").count(), 0);
  assert.equal(mediaRequests.length, 0);
  report.checks.push(
    "No player or MP4/WebM network request before film activation.",
  );
  if (process.env.QA_MEDIA !== "1") {
    assert.equal(
      await page.getByRole("link", { name: /Request a viewing link/ }).count(),
      2,
    );
    assert.equal(
      await page.getByRole("button", { name: /^Watch / }).count(),
      0,
    );
    report.checks.push(
      "Source-only build offers email viewing requests instead of broken players.",
    );
  }
  if (process.env.QA_MEDIA === "1") {
    for (const title of ["The Shape of Tomorrow", "Oman, in Motion"]) {
      const trigger = page.getByRole("button", { name: `Watch ${title}` });
      await trigger.click();
      await page.waitForFunction(
        () => document.querySelector("video")?.readyState >= 1,
      );
      const metadata = await page.locator("video").evaluate((v) => ({
        duration: v.duration,
        width: v.videoWidth,
        height: v.videoHeight,
        paused: v.paused,
      }));
      assert.equal(metadata.width / metadata.height, 16 / 9);
      assert.equal(metadata.paused, true);
      await page.locator("video").evaluate((v) => v.play());
      await page.waitForFunction(
        () => (document.querySelector("video")?.currentTime ?? 0) > 0,
        undefined,
        { timeout: 15000 },
      );
      assert.ok(await page.locator("video").evaluate((v) => v.currentTime > 0));
      report.checks.push({
        film: title,
        metadata,
        playback: "advanced successfully",
      });
      await page.keyboard.press("Escape");
      assert.equal(await page.locator("dialog").isVisible(), false);
      assert.equal(
        await trigger.evaluate((el) => el === document.activeElement),
        true,
      );
    }
  }
  const links = await page
    .locator("a[href]")
    .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
  for (const href of [...new Set(links)]) {
    if (href.startsWith("#"))
      assert.equal(await page.locator(`[id="${href.slice(1)}"]`).count(), 1);
    else if (href.startsWith("/"))
      assert.equal(
        (await page.request.get(base + href.split("#")[0])).status(),
        200,
      );
  }

  report.checks.push(
    "Local targets exist. Case-study source links match the verified public repositories.",
  );
  const plain = await page.locator("body").innerText();
  assert.ok(!/I\?m|Systems \? Stories|Bachelor\?s/.test(plain));
  report.checks.push("No corrupted display punctuation.");
} catch (error) {
  report.failure = error.stack;
  process.exitCode = 1;
} finally {
  await writeFile(
    `${out}/browser-report.json`,
    JSON.stringify(report, null, 2),
  );
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}
if (report.accessibility.some((r) => r.violations.length)) process.exitCode = 1;
if (report.consoleErrors.length) process.exitCode = 1;
