# CLAUDE.md — Freelance Income Planner

## Project Overview

Privacy-first bilingual income calculator for freelancers and consultants. Built with Next.js 14 App Router, fully client-side (no backend persistence). Users input their hourly rate, hours, expenses, and tax info to see real-time income projections across snapshot and forecast views. Supports USD/MXN/EUR billing and spending currencies. Production-deployed on Vercel.

## Tech Stack

- **Framework:** Next.js 14 (App Router, React Server Components)
- **Language:** TypeScript 5.5
- **UI:** React 18.3, Tailwind CSS 3.4, Lucide React icons
- **State:** Zustand 4.4 with localStorage persistence
- **Charts:** Recharts 2.10
- **Markdown:** react-markdown + remark-gfm + rehype-highlight
- **Formatting:** Prettier 3.3, ESLint 8.57 (next/core-web-vitals)

## Project Structure

```
app/                    # Next.js App Router pages
  income-planner/       # Main app page
  docs/[slug]/          # Dynamic markdown doc viewer
  api/fx/               # Exchange rate API endpoint
components/
  income-planner/       # Feature components (all 'use client')
  ui/                   # Base UI primitives (Button, Card, Input, Label, Tooltip)
lib/
  calculations.ts       # Core calculation engine (pure functions)
  store.ts              # Zustand store (all app state)
  currency-conversion.ts # Multi-currency conversion logic
  chartData.ts          # Chart data generators
  formatters.ts         # Number/currency formatting
  i18n/translations.ts  # EN/ES translation strings
docs/                   # Markdown documentation files
```

## Development Commands

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Format code
npm run format
```

## Key Patterns & Conventions

- All components are Server Components by default. Only use `'use client'` when hooks or browser APIs are required.
- Never import a Client Component into a Server Component.
- Tailwind CSS exclusively — no CSS-in-JS or styled-jsx.
- Calculation engine (`lib/calculations.ts`) is pure functions with no side effects.
- Tax is calculated on taxable income (gross - business expenses), not raw gross.
- `annualNet` can go negative to honestly report deficits for runway calculations.
- All monetary values in the engine are in billing currency; components convert to spending currency for display.
- State is managed through Zustand with selective subscriptions to prevent unnecessary re-renders.
- Display components should use engine result values (e.g., `result.monthlyGross`) rather than recalculating manually.

## Current Focus

Production stable at v1.0.0. Calculation bugs fixed (tax base, division-by-zero, cash flow double-counting). Phase 2 planned: AI-powered rate recommendations and natural language queries.

## Known Issues

- `calculateRequiredRate` and `calculateRequiredHours` use simplified formulas that don't account for business expenses. The binary search version (`calculateRequiredHourlyRateForAnnualNet`) is accurate.
- No automated test suite committed to the repo. Manual validation performed with 151 tests.
- Recharts (~100KB) could be lazy-loaded with `dynamic()` for snapshot-only users.

## Environment Setup

Copy `.env.sample` to `.env.local`:

```powershell
cp .env.sample .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `EXCHANGE_RATE_API_KEY` | Optional | API key for live exchange rates. App functions without it; currency formatting still works. |

## Code Quality Rules

- Follow Next.js 14 App Router best practices strictly.
- Assume all components are Server Components by default.
- Any file using `useState`, `useEffect`, `useRef`, browser APIs, or animation libraries MUST be marked with `'use client'`.
- Prefer Tailwind CSS and global CSS via `globals.css`. No styled-jsx in App Router.
- Animations must be subtle, optional, and respect `prefers-reduced-motion`.
- Before final output: audit imports for client-only dependencies, confirm `'use client'` placement.
- Code must compile under Next.js 14 App Router. No deprecated patterns. No mixing Pages Router conventions.
