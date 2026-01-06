# PORTFOLIO TEMPLATE

**File:** `docs/PORTFOLIO_TEMPLATE.MD`
**Purpose:** Formal template showing all required fields for a CushLabs portfolio entry

**Instructions:** Copy this entire file, rename to `PORTFOLIO.MD` in your project's `/docs` folder, and replace the example values with your project's actual data.

---

# =============================================================================

# PORTFOLIO_TEMPLATE.md — CushLabs Portfolio Entry (v2 STRICT)

# =============================================================================

# Contract:

# - The parser reads ONLY the YAML block between BEGIN/END.

# - ALL keys in the YAML block are REQUIRED (no omissions).

# - Keep copy concise. This file is for client acquisition.

# =============================================================================

--- # PORTFOLIO_YAML_BEGIN

# === VISIBILITY & ORDER ===

portfolio_enabled: true
portfolio_priority: 3 # 1-10 (1 shows first)
portfolio_featured: true
portfolio_last_reviewed: "2026-01-05" # YYYY-MM-DD

# === IDENTITY (CARD) ===

title: "CushLabs Income Planner" # Max 80 chars
tagline: "Bilingual income planning tool for freelancers demonstrating client-side architecture and type-safe calculations." # Max 140 chars
slug: "ai-income-planner" # lowercase, hyphens only (unique)

# === CLASSIFICATION (FILTERS) ===

category: "Tools" # e.g., AI Automation | Tools | Templates | Client Work
target_audience: "Freelancers and consultants seeking income planning tools, and developers evaluating React/TypeScript skills." # Max 120 chars
tags: # Exactly 3–10 tags (recommend 5–7)

- "next-js"
- "typescript"
- "zustand"
- "bilingual"
- "recharts"
- "financial-calculator"
- "client-side-app"

# === VISUALS ===

thumbnail_url: "https://ai-income-planner.vercel.app/images/screenshot-snapshot.jpg" # Required, 16:9, clean UI shot
hero_image_urls: # Required, 3–6 external URLs

- "https://ai-income-planner.vercel.app/images/screenshot-snapshot.jpg"
- "https://ai-income-planner.vercel.app/images/screenshot-forecast.jpg"
- "https://ai-income-planner.vercel.app/images/screenshot-docs.jpg"

demo_video_url: "" # Required (can be empty string)

# === LINKS ===

demo_url: "https://ai-income-planner.vercel.app/" # Required production demo link
repo_url: "https://github.com/RCushmaniii/ai-income-planner"
case_study_url: "" # Required (can be empty string)

# === SALES CONTENT (REQUIRED SECTIONS) ===

what_it_is: |
A production-grade bilingual income planning tool built with Next.js 14, demonstrating privacy-first client-side architecture and type-safe calculations. The app helps freelancers and consultants understand their effective hourly rate by accounting for unbillable time, expenses, and taxes. It showcases professional engineering discipline: pure calculation functions, Zustand state management with persistence, bilingual support, and responsive data visualization—all without requiring a backend.

why_it_matters: # Required: 3–6 bullets, measurable if possible

- "Solves real freelancer pain point: understanding effective hourly rate after unbillable time and expenses"
- "Demonstrates client-side architecture can deliver full-featured apps with zero server costs"
- "Proves bilingual support can be built cleanly without heavy i18n frameworks"
- "Shows type-safe state management with Zustand and localStorage persistence"
- "Validates that privacy-first design (no accounts, no backend) can still provide rich functionality"

how_it_works: # Required: 3–7 bullets, user flow oriented

- "User enters hourly rate, billable hours, unbillable hours, and expenses"
- "App calculates effective hourly rate, monthly income, and annual projections in real-time"
- "Snapshot mode shows single-scenario calculator with instant feedback"
- "Forecast mode allows three-scenario planning (pessimistic/realistic/optimistic)"
- "Monthly projection charts visualize income patterns with seasonal modeling"
- "All data persists in localStorage—no accounts, no backend, complete privacy"
- "Language switcher toggles between English and Spanish instantly"

# === FEATURES & PROOF ===

primary_features: # Required: 3–6 bullets (capabilities)

