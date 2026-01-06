'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useIncomePlannerStore()

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en'
    setLanguage(newLanguage)
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-muted-strong/30 hover:border-accent/50 transition-colors text-sm font-medium"
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      <Globe className="h-4 w-4" />
      <span className="uppercase">{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  )
}
