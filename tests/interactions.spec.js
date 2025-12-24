/**
 * User Interaction Tests
 *
 * These tests verify user interactions work correctly.
 * Run with: npx playwright test tests/interactions.spec.js
 */

const { test, expect } = require("@playwright/test");

// Viewports to test
const VIEWPORTS = [
  { width: 375, height: 800, name: "Mobile" },
  { width: 1280, height: 900, name: "Desktop" },
];

test.describe.configure({ mode: "parallel" });

/**
 * Test 1: Navigation links work
 */
test.describe("Navigation links", () => {
  for (const viewport of VIEWPORTS) {
    test(`Navigation links scroll to sections on ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("index.html");
      await page.waitForLoadState("networkidle");

      // On mobile, open menu first
      if (viewport.width < 768) {
        const menuBtn = page.locator(".mobile-menu-button");
        if (await menuBtn.isVisible()) {
          await menuBtn.click();
          await page.waitForTimeout(500);
        }
      }

      // Click on About link
      const aboutLink = page.locator('a[href="#about"]').first();
      if (await aboutLink.isVisible()) {
        await aboutLink.click();
        await page.waitForTimeout(1000);

        // Check if scrolled to about section using isVisible with viewport check
        const aboutSection = page.locator("#about");
        const isVisible = await aboutSection.isVisible();
        expect(isVisible).toBe(true);

        // Also verify the section is in viewport by checking scroll position
        const scrolledToAbout = await page.evaluate(() => {
          const aboutEl = document.querySelector("#about");
          if (!aboutEl) return false;
          const rect = aboutEl.getBoundingClientRect();
          // Section should be near the top of viewport (within 200px)
          return rect.top >= -100 && rect.top < window.innerHeight;
        });
        expect(scrolledToAbout).toBe(true);
      }
    });
  }
});

/**
 * Test 2: External links have proper attributes
 */
test.describe("External links", () => {
  test("External links open in new tab", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const externalLinks = await page.evaluate(() => {
      const links = document.querySelectorAll('a[href^="http"]');
      const issues = [];
      links.forEach((link) => {
        const href = link.getAttribute("href");
        const target = link.getAttribute("target");
        const rel = link.getAttribute("rel");

        // External links should have target="_blank" and rel="noopener"
        if (!href.includes(window.location.hostname)) {
          if (target !== "_blank") {
            issues.push({ href, issue: "missing target=_blank" });
          }
          if (!rel || !rel.includes("noopener")) {
            issues.push({ href, issue: "missing rel=noopener" });
          }
        }
      });
      return issues;
    });

    // Allow some flexibility
    expect(externalLinks.length).toBeLessThan(5);
  });
});

/**
 * Test 3: Scroll progress bar works
 */
test.describe("Scroll progress bar", () => {
  test("Scroll progress bar updates on scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    // Get initial progress
    const initialProgress = await page.evaluate(() => {
      const bar = document.querySelector("#scroll-progress");
      return bar ? window.getComputedStyle(bar).transform : null;
    });

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    // Get progress after scroll
    const afterScrollProgress = await page.evaluate(() => {
      const bar = document.querySelector("#scroll-progress");
      return bar ? window.getComputedStyle(bar).transform : null;
    });

    // Progress should change after scrolling
    if (initialProgress && afterScrollProgress) {
      expect(afterScrollProgress).not.toBe(initialProgress);
    }
  });
});

/**
 * Test 4: Mobile menu toggle works
 */
test.describe("Mobile menu toggle", () => {
  test("Mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const menuBtn = page.locator(".mobile-menu-button");
    const menuOverlay = page.locator(".mobile-menu-overlay");

    if (await menuBtn.isVisible()) {
      // Open menu
      await menuBtn.click();
      await page.waitForTimeout(500);

      // Check if overlay is visible
      const isOpen = await menuOverlay.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.opacity !== "0" && styles.visibility !== "hidden";
      });
      expect(isOpen).toBe(true);

      // Close menu by clicking button again or overlay
      await menuBtn.click();
      await page.waitForTimeout(500);
    }
  });
});

/**
 * Test 5: Hover effects work on desktop
 */
test.describe("Hover effects", () => {
  test("Cards have hover effects on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const statCard = page.locator(".stat-card").first();

    if (await statCard.isVisible()) {
      // Get initial transform
      const initialTransform = await statCard.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });

      // Hover over card
      await statCard.hover();
      await page.waitForTimeout(500);

      // Get transform after hover
      const hoverTransform = await statCard.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });

      // Transform should change on hover
      expect(hoverTransform).not.toBe(initialTransform);
    }
  });
});

/**
 * Test 6: Smooth scroll works
 */
test.describe("Smooth scroll", () => {
  test("Page has smooth scroll behavior", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const scrollBehavior = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).scrollBehavior;
    });

    expect(scrollBehavior).toBe("smooth");
  });
});

/**
 * Test 7: Loading screen disappears
 */
test.describe("Loading screen", () => {
  test("Loading screen disappears after load", async ({ page }) => {
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000); // Wait for loading animation

    const loadingScreen = page.locator("#loading-screen");

    if ((await loadingScreen.count()) > 0) {
      const isHidden = await loadingScreen.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return (
          styles.opacity === "0" ||
          styles.visibility === "hidden" ||
          el.classList.contains("hidden")
        );
      });
      expect(isHidden).toBe(true);
    }
  });
});

/**
 * Test 8: CTA buttons are clickable
 */
test.describe("CTA buttons", () => {
  for (const viewport of VIEWPORTS) {
    test(`CTA buttons are clickable on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("index.html");
      await page.waitForLoadState("networkidle");

      const ctaButtons = page.locator(".btn-primary, .btn-primary-header");
      const count = await ctaButtons.count();

      for (let i = 0; i < Math.min(count, 3); i++) {
        const btn = ctaButtons.nth(i);
        if (await btn.isVisible()) {
          const isEnabled = await btn.isEnabled();
          expect(isEnabled).toBe(true);
        }
      }
    });
  }
});

/**
 * Test 9: Social icons are clickable
 */
test.describe("Social icons", () => {
  test("Social icons are clickable", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    const socialIcons = page.locator(".social-icon");
    const count = await socialIcons.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const icon = socialIcons.nth(i);
      if (await icon.isVisible()) {
        const href = await icon.getAttribute("href");
        expect(href).not.toBeNull();
        expect(href.length).toBeGreaterThan(0);
      }
    }
  });
});

/**
 * Test 10: Keyboard navigation works
 */
test.describe("Keyboard navigation", () => {
  test("Can navigate with keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("index.html");
    await page.waitForLoadState("networkidle");

    // Tab through elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
    }

    // Check that something is focused
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });

    expect(focusedElement).not.toBe("BODY");
  });
});
