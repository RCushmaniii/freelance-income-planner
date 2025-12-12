'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'

export default function Hero() {
  const { language } = useIncomePlannerStore()
  const t = useTranslation(language)
  return (
    <section className="border-b border-muted-strong/20 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        {/* CushLabs branding dot */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <span className="text-xs font-semibold tracking-widest text-muted-strong">CUSHLABS.AI</span>
        </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
          {t.hero.title}
        </h1>
        
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8">
          {t.hero.subtitle}
        </p>
        
        <p className="text-sm text-muted-strong">
          {t.hero.note}
        </p>
      </div>
    </section>
  )
}
