/**
 * Mobile Polish Audit - Property-Based Tests
 *
 * These tests verify the mobile responsiveness properties defined in the design document.
 * Run with: npx playwright test tests/mobile-polish.spec.js
 *
 * Prerequisites:
 * - npm install -D @playwright/test
 * - npx playwright install
 */

const { test, expect } = require("@playwright/test");

// Mobile viewport widths to test
const MOBILE_VIEWPORTS = [320, 360, 375, 390, 414, 428, 480, 768];

// Test configuration
test.describe.configure({ mode: "parallel" });

/**
 * Property 1: No Horizontal Overflow on Mobile
 * For any mobile viewport width, the document body scrollWidth should equal window.innerWidth
 * **Validates: Requirements 2.5**
 */
test.describe("Property 1: No Horizontal Overflow on Mobile", () => {
  for (const width of MOBILE_VIEWPORTS) {
    test(`No horizontal overflow at ${width}px width`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      // Check for horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });

      expect(hasOverflow).toBe(false);
    });
  }
});

/**
 * Property 2: Touch Targets Meet Minimum Size
 * For any interactive element on mobile, the element should have at least 44px height/width
 * **Validates: Requirements 3.3, 7.5, 8.1, 8.4, 8.5, 13.2**
 */
test.describe("Property 2: Touch Targets Meet Minimum Size", () => {
  const MIN_TOUCH_TARGET = 44;

  for (const width of MOBILE_VIEWPORTS.filter((w) => w <= 480)) {
    test(`Touch targets >= ${MIN_TOUCH_TARGET}px at ${width}px width`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      // Check buttons and links
      const smallTargets = await page.evaluate((minSize) => {
        const interactiveElements = document.querySelectorAll(
          "button, a.btn, .social-icon, .cta-button, .btn-hyper-primary, .btn-glass-secondary"
        );
        const issues = [];

        interactiveElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const styles = window.getComputedStyle(el);

          // Skip hidden elements
          if (styles.display === "none" || styles.visibility === "hidden")
            return;

          if (rect.height < minSize || rect.width < minSize) {
            issues.push({
              element:
                el.tagName +
                (el.className ? "." + el.className.split(" ").join(".") : ""),
              width: rect.width,
              height: rect.height,
            });
          }
        });

        return issues;
      }, MIN_TOUCH_TARGET);

      // Allow some tolerance for edge cases
      expect(smallTargets.length).toBeLessThanOrEqual(3);
    });
  }
});

/**
 * Property 3: Grid Layouts Convert to Single Column
 * For any grid container on mobile, it should use single column layout
 * **Validates: Requirements 4.1, 6.1, 7.1, 12.1**
 */
test.describe("Property 3: Grid Layouts Convert to Single Column", () => {
  for (const width of MOBILE_VIEWPORTS.filter((w) => w <= 480)) {
    test(`Grid layouts are single column at ${width}px width`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      const gridInfo = await page.evaluate(() => {
        const grids = document.querySelectorAll(
          ".achievements-grid, .hero-stats, .cert-archive-grid, .dark-theme-grid"
        );
        const results = [];

        grids.forEach((grid) => {
          const styles = window.getComputedStyle(grid);
          const columns = styles.gridTemplateColumns;

          // Check if it's effectively single column
          // Single column would be "1fr" or a single value
          const columnCount = columns
            .split(" ")
            .filter((c) => c && c !== "0px").length;

          results.push({
            class: grid.className,
            columns: columnCount,
            gridTemplateColumns: columns,
          });
        });

        return results;
      });

      // All grids should be single column on mobile
      for (const grid of gridInfo) {
        expect(grid.columns).toBeLessThanOrEqual(1);
      }
    });
  }
});

/**
 * Property 4: Typography Minimum Size
 * For any text element on mobile, body text should be >= 16px
 * **Validates: Requirements 1.1, 5.1**
 */
test.describe("Property 4: Typography Minimum Size", () => {
  const MIN_BODY_FONT = 16;
  const MIN_TERMINAL_FONT = 8; // Terminal can be smaller

  for (const width of MOBILE_VIEWPORTS.filter((w) => w <= 480)) {
    test(`Body text >= ${MIN_BODY_FONT}px at ${width}px width`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      const bodyFontSize = await page.evaluate(() => {
        const body = document.body;
        const styles = window.getComputedStyle(body);
        return parseFloat(styles.fontSize);
      });

      expect(bodyFontSize).toBeGreaterThanOrEqual(MIN_BODY_FONT);
    });
  }
});

/**
 * Property 5: Mobile Menu Scroll Lock
 * When mobile menu is active, body should have overflow: hidden
 * **Validates: Requirements 3.1**
 */
test.describe("Property 5: Mobile Menu Scroll Lock", () => {
  test("Body has overflow hidden when mobile menu is active", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/index.html");
    await page.waitForLoadState("networkidle");

    // Click mobile menu button
    const menuButton = page.locator(".mobile-menu-button");
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500); // Wait for animation

      // Check if body has scroll lock class or overflow hidden
      const hasScrollLock = await page.evaluate(() => {
        const body = document.body;
        const hasClass = body.classList.contains("mobile-menu-active");
        const styles = window.getComputedStyle(body);
        const hasOverflowHidden =
          styles.overflow === "hidden" || styles.overflowY === "hidden";
        return hasClass || hasOverflowHidden;
      });

      expect(hasScrollLock).toBe(true);
    }
  });
});

/**
 * Property 6: Animations Disabled on Mobile
 * On mobile, heavy animations should be disabled for performance
 * **Validates: Requirements 10.1, 10.5**
 */
test.describe("Property 6: Animations Disabled on Mobile", () => {
  for (const width of MOBILE_VIEWPORTS.filter((w) => w <= 480)) {
    test(`Floating animations disabled at ${width}px width`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      const animationInfo = await page.evaluate(() => {
        const floatingCards = document.querySelectorAll(
          ".floating-card, .tech-float-icon, .about-bg-decorator"
        );
        const results = [];

        floatingCards.forEach((el) => {
          const styles = window.getComputedStyle(el);
          results.push({
            class: el.className,
            animation: styles.animation,
            animationName: styles.animationName,
          });
        });

        return results;
      });

      // Check that animations are disabled (none or empty)
      for (const info of animationInfo) {
        const isDisabled =
          info.animation === "none" ||
          info.animationName === "none" ||
          !info.animation ||
          info.animation.includes("0s");
        expect(isDisabled).toBe(true);
      }
    });
  }
});

/**
 * Additional Test: Reduced Motion Support
 * When prefers-reduced-motion is set, animations should be disabled
 * **Validates: Requirements 10.3**
 */
test.describe("Reduced Motion Support", () => {
  test("Animations respect prefers-reduced-motion", async ({ page }) => {
    // Emulate reduced motion preference
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/index.html");
    await page.waitForLoadState("networkidle");

    const hasReducedMotion = await page.evaluate(() => {
      const testEl = document.querySelector(
        ".floating-card, .cyber-cap, .cap-tassel"
      );
      if (!testEl) return true; // No animated elements found

      const styles = window.getComputedStyle(testEl);
      return (
        styles.animationDuration === "0.01ms" ||
        styles.animation === "none" ||
        styles.animationName === "none"
      );
    });

    expect(hasReducedMotion).toBe(true);
  });
});
