'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'

export default function MonthlyIncomeEqualizer() {
  const { language, monthlyMultipliers, setMonthlyMultipliers } = useIncomePlannerStore()
  const t = useTranslation(language)

  const MONTHS = [
    t.months.jan, t.months.feb, t.months.mar, t.months.apr,
    t.months.may, t.months.jun, t.months.jul, t.months.aug,
    t.months.sep, t.months.oct, t.months.nov, t.months.dec
  ]

  const handleMultiplierChange = (monthIndex: number, value: number) => {
    const newMultipliers = [...monthlyMultipliers]
    newMultipliers[monthIndex] = value
    setMonthlyMultipliers(newMultipliers)
  }

  const resetToSteady = () => {
    setMonthlyMultipliers(Array(12).fill(1.0))
  }

  const setQ4Heavy = () => {
    const pattern = [0.8, 0.8, 0.9, 0.9, 1.0, 1.0, 0.9, 0.9, 1.0, 1.1, 1.3, 1.4]
    setMonthlyMultipliers(pattern)
  }

  const setSummerSlow = () => {
    const pattern = [1.1, 1.0, 1.0, 1.0, 0.8, 0.7, 0.7, 0.8, 1.0, 1.1, 1.1, 1.0]
    setMonthlyMultipliers(pattern)
  }

  const getBarColor = (multiplier: number): string => {
    if (multiplier < 0.8) return '#ef4444' // Red for low months
    if (multiplier > 1.2) return '#10b981' // Green for high months
    return '#ff6a3d' // Orange for normal months
  }
  
  const getBarHeight = (multiplier: number): number => {
    // Map 0.5-2.0 range to 25%-100% height (0.5 = 25%, 2.0 = 100%)
    return ((multiplier - 0.5) / 1.5) * 100
  }

  return (
    <Card className="p-6 md:p-8 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/30">
      <div className="mb-6">
        <h3 className="font-heading text-xl font-bold mb-2">
          {t.chart.monthlyVariation}
        </h3>
        <p className="text-sm text-muted mb-4">
          {t.chart.seasonalityDescription}
        </p>
        <div className="flex gap-2">
          <button
            onClick={resetToSteady}
            className="text-xs px-4 py-2 rounded-lg bg-background border border-muted-strong/30 hover:border-accent/50 hover:bg-accent/5 transition-colors font-medium"
          >
            🟰 {t.chart.steady}
          </button>
          <button
            onClick={setQ4Heavy}
            className="text-xs px-4 py-2 rounded-lg bg-background border border-muted-strong/30 hover:border-accent/50 hover:bg-accent/5 transition-colors font-medium"
          >
            📈 {t.chart.q4Heavy}
          </button>
          <button
            onClick={setSummerSlow}
            className="text-xs px-4 py-2 rounded-lg bg-background border border-muted-strong/30 hover:border-accent/50 hover:bg-accent/5 transition-colors font-medium"
          >
            🏖️ {t.chart.summerSlow}
          </button>
        </div>
      </div>

      {/* Equalizer Sliders */}
      <div className="bg-card-bg rounded-lg p-6 border border-card-border shadow-sm">
        <div className="flex justify-between items-end h-64 px-2 pb-2 border-b border-card-border relative">
          {/* 100% Baseline Marker */}
          <div className="absolute bottom-1/2 left-0 right-0 h-0.5 bg-muted-strong/30 z-0" />
          
          {monthlyMultipliers.map((multiplier, index) => (
            <div key={index} className="flex flex-col items-center gap-2 group cursor-pointer h-full relative z-10">
              {/* Value Label on Hover */}
              <div className="h-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold" style={{ color: getBarColor(multiplier) }}>
                {Math.round(multiplier * 100)}%
              </div>

              {/* The Track Container */}
              <div className="relative w-4 h-full rounded-full overflow-hidden border-2 border-card-border" style={{ background: 'var(--slider-track-bg)' }}>
                {/* The Fill (from bottom) */}
                <div 
                  className="absolute bottom-0 w-full rounded-b-full transition-all duration-300"
                  style={{ 
                    height: `${getBarHeight(multiplier)}%`,
                    backgroundColor: getBarColor(multiplier)
                  }}
                />
                
                {/* Hidden range input for interaction */}
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={multiplier}
                  onChange={(e) => handleMultiplierChange(index, parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  style={{
                    writingMode: 'vertical-lr' as const,
                    direction: 'rtl',
                  }}
                  title={`${MONTHS[index]}: ${Math.round(multiplier * 100)}%`}
                  aria-label={`${MONTHS[index]} income multiplier: ${Math.round(multiplier * 100)}%`}
                  aria-orientation="vertical"
                />
              </div>
              
              <span className="text-xs font-bold text-muted uppercase">{MONTHS[index]}</span>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 text-[10px] font-bold text-muted uppercase">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ef4444' }} />
            <span>{t.chart.legendLow}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ff6a3d' }} />
            <span>{t.chart.legendNormal}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10b981' }} />
            <span>{t.chart.legendHigh}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
