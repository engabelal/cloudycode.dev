# CloudyCode Portfolio Redesign Discovery

## Mobile Menu Capsule Correction
- [x] Reproduce the closed-state double-capsule silhouette from the supplied mobile screenshot.
- [x] Align the collapsed navigation panel exactly behind the Menu control so only one capsule is visible.
- [x] Preserve the open-state expansion geometry, corner radius, alignment, and accessible behavior.
- [x] Verify closed/open states at 320px, 360px, and 390px and confirm no regression on desktop.
- [x] Record verification results and bump the asset cache version.

### Mobile Menu Capsule Results
- The collapsed panel and Menu button now share identical `x`, `y`, width, height, right, and bottom coordinates at 320px, 360px, and 390px; the exposed second capsule is gone.
- At widths below 368px, secondary brand metadata is hidden so the fixed-width Menu control remains inside the header shell instead of being pushed sideways.
- The open panel remains 90vw with a 25px radius, while the Close control retains the same 25px radius and the established expansion motion.
- No horizontal overflow was detected in the open state; the desktop trigger remains hidden and desktop navigation remains static at 1024px.
- Browser console: zero warnings/errors. JavaScript syntax, local references, version consistency, and diff whitespace checks passed.
- Cache version advanced to `v3.11.2` so mobile browsers receive the corrected CSS immediately.

## Plan
- [x] Inspect the existing repository, content structure, and design tokens.
- [x] Review the deployed site at desktop width.
- [x] Review relevant local portfolio and UI/UX skills.
- [x] Search the official curated skills catalog and trusted public sources.
- [x] Install the official Anthropic `frontend-design` skill for future turns.
- [x] Confirm the portfolio's primary audience and conversion goal.
- [x] Present 2–3 design directions with trade-offs and a recommendation.
- [x] Confirm the selected direction and document the design brief.
- [x] Create an implementation plan only after design approval.

## Implementation Plan
- [x] Replace the homepage with semantic Control Plane content and accessible navigation.
- [x] Build a mobile-first responsive visual system with locally hosted fonts.
- [x] Add minimal navigation/service-worker JavaScript and remove runtime UI dependencies.
- [x] Refresh PWA metadata, offline state, and social preview for the new identity.
- [x] Validate HTML, links, console output, keyboard behavior, and reduced motion.
- [x] Capture and inspect screenshots at 360, 390, 768, 1024, and 1440px.
- [x] Run Lighthouse and document results and remaining risks.

## Current Findings
- The current site has solid static-site fundamentals and already fits GitHub Pages.
- Its presentation is too long, visually uniform, purple/glow-heavy, and template-like.
- Technology lists and generic claims occupy more attention than credible engineering evidence.
- The redesign should prioritize real case studies, decisions, measurable outcomes, and fast contact conversion.
- The strongest local workflow combines `interactive-portfolio`, `ui-ux-pro-max`, and `frontend-design`.

## Review / Results
- Official Anthropic `frontend-design` skill installed globally and applied with the local portfolio/UI skills.
- Confirmed: serve hiring, consulting, and freelance opportunities; present Ahmed as a balanced hands-on expert, architect/consultant, and technical leader.
- Confirmed: English-only, hybrid light/dark visual tone, Ahmed Belal as the brand, and GitHub Pages compatibility.
- Selected direction: `The Control Plane`, enriched with `System Record` case-study metadata.
- Mobile-first quality is a non-negotiable acceptance criterion.
- Rebuilt the site as a dependency-free static experience and removed the obsolete theme/runtime files.
- Added Ahmed's supplied portrait in a responsive authority block below the operating model rather than forcing it into the hero.
- Adapted editorial pacing, oversized personal branding, and restrained technical signals from the supplied reference without copying its assets or layout.
- Verified 360, 390, 768, 1024, and 1440px layouts with no horizontal overflow; primary controls and calls to action meet the touch-size contract.
- Verified keyboard menu behavior, focus return, reduced-motion handling, zero browser console warnings/errors, local references, metadata, CSP hash, and service-worker asset coverage.
- Lighthouse (mobile and desktop): Performance 100, Accessibility 100, Best Practices 100, SEO 100.
- Mobile lab metrics: FCP 1.4s, LCP 1.5s, CLS 0.006, TBT 0ms. Desktop: FCP/LCP 0.4s, CLS 0.005, TBT 0ms.
- Public GitHub lab links returned successfully. LinkedIn/blog availability may vary for automated clients because of anti-bot responses, but the blog opened successfully in a real browser.
- Remaining publishing check: Ahmed should personally confirm every anonymized fieldwork metric before deploying.

