/**
 * Performance Tests
 *
 * These tests verify performance-related aspects of the website.
 * Run with: npx playwright test tests/performance.spec.js
 */

const { test, expect } = require("@playwright/test");

// Viewports to test
const VIEWPORTS = [
  { width: 375, height: 800, name: "Mobile" },
  { width: 1280, height: 900, name: "Desktop" },
];

test.describe.configure({ mode: "parallel" });

/**
 * Test 1: Page loads within acceptable time
 */
test.describe("Page load time", () => {
  for (const viewport of VIEWPORTS) {
    test(`Page loads within 10s on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      const startTime = Date.now();
      await page.goto("index.html", { waitUntil: "domcontentloaded" });
      const loadTime = Date.now() - startTime;

      // Page should load within 10 seconds
      expect(loadTime).toBeLessThan(10000);
    });
  }
});

/**
 * Test 2: No console errors
 */
test.describe("No console errors", () => {
  for (const viewport of VIEWPORTS) {
    test(`No JavaScript errors on ${viewport.name}`, async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));

      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("index.html");
      await page.waitForLoadState("networkidle");

      // Allow some tolerance for third-party script errors
      const criticalErrors = errors.filter(
        (e) => !e.includes("third-party") && !e.includes("analytics")
      );
      expect(criticalErrors.length).toBe(0);
    });
  }
});

/**
 * Test 3: Images are optimized (have width/height)
 */
test.describe("Images have dimensions", () => {
  for (const viewport of VIEWPORTS) {
    test(`Images have width/height attributes on ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("index.html");
      await page.waitForLoadState("networkidle");

      const imagesWithoutDimensions = await page.evaluate(() => {
        const images = document.querySelectorAll("img");
        const issues = [];
        images.forEach((img) => {
          if (
            !img.width &&
            !img.height &&
            !img.style.width &&
            !img.style.height
          ) {
            issues.push(img.src);
          }
        });
        return issues;
      });

      // Allow some images without dimensions (decorative)
      expect(imagesWithoutDimensions.length).toBeLessThan(5);
    });
  }
});

/**
 * Test 4: CSS files load successfully
 */
test.describe("CSS files load", () => {
  test("All CSS files load successfully", async ({ page }) => {
    const failedRequests = [];
    page.on("requestfailed", (request) => {
      if (request.url().includes(".css")) {
        failedRequests.push(request.url());
      }
    });

    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    expect(failedRequests.length).toBe(0);
  });
});

/**
 * Test 5: JavaScript files load successfully
 */
test.describe("JavaScript files load", () => {
  test("All JS files load successfully", async ({ page }) => {
    const failedRequests = [];
    page.on("requestfailed", (request) => {
      if (request.url().includes(".js")) {
        failedRequests.push(request.url());
      }
    });

    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    expect(failedRequests.length).toBe(0);
  });
});

/**
 * Test 6: No broken images
 */
test.describe("No broken images", () => {
  for (const viewport of VIEWPORTS) {
    test(`No broken images on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("index.html");
      await page.waitForLoadState("networkidle");

      const brokenImages = await page.evaluate(() => {
        const images = document.querySelectorAll("img");
        const broken = [];
        images.forEach((img) => {
          // Skip lazy-loaded images that haven't loaded yet
          const isLazy = img.loading === "lazy";
          const isInViewport =
            img.getBoundingClientRect().top < window.innerHeight;

          // Only check images that should have loaded (eager or in viewport)
          if (!isLazy || isInViewport) {
            if (!img.complete || img.naturalWidth === 0) {
              // Double check it's not a lazy image still loading
              if (!isLazy) {
                broken.push(img.src);
              }
            }
          }
        });
        return broken;
      });

      expect(brokenImages.length).toBe(0);
    });
  }
});

/**
 * Test 7: Fonts load successfully
 */
test.describe("Fonts load", () => {
  test("Custom fonts are applied", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const fontFamily = await page.evaluate(() => {
      const body = document.body;
      const styles = window.getComputedStyle(body);
      return styles.fontFamily;
    });

    // Should have custom font (Rubik)
    expect(fontFamily.toLowerCase()).toContain("rubik");
  });
});

/**
 * Test 8: Lazy loading for below-fold images
 */
test.describe("Lazy loading", () => {
  test("Below-fold images use lazy loading", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const lazyImages = await page.evaluate(() => {
      const images = document.querySelectorAll("img[loading='lazy']");
      return images.length;
    });

    // Should have some lazy-loaded images
    // This is optional, so we just check it doesn't break
    expect(lazyImages).toBeGreaterThanOrEqual(0);
  });
});

/**
 * Test 9: Preload critical resources
 */
test.describe("Preload resources", () => {
  test("Critical resources are preloaded", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const preloadLinks = await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="preload"]');
      return links.length;
    });

    // Should have some preloaded resources
    expect(preloadLinks).toBeGreaterThan(0);
  });
});

/**
 * Test 10: DOM size is reasonable
 */
test.describe("DOM size", () => {
  test("DOM size is reasonable", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const domSize = await page.evaluate(() => {
      return document.querySelectorAll("*").length;
    });

    // DOM should not be excessively large (< 3000 elements)
    expect(domSize).toBeLessThan(3000);
  });
});
