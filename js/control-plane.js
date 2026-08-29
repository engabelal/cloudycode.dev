const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const header = document.querySelector("[data-header]");
const desktopNavigation = window.matchMedia("(min-width: 60rem)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const sectionLinks = menu
  ? [...menu.querySelectorAll(':scope > a[href^="#"]:not(.nav-cta)')]
  : [];
let smoothScroll;

function setMenuState(open) {
  if (!menuToggle || !menu) return;

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.querySelector(".sr-only").textContent = open
    ? "Close navigation"
    : "Open navigation";
  menu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

menuToggle?.addEventListener("click", () => {
  setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
});

menu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuState(false);
});

document.addEventListener("keydown", (event) => {
  const menuIsOpen = menuToggle?.getAttribute("aria-expanded") === "true";

  if (event.key === "Escape" && menuIsOpen) {
    setMenuState(false);
    menuToggle?.focus();
  }

  if (event.key === "Tab" && menuIsOpen && menuToggle && menu) {
    const focusable = [menuToggle, ...menu.querySelectorAll("a")];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

desktopNavigation.addEventListener("change", (event) => {
  if (event.matches) setMenuState(false);
});

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

let activeSectionFrame;

function updateActiveSection() {
  activeSectionFrame = undefined;
  if (!sectionLinks.length) return;

  const marker = window.scrollY + Math.max(120, window.innerHeight * 0.28);
  let currentLink = sectionLinks[0];

  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section && section.offsetTop <= marker) currentLink = link;
  });

  sectionLinks.forEach((link) => {
    const current = link === currentLink;
    link.classList.toggle("is-current", current);
    if (current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function scheduleActiveSectionUpdate() {
  if (activeSectionFrame) return;
  activeSectionFrame = window.requestAnimationFrame(updateActiveSection);
}

updateActiveSection();
window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
window.addEventListener("resize", scheduleActiveSectionUpdate);
window.addEventListener("hashchange", scheduleActiveSectionUpdate);

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

function initializeMotion() {
  if (reducedMotion.matches) return;

  document.documentElement.classList.add("motion-enabled");

  const heroElements = document.querySelectorAll(
    ".hero .eyebrow, .hero-intro, .hero-actions, .availability, .control-plane, .proof-strip > div"
  );

  heroElements.forEach((element, index) => {
    element.classList.add("hero-motion");
    element.style.setProperty("--motion-delay", `${Math.min(index, 5) * 70}ms`);
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.documentElement.classList.add("motion-loaded"));
  });

  const revealSelectors = [
    ".section-ruler",
    ".section-heading > *",
    ".system-record",
    ".lab-feature > *",
    ".lab-card",
    ".catalogue-link",
    ".process-heading > *",
    ".process-card",
    ".identity-panel > *",
    ".credentials-heading > *",
    ".credential-list > li",
    ".contact-panel > *",
    ".footer-main > *",
    ".footer-bottom",
  ];

  const revealElements = [];
  revealSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty("--motion-delay", `${(index % 4) * 65}ms`);
      revealElements.push(element);
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -7%" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const rail = document.querySelector(".system-rail");
  const railList = rail?.querySelector("ul");
  if (rail && railList) {
    [...railList.children].forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      railList.append(clone);
    });
    rail.classList.add("is-marquee");
  }

  const log = document.querySelector(".plane-log");
  const logEvent = log?.querySelector(".log-event");
  const logMessage = log?.querySelector("strong");
  const logResult = log?.querySelector(".log-result");
  const checks = [
    ["identity/sign", "commit verified", "PASS"],
    ["artifact/trace", "provenance linked", "PASS"],
    ["policy/check", "evidence verified", "PASS"],
    ["deploy/health", "signals connected", "LIVE"],
  ];

  if (log && logEvent && logMessage && logResult) {
    let checkIndex = 2;
    window.setInterval(() => {
      if (document.hidden || menuToggle?.getAttribute("aria-expanded") === "true") return;
      log.classList.add("is-switching");
      window.setTimeout(() => {
        checkIndex = (checkIndex + 1) % checks.length;
        [logEvent.textContent, logMessage.textContent, logResult.textContent] = checks[checkIndex];
        log.classList.remove("is-switching");
      }, 320);
    }, 2500);
  }

  document.querySelectorAll(".primary-nav > a:not(.nav-cta) .roll-label").forEach((label) => {
    label.dataset.label = label.textContent;
    label.classList.add("roll-label");
  });
}

initializeMotion();

if (!reducedMotion.matches && typeof window.Lenis === "function") {
  smoothScroll = new window.Lenis({
    autoRaf: true,
    anchors: true,
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    stopInertiaOnNavigate: true,
  });
}

if ("serviceWorker" in navigator && location.protocol === "https:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // The portfolio remains fully functional without offline support.
    });
  });
}
