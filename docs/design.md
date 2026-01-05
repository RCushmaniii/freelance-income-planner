---
title: Design System & UI Spec
description: Visual system and UI guidelines for CushLabs Income Planner.
category: Design
order: 2
---

# CushLabs.ai — Design & Technical Specification

A comprehensive design document covering branding, visual system, language implementation, and JavaScript functionality.

---

## 1. Brand Identity

### Brand Name

**CushLabs.ai**

### Brand Positioning

AI consulting and modern software development studio targeting SMBs. Positioned as experienced, technically sophisticated, and approachable — expertise without intimidation.

### Brand Voice

- Professional but personable (first-person "I" rather than corporate "we")
- Technical depth communicated accessibly
- Confident without arrogance
- Modern and forward-looking

---

## 2. Color Palette

### Primary Colors

| Name            | Hex       | RGB           | Usage                     |
| --------------- | --------- | ------------- | ------------------------- |
| Black           | `#000000` | 0, 0, 0       | Primary background        |
| White           | `#FFFFFF` | 255, 255, 255 | Primary text, headlines   |
| Orange (Accent) | `#FF6A3D` | 255, 106, 61  | CTAs, highlights, accents |

### Chart Palette (Forecast + Range)

The chart series colors are implemented as CSS variables in `app/globals.css` so they stay consistent across light/dark mode:

| Token                 | Purpose               |
| --------------------- | --------------------- |
| `--chart-pessimistic` | Conservative scenario |
| `--chart-realistic`   | Most-likely scenario  |
| `--chart-optimistic`  | Best-case scenario    |

### Secondary / UI Colors

| Name     | Hex       | Usage                       |
| -------- | --------- | --------------------------- |
| Gray 900 | `#0A0A0A` | Subtle background variation |
| Gray 800 | `#141414` | Card backgrounds            |
| Gray 700 | `#1A1A1A` | Borders, dividers           |
| Gray 600 | `#2A2A2A` | Inactive borders            |
| Gray 400 | `#666666` | Tertiary text               |
| Gray 300 | `#888888` | Secondary text              |
| Gray 200 | `#AAAAAA` | Body text                   |

### Gradient & Glow Effects

| Effect             | Value                                                                   |
| ------------------ | ----------------------------------------------------------------------- |
| Orange Glow        | `rgba(255, 106, 61, 0.15)`                                              |
| Orange Soft        | `rgba(255, 106, 61, 0.08)`                                              |
| Spotlight Gradient | `radial-gradient(circle, var(--color-orange-glow) 0%, transparent 70%)` |
| Hero Pulse         | `radial-gradient(circle, var(--color-orange-glow) 0%, transparent 60%)` |

---

## 3. Typography

### Font Stack

| Role                | Font Family    | Weights       | Source       |
| ------------------- | -------------- | ------------- | ------------ |
| Display / Headlines | Space Grotesk  | 500, 600, 700 | Google Fonts |
| Body / Prose        | Source Serif 4 | 300, 400, 500 | Google Fonts |

### Type Scale (Fluid)

All sizes use `clamp()` for smooth scaling between mobile (320px) and desktop (1440px+):

| Token     | Mobile   | Desktop  | CSS Variable  |
| --------- | -------- | -------- | ------------- |
| text-xs   | 0.75rem  | 0.875rem | `--text-xs`   |
| text-sm   | 0.875rem | 1rem     | `--text-sm`   |
| text-base | 1rem     | 1.125rem | `--text-base` |
| text-lg   | 1.125rem | 1.375rem | `--text-lg`   |
| text-xl   | 1.25rem  | 1.625rem | `--text-xl`   |
| text-2xl  | 1.5rem   | 2.25rem  | `--text-2xl`  |
| text-3xl  | 2rem     | 3.5rem   | `--text-3xl`  |
| text-4xl  | 2.5rem   | 5rem     | `--text-4xl`  |
| text-5xl  | 3rem     | 7rem     | `--text-5xl`  |

### Typography Settings

| Element        | Font           | Weight | Tracking | Line Height |
| -------------- | -------------- | ------ | -------- | ----------- |
| Hero Headline  | Space Grotesk  | 700    | -0.02em  | 1.05        |
| Section Titles | Space Grotesk  | 700    | -0.01em  | 1.2         |
| Section Labels | Space Grotesk  | 600    | 0.25em   | 1.0         |
| Body Text      | Source Serif 4 | 400    | normal   | 1.7         |
| About Text     | Source Serif 4 | 300    | normal   | 1.8         |

---

## 4. Layout System

### Container

| Property      | Value                  |
| ------------- | ---------------------- |
| Max Width     | 1440px                 |
| Content Width | min(90%, 1200px)       |
| Padding       | Fluid via `--space-md` |

### Spacing Scale (Fluid)

| Token     | Mobile  | Desktop | CSS Variable  |
| --------- | ------- | ------- | ------------- |
| space-xs  | 0.5rem  | 0.75rem | `--space-xs`  |
| space-sm  | 0.75rem | 1.25rem | `--space-sm`  |
| space-md  | 1rem    | 1.75rem | `--space-md`  |
| space-lg  | 1.5rem  | 3rem    | `--space-lg`  |
| space-xl  | 2rem    | 4.5rem  | `--space-xl`  |
| space-2xl | 3rem    | 7rem    | `--space-2xl` |
| space-3xl | 4rem    | 10rem   | `--space-3xl` |

### Grid System

**Features Grid (2×2):**

- Fixed 2-column layout: `grid-template-columns: repeat(2, 1fr)`
- Max width: 900px
- Gap: `--space-lg`
- Breakpoint: Single column below 600px

---

