// Main Entry Point
// CloudyCode v2.4.9 - Mobile Polish Edition

import { forceScrollReset, log } from "./utils.js";
import { initAnimations, resetAnimatedBreaks } from "./animations.js";
import {
  initEnhancedScrollAnimations,
  addScrollAnimationStyles,
} from "./scroll-animations.js";
import { initUI } from "./ui.js";
import { initProjects } from "./projects.js";
import { initEnhancements } from "./enhancements.js";

const LOTTIE_PLAYER_SRC =
  "https://unpkg.com/@lottiefiles/lottie-player@2.0.4/dist/lottie-player.js";

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !window.isSecureContext) return;

  window.addEventListener("load", () => {
    const swUrl = new URL("./sw.js", window.location.href);
    const scope = new URL("./", window.location.href).pathname;

    navigator.serviceWorker
      .register(swUrl.pathname, { scope })
      .then(() => {
        log.info("Service worker registered");
      })
      .catch((error) => {
        log.warn("Service worker registration failed:", error);
      });
  });
}

function initLazyLottiePlayer() {
  const lottieEl = document.querySelector("lottie-player");
  if (!lottieEl || customElements.get("lottie-player")) return;

  let loaded = false;
  const loadLottie = () => {
    if (loaded || customElements.get("lottie-player")) return;
    loaded = true;

    const script = document.createElement("script");
    script.src = LOTTIE_PLAYER_SRC;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  };

  if ("IntersectionObserver" in window) {
    const target = document.getElementById("certifications") || lottieEl;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadLottie();
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(target);
  } else {
    window.addEventListener("load", loadLottie, { once: true });
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadLottie, { timeout: 6000 });
  } else {
    setTimeout(loadLottie, 6000);
  }
}

// Initialize Application
function init() {
  try {
    log.info("CloudyCode v2.4.9 - Initializing...");

    // Force scroll to top on page load
    forceScrollReset();

    // Add scroll animation styles
    addScrollAnimationStyles();

    // Initialize UI components (navigation, scroll progress, back to top, etc.)
    initUI();

    // Initialize projects section (rendering, filtering, modals)
    initProjects();
    // Load non-critical animation runtime only when needed
    initLazyLottiePlayer();

    // Initialize animations (typing, particles, AOS, counters, etc.)
    // Wait a bit to ensure DOM is fully ready
    setTimeout(() => {
      initAnimations();
      // Initialize enhanced scroll animations
      initEnhancedScrollAnimations();
      // Reset animated breaks on page load
      resetAnimatedBreaks();
      // Initialize all enhancements (v2.4.9)
      initEnhancements();
    }, 100);

    log.info("CloudyCode v2.4.9 - Initialization complete!");
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

registerServiceWorker();

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
