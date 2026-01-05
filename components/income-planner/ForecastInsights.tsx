'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import {
  calculateIncome,
  calculateRequiredHourlyRateForAnnualNet,
  getDefaultProgressiveTaxBrackets,
} from '@/lib/calculations'
import { formatCurrency } from '@/lib/formatters'
import {
  Lightbulb,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  Compass,
  Target,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'

export default function ForecastInsights() {
  const {
    scenarios,
    taxRate,
    taxMode,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    currentSavings,
    targetAnnualNet,
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
    return null
  }

  const formatMoney = (value: number): string => {
    return formatCurrency({ value, currency, language, maximumFractionDigits: 0 })
  }

  // Generate insights
  const insights: Array<{ Icon: React.ComponentType<{ className?: string }>; text: string }> = []

  // 1. Realistic annual income
  insights.push({
    Icon: Lightbulb,
    text: `${t.insights.realisticIncome} ${formatMoney(realisticResult.annualNet)}`,
  })

  if (typeof targetAnnualNet === 'number' && Number.isFinite(targetAnnualNet) && targetAnnualNet > 0) {
    const delta = realisticResult.annualNet - targetAnnualNet
    const isAhead = delta >= 0

    const requiredRate = (() => {
      if (isAhead) return null
      const req = calculateRequiredHourlyRateForAnnualNet(
        {
          ...scenarios.realistic,
          unbillableHoursPerWeek,
          monthlyBusinessExpenses,
          monthlyPersonalNeed,
          currentSavings,
          taxRate,
          taxMode,
          taxBrackets,
        },
        targetAnnualNet
      )
      return 'error' in req ? null : req.requiredRate
    })()

    insights.push({
      Icon: Target,
      text: isAhead
        ? `${t.summary.goalAheadBy} ${formatMoney(Math.abs(delta))}`
        : `${t.summary.goalBehindBy} ${formatMoney(Math.abs(delta))}${typeof requiredRate === 'number' ? ` — ${t.summary.goalRequiredRate} ${formatMoney(requiredRate)}/hr` : ''}`,
    })
  }

  // 2. Income range
  const range = optimisticResult.annualNet - pessimisticResult.annualNet
  const spread = (optimisticResult.annualNet / pessimisticResult.annualNet).toFixed(1)
  insights.push({
    Icon: BarChart3,
    text: `${t.insights.incomeRange} ${formatMoney(pessimisticResult.annualNet)} - ${formatMoney(optimisticResult.annualNet)} (${spread}x ${t.insights.spread})`,
  })

  // 3. Capacity warning for optimistic
  if (scenarios.optimistic.hoursPerWeek >= 45) {
    insights.push({
      Icon: AlertTriangle,
      text: t.insights.capacityWarning.replace('{hours}', scenarios.optimistic.hoursPerWeek.toString()),
    })
  }

  // 4. Pessimistic floor
  insights.push({
    Icon: CheckCircle2,
    text: t.insights.pessimisticFloor.replace('{amount}', formatMoney(pessimisticResult.annualNet)),
  })

  // 5. Rate impact
  const rateIncrease = realisticResult.annualNet * 0.1
  insights.push({
    Icon: CircleDollarSign,
    text: t.insights.rateIncrease.replace('{amount}', formatMoney(rateIncrease)),
  })

  if (realisticResult.runwayIsSustainable) {
    insights.push({
      Icon: Compass,
      text: `${t.summary.runway}: ${t.summary.runwaySustainable}`,
    })
  } else if (typeof realisticResult.runwayMonths === 'number') {
    insights.push({
      Icon: Compass,
      text: `${t.summary.runway}: ${realisticResult.runwayMonths.toFixed(1)}`,
    })
  }

  return (
    <Card className="p-8">
      <h2 className="font-heading text-2xl font-bold mb-6">
        {t.insights.title}
      </h2>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg"
          >
            <span className="flex-shrink-0 mt-0.5">
              <insight.Icon className="w-5 h-5 text-accent" />
            </span>
            <p className="text-sm text-muted leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
