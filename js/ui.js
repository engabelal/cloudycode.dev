// UI Module
// CloudyCode v7.0.0

import {
  smoothScrollTo,
  getScrollPercentage,
  scrollToTop,
  debounce,
  throttle,
  trapFocus,
} from "./utils.js";

// Mobile Menu
export function initMobileMenu() {
  const menuButton = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("nav-menu");
  const menuOverlay = document.getElementById("mobile-menu-overlay");
  const menuIcon = document.getElementById("menu-icon");

  if (!menuButton || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add("mobile-open");
    menuOverlay?.classList.add("active");
    menuButton.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    if (menuIcon) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    }
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("mobile-open");
    menuOverlay?.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (menuIcon) {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  };

  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("mobile-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking overlay
  menuOverlay?.addEventListener("click", closeMenu);

  // Close menu when clicking on a link
  const menuLinks = mobileMenu.querySelectorAll(".nav-link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("mobile-open")) {
      closeMenu();
    }
  });

  // Close menu on window resize (if switching to desktop)
  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 768 &&
      mobileMenu.classList.contains("mobile-open")
    ) {
      closeMenu();
    }
  });
}

// Smooth Navigation
export function initSmoothNavigation() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        smoothScrollTo(target, 80);
        window.history.pushState(null, "", href);
      }
    });
  });
}

// Navbar Scroll Behavior
export function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  // Call once initially to set state
  handleScroll();
}

// Scroll Progress Bar
export function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  const updateProgress = throttle(() => {
    const progress = getScrollPercentage();
    progressBar.style.transform = `scaleX(${progress / 100})`;
  }, 50);

  window.addEventListener("scroll", updateProgress);
}

// Back to Top Button
export function initBackToTop() {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  const toggleButton = throttle(() => {
    if (window.pageYOffset > 300) {
      button.classList.remove("opacity-0", "invisible");
      button.classList.add("opacity-100", "visible");
    } else {
      button.classList.add("opacity-0", "invisible");
      button.classList.remove("opacity-100", "visible");
    }
  }, 100);

  window.addEventListener("scroll", toggleButton);

  button.addEventListener("click", () => {
    scrollToTop();
  });
}

// Loading Screen
export function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (!loadingScreen) return;

  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 500);
}

// Certifications Section
export function initCertifications() {
  const certifications = [
    {
      title: "AWS Certified DevOps Engineer - Professional",
      level: "Professional",
      year: "Oct 2025",
      description:
        "Advanced AWS DevOps practices, CI/CD pipelines, and automation",
    },
    {
      title: "Microsoft Azure Solutions Architect Expert",
      level: "Expert",
      year: "Jan 2024",
      description: "Azure infrastructure design, security, and cloud solutions",
    },
    {
      title: "Microsoft Azure Administrator Associate",
      level: "Associate",
      year: "Jan 2024",
      description: "Azure resource management, networking, and security",
    },
    {
      title: "Oracle Cloud Infrastructure Architect",
      level: "Professional",
      year: "Jul 2023",
      description: "OCI infrastructure design and cloud architecture",
    },
    {
      title: "VMware VCP-NV 2023",
      level: "Professional",
      year: "Feb 2023",
      description: "VMware NSX virtualization and network security",
    },
    {
      title: "Nutanix NCM-MCI5",
      level: "Master",
      year: "Nov 2022",
      description: "Nutanix Multicloud Infrastructure administration",
    },
    {
      title: "Red Hat Certified Specialist - Ansible Automation",
      level: "Specialist",
      year: "Feb 2022",
      description: "Ansible automation and configuration management",
    },
    {
      title: "CCNP Data Center",
      level: "Professional",
      year: "Jan 2021",
      description: "Cisco data center networking and infrastructure",
    },
    {
      title: "Cisco Specialist - Data Center Design",
      level: "Specialist",
      year: "Jan 2021",
      description: "Data center design and architecture",
    },
    {
      title: "VMware VCP-DCV 2020",
      level: "Professional",
      year: "Oct 2020",
      description: "VMware vSphere data center virtualization",
    },
    {
      title: "ITIL Foundation",
      level: "Foundation",
      year: "Oct 2020",
      description: "IT service management best practices",
    },
    {
      title: "Red Hat Certified Engineer",
      level: "Engineer",
      year: "Sep 2016",
      description: "Red Hat Enterprise Linux system administration",
    },
  ];

  const container = document.getElementById("certifications-container");
  if (!container) return;

  container.innerHTML = certifications
    .map(
      (cert, index) => `
    <div class="certification-card flex-shrink-0 w-80 glass rounded-3xl p-6 card-hover snap-center"
         data-aos="fade-up"
         data-aos-delay="${index * 50}">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
          <i class="fas fa-certificate text-2xl text-white"></i>
        </div>
        <span class="px-3 py-1 bg-gradient-secondary rounded-full text-white text-xs font-semibold">
          ${cert.level}
        </span>
      </div>
      <h3 class="text-lg font-bold text-white mb-2">${cert.title}</h3>
      <p class="text-textSecondary text-sm mb-3">${cert.description}</p>
      <p class="text-brand text-sm font-semibold">
        <i class="fas fa-calendar-alt mr-2"></i>${cert.year}
      </p>
    </div>
  `
    )
    .join("");

  // Optional: Add scroll buttons
  addScrollButtons(container);
}

