'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { Button } from '@/components/ui/Button'

export default function ViewToggle() {
  const { viewMode, setViewMode, language } = useIncomePlannerStore()
  const t = useTranslation(language)

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex flex-wrap bg-background border border-muted-strong/20 rounded-lg p-1 max-w-full">
        <Button
          onClick={() => setViewMode('snapshot')}
          variant={viewMode === 'snapshot' ? 'primary' : 'ghost'}
          className={`px-4 sm:px-6 py-2 rounded-md font-semibold transition-all ${
            viewMode === 'snapshot'
              ? ''
              : 'text-muted hover:text-foreground hover:bg-transparent'
          }`}
        >
          {t.viewToggle.snapshot}
        </Button>
        <Button
          onClick={() => setViewMode('forecast')}
          variant={viewMode === 'forecast' ? 'primary' : 'ghost'}
          className={`px-4 sm:px-6 py-2 rounded-md font-semibold transition-all ${
            viewMode === 'forecast'
              ? ''
              : 'text-muted hover:text-foreground hover:bg-transparent'
          }`}
        >
          {t.viewToggle.forecast}
        </Button>
      </div>
    </div>
  )
}
