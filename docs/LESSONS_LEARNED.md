# LESSONS LEARNED

**File:** `docs/LESSONS_LEARNED.md`  
**Purpose:** Strategic decisions, bugs encountered, and solutions implemented throughout the project lifecycle

---

## Lessons Learned — CushLabs Income Planner

**Project Timeline:** Initial Development → Documentation Viewer Implementation  
**Documentation Date:** January 5, 2026

---

## 📋 Executive Summary

This document captures strategic and tactical lessons from building a bilingual income planning tool for freelancers. Focus is on **what went wrong**, **how we fixed it**, and **what we learned**.

---

## 🎯 Strategic Decisions

### ✅ What Worked

**1. Client-Side Architecture**

- **Decision:** 100% client-side calculations with no backend
- **Outcome:** Zero server costs, instant feedback, complete privacy
- **Lesson:** Not every app needs a backend. Client-side can be simpler and faster.

**2. Zustand for State Management**

- **Decision:** Use Zustand instead of Redux or Context API
- **Outcome:** Clean, simple state management with localStorage persistence
- **Lesson:** Choose the simplest tool that solves the problem.

**3. Bilingual Support from Day One**

- **Decision:** Build EN/ES translation system early
- **Outcome:** Clean i18n architecture, easy to maintain
- **Lesson:** Adding i18n later is painful. Build it in from the start.

**4. TypeScript Strict Mode**

- **Decision:** Enable TypeScript strict mode from the beginning
- **Outcome:** Caught type errors early, prevented runtime bugs
- **Lesson:** Strictness pays off in maintainability.

---

## ❌ What Went Wrong (And How We Fixed It)

### 1. Documentation Viewer Markdown Rendering Failure

**Problem:**

- Created documentation viewer at `/docs/[slug]` route
- Markdown files displayed as plain text without formatting
- No bullet points, no list indentation, no proper styling
- Multiple troubleshooting attempts with custom CSS failed
- Extended debugging session to identify root cause

**Root Cause:**

**Primary:** Missing `@tailwindcss/typography` plugin

- Used Tailwind `prose` classes without the plugin that makes them work
- Prose classes are inert without the typography plugin installed
- Like using a library without importing it

**Secondary:** Wrong tool selection

- Initially tried `remark` + `remark-html` (server-side HTML generation)
- Should have used `react-markdown` (React component rendering) from the start
- Server-side HTML requires manual CSS styling; React components work with Tailwind automatically

**Fix:**

```bash
# Install required packages
npm install react-markdown remark-gfm @tailwindcss/typography

# Add plugin to tailwind.config.js
plugins: [
  require('@tailwindcss/typography'),
],

# Use react-markdown in component
<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {content}
</ReactMarkdown>
```

**Lesson:**

1. **Always use the standard stack first** - `react-markdown` + `@tailwindcss/typography` is the proven solution
2. **Check dependencies before troubleshooting styling** - If prose classes don't work, verify the plugin is installed
3. **Verify the full stack** - Package installed, plugin configured, component imported, component used correctly

**Time Cost:** ~45 minutes of troubleshooting that could have been 5 minutes with correct initial approach.

---

### 2. Case-Sensitive File Extension Bug

**Problem:**

- Documentation files had uppercase `.MD` extension
- `lib/docs.ts` only checked for lowercase `.md` extension
- Result: All documentation files returned 404 errors
- Navigation links worked but pages didn't load

**Root Cause:**

- File extension check was case-sensitive: `filename.endsWith('.md')`
- Windows filesystem is case-insensitive, but Node.js string matching is case-sensitive

**Fix:**

```typescript
// Before: Only matched lowercase
if (filename.endsWith('.md'))
  if (filename.endsWith('.md') || filename.endsWith('.MD'))
    // After: Match both cases
    // Also fixed regex to be case-insensitive
    const slug = filename.replace(/\.md$/i, '').toLowerCase()
```

**Lesson:** Always consider case-sensitivity when working with file extensions, especially on cross-platform projects.

---

### 3. Missing Store Properties Causing Build Failures

**Problem:**

- Components referenced store properties that didn't exist
- TypeScript errors during build: `Property 'taxMode' does not exist on type 'IncomePlannerState'`
- Multiple missing properties: `taxMode`, `unbillableHoursPerWeek`, `targetAnnualNet`, `vacationWeeks`

**Root Cause:**

- Components were updated to use new features
- Store interface wasn't updated to match
- No type checking during development caught the mismatch

**Fix:**

Added missing properties to `IncomePlannerState` interface and store implementation:

```typescript
export interface IncomePlannerState {
  // ... existing properties
  taxMode: TaxMode
  unbillableHoursPerWeek: number
  targetAnnualNet: number | null
  vacationWeeks: number

  // ... corresponding setters
  setTaxMode: (mode: TaxMode) => void
  setUnbillableHoursPerWeek: (value: number) => void
  setTargetAnnualNet: (value: number | null) => void
  setVacationWeeks: (value: number) => void
}
```

**Lesson:**

1. Keep store interface in sync with component usage
2. Run `npm run build` frequently to catch type errors early
3. When adding new features, update the store interface first, then the components

---

## 🏗️ Architecture Patterns That Paid Off

### 1. Separation of Concerns

**Pattern:**

```typescript
/lib/calculations.ts  → Pure calculation functions
/lib/store.ts         → State management
/components/          → UI components
/app/                 → Routes and pages
```

**Benefit:** Easy to test, maintain, and reason about

---

### 2. Type-Safe Calculations

**Pattern:**

```typescript
export interface IncomeConfig {
  hourlyRate: number
  hoursPerWeek: number
  vacationWeeks: number
  taxRate: number
  // ...
}

export function calculateIncome(config: IncomeConfig): IncomeResult
```

**Benefit:** Compile-time guarantees, self-documenting code

---

### 3. Client-Side State Persistence

**Pattern:**

```typescript
persist(
  (set, get) => ({
    /* state */
  }),
  {
    name: 'income-planner-storage',
    storage: createJSONStorage(() => localStorage),
  }
)
```

**Benefit:** User data persists across sessions without a backend

---

## 🎓 Key Takeaways

### Technical

1. **Use standard tools for standard problems** - Don't reinvent markdown rendering
2. **Check dependencies before debugging** - Missing plugins cause mysterious failures
3. **Case-sensitivity matters** - Especially with file extensions on cross-platform projects
4. **Keep types in sync** - Store interfaces must match component usage

### Process

1. **Build frequently** - Catch type errors early with `npm run build`
2. **Test the happy path first** - Verify basic functionality before adding features
3. **Document as you go** - Lessons are easier to capture when fresh

### Architecture

1. **Client-side can be enough** - Not every app needs a backend
2. **Type safety prevents bugs** - Invest in TypeScript strict mode
3. **Separation of concerns** - Pure functions, state management, and UI should be separate

---

## 🚀 What We'd Do Differently Next Time

### 1. Install All Dependencies Upfront

**Current:** Discovered missing `@tailwindcss/typography` during implementation  
**Better:** Check documentation for required dependencies before starting  
**Why:** Avoids mid-implementation debugging sessions

---

### 2. Verify File Extension Handling

**Current:** Assumed `.md` check would work for all markdown files  
**Better:** Test with actual files or use case-insensitive checks from the start  
**Why:** Prevents 404 errors in production

---

### 3. Update Store Interface First

**Current:** Updated components, then fixed store to match  
**Better:** Update store interface and implementation, then update components  
**Why:** Type errors guide implementation instead of blocking it

---

**This document is not a celebration of what went right. It's a record of what went wrong and how we fixed it.**