// Add scroll buttons for certifications
function addScrollButtons(container) {
  const scrollAmount = 300;

  const leftButton = document.createElement("button");
  leftButton.className =
    "absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-primary rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform";
  leftButton.innerHTML = '<i class="fas fa-chevron-left text-white"></i>';
  leftButton.setAttribute("aria-label", "Scroll left");

  const rightButton = document.createElement("button");
  rightButton.className =
    "absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-primary rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform";
  rightButton.innerHTML = '<i class="fas fa-chevron-right text-white"></i>';
  rightButton.setAttribute("aria-label", "Scroll right");

  leftButton.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightButton.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  const wrapper = container.parentElement;
  if (wrapper && wrapper.style.position !== "relative") {
    wrapper.style.position = "relative";
  }

  wrapper?.appendChild(leftButton);
  wrapper?.appendChild(rightButton);
}

// Active Navigation Link
export function initActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("text-brand");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("text-brand");
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

// Site Version Display
export function displaySiteVersion() {
  const versionElement = document.getElementById("site-version");
  if (versionElement) {
    import("../config/site.config.js")
      .then((module) => {
        if (module.default?.version) {
          versionElement.textContent = module.default.version;
        }
      })
      .catch((err) => console.error("Error loading config:", err));
  }
}

// Floating Card Interactions
export function initFloatingCards() {
  const cards = document.querySelectorAll(".floating-card");

  cards.forEach((card) => {
    const originalRotation = card.getAttribute("data-rotation") || "0deg";
    const isCenter =
      card.style.transform &&
      card.style.transform.includes("translate(-50%, -50%)");

    card.addEventListener("mouseenter", () => {
      if (isCenter) {
        card.style.transform = "translate(-50%, -50%) rotate(0deg) scale(1.05)";
      } else {
        card.style.transform = "rotate(0deg) scale(1.05)";
      }
      card.style.zIndex = "20";
    });

    card.addEventListener("mouseleave", () => {
      if (isCenter) {
        card.style.transform = `translate(-50%, -50%) rotate(${originalRotation})`;
      } else {
        card.style.transform = `rotate(${originalRotation})`;
      }
      card.style.zIndex = "";
    });
  });
}

// Initialize All UI Components
export function initUI() {
  initMobileMenu();
  initSmoothNavigation();
  initNavbarScroll();
  initScrollProgress();
  initBackToTop();
  initCertifications();
  initActiveNavLink();
  initFloatingCards();
  displaySiteVersion();

  // Hide loading screen after everything is ready
  window.addEventListener("load", hideLoadingScreen);
}
