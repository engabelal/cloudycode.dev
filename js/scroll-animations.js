import { prefersReducedMotion, createObserver } from "./utils.js";

const MOBILE_QUERY = "(max-width: 768px)";
const isMobileView = () => window.matchMedia(MOBILE_QUERY).matches;

/**
 * Enhanced Scroll Animations for CloudyCode Portfolio
 * Fixed version that doesn't interfere with existing floating cards
 */

// Initialize Enhanced Scroll Animations - Enhanced version
export function initEnhancedScrollAnimations() {
  if (prefersReducedMotion() || isMobileView()) return;

  // Add a small delay to ensure DOM is fully ready
  setTimeout(() => {
    // Initialize section-based animations
    initSectionAnimations();

    // Initialize special element animations
    initSpecialElementAnimations();
  }, 200);
}

// Initialize section-based animations - Enhanced for better visibility
function initSectionAnimations() {
  const sections = document.querySelectorAll("section");
  const isMobile = isMobileView();
  const duration = isMobile ? 0.7 : 1.2;
  const durationMs = duration * 1000;
  const translateY = isMobile ? 30 : 60;
  const easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  sections.forEach((section) => {
    // Skip hero and arsenal sections (they have their own animations)
    if (section.id === "hero" || section.id === "arsenal") return;
    if (section.hasAttribute("data-aos")) return;

    // Apply more dramatic fade-up animation to sections
    section.style.opacity = "0";
    section.style.transform = `translateY(${translateY}px)`;
    section.style.transition = `transform ${duration}s ${easing}, opacity ${duration}s ${easing}`;
    section.style.willChange = "transform, opacity";

    const observer = createObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";

            // Animate section children with enhanced stagger
            animateSectionChildren(entry.target, isMobile);

            setTimeout(() => {
              entry.target.style.willChange = "";
            }, durationMs + 150);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: isMobile ? 0.08 : 0.15, // Trigger earlier on mobile
        rootMargin: isMobile ? "-10px 0px -10px 0px" : "-20px 0px -20px 0px",
      }
    );

    observer.observe(section);
  });
}

// Animate children of a section with enhanced stagger effect
function animateSectionChildren(section, isMobile) {
  // Different selectors for different sections
  let childSelector = "";

  if (section.id === "expertise") {
    childSelector = ".stat-card, .mini-stat";
  } else if (section.id === "blueprints") {
    childSelector = ".project-card, .bento-card";
  } else if (section.id === "accreditation") {
    childSelector = ".cert-card, .cert-badge, .cert-item";
  } else {
    childSelector = ".card, .item";
  }

  const children = section.querySelectorAll(childSelector);

  const duration = isMobile ? 0.5 : 0.8;
  const translateY = isMobile ? 24 : 40;
  const startScale = isMobile ? 0.98 : 0.95;
  const baseDelay = isMobile ? 80 : 200;
  const stagger = isMobile ? 60 : 120;
  const glowDuration = isMobile ? 300 : 800;

  children.forEach((child, index) => {
    // Skip if it's a floating card (they have their own animations)
    if (child.classList.contains("floating-card")) return;

    child.style.opacity = "0";
    child.style.transform = `translateY(${translateY}px) scale(${startScale})`;
    child.style.transition = `transform ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1)`;
    child.style.willChange = "transform, opacity";

    setTimeout(() => {
      child.style.opacity = "1";
      child.style.transform = "translateY(0px) scale(1)";

      // Add subtle glow effect during animation
      child.style.boxShadow = "0 10px 30px rgba(163, 98, 255, 0.1)";

      // Remove glow after animation
      setTimeout(() => {
        child.style.boxShadow = "";
        child.style.willChange = "";
      }, glowDuration);
    }, baseDelay + index * stagger);
  });
}

// Initialize special animations for specific elements
function initSpecialElementAnimations() {
  // Animate certification items with enhanced effect
  initCertificationAnimations();

  // Animate project cards
  initProjectCardAnimations();

  // Animate stats with counter effect
  initStatsAnimations();

  // Animate terminal entrance
  initTerminalAnimation();

  // Animate arsenal floating cards
  initArsenalAnimations();
}

