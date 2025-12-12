'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome } from '@/lib/calculations'

export default function ForecastInsights() {
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
    return null
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Generate insights
  const insights = []

  // 1. Realistic annual income
  insights.push({
    icon: '💡',
    text: `${t.insights.realisticIncome} ${formatCurrency(realisticResult.annualNet)}`,
  })

  // 2. Income range
  const range = optimisticResult.annualNet - pessimisticResult.annualNet
  const spread = (optimisticResult.annualNet / pessimisticResult.annualNet).toFixed(1)
  insights.push({
    icon: '📊',
    text: `${t.insights.incomeRange} ${formatCurrency(pessimisticResult.annualNet)} - ${formatCurrency(optimisticResult.annualNet)} (${spread}x ${t.insights.spread})`,
  })

  // 3. Capacity warning for optimistic
  if (scenarios.optimistic.hoursPerWeek >= 45) {
    insights.push({
      icon: '⚠️',
      text: t.insights.capacityWarning.replace('{hours}', scenarios.optimistic.hoursPerWeek.toString()),
    })
  }

  // 4. Pessimistic floor
  insights.push({
    icon: '✅',
    text: t.insights.pessimisticFloor.replace('{amount}', formatCurrency(pessimisticResult.annualNet)),
  })

  // 5. Rate impact
  const rateIncrease = realisticResult.annualNet * 0.1
  insights.push({
    icon: '💰',
    text: t.insights.rateIncrease.replace('{amount}', formatCurrency(rateIncrease)),
  })

  return (
    <div className="bg-background border border-muted-strong/20 rounded-xl p-8">
      <h2 className="font-heading text-2xl font-bold mb-6">
        {t.insights.title}
      </h2>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg"
          >
            <span className="text-2xl flex-shrink-0">{insight.icon}</span>
            <p className="text-sm text-muted leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
