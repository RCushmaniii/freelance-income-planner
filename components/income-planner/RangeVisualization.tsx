'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome, getDefaultProgressiveTaxBrackets } from '@/lib/calculations'
import { formatCurrency } from '@/lib/formatters'
import { convertCurrency } from '@/lib/currency-conversion'
import { Card } from '@/components/ui/Card'
import { TrendingDown, Minus, TrendingUp } from 'lucide-react'

export default function RangeVisualization() {
  const {
    scenarios,
    taxRate,
    taxMode,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    currentSavings,
    billingCurrency,
    spendingCurrency,
    userExchangeRate,
    language,
  } = useIncomePlannerStore()
  const t = useTranslation(language)

  const taxBrackets = taxMode === 'smart' ? getDefaultProgressiveTaxBrackets(billingCurrency) : undefined

  // Convert from billing currency to spending currency
  const convertToSpending = (amount: number): number => {
    return convertCurrency({
      amount,
      fromCurrency: billingCurrency,
      toCurrency: spendingCurrency,
      exchangeRate: userExchangeRate,
      billingCurrency,
      spendingCurrency,
    })
  }

  // Convert from spending currency to billing currency
  const convertToBilling = (amount: number): number => {
    return convertCurrency({
      amount,
      fromCurrency: spendingCurrency,
      toCurrency: billingCurrency,
      exchangeRate: userExchangeRate,
      billingCurrency,
      spendingCurrency,
    })
  }

  // Calculate income for each scenario (convert expenses to billing currency)
  const pessimisticResult = calculateIncome({
    ...scenarios.pessimistic,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
    monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
    currentSavings,
    taxRate,
    taxMode,
    taxBrackets,
  })

  const realisticResult = calculateIncome({
    ...scenarios.realistic,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
    monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
    currentSavings,
    taxRate,
    taxMode,
    taxBrackets,
  })

  const optimisticResult = calculateIncome({
    ...scenarios.optimistic,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
    monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
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
    const converted = convertToSpending(value)
    return formatCurrency({ value: converted, currency: spendingCurrency, language, maximumFractionDigits: 0 })
  }

  const minIncome = convertToSpending(pessimisticResult.annualNet)
  const midIncome = convertToSpending(realisticResult.annualNet)
  const maxIncome = convertToSpending(optimisticResult.annualNet)
  const spread = (maxIncome / minIncome).toFixed(1)

  return (
    <div className="bg-card-bg p-6 rounded-xl border border-card-border shadow-sm">
      <h3 className="text-sm font-bold mb-6">{t.range.title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pessimistic - Slate Gray */}
        <div className="p-4 rounded-lg border-l-4" style={{ 
          backgroundColor: 'rgba(100, 116, 139, 0.1)',
          borderColor: 'var(--chart-pessimistic)'
        }}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown size={16} style={{ color: 'var(--chart-pessimistic)' }} />
            <span className="text-xs font-bold uppercase" style={{ color: 'var(--chart-pessimistic)' }}>
              {t.scenarios.pessimistic}
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: 'var(--chart-pessimistic)' }}>
            {formatMoney(minIncome)}
          </p>
          <p className="text-xs text-muted mt-1">{t.scenarios.pessimisticDesc}</p>
        </div>

        {/* Realistic - Royal Blue (Highlighted) */}
        <div className="p-4 rounded-lg border-l-4 shadow-sm transform md:scale-105 z-10" style={{ 
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'var(--chart-realistic)'
        }}>
          <div className="flex items-center gap-2 mb-1">
            <Minus size={16} style={{ color: 'var(--chart-realistic)' }} />
            <span className="text-xs font-bold uppercase" style={{ color: 'var(--chart-realistic)' }}>
              {t.scenarios.realistic}
            </span>
          </div>
          <p className="text-3xl font-bold" style={{ color: 'var(--chart-realistic)' }}>
            {formatMoney(midIncome)}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--chart-realistic)' }}>{t.scenarios.realisticDesc}</p>
        </div>

        {/* Optimistic - Emerald Green */}
        <div className="p-4 rounded-lg border-l-4" style={{ 
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: 'var(--chart-optimistic)'
        }}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} style={{ color: 'var(--chart-optimistic)' }} />
            <span className="text-xs font-bold uppercase" style={{ color: 'var(--chart-optimistic)' }}>
              {t.scenarios.optimistic}
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: 'var(--chart-optimistic)' }}>
            {formatMoney(maxIncome)}
          </p>
          <p className="text-xs text-muted mt-1">{t.scenarios.optimisticDesc}</p>
        </div>
      </div>
    </div>
  )
}
