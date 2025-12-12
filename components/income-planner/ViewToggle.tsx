'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'

export default function ViewToggle() {
  const { viewMode, setViewMode, language } = useIncomePlannerStore()
  const t = useTranslation(language)

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-background border border-muted-strong/20 rounded-lg p-1">
        <button
          onClick={() => setViewMode('snapshot')}
          className={`px-6 py-2 rounded-md font-semibold transition-all ${
            viewMode === 'snapshot'
              ? 'bg-accent text-white shadow-lg shadow-accent/20'
              : 'text-muted hover:text-foreground'
          }`}
        >
          {t.viewToggle.snapshot}
        </button>
        <button
          onClick={() => setViewMode('forecast')}
          className={`px-6 py-2 rounded-md font-semibold transition-all ${
            viewMode === 'forecast'
              ? 'bg-accent text-white shadow-lg shadow-accent/20'
              : 'text-muted hover:text-foreground'
          }`}
        >
          {t.viewToggle.forecast}
        </button>
      </div>
    </div>
  )
}
