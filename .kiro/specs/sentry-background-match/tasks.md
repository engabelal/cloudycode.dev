# Implementation Plan: Sentry.io Background Match

## Overview

This implementation plan provides step-by-step tasks to achieve a pixel-perfect 1:1 recreation of the Sentry.io welcome page background. The approach updates existing CSS files to match the exact Sentry.io specifications.

## Tasks

- [x] 1. Update base body styles and critical inline CSS

  - Update body background-color to exact #1F1633
  - Add critical inline CSS in HTML head to prevent flash
  - Ensure body has proper positioning for layer stacking
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Update background layer base styles

  - [x] 2.1 Update .background-layer class in custom.css
    - Set position: fixed for viewport anchoring
    - Set full viewport coverage (top, left, right, bottom: 0)
    - Set pointer-events: none for non-interactivity
    - Set z-index: 0 for proper stacking
    - _Requirements: 6.1, 7.2_

- [x] 3. Update Nebula/Stars layer styles

  - [x] 3.1 Update .bg-layer-stars class in custom.css
    - Set background-image to sentry-welcome-bg.webp
    - Set background-size to 1040px auto
    - Set background-position to 60% center
    - Set background-repeat to no-repeat
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 4. Update Gradient + Texture layer styles

  - [x] 4.1 Update .bg-layer-gradient class in custom.css
    - Implement linear-gradient with exact color stops:
      - 0%: rgb(31, 22, 51)
      - 40%: rgb(48, 20, 95)
      - 75%: rgb(48, 20, 95)
      - 100%: rgb(31, 22, 51)
    - Add texture overlay with 200px × 200px tiling
    - Set proper background-size for both layers
    - _Requirements: 3.1, 3.2, 4.1, 4.2, 4.3_

- [x] 5. Update Pink Glow layer styles

  - [x] 5.1 Update .bg-layer-glow class in custom.css
    - Implement radial-gradient with exact specifications:
      - Shape: ellipse 60% 40%
      - Position: 50% 20% (top-center)
      - Color: rgba(173, 108, 170, 0.15) at center
      - Fade to transparent at 70%
    - _Requirements: 5.1, 5.2, 5.3_

- [x] 6. Verify HTML structure in index.html

  - [x] 6.1 Ensure background layer divs exist in correct order
    - Verify bg-layer-stars comes first
    - Verify bg-layer-gradient comes second
    - Verify bg-layer-glow comes third
    - _Requirements: 6.1_

- [x] 7. Update theme.css color variables

  - [x] 7.1 Ensure all color variables match exact Sentry values
    - Update --bg-dark-primary to #1F1633
    - Update --bg-nebula to #30145F
    - Update --glow-pink rgba value
    - _Requirements: 9.1, 9.2_

- [x] 8. Add responsive adjustments

  - [x] 8.1 Add mobile-specific background positioning
    - Adjust nebula layer position for smaller screens
    - Ensure no horizontal overflow on mobile
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 9. Checkpoint - Visual verification

  - Ensure all background layers render correctly
  - Compare against Sentry.io reference
  - Test scrolling behavior (layers should stay fixed)
  - Ask the user if questions arise

- [ ] 10. Write property tests for background system

  - [ ] 10.1 Write property test for fixed positioning

    - **Property 1: All Background Layers Fixed Position**
    - **Validates: Requirements 6.2**

  - [ ] 10.2 Write property test for non-interactivity

    - **Property 2: All Background Layers Non-Interactive**
    - **Validates: Requirements 7.2**

  - [ ] 10.3 Write property test for no horizontal overflow
    - **Property 3: No Horizontal Overflow**
    - **Validates: Requirements 8.4**

- [ ] 11. Final checkpoint - Complete verification
  - Ensure all tests pass
  - Verify visual match with Sentry.io
  - Test on multiple browsers (Chrome, Firefox, Safari)
  - Ask the user if questions arise

## Notes

- All tasks are required for comprehensive implementation
- The existing project already has the background layer structure in place
- Main work involves updating CSS values to match exact Sentry.io specifications
- Visual verification against Sentry.io is critical for pixel-perfect match
