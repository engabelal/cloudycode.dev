// Main Entry Point
// CloudyCode v2.4.1 - Mobile Polish Edition

import { forceScrollReset, log } from "./utils.js";
import { initAnimations, resetAnimatedBreaks } from "./animations.js";
import {
  initEnhancedScrollAnimations,
  addScrollAnimationStyles,
} from "./scroll-animations.js";
import { initUI } from "./ui.js";
import { initProjects } from "./projects.js";
import { initEnhancements } from "./enhancements.js";

// Initialize Application
function init() {
  try {
    log.info("CloudyCode v2.4.1 - Initializing...");

    // Force scroll to top on page load
    forceScrollReset();

    // Add scroll animation styles
    addScrollAnimationStyles();

    // Initialize UI components (navigation, scroll progress, back to top, etc.)
    initUI();

    // Initialize projects section (rendering, filtering, modals)
    initProjects();

    // Initialize animations (typing, particles, AOS, counters, etc.)
    // Wait a bit to ensure DOM is fully ready
    setTimeout(() => {
      initAnimations();
      // Initialize enhanced scroll animations
      initEnhancedScrollAnimations();
      // Reset animated breaks on page load
      resetAnimatedBreaks();
      // Initialize all enhancements (v2.4.1)
      initEnhancements();
    }, 100);

    log.info("CloudyCode v2.4.1 - Initialization complete!");
  } catch (error) {
    log.error("Error during initialization:", error);
  }
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Handle page visibility changes (for better performance)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    log.debug("Page hidden - pausing animations");
    // Optionally pause animations when page is hidden
  } else {
    log.debug("Page visible - resuming animations");
    // Optionally resume animations when page is visible
  }
});

// Handle window resize (debounced)
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    log.debug("Window resized");
    // Optionally handle responsive adjustments
  }, 250);
});

// Global error handler
window.addEventListener("error", (event) => {
  log.error("Global error:", event.error);
});

// Unhandled promise rejection handler
window.addEventListener("unhandledrejection", (event) => {
  log.error("Unhandled promise rejection:", event.reason);
});

// Export for potential external use
export { init, resetAnimatedBreaks };

// Add navigation event listeners for animated-breaks reset
document.addEventListener("DOMContentLoaded", () => {
  // Reset animation when clicking on Home or logo links
  const homeLinks = document.querySelectorAll(
    'a[href="/"], a[href="#hero"], a[href="#home"], .logo'
  );
  homeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // If it's the home link (/) handle page reload
      if (link.getAttribute("href") === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          resetAnimatedBreaks();
        }, 100);
      } else {
        setTimeout(() => {
          resetAnimatedBreaks();
        }, 100);
      }
    });
  });

  // Reset animation when scrolling to top
  window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
      setTimeout(() => {
        resetAnimatedBreaks();
      }, 200);
    }
  });
});