## Header / Light Surface Refinement
- [x] Re-review `frontend-design` and `ui-ux-pro-max` guidance against the supplied navigation reference.
- [x] Define a CloudyCode-specific alternative to the rejected `#F4F7F6` surface.
- [x] Replace the flat header with a responsive identity/status/navigation/CTA composition.
- [x] Add a restrained cloud-telemetry glow and ruler detail without copying the reference.
- [x] Revalidate mobile menu, overflow, focus, contrast, and Lighthouse after the change.

### Refinement Design Plan
- Palette: `Cloud White #FCFCFA`, `Night Ops #0B1118`, `Control Blue #2563EB`, `Telemetry Cyan #57E3FF`, and `Mist Line #DCE4E1`.
- Type: retain Sora for decisive editorial display/body hierarchy and IBM Plex Mono for operational labels and status metadata.
- Layout: desktop uses a three-zone header—portrait/status identity, sequential section navigation, and a dark contact capsule; mobile reduces it to identity plus an accessible menu control.
- Signature: a top calibration ruler dissolving into a blue/cyan telemetry aurora, connecting the reference's atmosphere to cloud infrastructure rather than reusing its lime treatment.
- Self-critique: avoid generic floating-glass navigation and animation-heavy portfolio defaults; make the operational status and calibration marks carry the DevSecOps identity.

### Refinement Results
- Replaced the rejected green-grey paper with near-white `#FCFCFA`; no product surface still uses `#F4F7F6`.
- Added Ahmed's optimized 128px avatar, role, live availability signal, indexed navigation, and a high-contrast contact capsule.
- Added a calibration ruler and blue/cyan telemetry aurora as the single atmospheric signature.
- Desktop and 390px viewport crops inspected; mobile has no overflow and primary controls remain comfortably touchable.
- Mobile menu open/close state, body lock, Escape handling, and focus return verified.
- Browser console: zero warnings/errors. Static references, JSON, JavaScript syntax, service-worker assets, duplicate IDs, and diff whitespace checks passed.
- Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.8s, CLS 0.006, TBT 0ms.

## Footer and Mobile Navigation Correction
- [x] Reproduce the broken mobile navigation overlay at 390px and identify the containing-block issue.
- [x] Replace the oversized footer wordmark with a quieter operational-signoff composition.
- [x] Rebuild the mobile menu using the supplied reference's floating-panel geometry and menu/close effect, adapted to CloudyCode.
- [x] Inspect footer and menu at mobile/desktop widths and rerun interaction/accessibility checks.

### Footer / Menu Results
- Removed the giant footer name and replaced it with a compact identity block, internal/external link groups, operational status, and back-to-top action.
- Rebuilt the mobile trigger as a black `Menu` capsule that morphs to a white `Close` capsule while a rounded dark panel expands from the top-right control.
- Matched the reference hierarchy with large staggered links, bottom contact capsule, and compact social links while preserving CloudyCode content and colors.
- Added a keyboard focus loop inside the open menu; Escape closes it, restores focus, and unlocks body scrolling.
- The earlier full-height mobile panel was replaced by the compact reference-matched geometry documented below.
- Desktop navigation remains unchanged and visible; the mobile trigger remains hidden at desktop width.
- Final browser console: zero warnings/errors. Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.8s, CLS 0.006, TBT 0ms.

