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
      title: "Certified Kubernetes Administrator (CKA)",
      shortName: "CKA",
      level: "CNCF",
      year: "Jan 2026",
      icon: "images/icon-k8s.svg",
      color: "#326CE5",
      description: "Validates the skills, knowledge, and competency to perform the responsibilities of Kubernetes administrators."
    },
    {
      title: "AWS Certified: DevOps Engineer",
      shortName: "AWS DevOps",
      level: "Professional",
      year: "Oct 2025",
      icon: "images/icon-aws.svg",
      color: "#FF9900",
      description: "Validates technical expertise in provisioning, operating, and managing distributed application systems on the AWS platform."
    },
    {
      title: "Microsoft Certified: Azure Solutions Architect",
      shortName: "Azure Architect",
      level: "Expert",
      year: "Jan 2024",
      icon: "images/icon-azure.svg",
      color: "#00A4EF",
      description: "Expert-level certification for designing and implementing solutions that run on Microsoft Azure, including aspects like compute, network, storage, and security."
    },
    {
      title: "Microsoft Certified: Azure Administrator",
      shortName: "Azure Admin",
      level: "Associate",
      year: "Jan 2024",
      icon: "images/icon-azure.svg",
      color: "#00A4EF",
      description: "Validates the skills needed to implement, manage, and monitor an organization’s Microsoft Azure environment."
    },
    {
      title: "Oracle Cloud Infrastructure 2023 Architect",
      shortName: "Oracle Cloud",
      level: "Professional",
      year: "Jul 2023",
      icon: "fas fa-database",
      color: "#F80000",
      description: "Demonstrates the knowledge required to specify and architect infrastructure solutions using Oracle Cloud Infrastructure services."
    },
    {
      title: "VMware Certified Professional — Network Virtualization",
      shortName: "VMware VCP-NV",
      level: "VCP-NV 2023",
      year: "Feb 2023",
      icon: "images/icon-vmware.svg",
      color: "#607078",
      description: "Validates the ability to transform the economics of network and security operations for your organization using NSX."
    },
    {
      title: "Nutanix Certified Master 5 — Multicloud Infrastructure",
      shortName: "Nutanix NCM",
      level: "NCM-MCI5",
      year: "Nov 2022",
      icon: "images/icon-nutanix.svg",
      color: "#3d4d5d",
      description: "Master-level certification proving ability to perform advanced administrative tasks on Nutanix clusters."
    },
    {
      title: "Red Hat Certified Specialist in Ansible Automation",
      shortName: "Ansible",
      level: "Specialist",
      year: "Feb 2022",
      icon: "images/icon-ansible.svg",
      color: "#EE0000",
      description: "Demonstrates the skills, knowledge, and abilities needed to use Ansible to automate the management and deployment of systems and applications."
    },
    {
      title: "Cisco Certified Network Professional Data Center",
      shortName: "CCNP DC",
      level: "CCNP Data Center",
      year: "Jan 2021",
      icon: "images/icon-cisco.svg",
      color: "#017CAD",
      description: "Professional-level certification covering data center infrastructure skills, from implementation to design and operation."
    },
    {
      title: "Cisco Certified Specialist — Data Center Design",
      shortName: "Cisco DC Design",
      level: "Specialist",
      year: "Jan 2021",
      icon: "images/icon-cisco.svg",
      color: "#017CAD",
      description: "Specialist certification focusing on the design of data center infrastructure."
    },
    {
      title: "VMware Certified Professional — Data Center Virtualization",
      shortName: "VMware VCP-DCV",
      level: "VCP-DCV 2020",
      year: "Oct 2020",
      icon: "images/icon-vmware.svg",
      color: "#607078",
      description: "Validates the skills to implement, manage, and troubleshoot a vSphere infrastructure."
    },
    {
      title: "ITIL® Foundation Certificate in IT Service Management",
      shortName: "ITIL",
      level: "Foundation",
      year: "Oct 2020",
      icon: "fas fa-certificate",
      color: "#00BFB3",
      description: "Introduction to the management of modern IT-enabled services, proving understanding of the common language and key concepts."
    },
    {
      title: "Red Hat Certified Engineer (RHCE)",
      shortName: "RHCE",
      level: "Engineer",
      year: "Sep 2016",
      icon: "images/icon-redhat.svg",
      color: "#EE0000",
      description: "A Red Hat Certified System Administrator who possesses the additional skills, knowledge, and abilities required of a senior system administrator."
    },
  ];

  // Render Certification Cards
  const archiveContainer = document.getElementById("certifications-archive");
  if (!archiveContainer) return;

  // Create Modal Elements (Inject into DOM if not exists)
  if (!document.querySelector('.cert-modal-overlay')) {
    const modalHTML = `
      <div class="cert-modal-overlay" id="cert-modal">
        <div class="cert-modal-content">
          <button class="cert-modal-close" aria-label="Close Modal"><i class="fas fa-times"></i></button>

          <div class="cert-modal-header">
            <div class="cert-modal-icon" id="modal-icon-container">
              <!-- Icon or Image inserted here -->
            </div>
            <div class="cert-modal-title-group">
              <div class="cert-modal-issuer" id="modal-issuer">Issuer Name</div>
              <h3 id="modal-title">Certification Title</h3>
            </div>
          </div>

          <div class="cert-modal-body">
             <div class="cert-detail-row">
              <span class="cert-label">Level</span>
              <span class="cert-value" id="modal-level">Professional</span>
            </div>
            <div class="cert-detail-row">
              <span class="cert-label">Issued</span>
              <span class="cert-value" id="modal-year">2024</span>
            </div>
             <div class="cert-detail-row" style="flex-direction: column; gap: 0.5rem; justify-content: flex-start; align-items: flex-start;">
              <span class="cert-label">Description</span>
              <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; line-height: 1.5;" id="modal-desc">
                Description goes here...
              </p>
            </div>

          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Generate Cards
  archiveContainer.innerHTML = certifications
    .map((cert, index) => {
        // Prepare icon HTML
        let iconHtml = '';
        if (cert.icon.startsWith('fab') || cert.icon.startsWith('fas')) {
             iconHtml = `<i class="${cert.icon}" style="font-size: 1.4rem;"></i>`;
        } else {
             // It's an image path
             iconHtml = `<img src="${cert.icon}" alt="${cert.shortName}" style="width: 28px; height: 28px; filter: brightness(0) invert(1);">`;
        }

        return `
      <div class="cert-archive-item glass cursor-pointer"
           data-aos="fade-up"
           data-aos-delay="${index * 50}"
           style="--brand-color: ${cert.color}; cursor: pointer;"
           onclick="openCertModal(${index})">
        <div class="archive-icon">${iconHtml}</div>
        <div class="archive-info">
          <div class="archive-title">${cert.title}</div>
          <div class="archive-meta" style="margin-top: 2px;">${cert.level}</div>
        </div>
        <div class="archive-glow"></div>
      </div>
    `;
    }).join("");

    // Modal Logic
    const modal = document.getElementById('cert-modal');
    const closeBtn = modal.querySelector('.cert-modal-close');
    const overlay = modal;

    window.openCertModal = (index) => {
      const cert = certifications[index];

      // Populate Data
      document.getElementById('modal-title').textContent = cert.title;
      document.getElementById('modal-issuer').textContent = cert.shortName.split(' ')[0] || 'Issuer'; // Simple heuristic
      document.getElementById('modal-level').textContent = cert.level;
      document.getElementById('modal-year').textContent = cert.year;
      document.getElementById('modal-desc').textContent = cert.description;

      const iconContainer = document.getElementById('modal-icon-container');
      if (cert.icon.startsWith('fab') || cert.icon.startsWith('fas')) {
          iconContainer.innerHTML = `<i class="${cert.icon}" style="font-size: 2rem; color: white;"></i>`;
      } else {
          iconContainer.innerHTML = `<img src="${cert.icon}" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; filter: brightness(0) invert(1);">`;
      }

      // Show
      modal.classList.add('active');
    };

    const closeModal = () => {
      modal.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
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
  const hoverTransition =
    "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1)";

  cards.forEach((card) => {
    const originalRotation = card.getAttribute("data-rotation") || "0deg";
    const isCenter =
      card.style.transform &&
      card.style.transform.includes("translate(-50%, -50%)");

    card.addEventListener("mouseenter", () => {
      card.style.transition = hoverTransition;
      if (isCenter) {
        card.style.transform = "translate(-50%, -50%) rotate(0deg) scale(1.05)";
      } else {
        card.style.transform = "rotate(0deg) scale(1.05)";
      }
      card.style.zIndex = "20";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition = hoverTransition;
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
