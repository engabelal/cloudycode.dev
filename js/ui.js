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
    menuOverlay?.classList.add("active");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.classList.add("active");
    document.body.classList.add("mobile-menu-active");
    document.body.style.overflow = "hidden";
    if (menuIcon) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    }
  };

  const closeMenu = () => {
    menuOverlay?.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.classList.remove("active");
    document.body.classList.remove("mobile-menu-active");
    document.body.style.overflow = "";
    if (menuIcon) {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuOverlay?.classList.contains("active");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking overlay
  menuOverlay?.addEventListener("click", (event) => {
    if (event.target === menuOverlay) {
      closeMenu();
    }
  });

  // Close menu when clicking on a link
  const menuLinks = document.querySelectorAll(".nav-link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Close menu on window resize (if switching to desktop)
  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 768 &&
      menuOverlay?.classList.contains("active")
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
      shortName: "AWS DevOps",
      level: "Professional",
      year: "Oct 2025",
      icon: "fab fa-aws",
      color: "#FF9900",
      description: "Advanced certification demonstrating expertise in provisioning, operating, and managing distributed systems on AWS."
    },
    {
      title: "Microsoft Azure Solutions Architect Expert",
      shortName: "Azure Architect",
      level: "Expert",
      year: "Jan 2024",
      icon: "fab fa-microsoft",
      color: "#00A4EF",
      description: "Expert-level certification for designing cloud and hybrid solutions on Microsoft Azure platform."
    },
    {
      title: "Microsoft Azure Administrator Associate",
      shortName: "Azure Admin",
      level: "Associate",
      year: "Jan 2024",
      icon: "fab fa-microsoft",
      color: "#00A4EF",
      description: "Associate-level certification for implementing, managing, and monitoring Azure environments."
    },
    {
      title: "Oracle Cloud Infrastructure 2023 Certified Architect",
      shortName: "Oracle Cloud",
      level: "Professional",
      year: "Jul 2023",
      icon: "fas fa-cloud",
      color: "#F80000",
      description: "Professional certification for designing and implementing OCI solutions and architectures."
    },
    {
      title: "VMware Certified Professional - Network Virtualization (VCP-NV 2023)",
      shortName: "VMware VCP-NV",
      level: "Professional",
      year: "Feb 2023",
      icon: "fas fa-server",
      color: "#607078",
      description: "Professional certification for VMware NSX network virtualization and security."
    },
    {
      title: "Nutanix Certified Master 5 - Multicloud Infrastructure (NCM-MCI5)",
      shortName: "Nutanix NCM",
      level: "Master",
      year: "Nov 2022",
      icon: "fas fa-cube",
      color: "#3d4d5d",
      description: "Master-level certification for Nutanix hyperconverged infrastructure solutions."
    },
    {
      title: "Red Hat Certified Specialist in Ansible Automation",
      shortName: "Ansible",
      level: "Specialist",
      year: "Feb 2022",
      icon: "fab fa-redhat",
      color: "#EE0000",
      description: "Specialist certification for automation using Ansible and configuration management."
    },
    {
      title: "CCNP Data Center",
      shortName: "CCNP DC",
      level: "Professional",
      year: "Jan 2021",
      icon: "fas fa-network-wired",
      color: "#017CAD",
      description: "Professional-level certification for data center networking and infrastructure."
    },
    {
      title: "Cisco Certified Specialist - Data Center Design",
      shortName: "Cisco DC Design",
      level: "Specialist",
      year: "Jan 2021",
      icon: "fas fa-network-wired",
      color: "#017CAD",
      description: "Specialist certification for designing scalable data center architectures."
    },
    {
      title: "VMware Certified Professional - Data Center Virtualization (VCP-DCV 2020)",
      shortName: "VMware VCP-DCV",
      level: "Professional",
      year: "Oct 2020",
      icon: "fas fa-server",
      color: "#607078",
      description: "Professional certification for vSphere data center virtualization."
    },
    {
      title: "ITIL Foundation Certificate in IT Service Management",
      shortName: "ITIL",
      level: "Foundation",
      year: "Oct 2020",
      icon: "fas fa-certificate",
      color: "#00BFB3",
      description: "Foundation certification for IT service management best practices."
    },
    {
      title: "Red Hat Certified Engineer (RHCE)",
      shortName: "RHCE",
      level: "Engineer",
      year: "Sep 2016",
      icon: "fab fa-redhat",
      color: "#EE0000",
      description: "Professional certification for advanced Red Hat Enterprise Linux system administration."
    },
  ];

  const archiveContainer = document.getElementById("certifications-archive");
  if (!archiveContainer) return;

  archiveContainer.innerHTML = certifications
    .map((cert, index) => `
      <div class="cert-archive-item glass" data-aos="fade-up" data-aos-delay="${index * 50}" style="--brand-color: ${cert.color}">
        <div class="archive-icon"><i class="${cert.icon}"></i></div>
        <div class="archive-info">
          <div class="archive-title">${cert.shortName}</div>
          <div class="archive-meta" style="font-family: monospace; font-size: 0.65rem; margin-top: 4px;">CONFIRMED_${cert.year} // ${cert.level.toUpperCase()}</div>
        </div>
        <div class="archive-glow"></div>
      </div>
    `).join("");
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
// Project Mini Cards Interaction (For DevOps and Cloud Projects Section)
export function initProjectMiniCards() {
  const cards = document.querySelectorAll('.project-mini-card');

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const isActive = card.classList.contains('active');

      // Close all others first
      cards.forEach(c => c.classList.remove('active'));

      if (!isActive) {
        card.classList.add('active');
      }
    });

    const repoLink = card.querySelector('.repo-link');
    repoLink?.addEventListener('click', (e) => {
      e.stopPropagation();
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
  initProjectMiniCards();
  displaySiteVersion();

  // Hide loading screen after everything is ready
  window.addEventListener("load", hideLoadingScreen);
}
