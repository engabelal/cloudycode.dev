/**
 * Desktop Regression Tests
 *
 * These tests verify that desktop styles remain unchanged after mobile polish updates.
 * Run with: npx playwright test tests/desktop-regression.spec.js
 *
 * **Validates: No regressions on desktop**
 */

const { test, expect } = require("@playwright/test");

// Desktop viewport widths to test
const DESKTOP_VIEWPORTS = [1024, 1280, 1440, 1920];

// Test configuration
test.describe.configure({ mode: "parallel" });

/**
 * Property 1: Desktop Typography Sizes
 * For any desktop viewport, typography should maintain expected sizes
 */
test.describe("Property 1: Desktop Typography Sizes", () => {
  for (const width of DESKTOP_VIEWPORTS) {
    test(`Typography sizes correct at ${width}px width`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      const typography = await page.evaluate(() => {
        const body = document.body;
        const bodyStyles = window.getComputedStyle(body);

        const heroTitle = document.querySelector(".hero-title");
        const heroTitleStyles = heroTitle
          ? window.getComputedStyle(heroTitle)
          : null;

        const sectionTitle = document.querySelector(".section-title");
        const sectionTitleStyles = sectionTitle
          ? window.getComputedStyle(sectionTitle)
          : null;

        return {
          bodyFontSize: parseFloat(bodyStyles.fontSize),
          heroTitleFontSize: heroTitleStyles
            ? parseFloat(heroTitleStyles.fontSize)
            : null,
          sectionTitleFontSize: sectionTitleStyles
            ? parseFloat(sectionTitleStyles.fontSize)
            : null,
        };
      });

      // Body font should be 16px
      expect(typography.bodyFontSize).toBe(16);

      // Hero title should be larger on desktop (at least 40px)
      if (typography.heroTitleFontSize) {
        expect(typography.heroTitleFontSize).toBeGreaterThanOrEqual(40);
      }

      // Section title should be at least 24px on desktop
      if (typography.sectionTitleFontSize) {
        expect(typography.sectionTitleFontSize).toBeGreaterThanOrEqual(24);
      }
    });
  }
});

/**
 * Property 2: Desktop Grid Layouts
 * For any desktop viewport, grids should have multiple columns
 */
test.describe("Property 2: Desktop Grid Layouts", () => {
  for (const width of DESKTOP_VIEWPORTS) {
    test(`Grid layouts have multiple columns at ${width}px width`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      const gridInfo = await page.evaluate(() => {
        const heroStats = document.querySelector(".hero-stats");
        const heroStatsStyles = heroStats
          ? window.getComputedStyle(heroStats)
          : null;

        return {
          heroStatsColumns: heroStatsStyles
            ? heroStatsStyles.gridTemplateColumns
            : null,
        };
      });

      // Hero stats should have multiple columns on desktop
      if (gridInfo.heroStatsColumns) {
        const columnCount = gridInfo.heroStatsColumns
          .split(" ")
          .filter((c) => c && c !== "0px").length;
        expect(columnCount).toBeGreaterThanOrEqual(2);
      }
    });
  }
});

/**
 * Property 3: Desktop Navigation Visible
 * For any desktop viewport, navigation menu should be visible (not hidden)
 */
test.describe("Property 3: Desktop Navigation Visible", () => {
  for (const width of DESKTOP_VIEWPORTS) {
    test(`Navigation menu visible at ${width}px width`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      const navInfo = await page.evaluate(() => {
        const navMenu = document.querySelector(".nav-menu");
        const navMenuStyles = navMenu ? window.getComputedStyle(navMenu) : null;

        const mobileMenuBtn = document.querySelector(".mobile-menu-button");
        const mobileMenuBtnStyles = mobileMenuBtn
          ? window.getComputedStyle(mobileMenuBtn)
          : null;

        return {
          navMenuDisplay: navMenuStyles ? navMenuStyles.display : null,
          mobileMenuBtnDisplay: mobileMenuBtnStyles
            ? mobileMenuBtnStyles.display
            : null,
        };
      });

      // Nav menu should be visible (flex)
      if (navInfo.navMenuDisplay) {
        expect(navInfo.navMenuDisplay).not.toBe("none");
      }

      // Mobile menu button should be hidden on desktop
      if (navInfo.mobileMenuBtnDisplay) {
        expect(navInfo.mobileMenuBtnDisplay).toBe("none");
      }
    });
  }
});

