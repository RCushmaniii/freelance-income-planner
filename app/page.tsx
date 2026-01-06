'use client'

import Link from 'next/link'
import { Zap, Target, Handshake } from 'lucide-react'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'

export default function Home() {
  const { language } = useIncomePlannerStore()
  const t = useTranslation(language)
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-16 max-w-5xl text-center">
        {/* CushLabs branding dot */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <span className="text-xs font-semibold tracking-widest text-muted-strong">
            {t.home.tagline}
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
          {t.home.headline}
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
          {t.home.subheading}
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/income-planner"
            className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg shadow-accent/20 inline-block"
          >
            {t.home.ctaPrimary}
          </Link>
          <Link
            href="/about"
            className="bg-background border border-muted-strong/30 text-foreground hover:border-accent/50 font-semibold px-8 py-4 rounded-lg transition-all inline-block"
          >
            {t.home.ctaSecondary}
          </Link>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-background border border-muted-strong/20 rounded-xl p-6 hover:border-accent/30 transition-colors">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-lg font-bold mb-2">
              {t.home.features.fast.title}
            </h3>
            <p className="text-sm text-muted">
              {t.home.features.fast.description}
            </p>
          </div>

          <div className="bg-background border border-muted-strong/20 rounded-xl p-6 hover:border-accent/30 transition-colors">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-lg font-bold mb-2">
              {t.home.features.realUse.title}
            </h3>
            <p className="text-sm text-muted">
              {t.home.features.realUse.description}
            </p>
          </div>

          <div className="bg-background border border-muted-strong/20 rounded-xl p-6 hover:border-accent/30 transition-colors">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Handshake className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-lg font-bold mb-2">
              {t.home.features.personal.title}
            </h3>
            <p className="text-sm text-muted">
              {t.home.features.personal.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
