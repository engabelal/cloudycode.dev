# CloudyCode v7.0.0 - Portfolio Website

> A modern, Modern portfolio website for a DevOps & Cloud Engineer

![CloudyCode](./images/cloudycode-light.webp)

## 🎨 Design

This is a complete redesign of the CloudyCode portfolio website, inspired by Brand.io's modern, professional design language. The site features:

- **Dark purple aesthetic** (#1F1633 - Brand exact) with gradient accents
- **Angled section separators** using CSS clip-path (Brand's signature design)
- **Bento-box grid layouts** with asymmetric, angled cards
- **Exact Brand gradients** (120deg buttons, radial hero background)
- **Responsive design** (mobile-first with vanilla CSS)

## 🚀 Features

### Design & UX
- ✅ Modern visual design
- ✅ Bento-grid project showcase with angled cards
- ✅ Glassmorphism and backdrop blur effects
- ✅ Gradient text and backgrounds
- ✅ Smooth animations and transitions
- ✅ Scroll progress indicator
- ✅ Mobile-first responsive design

### Functionality
- ✅ Project filtering and pagination
- ✅ Project deep linking (#project-slug)
- ✅ Modal dialogs with focus trapping
- ✅ Smooth scroll navigation
- ✅ Back-to-top button
- ✅ Mobile hamburger menu
- ✅ Horizontal scrolling certifications

### Animations
- ✅ Typing animation (3 rotating phrases)
- ✅ Particles.js background
- ✅ Lottie animations (cloud, computing, scroll indicator)
- ✅ Counter animations (stats)
- ✅ AOS scroll-triggered animations
- ✅ Card hover effects (scale, rotate, shadow)

### Technical
- ✅ PWA-enabled (installable, offline support)
- ✅ Service worker with cache strategy
- ✅ Vanilla CSS with exact Brand colors and gradients
- ✅ CSS clip-path for angled section separators
- ✅ Vanilla JavaScript (no framework needed)
- ✅ Accessibility-first (WCAG 2.1 AA)
- ✅ SEO optimized
- ✅ GitHub Pages compatible (no build step)

## 📁 Project Structure

```
new_website/
├── index.html              # Main HTML with all sections
├── offline.html            # PWA offline fallback
├── manifest.json           # PWA manifest
├── sw.js                  # Service worker
├── _headers               # Security headers (Netlify/GitHub Pages)
├── css/
│   └── custom.css         # Custom styles and animations
├── js/
│   ├── main.js            # Entry point
│   ├── utils.js           # Utility functions
│   ├── animations.js      # Animation initialization
│   ├── ui.js              # UI components
│   └── projects.js        # Project data and modals
├── images/                # Images, icons, favicon
├── animations/            # Lottie JSON files
├── fonts/                 # Local fonts (backup)
└── config/
    └── site.config.js     # Site configuration
```

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **Vanilla CSS** - Custom CSS with Brand.io exact colors and gradients
- **CSS clip-path** - Angled section separators
- **Vanilla JavaScript** - ES6 modules (no framework)
- **Font Awesome** - Icons
- **Google Fonts** - Rubik (Brand's exact font)

### PWA
- **Service Worker** - Offline support
- **Web App Manifest** - Installable

## 🚀 Local Development

### Start Development Server

```bash
# Using Python (recommended)
cd new_website
python3 -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

### No Build Step Required!
This is a static site that works directly in the browser. No npm install, no build process needed.

## 🎨 Design System (Brand.io Exact)

### Colors (Brand Exact Palette)
```css
/* Primary */
--color-dark-purple: #1F1633      /* Brand's main background */
--color-medium-purple: #2B1F3F    /* Secondary backgrounds */
--color-accent-purple: #6a5fc1    /* Interactive elements */
--color-deep-purple: #452650      /* Gradient stops */

/* Neutrals */
--color-light-gray: #f9f8ff       /* Light section backgrounds */
--color-white: #ffffff

/* Gradients */
--gradient-primary: linear-gradient(120deg, #c83852, #b44092 25%, #6a5fc1 50%, #452650 55%)
--gradient-hero: radial-gradient(41.11% 49.93% at 50% 49.93%, #8d5494 0%, #563275 52.26%, #1f1633 100%)
```

### Typography (Brand Exact)
- **Font Family**: Rubik (Brand's font)
- **Line Height**: 1.6 (body), 1.25 (headings)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing Scale
- xs: 8px
- sm: 16px
- md: 24px
- lg: 40px
- xl: 60px
- 2xl: 100px

## 📦 Deployment

### GitHub Pages

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Complete CloudyCode v7.0.0 redesign"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set source to `main` branch
   - Set folder to `/new_website` (or deploy to root)

3. **Wait for deployment** (~1-2 minutes)

### Netlify

```bash
# Deploy via Netlify CLI
netlify deploy --prod --dir=new_website
```

Or drag-and-drop the `new_website` folder to Netlify's web interface.

### Cloudflare Pages

1. Connect your GitHub repository
2. Set build directory to `new_website`
3. Leave build command empty (no build needed)
4. Deploy!

## 🔒 Security

- Content Security Policy (CSP) headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer Policy: strict-origin-when-cross-origin
- All configured in `_headers` file

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Skip links
- Screen reader compatible
- Respects prefers-reduced-motion

## 📱 PWA Features

- Installable on mobile and desktop
- Works offline
- Splash screen
- App shortcuts
- Theme color
- Standalone display mode

## 🎯 Performance

- Lighthouse Performance: 95+ (target)
- First Contentful Paint: <1.5s
- Time to Interactive: <3.0s
- Uses lazy loading for images
- Optimized WebP images
- Minified CSS/JS
- Service worker caching

## 📄 Content

### Projects (8 total)
- ECS Fargate Blue/Green Deployment
- Node.js CI/CD Pipeline
- AWS Serverless Event Platform
- Auto-Scaling Web Infrastructure
- MERN Stack Automation
- Hardened DevOps AMI
- Terraform Layered MERN with RDS
- CloudOps Scripts Kit

### Certifications (12 total)
- AWS Certified DevOps Engineer - Professional
- Microsoft Azure Solutions Architect Expert
- Microsoft Azure Administrator Associate
- Oracle Cloud Infrastructure Architect
- VMware VCP-NV 2023
- Nutanix NCM-MCI5
- Red Hat Certified Specialist - Ansible Automation
- CCNP Data Center
- Cisco Specialist - Data Center Design
- VMware VCP-DCV 2020
- ITIL Foundation
- Red Hat Certified Engineer

## 🔄 Version History

### v7.0.0 (Current)
- Complete redesign inspired by Brand.io
- Bento-grid project layouts
- Glassmorphism effects
- Tailwind CSS integration
- Modern animations
- Enhanced PWA support

### v6.5.3 (Previous)
- Original design
- Vanilla CSS
- Standard grid layouts

## 📝 Configuration

Edit `config/site.config.js` to update:
- Site name and URL
- Author information
- Social links
- SEO keywords
- Analytics settings
- PWA configuration

## 🤝 Contributing

This is a personal portfolio site, but feel free to:
- Report bugs
- Suggest improvements
- Use as inspiration for your own portfolio

## 📧 Contact

**Ahmed Belal**
- Email: eng.abelal@gmail.com
- GitHub: [@engabelal](https://github.com/engabelal)
- LinkedIn: [engabelal](https://www.linkedin.com/in/engabelal/)
- Blog: [blog.cloudycode.dev](https://blog.cloudycode.dev)

## 📜 License

© 2025 CloudyCode. All rights reserved.

---

**Built with ❤️ by Ahmed Belal**

*DevOps & Cloud Engineer | 12+ Years Experience | AWS, Azure, Kubernetes, Terraform*