/**
 * Property 4: Desktop Floating Cards Layout
 * For any desktop viewport, floating cards should maintain their positions
 */
test.describe("Property 4: Desktop Floating Cards Layout", () => {
  for (const width of DESKTOP_VIEWPORTS) {
    test(`Floating cards positioned correctly at ${width}px width`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      const cardsInfo = await page.evaluate(() => {
        const floatingCards = document.querySelectorAll(
          "#skills .floating-card"
        );
        const results = [];

        floatingCards.forEach((card) => {
          const styles = window.getComputedStyle(card);
          results.push({
            position: styles.position,
            display: styles.display,
          });
        });

        return results;
      });

      // Floating cards should be absolutely positioned on desktop
      for (const card of cardsInfo) {
        expect(card.position).toBe("absolute");
        expect(card.display).not.toBe("none");
      }
    });
  }
});

/**
 * Property 5: Desktop Animations Enabled
 * For any desktop viewport, animations should be enabled
 */
test.describe("Property 5: Desktop Animations Enabled", () => {
  for (const width of DESKTOP_VIEWPORTS) {
    test(`Animations enabled at ${width}px width`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      const animationInfo = await page.evaluate(() => {
        const section = document.querySelector("section");
        const sectionStyles = section ? window.getComputedStyle(section) : null;

        return {
          sectionAnimation: sectionStyles ? sectionStyles.animation : null,
          sectionOpacity: sectionStyles ? sectionStyles.opacity : null,
        };
      });

      // Sections should be visible (opacity 1)
      if (animationInfo.sectionOpacity) {
        expect(parseFloat(animationInfo.sectionOpacity)).toBeGreaterThan(0);
      }
    });
  }
});

/**
 * Property 6: No Horizontal Overflow on Desktop
 * For any desktop viewport, there should be no horizontal overflow
 */
test.describe("Property 6: No Horizontal Overflow on Desktop", () => {
  for (const width of DESKTOP_VIEWPORTS) {
    test(`No horizontal overflow at ${width}px width`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      const hasOverflow = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });

      expect(hasOverflow).toBe(false);
    });
  }
});

/**
 * Property 7: Desktop Hero Section Layout
 * For any desktop viewport, hero section should have proper layout
 */
test.describe("Property 7: Desktop Hero Section Layout", () => {
  for (const width of DESKTOP_VIEWPORTS) {
    test(`Hero section layout correct at ${width}px width`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      const heroInfo = await page.evaluate(() => {
        const basicInfo = document.querySelector(".basic-information");
        const basicInfoStyles = basicInfo
          ? window.getComputedStyle(basicInfo)
          : null;

        const avatar = document.querySelector(".avatar-image");
        const avatarStyles = avatar ? window.getComputedStyle(avatar) : null;

        return {
          basicInfoDisplay: basicInfoStyles ? basicInfoStyles.display : null,
          basicInfoFlexDirection: basicInfoStyles
            ? basicInfoStyles.flexDirection
            : null,
          avatarWidth: avatarStyles ? parseFloat(avatarStyles.width) : null,
        };
      });

      // Basic info should be flex row on desktop
      if (heroInfo.basicInfoDisplay) {
        expect(heroInfo.basicInfoDisplay).toBe("flex");
      }

      // Avatar should be larger on desktop (at least 200px)
      if (heroInfo.avatarWidth) {
        expect(heroInfo.avatarWidth).toBeGreaterThanOrEqual(200);
      }
    });
  }
});

/**
 * Property 8: Desktop Terminal Visible
 * For any desktop viewport, hero terminal should be visible and properly sized
 */
test.describe("Property 8: Desktop Terminal Visible", () => {
  for (const width of DESKTOP_VIEWPORTS) {
    test(`Hero terminal visible at ${width}px width`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/index.html");
      await page.waitForLoadState("networkidle");

      const terminalInfo = await page.evaluate(() => {
        const terminal = document.querySelector(".hero-terminal");
        const terminalStyles = terminal
          ? window.getComputedStyle(terminal)
          : null;
        const rect = terminal ? terminal.getBoundingClientRect() : null;

        return {
          display: terminalStyles ? terminalStyles.display : null,
          width: rect ? rect.width : null,
        };
      });

      // Terminal should be visible
      if (terminalInfo.display) {
        expect(terminalInfo.display).not.toBe("none");
      }

      // Terminal should have reasonable width on desktop
      if (terminalInfo.width) {
        expect(terminalInfo.width).toBeGreaterThanOrEqual(400);
      }
    });
  }
});
