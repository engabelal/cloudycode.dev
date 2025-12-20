// Animations Module
// CloudyCode v7.0.0

import { prefersReducedMotion, createObserver } from './utils.js';

// Typing Animation
export function initTypingEffect() {
  const element = document.querySelector('.typed-text');
  if (!element) return;

  const phrases = [
    'Automated, resilient, and brilliantly efficient',
    'Built for scale, designed for reliability',
    'Structured, stable, and effortlessly alive'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  const typeSpeed = prefersReducedMotion() ? 10 : 50;
  const deleteSpeed = prefersReducedMotion() ? 5 : 25;
  const pauseDuration = prefersReducedMotion() ? 500 : 3000;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) {
      setTimeout(type, pauseDuration);
      isPaused = false;
      isDeleting = true;
      return;
    }

    if (isDeleting) {
      element.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = pauseDuration;
      isPaused = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
}

// Initialize Particles.js
export function initParticles() {
  if (typeof particlesJS === 'undefined') {
    console.warn('Particles.js not loaded');
    return;
  }

  const particlesConfig = {
    particles: {
      number: {
        value: prefersReducedMotion() ? 20 : 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#a362ff'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#a362ff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: !prefersReducedMotion(),
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: !prefersReducedMotion(),
          mode: 'grab'
        },
        onclick: {
          enable: !prefersReducedMotion(),
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };

  particlesJS('particles-js', particlesConfig);
}

// Initialize AOS (Animate On Scroll)
export function initAOS() {
  if (typeof AOS === 'undefined') {
    console.warn('AOS not loaded');
    return;
  }

  AOS.init({
    duration: prefersReducedMotion() ? 0 : 800,
    easing: 'ease-out',
    once: true,
    offset: 100,
    delay: 0,
    disable: prefersReducedMotion()
  });
}

// Initialize Counter Animation
export function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = prefersReducedMotion() ? 100 : 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };

    // Start counting when element is in viewport
    const observer = createObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}

// Initialize Terminal Animation
export function initTerminalAnimation() {
  const terminalOutput = document.getElementById('terminal-output');
  if (!terminalOutput || prefersReducedMotion()) return;

  const commands = [
    { cmd: '$ whoami', output: 'ahmed@cloudycode:~$ DevOps & Cloud Engineer', delay: 500 },
    { cmd: '$ cat expertise.txt', output: 'AWS | Azure | Kubernetes | Terraform', delay: 1000 },
    { cmd: '$ ', output: '', delay: 1500 }
  ];

  let currentCommand = 0;
  const lines = terminalOutput.querySelectorAll('p');

  function typeCommand() {
    if (currentCommand < commands.length) {
      const command = commands[currentCommand];
      setTimeout(() => {
        if (lines[currentCommand * 2]) {
          lines[currentCommand * 2].classList.add('animate-fade-in');
        }
        if (lines[currentCommand * 2 + 1]) {
          lines[currentCommand * 2 + 1].classList.add('animate-fade-in');
        }
        currentCommand++;
        typeCommand();
      }, command.delay);
    }
  }

  typeCommand();
}

// Initialize Scroll-triggered Animations
export function initScrollAnimations() {
  if (prefersReducedMotion()) return;

  const elements = document.querySelectorAll('[data-aos]');
  if (elements.length === 0) return;

  const observer = createObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// Initialize Stagger Animations
export function initStaggerAnimations() {
  if (prefersReducedMotion()) return;

  const staggerGroups = document.querySelectorAll('[data-stagger]');

  staggerGroups.forEach(group => {
    const children = group.children;
    Array.from(children).forEach((child, index) => {
      child.style.animationDelay = `${index * 0.1}s`;
    });
  });
}

// Initialize Float Animation for Lottie
export function initFloatAnimation() {
  if (prefersReducedMotion()) return;

  const floatElements = document.querySelectorAll('.animate-float');
  floatElements.forEach(el => {
    el.style.animation = 'float 3s ease-in-out infinite';
  });
}

// Hero Terminal Simulation
export function initHeroTerminal() {
  const command = document.getElementById('hero-terminal-command');
  const output = document.getElementById('hero-terminal-output');
  const cursor = document.getElementById('hero-terminal-cursor');

  if (!command || !output || !cursor) return;

  const fullCommand = 'kubectl get pods -n production';
  command.textContent = '';
  let i = 0;

  function typeCommand() {
    if (i < fullCommand.length) {
      command.textContent += fullCommand.charAt(i);
      i++;
      setTimeout(typeCommand, 70);
    } else {
      cursor.style.display = 'none';
      setTimeout(() => {
        output.style.opacity = '1';
      }, 500);
    }
  }

  // Use Intersection Observer to start animation when visible
  const observer = createObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(typeCommand, 1000);
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(command.parentElement);
}

// Initialize All Animations
export function initAnimations() {
  initTypingEffect();
  initParticles();
  initAOS();
  initCounters();
  initTerminalAnimation();
  initScrollAnimations();
  initStaggerAnimations();
  initFloatAnimation();
  initHeroTerminal();
}