## Reference Motion System Rework
- [x] Audit the reference site's mobile menu geometry at multiple viewport heights and capture its open/close timing.
- [x] Inventory the reference site's JavaScript-driven motion on mobile and desktop from observable behavior and loaded bundles.
- [x] Map only suitable motion patterns to CloudyCode sections without copying source code or unrelated content.
- [x] Rebuild the menu as a compact floating panel with smooth, interruptible animation.
- [x] Implement a restrained cross-device motion system for header, hero, section reveals, rails, cards, and contact/footer transitions.
- [x] Verify 360/390px mobile and 1024/1440px desktop behavior, reduced motion, keyboard access, performance, and visual smoothness.

### Motion / Alignment Results
- Independently adapted the reference interaction constants: the mobile control expands from `100×40px` to `90vw×650px`, retains a `25px` radius, and keeps the close control exactly `10px` from the panel's top and right edges.
- Matched the `750ms` panel tween, `350ms` close delay, `700ms` child entrance, `60ms` stagger, and `cubic-bezier(0.76, 0, 0.24, 1)` easing.
- At 360, 390, and 768px, the first link and contact action share the exact same 40px left inset; social links share the exact 40px right inset. Panel and button radii remain identical.
- Sampled the panel at 120ms, 380ms, and 850ms: the radius remains exactly `25px` throughout the expansion, including after an interrupted close/reopen sequence.
- Added locally hosted Lenis smooth scrolling, a 30-second systems rail, staggered viewport reveals, rolling desktop navigation labels, and a rotating control-plane status log.
- Verified no horizontal overflow at 360, 390, 768, 1024, and 1440px; desktop navigation remains visible and aligned.
- Verified keyboard wrap (`Shift+Tab`/`Tab`), Escape close with focus return, zero reduced-motion animation, and no motion enhancement when `prefers-reduced-motion` is enabled.
- Final Lighthouse mobile audit: Performance 98, Accessibility 100, Best Practices 100, SEO 100; LCP 2.1s, CLS 0.006, TBT 0ms. Browser console: zero warnings/errors.

## Process Section / Navigation Refinement
- [x] Replace the existing generic capability list with an original four-phase process section inspired by the supplied reference.
- [x] Place the process after public labs and before the personal authority/credentials sequence.
- [x] Add Home to desktop and mobile navigation with correct numbering and smooth top navigation.
- [x] Correct the Menu/Close label centering with geometry-based alignment rather than font-dependent placement.
- [x] Verify menu stagger/focus order after adding Home and test 360–1440px alignment.
- [x] Recheck motion smoothness, reduced motion, console output, and Lighthouse performance.

### Process / Navigation Results
- Reframed the existing Approach section as a clear four-phase methodology—Discover & Frame, Architect & Align, Build & Verify, and Launch & Improve—so the site gains the requested visual rhythm without duplicating content.
- Kept the section after public labs and before Ahmed's authority profile: evidence first, methodology second, person/credentials third.
- Added `Home 00` to desktop and mobile navigation and Home to the footer; verified smooth return to the top.
- Menu/Close label center and button center now match exactly on both axes (`0px` delta) at mobile size.
- Four mobile menu links, CTA, and social links retain exact 40px edge alignment at 360, 390, and 768px; no overlap and no horizontal overflow.
- Verified layouts at 360, 390, 768, 1024, and 1440px, keyboard focus wrap, Escape/focus return, reduced-motion fallback, and zero console warnings/errors.
- Final Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.5s, LCP 2.1s, CLS 0, TBT 0ms.

## Hero and Header Brand Refinement
- [x] Replace the hero thesis with the approved three-part outcome statement and design a stronger typographic rhythm.
- [x] Change the header role to “Senior DevSecOps and Cloud Engineer” and keep identity metadata consistent.
- [x] Design an original lightweight CloudyCode cloud/code mark and replace only the small header portrait.
- [x] Verify the new mark and hero at mobile and desktop widths, including contrast and line wrapping.
- [x] Re-run static validation, console checks, reduced motion, and Lighthouse.

### Hero / Brand Results
- Rebuilt the approved thesis as three intentional lines with a blue signal line and restrained amber underline; it now stays on exactly three lines at 390, 1024, 1440, and 1586px instead of exploding into six oversized lines.
- Updated page, social, structured-data, header, and footer role copy to “Senior DevSecOps and Cloud Engineer.”
- Replaced the compact portrait with an original transparent CloudyCode cloud/terminal mark (later superseded by the final v4 mark).
- Issued new v3.5.2 cache keys and a new logo filename so the corrected assets cannot be confused with the stale preview.
- Verified no horizontal overflow, zero browser console warnings/errors, local references, service-worker coverage, and transparent SVG source.
- Final Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.5s, LCP 2.1s, CLS 0, TBT 0ms.

