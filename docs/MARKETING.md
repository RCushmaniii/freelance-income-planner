## Freelance Income Planner — Marketing Copy

---

### The Problem

I built this because I couldn't answer a basic question: **what do I actually take home?**

I knew my hourly rate. I knew roughly how many hours I worked. But after taxes, business expenses, unbillable admin time, vacation weeks, and currency conversion — I had no idea what was hitting my bank account each month. I was running a business on vibes.

Spreadsheets worked until they didn't. I'd build one, forget to update a formula, and make a decision based on wrong numbers. Accounting software told me what happened last quarter — not what happens if I raise my rate by $15 or lose a client in March. Every online calculator I found either wanted me to create an account, stored my financial data on someone else's server, or was so simplistic it ignored taxes and expenses entirely.

The real cost wasn't the tool gap. It was the decisions I made without clarity:
- Quoting rates that didn't actually cover my cost of living
- Not knowing if I could take two weeks off without going negative
- Accepting projects out of fear instead of understanding my actual runway
- Doing currency conversion in my head because I bill in USD and pay rent in pesos

---

### What It Does

The Freelance Income Planner takes your hourly rate, hours, expenses, and tax situation — and shows you what you actually keep. Not gross revenue. Not a rough estimate. The real number, with the math visible behind every figure.

**Snapshot View** answers "what's my situation right now?"
You enter your rate, billable hours per week, unbillable admin hours, weeks worked per year, tax rate, and monthly expenses. The app calculates your net monthly income immediately — no submit button, no loading screen. It updates as you type. An expandable breakdown shows every step: gross billings, currency conversion (if applicable), taxes, business expenses, personal expenses, and what's left. Hover over any number and you see the exact formula.

**Forecast View** answers "what could happen this year?"
You build three scenarios side by side — pessimistic, realistic, optimistic — each with their own rate, hours, and vacation inputs. A 12-month equalizer lets you model seasonal patterns (Q4 heavy, summer slow, or steady). Line charts project all three scenarios across the year. If you enter your current savings, a runway chart shows when each scenario hits zero.

**The dual-currency model** handles the math that lives in my head rent-free. You set a billing currency (what clients pay you in) and a spending currency (what you pay rent in). USD, MXN, EUR — all nine combinations. The exchange rate is yours to set, with an optional live rate fetch. Every result displays in spending currency so you see real purchasing power, not abstract billing numbers.

**The what-if slider** lets you drag a rate adjustment from -20% to +50% and instantly see the impact on your annual net — without changing your saved inputs. It's for the "what if I raised my rate?" conversation you have with yourself at 11pm.

**The lifestyle feasibility check** tells you one of three things: you're sustainable (green), you're tight with no margin for error (yellow), or you're losing money (red). It shows a coverage multiple — your income divided by your total burn rate — and doesn't sugarcoat a deficit.

**The reality check** computes your effective hourly rate — what you actually earn per hour worked, including all that unbillable time you spend on invoicing, marketing, and email. If you charge $100/hr but spend 10 hours a week on admin, your real rate is lower than you think. The app shows you exactly how much lower.

---

### What Makes It Different

**Nothing leaves your browser.** All calculations run client-side in TypeScript. There's no backend database, no user accounts, no analytics on your financial data. Your inputs persist in your browser's localStorage. The only network call is an optional exchange rate fetch, and even that goes through a server-side proxy so no third party sees your request. I didn't build privacy as a feature — I built it as the architecture.

**It does the tax math correctly.** Business expenses reduce your taxable income before tax is calculated. This is how self-employment taxes actually work, but most calculators apply tax to gross revenue. The app also supports progressive tax brackets (15%/25%/35% tiers scaled to your currency) or a simple flat rate. And it reports deficits honestly — if you're spending more than you earn, the number goes negative instead of showing zero.

**It's fully bilingual.** Every label, tooltip, error message, and chart annotation exists in English and Spanish. Number formatting switches between `$1,234.56` and `$1.234,56` based on your language. This isn't a Google Translate pass — it's a purpose-built translation system with ~42KB of coverage across the entire UI.

**It shows the math.** Every number has a formula tooltip. The calculation breakdown is an expandable section, not hidden behind a "pro" tier. I wanted a tool where you could verify any number yourself, not one that asks you to trust a black box with your financial planning.

