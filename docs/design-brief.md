# Ahmed Belal Portfolio — Design Brief

## Understanding Summary

- Ahmed Belal is the primary personal brand; CloudyCode is the domain/signature.
- The portfolio must support senior/lead hiring, consulting, and freelance opportunities.
- Ahmed should read as a balanced hands-on engineer, cloud/DevSecOps architect, and technical leader.
- Professional work is mostly confidential, so fieldwork is anonymized and public proof comes from GitHub labs.
- The site is English-only and intentionally does not use a portrait in the hero.
- The visual direction is a hybrid light/dark system that feels technical, refined, and distinctive.
- Mobile and laptop quality are equal, non-negotiable acceptance criteria.

## Design Direction: The Control Plane

The interface borrows its visual language from control planes, delivery paths, system records, and architecture reviews without becoming a literal dashboard. The light canvas communicates clarity; dark fieldwork sections carry technical depth. One cobalt signal color marks actions and system flow. Amber is reserved for small operational-state details.

The signature element is a responsive delivery path: Source → Build → Policy → Deploy → Observe. It is horizontal on wide screens and becomes a native vertical sequence on mobile rather than shrinking or overflowing. Motion is restrained, progressively enhanced, and removed when reduced motion is requested.

## Content Architecture

1. Hero thesis and responsive control-plane visual
2. Compact credibility record
3. Anonymized professional fieldwork
4. Selected public systems and GitHub labs
5. Working model and capability areas
6. Selected credentials
7. Direct contact conversion

## Visual System

- **Display/body:** Sora, self-hosted variable WOFF2
- **Utility/data:** IBM Plex Mono, self-hosted WOFF2
- **Cloud white:** `#fcfcfa`
- **Ink:** `#0b1118`
- **Deep surface:** `#101821`
- **Signal blue:** `#2563eb`
- **Operational amber:** `#f5a524`
- **Muted steel:** `#66717d`
- Layout uses a 12-column desktop grid and a single-column mobile flow.
- Borders and alignment communicate system boundaries; decoration is minimal.

## Responsive Contract

- Mobile-first CSS; primary design width is 390px.
- Verified widths: 360, 390, 768, 1024, and 1440px.
- No hover-only information or interactions.
- Primary controls and calls to action are at least 44px tall; compact secondary social links remain visually subordinate but keyboard accessible.
- Body text is at least 16px and line length stays readable.
- Diagrams reflow for small screens; they are never scaled desktop canvases.
- No horizontal scrolling at any acceptance width.

## Non-Functional Requirements

- Static HTML/CSS/vanilla JavaScript compatible with GitHub Pages.
- No runtime framework or remote package dependency.
- JavaScript progressively enhances navigation, smooth scrolling, status rotation, marquee movement, and viewport reveals; the content remains usable without it.
- WCAG 2.1 AA contrast, keyboard navigation, visible focus, and reduced motion.
- Target Lighthouse scores: 95+ Performance, Accessibility, Best Practices, and SEO.
- No client names or confidential implementation details.
- Public technical claims link to supporting repositories where possible.

## Decision Log

| Decision | Alternatives | Reason |
| --- | --- | --- |
| Ahmed Belal as the brand | CloudyCode-led identity | Stronger hiring, consulting, and reputation value |
| The Control Plane | Field Manual, Infrastructure Atlas | Best balance of memorability, clarity, and performance |
| Hybrid light/dark | All-dark, all-light | Strong technical depth without visual fatigue |
| No hero portrait | Avatar, informal portrait | A weak image would reduce senior credibility |
| Professional portrait in the authority block | Keep the site entirely portrait-free | The supplied image adds trust and personality without competing with the hero thesis |
| Vanilla static stack | Astro, React/Next | Smallest reliable solution and native GitHub Pages fit |
| Responsive system path | Desktop diagram scaled down | Preserves readability and interaction on mobile |
| Self-hosted fonts | Google Fonts runtime requests | Faster, more private, and more reliable |
| Compact operational footer | Oversized closing wordmark | Keeps Ahmed's identity visible without overpowering contact and navigation |

## Motion Contract

- Mobile navigation expands from a `100×40px` control to a `90vw×650px` floating panel with a consistent `25px` radius.
- The close control remains inset exactly `10px` from the panel's top and right edges; menu content uses aligned 40px edges.
- The main panel uses a `750ms` `cubic-bezier(0.76, 0, 0.24, 1)` tween; child elements enter over `700ms` with a 60ms stagger.
- Locally hosted Lenis provides smooth wheel scrolling. A system rail, rolling desktop labels, section reveals, and rotating control-plane messages share the same restrained motion language.
- `prefers-reduced-motion: reduce` disables smooth scrolling, cloning, timed status changes, and visual transitions.

## Known Content Constraint

The first release uses existing anonymized outcomes and verified public labs. Client names and sensitive architecture details remain excluded. Content can be refined later without changing the visual system.