## Active Navigation / Methodology / Credentials Correction
- [x] Add section-aware mobile navigation so only the current destination is bright and all inactive links are muted.
- [x] Replace the oversized “How I Work” treatment with a clearer, more compact methodology heading.
- [x] Restore all 13 credentials from the previous portfolio data without inventing new claims.
- [x] Redesign credentials as a readable responsive archive rather than a long undifferentiated list.
- [x] Verify scroll-spy behavior, mobile menu states, section typography, full credential layout, reduced motion, and Lighthouse.

### Active Navigation / Methodology / Credentials Results
- Added a requestAnimationFrame-throttled scroll spy: Home, Fieldwork, Open Labs, and Approach each receive the sole bright state and `aria-current="location"` when active; all other mobile links are muted.
- Replaced the oversized uppercase “HOW I WORK” treatment with the clearer single-line “How I deliver.” heading and a restrained blue period.
- Recovered the exact 13-item credential archive from the previous site's local data, including levels and issue dates; no new credential claims were invented.
- Redesigned credentials into 1/2/3-column cards at mobile/tablet/desktop with issuer pills, title, level, and date, plus a prominent verified count.
- Verified exactly one active menu item from every linked section, all 13 cards, no overflow at 360/390/768/1024/1440px, reduced-motion visibility, and zero console warnings/errors.
- Final Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.5s, LCP 2.0s, CLS 0, TBT 0ms.

## Contact Conversion Refinement
- [x] Apply the approved simpler credentials heading: “Certified across the stack.”
- [x] Replace the oversized contact buttons and loose paragraph with a compact, structured contact card.
- [x] Simplify the contact headline and make the email/LinkedIn hierarchy immediately clear.
- [x] Verify contact layout and touch behavior on mobile/tablet/desktop, then recheck Lighthouse.

### Contact Conversion Results
- Simplified the credential headline to “Certified across the stack.” while retaining the full verified archive.
- Rebuilt the contact section around a concise outcome-led headline and a contained white action card instead of two oversized buttons floating on the blue field.
- Established a clear channel hierarchy: email is the dark primary row, while LinkedIn is a quieter secondary row; both provide 72px touch targets and descriptive micro-labels.
- Added restrained concentric telemetry lines to the blue field for depth without introducing image requests or layout overhead.
- Verified no horizontal overflow at 390px and 1440px, 72px action heights, zero console warnings/errors, valid local references, unique IDs, and complete service-worker asset coverage.
- Final Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.5s, LCP 2.0s, CLS 0, TBT 0ms.

## Footer Seam Correction
- [x] Remove the isolated green accent at the contact/footer boundary.
- [x] Replace it with a continuous, low-contrast divider that reads intentionally on all viewport sizes.
- [x] Issue cache version 3.6.2 and verify the seam visually.

## Credential Archive Redesign
- [x] Replace the generic equal-height card grid with a compact editorial credential ledger.
- [x] Give each credential a clear scan order: index, issuer, certification, level, and issue date.
- [x] Preserve all 13 verified credentials and avoid implying unverified links or badge artwork.
- [x] Build dedicated mobile/tablet/desktop layouts with readable type and no horizontal scrolling.
- [x] Verify reduced motion, console output, semantics, local assets, and Lighthouse quality.

### Credential Archive Results
- Replaced 13 tall, repetitive cards with one cohesive evidence ledger whose column hierarchy matches the technical/editorial language of the rest of the site.
- Desktop and tablet expose explicit No./Issuer/Certification/Level/Issued columns; mobile reflows every record into a compact three-line hierarchy without horizontal scrolling.
- Preserved all 13 credential names, levels, and dates, added semantic `time` values, and introduced no unverifiable badge art or external claims.
- Verified 360/375/768/1024/1440px layouts, zero cell overlaps, all records visible, zero console warnings/errors, valid local references, unique IDs, and complete service-worker coverage.
- Final Lighthouse: Performance 98, Accessibility 100, Best Practices 100, SEO 100; FCP 1.7s, LCP 2.1s, CLS 0, TBT 20ms.

