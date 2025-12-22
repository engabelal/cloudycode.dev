# CloudyCode v2.2.5 - Portfolio Website

> A modern, premium portfolio website for a DevOps & Cloud Engineer

![CloudyCode](./images/cloudycode-light.webp)

## 🌐 Live Site

**[cloudycode.dev](https://cloudycode.dev)**

## 🎨 Design

A complete redesign featuring a modern, professional design language:

- **Dark purple aesthetic** (#1F1633) with gradient accents
- **Premium loading screen** with animated spinner
- **Glassmorphism and backdrop blur effects**
- **Responsive design** (mobile-first)
- **Smooth animations and transitions**

## 🚀 Features

### Design & UX

- ✅ Premium loading screen with progress bar
- ✅ Bento-grid project showcase
- ✅ Glassmorphism effects
- ✅ Gradient text and backgrounds
- ✅ Scroll progress indicator
- ✅ Mobile-first responsive design

### Performance

- ✅ Automatic CSS/JS minification via GitHub Actions
- ✅ Lazy loading with `decoding="async"`
- ✅ Critical image prioritization (`fetchpriority="high"`)
- ✅ Service Worker caching (v2.2.5)
- ✅ Optimized WebP images

### SEO

- ✅ JSON-LD Structured Data (Person & Website schemas)
- ✅ Open Graph & Twitter Cards
- ✅ Semantic HTML structure
- ✅ Updated sitemap.xml
- ✅ robots.txt configured

### Technical

- ✅ PWA-enabled (installable, offline support)
- ✅ GitHub Pages deployment with auto-minification
- ✅ Vanilla CSS & JavaScript (no framework)
- ✅ Accessibility-first (WCAG 2.1 AA)

## 📁 Project Structure

```
cloudycode/
├── index.html              # Main HTML
├── offline.html            # PWA offline fallback
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker (v2.2.5)
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine config
├── _headers                # Security headers
├── css/
│   ├── theme.css           # Design tokens
│   └── custom.css          # Custom styles
├── js/
│   ├── main.js             # Entry point
│   ├── utils.js            # Utilities
│   ├── animations.js       # Animations
│   ├── ui.js               # UI components
│   └── projects.js         # Project data
├── images/                 # Images & icons
├── config/
│   └── site.config.js      # Site configuration
└── .github/
    └── workflows/
        └── jekyll-gh-pages.yml  # CI/CD with minification
```

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **Vanilla CSS** - Custom styles
- **Vanilla JavaScript** - ES6 modules
- **Font Awesome** - Icons
- **Google Fonts** - Plus Jakarta Sans, Rubik, IBM Plex Mono
- **GitHub Actions** - CI/CD with CSS/JS minification

## 🚀 Deployment

### GitHub Pages (Automatic)

**Repository:** [github.com/engabelal/cloudycode-portfolio](https://github.com/engabelal/cloudycode-portfolio)

Push to `main` branch triggers automatic deployment with CSS/JS minification:

```bash
git add .
git commit -m "your commit message"
git push origin main
```

The GitHub Actions workflow will:

1. Minify all CSS files (clean-css)
2. Minify all JS files (terser)
3. Deploy to GitHub Pages

## 🎯 Performance Optimizations

| Optimization     | Implementation                        |
| ---------------- | ------------------------------------- |
| CSS Minification | GitHub Actions (clean-css-cli)        |
| JS Minification  | GitHub Actions (terser)               |
| Image Loading    | `loading="lazy"` + `decoding="async"` |
| Critical Images  | `fetchpriority="high"`                |
| Caching          | Service Worker v2.2.5                 |
| DNS Prefetch     | CDN domains pre-resolved              |

## 📱 PWA Features

- Installable on mobile and desktop
- Works offline
- Splash screen
- Theme color (#7127ba)
- Standalone display mode

## 🔒 Security

- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer Policy: strict-origin-when-cross-origin
- Protected by Cloudflare

## 🔄 Version History

### v2.2.5 (Current)

- Premium loading screen
- JSON-LD structured data for SEO
- GitHub Actions CSS/JS minification
- Image loading optimizations
- Updated sitemap.xml

### v2.1.0

- Footer redesign
- Service Worker updates
- Resource hints optimization

### v2.0.0

- Complete redesign
- Mobile responsiveness fixes
- Performance audit fixes

## 📧 Contact

**Ahmed Belal**

- Website: [cloudycode.dev](https://cloudycode.dev)
- Blog: [blog.cloudycode.dev](https://blog.cloudycode.dev)
- GitHub: [@engabelal](https://github.com/engabelal)
- LinkedIn: [engabelal](https://www.linkedin.com/in/engabelal/)
- Email: ahmedbelal@cloudycode.dev

## 📜 License

© 2025 CloudyCode. All rights reserved.

---

**Built with ❤️ by Ahmed Belal**

_DevOps & Cloud Engineer | 12+ Years Experience | AWS, Azure, Kubernetes, Terraform_
