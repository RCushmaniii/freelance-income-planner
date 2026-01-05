---
title: Pre-Deploy Audit Checklist
description: Deployment and quality checklist for CushLabs Income Planner.
category: Operations
order: 10
---

# Pre-Deploy Audit Checklist - CushLabs Income Planner

**Last Updated:** December 18, 2025  
**Project:** CushLabs Income Planner  
**Version:** 1.4.0

---

## 1. Code Quality & Standards

### TypeScript

- [ ] No TypeScript errors (`npm run build`)
- [ ] All types properly defined (no `any` types)
- [ ] Strict mode enabled in `tsconfig.json`
- [ ] All imports resolve correctly

### ESLint & Prettier

- [ ] No ESLint errors (`npm run lint`)
- [ ] Code formatted with Prettier (`npm run format`)
- [ ] No console.log statements in production code
- [ ] No commented-out code blocks

### Code Organization

- [ ] Components follow SRP (Single Responsibility Principle)
- [ ] No duplicate logic (DRY principle applied)
- [ ] Proper separation of concerns (UI, state, calculations)
- [ ] Feature-based folder structure maintained

---

## 2. Functionality Testing

### Snapshot Mode

- [ ] Hourly rate input validates and clamps (50-5000)
- [ ] Hours per week validates and clamps (0-60)
- [ ] Vacation weeks validates and clamps (0-12)
- [ ] Tax rate validates and clamps (0-50%)
- [ ] Tax mode toggle works (Simple/Smart)
- [ ] Currency toggle works (MXN/USD)
- [ ] Language toggle works (EN/ES)
- [ ] Summary cards display correct calculations
- [ ] Reality Check cards render (effective hourly rate, unbillable %, runway)
- [ ] Target Annual Net goal insight shows ahead/behind + required rate when behind
- [ ] Rate Benchmark panel renders (static example data)
- [ ] Rate Benchmark "You" marker updates with inputs
- [ ] Theme toggle affects all Snapshot UI (no hardcoded colors)

### Forecast Mode

- [ ] View toggle switches between Snapshot/Forecast
- [ ] Three scenarios display with correct defaults
- [ ] Scenario inputs validate and clamp properly
- [ ] Range visualization shows correct income spread
- [ ] Monthly projection chart renders correctly
- [ ] Pessimistic/Realistic/Optimistic series all render in charts and legends
- [ ] Seasonal patterns work (Steady/Q4 Heavy/Summer Slow)
- [ ] Insights generate correctly for all scenarios
- [ ] Runway projection chart renders when monthly need + savings are set
- [ ] Goal insight compares realistic scenario net vs targetAnnualNet

### Calculations

- [ ] `calculateIncome()` returns correct values
- [ ] Daily/Weekly/Monthly/Annual calculations accurate
- [ ] Gross and net income calculated correctly
- [ ] Tax calculations applied properly
- [ ] Edge cases handled (0 hours, max values)
- [ ] No division by zero errors

### State Management

- [ ] Zustand store updates correctly
- [ ] localStorage persists user inputs
- [ ] State rehydrates on page reload
- [ ] No state mutation (immutability maintained)
- [ ] Actions validate inputs before setting

---

## 3. UI/UX

### Responsive Design

- [ ] Mobile layout works (<480px)
- [ ] Tablet layout works (480-768px)
- [ ] Desktop layout works (>768px)
- [ ] Charts responsive on all screen sizes
- [ ] No horizontal scroll on mobile
- [ ] Touch targets minimum 44x44px

### Accessibility

- [ ] Semantic HTML used throughout
- [ ] All inputs have labels
- [ ] Focus states visible
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA (7:1+)
- [ ] Screen reader friendly

### Branding

