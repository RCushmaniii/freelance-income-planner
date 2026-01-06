---
title: CushLabs Income Planner
description: A bilingual income planning tool for freelancers and consultants.
order: 0
---

# CushLabs Income Planner

**A beautiful, bilingual income planning tool for freelancers and consultants.**

Built with Next.js, TypeScript, and Tailwind CSS by [CushLabs.ai](https://cushlabs.ai)

---

## ✨ Features

- **Snapshot Mode** - Single-scenario calculator with real-time income calculations
- **Rate Benchmark (Example)** - Snapshot includes a static example market benchmark panel (no AI calls)
- **Forecast Mode** - Three-scenario planning (Pessimistic/Realistic/Optimistic)
- **Monthly Projections** - Interactive charts with seasonal pattern modeling
- **Documentation Viewer** - Responsive docs with left sidebar navigation and markdown rendering
- **Full Localization** - Complete EN/ES translation system
- **State Persistence** - localStorage saves your scenarios automatically
- **Theme Switching** - Global light/dark theme with system preference default
- **Responsive Design** - Works beautifully on mobile and desktop

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

### Colors

```css
--background: #000000; /* Dark */
--foreground: #ffffff;
--accent: #ff6a3d;
--muted: #aaaaaa;
--muted-strong: #888888;
```

### Typography

- **Headings:** Space Grotesk (600-700 weight)
- **Body:** Source Serif 4 (300-400 weight)

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

- Hourly rate, hours/week, vacation weeks, tax rate
- All three forecast scenarios
- View mode (Snapshot/Forecast)
- Currency preference (MXN/USD)
- Language preference (EN/ES)

---

## 📊 Implementation Status

### ✅ Completed Phases

- **Phase 1:** Architecture & Setup
- **Phase 2:** Layout & Design
- **Phase 3:** Calculator Logic
- **Phase 3B:** Forecasting Feature
- **Phase 3C:** Advanced Charts
- **Phase 4:** Localization & Persistence

### 🔄 Next Phase

- **Phase 5:** Analytics & Monitoring (Planned)

See [docs/ROADMAP.md](./docs/ROADMAP.md) for the complete roadmap.

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

**CushLabs Income Planner Educational License v1.0**

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

**Last Updated:** January 5, 2026  
**Version:** 1.1  
**Status:** Production Ready
