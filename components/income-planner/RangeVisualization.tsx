'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome, getDefaultProgressiveTaxBrackets } from '@/lib/calculations'
import { formatCurrency } from '@/lib/formatters'
import { Card } from '@/components/ui/Card'

export default function RangeVisualization() {
  const {
    scenarios,
    taxRate,
    taxMode,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    currentSavings,
    currency,
    language,
  } = useIncomePlannerStore()
  const t = useTranslation(language)

  const taxBrackets = taxMode === 'smart' ? getDefaultProgressiveTaxBrackets(currency) : undefined

  // Calculate income for each scenario
  const pessimisticResult = calculateIncome({
    ...scenarios.pessimistic,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    currentSavings,
    taxRate,
    taxMode,
    taxBrackets,
  })

  const realisticResult = calculateIncome({
    ...scenarios.realistic,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    currentSavings,
    taxRate,
    taxMode,
    taxBrackets,
  })

  const optimisticResult = calculateIncome({
    ...scenarios.optimistic,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    currentSavings,
    taxRate,
    taxMode,
    taxBrackets,
  })

  if (
    'error' in pessimisticResult ||
    'error' in realisticResult ||
    'error' in optimisticResult
  ) {
    return (
      <Card className="p-6 text-center text-muted">
        {t.errors.unableToCalculateRange}
      </Card>
    )
  }

  const formatMoney = (value: number): string => {
    return formatCurrency({ value, currency, language, maximumFractionDigits: 0 })
  }

  const minIncome = pessimisticResult.annualNet
  const midIncome = realisticResult.annualNet
  const maxIncome = optimisticResult.annualNet
  const spread = (maxIncome / minIncome).toFixed(1)

  return (
    <Card className="p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold mb-6 text-center">
        {t.range.title}
      </h2>

      {/* Range Bar */}
      <div className="mb-8">
        <div className="relative h-16 bg-muted-strong/10 rounded-lg overflow-hidden">
          {/* Pessimistic */}
          <div
            className="absolute left-0 top-0 h-full border-r-2"
            style={{ width: '33.33%', backgroundColor: 'var(--chart-pessimistic)', opacity: 0.35, borderColor: 'var(--chart-pessimistic)' }}
          />
          {/* Realistic */}
          <div
            className="absolute left-[33.33%] top-0 h-full border-r-2"
            style={{ width: '33.33%', backgroundColor: 'var(--chart-realistic)', opacity: 0.35, borderColor: 'var(--chart-realistic)' }}
          />
          {/* Optimistic */}
          <div
            className="absolute left-[66.66%] top-0 h-full"
            style={{ width: '33.34%', backgroundColor: 'var(--chart-optimistic)', opacity: 0.35 }}
          />
        </div>

        {/* Labels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-xs text-muted mb-1">{t.scenarios.pessimistic}</p>
            <p className="font-heading text-lg font-bold" style={{ color: 'var(--chart-pessimistic)' }}>
              {formatMoney(minIncome)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted mb-1">{t.scenarios.realistic}</p>
            <p className="font-heading text-lg font-bold" style={{ color: 'var(--chart-realistic)' }}>
              {formatMoney(midIncome)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted mb-1">{t.scenarios.optimistic}</p>
            <p className="font-heading text-lg font-bold" style={{ color: 'var(--chart-optimistic)' }}>
              {formatMoney(maxIncome)}
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
            {formatMoney(maxIncome - minIncome)}
          </p>
        </div>
      </div>
    </Card>
  )
}
