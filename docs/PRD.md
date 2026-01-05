---
title: Product Requirements Document (PRD)
description: Product requirements and implementation notes for CushLabs Income Planner.
category: Overview
order: 1
---

# CushLabs Income Planner — Detailed Specification

**Last Updated:** December 19, 2025

**Purpose:** Portfolio demonstration piece showcasing modern React (Next.js) skills while solving a genuine freelancer pain point.

**Architecture:** Privacy-first, client-side calculations (no accounts, no database). Optional share/export features that do not require a backend.

---

## Core Value Proposition

Freelancers know their hourly rate but rarely know their _effective_ hourly rate—the actual take-home after accounting for unbillable time, expenses, and taxes. This tool bridges that gap with instant clarity.

---

## Tab 1: Snapshot (Current Financial Reality)

### User Inputs

| Field                     | Type                | Default | Notes                                                        |
| ------------------------- | ------------------- | ------- | ------------------------------------------------------------ |
| Hourly Rate               | Currency            | 500     | What you quote clients                                       |
| Billable Hours/Week       | Number (0–60)       | 40      | Billable time per week                                       |
| Unbillable Hours/Week     | Number (0–40)       | 10      | Admin, marketing, proposals, email                           |
| Vacation Weeks/Year       | Number (0–12)       | 2       | Used to derive working weeks: `52 - vacationWeeks`           |
| Monthly Business Expenses | Currency            | 0       | Software, subscriptions, equipment                           |
| Tax Mode                  | Enum (simple/smart) | simple  | Simple uses tax rate; Smart uses a progressive approximation |
| Tax Rate                  | Number (0–50%)      | 25%     | Only used in Simple mode                                     |
| Target Annual Net Income  | Currency (optional) | —       | Goal insight + required rate estimation                      |
| Monthly Personal Need     | Currency (optional) | —       | Used for runway                                              |
| Current Savings           | Currency (optional) | —       | Used for runway                                              |

### Calculation Logic

```
// Core calculations
workingWeeksPerYear = max(1, 52 - vacationWeeks)
billableHoursPerYear = billableHoursPerWeek × workingWeeksPerYear
totalWorkHoursPerYear = (billableHoursPerWeek + unbillableHoursPerWeek) × workingWeeksPerYear

grossAnnualIncome = hourlyRate × billableHoursPerYear
grossMonthlyIncome = grossAnnualIncome ÷ 12

// Expense deductions
annualBusinessExpenses = monthlyBusinessExpenses × 12
taxableIncome = max(0, grossAnnualIncome − annualBusinessExpenses)

// Tax calculation
annualTaxBurden = calculateTax(taxableIncome, taxMode, taxRate)
netAnnualIncome = taxableIncome − annualTaxBurden
netMonthlyIncome = netAnnualIncome ÷ 12

// The "Reality Check" metric
effectiveHourlyRate = netAnnualIncome ÷ totalWorkHoursPerYear

// Optional supporting metric (useful in UI copy)
takeHomePerBillableHour = netAnnualIncome ÷ billableHoursPerYear

// Unbillable time insight
unbillablePercentage = (unbillableHoursPerWeek ÷ (billableHoursPerWeek + unbillableHoursPerWeek)) × 100

// Runway calculation (if savings + personal need provided)
monthlyNetCashFlow = netMonthlyIncome − monthlyPersonalNeed
if monthlyNetCashFlow >= 0:
  runwayMonths = 'Sustainable'
else:
  runwayMonths = currentSavings ÷ abs(monthlyNetCashFlow)

// Goal progress (if targetAnnualNet provided)
deltaToGoal = netAnnualIncome - targetAnnualNet
if deltaToGoal >= 0:
  goalStatus = 'Ahead'
else:
  goalStatus = 'Behind'
  requiredHourlyRate = solveForHourlyRate(targetAnnualNet)
```

### Outputs Display

**Primary Metrics (Large, Prominent)**

- Gross Annual Income: `$XX,XXX`
- Net Annual Income (Take-Home): `$XX,XXX`
- Effective Hourly Rate: `$XX.XX` ← This is the "aha" moment

