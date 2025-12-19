// UI Module
// CloudyCode v7.0.0

import { smoothScrollTo, getScrollPercentage, scrollToTop, debounce, throttle, trapFocus } from './utils.js';

// Mobile Menu
export function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu when clicking on a link
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Smooth Navigation
export function initSmoothNavigation() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        smoothScrollTo(target, 80);
        window.history.pushState(null, '', href);
      }
    });
  });
}

// Navbar Scroll Behavior
export function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
      navbar.classList.add('shadow-xl');
    } else {
      navbar.classList.remove('shadow-xl');
    }

    // Hide/show navbar on scroll (optional)
    // if (currentScroll > lastScroll && currentScroll > 100) {
    //   navbar.style.transform = 'translateY(-100%)';
    // } else {
    //   navbar.style.transform = 'translateY(0)';
    // }

    lastScroll = currentScroll;
  }, 100);

  window.addEventListener('scroll', handleScroll);
}

// Scroll Progress Bar
export function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  const updateProgress = throttle(() => {
    const progress = getScrollPercentage();
    progressBar.style.transform = `scaleX(${progress / 100})`;
  }, 50);

  window.addEventListener('scroll', updateProgress);
}

// Back to Top Button
export function initBackToTop() {
  const button = document.getElementById('back-to-top');
  if (!button) return;

  const toggleButton = throttle(() => {
    if (window.pageYOffset > 300) {
      button.classList.remove('opacity-0', 'invisible');
      button.classList.add('opacity-100', 'visible');
    } else {
      button.classList.add('opacity-0', 'invisible');
      button.classList.remove('opacity-100', 'visible');
    }
  }, 100);

  window.addEventListener('scroll', toggleButton);

  button.addEventListener('click', () => {
    scrollToTop();
  });
}

// Loading Screen
export function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 500);
}

// Certifications Section
export function initCertifications() {
  const certifications = [
    {
      title: 'AWS Certified DevOps Engineer - Professional',
      level: 'Professional',
      year: 'Oct 2025',
      description: 'Advanced AWS DevOps practices, CI/CD pipelines, and automation'
    },
    {
      title: 'Microsoft Azure Solutions Architect Expert',
      level: 'Expert',
      year: 'Jan 2024',
      description: 'Azure infrastructure design, security, and cloud solutions'
    },
    {
      title: 'Microsoft Azure Administrator Associate',
      level: 'Associate',
      year: 'Jan 2024',
      description: 'Azure resource management, networking, and security'
    },
    {
      title: 'Oracle Cloud Infrastructure Architect',
      level: 'Professional',
      year: 'Jul 2023',
      description: 'OCI infrastructure design and cloud architecture'
    },
    {
      title: 'VMware VCP-NV 2023',
      level: 'Professional',
      year: 'Feb 2023',
      description: 'VMware NSX virtualization and network security'
    },
    {
      title: 'Nutanix NCM-MCI5',
      level: 'Master',
      year: 'Nov 2022',
      description: 'Nutanix Multicloud Infrastructure administration'
    },
    {
      title: 'Red Hat Certified Specialist - Ansible Automation',
      level: 'Specialist',
      year: 'Feb 2022',
      description: 'Ansible automation and configuration management'
    },
    {
      title: 'CCNP Data Center',
      level: 'Professional',
      year: 'Jan 2021',
      description: 'Cisco data center networking and infrastructure'
    },
    {
      title: 'Cisco Specialist - Data Center Design',
      level: 'Specialist',
      year: 'Jan 2021',
      description: 'Data center design and architecture'
    },
    {
      title: 'VMware VCP-DCV 2020',
      level: 'Professional',
      year: 'Oct 2020',
      description: 'VMware vSphere data center virtualization'
    },
    {
      title: 'ITIL Foundation',
      level: 'Foundation',
      year: 'Oct 2020',
      description: 'IT service management best practices'
    },
    {
      title: 'Red Hat Certified Engineer',
      level: 'Engineer',
      year: 'Sep 2016',
      description: 'Red Hat Enterprise Linux system administration'
    }
  ];

  const container = document.getElementById('certifications-container');
  if (!container) return;

  container.innerHTML = certifications.map((cert, index) => `
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
  `).join('');

  // Optional: Add scroll buttons
  addScrollButtons(container);
}

// Add scroll buttons for certifications
function addScrollButtons(container) {
  const scrollAmount = 300;

  const leftButton = document.createElement('button');
  leftButton.className = 'absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-primary rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform';
  leftButton.innerHTML = '<i class="fas fa-chevron-left text-white"></i>';
  leftButton.setAttribute('aria-label', 'Scroll left');

  const rightButton = document.createElement('button');
  rightButton.className = 'absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-primary rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform';
  rightButton.innerHTML = '<i class="fas fa-chevron-right text-white"></i>';
  rightButton.setAttribute('aria-label', 'Scroll right');

  leftButton.addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightButton.addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  const wrapper = container.parentElement;
  if (wrapper && wrapper.style.position !== 'relative') {
    wrapper.style.position = 'relative';
  }

  wrapper?.appendChild(leftButton);
  wrapper?.appendChild(rightButton);
}

// Active Navigation Link
export function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('text-brand');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('text-brand');
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(section => observer.observe(section));
}

// Site Version Display
export function displaySiteVersion() {
  const versionElement = document.getElementById('site-version');
  if (versionElement) {
    import('../config/site.config.js')
      .then(module => {
        if (module.default?.version) {
          versionElement.textContent = module.default.version;
        }
      })
      .catch(err => console.error('Error loading config:', err));
  }
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
  displaySiteVersion();

  // Hide loading screen after everything is ready
  window.addEventListener('load', hideLoadingScreen);
}
