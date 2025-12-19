// Main Entry Point
// CloudyCode v7.0.0 - Sentry.io-Inspired Redesign

import { forceScrollReset, log } from './utils.js';
import { initAnimations } from './animations.js';
import { initUI } from './ui.js';
import { initProjects } from './projects.js';

// Initialize Application
function init() {
  try {
    log.info('CloudyCode v7.0.0 - Initializing...');

    // Force scroll to top on page load
    forceScrollReset();

    // Initialize UI components (navigation, scroll progress, back to top, etc.)
    initUI();

    // Initialize projects section (rendering, filtering, modals)
    initProjects();

    // Initialize animations (typing, particles, AOS, counters, etc.)
    // Wait a bit to ensure DOM is fully ready
    setTimeout(() => {
      initAnimations();
    }, 100);

    log.info('CloudyCode v7.0.0 - Initialization complete!');
  } catch (error) {
    log.error('Error during initialization:', error);
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Handle page visibility changes (for better performance)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    log.debug('Page hidden - pausing animations');
    // Optionally pause animations when page is hidden
  } else {
    log.debug('Page visible - resuming animations');
    // Optionally resume animations when page is visible
  }
});

// Handle window resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    log.debug('Window resized');
    // Optionally handle responsive adjustments
  }, 250);
});

// Global error handler
window.addEventListener('error', (event) => {
  log.error('Global error:', event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  log.error('Unhandled promise rejection:', event.reason);
});

// Export for potential external use
export { init };
