# Lessons Learned

## Usage Rules
- Add an entry after each user correction.
- Focus on repeatable prevention rules, not one-off details.
- Keep entries short and actionable.

## Entry Template
### YYYY-MM-DD - <short mistake label>
- Correction from user:
- Root cause:
- Prevention rule:
- How to verify next time:

## Entries
### 2026-08-30 - Follow explicit logo geometry, not just the concept
- Correction from user: The simplified cloud with a `</>` glyph still felt poorly designed; the desired mark is an open-baseline cloud containing a terminal `>_` prompt.
- Root cause: I preserved the general cloud/code idea but changed the supplied visual language too much, especially the silhouette and glyph.
- Prevention rule: When the user supplies a clear logo reference, reproduce its defining geometry—silhouette, negative space, glyph, and stroke character—while keeping the final vector original and palette-aligned.
- How to verify next time: Compare the defining features side by side at large size, then inspect the SVG again at the actual header size.

### 2026-08-30 - Repeated proof is not stronger proof
- Correction from user: The four-cell hero summary felt visually generic and its claims repeated information already explained elsewhere.
- Root cause: I treated repeated metrics as reassurance even though the credentials, labs, and experience sections already provide stronger contextual evidence.
- Prevention rule: Every summary strip must add a distinct decision-making signal; if its content is repeated or generic, remove the component rather than redesigning it.
- How to verify next time: Map each summary claim to the page and remove any item whose strongest version already appears in a dedicated section.

### 2026-08-30 - Do not repeat personal location metadata
- Correction from user: Personal location should be removed from the hero and everywhere else on the site.
- Root cause: Location appeared as repeated authority metadata across the hero, profile facts, footer, and repository documentation without a current need.
- Prevention rule: Treat personal location as optional private metadata; include it only when the user explicitly wants it public and never duplicate it across surfaces by default.
- How to verify next time: Search all public source, metadata, documentation, and auxiliary text files for city, country, regional abbreviations, and “based in” wording.

### 2026-08-30 - Small identity marks need ruthless restraint
- Correction from user: The CloudyCode mark’s cyan gradient, black terminal tile, and overlapping cloud geometry felt unattractive and disconnected from the site palette.
- Root cause: I compressed several brand ideas into one small mark and introduced a third accent color that the wider interface did not use.
- Prevention rule: At header size, use one clear silhouette, no badge-on-badge composition, and no more than two established brand colors.
- How to verify next time: Inspect the raw transparent SVG and the rendered mark at its actual 42–48px size beside the header typography on both mobile and desktop.

### 2026-08-30 - Dense evidence needs progressive disclosure
- Correction from user: Even the compact ledger remained too large and visually heavy for a simple portfolio.
- Root cause: I reduced each record’s height but still rendered all 13 records by default, so the section remained dominated by its archive.
- Prevention rule: When all details must remain available but the default composition should stay light, surface only the most relevant evidence and place the remainder behind a clearly labeled native disclosure.
- How to verify next time: Measure the closed-state section height, confirm the complete data is keyboard-accessible when expanded, and test that the summary clearly communicates the hidden item count.

### 2026-08-30 - Simplicity means removing containers
- Correction from user: The white contact card with two nested rounded action blocks still felt neither simple nor professionally integrated.
- Root cause: I solved hierarchy by adding another container layer, creating a component-heavy SaaS look instead of the site’s editorial portfolio language.
- Prevention rule: When the requested direction is simple and professional, first remove surfaces, borders, and nested radii; use typography, spacing, and fine rules to create hierarchy.
- How to verify next time: Count visible containers and corner treatments, then confirm the section still reads clearly when reduced to its essential text and actions.

### 2026-08-30 - Preserve user-approved positioning language
- Correction from user: The credential headline should use the stronger positioning statement “Proven expertise across the stack.”
- Root cause: The earlier simplification reduced complexity but also softened the intended authority signal.
- Prevention rule: When the user supplies exact brand copy, preserve it verbatim and adjust the layout around the message rather than rewriting it.
- How to verify next time: Confirm the exact phrase appears in source and review its wrapping at mobile and desktop widths.

### 2026-08-30 - Evidence sections need editorial structure
- Correction from user: The credential card grid looked less professional than the rest of the portfolio.
- Root cause: Equal-height generic cards created excessive empty space and treated every credential like a UI tile rather than evidence in a curated archive.
- Prevention rule: For dense professional evidence, prefer a scan-friendly ledger or timeline with explicit metadata columns over a repetitive dashboard-card grid.
- How to verify next time: Compare density, hierarchy, and scan speed with the surrounding sections at mobile and desktop widths; every visual container must earn its space.

### 2026-08-29 - Section seams should not look accidental
- Correction from user: The short green segment between the contact section and footer read as a stray rendering artifact.
- Root cause: A multicolor footer-top accent became visually disconnected because its blue segment disappeared against the preceding blue section.
- Prevention rule: At strong color transitions, use a continuous neutral divider or no divider; avoid partial accent segments that can look like glitches.
- How to verify next time: Inspect every section seam on mobile and desktop, especially where adjacent surfaces share one of the accent colors.

