# Repository Guidance

## Project

Ahmed Belal's DevSecOps and Cloud Architecture portfolio. It is a static, English-only website hosted on GitHub Pages with the visual direction documented in `docs/design-brief.md`.

## Architecture

- `index.html` contains semantic content and structured data.
- `css/control-plane.css` contains the full mobile-first design system.
- `js/control-plane.js` contains only accessible navigation behavior, header state, current year, and service-worker registration.
- `manifest.json`, `sw.js`, `offline.html`, and the square icons provide PWA/offline support.
- There is no npm dependency, framework, bundler, or runtime API.

Do not introduce React, Vue, Tailwind, third-party animation libraries, remote fonts, or icon libraries without explicit approval.

## Local development

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Design rules

- Read `docs/design-brief.md` before broad visual changes.
- Ahmed Belal is the primary brand; CloudyCode is the domain only.
- Preserve the light/dark Control Plane direction and one primary cobalt accent.
- Keep professional fieldwork anonymized.
- Prefer inspectable GitHub artifacts over unsupported claims or tool-logo lists.
- Spend visual boldness on the responsive delivery path; keep surrounding UI restrained.
- Use the existing locally hosted Sora and IBM Plex Mono fonts.

## Responsive rules

Mobile and laptop quality are equal acceptance requirements.

- Start at 360–390px, then enhance at larger breakpoints.
- Verify at 360, 390, 768, 1024, and 1440px.
- No horizontal overflow.
- No hover-only information.
- Interactive targets must be at least 44×44px.
- Body text must remain at least 16px.
- Diagrams must reflow rather than scale down.
- Keep keyboard focus visible and respect `prefers-reduced-motion`.

## Service worker

When changing cached asset paths or shipping a new release:

1. Update `CACHE_VERSION` in `sw.js`.
2. Update `CRITICAL_ASSETS` when production files change.
3. Verify every listed asset returns HTTP 200.

## Deployment

`.github/workflows/jekyll-gh-pages.yml` minifies CSS and JavaScript in the CI workspace, builds the static site with Jekyll, and deploys it to GitHub Pages. The repository source should remain readable and unminified.

## Verification

Before completion:

1. Parse HTML/JSON and run `node --check js/control-plane.js`.
2. Check all local asset references.
3. Inspect console errors.
4. Verify mobile navigation open, close, Escape, and focus return.
5. Verify no overflow and touch targets at every acceptance width.
6. Capture desktop and mobile screenshots and inspect them.
7. Run Lighthouse where available.