**Visual: Rate Comparison Bar**

```
Your Billing Rate    ████████████████████████  $75/hr
Your Effective Rate  ██████████████            $47/hr
                     └─── 37% reduction ───┘
```

**Secondary Metrics (Smaller Cards)**

- Monthly Take-Home: `$X,XXX`
- Annual Tax Burden: `$X,XXX`
- Unbillable Time: `38%` (with note: "You work 45 hrs/week but only bill 28")

**Runway Section (if optional fields provided)**

- Financial Runway: `4.2 months` (if income stopped today)
- Monthly Savings Rate: `22%`
- Monthly Cash Flow: `+$XXX` or `-$XXX`

### UI Layout — Tab 1

```
┌─────────────────────────────────────────────────────────────────┐
│  FREELANCER INCOME PLANNER                          [Snapshot]  │
│                                                     [Forecast]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─── YOUR INPUTS ────────────────────────────────────────┐    │
│  │                                                         │    │
│  │  Hourly Rate        [$|____75____]                     │    │
│  │                                                         │    │
│  │  Billable Hours/Week    ●────────○──────  28 hrs       │    │
│  │                                                         │    │
│  │  Working Weeks/Year     ●──────────────○  48 weeks     │    │
│  │                                                         │    │
│  │  Monthly Expenses   [$|____350___]                     │    │
│  │                                                         │    │
│  │  Tax Rate               ●───────○───────  30%          │    │
│  │                                                         │    │
│  │  ▼ Advanced (Runway Calculation)                       │    │
│  │    Monthly Personal Expenses  [$|____2500__]           │    │
│  │    Current Savings            [$|____12000_]           │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌─── YOUR REALITY ───────────────────────────────────────┐    │
│  │                                                         │    │
│  │   GROSS ANNUAL          NET ANNUAL         EFFECTIVE   │    │
│  │   $100,800              $66,360             $49.37/hr  │    │
│  │   ─────────             ───────             ─────────  │    │
│  │   before taxes          take-home           real rate  │    │
│  │                                                         │    │
│  │   ┌─────────────────────────────────────────────────┐  │    │
│  │   │ ████████████████████████████░░░░░░░░░░░░░░░░░░ │  │    │
│  │   │ $75/hr billing  →  $49.37/hr effective (−34%)  │  │    │
│  │   └─────────────────────────────────────────────────┘  │    │
│  │                                                         │    │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐            │    │
│  │   │ $5,530   │  │ $30,240  │  │  62%     │            │    │
│  │   │ monthly  │  │ tax bill │  │ billable │            │    │
│  │   └──────────┘  └──────────┘  └──────────┘            │    │
│  │                                                         │    │
│  │   RUNWAY: 4.8 months │ SAVINGS RATE: 18%               │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│           [ Download PDF Report ]    [ Reset ]                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tab 2: Forecast (Scenario Planning)

### Purpose

Let users stress-test their income against realistic scenarios: What if I lose a client? What if I raise rates? What if I land a retainer?

### User Inputs (Inherited + Adjustable)

All Tab 1 inputs are inherited. User can adjust:

| Scenario Parameter  | Conservative | Expected   | Optimistic |
| ------------------- | ------------ | ---------- | ---------- |
| Billable Hours/Week | adjustable   | adjustable | adjustable |
| Hourly Rate         | adjustable   | adjustable | adjustable |
| Vacation Weeks/Year | adjustable   | adjustable | adjustable |

Users can manually override any cell.

### Calculation Logic

```
// For each scenario (pessimistic, realistic, optimistic):
scenarioWorkingWeeks = max(1, 52 - scenarioVacationWeeks)
scenarioGrossAnnual = scenarioHourlyRate × scenarioHoursPerWeek × scenarioWorkingWeeks
scenarioTaxable = max(0, scenarioGrossAnnual − annualBusinessExpenses)
scenarioNetAnnual = scenarioTaxable − calculateTax(scenarioTaxable, taxMode, taxRate)
scenarioMonthlyNet = scenarioNetAnnual ÷ 12

