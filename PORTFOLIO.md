---
# === CONTROL FLAGS ===
portfolio_enabled: true
portfolio_priority: 2
portfolio_featured: true

# === CARD DISPLAY ===
title: "Freelance Income Planner"
tagline: "Privacy-first income simulator — see how rates, taxes, and currencies impact take-home pay"
slug: "freelance-income-planner"
category: "Tools"
tech_stack:
  - "Next.js 14"
  - "TypeScript 5.5"
  - "React 18.3"
  - "Tailwind CSS 3.4"
  - "Zustand 4.4"
  - "Recharts 2.10"
  - "Vercel"
thumbnail: "/images/freelance-income-planner-thumb.jpg"
status: "Production"

# === DETAIL PAGE ===
problem: "Freelancers can't predict take-home pay reliably. Variable hours, shifting tax rates, business expenses, and cross-currency billing make it nearly impossible to answer 'can I afford this lifestyle?' without a spreadsheet. Existing tools either require account creation, send data to servers, or don't handle multi-currency scenarios."
solution: "A privacy-first bilingual income calculator that runs entirely in the browser. Enter your rate, hours, taxes, and expenses — get an instant breakdown of real take-home pay. Supports 9 currency pair combinations (USD/MXN/EUR), three-scenario forecasting with seasonal modeling, and honest deficit reporting. No login, no database, no cookies."
key_features:
  - "Real-time income projections with transparent calculation breakdowns — math updates as you type, no submit button"
  - "Dual-currency engine supporting 9 currency pair combinations (USD/MXN/EUR) with bidirectional conversion"
  - "Three-scenario forecasting — pessimistic, realistic, optimistic with monthly projection charts and runway analysis"
  - "Zero data leaves the browser — 100% client-side computation with localStorage persistence"
  - "Fully bilingual interface (EN/ES) with automatic number formatting per locale"

# === LINKS ===
demo_url: "https://freelance-income-planner.vercel.app"
live_url: "https://freelance-income-planner.vercel.app"

# === MEDIA: PORTFOLIO SLIDES ===
slides:
  - src: "/images/freelance-income-planner-01.png"
    alt_en: "Freelance Income Planner — financial clarity for independent workers, answering what do I actually take home"
    alt_es: "Planificador de Ingresos Freelance — claridad financiera para trabajadores independientes, respondiendo cuanto realmente me llevo a casa"
  - src: "/images/freelance-income-planner-02.png"
    alt_en: "$100/hr does not equal wealthy — taxes, admin time, expenses, and currency conversion create a fog that hides real earnings"
    alt_es: "$100/hr no significa ser rico — impuestos, tiempo administrativo, gastos y conversion de moneda crean una niebla que oculta las ganancias reales"
  - src: "/images/freelance-income-planner-03.png"
    alt_en: "The tool gap — spreadsheets are fragile, accounting software is backward-looking, online calculators are too simple"
    alt_es: "La brecha de herramientas — las hojas de calculo son fragiles, el software contable mira al pasado, las calculadoras en linea son demasiado simples"
  - src: "/images/freelance-income-planner-04.png"
    alt_en: "No login, no loading — no signup wall, no onboarding carousel, no database, no cookies, clarity without ceremony"
    alt_es: "Sin login, sin carga — sin muro de registro, sin carrusel de onboarding, sin base de datos, sin cookies, claridad sin ceremonias"
  - src: "/images/freelance-income-planner-05.png"
    alt_en: "The Snapshot — sensible defaults pre-filled, math updates as you type, proof the tool works in 30 seconds"
    alt_es: "La Instantanea — valores predeterminados sensatos, las matematicas se actualizan al escribir, prueba de que la herramienta funciona en 30 segundos"
  - src: "/images/freelance-income-planner-06.png"
    alt_en: "The Reality Check — pre-tax logic shows how business expenses reduce taxable income, revealing effective hourly rate of $68/hr on a $100/hr billed rate"
    alt_es: "La Verificacion de Realidad — la logica pre-impuestos muestra como los gastos de negocio reducen el ingreso gravable, revelando una tarifa efectiva de $68/hr sobre una tarifa facturada de $100/hr"
  - src: "/images/freelance-income-planner-07.png"
    alt_en: "Modeling the future — drag the slider to test rate increases from -20% to +50% and instantly see the impact on annual net"
    alt_es: "Modelando el futuro — arrastra el slider para probar aumentos de tarifa de -20% a +50% y ver al instante el impacto en el neto anual"
  - src: "/images/freelance-income-planner-08.png"
    alt_en: "Earn in one currency, live in another — dual-currency engine with 9 combinations showing real purchasing power in your local currency"
    alt_es: "Gana en una moneda, vive en otra — motor de doble moneda con 9 combinaciones mostrando poder adquisitivo real en tu moneda local"
  - src: "/images/freelance-income-planner-09.png"
    alt_en: "Freelancing is seasonal — three-scenario planning with monthly projection charts modeling feast and famine cycles and savings runway"
    alt_es: "El freelance es estacional — planificacion de tres escenarios con graficos de proyeccion mensual modelando ciclos de abundancia y escasez y pista de ahorros"
  - src: "/images/freelance-income-planner-10.png"
    alt_en: "Engineered for reliability — deterministic math validated against 151 edge cases, fully bilingual with automatic number formatting"
    alt_es: "Disenado para confiabilidad — matematicas deterministas validadas contra 151 casos limite, completamente bilingue con formato numerico automatico"
  - src: "/images/freelance-income-planner-11.png"
    alt_en: "Who is this for — hourly freelancers, cross-border workers earning in USD living in MXN/EUR, privacy advocates, and agency owners"
    alt_es: "Para quien es — freelancers por hora, trabajadores transfronterizos que ganan en USD y viven en MXN/EUR, defensores de la privacidad y duenos de agencias"