// Enhanced certification animations with better visibility
function initCertificationAnimations() {
  const certItems = document.querySelectorAll(
    "#accreditation .cert-item, #accreditation .cert-card, #accreditation .certification-item"
  );
  const isMobile = isMobileView();
  const duration = isMobile ? 0.7 : 1;
  const durationMs = duration * 1000;
  const translateY = isMobile ? 30 : 50;
  const startScale = isMobile ? 0.94 : 0.8;
  const startRotate = isMobile ? -1 : -2;
  const stagger = isMobile ? 80 : 150;

  certItems.forEach((cert, index) => {
    cert.style.opacity = "0";
    cert.style.transform = `scale(${startScale}) translateY(${translateY}px) rotate(${startRotate}deg)`;
    cert.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    cert.style.willChange = "transform, opacity";

    const observer = createObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform =
                "scale(1) translateY(0px) rotate(0deg)";

              if (!isMobile) {
                // Add enhanced glow effect
                entry.target.style.boxShadow =
                  "0 15px 40px rgba(163, 98, 255, 0.15)";

                // Enhanced bounce effect with multiple stages
                setTimeout(() => {
                  entry.target.style.transform =
                    "scale(1.08) translateY(-5px) rotate(1deg)";
                  setTimeout(() => {
                    entry.target.style.transform =
                      "scale(0.98) translateY(2px) rotate(-0.5deg)";
                    setTimeout(() => {
                      entry.target.style.transform =
                        "scale(1) translateY(0px) rotate(0deg)";
                      // Remove glow after animation
                      setTimeout(() => {
                        entry.target.style.boxShadow = "";
                      }, 300);
                    }, 150);
                  }, 200);
                }, 400);
              }

              setTimeout(() => {
                entry.target.style.willChange = "";
              }, durationMs + 200);
            }, index * stagger);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: isMobile ? 0.08 : 0.15 }
    );

    observer.observe(cert);
  });
}