// Runway projection (12 months)
monthlyDelta = scenarioMonthlyNet − monthlyPersonalNeed
balance = currentSavings
for month in 1..12:
    balance = balance + monthlyDelta
    projectedSavings[month] = balance

// Runway under each scenario
if scenarioMonthlyNet >= monthlyPersonalNeed:
  runway = 'Sustainable'
else:
  runway = currentSavings ÷ (monthlyPersonalNeed − scenarioMonthlyNet)
```

### Outputs Display

**Scenario Comparison Table**

```
                    CONSERVATIVE    EXPECTED    OPTIMISTIC
Monthly Take-Home      $4,150        $5,530       $7,200
Annual Take-Home      $49,800       $66,360      $86,400
Effective Rate        $37.05/hr     $49.37/hr    $64.29/hr
12-Month Runway       3.2 mo        4.8 mo       sustainable
```

**12-Month Projection Chart**

- Area chart showing cumulative savings over 12 months
- Three overlapping areas (conservative/expected/optimistic)
- Horizontal line showing "zero savings" threshold
- Highlight where conservative scenario crosses zero (if applicable)

### UI Layout — Tab 2

```
┌─────────────────────────────────────────────────────────────────┐
│  SCENARIO PLANNING                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Adjust scenarios to stress-test your financial position:      │
│                                                                 │
│  ┌─────────────────┬─────────────┬───────────┬─────────────┐   │
│  │                 │ CONSERVATIVE│ EXPECTED  │ OPTIMISTIC  │   │
│  ├─────────────────┼─────────────┼───────────┼─────────────┤   │
│  │ Hours/Week      │  22 (−20%)  │    28     │  35 (+25%)  │   │
│  │ Hourly Rate     │    $75      │    $75    │  $86 (+15%) │   │
│  │ Monthly Expenses│ $385 (+10%) │   $350    │    $350     │   │
│  ├─────────────────┼─────────────┼───────────┼─────────────┤   │
│  │ Monthly Net     │   $4,150    │  $5,530   │   $7,200    │   │
│  │ Annual Net      │  $49,800    │ $66,360   │  $86,400    │   │
│  │ Effective Rate  │  $37.05/hr  │ $49.37/hr │  $64.29/hr  │   │
│  └─────────────────┴─────────────┴───────────┴─────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         12-MONTH SAVINGS PROJECTION                      │   │
│  │  $30k ┤                              ▄▄▄▄█████████████  │   │
│  │       │                    ▄▄▄▄██████████████████       │   │
│  │  $20k ┤          ▄▄▄▄█████████████████                  │   │
│  │       │  ████████████████████                           │   │
│  │  $10k ┤  ████████████                                   │   │
│  │       │  █████                                          │   │
│  │   $0k ┼──────────────────────────────────────────────── │   │
│  │       │  J   F   M   A   M   J   J   A   S   O   N   D  │   │
│  │                                                          │   │
│  │  ■ Optimistic  ■ Expected  ■ Conservative               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  💡 INSIGHT: Under conservative conditions, you'd deplete      │
│     savings by month 8. Consider building a 6-month buffer.    │
│                                                                 │
│           [ Download PDF Report ]    [ Reset ]                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Snapshot Add-on: Rate Benchmark (Optional/Lightweight)

### Purpose

Provide context: "Am I charging too little? Too much?" This is implemented as a lightweight panel in Snapshot mode.

### Data Source Options

1. **Static data** (simplest for portfolio): Hardcoded ranges by industry/region
2. **User-submitted anonymous data** (future enhancement)
3. **External API** (Glassdoor, PayScale — may require keys)

For portfolio purposes, use static data:

```javascript
const benchmarks = {
  'business-english-latam': { p25: 35, p50: 55, p75: 80, p90: 120 },
  'business-english-us': { p25: 50, p50: 85, p75: 125, p90: 200 },
  'web-development-latam': { p25: 30, p50: 50, p75: 80, p90: 120 },
  'web-development-us': { p25: 75, p50: 125, p75: 175, p90: 250 },
  // etc.
}
```

