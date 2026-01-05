# 1️⃣ AI_ENGINEERING_RULES.md

_(Standing Rules for All AI-Assisted Development)_

You can paste this directly into a repo root or feed it to your AI assistant as a required pre-read.

---

## AI Engineering Rules

**Authoritative Operating Principles**

These rules define **how all engineering, design, and architectural decisions must be made** in this codebase and future projects.

They are not optional.

---

## 1. Think in Systems, Not Files

- Never reason about a file in isolation.
- Always identify:

  - runtime context (server vs client)
  - lifecycle (build-time, request-time, runtime)
  - ownership of responsibility (data, layout, interaction)

- If the system cannot be explained in 3–5 sentences, it is not ready to build.

---

## 2. Default to the Simplest Viable Architecture

- Prefer boring, proven solutions.
- Avoid novelty unless it solves a real, documented problem.
- Complexity must earn its place.

**Innovation belongs in experience, not dependencies.**

---

## 3. Server / Client Boundaries Are Hard Lines

- Next.js App Router defaults to **Server Components**.
- Client Components must be **explicitly justified**.

### Server Components MAY:

- Load data
- Parse content
- Compose layout
- Render static UI

### Client Components MAY:

- Handle user interaction
- Use browser APIs
- Perform animations
- Observe scroll/viewport state

Never mix responsibilities.

---

## 4. Every Client Component Requires Justification

Every `'use client'` file must include a short explanation:

```ts
// Client Component because: uses IntersectionObserver for scroll-based fade
```

If the justification is weak, refactor.

---

## 5. Avoid Legacy or Hidden Behavior

- Do not use:

  - styled-jsx
  - legacy Pages Router patterns
  - CSS-in-JS that hides client-only behavior

- Prefer:

  - Tailwind CSS
  - native browser APIs
  - explicit effects and state

If behavior is implicit, it is suspect.

---

## 6. Animation Is Communication, Not Decoration

- Motion must reinforce meaning.
- No bounce, no spring, no spectacle.
- Favor:

  - slow ease-out
  - subtle opacity/transform
  - scroll-based pacing

Rules:

- One major animated moment per page (at most)
- Everything else remains quiet
- Respect `prefers-reduced-motion` without exception

---

## 7. Typography Is a Core System

- Typography is not styling — it is structure.
- Control:

  - reading width
  - line height
  - paragraph rhythm
  - silence (white space)

- Long-form text must never feel crowded or restless.

Whitespace is pacing.

---

## 8. Build for Failure States

Assume:

- missing content
- slow networks
- unexpected screen sizes

The system must:

- degrade gracefully
- avoid layout shift
- avoid runtime-only surprises

Failure should be quiet and dignified.

---

## 9. Compilation Is Non-Negotiable

Before considering work complete:

- The project must build cleanly
- No warnings ignored
- No deprecated APIs
- No “probably works” assumptions

Only verifiable correctness counts.

---

## 10. Write Code for the Next Reader

- Favor clarity over cleverness.
- Name things honestly.
- Comment **why**, not **what**.
- Reduce cognitive load wherever possible.

Good code is calm code.

---

## 11. Avoid Over-Engineering Small Projects

- Small scope demands **perfect execution**, not abstraction.
- No premature generalization.
- No speculative extensibility.

Finish small things cleanly.

---

## 12. Clarify Before Guessing

- If requirements are ambiguous, ask.
- Never invent constraints or preferences.
- Senior engineers clarify first, then build.

---

## 13. Respect the User’s Attention

Every decision must answer:

> “Does this respect the reader’s time, focus, and emotional state?”

If not, remove it.

---

## 14. Think Like a Product, Not a Demo

Even internal or portfolio projects represent:

- judgment
- taste
- restraint

Assume they will be evaluated accordingly.

---

## 15. Final Rule

> **Restraint is a feature.**

When in doubt:

- choose clarity
- choose silence
- choose simplicity

---

---

# 2️⃣ PORTFOLIO_POSTMORTEM_INSTRUCTIONS.md

_(How to Write Portfolio-Quality Case Studies)_

This is how you turn _any_ finished project — especially small ones — into a **credible portfolio asset**.

---

## Portfolio Postmortem Framework

**Narrative + Engineering Case Study**

---

## Purpose

This document exists to:

- demonstrate judgment
- explain decisions
- show restraint
- communicate how you think

It is not marketing copy.
It is not a changelog.
It is not a tutorial.

---

## How to Use These Together

- **AI_ENGINEERING_RULES.md** → governs how work is produced
- **PORTFOLIO_POSTMORTEM_INSTRUCTIONS.md** → governs how work is explained

---
