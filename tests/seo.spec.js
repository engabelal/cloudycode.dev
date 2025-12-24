/**
 * SEO Tests
 *
 * These tests verify SEO-related aspects of the website.
 * Run with: npx playwright test tests/seo.spec.js
 */

const { test, expect } = require("@playwright/test");

test.describe.configure({ mode: "parallel" });

/**
 * Test 1: Page has title
 */
test.describe("Page title", () => {
  test("Page has a title", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title.length).toBeLessThan(70); // SEO best practice
  });
});

/**
 * Test 2: Meta description exists
 */
test.describe("Meta description", () => {
  test("Page has meta description", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const description = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="description"]');
      return meta ? meta.getAttribute("content") : null;
    });

    expect(description).not.toBeNull();
    expect(description.length).toBeGreaterThan(50);
    expect(description.length).toBeLessThan(160); // SEO best practice
  });
});

/**
 * Test 3: Open Graph tags
 */
test.describe("Open Graph tags", () => {
  test("Page has Open Graph tags", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const ogTags = await page.evaluate(() => {
      return {
        title: document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute("content"),
        description: document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute("content"),
        image: document
          .querySelector('meta[property="og:image"]')
          ?.getAttribute("content"),
        url: document
          .querySelector('meta[property="og:url"]')
          ?.getAttribute("content"),
      };
    });

    expect(ogTags.title).not.toBeNull();
    expect(ogTags.description).not.toBeNull();
    expect(ogTags.image).not.toBeNull();
  });
});

/**
 * Test 4: Twitter Card tags
 */
test.describe("Twitter Card tags", () => {
  test("Page has Twitter Card tags", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const twitterTags = await page.evaluate(() => {
      return {
        card: document
          .querySelector('meta[name="twitter:card"]')
          ?.getAttribute("content"),
        title: document
          .querySelector('meta[name="twitter:title"]')
          ?.getAttribute("content"),
        description: document
          .querySelector('meta[name="twitter:description"]')
          ?.getAttribute("content"),
      };
    });

    expect(twitterTags.card).not.toBeNull();
    expect(twitterTags.title).not.toBeNull();
  });
});

/**
 * Test 5: Canonical URL
 */
test.describe("Canonical URL", () => {
  test("Page has canonical URL", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const canonical = await page.evaluate(() => {
      const link = document.querySelector('link[rel="canonical"]');
      return link ? link.getAttribute("href") : null;
    });

    expect(canonical).not.toBeNull();
  });
});

/**
 * Test 6: Structured data (JSON-LD)
 */
test.describe("Structured data", () => {
  test("Page has structured data", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const structuredData = await page.evaluate(() => {
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      return scripts.length;
    });

    expect(structuredData).toBeGreaterThan(0);
  });
});

/**
 * Test 7: Robots meta tag
 */
test.describe("Robots meta tag", () => {
  test("Page allows indexing", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const robots = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="robots"]');
      return meta ? meta.getAttribute("content") : null;
    });

    // Should allow indexing (not have noindex)
    if (robots) {
      expect(robots).not.toContain("noindex");
    }
  });
});

/**
 * Test 8: H1 tag exists and is unique
 */
test.describe("H1 tag", () => {
  test("Page has exactly one H1", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const h1Count = await page.evaluate(() => {
      return document.querySelectorAll("h1").length;
    });

    expect(h1Count).toBe(1);
  });
});

/**
 * Test 9: Internal links work
 */
test.describe("Internal links", () => {
  test("Internal anchor links have targets", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const brokenAnchors = await page.evaluate(() => {
      const anchors = document.querySelectorAll('a[href^="#"]');
      const broken = [];
      anchors.forEach((a) => {
        const href = a.getAttribute("href");
        if (href && href !== "#" && href.length > 1) {
          const target = document.querySelector(href);
          if (!target) {
            broken.push(href);
          }
        }
      });
      return broken;
    });

    expect(brokenAnchors.length).toBe(0);
  });
});

/**
 * Test 10: Favicon exists
 */
test.describe("Favicon", () => {
  test("Page has favicon", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const favicon = await page.evaluate(() => {
      const link = document.querySelector(
        'link[rel="icon"], link[rel="shortcut icon"]'
      );
      return link ? link.getAttribute("href") : null;
    });

    expect(favicon).not.toBeNull();
  });
});

/**
 * Test 11: Manifest file
 */
test.describe("Web App Manifest", () => {
  test("Page has manifest", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const manifest = await page.evaluate(() => {
      const link = document.querySelector('link[rel="manifest"]');
      return link ? link.getAttribute("href") : null;
    });

    expect(manifest).not.toBeNull();
  });
});

/**
 * Test 12: Theme color
 */
test.describe("Theme color", () => {
  test("Page has theme color", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const themeColor = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="theme-color"]');
      return meta ? meta.getAttribute("content") : null;
    });

    expect(themeColor).not.toBeNull();
  });
});