- "Real-time income calculations with type-safe pure functions (no side effects)"
- "Bilingual support (English/Spanish) with instant language switching"
- "Zustand state management with localStorage persistence (survives page refresh)"
- "Interactive charts with Recharts showing monthly income projections"
- "Responsive documentation viewer with markdown rendering and mobile navigation"
- "100% client-side architecture—no backend, no accounts, complete privacy"

proof: # Required: exactly 0–3 bullets (leave [] if none)

- "Deployed to production at ai-income-planner.vercel.app with zero server costs"
- "Documentation system renders 11 markdown files with responsive navigation"
- "State persistence works across sessions with no data loss"

# === TECH (REQUIRED, BUT SHORT) ===

tech_stack: # Required: 5–12 items, most important first

- "Next.js 14 (App Router)"
- "TypeScript (strict mode)"
- "Zustand (state management)"
- "Recharts (data visualization)"
- "Tailwind CSS"
- "react-markdown"
- "@tailwindcss/typography"
- "Lucide React (icons)"
- "Vercel (deployment)"

integrations: # Required: use [] if none

[]

--- # PORTFOLIO_YAML_END

# Optional: Any extra notes go below (ignored by parser).

## Development Notes

This project was built with AI assistance (Claude, Windsurf) as a collaborative tool for:

- Architecture decisions and refactoring
- Documentation generation and maintenance
- Debugging and troubleshooting
- Design system implementation

Key lessons learned documented in `/docs/LESSONS_LEARNED.md` including:

- Markdown rendering challenges and solutions
- Language detection implementation
- Responsive design patterns
- AI-assisted development workflows

## Project Evolution

- v1.0.0: Initial bilingual implementation
- v1.1.0: Refined animations and typography
- v2.0.0: Added audio narration feature
- v2.1.0: Documentation viewer with responsive design

## Technical Highlights

- Custom Tailwind breakpoint at 1180px for optimal tablet/desktop distinction
- Platform-agnostic AI engineering rules in `/docs/AI_ENGINEERING_RULES.md`
- Comprehensive pre-deployment checklist in `/docs/PRE_DEPLOYMENT_CHECKLIST.md`
- Design system documentation with typography and spacing guidelines

---

## Field Definitions & Guidelines

### Visibility & Order

- **portfolio_enabled:** `true` to show in portfolio, `false` to hide
- **portfolio_priority:** 1-10 (1 = highest priority, shows first)
- **portfolio_featured:** `true` for featured projects, `false` for regular
- **portfolio_last_reviewed:** YYYY-MM-DD format, update when content changes

### Identity

- **title:** Project name (max 80 characters)
- **tagline:** One-sentence value proposition (max 140 characters)
- **slug:** URL-safe identifier (lowercase, hyphens only, unique across portfolio)

### Classification

- **category:** Primary category (AI Automation | Tools | Templates | Client Work)
- **target_audience:** Who this is for, in plain language (max 120 characters)
- **tags:** 3-10 tags (recommend 5-7), lowercase with hyphens

### Visuals

- **thumbnail_url:** 16:9 aspect ratio, clean UI screenshot, external URL
- **hero_image_urls:** 3-6 external URLs showing key features/screens
- **demo_video_url:** YouTube/Vimeo URL or empty string

### Links

- **demo_url:** Live production URL (required)
- **repo_url:** GitHub/GitLab URL or empty string
- **case_study_url:** Blog post/case study URL or empty string

### Sales Content

- **what_it_is:** 2-4 sentences for non-technical business buyers
- **why_it_matters:** 3-6 bullets, measurable outcomes preferred
- **how_it_works:** 3-7 bullets, user flow oriented

### Features & Proof

- **primary_features:** 3-6 bullets, key capabilities
- **proof:** 0-3 bullets (use [] if none), deployment/usage/metrics

### Tech

- **tech_stack:** 5-12 items, most important first
- **integrations:** External APIs/services or [] if none

---

## Writing Guidelines

**Business-focused copy:**

- Write for decision-makers, not developers
- Emphasize outcomes over implementation
- Use measurable results when possible
- Avoid jargon and technical details in sales sections

**Concise & scannable:**

- Keep bullets under 100 characters
- Use active voice
- Lead with value, not features
- Make every word count

**Professional tone:**

- Confident without bravado
- Specific without being verbose
- Demonstrates judgment through restraint
- Assumes intelligent reader
