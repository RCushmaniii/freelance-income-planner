---
# =============================================================================
# PORTFOLIO.md — Freelance Income Planner
# =============================================================================
portfolio_enabled: true
portfolio_priority: 2
portfolio_featured: true
portfolio_last_reviewed: "2026-02-22"

title: "Freelance Income Planner"
tagline: "Privacy-first income simulator for freelancers. See how rate changes, sick days, and taxes impact take-home pay."
slug: "freelance-income-planner"

category: "Tools"
target_audience: "Freelancers, consultants, and digital nomads managing variable income across currencies"
tags:
  - "bilingual"
  - "digital-nomad"
  - "freelance"
  - "income-calculator"
  - "privacy-first"

thumbnail: ".github/screenshots/app-screen-shot.jpg"
hero_images:
  - ".github/screenshots/app-screen-shot.jpg"
  - ".github/screenshots/forecast-view.jpg"
  - ".github/screenshots/income-planner.jpg"
demo_video_url: ""

live_url: "https://freelance-income-planner.vercel.app"
demo_url: "https://freelance-income-planner.vercel.app"
case_study_url: ""

problem_solved: |
  Freelancers can't predict take-home pay reliably. Variable hours, shifting tax rates,
  business expenses, and cross-currency billing make it nearly impossible to answer
  "can I afford this lifestyle?" without a spreadsheet. Existing tools either require
  account creation, send data to servers, or don't handle multi-currency scenarios.

key_outcomes:
  - "Real-time income projections with transparent calculation breakdowns"
  - "Multi-currency support across 9 currency pair combinations (USD/MXN/EUR)"
  - "Zero data leaves the browser — 100% client-side computation"
  - "Three-scenario forecasting: pessimistic, realistic, optimistic"
  - "Bilingual interface serving English and Spanish speakers"

tech_stack:
  - "Next.js 14 (App Router)"
  - "TypeScript 5.5"
  - "React 18.3"
  - "Tailwind CSS 3.4"
  - "Zustand 4.4"
  - "Recharts 2.10"
  - "Vercel"

complexity: "Production"
---

## Overview

Freelance Income Planner is a client-side income calculator that helps freelancers and consultants understand their real take-home pay. It goes beyond simple rate-times-hours math by factoring in taxes (simple percentage or progressive brackets), business expenses, personal cost of living, vacation weeks, and multi-currency billing.

The app runs entirely in the browser with no backend, no accounts, and no data transmission. State persists in localStorage so users can return to their scenarios without re-entering data. The interface is fully bilingual (English/Spanish) with instant language switching.

Two views serve different planning needs: Snapshot mode gives an immediate breakdown of current income, while Forecast mode enables three-scenario comparison (pessimistic, realistic, optimistic) with monthly projection charts and runway analysis.

## The Challenge

- **Unpredictable income:** Freelancers face variable hours, seasonal demand, and client churn. A simple hourly rate doesn't tell you what you'll actually take home.
- **Multi-currency complexity:** Digital nomads billing in USD while spending in MXN or EUR need real-time conversion that accounts for exchange rate fluctuations in every calculation step.
- **Tax opacity:** Self-employment taxes work differently from W-2 withholding. Business expenses should reduce taxable income before tax is applied, but most calculators get this wrong.
- **Privacy concerns:** Entering detailed financial data into online tools means trusting a third party with sensitive information. Most freelancers would rather not.

## The Solution

**Privacy-first architecture:**
All computation happens client-side in pure TypeScript functions. No API calls for calculations, no user accounts, no analytics on financial data. The only external call is an optional exchange rate fetch.

**Accurate tax modeling:**
Tax is calculated on taxable income (gross minus business expenses), matching standard self-employment tax treatment. Progressive bracket mode supports jurisdiction-specific rates. The engine reports deficits honestly rather than clamping to zero.

**Dual-currency model:**
Users set a billing currency (what clients pay) and a spending currency (where they live). The exchange rate is user-controlled with an optional live FX fetch. All 9 combinations of USD/MXN/EUR are supported with correct bidirectional conversion.

**Scenario planning:**
Forecast mode runs three independent calculation sets with adjustable rates, hours, and vacation weeks. Monthly projection charts apply seasonal multipliers. Runway analysis shows how long savings last under each scenario.

## Technical Highlights

- **Pure calculation engine:** All income math lives in `lib/calculations.ts` as side-effect-free functions. Fully testable, validated against 151 edge cases.
- **Single source of truth:** Display components consume engine results rather than recalculating independently, eliminating drift between summary cards, breakdowns, and charts.
- **Server/client discipline:** Strict Next.js 14 App Router patterns — `'use client'` only where hooks or browser APIs are required. Markdown docs use server-side parsing with client-side rendering.
- **Zustand with selective subscriptions:** State management avoids unnecessary re-renders through granular store access patterns.
- **Defensive numerics:** Division-by-zero guards, NaN/Infinity propagation checks, and input validation clamping across all calculation paths.
- **Bidirectional currency conversion:** Exchange rate interpretation is context-aware (billing-to-spending multiplies, spending-to-billing divides) with fallback heuristics.

## Results

**For the End User:**
- Answers "what's my real take-home pay?" in under 30 seconds
- Handles the full complexity of freelance income (taxes, expenses, currencies, seasonality) without requiring spreadsheet skills
- Data stays private — no account creation, no server-side storage

**Technical Demonstration:**
- Production-grade Next.js 14 App Router architecture with clean server/client boundaries
- Financial calculation engine with correct tax treatment and honest deficit reporting
- Multi-currency system handling 9 currency pair combinations with proper conversion semantics
- Bilingual i18n system with 42KB of translation coverage across the full UI
