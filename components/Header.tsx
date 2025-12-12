'use client'

import Link from 'next/link'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'

export default function Header() {
  const { language } = useIncomePlannerStore()
  const t = useTranslation(language)
  return (
    <header className="border-b border-muted-strong/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-heading text-xl font-bold hover:text-accent transition-colors">
            {t.header.title}
          </Link>
          <nav className="flex gap-6">
            <Link href="/income-planner" className="text-sm text-muted hover:text-foreground transition-colors">
              {t.header.incomePlanner}
            </Link>
            <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
