'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import InputPanelSimplified from '@/components/income-planner/InputPanelSimplified'
import SummaryCardsSimplified from '@/components/income-planner/SummaryCardsSimplified'
import LifestyleFeasibility from '@/components/income-planner/LifestyleFeasibility'
import WhatIfSlider from '@/components/income-planner/WhatIfSlider'
import ForecastView from '@/components/income-planner/ForecastView'
import { Button } from '@/components/ui/Button'

export default function IncomePlannerPage() {
  const { viewMode, setViewMode, language } = useIncomePlannerStore()
  const t = useTranslation(language)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-2 p-1 bg-muted/10 rounded-lg border border-muted/20">
            <Button
              onClick={() => setViewMode('snapshot')}
              variant={viewMode === 'snapshot' ? 'primary' : 'ghost'}
              className="px-6 py-2"
            >
              {t.viewMode?.snapshot || 'Snapshot'}
            </Button>
            <Button
              onClick={() => setViewMode('forecast')}
              variant={viewMode === 'forecast' ? 'primary' : 'ghost'}
              className="px-6 py-2"
            >
              {t.viewMode?.forecast || 'Forecast'}
            </Button>
          </div>
        </div>

        {/* Snapshot View */}
        {viewMode === 'snapshot' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Inputs */}
            <div>
              <InputPanelSimplified />
            </div>

            {/* Right: Results */}
            <div className="space-y-8">
              <SummaryCardsSimplified />
              <WhatIfSlider />
              <LifestyleFeasibility />
            </div>
          </div>
        )}

        {/* Forecast View */}
        <ForecastView />
      </div>
    </div>
  )
}
