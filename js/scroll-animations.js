import { prefersReducedMotion, createObserver } from "./utils.js";

/**
 * Enhanced Scroll Animations for CloudyCode Portfolio
 * Fixed version that doesn't interfere with existing floating cards
 */

// Initialize Enhanced Scroll Animations - Enhanced version
export function initEnhancedScrollAnimations() {
  if (prefersReducedMotion()) return;

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

  sections.forEach((section) => {
    // Skip hero and arsenal sections (they have their own animations)
    if (section.id === "hero" || section.id === "arsenal") return;

    // Apply more dramatic fade-up animation to sections
    section.style.opacity = "0";
    section.style.transform = "translateY(60px)";
    section.style.transition = "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    section.style.filter = "blur(4px)";

    const observer = createObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";
            entry.target.style.filter = "blur(0px)";

            // Animate section children with enhanced stagger
            animateSectionChildren(entry.target);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Trigger earlier
        rootMargin: "-20px 0px -20px 0px", // Less margin for better timing
      }
    );

    observer.observe(section);
  });
}

// Animate children of a section with enhanced stagger effect
function animateSectionChildren(section) {
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

  children.forEach((child, index) => {
    // Skip if it's a floating card (they have their own animations)
    if (child.classList.contains("floating-card")) return;

    child.style.opacity = "0";
    child.style.transform = "translateY(40px) scale(0.95)";
    child.style.transition = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
    child.style.filter = "blur(2px)";

    setTimeout(() => {
      child.style.opacity = "1";
      child.style.transform = "translateY(0px) scale(1)";
      child.style.filter = "blur(0px)";

      // Add subtle glow effect during animation
      child.style.boxShadow = "0 10px 30px rgba(163, 98, 255, 0.1)";

      // Remove glow after animation
      setTimeout(() => {
        child.style.boxShadow = "";
      }, 800);
    }, 200 + index * 120); // Increased stagger delay
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

  certItems.forEach((cert, index) => {
    cert.style.opacity = "0";
    cert.style.transform = "scale(0.8) translateY(50px) rotate(-2deg)";
    cert.style.transition = "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    cert.style.filter = "blur(3px)";

    const observer = createObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform =
                "scale(1) translateY(0px) rotate(0deg)";
              entry.target.style.filter = "blur(0px)";

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
            }, index * 150); // Increased stagger delay
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 } // Trigger earlier
    );

    observer.observe(cert);
  });
}

// Project card animations - Enhanced for better visibility
function initProjectCardAnimations() {
  const projectCards = document.querySelectorAll(".project-card, .bento-card");

  projectCards.forEach((card, index) => {
    // Skip if it's a floating card
    if (card.classList.contains("floating-card")) return;

    card.style.opacity = "0";
    card.style.transform = "translateY(60px) rotateX(15deg) scale(0.9)";
    card.style.transition = "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    card.style.filter = "blur(4px)";

    const observer = createObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform =
                "translateY(0px) rotateX(0deg) scale(1)";
              entry.target.style.filter = "blur(0px)";

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
            }, index * 250); // Increased stagger delay
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Trigger earlier
      }
    );

    observer.observe(card);
  });
}

// Stats animations with enhanced counter effect
function initStatsAnimations() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    // Set initial state
    stat.style.opacity = "0";
    stat.style.transform = "scale(0.5)";
    stat.style.filter = "blur(2px)";

    const observer = createObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate the stat number
          entry.target.style.transition =
            "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "scale(1)";
          entry.target.style.filter = "blur(0px)";

          // Add enhanced pulse animation with glow
          entry.target.style.animation = "statPulseEnhanced 1.2s ease-out";

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
        filter: drop-shadow(0 0 10px rgba(163, 98, 255, 0.2));
      }
      30% {
        transform: scale(1.15);
        filter: drop-shadow(0 0 20px rgba(163, 98, 255, 0.4));
      }
      60% {
        transform: scale(0.95);
        filter: drop-shadow(0 0 15px rgba(163, 98, 255, 0.3));
      }
      100% {
        transform: scale(1);
        filter: drop-shadow(0 0 10px rgba(163, 98, 255, 0.2));
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
      will-change: transform, opacity, filter;
      backface-visibility: hidden;
      transform-style: preserve-3d;
    }

    /* Arsenal floating cards animation styles - Enhanced */
    #arsenal .floating-card {
      will-change: transform, opacity, filter;
      backface-visibility: hidden;
      transform-style: preserve-3d;
    }

    /* Enhanced floating card hover effects */
    #arsenal .floating-card:hover {
      transform: translateY(-10px) scale(1.05) !important;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
      box-shadow: 0 25px 60px rgba(163, 98, 255, 0.25) !important;
      filter: brightness(1.05) !important;
    }

    /* Smooth transitions for all animated elements */
    .stat-card, .mini-stat, .project-card, .bento-card, .cert-card, .cert-item {
      will-change: transform, opacity, filter;
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

  if (!terminal) return;

  // Set initial state with more dramatic effect
  terminal.style.opacity = "0";
  terminal.style.transform = "translateY(80px) scale(0.85)";
  terminal.style.transition = "all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  terminal.style.filter = "blur(8px)";

  if (driftCard) {
    driftCard.style.opacity = "0";
    driftCard.style.transform = "translateY(60px) scale(0.8) rotate(5deg)";
    driftCard.style.transition = "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)";
    driftCard.style.filter = "blur(4px)";
  }

  const observer = createObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate terminal window with enhanced effect
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
            entry.target.style.filter = "blur(0px)";

            // Add glow effect during animation
            entry.target.style.boxShadow = "0 0 50px rgba(163, 98, 255, 0.3)";

            // Remove glow after animation
            setTimeout(() => {
              entry.target.style.boxShadow = "";
            }, 1500);
          }, 300);

          // Animate drift card with enhanced delay and effect
          if (driftCard) {
            setTimeout(() => {
              driftCard.style.opacity = "1";
              driftCard.style.transform = "translateY(0) scale(1) rotate(0deg)";
              driftCard.style.filter = "blur(0px)";

              // Add pulse effect
              driftCard.style.animation = "terminalCardPulse 0.6s ease-out";
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

  floatingCards.forEach((card, index) => {
    // Preserve original transforms but add enhanced animation states
    const originalTransform = card.style.transform || "";
    const rotation = card.getAttribute("data-rotation") || "0deg";

    // Set initial animation state with more dramatic effect
    card.style.opacity = "0";
    card.style.transform = `${originalTransform} translateY(80px) scale(0.7)`;
    card.style.transition = "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    card.style.filter = "blur(6px)";

    const observer = createObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              // Restore original transform with enhanced animation
              entry.target.style.opacity = "1";
              entry.target.style.filter = "blur(0px)";

              // Handle different card positions
              if (
                entry.target.style.transform.includes("translate(-50%, -50%)")
              ) {
                // Central card
                entry.target.style.transform = "translate(-50%, -50%) scale(1)";
              } else if (rotation && rotation !== "0deg") {
                // Rotated cards
                entry.target.style.transform = `rotate(${rotation}) scale(1)`;
              } else {
                // Default cards
                entry.target.style.transform = "translateY(0) scale(1)";
              }

              // Add animated class for CSS to maintain transforms
              entry.target.classList.add("animated");

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
            }, index * 200); // Increased stagger delay

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Trigger earlier
        rootMargin: "0px 0px -20px 0px", // Less margin for better timing
      }
    );

    observer.observe(card);
  });
}
