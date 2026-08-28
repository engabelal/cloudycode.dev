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
