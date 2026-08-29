# Ahmed Belal Portfolio — The Control Plane

Personal portfolio for Ahmed Belal, a Senior DevSecOps and Cloud Engineer. The site presents anonymized professional fieldwork and inspectable public infrastructure labs.

## Live site

[cloudycode.dev](https://cloudycode.dev)

## Design direction

The Control Plane uses the visual language of delivery paths, system records, architecture reviews, and operational evidence. It is intentionally not a terminal-themed portfolio or a wall of technology logos.

- Mobile-first at 360–390px
- Refined light/dark editorial system
- Responsive Source → Build → Policy → Deploy → Observe path
- Anonymized professional outcomes
- Direct links to public GitHub labs
- No portrait, glassmorphism, heavy animation, or runtime UI dependencies

The complete design rationale and decision log are in [`docs/design-brief.md`](docs/design-brief.md).

## Stack

- Semantic HTML5
- Modern mobile-first CSS
- Minimal vanilla JavaScript
- Self-hosted Sora and IBM Plex Mono fonts
- Service worker and web app manifest
- GitHub Pages deployment through GitHub Actions

There is no package install or application build step.

## Local development

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Important files

```text
index.html                    Homepage content and structured data
css/control-plane.css         Complete responsive design system
js/control-plane.js           Navigation and service-worker registration
fonts/                        Locally hosted production fonts
images/og-image.webp          1200×630 social preview
manifest.json                 PWA metadata and icons
sw.js                         Offline cache strategy
docs/design-brief.md          Approved design and responsive contract
```

## Responsive acceptance widths

- 360px
- 390px
- 768px
- 1024px
- 1440px

At every width the page must have no horizontal overflow, no hover-only information, readable diagrams, visible focus states, and touch targets of at least 44×44px.

## Deployment

Pushes to `main` trigger `.github/workflows/pages.yml`, which stages only public runtime files, minifies CSS and JavaScript, and deploys the result to GitHub Pages.

The build uses Node.js 24 LTS and a pinned esbuild release.

The custom domain is defined by `CNAME`.

## Content safety

Professional fieldwork is anonymized. Do not add client names, private architecture details, secrets, or unsupported performance claims. Public technical proof should link to a repository or other inspectable artifact.