- [ ] Orange accent (#FF6A3D) used consistently
- [ ] Pastel chart colors use CSS variables (`--chart-pessimistic`, `--chart-realistic`, `--chart-optimistic`)
- [ ] CushLabs branding dot present
- [ ] Space Grotesk font for headings
- [ ] Source Serif 4 font for body
- [ ] Theme system works (system preference default; manual toggle persists)

### User Feedback

- [ ] Toast notifications work
- [ ] Loading states present where needed
- [ ] Error states handled gracefully
- [ ] Success states clear

---

## 4. Performance

### Build

- [ ] Build completes without errors
- [ ] Bundle size reasonable (<200KB for main page)
- [ ] No unused dependencies
- [ ] Tree shaking working

### Runtime

- [ ] No memory leaks
- [ ] Charts render smoothly
- [ ] Input changes debounced appropriately
- [ ] No unnecessary re-renders
- [ ] Calculations memoized where appropriate

### Assets

- [ ] Fonts loaded efficiently
- [ ] No unused CSS
- [ ] Tailwind purged properly

---

## 5. Security & Privacy

### Client-Side

- [ ] No sensitive data in localStorage
- [ ] No API keys in client code
- [ ] FX calls only go to internal `/api/fx` (no direct calls from client to third-party)
- [ ] No console.log with user data
- [ ] XSS prevention in place

### Data Handling

- [ ] All calculations client-side only
- [ ] No data sent to external servers
- [ ] localStorage data non-sensitive
- [ ] No tracking without consent

---

## 6. Documentation

### Code Documentation

- [ ] Complex functions have JSDoc comments
- [ ] Calculation formulas documented
- [ ] Type interfaces documented
- [ ] Store structure documented

### Project Documentation

- [ ] README.md up to date
- [ ] LICENSE file present
- [ ] `docs/PRD.md` reflects current state
- [ ] `docs/ROADMAP.md` reflects current state
- [ ] `docs/BRAND.md` reflects current state
- [ ] `docs/DESIGN.md` reflects current state

---

## 7. Localization (Phase 4)

### English (EN)

- [ ] All UI text translated
- [ ] Currency formatting correct
- [ ] Number formatting correct
- [ ] Date formatting correct (if applicable)

### Spanish (ES)

- [ ] All UI text translated
- [ ] Currency formatting correct (MXN)
- [ ] Number formatting correct
- [ ] Culturally appropriate phrasing

### i18n System

- [ ] Translation keys organized
- [ ] No hardcoded strings in components
- [ ] Language switching works
- [ ] Fallback to English works

---

## 8. Browser Compatibility

### Modern Browsers

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Features

- [ ] localStorage supported
- [ ] Flexbox/Grid layouts work
- [ ] CSS custom properties work
- [ ] ES6+ features transpiled if needed

---

## 9. Error Handling

### Calculation Errors

- [ ] Invalid inputs handled gracefully
- [ ] Division by zero prevented
- [ ] Overflow/underflow handled
- [ ] Error messages user-friendly

### State Errors

- [ ] localStorage failures handled
- [ ] State corruption prevented
- [ ] Fallback to defaults works

### UI Errors

- [ ] Chart rendering errors caught
- [ ] Component errors don't crash app
- [ ] Error boundaries in place

---

## 10. Git & Deployment

### Version Control

- [ ] All changes committed
- [ ] Commit messages descriptive
- [ ] No sensitive files in repo
- [ ] .gitignore properly configured

### GitHub

- [ ] Pushed to main branch
- [ ] README displays correctly
- [ ] LICENSE visible
- [ ] Repository description set

### Deployment Ready

- [ ] Environment variables documented
- [ ] `EXCHANGE_RATE_API_KEY` set in Vercel Environment Variables (Production; optionally Preview/Development)
- [ ] Build command works
- [ ] Start command works
- [ ] Port configuration correct

---

## 11. Final Checks

### Pre-Deploy

- [ ] Run full test suite (when implemented)
- [ ] Manual smoke test all features
- [ ] Check on multiple devices
- [ ] Verify analytics setup (if applicable)

### Post-Deploy

- [ ] Verify production build works
- [ ] Check all routes accessible
- [ ] Test on production domain
- [ ] Monitor for errors

---

## Known Issues / Technical Debt

- [ ] Rate Benchmark is static example data (planned future enhancement)
- [ ] No unit tests yet (future enhancement)
- [ ] No E2E tests yet (future enhancement)
- [ ] Chart could use more customization options
- [ ] No export to PDF/CSV yet (future feature)

---

## Sign-Off

**Developer:** Robert Cushman  
**Date:** **\*\***\_**\*\***  
**Status:** ⬜ Ready for Deploy | ⬜ Needs Work

**Notes:**

---

---

---

---

## Quick Commands

```bash
# Build check
npm run build

# Lint check
npm run lint

# Format code
npm run format

# Start dev server
npm run dev

# Start production server (after a successful build)
npm start

# Vercel deploy
vercel --prod
```

---

**Remember:** This is a living document. Update it as the project evolves!