## Credential Headline Copy
- [x] Replace the credential headline with the user-approved “Proven expertise across the stack.”
- [x] Issue cache version 3.7.1 and verify responsive wrapping.

## Minimal Contact Redesign
- [x] Remove the large white card, nested button containers, and decorative rings.
- [x] Present email and LinkedIn as direct, understated contact rows with clear hierarchy.
- [x] Tighten the supporting copy and preserve large mobile touch targets.
- [x] Verify 360–1440px alignment, console output, reduced motion, and Lighthouse.

### Minimal Contact Results
- Removed every nested surface and rounded action container from the contact area, along with the decorative rings behind it.
- Rebuilt the section as one shared technical ruler, a concise headline, and two direct contact rows separated only by fine white rules.
- Email now exposes the real address immediately; LinkedIn identifies Ahmed directly. Both remain full-width 80px touch targets on mobile.
- Verified no overflow at 360/390/768/1024/1440px, zero console warnings/errors, reduced-motion rendering, and cache version 3.8.0.
- Final Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.5s, LCP 2.1s, CLS 0, TBT 0ms.

## Compact Credentials Redesign
- [x] Reduce the default section height without removing any credential details.
- [x] Show the three most recent credentials in a concise, border-light list.
- [x] Move the ten earlier credentials into an accessible native disclosure.
- [x] Replace the oversized count treatment with compact archive metadata.
- [x] Verify closed/open states, keyboard behavior, mobile/desktop layouts, and Lighthouse.

### Compact Credentials Results
- Reworked the section around progressive disclosure: the three newest credentials remain immediately visible while ten earlier records stay one click or keyboard action away.
- Removed the large count, outer ledger container, rounded corners, numbering, and table header; hierarchy now comes only from typography, spacing, and fine rules.
- Reduced the closed section to 597px on desktop and 820px on mobile while retaining all 13 names, issuers, levels, and semantic issue dates.
- Verified native keyboard toggling, closed archive height of 0, all ten records revealed when open, no overflow at 360/390/768/1024/1440px, and zero console warnings/errors.
- Final Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.7s, LCP 2.0s, CLS 0, TBT 20ms.

## CloudyCode Mark Redesign
- [x] Remove the cyan gradient, dark terminal tile, and overlapping badge geometry.
- [x] Create a transparent, original two-color cloud/code SVG using only the site’s signal blue and ink.
- [x] Tune the mark for 42–48px header rendering on mobile and desktop.
- [x] Issue a new filename/cache version and verify alignment, transparency, console output, and Lighthouse.

### CloudyCode Mark Results
- Replaced the overlapping cloud/terminal badge with one clear cloud silhouette and an integrated code glyph.
- Reduced the palette from gradient blue/cyan/black to the site’s existing signal blue `#2563eb` and ink `#0b1118`; the SVG has no background shape and is genuinely transparent.
- Delivered a lighter v3 mark and corrected its intrinsic aspect ratio (later superseded by the final v4 mark).
- Verified exact vertical centering beside the identity copy at 360/390/768/1024/1440px, no overflow, zero console warnings/errors, complete service-worker coverage, and no remaining v2 references.
- Final Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 2.0s, CLS 0.

## Hero Summary Strip Removal
- [x] Remove the repeated four-cell metrics strip instead of restyling filler content.
- [x] Preserve the genuinely useful claims in their dedicated sections only.
- [x] Rebalance the hero’s bottom spacing before the systems rail.
- [x] Verify the cleaner transition at mobile and desktop sizes, then rerun Lighthouse.

