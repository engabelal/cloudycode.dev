import { prefersReducedMotion, createObserver } from "./utils.js";

/**
 * Starfield Animation - Background stars effect
 */
class Starfield {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.stars = [];
    this.numStars = prefersReducedMotion() ? 50 : 250;
    this.init();
    window.addEventListener("resize", () => this.init());
  }

  init() {
    // Handle High DPI displays
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(dpr, dpr);

    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      // Create depth layers with varying speeds and sizes
      const depth = Math.random();
      this.stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: depth * 1.5 + 0.2, // Depth-based sizing
        baseOpacity: Math.random() * 0.5 + 0.1,
        opacity: 0,
        speed: depth * 0.15 + 0.05, // Closer stars move slightly faster
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const time = Date.now() * 0.001;

    this.stars.forEach((star) => {
      // Calculate twinkling opacity
      const twinkle =
        Math.sin(time * star.twinkleSpeed * 10 + star.twinkleOffset) * 0.15;

      // Brighter at the top center (radial influence)
      const centerX = window.innerWidth / 2;
      const centerY = 0;
      const dist = Math.sqrt(
        Math.pow(star.x - centerX, 2) + Math.pow(star.y - centerY, 2)
      );
      const maxDist = window.innerWidth * 0.8;
      const radialFactor = Math.max(0.1, 1 - dist / maxDist);

      star.opacity = (star.baseOpacity + twinkle) * radialFactor;

      this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, star.opacity)})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Slow upward drift
      star.y -= star.speed;
      if (star.y < 0) {
        star.y = window.innerHeight;
        star.x = Math.random() * window.innerWidth;
      }
    });
    requestAnimationFrame(() => this.animate());
  }
}

export function initStarfield() {
  const sf = new Starfield("starfield-canvas");
  if (sf.canvas) sf.animate();
}

