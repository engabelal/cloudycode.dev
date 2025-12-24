// Projects Module
// CloudyCode v7.0.0

import { slugify, trapFocus } from './utils.js';

// Configuration
const ITEMS_PER_PAGE = 6;
const CATEGORY_LABELS = {
  all: 'All Projects',
  cicd: 'CI/CD',
  infrastructure: 'Infrastructure',
  serverless: 'Serverless',
  automation: 'Automation'
};

// Projects Data
export const allProjects = [
  {
    icon: 'fab fa-docker',
    title: 'ECS Fargate Blue/Green Deployment',
    desc: 'Production-ready containerized deployment using AWS ECS Fargate with automated Blue/Green strategy via CodeDeploy, zero-downtime updates, and GitHub Actions CI/CD.',
    link: 'https://github.com/engabelal/ecs-fargate-terraform-deployment',
    category: 'cicd',
    metrics: {
      performance: '100% uptime',
      cost: '9 modules',
      uptime: 'Zero downtime'
    },
    problem: 'Container deployments causing downtime and lacking automated rollback capabilities',
    solution: 'Blue/Green deployment with CodeDeploy, modular Terraform (9 modules), GitHub Actions OIDC, and automated rollback on failure',
    techStack: ['ECS Fargate', 'CodeDeploy', 'Terraform', 'GitHub Actions', 'ALB', 'ECR', 'DynamoDB'],
    results: ['Zero downtime deployments', 'Automatic rollback', 'Serverless containers', '9 reusable Terraform modules']
  },
  {
    icon: 'fab fa-node-js',
    title: 'Node.js CI/CD Pipeline',
    desc: 'GitHub Actions and Terraform pipeline delivering sub-15-second deployments, automated testing, and zero-downtime releases on AWS EC2.',
    link: 'https://github.com/engabelal/simple-nodejs-ec2-cicd',
    category: 'cicd',
    metrics: {
      performance: '85% faster',
      cost: '15-sec deploy',
      uptime: '100% consistent'
    },
    problem: 'Manual deployments causing delays and inconsistencies across environments',
    solution: 'Automated CI/CD pipeline with GitHub Actions, Terraform IaC, and blue-green deployment strategy',
    techStack: ['GitHub Actions', 'Terraform', 'AWS EC2', 'Docker', 'Nginx'],
    results: ['85% faster deployment', 'Zero downtime releases', '100% environment consistency']
  },
  {
    icon: 'fab fa-aws',
    title: 'AWS Serverless Event Platform',
    desc: 'EventBridge, Lambda, and DynamoDB stack codified as IaC—with CloudFront acceleration and automated environment provisioning.',
    link: 'https://github.com/engabelal/iac-aws-serverless-event',
    category: 'serverless',
    metrics: {
      performance: '60% cost cut',
      cost: 'Auto-scale',
      uptime: '99.99%'
    },
    problem: 'High infrastructure costs and maintenance overhead for event-driven applications',
    solution: 'Serverless architecture using EventBridge for event routing, Lambda for processing, and DynamoDB for storage',
    techStack: ['AWS Lambda', 'EventBridge', 'DynamoDB', 'CloudFront', 'API Gateway'],
    results: ['60% cost reduction', 'Auto-scaling to zero', '99.99% availability']
  },
  {
    icon: 'fas fa-server',
    title: 'Auto-Scaling Web Infrastructure',
    desc: 'Terraform-built AWS blueprint combining EC2 Auto Scaling, Network Load Balancers, and multi-AZ failover for resilient web tiers.',
    link: 'https://github.com/engabelal/simple-webapp-ec2-nlb-asg',
    category: 'infrastructure',
    metrics: {
      performance: '5x capacity',
      uptime: '99.9% uptime'
    },
    problem: 'Web application unable to handle traffic spikes and single point of failure',
    solution: 'Multi-AZ architecture with auto-scaling groups, network load balancers, and health checks',
    techStack: ['Terraform', 'AWS EC2', 'Auto Scaling', 'NLB', 'CloudWatch'],
    results: ['5x traffic capacity', '99.9% uptime', 'Automatic failover']
  },
  {
    icon: 'fas fa-cogs',
    title: 'MERN Stack Automation',
    desc: 'Idempotent Ansible playbooks provisioning MongoDB, Express, React, and Node with hardened configurations and repeatable rollouts.',
    link: 'https://github.com/engabelal/cm-ansible-mern-stack',
    category: 'automation',
    metrics: {
      performance: '90% faster',
      uptime: 'Zero drift'
    },
    problem: 'Inconsistent MERN stack deployments and configuration drift across servers',
    solution: 'Idempotent Ansible playbooks with role-based configuration and automated security hardening',
    techStack: ['Ansible', 'MongoDB', 'Express.js', 'React', 'Node.js'],
    results: ['90% faster provisioning', 'Zero configuration drift', 'Repeatable deployments']
  },
  {
    icon: 'fas fa-box',
    title: 'Hardened DevOps AMI',
    desc: 'Packer pipeline producing CIS-aligned Ubuntu AMIs preloaded with DevOps tooling, CloudWatch telemetry, and guardrails.',
    link: 'https://github.com/engabelal/packer-aws-devops-ami',
    category: 'infrastructure',
    metrics: {
      performance: '70% faster boot',
      uptime: 'Hardened'
    },
    problem: 'Security vulnerabilities and slow instance launch times due to runtime installations',
    solution: 'Pre-baked AMIs with CIS benchmarks, DevOps tools, and monitoring agents using Packer',
    techStack: ['Packer', 'AWS AMI', 'Ubuntu', 'CloudWatch', 'CIS Benchmarks'],
    results: ['70% faster boot time', 'CIS Level 1 compliant', 'Standardized tooling']
  },
  {
    icon: 'fas fa-layer-group',
    title: 'Terraform Layered MERN with RDS',
    desc: 'Multi-tier Terraform architecture deploying MERN stack with RDS MySQL, VPC isolation, and production-grade networking.',
    link: 'https://github.com/engabelal/terraform-layered-mern-rds',
    category: 'infrastructure',
    metrics: {
      performance: 'Multi-tier',
      cost: 'Modular IaC',
      uptime: 'Auto backups'
    },
    problem: 'Complex multi-tier application requiring secure network isolation and managed database',
    solution: 'Layered Terraform modules with VPC isolation, private subnets, and RDS MySQL with automated backups',
    techStack: ['Terraform', 'AWS VPC', 'RDS MySQL', 'EC2', 'Security Groups'],
    results: ['Network isolation', 'Automated backups', 'Modular IaC design']
  },
  {
    icon: 'fas fa-terminal',
    title: 'CloudOps Scripts Kit',
    desc: 'Production-ready shell toolkit for AWS auditing, cost optimisation, and day-two operations automation.',
    link: 'https://github.com/engabelal/abcloudops-scripts-kit',
    category: 'automation',
    metrics: {
      performance: '80% time saved',
      cost: '20% cost cut',
      uptime: 'Compliance'
    },
    problem: 'Manual AWS operations consuming time and prone to human errors',
    solution: 'Automated shell scripts for common AWS operations, cost analysis, and security auditing',
    techStack: ['Bash', 'AWS CLI', 'jq', 'Python', 'CloudWatch'],
    results: ['80% time saved', '20% cost reduction', 'Automated compliance checks']
  }
];

