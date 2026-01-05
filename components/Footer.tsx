'use client'

import Link from 'next/link'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'

export default function Footer() {
  const { language } = useIncomePlannerStore()
  const t = useTranslation(language)

  const year = new Date().getFullYear().toString()

  return (
    <footer className="border-t border-muted-strong/20">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-heading text-lg font-bold hover:text-accent transition-colors"
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              <span>{t.header.title}</span>
            </Link>
            <p className="text-sm text-muted max-w-md">{t.hero.note}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-widest text-muted-strong">
                {t.footer.docs}
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href="https://github.com/RCushmaniii/ai-income-generator/tree/main/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {t.footer.docs}
                </a>
                <a
                  href="https://github.com/RCushmaniii/ai-income-generator/blob/main/docs/PRD.md"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {t.footer.prd}
                </a>
                <a
                  href="https://github.com/RCushmaniii/ai-income-generator/blob/main/docs/PREDEPLOY_AUDIT.md"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {t.footer.predeployAudit}
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-widest text-muted-strong">
                {t.header.title}
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <Link
                  href="/income-planner"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {t.footer.incomePlanner}
                </Link>
                <Link
                  href="/about"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {t.footer.about}
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-widest text-muted-strong">
                {t.footer.github}
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href="https://github.com/RCushmaniii/ai-income-generator"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {t.footer.github}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-muted-strong/20 pt-6 text-xs text-muted">
          <p>{t.footer.copyright.replace('{year}', year)}</p>
        </div>
      </div>
    </footer>
  )
}
