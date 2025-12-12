# CushLabs Income Planner - Product Requirements Document

**Version:** 1.0  
**Last Updated:** December 11, 2025  
**Status:** ✅ Phase 4 Complete (Production Ready)  
**Author:** Robert Cushman, CushLabs.ai

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Technical Specifications](#2-technical-specifications)
3. [Features & Functionality](#3-features--functionality)
4. [Implementation Status](#4-implementation-status)
5. [Architecture & Stack](#5-architecture--stack)
6. [Security & Privacy](#6-security--privacy)
7. [Performance & Optimization](#7-performance--optimization)
8. [Future Enhancements](#8-future-enhancements)

---

## 1. Product Overview

### 1.1 Vision

A beautiful, bilingual income planning tool that shows how rate, hours, taxes, and vacation affect yearly earnings — built with world-class UX and CushLabs.ai branding as a flagship portfolio piece.

### 1.2 Product Type

- **Public, free, calculator-style web app**
- No login, no user accounts
- Hosted at `/income-planner`
- Client-side only (no backend)

### 1.3 Target Users

- **Freelancers** and solo professionals (teachers, consultants, developers, coaches)
- **SMB owners** thinking in terms of time-based revenue
- **Bilingual users** in Mexico / U.S. working in MXN and/or USD

### 1.4 Core Use Cases

1. **Forward Planning**  
   "If I charge X per hour and work Y hours per week, how much will I earn per month/year?"

2. **What-If Scenarios**  
   "What happens if I raise my rate, work fewer hours, or reduce vacation?"

3. **Target-Driven Planning**  
   "If I want to earn X per year after tax, how many hours per week or what hourly rate do I need?"

4. **Bilingual Money Clarity**  
   "I want to see this clearly in MXN and USD, in English and Spanish."

### 1.5 Business Role

- **Portfolio piece:** Demonstrates CushLabs' ability to build clean, performant, interactive tools
- **Trust builder:** Shows Robert as a practical, numbers-focused builder
- **Future platform:** Base for potential niche planners (e.g., "Freelance Teacher Income Planner")

---

## 2. Technical Specifications

### 2.1 Calculation Formulas

```typescript
// Core calculations
billableWeeks = 52 - vacationWeeks (min: 1)
annualGross = hourlyRate × hoursPerWeek × billableWeeks
annualNet = annualGross × (1 - taxRate/100)
monthlyNet = annualNet / 12
weeklyNet = annualNet / 52
dailyNet = weeklyNet / 5
```

### 2.2 Validation Ranges

| Input          | Min | Max  | Default          |
| -------------- | --- | ---- | ---------------- |
| Hourly Rate    | 50  | 5000 | 500 MXN / 25 USD |
| Hours/Week     | 0   | 60   | 40               |
| Vacation Weeks | 0   | 12   | 2                |
| Tax Rate       | 0%  | 50%  | 25%              |

### 2.3 Default Configuration

- **Currency:** MXN (user-selectable)
- **Language:** EN (user-selectable)
- **Hourly Rate:** 500 MXN
- **Hours/Week:** 40
- **Vacation Weeks:** 2
- **Tax Rate:** 25%

---

## 3. Features & Functionality

### 3.1 Snapshot Mode (Phase 3 ✅)

**Single-Scenario Calculator**

- Real-time income calculations
- Input validation with clamping
- Currency toggle (MXN/USD)
- Language toggle (EN/ES)
- Summary cards (Daily/Weekly/Monthly/Annual)
- Toast notifications for feedback

**Components:**

- `InputPanel.tsx` - User input controls
- `SummaryCards.tsx` - Income display
- `Hero.tsx` - Page header
- `ChartPlaceholder.tsx` - Future chart area

### 3.2 Forecast Mode (Phase 3B ✅)

**Three-Scenario Planning**

- Pessimistic, Realistic, Optimistic scenarios
- Independent inputs per scenario
- Shared tax rate across scenarios
- Visual income range display
- Auto-generated insights

**Components:**

- `ViewToggle.tsx` - Mode switcher
- `ScenarioBuilder.tsx` - 3-column input grid
- `RangeVisualization.tsx` - Income spread bar
- `ForecastInsights.tsx` - Smart recommendations

**Insights Generated:**

1. Realistic annual income projection
2. Income range with spread multiplier
3. Capacity warnings (>45 hrs/week)
4. Pessimistic floor (worst-case guarantee)
5. Rate increase impact analysis

### 3.3 Monthly Projections (Phase 3C ✅)

**Interactive Charts**

- 12-month income projection
- Three scenario lines (color-coded)
- Seasonal pattern modeling
- Responsive design

**Seasonal Patterns:**

- **Steady:** Consistent year-round income
- **Q4 Heavy:** Higher Oct-Dec (B2B consultants)
- **Summer Slow:** Reduced Jun-Aug (vacation season)

**Component:**

- `MonthlyProjectionChart.tsx` - Recharts integration

### 3.4 Localization (Phase 4 ✅)

**Full EN/ES Translation**

- All UI text localized
- Language-aware currency formatting
- Toast messages in both languages
- Instant switching without reload

**Implementation:**

- `lib/i18n/translations.ts` - Translation dictionary
- `useTranslation()` hook in all components
- Persisted in localStorage

### 3.5 State Persistence (Phase 4 ✅)

**localStorage Integration**

- User inputs saved automatically
- Scenario configurations persisted
- Language/currency preferences stored
- State restored on page reload

**Persisted Data:**

- Hourly rate, hours/week, vacation weeks, tax rate
- All three scenario configurations
- View mode (Snapshot/Forecast)
- Currency preference (MXN/USD)
- Language preference (EN/ES)

---

## 4. Implementation Status

### ✅ Phase 1: Architecture & Setup

- [x] Next.js 14 with App Router
- [x] TypeScript configuration
- [x] Tailwind CSS with CushLabs tokens
- [x] Global error boundary
- [x] Toast notification system (react-hot-toast)

### ✅ Phase 2: Layout & Design

- [x] CushLabs-branded homepage
- [x] Header with navigation
- [x] Hero section
- [x] Responsive layout (mobile-first)
- [x] Dark theme with orange accent

### ✅ Phase 3: Calculator Logic

- [x] Pure calculation functions (`lib/calculations.ts`)
- [x] Input validation and clamping
- [x] Zustand state management (`lib/store.ts`)
- [x] Real-time updates
- [x] Error handling

### ✅ Phase 3B: Forecasting

- [x] View toggle (Snapshot/Forecast)
- [x] Three-scenario builder
- [x] Range visualization
- [x] Auto-generated insights

### ✅ Phase 3C: Advanced Charts

- [x] Recharts integration
- [x] Monthly projection chart
- [x] Seasonal pattern modeling
- [x] Interactive tooltips

### ✅ Phase 4: Localization & Persistence

- [x] Full EN/ES translation system
- [x] localStorage persistence (Zustand middleware)
- [x] Currency formatting
- [x] Language switching
- [x] State rehydration

### ⬜ Phase 5: Analytics & Monitoring (Future)

- [ ] Lightweight analytics (Plausible/PostHog)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Lighthouse optimization

---

## 5. Architecture & Stack

### 5.1 Technology Stack

**Frontend Framework:**

- Next.js 14.2+ (App Router)
- React 18.3+
- TypeScript 5.5+

**Styling:**

- Tailwind CSS 3.4+
- Custom design tokens
- Responsive utilities

**State Management:**

- Zustand 4.4+ (global state)
- Zustand persist middleware (localStorage)
- React hooks (local state)

**Charts:**

- Recharts 2.10+ (lightweight, React-friendly)

**Utilities:**

- react-hot-toast 2.4+ (notifications)

### 5.2 Project Structure

```
ai-income-generator/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── providers.tsx           # Global providers
│   └── income-planner/
│       └── page.tsx            # Income Planner page
├── components/
│   ├── Header.tsx              # Global header
│   ├── ErrorBoundary.tsx       # Error handling
│   └── income-planner/
│       ├── Hero.tsx            # Page hero
│       ├── ViewToggle.tsx      # Mode switcher
│       ├── SnapshotView.tsx    # Snapshot container
│       ├── ForecastView.tsx    # Forecast container
│       ├── InputPanel.tsx      # Input controls
│       ├── SummaryCards.tsx    # Income display
│       ├── ScenarioBuilder.tsx # 3-scenario inputs
│       ├── RangeVisualization.tsx # Income range bar
│       ├── MonthlyProjectionChart.tsx # Chart component
│       └── ForecastInsights.tsx # Insights panel
├── lib/
│   ├── calculations.ts         # Pure calculation functions
│   ├── chartData.ts            # Chart data generators
│   ├── store.ts                # Zustand store
│   └── i18n/
│       └── translations.ts     # EN/ES translations
├── docs/
│   ├── brand.md                # Brand guidelines
│   ├── design.md               # Design system
│   └── future-features.md      # Roadmap
├── .windsurf/rules/            # Coding standards
├── LICENSE                     # Educational license
├── PREDEPLOY_AUDIT.md          # Deployment checklist
└── PRD.md                      # This document
```

### 5.3 Code Quality Standards

**Principles Applied:**

- **SRP:** Single Responsibility Principle
- **DRY:** Don't Repeat Yourself
- **SoC:** Separation of Concerns
- **Immutability:** No direct state mutation
- **Error Handling:** Graceful failures

**File Size Limits:**

- Components: <200 lines
- Utilities: <200 lines
- All files properly componentized

---

## 6. Security & Privacy

### 6.1 Data Handling

**No Backend:**

- All calculations client-side
- No data sent to external servers
- No user accounts or authentication

**localStorage Only:**

- Non-sensitive numeric inputs
- User preferences (language, currency)
- No personal identifiable information (PII)

### 6.2 Input Validation

**All inputs validated:**

- Type checking (numbers only)
- Range clamping (within safe bounds)
- NaN prevention
- Division by zero protection

**XSS Prevention:**

- No HTML rendering from user input
- All inputs are numeric
- No free-form text fields

### 6.3 Privacy Compliance

**No tracking in V1:**

- No analytics (yet)
- No cookies
- No external requests
- localStorage only for app state

---

## 7. Performance & Optimization

### 7.1 Build Stats

```
Route (app)                    Size     First Load JS
┌ ○ /                          958 B    103 kB
├ ○ /_not-found               876 B    88.4 kB
└ ○ /income-planner           105 kB   204 kB
+ First Load JS shared         87.5 kB
```

### 7.2 Optimization Techniques

**Code Splitting:**

- Route-based splitting
- Dynamic imports for charts
- Lazy-loaded components

**Bundle Optimization:**

- Tree shaking enabled
- Minimal dependencies
- No unused code

**Runtime Performance:**

- Memoized calculations
- Debounced inputs
- Efficient re-renders

### 7.3 Target Metrics

| Metric         | Target | Status |
| -------------- | ------ | ------ |
| Performance    | ≥90    | ✅     |
| Accessibility  | ≥90    | ✅     |
| Best Practices | ≥90    | ✅     |
| SEO            | ≥90    | ✅     |

---

## 8. Future Enhancements

### 8.1 Phase 5: Analytics & Monitoring

**Analytics Integration:**

- Plausible or PostHog
- Anonymous event tracking
- Privacy-friendly metrics

**Error Monitoring:**

- Sentry integration
- Runtime error tracking
- Performance monitoring

### 8.2 Additional Features

**Export Capabilities:**

- PDF report generation
- CSV data export
- Shareable URLs with query params

**Advanced Calculations:**

- Multi-currency conversion (live rates)
- Tax bracket calculations
- Retirement savings projections

**AI Enhancements:**

- Personalized recommendations
- Industry benchmarking
- Predictive insights

### 8.3 Platform Expansion

**Niche Calculators:**

- Teacher Income Planner
- Developer Rate Calculator
- Consultant Revenue Projector

**Integration Options:**

- Embed widget for other sites
- API for programmatic access
- Mobile app (React Native)

---

## Appendix A: Toast Messages

### English (EN)

| Event           | Message                                                     |
| --------------- | ----------------------------------------------------------- |
| Currency Change | "Currency set to {currency}"                                |
| Language Change | "Language set to English"                                   |
| Validation      | "We adjusted your values to stay within a realistic range." |
| State Loaded    | "Loaded your last plan from this browser."                  |
| Error           | "Something went wrong. Please refresh."                     |

### Spanish (ES)

| Event           | Message                                                        |
| --------------- | -------------------------------------------------------------- |
| Currency Change | "Moneda establecida en {currency}"                             |
| Language Change | "Idioma cambiado a español"                                    |
| Validation      | "Ajustamos tus valores para mantenerlos en un rango realista." |
| State Loaded    | "Cargamos tu último plan de este navegador."                   |
| Error           | "Algo salió mal. Por favor, recarga la página."                |

---

## Appendix B: Deployment Checklist

See `PREDEPLOY_AUDIT.md` for comprehensive deployment checklist covering:

- Code quality & standards
- Functionality testing
- UI/UX verification
- Performance metrics
- Security review
- Browser compatibility
- Error handling
- Git & deployment readiness

---

## Document History

| Version | Date         | Changes                    | Author         |
| ------- | ------------ | -------------------------- | -------------- |
| 1.0     | Dec 11, 2025 | Initial comprehensive PRD  | Robert Cushman |
| 0.9     | Dec 10, 2025 | Phase 4 completion update  | Robert Cushman |
| 0.8     | Dec 10, 2025 | Phase 3C charts added      | Robert Cushman |
| 0.7     | Dec 10, 2025 | Phase 3B forecasting added | Robert Cushman |
| 0.5     | Dec 9, 2025  | Phase 3 calculator logic   | Robert Cushman |
| 0.1     | Dec 8, 2025  | Initial draft              | Robert Cushman |

---

**For questions or clarifications, contact:**  
Robert Cushman  
CushLabs.ai  
https://cushlabs.ai