### Hero Summary Strip Results
- Removed the entire four-cell strip: 12+ years, enterprise delivery, 13 credentials, and open labs are already communicated more credibly in their dedicated sections.
- Added only responsive bottom whitespace to the hero, allowing the delivery control plane to transition directly into the dark systems rail.
- Removed all obsolete strip CSS across mobile, tablet, desktop, hover, and print contexts; no replacement filler copy or component was introduced.
- Verified no strip remains in source or DOM, no overflow at 390px/1440px, and zero browser console warnings/errors.
- Final Lighthouse: Performance 98, Accessibility 100, Best Practices 100, SEO 100; FCP 1.7s, LCP 2.1s, CLS 0, TBT 20ms.

## Reference-Led Logo Replacement
- [x] Replace the rejected enclosed cloud/`</>` mark with the supplied open cloud-terminal direction.
- [x] Draw original SVG geometry with a `>_` prompt and an intentional break in the cloud baseline.
- [x] Keep the asset transparent and tune a restrained blue gradient to the site palette.
- [x] Verify actual-size mobile/desktop rendering, cache coverage, console output, and Lighthouse.

### Reference-Led Logo Results
- Rebuilt the mark around the reference’s defining features: open cloud baseline, rounded monoline silhouette, terminal chevron, and separate underscore.
- Used an original SVG path and a restrained site-aligned gradient from `#1746b3` through `#2563eb` to `#4f8cff`; no white or opaque background is present.
- Delivered the 848-byte transparent asset as `images/cloudycode-mark-v4.svg` and rendered it at 48×36px mobile and approximately 54×40px desktop.
- Verified zero-pixel vertical center delta beside the identity at 360/390/768/1024/1440px, no overflow, zero console warnings/errors, complete service-worker coverage, and no v2/v3 references.
- Final Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 2.0s, CLS 0.

## Full Responsive / Performance Hardening
- [x] Baseline 320/360/375/390/412/768/1024/1440px layouts and identify any overflow, overlap, or undersized touch targets.
- [x] Test mobile menu geometry, current-section state, keyboard controls, scroll locking, and close behavior.
- [x] Test credential disclosure, anchor navigation, sticky header, and reduced-motion behavior.
- [x] Audit image/font/script loading, service-worker coverage, total transfer size, and render-blocking work.
- [x] Apply only evidence-based performance and mobile fixes.
- [x] Re-run mobile and desktop Lighthouse plus browser console and responsive regression checks.

### Responsive / Performance Results
- Verified zero horizontal overflow or section escape at 320/360/375/390/412/768/1024/1440px and zero browser console warnings/errors.
- Fixed the 320–360px menu footer collision by separating social links from the project CTA; all panel children remain inside the viewport at heights from 568px upward.
- Added real mobile scroll locking and made the closed menu inert, preventing background movement and keyboard focus on invisible navigation.
- Increased the menu trigger and social links to 44px minimum touch targets; the full mobile page now has no undersized interactive controls.
- Shortened menu motion so every child reaches full opacity within 850ms, retained the exact 25px panel/control radius, and verified Escape plus forward/reverse focus wrapping.
- Removed Lenis and its stylesheet from the critical path, saving 18.9KB decoded JavaScript/CSS and one continuously scheduled animation frame while retaining native smooth anchor scrolling.
- Paused the systems marquee outside the viewport, releases its `will-change` layer when inactive, and starts/stops the rotating status timer based on visibility.
- Removed per-row reveal observers from the credential archive after detecting that previously hidden disclosure rows could remain transparent; all 13 rows now render immediately when opened.
- Final initial resource load: 7 requests, 94.7KB transferred (excluding the HTML document), no broken images, 35 one-shot reveal targets, and 14 valid service-worker assets.
- Final mobile Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.4s, LCP 1.8s, CLS 0, TBT 0ms, Speed Index 1.4s.
- Final desktop Lighthouse: 100 across all four categories; FCP 0.3s, LCP 0.4s, CLS 0, TBT 0ms, Speed Index 0.3s.

## Personal Location Removal
- [x] Remove Riyadh/Saudi Arabia from the hero availability line.
- [x] Remove geographic labels from the proof strip, identity facts, and footer.
- [x] Remove personal location from `humans.txt` and repository documentation.
- [x] Replace removed UI facts with non-geographic professional information and issue cache version 3.9.2.

# Repository and Pipeline Cleanup / Main Integration