### 2026-08-29 - Contact CTAs need hierarchy, not just scale
- Correction from user: The blue contact section still looked visually unresolved, with a loose sentence and oversized generic buttons.
- Root cause: I increased CTA scale for visibility without giving the contact choices a clear internal hierarchy or containing surface.
- Prevention rule: Conversion sections should use one concise promise, one supporting sentence, and clearly ranked contact rows inside a structured surface.
- How to verify next time: Inspect the whole contact section at desktop and mobile; ensure the primary channel is obvious without either action dominating the composition.

### 2026-08-29 - Preserve verified content breadth during visual simplification
- Correction from user: The redesigned credentials section showed only six certifications even though the previous portfolio contained thirteen.
- Root cause: I treated “selected credentials” as permission to omit verified history without confirming the desired level of completeness.
- Prevention rule: When redesigning existing content, inventory and preserve all verified records first; simplify presentation, not factual breadth, unless the user approves curation.
- How to verify next time: Compare item counts and titles against the previous implementation before marking the redesigned section complete.

### 2026-08-29 - Navigation emphasis must follow the active section
- Correction from user: The mobile menu should brighten the selected/current section and mute the other links.
- Root cause: The first link was styled as a permanent visual default instead of reflecting scroll position or the user's last destination.
- Prevention rule: Any menu that visually distinguishes one item must derive that state from navigation/scroll state and expose it with `aria-current`.
- How to verify next time: Open the menu from each linked section and confirm exactly one matching link is emphasized.

### 2026-08-29 - Bump asset versions after every post-review CSS or logo change
- Correction from user: The browser still showed the oversized headline and a non-transparent logo treatment after refinement.
- Root cause: I changed the CSS and SVG after assigning their cache-busting version, allowing the in-app browser to keep the earlier rendered assets.
- Prevention rule: Any edit after a versioned asset has been previewed must receive a new query version or filename before asking the user to review it.
- How to verify next time: Load the final URL in a fresh navigation, inspect the requested viewport, and compare computed font sizes and the exact loaded asset URL.

### 2026-08-29 - Separate personal portrait placement from compact brand-mark placement
- Correction from user: The small header identity should use a CloudyCode-style graphic rather than Ahmed's portrait, while the role should be more explicit and senior.
- Root cause: I reused one identity asset across contexts that serve different jobs: personal authority and compact brand recognition.
- Prevention rule: Use portraits where trust and personality need room; use a legible brand mark in compact navigation identity.
- How to verify next time: Inspect the header at its smallest rendered size and confirm the mark remains recognizable without competing with the name and role.

### 2026-08-29 - Verify text centering geometrically inside animated controls
- Correction from user: The word “Menu” still did not look centered inside the capsule.
- Root cause: The label relied on intrinsic grid content sizing, so typographic metrics and the animated panel behind it could make the control look optically off-center.
- Prevention rule: Animated capsule labels should fill the control and use explicit two-axis centering independent of text width.
- How to verify next time: Compare label and button center coordinates in the browser for both closed and open states, then inspect the screenshot at mobile size.

### 2026-08-29 - Match reference proportions and motion, not only the visual ingredients
- Correction from user: The recreated menu was too tall, not smooth, and still felt unlike the reference; related JavaScript motion also needed study across mobile and desktop.
- Root cause: I matched the colors, rounded panel, and content placement from a single open-state screenshot but did not measure panel height, timing, easing, or the broader motion language.
- Prevention rule: For reference-led interaction work, record geometry at multiple viewports, inspect transition states and loaded motion code, and build a motion inventory before implementation.
- How to verify next time: Compare reference and implementation side by side for closed, mid-transition, and open states on both mobile and desktop; also test interrupted toggles and reduced motion.

### 2026-08-29 - Match an explicitly requested interaction before inventing a substitute
- Correction from user: The mobile menu should use the supplied reference's exact interaction pattern and visual effect, adapted to CloudyCode.
- Root cause: I replaced the broken overlay with a clean fullscreen panel but changed the requested floating-panel silhouette and menu-to-close transformation.
- Prevention rule: When the user explicitly selects a reference interaction, first reproduce its geometry, hierarchy, and motion behavior; customize only brand colors, copy, and destinations.
- How to verify next time: Capture the reference closed/open states and transition, then compare the implementation side by side at the same viewport.

### 2026-08-29 - Test open navigation visually, not only by state
- Correction from user: The mobile menu looked broken even though its ARIA state, focus return, and target-size checks passed.
- Root cause: A backdrop-filter containing block changed the fixed menu's visual positioning; behavioral assertions did not reveal the overlap with hero content.
- Prevention rule: Every overlay must be screenshot-tested in its open state at the narrowest supported viewport, not only checked through DOM state.
- How to verify next time: Capture the opened menu, confirm an opaque full-height layer, inspect stacking against page content, and then test keyboard close/focus return.

