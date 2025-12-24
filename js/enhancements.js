// CloudyCode.dev Design Enhancements
// Version 2.3

import { prefersReducedMotion } from "./utils.js";

// ========================================
// 1. MAGNETIC CURSOR EFFECT
// ========================================
export function initMagneticCursor() {
  if (prefersReducedMotion()) return;

  const buttons = document.querySelectorAll('.btn-primary, .btn-primary-header, .btn-secondary');

  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      button.style.setProperty('--mouse-x', `${x}%`);
      button.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

// ========================================
// 2. SPOTLIGHT MOUSE-FOLLOW EFFECT
// ========================================
export function initSpotlight() {
  if (prefersReducedMotion()) return;

  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    hero.style.setProperty('--mouse-x', `${x}px`);
    hero.style.setProperty('--mouse-y', `${y}px`);
  });
}

// ========================================
// 3. RIPPLE EFFECT ON CLICKS
// ========================================
export function initRippleEffect() {
  if (prefersReducedMotion()) return;

  const elements = document.querySelectorAll('.floating-card, .stat-card, .tech-item, .project-card');

  elements.forEach(element => {
    element.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ========================================
// 4. PARALLAX SCROLLING
// ========================================
export function initParallax() {
  if (prefersReducedMotion()) return;
  if (window.innerWidth < 768) return; // Disable on mobile

  const terminal = document.querySelector('.hero-terminal');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    if (terminal) {
      terminal.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  }, { passive: true });
}

// ========================================
// 5. COMMAND PALETTE (Cmd/Ctrl + K)
// ========================================
export function initCommandPalette() {
  // Create command palette HTML
  const paletteHTML = `
    <div class="command-palette" id="command-palette">
      <div class="command-palette-backdrop"></div>
      <div class="command-palette-content">
        <div class="command-palette-header">
          <i class="fas fa-terminal"></i>
          <input type="text" id="command-input" placeholder="Type a command or search..." autocomplete="off">
          <span class="command-hint">ESC to close</span>
        </div>
        <div class="command-palette-results" id="command-results">
          <div class="command-category">Navigation</div>
          <div class="command-item" data-action="goto-expertise">
            <i class="fas fa-user"></i>
            <span>Go to About</span>
            <kbd>#expertise</kbd>
          </div>
          <div class="command-item" data-action="goto-arsenal">
            <i class="fas fa-cogs"></i>
            <span>Go to Skills</span>
            <kbd>#arsenal</kbd>
          </div>
          <div class="command-item" data-action="goto-blueprints">
            <i class="fas fa-folder"></i>
            <span>Go to Projects</span>
            <kbd>#blueprints</kbd>
          </div>
          <div class="command-item" data-action="goto-certifications">
            <i class="fas fa-certificate"></i>
            <span>Go to Certifications</span>
            <kbd>#accreditation</kbd>
          </div>
          <div class="command-item" data-action="goto-contact">
            <i class="fas fa-envelope"></i>
            <span>Go to Contact</span>
            <kbd>#connection</kbd>
          </div>
          <div class="command-category">Actions</div>
          <div class="command-item" data-action="scroll-top">
            <i class="fas fa-arrow-up"></i>
            <span>Scroll to Top</span>
          </div>
          <div class="command-item" data-action="copy-email">
            <i class="fas fa-copy"></i>
            <span>Copy Email</span>
          </div>
          <div class="command-item" data-action="toggle-theme">
            <i class="fas fa-moon"></i>
            <span>Toggle Theme (Coming Soon)</span>
          </div>
        </div>
      </div>
    </div>

    <style>
      .command-palette {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        align-items: flex-start;
        justify-content: center;
        padding-top: 15vh;
      }

      .command-palette.active {
        display: flex;
      }

      .command-palette-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
        animation: fadeIn 0.2s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .command-palette-content {
        position: relative;
        width: 90%;
        max-width: 600px;
        background: rgba(31, 22, 51, 0.95);
        border: 1px solid rgba(163, 98, 255, 0.3);
        border-radius: 16px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5),
                    0 0 0 1px rgba(163, 98, 255, 0.1);
        animation: slideDown 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        overflow: hidden;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .command-palette-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.02);
      }

      .command-palette-header i {
        color: #a362ff;
        font-size: 1.2rem;
      }

      #command-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: white;
        font-size: 1.1rem;
        font-family: var(--font-primary);
      }

      #command-input::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }

      .command-hint {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.4);
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .command-palette-results {
        max-height: 400px;
        overflow-y: auto;
        padding: 0.5rem;
      }

      .command-category {
        padding: 0.75rem 1rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .command-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.875rem 1rem;
        margin: 0.25rem 0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .command-item:hover,
      .command-item.selected {
        background: rgba(163, 98, 255, 0.15);
        color: white;
      }

      .command-item i {
        width: 20px;
        color: rgba(255, 255, 255, 0.6);
      }

      .command-item:hover i {
        color: #a362ff;
      }

      .command-item span {
        flex: 1;
        color: rgba(255, 255, 255, 0.9);
      }

      .command-item kbd {
        padding: 0.25rem 0.5rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.6);
        font-family: var(--font-mono);
      }

      .command-palette-results::-webkit-scrollbar {
        width: 8px;
      }

      .command-palette-results::-webkit-scrollbar-thumb {
        background: rgba(163, 98, 255, 0.3);
        border-radius: 4px;
      }
    </style>
  `;

  // Inject into DOM
  document.body.insertAdjacentHTML('beforeend', paletteHTML);

  const palette = document.getElementById('command-palette');
  const input = document.getElementById('command-input');
  const backdrop = palette.querySelector('.command-palette-backdrop');

  // Keyboard shortcut to open (Cmd/Ctrl + K)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      togglePalette();
    }

    // Close on Escape
    if (e.key === 'Escape' && palette.classList.contains('active')) {
      closePalette();
    }
  });

  function togglePalette() {
    palette.classList.toggle('active');
    if (palette.classList.contains('active')) {
      input.focus();
    }
  }

  function closePalette() {
    palette.classList.remove('active');
    input.value = '';
  }

  // Close on backdrop click
  backdrop.addEventListener('click', closePalette);

  // Handle command actions
  const commandItems = document.querySelectorAll('.command-item');
  commandItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      handleCommand(action);
      closePalette();
    });
  });

  function handleCommand(action) {
    switch(action) {
      case 'goto-expertise':
        document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'goto-arsenal':
        document.getElementById('arsenal')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'goto-blueprints':
        document.getElementById('blueprints')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'goto-certifications':
        document.getElementById('accreditation')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'goto-contact':
        document.getElementById('connection')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'scroll-top':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'copy-email':
        navigator.clipboard.writeText('ahmedbelal@cloudycode.dev');
        showToast('Email copied to clipboard!');
        break;
      case 'toggle-theme':
        showToast('Theme toggle coming soon!');
        break;
    }
  }

  // Simple search filter
  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    commandItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// ========================================