// Project card animations - Enhanced for better visibility
function initProjectCardAnimations() {
  const projectCards = document.querySelectorAll(".project-card, .bento-card");
  const isMobile = isMobileView();
  const duration = isMobile ? 0.7 : 1;
  const durationMs = duration * 1000;
  const translateY = isMobile ? 40 : 60;
  const startScale = isMobile ? 0.95 : 0.9;
  const rotateX = isMobile ? 6 : 15;
  const stagger = isMobile ? 120 : 250;

  projectCards.forEach((card, index) => {
    // Skip if it's a floating card
    if (card.classList.contains("floating-card")) return;

    card.style.opacity = "0";
    card.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${startScale})`;
    card.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    card.style.willChange = "transform, opacity";

    const observer = createObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform =
                "translateY(0px) rotateX(0deg) scale(1)";

              if (!isMobile) {
                // Add glow effect during animation
                entry.target.style.boxShadow =
                  "0 15px 40px rgba(163, 98, 255, 0.15)";

                // Enhanced bounce effect
                setTimeout(() => {
                  entry.target.style.transform =
                    "translateY(-8px) rotateX(-2deg) scale(1.02)";
                  setTimeout(() => {
                    entry.target.style.transform =
                      "translateY(2px) rotateX(1deg) scale(0.99)";
                    setTimeout(() => {
                      entry.target.style.transform =
                        "translateY(0px) rotateX(0deg) scale(1)";
                      // Remove glow after animation
                      setTimeout(() => {
                        entry.target.style.boxShadow = "";
                      }, 300);
                    }, 150);
                  }, 200);
                }, 400);
              }

              setTimeout(() => {
                entry.target.style.willChange = "";
              }, durationMs + 200);
            }, index * stagger);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: isMobile ? 0.1 : 0.15,
        rootMargin: isMobile ? "0px 0px -10px 0px" : "0px 0px -20px 0px",
      }
    );

    observer.observe(card);
  });
}

// Stats animations with enhanced counter effect
function initStatsAnimations() {
  const statNumbers = document.querySelectorAll(".stat-number");
  const isMobile = isMobileView();
  const duration = isMobile ? 0.6 : 1;
  const startScale = isMobile ? 0.7 : 0.5;

  statNumbers.forEach((stat) => {
    // Set initial state
    stat.style.opacity = "0";
    stat.style.transform = `scale(${startScale})`;
    stat.style.willChange = "transform, opacity";

    const observer = createObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate the stat number
          entry.target.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
          entry.target.style.opacity = "1";
          entry.target.style.transform = "scale(1)";

          // Add enhanced pulse animation with glow
          entry.target.style.animation = "statPulseEnhanced 1.2s ease-out";

          setTimeout(() => {
            entry.target.style.willChange = "";
          }, duration * 1000 + 200);

          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(stat);
  });
}

// Add CSS animations for enhanced effects
export function addScrollAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes statPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    @keyframes statPulseEnhanced {
      0% {
        transform: scale(1);
      }
      30% {
        transform: scale(1.15);
      }
      60% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes terminalSlideUp {
      from {
        opacity: 0;
        transform: translateY(50px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes terminalCardPulse {
      0% { transform: translateY(0) scale(1) rotate(0deg); }
      50% { transform: translateY(-5px) scale(1.02) rotate(0deg); }
      100% { transform: translateY(0) scale(1) rotate(0deg); }
    }

    @keyframes floatingCardEntrance {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes enhancedGlow {
      0% { box-shadow: 0 0 20px rgba(163, 98, 255, 0.1); }
      50% { box-shadow: 0 0 40px rgba(163, 98, 255, 0.3); }
      100% { box-shadow: 0 0 20px rgba(163, 98, 255, 0.1); }
    }

    /* Smooth scroll behavior - Enhanced */
    html {
      scroll-behavior: smooth;
    }

    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* Enhanced scroll-triggered animations */
    @media (prefers-reduced-motion: no-preference) {
      .hero-terminal,
      #arsenal .floating-card,
      .stat-card,
      .project-card,
      .cert-card {
        animation-fill-mode: both;
      }
    }

    /* Enhanced hover effects for animated elements */
    .project-card:hover, .bento-card:hover {
      transform: translateY(-8px) rotateX(3deg) scale(1.02) !important;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
      box-shadow: 0 20px 50px rgba(163, 98, 255, 0.2) !important;
    }

    .cert-card:hover, .cert-item:hover {
      transform: scale(1.08) translateY(-8px) rotate(2deg) !important;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
      box-shadow: 0 25px 50px rgba(163, 98, 255, 0.25) !important;
    }

    .stat-card:hover {
      transform: translateY(-10px) scale(1.05) !important;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
      box-shadow: 0 20px 60px rgba(163, 98, 255, 0.3) !important;
    }

    /* Preserve floating card animations */
    .floating-card {
      /* Don't override existing floating card styles */
    }

    /* Certification section improvements */
    #accreditation .cert-item,
    #accreditation .cert-card,
    #accreditation .certification-item {
      will-change: transform, opacity;
      backface-visibility: hidden;
    }

    /* Terminal animation styles - Enhanced */
    .hero-terminal {
      will-change: transform, opacity;
      backface-visibility: hidden;
      transform-style: preserve-3d;
    }

    /* Arsenal floating cards animation styles - Enhanced */
    #arsenal .floating-card {
      will-change: transform, opacity;
      backface-visibility: hidden;
      transform-style: preserve-3d;
    }

    /* Smooth transitions for all animated elements */
    .stat-card, .mini-stat, .project-card, .bento-card, .cert-card, .cert-item {
      will-change: transform, opacity;
      backface-visibility: hidden;
      transform-style: preserve-3d;
    }
  `;
  document.head.appendChild(style);
}

// Terminal entrance animation - Enhanced for better visibility
function initTerminalAnimation() {
  const terminal = document.querySelector(".hero-terminal");
  const driftCard = document.querySelector("#hero-drift-card");
  const isMobile = isMobileView();
  const duration = isMobile ? 1 : 1.5;
  const durationMs = duration * 1000;
  const translateY = isMobile ? 40 : 80;
  const scale = isMobile ? 0.95 : 0.85;

  if (!terminal) return;

  // Set initial state with more dramatic effect
  terminal.style.opacity = "0";
  terminal.style.transform = `translateY(${translateY}px) scale(${scale})`;
  terminal.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
  terminal.style.willChange = "transform, opacity";

  if (driftCard) {
    driftCard.style.opacity = "0";
    driftCard.style.transform = "translateY(60px) scale(0.9) rotate(5deg)";
    driftCard.style.transition =
      "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)";
    driftCard.style.willChange = "transform, opacity";
  }

  const observer = createObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate terminal window with enhanced effect
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";

            // Add glow effect during animation
            entry.target.style.boxShadow = "0 0 50px rgba(163, 98, 255, 0.3)";

            // Remove glow after animation
            setTimeout(() => {
              entry.target.style.boxShadow = "";
            }, 1500);

            setTimeout(() => {
              entry.target.style.willChange = "";
            }, durationMs + 200);
          }, 300);

          // Animate drift card with enhanced delay and effect
          if (driftCard) {
            setTimeout(() => {
              driftCard.style.opacity = "1";
              driftCard.style.transform = "translateY(0) scale(1) rotate(0deg)";

              // Add pulse effect
              driftCard.style.animation = "terminalCardPulse 0.6s ease-out";

              setTimeout(() => {
                driftCard.style.willChange = "";
              }, 1000);
            }, 1000);
          }

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Trigger earlier
      rootMargin: "0px 0px -20px 0px", // Less margin for earlier trigger
    }
  );

  observer.observe(terminal);
}

