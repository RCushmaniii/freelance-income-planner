'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome } from '@/lib/calculations'

export default function RangeVisualization() {
  const { scenarios, taxRate, currency, language } = useIncomePlannerStore()
  const t = useTranslation(language)

  // Calculate income for each scenario
  const pessimisticResult = calculateIncome({
    ...scenarios.pessimistic,
    taxRate,
  })

  const realisticResult = calculateIncome({
    ...scenarios.realistic,
    taxRate,
  })

  const optimisticResult = calculateIncome({
    ...scenarios.optimistic,
    taxRate,
  })

  if (
    'error' in pessimisticResult ||
    'error' in realisticResult ||
    'error' in optimisticResult
  ) {
    return (
      <div className="bg-background border border-muted-strong/20 rounded-xl p-6 text-center text-muted">
        Unable to calculate income range. Please check your inputs.
      </div>
    )
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const minIncome = pessimisticResult.annualNet
  const midIncome = realisticResult.annualNet
  const maxIncome = optimisticResult.annualNet
  const spread = (maxIncome / minIncome).toFixed(1)

  return (
    <div className="bg-background border border-muted-strong/20 rounded-xl p-8">
      <h2 className="font-heading text-2xl font-bold mb-6 text-center">
        {t.range.title}
      </h2>

      {/* Range Bar */}
      <div className="mb-8">
        <div className="relative h-16 bg-muted-strong/10 rounded-lg overflow-hidden">
          {/* Pessimistic */}
          <div
            className="absolute left-0 top-0 h-full bg-red-500/30 border-r-2 border-red-400"
            style={{ width: '33.33%' }}
          />
          {/* Realistic */}
          <div
            className="absolute left-[33.33%] top-0 h-full bg-blue-500/30 border-r-2 border-blue-400"
            style={{ width: '33.33%' }}
          />
          {/* Optimistic */}
          <div
            className="absolute left-[66.66%] top-0 h-full bg-green-500/30"
            style={{ width: '33.34%' }}
          />
        </div>

        {/* Labels */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-xs text-muted mb-1">{t.scenarios.pessimistic}</p>
            <p className="font-heading text-lg font-bold text-red-400">
              {formatCurrency(minIncome)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted mb-1">{t.scenarios.realistic}</p>
            <p className="font-heading text-lg font-bold text-blue-400">
              {formatCurrency(midIncome)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted mb-1">{t.scenarios.optimistic}</p>
            <p className="font-heading text-lg font-bold text-green-400">
              {formatCurrency(maxIncome)}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-center">
          <p className="text-xs text-muted mb-1">{t.range.incomeSpread}</p>
          <p className="font-heading text-2xl font-bold text-accent">{spread}x</p>
        </div>
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-center">
          <p className="text-xs text-muted mb-1">{t.range.range}</p>
          <p className="font-heading text-lg font-bold">
            {formatCurrency(maxIncome - minIncome)}
          </p>
        </div>
      </div>
    </div>
  )
}
