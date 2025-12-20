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
  const contextIndicator = document.getElementById('terminal-context-indicator');

  if (!commandEl || !outputContainer || !cursor) return;

  const terminalSequence = [
    {
      cmd: 'whoami',
      output: 'Ahmed Belal\nSenior Systems & Cloud Infrastructure Engineer | DevOps & Automation',
      context: 'LOCAL'
    },
    {
      cmd: 'cat /etc/profile',
      output: '12+ years automating enterprise-scale environments\nHigh-availability solutions with 99.9% uptime\nMulti-cloud architect across KSA and Egypt',
      context: 'LOCAL'
    },
    {
      cmd: 'ls -la /skills/',
      output: 'drwxr-xr-x  admin  staff   aws/\ndrwxr-xr-x  admin  staff   kubernetes/\ndrwxr-xr-x  admin  staff   azure/\ndrwxr-xr-x  admin  staff   terraform/\ndrwxr-xr-x  admin  staff   docker/\ndrwxr-xr-x  admin  staff   ansible/\ndrwxr-xr-x  admin  staff   linux/\ndrwxr-xr-x  admin  staff   ci-cd/',
      context: 'LOCAL'
    },
    {
      cmd: 'terraform plan',
      output: 'Plan: 3 to add, 1 to change, 0 to destroy.\n\n  + aws_instance.web_server\n  + aws_db_instance.database\n  ~ aws_s3_bucket.assets\n  + aws_security_group.allow_tls',
      context: 'TERRAFORM-CLOUD'
    },
    {
      cmd: 'docker compose ps',
      output: 'SERVICE              STATUS          UPTIME\naws-infrastructure   healthy         365 days\nkubernetes-cluster   healthy         180 days\nci-cd-pipeline       healthy         90 days',
      context: 'DOCKER-ENGINE'
    },
    {
      cmd: 'kubectl get pods -n production',
      output: 'NAME                    READY   STATUS    RESTARTS\napi-deployment-7d9f8    2/2     Running   0\ndb-statefulset-0        1/1     Running   0\nmonitoring-stack-5c8    1/1     Running   0',
      context: 'K8S-CLUSTER-PROD'
    },
    {
      cmd: 'git log --oneline -4',
      output: 'a3f5d2b Multi-cloud disaster recovery implemented\nc7e9b1a Kubernetes resource optimization\n2d4f8e3 Terraform AWS VPC automation\n9b1c6a5 GitLab CI/CD pipeline enhancement',
      context: 'GIT-REPO'
    },
    {
      cmd: 'curl https://cloudycode.dev/status',
      output: '✓ Infrastructure: Operational (99.97% uptime)\n✓ All services healthy | Zero incidents\n✓ Multi-region deployment active',
      context: 'EXTERNAL-API'
    }
  ];

  let currentIdx = 0;

  function highlightCommand(cmd) {
    if (!cmd) return '';
    const parts = cmd.split(' ');
    let html = '';

    parts.forEach((part, index) => {
      let spanClass = 'cmd-arg';
      if (index === 0 && part !== '') spanClass = 'cmd-bin';
      else if (part.startsWith('-')) spanClass = 'cmd-flag';
      else if (part.includes('/') || part.startsWith('http')) spanClass = 'cmd-path';

      if (part !== '') {
        html += `<span class="${spanClass}">${part}</span>`;
      }

      if (index < parts.length - 1) {
        html += ' ';
      }
    });

    return html;
  }

  function renderOutput(step) {
    outputContainer.innerHTML = '';
    outputContainer.style.opacity = '0';

    // Check if command is tabular
    const isDocker = step.cmd.includes('docker');
    const isK8s = step.cmd.includes('kubectl');
    const isLs = step.cmd.includes('ls -la');

    if (isDocker || isK8s) {
      const grid = document.createElement('div');
      grid.style.display = 'grid';
      grid.style.width = '100%';

      // Define rigid column widths to ensure perfect alignment
      grid.style.gridTemplateColumns = isDocker ? '200px 120px 1fr' : '200px 80px 100px 1fr';
      grid.style.gap = '8px 15px';

      const lines = step.output.split('\n');
      lines.forEach((line, idx) => {
        const cells = line.trim().split(/\s{2,}/);

        // If line splitting failed to get enough cells, try fallback split for headers
        const finalCells = (cells.length < 2) ? line.trim().split(/\s+/) : cells;

        finalCells.forEach((cellText, cellIdx) => {
          const cell = document.createElement('span');
          cell.style.whiteSpace = 'nowrap';

          if (idx === 0) {
            // Header styling
            cell.style.color = 'rgba(255, 255, 255, 0.2)';
            cell.style.fontSize = '0.7rem';
            cell.style.textTransform = 'uppercase';
            cell.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            cell.style.paddingBottom = '4px';
          }

          if (cellText === 'healthy' || cellText === 'Running') {
            cell.innerHTML = `<span class="badge ${cellText === 'healthy' ? 'badge-healthy' : 'badge-running'}">${cellText}</span>`;
          } else {
            cell.textContent = cellText;
            if (idx > 0) {
              cell.style.color = (cellIdx === 0) ? '#fff' : 'rgba(202, 211, 245, 0.7)';
            }
          }
          grid.appendChild(cell);
        });
      });
      outputContainer.appendChild(grid);
    } else if (isLs) {
      const grid = document.createElement('div');
      grid.className = 'terminal-output-grid';
      // skills in 2 columns
      grid.style.display = 'grid';
      grid.style.gridTemplateColumns = '1fr 1fr';
      grid.style.gap = '8px 25px';

      const lines = step.output.split('\n');
      lines.forEach(line => {
        const entry = document.createElement('div');
        entry.style.display = 'flex';
        entry.style.gap = '15px';

        // Match: perms owner group name
        const match = line.match(/^([drwx\-]+)\s+(\w+)\s+(\w+)\s+(.+)$/);
        if (match) {
          const [_, perms, owner, group, name] = match;
          entry.innerHTML = `<span style="color: #4b5563; font-size: 0.8rem;">${perms}</span><span style="color: #a362ff; font-weight: 600;">${name}</span>`;
          grid.appendChild(entry);
        }
      });
      outputContainer.appendChild(grid);
    } else if (step.cmd === 'whoami') {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';
      container.style.paddingLeft = '5px';

      const lines = step.output.split('\n');
      const labels = ['USER', 'ROLE'];

      lines.forEach((line, i) => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '15px';
        row.style.alignItems = 'baseline';

        const label = document.createElement('span');
        label.textContent = labels[i] || 'INFO';
        label.style.fontSize = '0.65rem';
        label.style.fontWeight = '800';
        label.style.color = 'rgba(163, 98, 255, 0.5)';
        label.style.border = '1px solid rgba(163, 98, 255, 0.2)';
        label.style.padding = '2px 6px';
        label.style.borderRadius = '3px';
        label.style.minWidth = '45px';
        label.style.textAlign = 'center';

        const text = document.createElement('span');
        text.textContent = line;
        text.style.color = i === 0 ? '#fff' : 'rgba(202, 211, 245, 0.8)';
        text.style.fontWeight = i === 0 ? '700' : '400';
        text.style.fontSize = i === 0 ? '1rem' : '0.9rem';

        row.appendChild(label);
        row.appendChild(text);
        container.appendChild(row);
      });
      outputContainer.appendChild(container);
    } else if (step.cmd.includes('terraform')) {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '8px';
      container.style.paddingLeft = '5px';

      const lines = step.output.split('\n');
      lines.forEach((line, i) => {
        const row = document.createElement('div');
        row.style.fontSize = '0.9rem';
        row.style.fontFamily = 'inherit';

        if (line.includes('Plan:')) {
          row.style.color = '#fff';
          row.style.fontWeight = '700';
          row.style.marginBottom = '10px';
          row.textContent = line;
        } else if (line.trim().startsWith('+')) {
          row.innerHTML = `<span style="color: #6ee7b7; font-weight: 900; margin-right: 10px;">+</span><span style="color: rgba(202, 211, 245, 0.9);">${line.replace('+', '').trim()}</span>`;
        } else if (line.trim().startsWith('~')) {
          row.innerHTML = `<span style="color: #f59e0b; font-weight: 900; margin-right: 10px;">~</span><span style="color: rgba(202, 211, 245, 0.9);">${line.replace('~', '').trim()}</span>`;
        } else if (line.trim().startsWith('-')) {
          row.innerHTML = `<span style="color: #ef4444; font-weight: 900; margin-right: 10px;">-</span><span style="color: rgba(202, 211, 245, 0.9);">${line.replace('-', '').trim()}</span>`;
        } else {
          row.textContent = line;
          row.style.color = 'rgba(255, 255, 255, 0.3)';
        }
        container.appendChild(row);
      });
      outputContainer.appendChild(container);
    } else if (step.cmd.includes('/etc/profile')) {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';
      container.style.paddingLeft = '5px';

      const lines = step.output.split('\n');
      lines.forEach(line => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '12px';
        row.style.alignItems = 'flex-start';

        const bullet = document.createElement('span');
        bullet.innerHTML = '▹';
        bullet.style.color = '#a362ff';

        const text = document.createElement('span');
        text.style.color = 'rgba(202, 211, 245, 0.9)';
        text.style.fontSize = '0.9rem';
        text.style.lineHeight = '1.5';

        // Highlight numbers and keywords
        let processedText = line.replace(/(\d+\+?\s?years|\d+\.\d+%)/g, '<span style="color: #6ee7b7; font-weight: 700;">$1</span>');
        processedText = processedText.replace(/(KSA and Egypt|Multi-cloud|High-availability)/g, '<span style="color: #fff; font-weight: 600;">$1</span>');

        text.innerHTML = processedText;

        row.appendChild(bullet);
        row.appendChild(text);
        container.appendChild(row);
      });
      outputContainer.appendChild(container);
    } else {
      const pre = document.createElement('pre');
      pre.style.color = 'rgba(202, 211, 245, 0.9)';
      pre.style.whiteSpace = 'pre-wrap';
      pre.style.fontSize = '0.9rem';
      pre.style.lineHeight = '1.7';
      pre.style.margin = '0';

      if (step.cmd.includes('git log')) {
        pre.innerHTML = step.output.split('\n').map(line => {
          const spaceIdx = line.indexOf(' ');
          if (spaceIdx === -1) return line;
          const hash = line.substring(0, spaceIdx);
          const text = line.substring(spaceIdx);
          return `<span style="color: #f59e0b; font-weight: 700;">${hash}</span><span style="color: rgba(202, 211, 245, 0.8);">${text}</span>`;
        }).join('\n');
      } else if (step.cmd.includes('curl')) {
        pre.style.color = '#00ff88';
        pre.style.fontWeight = '500';
        pre.textContent = step.output;
      } else {
        pre.textContent = step.output;
      }
      outputContainer.appendChild(pre);
    }

    setTimeout(() => {
      outputContainer.style.opacity = '1';
      outputContainer.style.transition = 'opacity 0.4s ease';
      if (contextIndicator) {
        contextIndicator.innerHTML = `<span class="status-dot"></span>${step.context}`;
      }
    }, 50);

    // Persistent Drift Card Behavior
    const isCritical = step.cmd.includes('terraform') || step.cmd.includes('kubectl') || step.cmd.includes('docker') || step.cmd.includes('curl');

    // Always clearly visible, but its 'energy' changes
    driftCard.style.opacity = isCritical ? '1' : '0.85';
    driftCard.style.transform = isCritical
      ? 'rotate(1.5deg) translateY(0) scale(1)'
      : 'rotate(0.5deg) translateY(15px) scale(0.98)';
    driftCard.style.filter = 'none'; // Keep it sharp
    driftCard.style.boxShadow = isCritical
      ? '0 30px 60px rgba(163, 98, 255, 0.15)'
      : '0 15px 30px rgba(0, 0, 0, 0.5)';
    driftCard.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    driftCard.style.pointerEvents = 'all';
  }

  function typeCommand(step) {
    let i = 0;
    commandEl.innerHTML = '';
    // Permanently hide the static cursor managed elsewhere to prevent duplication
    if (cursor) cursor.style.display = 'none';

    function typeNextChar() {
      if (i < step.cmd.length) {
        const currentText = step.cmd.substring(0, i + 1);
        commandEl.innerHTML = highlightCommand(currentText) + '<span class="typing-cursor"></span>';

        i++;
        let delay = 50 + Math.random() * 40;
        if (step.cmd[i-1] === ' ') delay += 40;

        setTimeout(typeNextChar, delay);
      } else {
        // Keep the cursor blinking after typing is finished
        commandEl.innerHTML = highlightCommand(step.cmd) + '<span class="typing-cursor"></span>';
        setTimeout(() => {
          renderOutput(step);
          setTimeout(nextStep, 4000);
        }, 500);
      }
    }

    typeNextChar();
  }

  function nextStep() {
    outputContainer.style.opacity = '0';
    setTimeout(() => {
      currentIdx = (currentIdx + 1) % terminalSequence.length;
      typeCommand(terminalSequence[currentIdx]);
    }, 600);
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
