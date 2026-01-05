# Pre-Deployment Checklist

**Narrative & Portfolio-Grade Web Projects**

This checklist defines the **minimum professional standard** required before deploying a project to production.

It is intentionally opinionated, restrained, and scoped for:

- Next.js App Router projects
- Narrative / content-driven experiences
- Portfolio-quality work
- Vercel deployment

This is not enterprise bloat.
This is correctness, clarity, and dignity.

---

## ✅ How to Use This Checklist

1. **Run the automated checks** (command line)
2. **Perform the manual checks** (5–10 minutes total)
3. **Resolve all ❌ or ⚠️ items intentionally**
   - Either fix them
   - Or explicitly document why they are acceptable
4. Only deploy when:
   - All critical checks pass
   - Any omissions are _intentional_, not accidental

> Rule:  
> **If something is skipped, it must be skipped on purpose.**

---

## 🔨 1. Build & Compilation (Non-Negotiable)

### Automated

- [ ] `next build` passes cleanly

  - No build errors
  - No Server/Client boundary violations
  - No deprecated API warnings

- [ ] TypeScript validation passes
  ```bash
  tsc --noEmit
  ```