// State
let currentFilter = 'all';
let currentPage = 0;

// Helper Functions
function findProjectBySlug(slug) {
  return allProjects.find(p => slugify(p.title) === slug);
}

function getFilteredProjects() {
  if (currentFilter === 'all') return allProjects;
  return allProjects.filter(p => p.category === currentFilter);
}

// Render Project Card
function renderProjectCard(project, index) {
  const slug = slugify(project.title);
  const isFirst = index === 0;
  const rotation = index % 3 === 0 ? 'card-angled-left' : (index % 3 === 1 ? 'card-angled-right' : '');

  return `
    <div class="project-card glass rounded-3xl overflow-hidden card-hover ${rotation} ${isFirst ? 'md:col-span-2 md:row-span-2' : ''}"
         data-slug="${slug}"
         data-category="${project.category}"
         data-aos="fade-up"
         data-aos-delay="${index * 100}">

      <!-- Category Ribbon -->
      <div class="absolute top-4 left-4 px-4 py-1 bg-gradient-primary rounded-full text-white text-xs font-semibold z-10">
        ${CATEGORY_LABELS[project.category]}
      </div>

      <!-- Project Icon/Visual -->
      <div class="p-8 ${isFirst ? 'lg:p-12' : ''} flex flex-col h-full">
        <div class="flex-grow">
          <!-- Icon -->
          <div class="w-16 h-16 ${isFirst ? 'lg:w-24 lg:h-24' : ''} bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6">
            <i class="${project.icon} text-3xl ${isFirst ? 'lg:text-5xl' : ''} text-white"></i>
          </div>

          <!-- Title & Description -->
          <h3 class="text-xl ${isFirst ? 'lg:text-3xl' : ''} font-bold text-white mb-3">${project.title}</h3>
          <p class="text-textSecondary ${isFirst ? 'lg:text-lg' : 'text-sm'} leading-relaxed mb-6">
            ${project.desc}
          </p>

          <!-- Tech Stack Tags -->
          <div class="flex flex-wrap gap-2 mb-6">
            ${project.techStack.slice(0, isFirst ? 5 : 3).map(tech => `
              <span class="px-3 py-1 bg-white/5 rounded-full text-xs text-textSecondary">
                ${tech}
              </span>
            `).join('')}
            ${project.techStack.length > (isFirst ? 5 : 3) ? `
              <span class="px-3 py-1 bg-white/5 rounded-full text-xs text-textSecondary">
                +${project.techStack.length - (isFirst ? 5 : 3)}
              </span>
            ` : ''}
          </div>

          <!-- Metrics -->
          <div class="grid grid-cols-2 ${isFirst ? 'lg:grid-cols-3' : ''} gap-3 mb-6">
            ${Object.entries(project.metrics).map(([key, value]) => `
              <div class="text-center p-2 bg-white/5 rounded-lg">
                <p class="text-xs text-textSecondary capitalize mb-1">${key}</p>
                <p class="text-sm font-semibold text-gradient">${value}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Action Button -->
        <button class="w-full px-6 py-3 bg-gradient-primary rounded-full text-white font-semibold hover:shadow-purple transition-all duration-300 hover:scale-105">
          View Details
        </button>
      </div>
    </div>
  `;
}

// Render Projects
export function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const filteredProjects = getFilteredProjects();
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const projectsToShow = filteredProjects.slice(startIndex, endIndex);

  if (projectsToShow.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-20">
        <p class="text-textSecondary text-lg">No projects found in this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = projectsToShow.map((project, index) => renderProjectCard(project, index)).join('');

  // Update load more button
  const loadMoreBtn = document.getElementById('load-more-projects');
  if (loadMoreBtn) {
    if (endIndex >= filteredProjects.length) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  }

  // Attach click handlers
  attachProjectClickHandlers();
}

// Attach Click Handlers
function attachProjectClickHandlers() {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const slug = card.dataset.slug;
      const project = findProjectBySlug(slug);
      if (project) {
        openProjectModal(project);
      }
    });
  });
}

// Open Project Modal
export function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-content');

  if (!modal || !modalContent) return;

  // Build modal content
  modalContent.innerHTML = `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-start space-x-4">
        <div class="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
          <i class="${project.icon} text-3xl text-white"></i>
        </div>
        <div class="flex-grow">
          <h2 class="text-3xl font-bold text-gradient-primary mb-2">${project.title}</h2>
          <div class="flex items-center space-x-2">
            <span class="px-3 py-1 bg-gradient-primary rounded-full text-white text-xs font-semibold">
              ${CATEGORY_LABELS[project.category]}
            </span>
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="text-brandLight hover:text-accent transition-colors text-sm flex items-center space-x-1">
              <span>View on GitHub</span>
              <i class="fas fa-external-link-alt text-xs"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Metrics -->
      <div class="grid grid-cols-3 gap-4">
        ${Object.entries(project.metrics).map(([key, value]) => `
          <div class="glass rounded-2xl p-4 text-center">
            <p class="text-xs text-textSecondary capitalize mb-2">${key}</p>
            <p class="text-xl font-bold text-gradient">${value}</p>
          </div>
        `).join('')}
      </div>

      <!-- Problem -->
      <div class="glass rounded-2xl p-6">
        <h3 class="text-xl font-bold text-white mb-3 flex items-center space-x-2">
          <i class="fas fa-exclamation-circle text-accent"></i>
          <span>Problem</span>
        </h3>
        <p class="text-textSecondary leading-relaxed">${project.problem}</p>
      </div>

      <!-- Solution -->
      <div class="glass rounded-2xl p-6">
        <h3 class="text-xl font-bold text-white mb-3 flex items-center space-x-2">
          <i class="fas fa-lightbulb text-brand"></i>
          <span>Solution</span>
        </h3>
        <p class="text-textSecondary leading-relaxed">${project.solution}</p>
      </div>

      <!-- Tech Stack -->
      <div class="glass rounded-2xl p-6">
        <h3 class="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <i class="fas fa-toolbox text-accentCyan"></i>
          <span>Tech Stack</span>
        </h3>
        <div class="flex flex-wrap gap-2">
          ${project.techStack.map(tech => `
            <span class="px-4 py-2 bg-gradient-secondary/20 border border-accentCyan/30 rounded-full text-white text-sm font-medium">
              ${tech}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Results -->
      <div class="glass rounded-2xl p-6">
        <h3 class="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <i class="fas fa-check-circle text-green-400"></i>
          <span>Results</span>
        </h3>
        <ul class="space-y-3">
          ${project.results.map(result => `
            <li class="flex items-start space-x-3">
              <i class="fas fa-check text-brand text-lg mt-1"></i>
              <span class="text-textSecondary">${result}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- CTA -->
      <div class="flex justify-end">
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="px-8 py-3 bg-gradient-primary rounded-full text-white font-semibold hover:shadow-purple transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2">
          <i class="fab fa-github"></i>
          <span>View Repository</span>
        </a>
      </div>
    </div>
  `;

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus trap
  const firstFocusable = trapFocus(modal);
  firstFocusable?.focus();

  // Update URL hash
  window.history.pushState(null, '', `#project-${slugify(project.title)}`);
}

// Close Project Modal
export function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';

  // Remove URL hash
  window.history.pushState(null, '', window.location.pathname);
}

// Initialize Project Filtering
export function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.project-filter');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('bg-brand', 'active'));
      button.classList.add('bg-brand', 'active');

      // Update filter and reset page
      currentFilter = button.dataset.filter;
      currentPage = 0;

      // Re-render projects
      renderProjects();
    });
  });
}

// Initialize Load More
export function initLoadMore() {
  const loadMoreBtn = document.getElementById('load-more-projects');
  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    renderProjects();
  });
}

// Initialize Modal Close Handlers
export function initProjectModals() {
  const closeBtn = document.getElementById('close-project-modal');
  const modal = document.getElementById('project-modal');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
}

// Check for deep link on page load
export function checkProjectDeepLink() {
  const hash = window.location.hash;
  if (hash.startsWith('#project-')) {
    const slug = hash.replace('#project-', '');
    const project = findProjectBySlug(slug);
    if (project) {
      setTimeout(() => openProjectModal(project), 500);
    }
  }
}

// Initialize Projects Module
export function initProjects() {
  renderProjects();
  initProjectFilters();
  initLoadMore();
  initProjectModals();
  checkProjectDeepLink();
}
