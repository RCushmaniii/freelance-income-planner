---
title: Freelance Income Planner
description: A bilingual income planning tool for freelancers and consultants.
order: 0
---

# Freelance Income Planner

**A transparent, bilingual income calculator for freelancers and consultants.**

🚀 **[Live Demo](https://ai-income-generator.vercel.app/)** | Built with Next.js, TypeScript, and Tailwind CSS by [CushLabs.ai](https://cushlabs.ai)

> **Note:** Currently a deterministic calculator using pure math - no AI features yet. AI enhancements (market rate recommendations, natural language queries) are planned for Phase 2.

---

## ✨ Features

### Current (Phase 1 - Production Ready v1.0.0)

- **Snapshot Calculator** - Real-time income calculations with transparent cash flow breakdown
- **Forecast View** - Three-scenario planning with professional UI redesign
  - Scenario Builder with visible slider tracks and fill states
  - Strategic Insights with coaching-style analysis cards
  - Monthly Income Equalizer with color-coded seasonal variations
  - Range Visualization with distinct outcome cards
- **Multi-Currency Support** - USD, MXN, and EUR with sophisticated dual-currency model
  - Bill clients in one currency, spend in another
  - Automatic bidirectional conversion with custom exchange rates
  - Tax calculations in billing currency, results in spending currency
  - All 9 currency combinations supported (see [Currency Architecture](./docs/CURRENCY_ARCHITECTURE.md))
- **Tax Calculations** - Simple percentage or progressive bracket modes
- **Reality Check Stats** - Effective hourly rate, annual/weekly projections with formula tooltips
- **Lifestyle Feasibility** - Visual indicator showing if income covers expenses with buffer
- **What-If Scenarios** - Interactive rate adjustment showing impact on annual income
- **Documentation Viewer** - Responsive docs with left sidebar navigation and markdown rendering
- **Full Localization** - Complete EN/ES translation system
- **State Persistence** - localStorage saves your inputs automatically
- **Theme Switching** - Global light/dark theme with system preference default
- **Responsive Design** - Mobile-first, works beautifully on all screen sizes

### Coming Soon (Phase 2 - Planned)

- **Market Rate Recommendations** - AI-powered rate benchmarking against industry data
- **Natural Language Queries** - Conversational input like "I want to earn $120k next year"
- **Enhanced Forecast View** - Three-scenario planning with visual charts

See [docs/ROADMAP.md](./docs/ROADMAP.md) for the complete development roadmap.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/RCushmaniii/ai-income-planner.git
cd ai-income-planner

# Install dependencies
npm install

# Create environment file
cp .env.sample .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

If port 3000 is already in use, Next.js will automatically try the next available port.

---

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.5+
- **Styling:** Tailwind CSS 3.4+ with @tailwindcss/typography
- **State:** Zustand 4.4+ with persist middleware
- **Charts:** Recharts 2.10+
- **Markdown:** react-markdown with remark-gfm
- **Notifications:** react-hot-toast 2.4+

---

## 📁 Project Structure

```
ai-income-planner/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── income-planner/    # Income planner page
│   └── docs/              # Documentation viewer
│       ├── page.tsx       # Docs index
│       └── [slug]/        # Dynamic doc pages
├── components/             # React components
│   ├── Header.tsx         # Global header
│   ├── ErrorBoundary.tsx  # Error handling
│   └── income-planner/    # Feature components
├── lib/                    # Utilities & logic
│   ├── calculations.ts    # Pure calculation functions
│   ├── chartData.ts       # Chart data generators
│   ├── store.ts           # Zustand state management
│   ├── docs.ts            # Documentation utilities
│   └── i18n/              # Translations (EN/ES)
├── docs/                   # Documentation (markdown)
│   ├── INDEX.md           # Documentation index
│   ├── PRD.md             # Product requirements
│   ├── DESIGN.md          # Design system
│   ├── BRAND.md           # Brand guidelines
│   └── LESSONS_LEARNED.md # Development lessons
└── .windsurf/rules/        # Coding standards
```

---

## 📚 Documentation

### Live Documentation Viewer

Visit `/docs` in the running app for a responsive documentation viewer with:

- Left sidebar navigation on desktop
- Hamburger menu on mobile
- Proper markdown rendering with syntax highlighting
- 11+ documentation files covering all aspects of the project

### Core Documents

- **[docs/INDEX.md](./docs/INDEX.md)** - Documentation index and navigation
- **[docs/PRD.md](./docs/PRD.md)** - Complete product requirements and specifications
- **[docs/AI_STARTUP.md](./docs/AI_STARTUP.md)** - Quick onboarding guide for AI assistants
- **[docs/LESSONS_LEARNED.md](./docs/LESSONS_LEARNED.md)** - Development lessons and bug fixes
- **[docs/PREDEPLOY_AUDIT.md](./docs/PREDEPLOY_AUDIT.md)** - Pre-deployment checklist
- **[LICENSE](./LICENSE)** - Educational License v1.0

### Design & Development

- **[docs/BRAND.md](./docs/BRAND.md)** - Brand guidelines and messaging
- **[docs/DESIGN.md](./docs/DESIGN.md)** - Complete design system
- **[docs/ROADMAP.md](./docs/ROADMAP.md)** - Roadmap and planned features

### Coding Standards

See `.windsurf/rules/` and `docs/AI_ENGINEERING_RULES.md` for detailed coding standards including:

- SRP (Single Responsibility Principle)
- DRY (Don't Repeat Yourself)
- Error handling guidelines
- State management patterns
- And more...

---

## 🎨 Design System

### Professional Color Palette (v1.0.0)

```css
/* Core Colors */
--background: #000000; /* Dark */
--foreground: #ffffff;
--accent: #ff6a3d; /* Orange */
--muted: #aaaaaa;
--muted-strong: #888888;

/* Scenario Colors (Saturated) */
--chart-pessimistic: #64748b; /* Slate Gray */
--chart-realistic: #3b82f6; /* Royal Blue */
--chart-optimistic: #10b981; /* Emerald Green */

/* Slider System */
--slider-track-bg: #e5e7eb; /* Light gray track */
--slider-track-fill: #ff6a3d; /* Orange fill */
```

### Typography

- **Headings:** Space Grotesk (600-700 weight)
- **Body:** Source Serif 4 (300-400 weight)
- **Hero Values:** 3xl font-black with tight tracking
- **Labels:** 10px uppercase with wide tracking

---

## 🌍 Localization

The app supports English and Spanish with full translation coverage:

- All UI text localized
- Language-aware currency formatting (MXN/USD)
- Toast notifications in both languages
- Instant switching without page reload

Translation files: `lib/i18n/translations.ts`

---

## 💾 State Management

**Zustand** with localStorage persistence:

- User inputs automatically saved
- Scenario configurations persisted
- Language/currency preferences stored
- State restored on page reload

**What's persisted:**

- Hourly rate, hours/week, weeks worked per year
- Business and personal expenses
- Tax rate and tax mode (simple/progressive)
- Billing and spending currencies with exchange rate
- Language preference (EN/ES)
- Theme preference (light/dark)

---

## 📊 Implementation Status

### ✅ Phase 1: Core Calculator (Complete - v1.0.0)

**Snapshot View:**

- Transparent cash flow calculations
- Currency conversion (USD/MXN/EUR)
- Tax calculations (simple & progressive)
- Reality Check stats with formula tooltips
- Lifestyle Feasibility indicator
- What-If scenario planning

**Forecast View:**

- Professional UI with saturated color palette
- Scenario Builder with visible slider tracks and fill states
- Strategic Insights with conditional coaching logic
  - Safety Net Test (20% client loss scenario)
  - Burnout Check (capacity warning at >45 hrs/week)
  - Golden Lever (10% rate increase impact)
- Monthly Income Equalizer with color-coded bars
- Range Visualization as distinct outcome cards

**System:**

- Full EN/ES localization
- Dark/light themes
- Responsive design
- State persistence

### 🚧 Phase 2: AI Features (Planned - Q2 2026)

- Market rate recommendations
- Natural language queries
- Enhanced forecast view

### 💡 Phase 3: Advanced Features (Future)

- Smart forecasting with pattern recognition
- Expense intelligence
- Multi-currency portfolio tracking

See [docs/ROADMAP.md](./docs/ROADMAP.md) for detailed roadmap.

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Recommended Platform

**Vercel** (optimized for Next.js)

Alternative platforms: Netlify, AWS Amplify, Cloudflare Pages

### Environment Variables

See `.env.sample` for configuration options.

Notes:

- `EXCHANGE_RATE_API_KEY` is optional. Without it, the app can still run; currency formatting still works, but live FX conversion may be unavailable.

---

## 📝 License

**Freelance Income Planner Educational License v1.0**

- ✅ Personal, academic, non-commercial use
- ✅ Modification and redistribution (with attribution)
- ❌ Commercial use without permission
- ❌ Trademark use

See [LICENSE](./LICENSE) for full terms.

---

## 🤝 Contributing

This is a portfolio project by Robert Cushman / CushLabs.ai.

**For suggestions or feedback:**

- Email: robert@cushlabs.ai
- GitHub: Open an issue
- Website: https://cushlabs.ai

---

## 👤 Author

**Robert Cushman**  
Solo AI Engineer & Full-Stack Developer  
[CushLabs.ai](https://cushlabs.ai)

---

## 🙏 Acknowledgments

Built with modern web technologies and best practices:

- Next.js team for the amazing framework
- Vercel for hosting and deployment tools
- Tailwind CSS for the utility-first approach
- Open source community for excellent libraries

---

**Last Updated:** January 6, 2026  
**Version:** 1.0.0  
**Status:** Production Ready - Fully Translated & Documented
