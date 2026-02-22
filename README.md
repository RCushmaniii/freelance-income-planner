---
title: Freelance Income Planner
description: A bilingual income planning tool for freelancers and consultants.
order: 0
---

# Freelance Income Planner

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-4.4-orange)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

> Privacy-first bilingual income calculator for freelancers and consultants. Bill in one currency, spend in another, plan for feast or famine.

**[Live Demo](https://freelance-income-planner.vercel.app/)** | Built by [CushLabs.ai](https://cushlabs.ai)

> **Note:** Currently a deterministic calculator using pure math — no AI features yet. AI enhancements (market rate recommendations, natural language queries) are planned for Phase 2.

## Overview

Freelance Income Planner helps freelancers and consultants answer the question every self-employed person struggles with: "What's my actual take-home pay?" It goes beyond rate-times-hours arithmetic by factoring in taxes (simple or progressive brackets), business expenses, personal cost of living, vacation weeks, and multi-currency billing.

The app runs entirely in the browser. No accounts, no server-side data storage, no analytics on financial inputs. State persists in localStorage so users can return to saved scenarios without re-entering data. The full interface is available in English and Spanish with instant switching.

Two views serve different planning needs. **Snapshot mode** gives an immediate income breakdown with transparent calculation steps. **Forecast mode** enables three-scenario comparison (pessimistic, realistic, optimistic) with monthly projection charts, seasonal multipliers, and runway analysis.

## Screenshots

### Snapshot View

![Snapshot calculator showing income breakdown](.github/screenshots/app-screen-shot.jpg)

### Forecast View

![Forecast view with three-scenario planning and charts](.github/screenshots/forecast-view.jpg)

## The Challenge

Freelancers face compounding uncertainty that salaried workers don't:

- **Variable income:** Hours shift week to week. Clients churn. Seasonal demand creates feast-or-famine cycles that simple annual projections don't capture.
- **Multi-currency complexity:** Digital nomads billing in USD while spending in MXN or EUR need every calculation — gross, tax, expenses, net — to flow through correct currency conversion at each step.
- **Tax opacity:** Self-employment taxes are calculated on taxable income (gross minus business expenses), not raw gross. Most online calculators get this wrong, overstating tax burden and understating take-home pay.
- **Privacy risk:** Entering detailed financial data into third-party tools means trusting someone else with your most sensitive numbers.

## The Solution

**Privacy-first architecture.** All computation runs client-side in pure TypeScript. The only external call is an optional exchange rate fetch. No user accounts, no telemetry on financial data.

**Accurate tax modeling.** Tax is calculated on taxable income (gross minus business expenses), matching standard self-employment treatment. Progressive bracket mode supports jurisdiction-specific rates for USD, MXN, and EUR. The engine reports deficits honestly rather than clamping negative income to zero.

**Dual-currency model.** Users set a billing currency (what clients pay) and a spending currency (where they live). All 9 combinations of USD/MXN/EUR are supported with bidirectional conversion. The exchange rate is user-controlled with an optional live FX fetch.

**Three-scenario forecasting.** Forecast mode runs independent calculations for pessimistic, realistic, and optimistic scenarios with adjustable rates, hours, and vacation weeks. Monthly projection charts apply seasonal multipliers. Runway analysis shows how long savings last under each scenario.

## Technical Highlights

- **Pure calculation engine** — All income math lives in `lib/calculations.ts` as side-effect-free functions, validated against 151 edge cases covering tax logic, division safety, currency roundtrips, and deficit scenarios.
- **Single source of truth** — Display components consume engine results rather than recalculating independently, eliminating inconsistencies between summary cards, breakdowns, and charts.
- **Server/client discipline** — Strict Next.js 14 App Router patterns. `'use client'` only where hooks or browser APIs are required. Markdown docs parse server-side, render client-side.
- **Defensive numerics** — Division-by-zero guards, NaN/Infinity propagation checks, and input validation clamping across all calculation and currency conversion paths.
- **Bidirectional currency conversion** — Exchange rate interpretation is context-aware (billing-to-spending multiplies, spending-to-billing divides) with fallback heuristics for edge cases.
- **Zustand with selective subscriptions** — Granular store access prevents unnecessary re-renders across 20+ interactive components.

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm (or pnpm for new projects)

### Installation

```powershell
# Clone the repository
git clone https://github.com/RCushmaniii/freelance-income-planner.git
cd freelance-income-planner

# Install dependencies
npm install

# Create environment file
cp .env.sample .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `EXCHANGE_RATE_API_KEY` | Optional | API key for live exchange rates. App functions without it; currency formatting still works but live FX conversion is unavailable. |

## Live Demo

**[Try it live](https://freelance-income-planner.vercel.app/)**

Test scenarios to try:

1. **Snapshot mode:** Set $100/hr, 40 hrs/week, 4 vacation weeks, 25% tax, $500/mo business expenses. Check the calculation breakdown to see how tax is applied to taxable income.
2. **Cross-currency:** Switch billing to USD and spending to MXN. Set exchange rate to 20. Watch all values convert in real time.
3. **Forecast mode:** Toggle to forecast view. Adjust the pessimistic scenario to 20 hrs/week and compare the three-scenario range visualization.

## Project Structure

```
freelance-income-planner/
├── app/                    # Next.js App Router
│   ├── income-planner/     # Main calculator page
│   ├── docs/[slug]/        # Dynamic documentation viewer
│   ├── api/fx/             # Exchange rate API endpoint
│   └── about/              # About page
├── components/
│   ├── income-planner/     # Feature components (20 files)
│   └── ui/                 # Base UI primitives
├── lib/
│   ├── calculations.ts     # Core calculation engine
│   ├── store.ts            # Zustand state management
│   ├── currency-conversion.ts # Multi-currency logic
│   ├── chartData.ts        # Chart data generators
│   └── i18n/               # EN/ES translations (42KB)
└── docs/                   # Markdown documentation (12 files)
```

## Deployment

### Build for Production

```powershell
npm run build
npm start
```

### Recommended Platform

**Vercel** — optimized for Next.js, currently hosting the production deployment.

### Available Scripts

```powershell
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## Results

**For the End User:**
- Answers "what's my real take-home pay?" in under 30 seconds
- Handles the full complexity of freelance income (taxes, expenses, currencies, seasonality) without spreadsheet skills
- Data stays private — no accounts, no server-side storage

**Technical Demonstration:**

| Aspect | Detail |
|--------|--------|
| Calculation accuracy | 151 test cases covering tax, edge cases, currency roundtrips |
| Build size | 225 KB first load JS for income planner page |
| Supported currencies | 9 pair combinations (USD, MXN, EUR) |
| Translation coverage | Full EN/ES across all UI text (42 KB) |
| State persistence | Zustand + localStorage, restores on reload |

## Contact

**Robert Cushman**
Business Solution Architect & Full-Stack Developer
Guadalajara, Mexico

:email: info@cushlabs.ai
:link: [GitHub](https://github.com/RCushmaniii) | [LinkedIn](https://linkedin.com/in/robertcushman) | [Portfolio](https://cushlabs.ai)

## License

**CushLabs Income Planner Educational License v1.0**

- Personal, academic, non-commercial use permitted
- Modification and redistribution with attribution
- Commercial use requires separate permission

See [LICENSE](./LICENSE) for full terms.

---

*Last Updated: 2026-02-22*