## 5. Current App Implementation Notes

### Language (EN/ES)

- UI strings are sourced from `lib/i18n/translations.ts`.
- Components use `useTranslation(language)`.
- Language is persisted in the Zustand store (`lib/store.ts`).

### Theme (Light/Dark)

- Theme tokens are implemented via CSS variables in `app/globals.css`.
- Tailwind color tokens resolve to CSS variables (`tailwind.config.js`).
- Theme defaults to system preference when no persisted theme exists, and persists via Zustand.

---

## 6. JavaScript / Interaction Notes

- This project is implemented as a Next.js (App Router) application.
- Client-side interactivity is handled within React components.

### Notes

- Any animation/interaction patterns should be implemented as React components.
- Prefer small, composable UI pieces and keep business logic outside UI components.

---

## 7. Animation Specifications

### Entry Animations

| Element          | Animation   | Duration | Delay  | Easing        |
| ---------------- | ----------- | -------- | ------ | ------------- |
| Brand            | fadeSlideUp | 800ms    | 200ms  | ease-out-expo |
| Headline         | fadeSlideUp | 800ms    | 400ms  | ease-out-expo |
| Subheadline      | fadeSlideUp | 800ms    | 600ms  | ease-out-expo |
| Countdown        | fadeSlideUp | 800ms    | 800ms  | ease-out-expo |
| Lang Switcher    | fadeSlideUp | 800ms    | 1000ms | ease-out-expo |
| Scroll Indicator | fadeSlideUp | 800ms    | 1200ms | ease-out-expo |

### Scroll Animations

| Element          | Trigger     | Animation                                    |
| ---------------- | ----------- | -------------------------------------------- |
| .fade-in         | 10% visible | Opacity 0→1, translateY 40px→0               |
| .fade-in-stagger | 10% visible | Same + staggered delays (0, 100, 200, 300ms) |

### Ambient Animations

| Effect          | Type            | Duration | Iteration |
| --------------- | --------------- | -------- | --------- |
| Hero Glow Pulse | scale + opacity | 8s       | infinite  |
| Brand Dot Pulse | box-shadow      | 2s       | infinite  |
| Colon Blink     | opacity         | 1s       | infinite  |
| Scroll Line     | translateY      | 2s       | infinite  |

### Easing Functions

| Name           | Value                           | Usage             |
| -------------- | ------------------------------- | ----------------- |
| ease-out-expo  | `cubic-bezier(0.16, 1, 0.3, 1)` | Entry animations  |
| ease-out-quart | `cubic-bezier(0.25, 1, 0.5, 1)` | Hover transitions |

---

## 8. Responsive Breakpoints

| Breakpoint   | Width   | Changes                                 |
| ------------ | ------- | --------------------------------------- |
| Mobile       | < 480px | Tighter countdown spacing               |
| Small Tablet | < 600px | Features grid → single column           |
| Tablet       | < 768px | Hide scroll indicator, adjust countdown |
| Desktop      | 768px+  | Full layout, all effects enabled        |

---

## 9. Accessibility Compliance

### WCAG 2.1 AA Checklist

| Criterion                | Status | Implementation                                |
| ------------------------ | ------ | --------------------------------------------- |
| 1.1.1 Non-text Content   | ✅     | Alt text on images, aria-hidden on decorative |
| 1.4.3 Contrast (Minimum) | ✅     | 7:1+ for body text on dark background         |
| 1.4.10 Reflow            | ✅     | Responsive down to 320px                      |
| 2.1.1 Keyboard           | ✅     | All interactive elements focusable            |
| 2.3.1 Three Flashes      | ✅     | No flashing content                           |
| 2.4.1 Bypass Blocks      | ✅     | Semantic sections                             |
| 2.5.5 Target Size        | ✅     | Buttons meet 44×44px minimum                  |
| 3.1.1 Language of Page   | ✅     | `<html lang>` attribute                       |

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Technical SEO Implementation (Current)

This app relies on Next.js metadata rather than manual `<meta>` tags inside components.

### Metadata sources

- `app/layout.tsx` exports `metadata` (site-wide defaults).
- `app/income-planner/page.tsx` exports page-level `metadata` for the tool.
- `app/docs/[slug]/page.tsx` uses `generateMetadata()` from the markdown frontmatter.

### Notes

- Open Graph / Twitter metadata is currently minimal; if we want richer share cards, add `openGraph` + `twitter` fields in `app/layout.tsx` and use a real production URL.
- The docs system already supports per-doc titles and descriptions via frontmatter.

---

## 11. Documentation Files

- `README.md` (root) — Setup and overview
- `PRD.md` (root) — Product requirements
- `docs/BRAND.md` — Brand strategy
- `docs/DESIGN.md` — Design system
- `docs/ROADMAP.md` — Roadmap
- `docs/PREDEPLOY_AUDIT.md` — Deployment checklist

---

## 12. Version History

| Version | Date    | Changes                                                                                  |
| ------- | ------- | ---------------------------------------------------------------------------------------- |
| 1.0.0   | 2025-01 | Initial release                                                                          |
| 1.1.0   | 2025-01 | Added bilingual support (EN/ES)                                                          |
| 1.1.1   | 2025-01 | Browser language auto-detection                                                          |
| 1.2.0   | 2025-01 | Technical SEO overhaul: meta tags, Open Graph, Twitter Cards, hreflang, structured data  |
| 1.3.0   | 2025-01 | Solo brand copy update, personal intro section with Steve Jobs quote, enhanced hero glow |
| 1.4.0   | 2025-12 | Pastel chart palette, Lucide icons, goal progress insights, FX proxy route               |

---

_Document maintained by CushLabs.ai_
