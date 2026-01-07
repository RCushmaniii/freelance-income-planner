'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'

export default function Footer() {
  const { language } = useIncomePlannerStore()
  const t = useTranslation(language)
  const pathname = usePathname()

  const year = new Date().getFullYear().toString()

  // Footer now shows on all pages including docs

  return (
    <footer className="border-t border-muted-strong/20 bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted text-center sm:text-left">
            {t.footer.copyright.replace('{year}', year)}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/docs"
              className="text-muted hover:text-foreground transition-colors"
            >
              {t.footer.docs}
            </Link>
            <Link
              href="/about"
              className="text-muted hover:text-foreground transition-colors"
            >
              {t.footer.about}
            </Link>
            <a
              href="https://github.com/RCushmaniii/ai-income-planner"
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-foreground transition-colors"
            >
              {t.footer.github}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