# === MEDIA: VIDEO ===
video_url: "/video/freelance-income-planner-brief.mp4"
video_poster: "/video/freelance-income-planner-brief-poster.jpg"

# === OPTIONAL ===
metrics:
  - "Answers 'what's my real take-home?' in under 30 seconds"
  - "151 edge cases validated in the calculation engine"
  - "9 currency pair combinations (USD/MXN/EUR)"
  - "Zero data transmitted — 100% client-side computation"
tags:
  - "bilingual"
  - "digital-nomad"
  - "freelance"
  - "income-calculator"
  - "privacy-first"
  - "nextjs"
  - "typescript"
  - "zustand"
  - "recharts"
  - "multi-currency"
date_completed: "2026-02"
---

## Overview

Freelance Income Planner is a client-side income calculator that helps freelancers and consultants understand their real take-home pay. It goes beyond simple rate-times-hours math by factoring in taxes (simple percentage or progressive brackets), business expenses, personal cost of living, vacation weeks, and multi-currency billing.

The app runs entirely in the browser with no backend, no accounts, and no data transmission. State persists in localStorage so users can return to their scenarios without re-entering data. The interface is fully bilingual (English/Spanish) with instant language switching.

Two views serve different planning needs: Snapshot mode gives an immediate breakdown of current income, while Forecast mode enables three-scenario comparison (pessimistic, realistic, optimistic) with monthly projection charts and runway analysis.

## The Challenge

- **Unpredictable income:** Freelancers face variable hours, seasonal demand, and client churn. A simple hourly rate doesn't tell you what you'll actually take home.
- **Multi-currency complexity:** Digital nomads billing in USD while spending in MXN or EUR need real-time conversion that accounts for exchange rate fluctuations in every calculation step.
- **Tax opacity:** Self-employment taxes are calculated on taxable income (gross minus business expenses), not raw gross. Most online calculators get this wrong, overstating tax burden.
- **Privacy concerns:** Entering detailed financial data into online tools means trusting a third party with sensitive information. Most freelancers would rather not.

## The Solution

**Privacy-first architecture:** All computation happens client-side in pure TypeScript functions. No API calls for calculations, no user accounts, no analytics on financial data. The only external call is an optional exchange rate fetch.

**Accurate tax modeling:** Tax is calculated on taxable income (gross minus business expenses), matching standard self-employment tax treatment. Progressive bracket mode supports jurisdiction-specific rates. The engine reports deficits honestly rather than clamping to zero.

**Dual-currency model:** Users set a billing currency (what clients pay) and a spending currency (where they live). The exchange rate is user-controlled with an optional live FX fetch. All 9 combinations of USD/MXN/EUR are supported with correct bidirectional conversion.

**Three-scenario forecasting:** Forecast mode runs three independent calculation sets with adjustable rates, hours, and vacation weeks. Monthly projection charts apply seasonal multipliers. Runway analysis shows how long savings last under each scenario.

## Technical Highlights

- **Pure calculation engine:** All income math lives in `lib/calculations.ts` as side-effect-free functions, validated against 151 edge cases covering tax logic, division safety, currency roundtrips, and deficit scenarios
- **Single source of truth:** Display components consume engine results rather than recalculating independently, eliminating drift between summary cards, breakdowns, and charts
- **Server/client discipline:** Strict Next.js 14 App Router patterns — `'use client'` only where hooks or browser APIs are required
- **Zustand with selective subscriptions:** State management avoids unnecessary re-renders through granular store access patterns across 20+ interactive components
- **Defensive numerics:** Division-by-zero guards, NaN/Infinity propagation checks, and input validation clamping across all calculation paths
- **Bidirectional currency conversion:** Exchange rate interpretation is context-aware (billing-to-spending multiplies, spending-to-billing divides) with fallback heuristics
