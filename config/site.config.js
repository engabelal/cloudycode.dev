// Site Configuration
const siteConfig = {
  // Site Info
  siteName: "Cloudycode",
  siteUrl: "https://cloudycode.dev",
  siteDescription:
    "DevOps & Cloud Engineer Portfolio - Building the Future of Infrastructure",

  // Author Info
  author: {
    name: "Ahmed Belal",
    email: "eng.abelal@gmail.com",
    title: "DevOps & Cloud Engineer",
    experience: "12+",
  },

  // Social Links
  social: {
    github: "https://github.com/engabelal",
    linkedin: "https://www.linkedin.com/in/engabelal/",
    blog: "https://blog.cloudycode.dev",
  },

  // SEO
  seo: {
    keywords: [
      "DevOps Engineer",
      "Cloud Engineer",
      "AWS",
      "Azure",
      "Kubernetes",
      "Terraform",
      "Docker",
      "CI/CD",
      "Ansible",
      "Infrastructure as Code",
      "Cloud Architecture",
      "Site Reliability Engineering",
    ],
  },

  // Analytics
  analytics: {
    plausible: {
      domain: "cloudycode.dev",
      enabled: true,
    },
  },

  // PWA Configuration
  pwa: {
    name: "Cloudycode",
    shortName: "Cloudycode",
    themeColor: "#7127ba", // CloudyCode brand purple
    backgroundColor: "#1D1127", // Brand dark purple
  },

  // Version
  // IMPORTANT: When updating this version, also update CACHE_VERSION in sw.js
  // This is the single source of truth for the site version displayed in the footer
  // Version 2.4.7 - Title Design Simplification & UI Polish
  version: "2.4.7",
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = siteConfig;
}
