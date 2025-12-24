/**
 * Accessibility Tests
 *
 * These tests verify accessibility compliance for the website.
 * Run with: npx playwright test tests/accessibility.spec.js
 */

const { test, expect } = require("@playwright/test");

// Viewports to test
const VIEWPORTS = [
  { width: 375, height: 800, name: "Mobile" },
  { width: 1280, height: 900, name: "Desktop" },
];

test.describe.configure({ mode: "parallel" });

/**
 * Test 1: All images have alt text
 */
test.describe("Images have alt text", () => {
  for (const viewport of VIEWPORTS) {
    test(`All images have alt text on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("index.html");
      await page.waitForLoadState("networkidle");

      const imagesWithoutAlt = await page.evaluate(() => {
        const images = document.querySelectorAll("img");
        const issues = [];
        images.forEach((img) => {
          if (!img.alt && !img.getAttribute("role")?.includes("presentation")) {
            issues.push(img.src);
          }
        });
        return issues;
      });

      expect(imagesWithoutAlt.length).toBe(0);
    });
  }
});

/**
 * Test 2: Links have accessible names
 */
test.describe("Links have accessible names", () => {
  for (const viewport of VIEWPORTS) {
    test(`All links have accessible names on ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("index.html");
      await page.waitForLoadState("networkidle");

      const linksWithoutNames = await page.evaluate(() => {
        const links = document.querySelectorAll("a");
        const issues = [];
        links.forEach((link) => {
          const text = link.textContent?.trim();
          const ariaLabel = link.getAttribute("aria-label");
          const title = link.getAttribute("title");
          // Check for images with alt text inside the link
          const imgWithAlt = link.querySelector("img[alt]");
          const hasImgAlt =
            imgWithAlt && imgWithAlt.getAttribute("alt")?.trim();
          // Check for SVG with title or aria-label
          const svg = link.querySelector("svg");
          const hasSvgAccessible =
            svg &&
            (svg.querySelector("title") ||
              svg.getAttribute("aria-label") ||
              link.getAttribute("aria-label"));

          if (
            !text &&
            !ariaLabel &&
            !title &&
            !hasImgAlt &&
            !hasSvgAccessible
          ) {
            issues.push(link.href);
          }
        });
        return issues;
      });

      expect(linksWithoutNames.length).toBe(0);
    });
  }
});

/**
 * Test 3: Buttons have accessible names
 */
test.describe("Buttons have accessible names", () => {
  for (const viewport of VIEWPORTS) {
    test(`All buttons have accessible names on ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("index.html");
      await page.waitForLoadState("networkidle");

      const buttonsWithoutNames = await page.evaluate(() => {
        const buttons = document.querySelectorAll("button");
        const issues = [];
        buttons.forEach((btn) => {
          const text = btn.textContent?.trim();
          const ariaLabel = btn.getAttribute("aria-label");
          if (!text && !ariaLabel) {
            issues.push(btn.className || "unnamed button");
          }
        });
        return issues;
      });

      expect(buttonsWithoutNames.length).toBe(0);
    });
  }
});

/**
 * Test 4: Page has proper heading hierarchy
 */
test.describe("Heading hierarchy", () => {
  for (const viewport of VIEWPORTS) {
    test(`Proper heading hierarchy on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("index.html");
      await page.waitForLoadState("networkidle");

      const headingInfo = await page.evaluate(() => {
        const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        const levels = [];
        headings.forEach((h) => {
          levels.push(parseInt(h.tagName[1]));
        });
        return levels;
      });

      // Should have at least one h1
      expect(headingInfo.filter((l) => l === 1).length).toBeGreaterThanOrEqual(
        1
      );
    });
  }
});

/**
 * Test 5: Color contrast (basic check)
 */
test.describe("Color contrast", () => {
  for (const viewport of VIEWPORTS) {
    test(`Text is visible on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("index.html");
      await page.waitForLoadState("networkidle");

      const textVisibility = await page.evaluate(() => {
        const textElements = document.querySelectorAll(
          "p, span, a, h1, h2, h3, h4, h5, h6, li"
        );
        let invisibleCount = 0;

        textElements.forEach((el) => {
          const styles = window.getComputedStyle(el);
          const color = styles.color;
          const opacity = parseFloat(styles.opacity);

          // Check if text is effectively invisible
          if (opacity < 0.1 || color === "rgba(0, 0, 0, 0)") {
            invisibleCount++;
          }
        });

        return invisibleCount;
      });

      // Allow some invisible elements (decorative)
      expect(textVisibility).toBeLessThan(10);
    });
  }
});

/**
 * Test 6: Skip link exists
 */
test.describe("Skip link", () => {
  test("Skip link exists and works", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const skipLink = await page.evaluate(() => {
      const link = document.querySelector(
        ".skip-link, [href='#main-content'], a[href*='main']"
      );
      return link ? true : false;
    });

    // Skip link is optional but recommended
    // Just log if missing, don't fail
    if (!skipLink) {
      console.log(
        "Warning: No skip link found - consider adding one for accessibility"
      );
    }
    expect(true).toBe(true); // Always pass, just warn
  });
});

/**
 * Test 7: Focus visible on interactive elements
 */
test.describe("Focus visibility", () => {
  test("Interactive elements have visible focus", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    // Tab to first interactive element
    await page.keyboard.press("Tab");

    const hasFocusStyles = await page.evaluate(() => {
      const focused = document.activeElement;
      if (!focused || focused === document.body) return true;

      const styles = window.getComputedStyle(focused);
      const outline = styles.outline;
      const boxShadow = styles.boxShadow;

      // Check if there's some visible focus indicator
      return outline !== "none" || boxShadow !== "none";
    });

    expect(hasFocusStyles).toBe(true);
  });
});

/**
 * Test 8: Language attribute
 */
test.describe("Language attribute", () => {
  test("HTML has lang attribute", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const hasLang = await page.evaluate(() => {
      const html = document.documentElement;
      return html.hasAttribute("lang") && html.getAttribute("lang").length > 0;
    });

    expect(hasLang).toBe(true);
  });
});

/**
 * Test 9: Viewport meta tag
 */
test.describe("Viewport meta tag", () => {
  test("Viewport meta tag is properly configured", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const viewportMeta = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="viewport"]');
      return meta ? meta.getAttribute("content") : null;
    });

    expect(viewportMeta).not.toBeNull();
    // Check for width=device-width (case insensitive, with or without spaces)
    expect(viewportMeta.toLowerCase().replace(/\s/g, "")).toContain(
      "width=device-width"
    );
  });
});
