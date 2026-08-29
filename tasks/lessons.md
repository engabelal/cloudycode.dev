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
