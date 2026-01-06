---
trigger: always_on
---

# 🧠 CushLabs Income Planner — Engineering Rules (v1)

## 1. Manifesto

- **Philosophy:** Boring is good. Explicit > clever. Secure by default.
- **Scope discipline (v1):**
  - No billing
  - No AI features/calls
  - No background jobs
  - No user accounts / authentication
  - No database
- **Primary goal:** A fast, bilingual (EN/ES), client-first income planning tool with excellent UX.

## 2. Tech Stack (This Repo)

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS + CSS variables for theme tokens
- **State:** Zustand (persist middleware) for minimal global client state
- **Charts:** Recharts
- **Notifications:** react-hot-toast
- **i18n:** Internal dictionary-based translations (EN/ES)

## 3. Architecture Principles

- **SRP / SoC / DRY:** Keep UI, state, and calculation logic separated.
- **Pure calculations:** Business math belongs in pure utility functions (no React, no DOM).
- **Client components are leaves:** Don’t let UI components become “god components” with mixed responsibilities.

## 4. State Management Rules

- **Default:** local component state (`useState`, `useReducer`) for ephemeral UI.
- **Zustand is allowed for:**
  - Theme
  - Language
  - Currency
  - Persisted planner inputs and view mode
- **Do not introduce global state** for derived values that can be calculated from existing inputs.
- **Do not store fetched server data in Zustand.**

### Server state (TanStack Query)

- Only introduce TanStack Query if the app gains meaningful server state (accounts, saved plans, external data feeds, etc.).
- If introduced:
  - Keep queries/mutations in a dedicated data layer
  - Keep cached server data out of Zustand

## 5. Server-Side Logic / Secrets

- **Rule:** Secrets stay server-side.
- The only acceptable server footprint in v1 is **minimal** support for secrets, e.g.:
  - Optional FX route: /api/fx
  - Env var: `EXCHANGE_RATE_API_KEY` must **never** be `NEXT_PUBLIC_*`
- Do not move app-critical logic to the server unless there is a security reason.

## 6. Theming & Design Tokens

- **Theme tokens must be CSS-variable driven** (Tailwind colors should resolve to CSS vars).
- Theme switching must be:
  - **Global**
  - **Persisted**
  - **Flicker-free on initial paint** (apply theme before paint)
- Avoid hardcoded hex colors in components when a token exists.

## 7. Localization (EN/ES)

- All user-facing strings must be translatable.
- Prefer i18n keys over hardcoded strings.
- Ensure currency formatting respects locale and currency selection.
- UI labels and docs should remain consistent with in-app translations.

## 8. Error Handling (Always Explicit)

- Assume operations can fail.
- Use explicit failure paths and actionable messages.
- Avoid silent failures.
- Optional FX fetch:
  - Must fail gracefully and fall back to a safe default UX (no broken UI).

## 9. Accessibility & Responsiveness

- Mobile-first layouts.
- Reasonable tap targets, focus styles, semantic HTML.
- Avoid layout that breaks at small widths.

## 10. Code Quality Rules

- No `any`, no `@ts-ignore`.
- Prefer small focused functions and components.
- Avoid deep cross-module imports that create cycles.
- Keep files readable; refactor rather than letting components sprawl.

## 11. Anti-Patterns (Refusal Criteria)

Refuse/avoid:

- Adding complex backend systems (auth/db) in v1
- Adding AI features or external AI calls in v1
- Adding TanStack Query “just because” (only when server state exists)
- Duplicating logic across components instead of extracting utilities
- Hardcoding design tokens when CSS vars exist

---

### Final Instruction

If a request conflicts with **scope discipline**, **security**, or **simplicity**:
pause, warn, and propose the smallest compliant alternative.
