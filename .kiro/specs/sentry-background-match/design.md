# Design Document: Sentry.io Background Match

## Overview

This design document specifies the technical implementation for achieving a pixel-perfect 1:1 recreation of the Sentry.io welcome page background. The implementation uses a multi-layer CSS approach with fixed positioning, combining background images, gradients, and glow effects to create the exact visual atmosphere of the original Sentry.io design.

## Architecture

The background system follows a layered architecture pattern where each visual element is implemented as a separate fixed-position div, stacked in a specific order to achieve the composite effect.

```
┌─────────────────────────────────────────────────────────┐
│                    VIEWPORT                              │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Content Layer (z-index: 1+)                      │  │
│  │  - All page sections, navigation, etc.            │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Glow Layer (z-index: 0, layer 3)                 │  │
│  │  - Pink radial gradient at top-center             │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Gradient Layer (z-index: 0, layer 2)             │  │
│  │  - Vertical gradient + texture composite          │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Nebula Layer (z-index: 0, layer 1)               │  │
│  │  - Stars/space background image                   │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Base Color (body background)                     │  │
│  │  - #1F1633 solid color                            │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### HTML Structure

```html
<body>
  <!-- Background Layers (Sentry.io exact structure) -->
  <div class="background-layer bg-layer-stars"></div>
  <div class="background-layer bg-layer-gradient"></div>
  <div class="background-layer bg-layer-glow"></div>

  <!-- Content -->
  <main id="main-content">
    <!-- Page sections -->
  </main>
</body>
```

### CSS Component: Base Layer

```css
body {
  margin: 0;
  padding: 0;
  background-color: #1f1633;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
```

### CSS Component: Background Layer Base

```css
.background-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: visible;
}
```

### CSS Component: Nebula/Stars Layer

```css
.bg-layer-stars {
  background-image: url("../images/sentry-welcome-bg.webp");
  background-size: 1040px auto;
  background-position: 60% center;
  background-repeat: no-repeat;
}
```

### CSS Component: Gradient + Texture Layer

```css
.bg-layer-gradient {
  background-image: linear-gradient(
      180deg,
      rgb(31, 22, 51) 0%,
      rgb(48, 20, 95) 40%,
      rgb(48, 20, 95) 75%,
      rgb(31, 22, 51) 100%
    ), url("../images/sentry-texture.webp");
  background-size: 100% 100%, 200px 200px;
  background-position: 0% 0%, 0% 0%;
  background-repeat: no-repeat, repeat;
}
```

### CSS Component: Pink Glow Layer

```css
.bg-layer-glow {
  background-image: radial-gradient(
    ellipse 60% 40% at 50% 20%,
    rgba(173, 108, 170, 0.15) 0%,
    rgba(31, 22, 51, 0) 70%
  );
  background-size: 100% 100%;
  background-position: center top;
  background-repeat: no-repeat;
}
```

## Data Models

### Color Palette

| Name             | Hex     | RGB                       | Usage                               |
| ---------------- | ------- | ------------------------- | ----------------------------------- |
| Base Dark Purple | #1F1633 | rgb(31, 22, 51)           | Body background, gradient endpoints |
| Nebula Purple    | #30145F | rgb(48, 20, 95)           | Gradient midpoint                   |
| Pink Glow        | -       | rgba(173, 108, 170, 0.15) | Radial glow center                  |
| Deep Purple      | #563275 | rgb(86, 50, 117)          | CTA gradient midpoint               |
| Magenta Accent   | #8d5494 | rgb(141, 84, 148)         | CTA gradient start                  |

### Layer Configuration

| Layer    | Z-Index | Position | Blend Mode |
| -------- | ------- | -------- | ---------- |
| Body     | -       | static   | normal     |
| Stars    | 0       | fixed    | normal     |
| Gradient | 0       | fixed    | normal     |
| Glow     | 0       | fixed    | normal     |
| Content  | 1+      | relative | normal     |

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

Based on the prework analysis, the following testable properties have been identified:

### Property 1: All Background Layers Fixed Position

_For any_ background layer element (bg-layer-stars, bg-layer-gradient, bg-layer-glow), the computed position style SHALL be "fixed" to ensure layers remain anchored to the viewport during scrolling.

**Validates: Requirements 6.2**

### Property 2: All Background Layers Non-Interactive

_For any_ background layer element, the computed pointer-events style SHALL be "none" to ensure background layers do not intercept user interactions.

**Validates: Requirements 7.2**

### Property 3: No Horizontal Overflow

_For any_ viewport size, the document body width SHALL NOT exceed the viewport width, ensuring no horizontal scrollbar appears due to background layers.

**Validates: Requirements 8.4**

## Error Handling

### Image Load Failures

If background images fail to load, the system gracefully degrades:

1. **Nebula Layer Failure**: The gradient layer provides sufficient visual depth without the stars image
2. **Texture Layer Failure**: The gradient colors remain visible without the grain texture
3. **Both Failures**: The base color (#1F1633) and gradient provide a functional dark purple background

### CSS Fallback Strategy

```css
/* Fallback for older browsers without gradient support */
.bg-layer-gradient {
  background-color: #30145f; /* Fallback solid color */
  background-image: /* gradients */ ;
}
```

### Browser Compatibility

- Modern browsers: Full support for all layers
- Safari: Requires -webkit-backdrop-filter prefix if blur effects are added
- IE11: Not supported (graceful degradation to solid color)

## Testing Strategy

### Unit Tests (Example-Based)

Unit tests verify specific CSS property values are correctly applied:

1. **Base Color Test**: Verify body background-color is #1F1633
2. **Nebula Layer Tests**:
   - Verify background-image contains "sentry-welcome-bg.webp"
   - Verify background-size is "1040px auto"
   - Verify background-position is "60% center"
   - Verify background-repeat is "no-repeat"
3. **Gradient Layer Tests**:
   - Verify background-image contains linear-gradient
   - Verify gradient includes rgb(31, 22, 51) and rgb(48, 20, 95)
   - Verify background-size includes "200px 200px" for texture
4. **Glow Layer Tests**:
   - Verify background-image contains radial-gradient
   - Verify gradient includes rgba(173, 108, 170, 0.15)
5. **Layer Order Test**: Verify DOM order is stars → gradient → glow

### Property-Based Tests

Property tests verify universal properties across all background layers:

1. **Fixed Position Property**: All .background-layer elements have position: fixed
2. **Non-Interactive Property**: All .background-layer elements have pointer-events: none
3. **No Overflow Property**: Document width equals viewport width at various sizes

### Testing Framework

- **Framework**: Jest with jsdom for DOM testing, or Playwright for browser-based testing
- **Minimum iterations**: 100 per property test
- **Tag format**: Feature: sentry-background-match, Property N: [property description]

### Visual Regression Testing (Manual)

For visual quality requirements that cannot be programmatically tested:

- Screenshot comparison against Sentry.io reference
- Cross-browser visual verification (Chrome, Firefox, Safari)
- Mobile device visual verification
