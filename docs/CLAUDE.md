# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CloudyCode v2.3 is a modern DevOps & Cloud Engineer portfolio website showcasing a premium terminal aesthetic. It's a static PWA (Progressive Web App) built with vanilla JavaScript, HTML5, and CSS3, featuring no build step or framework dependencies.

## Development Commands

### Local Development

Start a local development server using any of these methods:

```bash
# Python (recommended)
python3 -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### No Build Process

This is a **static site** that runs directly in the browser. There is NO npm install, NO build step, NO bundling required. All code runs natively in modern browsers.

### Testing

No formal test suite exists. Test manually by:

- Opening in browser and checking console for errors
- Verifying service worker registration in DevTools → Application
- Testing PWA installation on mobile/desktop
- Checking responsive layouts at different breakpoints

## Architecture

### Module System

The codebase uses **ES6 modules** with a clear separation of concerns:

- **js/main.js** - Application entry point, orchestrates initialization
- **js/utils.js** - Pure utility functions (scrolling, debounce, logging, etc.)
- **js/animations.js** - All animation logic (starfield, typing effect, terminal, etc.)
- **js/ui.js** - UI component behaviors (navbar, mobile menu, modals, etc.)
- **js/projects.js** - Project data and rendering logic

### Initialization Flow

1. **main.js** waits for DOM ready
2. Calls `forceScrollReset()` to ensure page loads at top
3. Initializes UI components (`initUI()`)
4. Initializes projects section (`initProjects()`)
5. Delays 100ms then initializes animations (`initAnimations()`)

### Service Worker Strategy

The service worker (sw.js) implements a hybrid caching strategy:

- **HTML requests**: Network-first with cache fallback
- **Static assets**: Cache-first with background update
- **Version**: Defined in `CACHE_VERSION` constant (sync with config/site.config.js)
- **Critical assets**: Pre-cached on installation

When updating site version:

1. Update `version` in `config/site.config.js`
2. Update `CACHE_VERSION` in `sw.js` to match
3. Both must stay in sync

### CSS Architecture

Three-layer CSS system:

- **css/tokens.css** - Design tokens (colors, spacing, typography)
- **css/theme.css** - Base theme and component styles
- **css/custom.css** - Page-specific styles and animations
- **css/cloud-magnet.css** - Special cloud magnet effect (if used)

Colors are based on CloudyCode brand palette with dark purple (#1F1633) as primary.

### Animation System

All animations respect `prefers-reduced-motion`:

- **Starfield**: Canvas-based parallax stars with depth layers
- **Terminal typing**: Custom typewriter effect in hero section
- **Typing effect**: Rotating phrases with configurable speed
- **Counter animations**: Number counting triggered by scroll
- **Hover effects**: 3D transforms on cards

Animations are conditionally reduced or disabled based on user preference.

### Configuration

Single source of truth: **config/site.config.js**

Contains:

- Site metadata (name, URL, description)
- Author info (name, email, title)
- Social links
- SEO keywords
- Analytics config
- PWA settings (theme colors, names)
- **Version number** (must match sw.js)

## Key Technical Details

### No Framework Philosophy

This site intentionally avoids React/Vue/etc. It demonstrates that modern UX can be achieved with vanilla JavaScript. Maintain this philosophy - do not introduce frameworks.

### PWA Functionality

The site is installable via:

- **manifest.json** - App manifest for installation
- **sw.js** - Service worker for offline support
- **offline.html** - Fallback page when offline
- Icons in `/images/` directory (icon-192.png, icon-512.png)

### Accessibility

- Semantic HTML structure
- ARIA labels and roles where needed
- Focus trap in modals (via `trapFocus()` utility)
- Keyboard navigation support
- Skip links for screen readers
- Respects `prefers-reduced-motion`

### Deployment

GitHub Pages compatible - just push and enable Pages in repository settings. No build configuration needed.

Alternative deployment options:

- Netlify (drag-and-drop or CLI)
- Cloudflare Pages
- Vercel
- Any static hosting

Security headers are defined in `_headers` file (Netlify/GitHub Pages format).

## Common Modification Patterns

### Adding New Section

1. Add HTML section in `index.html`
2. Add styles in `css/custom.css`
3. If interactive, add initialization in `js/ui.js` and call from `initUI()`
4. If animated, add logic in `js/animations.js` and call from `initAnimations()`

### Updating Content

- **Projects**: Edit `js/projects.js` - contains project data array
- **About/Bio**: Edit inline in `index.html`
- **Social Links**: Edit in `config/site.config.js` and update header in `index.html`

### Changing Colors/Theme

1. Update CSS custom properties in `css/tokens.css`
2. Update inline styles in `index.html` if hardcoded
3. Update `pwa.themeColor` in `config/site.config.js`
4. Update `manifest.json` theme_color

### Adding Animation

1. Add animation logic in `js/animations.js`
2. Export function and call from `initAnimations()`
3. Always check `prefersReducedMotion()` before running
4. Use `requestAnimationFrame` for smooth 60fps

## File Structure Context

```
/
├── index.html              # Single page app - all HTML
├── offline.html            # PWA offline fallback
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── _headers               # Security headers config
├── css/
│   ├── tokens.css         # Design system tokens
│   ├── theme.css          # Base theme
│   └── custom.css         # Page styles
├── js/
│   ├── main.js            # Entry point
│   ├── utils.js           # Utilities
│   ├── animations.js      # Animations
│   ├── ui.js              # UI components
│   └── projects.js        # Project data
├── images/                # All images/icons
├── animations/            # Lottie JSON files
├── fonts/                 # Local font files
└── config/
    └── site.config.js     # Site configuration
```

## Important Notes

- Version synchronization between `config/site.config.js` and `sw.js` is critical
- All animations must respect accessibility preferences
- No external dependencies means no package.json or node_modules
- Terminal simulation in hero section has complex typing logic in animations.js
- Projects are rendered client-side from JavaScript data (not hardcoded HTML)