---

### The First Five Minutes

You open the app. No signup wall. No onboarding carousel. No cookie banner asking for consent to track you — because there's nothing to track.

The planner loads with sensible defaults already filled in. You see a net monthly income number immediately. It's probably wrong for your situation, but it's there — proof that the tool works before you've entered anything.

You change the hourly rate to yours. The number updates. You adjust hours per week. It updates again. You add your monthly business expenses — software subscriptions, coworking space, whatever. The breakdown below the result card shows exactly how that expense reduced your take-home pay and your tax bill (because business expenses are pre-tax).

Within 30 seconds, you have a number that's more accurate than anything you've calculated in a spreadsheet. Within two minutes, you've toggled the what-if slider and discovered what a 15% rate increase would do to your annual net. Within five minutes, you've switched to Forecast view, set up a pessimistic scenario where you lose 10 hours a week, and seen whether your savings can cover the gap.

The feeling I wanted: **clarity without ceremony.** No tutorials, no tooltips blocking your view, no "upgrade to see this feature." You came here with a question. You got an answer. The math is right there if you want to check it.

---

### Who This Is For

**Freelancers and consultants who bill hourly or weekly.** Particularly those earning $30K–$200K annually with variable workloads. If your income changes month to month, this tool exists for you.

**Cross-border workers.** Anyone who earns in one currency and lives in another — especially the USD-to-MXN corridor that's common among remote workers and digital nomads in Mexico. The dual-currency model eliminates the daily mental math.

**The privacy-conscious.** If you handle sensitive client work and don't want to enter your financial details into yet another SaaS tool with a vague privacy policy, this is the alternative. Your data stays on your machine. Period.

**People who don't want to build a spreadsheet.** The calculation engine handles taxes, expenses, unbillable time, vacation weeks, currency conversion, seasonal variations, and three-scenario forecasting. That's a spreadsheet most people wouldn't build correctly, and definitely wouldn't maintain.

---

### For Companies and Teams

**Consulting firms and agencies** with contractors or freelance staff. A manager can model what a contractor actually costs (or earns) across different rate structures without sharing financial data with a third-party platform.

**Finance and operations teams** at companies that work with international freelancers. The multi-currency model answers "what does this rate actually mean in local purchasing power?" — useful for setting fair compensation across geographies.

**HR and people ops** at companies transitioning employees to contractor relationships. The tool models the real impact: what rate makes someone whole after they lose benefits and start paying self-employment tax?

**Freelancer communities and coworking spaces** looking for a tool to recommend to members. It's free, it's private, and it works without creating accounts — so there's no vendor relationship to manage.

---

### For Developers

The codebase is clean and the architecture is deliberate:

- **Next.js 14 App Router** with strict server/client component boundaries
- **Pure calculation engine** — every function in `lib/calculations.ts` is side-effect-free and deterministic. Validated against 151 edge cases.
- **Zustand with selective subscriptions** — state management that prevents unnecessary re-renders without boilerplate
- **Defensive numerics** — division-by-zero guards, NaN propagation checks, and input validation clamping across all paths
- **Single source of truth** — display components consume engine results, never recalculate independently
- **TypeScript end-to-end** — no `any` types in the critical path

It's a good reference implementation if you're building any client-side financial tool, a multi-currency application, or a bilingual React app with Zustand state management. The dual-currency conversion logic and progressive tax bracket engine are reusable patterns.

---

### Why I Keep Working On It

I built this because I needed it. I was running CushLabs, billing clients in USD, living in Mexico, and I genuinely didn't know if my rate covered my life. Now I do. The first version answered that question. Everything since — the forecast view, the seasonal equalizer, the what-if slider — came from the next question I asked myself once I had the basics right.

Phase 2 is planned: AI-powered rate recommendations and natural language queries. But the core is stable and production-deployed on Vercel right now.

**Live:** [https://freelance-income-planner.vercel.app](https://freelance-income-planner.vercel.app)
**Source:** [https://github.com/RCushmaniii/freelance-income-planner](https://github.com/RCushmaniii/freelance-income-planner)
**Built by:** [CushLabs.ai](https://cushlabs.ai)
