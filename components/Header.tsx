'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { language } = useIncomePlannerStore()
  const t = useTranslation(language)
  const pathname = usePathname()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (!mobileMenuOpen) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [mobileMenuOpen])

  // Hide header on docs pages
  if (pathname?.startsWith('/docs')) {
    return null
  }

  const linkClass = (href: string): string => {
    const isActive = pathname === href
    return `text-sm transition-colors ${
      isActive
        ? 'text-foreground'
        : 'text-muted hover:text-foreground'
    }`
  }

  return (
    <header className="border-b border-muted-strong/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:text-accent transition-colors">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="font-heading text-xl font-bold">{t.header.title}</span>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <Link href="/income-planner" className={linkClass('/income-planner')}>
                {t.header.incomePlanner}
              </Link>
              <Link href="/about" className={linkClass('/about')}>
                {t.header.about}
              </Link>
            </nav>

            <div className="hidden md:flex md:items-center md:gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-muted-strong/30 hover:border-accent/50 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t.header.openMenu}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
            aria-label={t.header.closeMenu}
          />

          <div
            role="dialog"
            aria-modal="true"
            className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-background border-l border-muted-strong/20 shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-muted-strong/20">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="font-heading text-lg font-bold">{t.header.title}</span>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-muted-strong/30 hover:border-accent/50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t.header.closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <nav className="flex flex-col gap-1">
                <Link
                  href="/income-planner"
                  className="rounded-lg px-4 py-3 text-sm font-semibold hover:bg-muted-strong/10 transition-colors"
                >
                  {t.header.incomePlanner}
                </Link>
                <Link
                  href="/about"
                  className="rounded-lg px-4 py-3 text-sm font-semibold hover:bg-muted-strong/10 transition-colors"
                >
                  {t.header.about}
                </Link>
              </nav>

              <div className="mt-6 pt-6 border-t border-muted-strong/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">{t.header.language}</span>
                  <LanguageSwitcher />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">{t.header.theme}</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