### 2026-08-29 - Oversized branding needs explicit approval
- Correction from user: The giant footer name felt excessive and made the footer unattractive.
- Root cause: I borrowed the reference's oversized personal-brand gesture without separately validating that level of scale in the footer.
- Prevention rule: Treat extreme typography as a high-risk signature element; use it only after the user approves the specific crop or scale.
- How to verify next time: Inspect the full footer at desktop and mobile and confirm the identity remains supportive rather than dominating the contact journey.

### 2026-08-28 - Validate dominant surface color before treating the direction as final
- Correction from user: The main `#F4F7F6` surface felt wrong, and the header needed a stronger reference-led composition.
- Root cause: I validated structure and performance thoroughly but did not isolate the dominant light surface and header atmosphere for explicit visual approval.
- Prevention rule: For visually led work, review the dominant background, header silhouette, and accent atmosphere as separate approval points before calling the visual direction finished.
- How to verify next time: Present or inspect a viewport crop containing the header and hero, then confirm the exact surface and accent behavior across desktop and mobile.

### 2026-08-28 - Keep optional identity assets reversible
- Correction from user: A professional portrait became available after the no-photo direction was selected.
- Root cause: The earlier decision was made before reviewing a suitable real asset.
- Prevention rule: Treat portrait omission as provisional when asset quality is the blocker; reassess once the user supplies a professional image.
- How to verify next time: Inspect the actual asset and choose placement based on hierarchy, credibility, performance, and mobile behavior rather than the earlier placeholder assumption.

### 2026-08-28 - Interpret shorthand against the user's wording
- Correction from user: "الأربعة" meant all four stated goals, not option number four.
- Root cause: I mapped a short Arabic reply directly to a numbered choice without checking whether it referred to the whole set.
- Prevention rule: When a terse reply can mean either one numbered option or all listed items, reflect both interpretations briefly or confirm before locking the decision.
- How to verify next time: Restate the selected outcome in plain language and ensure it matches the user's exact scope.

### 2026-03-10 - Global Scope Required
- Correction from user: Settings should be global, not project-specific.
- Root cause: I implemented workflow scaffolding only inside the active repository.
- Prevention rule: For behavior/process preferences, apply at parent/global instruction level first, then optionally add local templates.
- How to verify next time: Confirm requested scope (repo, directory tree, or global) before finalizing and ensure the configured file path matches that scope.

### 2026-08-30 - Keep repository automation aligned with explicit user preference
- Correction from user: Dependabot update automation is not wanted for this repository.
- Root cause: I retained weekly automated version-update configuration after simplifying the pipeline because it is commonly useful, instead of treating bot activity as a separate product choice.
- Prevention rule: Do not preserve or introduce automated dependency-update bots unless the repository owner wants their PR and branch activity.
- How to verify next time: Audit bot configuration, open bot PRs, and generated branches separately from vulnerability reporting before finalizing repository automation.

### 2026-08-30 - Treat commit attribution as part of the public portfolio surface
- Correction from user: Automated and assistant identities should not appear in the repository Contributors graph.
- Root cause: I removed bot automation and branches but did not initially audit historical author emails and co-author trailers, which GitHub uses for contributor attribution.
- Prevention rule: For a personal portfolio repository, review reachable commit authors and co-author trailers before publishing history; do not add assistant attribution that conflicts with the owner's contributor policy.
- How to verify next time: Inspect `git log` identities and trailers, query the contributor API, and allow for GitHub's contributor-statistics refresh window after any approved history rewrite.

### 2026-08-30 - Collapsed animated layers must share one exact silhouette
- Correction from user: The mobile Menu control visibly rendered as two overlapping black capsules instead of one clean control.
- Root cause: The collapsed navigation panel used different top and right offsets from the trigger, leaving its background exposed below and beside the button.
- Prevention rule: When a panel expands from behind a trigger, its collapsed bounding box and radius must exactly match the trigger before any animation begins.
- How to verify next time: Capture the closed state at every supported mobile width and compare the trigger and collapsed panel bounding rectangles pixel-for-pixel before testing the open transition.

### 2026-08-30 - Verify open control inset independently from the closed silhouette
- Correction from user: Although the closed mobile capsule was fixed, the open Close control still extended beyond the expanded panel and was visibly misaligned.
- Root cause: I verified matching closed rectangles and matching corner radii, but did not assert the open control's top/right inset relative to the panel; the positive horizontal transform pushed it outside.
- Prevention rule: Treat closed overlap and open inset as separate geometry contracts, and verify both numerically before publishing.
- How to verify next time: In the fully open state, assert that `button.top - panel.top` and `panel.right - button.right` are equal, positive, and match the approved inset at every mobile width.