// Typing Animation
export function initTypingEffect() {
  const element = document.querySelector(".typed-text");
  if (!element) return;

  const phrases = [
    "Automated, resilient, and brilliantly efficient",
    "Built for scale, designed for reliability",
    "Structured, stable, and effortlessly alive",
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
  if (typeof particlesJS === "undefined") {
    console.warn("Particles.js not loaded");
    return;
  }

  const particlesConfig = {
    particles: {
      number: {
        value: prefersReducedMotion() ? 20 : 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#a362ff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#a362ff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: !prefersReducedMotion(),
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: !prefersReducedMotion(),
          mode: "grab",
        },
        onclick: {
          enable: !prefersReducedMotion(),
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  };

  particlesJS("particles-js", particlesConfig);
}

// Initialize AOS (Animate On Scroll)
export function initAOS() {
  if (typeof AOS === "undefined") {
    console.warn("AOS not loaded");
    return;
  }

  AOS.init({
    duration: prefersReducedMotion() ? 0 : 800,
    easing: "ease-out",
    once: true,
    offset: 100,
    delay: 0,
    disable: prefersReducedMotion(),
  });
}

// Initialize Counter Animation
export function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (counters.length === 0) return;

  counters.forEach((counter) => {
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
        counter.textContent = target + "+";
      }
    };

    // Start counting when element is in viewport
    const observer = createObserver((entries) => {
      entries.forEach((entry) => {
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
  const terminalOutput = document.getElementById("terminal-output");
  if (!terminalOutput || prefersReducedMotion()) return;

  const commands = [
    {
      cmd: "$ whoami",
      output: "ahmed@cloudycode:~$ DevOps & Cloud Engineer",
      delay: 500,
    },
    {
      cmd: "$ cat expertise.txt",
      output: "AWS | Azure | Kubernetes | Terraform",
      delay: 1000,
    },
    { cmd: "$ ", output: "", delay: 1500 },
  ];

  let currentCommand = 0;
  const lines = terminalOutput.querySelectorAll("p");

  function typeCommand() {
    if (currentCommand < commands.length) {
      const command = commands[currentCommand];
      setTimeout(() => {
        if (lines[currentCommand * 2]) {
          lines[currentCommand * 2].classList.add("animate-fade-in");
        }
        if (lines[currentCommand * 2 + 1]) {
          lines[currentCommand * 2 + 1].classList.add("animate-fade-in");
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

  const elements = document.querySelectorAll("[data-aos]");
  if (elements.length === 0) return;

  const observer = createObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

// Initialize Stagger Animations
export function initStaggerAnimations() {
  if (prefersReducedMotion()) return;

  const staggerGroups = document.querySelectorAll("[data-stagger]");

  staggerGroups.forEach((group) => {
    const children = group.children;
    Array.from(children).forEach((child, index) => {
      child.style.animationDelay = `${index * 0.1}s`;
    });
  });
}

// Initialize Float Animation for Lottie
export function initFloatAnimation() {
  if (prefersReducedMotion()) return;

  const floatElements = document.querySelectorAll(".animate-float");
  floatElements.forEach((el) => {
    el.style.animation = "float 3s ease-in-out infinite";
  });
}

// Hero Terminal Simulation
export function initHeroTerminal() {
  const terminalContainer = document.getElementById("hero-terminal-container");
  const driftCard = document.getElementById("hero-drift-card");
  const contextIndicator = document.getElementById(
    "terminal-context-indicator"
  );

  if (!terminalContainer) return;

  const terminalSequence = [
    {
      cmd: "whoami",
      output:
        "Ahmed Belal\nSenior Systems & Cloud Infrastructure Engineer | DevOps & Automation",
      context: "LOCAL",
    },
    {
      cmd: "cat /etc/profile",
      output:
        "12+ years automating enterprise-scale environments\nHigh-availability solutions with 99.9% uptime\nMulti-cloud architect across KSA and Egypt",
      context: "LOCAL",
    },
    {
      cmd: "ls -la /skills/",
      output:
        "drwxr-xr-x  admin  staff   aws/\ndrwxr-xr-x  admin  staff   kubernetes/\ndrwxr-xr-x  admin  staff   azure/\ndrwxr-xr-x  admin  staff   terraform/\ndrwxr-xr-x  admin  staff   docker/\ndrwxr-xr-x  admin  staff   ansible/\ndrwxr-xr-x  admin  staff   linux/\ndrwxr-xr-x  admin  staff   ci-cd/",
      context: "LOCAL",
    },
    {
      cmd: "terraform plan",
      output:
        "Plan: 3 to add, 1 to change, 0 to destroy.\n\n  + aws_instance.web_server\n  + aws_db_instance.database\n  ~ aws_s3_bucket.assets\n  + aws_security_group.allow_tls",
      context: "TERRAFORM-CLOUD",
    },
    {
      cmd: "docker compose ps",
      output:
        "SERVICE              STATUS          UPTIME\naws-infrastructure   healthy         365 days\nkubernetes-cluster   healthy         180 days\nci-cd-pipeline       healthy         90 days",
      context: "DOCKER-ENGINE",
    },
    {
      cmd: "kubectl get pods -n production",
      output:
        "NAME                    READY   STATUS    RESTARTS\napi-deployment-7d9f8    2/2     Running   0\ndb-statefulset-0        1/1     Running   0\nmonitoring-stack-5c8    1/1     Running   0",
      context: "K8S-CLUSTER-PROD",
    },
    {
      cmd: "git log --oneline -4",
      output:
        "a3f5d2b Multi-cloud disaster recovery implemented\nc7e9b1a Kubernetes resource optimization\n2d4f8e3 Terraform AWS VPC automation\n9b1c6a5 GitLab CI/CD pipeline enhancement",
      context: "GIT-REPO",
    },
    {
      cmd: "curl https://cloudycode.dev/status",
      output:
        "✓ Infrastructure: Operational (99.97% uptime)\n✓ All services healthy | Zero incidents\n✓ Multi-region deployment active",
      context: "EXTERNAL-API",
    },
  ];

  let currentIdx = 0;

  function getP10kHTML(step) {
    // metadata line
    let html = `<div class="p10k-metadata">`;
    html += `<span class="p-folder">devops_workspace</span>`;
    html += ` <span class="p-on">on</span> <span class="p-git"><i class="fas fa-code-branch" style="margin-right: 5px;"></i>main</span>`;
    html += ` <span class="p-via">via</span> <span class="p-lang"><i class="fab fa-python" style="margin-right: 5px;"></i>v3.12.1</span>`;
    html += ` <span class="p-on">on</span> <span class="p-cloud">☁️ (eu-north-1)</span>`;
    html += `</div>`;

    // input line start
    html += `<div class="p10k-arrow" style="margin-top: 8px;"><span style="margin-right: 10px; color: #a362ff; font-weight: 900;">❯</span></div>`;
    return html;
  }

  function highlightCommand(cmd) {
    if (!cmd) return "";
    return cmd
      .split(" ")
      .map((part, index) => {
        let spanClass = "cmd-arg";
        if (index === 0 && part !== "") spanClass = "cmd-bin";
        else if (part.startsWith("-")) spanClass = "cmd-flag";
        else if (part.includes("/") || part.startsWith("http"))
          spanClass = "cmd-path";
        return part !== "" ? `<span class="${spanClass}">${part}</span>` : "";
      })
      .join(" ");
  }

  function renderOutput(step, container) {
    container.style.opacity = "0";
    container.style.marginTop = "5px";
    container.style.marginBottom = "10px";

    // Check if command is tabular
    const isDocker = step.cmd.includes("docker");
    const isK8s = step.cmd.includes("kubectl");
    const isLs = step.cmd.includes("ls -la");

    if (isDocker || isK8s) {
      const grid = document.createElement("div");
      grid.style.display = "grid";
      grid.style.width = "100%";
      grid.style.gridTemplateColumns = isDocker
        ? "200px 120px 1fr"
        : "200px 80px 100px 1fr";
      grid.style.gap = "8px 15px";

      step.output.split("\n").forEach((line, idx) => {
        const cells = line.trim().split(/\s{2,}/);
        const finalCells = cells.length < 2 ? line.trim().split(/\s+/) : cells;

        finalCells.forEach((cellText, cellIdx) => {
          const cell = document.createElement("span");
          cell.style.whiteSpace = "nowrap";
          if (idx === 0) {
            cell.style.color = "rgba(255, 255, 255, 0.2)";
            cell.style.fontSize = "0.7rem";
            cell.style.textTransform = "uppercase";
            cell.style.borderBottom = "1px solid rgba(255, 255, 255, 0.05)";
            cell.style.paddingBottom = "4px";
          }
          if (cellText === "healthy" || cellText === "Running") {
            cell.innerHTML = `<span class="badge ${
              cellText === "healthy" ? "badge-healthy" : "badge-running"
            }">${cellText}</span>`;
          } else {
            cell.textContent = cellText;
            if (idx > 0)
              cell.style.color =
                cellIdx === 0 ? "#fff" : "rgba(202, 211, 245, 0.7)";
          }
          grid.appendChild(cell);
        });
      });
      container.appendChild(grid);
    } else if (isLs) {
      const grid = document.createElement("div");
      grid.style.display = "grid";
      grid.style.gridTemplateColumns = "max-content max-content";
      grid.style.justifyContent = "start";
      grid.style.gap = "8px 40px";
      step.output.split("\n").forEach((line) => {
        const match = line.match(/^([drwx\-]+)\s+(\w+)\s+(\w+)\s+(.+)$/);
        if (match) {
          const [_, perms, owner, group, name] = match;
          const entry = document.createElement("div");
          entry.style.display = "flex";
          entry.style.gap = "15px";
          entry.innerHTML = `<span style="color: #4b5563; font-size: 0.8rem;">${perms}</span><span style="color: #a362ff; font-weight: 600;">${name}</span>`;
          grid.appendChild(entry);
        }
      });
      container.appendChild(grid);
    } else if (step.cmd === "whoami") {
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.gap = "12px";
      const labels = ["USER", "ROLE"];
      step.output.split("\n").forEach((line, i) => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.gap = "15px";
        row.style.alignItems = "baseline";
        row.innerHTML = `<span style="font-size: 0.65rem; font-weight: 800; color: rgba(163, 98, 255, 0.5); border: 1px solid rgba(163, 98, 255, 0.2); padding: 2px 6px; border-radius: 3px; min-width: 45px; text-align: center;">${
          labels[i] || "INFO"
        }</span><span style="color: ${
          i === 0 ? "#fff" : "rgba(202, 211, 245, 0.8)"
        }; font-weight: ${i === 0 ? "700" : "400"}; font-size: ${
          i === 0 ? "1rem" : "0.9rem"
        };">${line}</span>`;
        wrapper.appendChild(row);
      });
      container.appendChild(wrapper);
    } else if (step.cmd.includes("terraform")) {
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.gap = "8px";
      step.output.split("\n").forEach((line) => {
        const row = document.createElement("div");
        row.style.fontSize = "0.9rem";
        if (line.includes("Plan:")) {
          row.style.color = "#fff";
          row.style.fontWeight = "700";
          row.style.marginBottom = "10px";
          row.textContent = line;
        } else if (line.trim().startsWith("+")) {
          row.innerHTML = `<span style="color: #6ee7b7; font-weight: 900; margin-right: 10px;">+</span><span style="color: rgba(202, 211, 245, 0.9);">${line
            .replace("+", "")
            .trim()}</span>`;
        } else if (line.trim().startsWith("~")) {
          row.innerHTML = `<span style="color: #f59e0b; font-weight: 900; margin-right: 10px;">~</span><span style="color: rgba(202, 211, 245, 0.9);">${line
            .replace("~", "")
            .trim()}</span>`;
        } else {
          row.textContent = line;
          row.style.color = "rgba(255, 255, 255, 0.3)";
        }
        wrapper.appendChild(row);
      });
      container.appendChild(wrapper);
    } else if (step.cmd.includes("/etc/profile")) {
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.gap = "10px";
      step.output.split("\n").forEach((line) => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.gap = "12px";
        const text = line
          .replace(
            /(\d+\+?\s?years|\d+\.\d+%)/g,
            '<span style="color: #6ee7b7; font-weight: 700;">$1</span>'
          )
          .replace(
            /(KSA and Egypt|Multi-cloud|High-availability)/g,
            '<span style="color: #fff; font-weight: 600;">$1</span>'
          );
        row.innerHTML = `<span style="color: #a362ff;">▹</span><span style="color: rgba(202, 211, 245, 0.9); font-size: 0.9rem; line-height: 1.5;">${text}</span>`;
        wrapper.appendChild(row);
      });
      container.appendChild(wrapper);
    } else {
      const pre = document.createElement("pre");
      pre.style.cssText =
        "color: rgba(202, 211, 245, 0.9); white-space: pre-wrap; font-size: 0.9rem; line-height: 1.7; margin: 0;";
      if (step.cmd.includes("git log")) {
        pre.innerHTML = step.output
          .split("\n")
          .map(
            (l) =>
              `<span style="color: #f59e0b; font-weight: 700;">${
                l.split(" ")[0]
              }</span>${l.substring(l.indexOf(" "))}`
          )
          .join("\n");
      } else {
        pre.style.color = step.cmd.includes("curl") ? "#00ff88" : "inherit";
        pre.textContent = step.output;
      }
      container.appendChild(pre);
    }

    setTimeout(() => {
      container.style.opacity = "1";
      container.style.transition = "opacity 0.4s ease";
      if (contextIndicator)
        contextIndicator.innerHTML = `<span class="status-dot"></span>${step.context}`;
    }, 50);

    const isCritical =
      step.cmd.includes("terraform") ||
      step.cmd.includes("kubectl") ||
      step.cmd.includes("docker") ||
      step.cmd.includes("curl");
    driftCard.style.opacity = isCritical ? "1" : "0.85";
    driftCard.style.transform = isCritical
      ? "rotate(1.5deg) scale(1)"
      : "rotate(0.5deg) translateY(15px) scale(0.98)";
    driftCard.style.boxShadow = isCritical
      ? "0 30px 60px rgba(163, 98, 255, 0.15)"
      : "0 15px 30px rgba(0, 0, 0, 0.5)";
  }

  function typeStep(idx) {
    terminalContainer.innerHTML = "";

    // Manage history: remove items if too many
    const steps = terminalContainer.querySelectorAll(".terminal-step");
    if (steps.length > 1) steps[0].style.opacity = "0.3"; // Dim previous

    const step = terminalSequence[idx];
    const stepWrapper = document.createElement("div");
    stepWrapper.className = "terminal-step";

    const line = document.createElement("div");
    line.className = "terminal-line";
    line.style.display = "block"; // Ensure p10k-metadata and p10k-arrow stack
    line.innerHTML = `<div class="p10k-prompt">${getP10kHTML(step)}</div>`;

    const arrowDiv = line.querySelector(".p10k-arrow");
    const cmdSpan = document.createElement("span");
    cmdSpan.className = "command";
    arrowDiv.appendChild(cmdSpan);

    const outputDiv = document.createElement("div");

    stepWrapper.appendChild(line);
    stepWrapper.appendChild(outputDiv);
    terminalContainer.appendChild(stepWrapper);

    let charIdx = 0;
    function type() {
      if (charIdx < step.cmd.length) {
        cmdSpan.innerHTML =
          highlightCommand(step.cmd.substring(0, charIdx + 1)) +
          '<span class="typing-cursor"></span>';
        charIdx++;
        setTimeout(type, 50 + Math.random() * 40);
      } else {
        cmdSpan.innerHTML =
          highlightCommand(step.cmd) + '<span class="typing-cursor"></span>';
        setTimeout(() => {
          renderOutput(step, outputDiv);
          setTimeout(() => {
            currentIdx = (currentIdx + 1) % terminalSequence.length;
            typeStep(currentIdx);
          }, 4000);
        }, 500);
      }
    }
    type();
  }

  const observer = createObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => typeStep(0), 1000);
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(terminalContainer);
}

// Initialize All Animations
export function initAnimations() {
  initStarfield();
  initTypingEffect();
  initParticles();
  initAOS();
  initCounters();
  initTerminalAnimation();
  initScrollAnimations();
  initHeroTerminal();
}
