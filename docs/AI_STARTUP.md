# AI STARTUP

**File:** `docs/AI_STARTUP.md`
**Purpose:** Index of critical context. Read this first to orient yourself.

---

## 1. Project Identity

**Name:** CushLabs Income Planner
**Context:** A bilingual (EN/ES) income planning tool for freelancers and consultants.
**Core Philosophy:** Privacy-first, client-side calculations. Beautiful UI with instant feedback. No accounts, no backend required.

---

## 2. Project Context

**For Product Requirements:**

- [docs/PRD.md](docs/PRD.md)
- _Contains:_ Product vision, feature specifications, calculation logic, and implementation notes.

**For Project Architecture:**

- [README.md](README.md)
- _Contains:_ Quick start guide, tech stack, project structure, and deployment instructions.

**For Design & Branding:**

- [docs/DESIGN.md](docs/DESIGN.md)
- _Contains:_ Design system, color palette, typography, component patterns, and UI guidelines.

**For Brand Identity:**

- [docs/BRAND.md](docs/BRAND.md)
- _Contains:_ Brand voice, messaging, positioning, and visual identity guidelines.

**For Coding Principles:**

- [docs/AI_ENGINEERING_RULES.md](docs/AI_ENGINEERING_RULES.md)
- _Contains:_ Engineering best practices, architecture patterns, and code quality standards.

**For AI Collaboration:**

- [docs/SKILL-WORKING-WITH-HUMANS.md](docs/SKILL-WORKING-WITH-HUMANS.md)
- _Contains:_ Communication style, how to handle ambiguity, and collaboration protocols.

**For History & Patterns:**

- [docs/LESSONS_LEARNED.md](docs/LESSONS_LEARNED.md)
- _Contains:_ Solutions to previous bugs, implementation decisions, and lessons from building this project.

**For Deployment:**

- [docs/PREDEPLOY_AUDIT.md](docs/PREDEPLOY_AUDIT.md)
- _Contains:_ Pre-deployment checklist, testing requirements, and quality gates.

**For Roadmap:**

- [docs/ROADMAP.md](docs/ROADMAP.md)
- _Contains:_ Planned features, future enhancements, and version history.

---

## 3. Quick Technical Facts

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand with localStorage persistence
- **i18n:** EN/ES bilingual support
- **Charts:** Recharts for monthly projections
- **Deployment:** Vercel
- **Key Feature:** 100% client-side calculations (no backend required)

---

## 4. Tech Stack

**Core:**

- Next.js 14.2.33 (App Router)
- React 18
- TypeScript 5

**UI & Styling:**

- Tailwind CSS
- Lucide React (icons)
- react-hot-toast (notifications)

**State & Data:**

- Zustand (global state)
- Recharts (data visualization)
- gray-matter (markdown frontmatter)
- react-markdown (documentation viewer)

**Development:**

- ESLint
- TypeScript strict mode
- Prettier (via Tailwind plugin)
