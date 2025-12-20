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
  const commandEl = document.getElementById('hero-terminal-command');
  const outputContainer = document.getElementById('hero-terminal-output-container');
  const cursor = document.getElementById('hero-terminal-cursor');
  const driftCard = document.getElementById('hero-drift-card');

  if (!commandEl || !outputContainer || !cursor) return;

  const terminalSequence = [
    {
      cmd: 'whoami',
      output: 'Ahmed Belal\nSenior Systems & Cloud Infrastructure Engineer | DevOps & Automation'
    },
    {
      cmd: 'cat /etc/profile',
      output: '12+ years automating enterprise-scale environments\nHigh-availability solutions with 99.9% uptime\nMulti-cloud architect across KSA and Egypt'
    },
    {
      cmd: 'ls -la /skills/',
      output: 'drwxr-xr-x  aws/          drwxr-xr-x  kubernetes/\ndrwxr-xr-x  azure/        drwxr-xr-x  terraform/\ndrwxr-xr-x  docker/       drwxr-xr-x  ansible/\ndrwxr-xr-x  linux/        drwxr-xr-x  ci-cd/'
    },
    {
      cmd: 'docker compose ps',
      output: 'SERVICE              STATUS       UPTIME\naws-infrastructure   healthy      365 days\nkubernetes-cluster   healthy      180 days\nci-cd-pipeline      healthy      90 days'
    },
    {
      cmd: 'kubectl get pods -n production',
      output: 'NAME                    READY   STATUS    RESTARTS\napi-deployment-7d9f8    2/2     Running   0\ndb-statefulset-0        1/1     Running   0\nmonitoring-stack-5c8    1/1     Running   0'
    },
    {
      cmd: 'git log --oneline -4',
      output: 'a3f5d2b Multi-cloud disaster recovery implemented\nc7e9b1a Kubernetes resource optimization\n2d4f8e3 Terraform AWS VPC automation\n9b1c6a5 GitLab CI/CD pipeline enhancement'
    },
    {
      cmd: 'curl https://cloudycode.dev/status',
      output: '✓ Infrastructure: Operational (99.97% uptime)\n✓ All services healthy | Zero incidents\n✓ Multi-region deployment active'
    }
  ];

  let currentIdx = 0;

  function renderOutput(step) {
    outputContainer.innerHTML = '';
    outputContainer.style.opacity = '0';

    // Create pre element for authentic terminal feel
    const pre = document.createElement('pre');
    pre.style.color = '#cad3f5';
    pre.style.whiteSpace = 'pre-wrap';
    pre.style.fontSize = '0.95rem';
    pre.style.lineHeight = '1.8';
    pre.style.margin = '0';

    // Apply special styling based on command
    if (step.cmd === 'git log --oneline -4') {
      // Highlight commit hashes in orange
      const lines = step.output.split('\n');
      pre.innerHTML = lines.map(line => {
        const spaceIdx = line.indexOf(' ');
        const hash = line.substring(0, spaceIdx);
        const text = line.substring(spaceIdx);
        return `<span style="color: #f59e0b; font-weight: 700;">${hash}</span><span style="color: rgba(202, 211, 245, 0.9);">${text}</span>`;
      }).join('\n');
    } else if (step.cmd.includes('curl')) {
      pre.style.color = '#00ff88';
      pre.style.fontWeight = '500';
      pre.textContent = step.output;
    } else if (step.cmd.includes('docker') || step.cmd.includes('kubectl')) {
      // Highlight health/running status
      let html = step.output;
      html = html.replace(/healthy/g, '<span class="status-running">healthy</span>');
      html = html.replace(/Running/g, '<span class="status-running">Running</span>');
      pre.innerHTML = html;
    } else if (step.cmd.includes('ls')) {
      // Colorize directories (skills)
      let html = step.output;
      html = html.replace(/(\w+\/)/g, '<span style="color: #a362ff; font-weight: 600;">$1</span>');
      pre.innerHTML = html;
    } else {
      pre.textContent = step.output;
    }

    outputContainer.appendChild(pre);

    // Fade in animation
    setTimeout(() => {
      outputContainer.style.opacity = '1';
      outputContainer.style.transition = 'opacity 0.4s ease';
    }, 50);

    // Show/Hide Drift Card (Logic same as old site but improved)
    const isCritical = step.cmd.includes('terraform') || step.cmd.includes('kubectl');
    driftCard.style.opacity = isCritical ? '1' : '0.2';
    driftCard.style.transform = isCritical ? 'rotate(1deg) translateY(0)' : 'rotate(1deg) translateY(20px)';
    driftCard.style.filter = isCritical ? 'none' : 'blur(2px)';
  }

  function typeCommand(step) {
    let i = 0;
    commandEl.textContent = '';
    cursor.style.display = 'none'; // Use inline cursor during typing

    function typeNextChar() {
      if (i < step.cmd.length) {
        const char = step.cmd.charAt(i);
        const currentText = step.cmd.substring(0, i + 1);

        // Inline cursor during typing
        commandEl.innerHTML = currentText + '<span class="typing-cursor"></span>';

        i++;

        // Match old site's natural typing speed
        let delay = 50 + Math.random() * 30; // 50-80ms base
        if (char === ' ') delay += 20;
        if (char === '/' || char === '-' || char === '.') delay += 15;

        setTimeout(typeNextChar, delay);
      } else {
        // Typing complete - keep text, show output after pause
        commandEl.textContent = step.cmd;
        setTimeout(() => {
          renderOutput(step);
          // Old site output duration: 3000ms
          setTimeout(nextStep, 3500);
        }, 500);
      }
    }

    typeNextChar();
  }

  function nextStep() {
    // Clear for next command
    outputContainer.style.opacity = '0';
    setTimeout(() => {
      currentIdx = (currentIdx + 1) % terminalSequence.length;
      typeCommand(terminalSequence[currentIdx]);
    }, 500);
  }

  // Intersection Observer to start
  const observer = createObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Initial delay matches old site feel
        setTimeout(() => typeCommand(terminalSequence[0]), 1500);
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(commandEl.parentElement);
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