// 6. TOAST NOTIFICATIONS
// ========================================
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: linear-gradient(135deg, #a362ff, #fd44b0);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10001;
    animation: slideIn 0.3s ease;
    font-weight: 600;
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ========================================
// 7. OPTIMIZED STARFIELD
// ========================================
export function optimizeStarfield() {
  // This is called from animations.js to reduce particle count
  return {
    particleCount: 150, // Reduced from 250
    minOpacity: 0.2,
    maxOpacity: 0.7
  };
}

// ========================================
// 8. 3D CARD TILT (VANILLA-TILT ALTERNATIVE)
// ========================================
export function init3DTilt() {
  if (prefersReducedMotion()) return;
  if (window.innerWidth < 768) return;

  const cards = document.querySelectorAll('.floating-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', resetTilt);
  });

  function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    const originalRotation = card.getAttribute('data-rotation') || '0deg';
    const isCenter = card.style.transform && card.style.transform.includes('translate(-50%, -50%)');

    if (isCenter) {
      card.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.05)`;
    } else {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
    }
  }

  function resetTilt(e) {
    const card = e.currentTarget;
    const originalRotation = card.getAttribute('data-rotation') || '0deg';
    const isCenter = card.style.transform && card.style.transform.includes('translate(-50%, -50%)');

    if (isCenter) {
      card.style.transform = `translate(-50%, -50%)`;
    } else {
      card.style.transform = `rotate(${originalRotation})`;
    }
  }
}

// ========================================
// 9. SMOOTH REVEAL ANIMATIONS
// ========================================
export function initSmoothReveals() {
  if (prefersReducedMotion()) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// ========================================
// 10. INITIALIZE ALL ENHANCEMENTS
// ========================================
export function initEnhancements() {
  console.log('🚀 CloudyCode Enhancements v2.3 Loading...');

  initMagneticCursor();
  initSpotlight();
  initRippleEffect();
  initParallax();
  initCommandPalette();
  init3DTilt();
  initSmoothReveals();

  console.log('✨ All enhancements loaded successfully!');
}