// Arsenal floating cards animation - Enhanced for better visibility
function initArsenalAnimations() {
  const arsenalSection = document.querySelector("#arsenal");
  if (!arsenalSection) return;

  const floatingCards = arsenalSection.querySelectorAll(".floating-card");
  const isMobile = isMobileView();
  const duration = isMobile ? 0.5 : 0.9;
  const durationMs = duration * 1000;
  const translateY = isMobile ? 0 : 80;
  const startScale = isMobile ? 1 : 0.7;
  const stagger = isMobile ? 30 : 50; // Reduced from 120 to 50 for faster, more synchronized entrance
  const easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  floatingCards.forEach((card, index) => {
    // Preserve original transforms but add enhanced animation states
    const originalTransform = card.style.transform || "";
    const rotation = card.getAttribute("data-rotation") || "0deg";

    // Set initial animation state with more dramatic effect
    card.style.opacity = "0";
    card.style.transform = isMobile
      ? originalTransform
      : `${originalTransform} translateY(${translateY}px) scale(${startScale})`;
    card.style.transition = isMobile
      ? `opacity ${duration}s ${easing}`
      : `transform ${duration}s ${easing}, opacity ${duration}s ${easing}`;
    card.style.willChange = "transform, opacity";

    const observer = createObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              // Restore original transform with enhanced animation
              entry.target.style.opacity = "1";

              if (!isMobile) {
                // Handle different card positions
                if (
                  entry.target.style.transform.includes("translate(-50%, -50%)")
                ) {
                  // Central card
                  entry.target.style.transform =
                    "translate(-50%, -50%) scale(1)";
                } else if (rotation && rotation !== "0deg") {
                  // Rotated cards
                  entry.target.style.transform = `rotate(${rotation}) scale(1)`;
                } else {
                  // Default cards
                  entry.target.style.transform = "translateY(0) scale(1)";
                }
              } else {
                entry.target.style.transform = originalTransform;
              }

              // Add animated class for CSS to maintain transforms
              entry.target.classList.add("animated");

              if (!isMobile) {
                // Add enhanced glow effect during animation
                entry.target.style.boxShadow =
                  "0 20px 60px rgba(163, 98, 255, 0.2)";

                // Enhanced bounce effect with multiple stages
                setTimeout(() => {
                  entry.target.style.transform += " scale(1.05)";
                  setTimeout(() => {
                    entry.target.style.transform =
                      entry.target.style.transform.replace(
                        " scale(1.05)",
                        " scale(0.98)"
                      );
                    setTimeout(() => {
                      if (
                        entry.target.style.transform.includes(
                          "translate(-50%, -50%)"
                        )
                      ) {
                        entry.target.style.transform =
                          "translate(-50%, -50%) scale(1)";
                      } else if (rotation && rotation !== "0deg") {
                        entry.target.style.transform = `rotate(${rotation}) scale(1)`;
                      } else {
                        entry.target.style.transform = "translateY(0) scale(1)";
                      }

                      // Remove glow after animation
                      entry.target.style.boxShadow = "";
                    }, 150);
                  }, 200);
                }, 500);
              }

              setTimeout(() => {
                entry.target.style.willChange = "";
              }, durationMs + 200);
            }, index * stagger);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: isMobile ? 0.08 : 0.15,
        rootMargin: isMobile ? "0px 0px -10px 0px" : "0px 0px -20px 0px",
      }
    );

    observer.observe(card);
  });
}