- [x] Inspect the current branch, worktree, tracked assets, and CI workflows.
- [x] Remove assets and runtime dependencies with no executable references.
- [x] Remove hosting and container configuration that is not used by GitHub Pages.
- [x] Restrict the Pages artifact to public runtime files only.
- [x] Validate links, service-worker assets, responsive behavior, and CI configuration.
- [x] Commit the verified feature branch and merge it into `main` without losing history.
- [x] Prove `main` contains the exact feature-branch result and leave a clean worktree.

## Cleanup Review / Results

- Confirmed the source branch is `portfolio-redesign`, five commits ahead of `main` before cleanup.
- Removed 47 tracked files (about 285 KB): unused Lenis files, superseded artwork/tool icons, the retired Docker release path, and hosting configuration unsupported by GitHub Pages.
- Replaced the Jekyll-wide repository publish with a 21-file public allowlist artifact; minified output is about 268 KB and excludes docs, task notes, and CI metadata.
- Pinned `clean-css-cli` 5.6.3 and Terser 5.51.2 and reproduced the Pages staging/minification commands locally.
- Validated HTML anchors/assets, JSON, SVG/XML, CSS URLs, service-worker precache paths, JavaScript syntax, HTTP 200 responses, and zero diff whitespace errors.
- Browser checks passed at 320, 360, 390, 768, 1024, and 1440 px with no horizontal overflow; the mobile menu locks scroll, closes on Escape, restores focus, and keeps 44 px or larger targets.
- Final mobile Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.8 s, TBT 0 ms, CLS 0.

# CI Runtime and Action Version Refresh

- [x] Inventory every runtime, GitHub Action, and pinned npm tool used by the active workflows.
- [x] Verify current releases and compatibility against official upstream sources.
- [x] Upgrade EOL Node.js and outdated GitHub Pages actions to compatible maintained releases.
- [x] Reproduce the Pages artifact and minification flow with the upgraded runtime/toolchain.
- [x] Validate workflow syntax, site assets, JavaScript, and the final branch state.
- [x] Commit on a feature branch and fast-forward the verified result into `main`.

## Version Refresh Results

- Replaced EOL Node.js 20 with Node.js 24 LTS and explicitly disabled unused package-manager caching.
- Upgraded Checkout 6→7, Setup Node 6→7, Configure Pages 5→6, Upload Pages Artifact 4→5, and Deploy Pages 4→5.
- Pinned Lighthouse CI Action to the current 12.6.2 release, which runs on Node.js 24.
- Replaced the two-tool Clean CSS/Terser install with esbuild 0.28.2 after the former emitted deprecated transitive-dependency warnings; the replacement audit reports zero vulnerabilities.
- Enabled hidden-file packaging so `.well-known/security.txt` and `.nojekyll` remain in the Pages artifact.
- Verified every upstream action tag, parsed all workflow YAML, passed actionlint 1.7.12, reproduced the 21-file/268 KB artifact, and syntax-checked source and minified JavaScript.

# Dependabot Removal

- [x] Confirm the repository has no open Dependabot pull requests.
- [x] Remove the weekly GitHub Actions Dependabot configuration.
- [x] Validate the remaining workflows and synchronize `portfolio-redesign` with `main` locally and remotely.

# Contributor Attribution Cleanup

- [x] Inventory author, committer, sign-off, and co-author identities across the default-branch history.
- [x] Back up the complete pre-rewrite repository history outside the working tree.
- [x] Reassign seven Dependabot-authored commits to Ahmed and remove Dependabot sign-off trailers.
- [x] Remove Anthropic/Claude-linked co-author trailers without changing commit contents or topology.
- [x] Force-update `main` and `portfolio-redesign` atomically and verify both local/remote refs match.
- [x] Confirm the rewritten history contains no Dependabot author or Anthropic/Claude co-author attribution.

# Documentation Directory Removal

- [x] Inventory the `docs/` directory and all references to its files.
- [x] Remove the internal repository guidance and design brief.
- [x] Remove stale README links while preserving runtime and deployment behavior.
- [x] Validate the repository, synchronize `portfolio-redesign` with `main`, and push both branches.