### UI Display

```
Your Rate: $75/hr

Business English Consultants (LATAM Market)
├─────────┼─────────┼────●────┼─────────┤
$35      $55       $75      $80      $120
25th     50th    YOU      75th     90th

You're at approximately the 65th percentile.
```

---

## Sharing & Export (Portfolio-Grade, No Backend)

### URL Deep-Linking (Share Scenarios)

Support a shareable URL like:

`/income-planner?rate=85&billable=28&unbillable=10&weeks=48&biz=200&tax=30&need=2500&savings=12000`

This enables collaboration (“look at this plan”) without accounts or a server.

### Copy Summary (MVP Export)

Add a button that copies a clean snapshot to the clipboard (ideal for Notion/Slack):

```
Hourly rate: $75/hr
Billable / Unbillable: 28 / 10 hrs/week
Monthly business expenses: $200
Tax: 30%

Net monthly: $5,530
Effective hourly rate (real): $49.37/hr
Runway: 4.2 months (based on $12,000 savings and $2,500 monthly need)
```

### PDF (Optional)

PDF export is optional and can be implemented client-side later (or via a serverless function) if desired.

---

## Visual Design Guidelines

### Color Palette (Current)

- Accent: `#FF6A3D`
- Charts use the pastel series variables from `app/globals.css`:
  - `--chart-pessimistic`
  - `--chart-realistic`
  - `--chart-optimistic`

### Typography

- Headings: Space Grotesk
- Body: Source Serif 4

### Component Patterns

**Input Cards:** White background, subtle shadow, rounded corners (8px)
**Metric Cards:** Slightly larger text, number prominently displayed, label below
**Sliders:** Custom styled, show current value dynamically
**Charts:** Clean, minimal gridlines, clear legend

### Micro-Interactions (Portfolio Polish)

1. **Effective Rate Counter:** When calculated, animate from billing rate down to effective rate (1.5s ease-out)
2. **Bar Fill:** Animate the comparison bar filling from left to right
3. **Scenario Toggle:** Smooth crossfade when switching between scenarios
4. **PDF Button:** Brief loading spinner, then checkmark on success

---

## Technical Implementation Notes

### State Management

- Zustand store: `lib/store.ts`
- Calculation engine: `lib/calculations.ts`
- UI pulls values from the store and recalculates synchronously.

### Calculation Module (Reusable)

The authoritative implementation lives in `lib/calculations.ts` (typed inputs/outputs) and is shared between Snapshot and Forecast.

### Currency & FX

- Currency toggle: MXN/USD
- Rates are fetched via a Next.js server route: `app/api/fx/route.ts`
- Client uses `lib/fx.ts` and never exposes the API key.

---

## File Structure (Suggested)

```

ai-income-generator/
├── app/ # Next.js App Router pages
├── components/ # UI + Income Planner components
├── lib/ # calculations, chart data, store, i18n
├── docs/ # PRD + design notes
└── README.md

```

---

## Portfolio Talking Points

When presenting this project, emphasize:

1. **Real Problem, Real Solution:** "I built this because I needed it. Freelancers know their rate but not their effective rate."

2. **Privacy-First Architecture:** "All calculations run client-side. No accounts, no database. Shareable scenarios via URL deep-linking."

3. **Financial Modeling:** "The scenario engine lets users stress-test against losing clients or raising rates."

4. **Clean Architecture:** "Reusable calculation utilities, typed store, and isolated UI components with consistent styling and localization."

5. **Polish Details:** "Animated counters, responsive design, exportable reports."

---

## Future Enhancements (Out of Scope for MVP)

- Invoice tracking integration
- PDF export (if not included)
- Anonymous rate benchmarking (crowdsourced data)
- Goal setting ("I want to save $20k this year — what rate/hours do I need?")
- Client concentration risk ("Client A is 60% of income — here's your risk exposure")
