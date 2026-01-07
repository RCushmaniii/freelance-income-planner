'use client'

import { useState } from 'react'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome } from '@/lib/calculations'
import { formatCurrency } from '@/lib/formatters'
import { convertCurrency } from '@/lib/currency-conversion'
import { Card } from '@/components/ui/Card'

export default function WhatIfSlider() {
  const {
    hourlyRate,
    hoursPerWeek,
    weeksWorkedPerYear,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    taxRate,
    taxMode,
    billingCurrency,
    spendingCurrency,
    userExchangeRate,
    language,
  } = useIncomePlannerStore()

  const t = useTranslation(language)
  const [adjustment, setAdjustment] = useState(0)

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

  // Convert expenses from spending currency to billing currency for calculation engine
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

  // Current scenario
  const currentConfig = {
    hourlyRate,
    hoursPerWeek,
    unbillableHoursPerWeek: 0,
    vacationWeeks: 52 - weeksWorkedPerYear,
    monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
    monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
    currentSavings: null,
    taxRate,
    taxMode,
  }

  const currentResult = calculateIncome(currentConfig)

  // What-if scenario
  const scenarioRate = hourlyRate * (1 + adjustment / 100)
  const scenarioConfig = {
    hourlyRate: scenarioRate,
    hoursPerWeek,
    unbillableHoursPerWeek: 0,
    vacationWeeks: 52 - weeksWorkedPerYear,
    monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
    monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
    currentSavings: null,
    taxRate,
    taxMode,
  }

  const scenarioResult = calculateIncome(scenarioConfig)

  if (!currentResult || 'error' in currentResult || !scenarioResult || 'error' in scenarioResult) {
    return null
  }

  // Calculate true net leftover for both scenarios (including personal expenses)
  const weeksPerMonth = 52 / 12
  const monthlyPersonalExp = monthlyPersonalNeed || 0

  // Current scenario net leftover
  const currentMonthlyGross = hourlyRate * hoursPerWeek * weeksPerMonth
  const currentMonthlyGrossInSpending = convertToSpending(currentMonthlyGross)
  const currentMonthlyTax = convertToSpending(currentResult.annualTaxPaid / 12)
  const currentNetLeftover = currentMonthlyGrossInSpending - currentMonthlyTax - convertToSpending(convertToBilling(monthlyBusinessExpenses)) - convertToSpending(convertToBilling(monthlyPersonalExp))
  const currentAnnualLeftover = currentNetLeftover * 12

  // Scenario net leftover
  const scenarioMonthlyGross = scenarioRate * hoursPerWeek * weeksPerMonth
  const scenarioMonthlyGrossInSpending = convertToSpending(scenarioMonthlyGross)
  const scenarioMonthlyTax = convertToSpending(scenarioResult.annualTaxPaid / 12)
  const scenarioNetLeftover = scenarioMonthlyGrossInSpending - scenarioMonthlyTax - convertToSpending(convertToBilling(monthlyBusinessExpenses)) - convertToSpending(convertToBilling(monthlyPersonalExp))
  const scenarioAnnualLeftover = scenarioNetLeftover * 12

  // Calculate difference
  const annualDiff = scenarioAnnualLeftover - currentAnnualLeftover

  const formatMoney = (value: number): string => {
    return formatCurrency({ value, currency: spendingCurrency, language, maximumFractionDigits: 0 })
  }

  const formatRate = (value: number): string => {
    return formatCurrency({ value, currency: billingCurrency, language, maximumFractionDigits: 0 })
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <h3 className="font-heading font-bold text-lg mb-2">What If?</h3>
      <p className="text-sm text-muted mb-4">
        Adjust your hourly rate to see the impact on your annual net leftover.
      </p>

      {/* Three-column layout: Current | New Rate + Change | Percentage */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Left: Current Rate */}
        <div className="text-center">
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Current</p>
          <p className="text-4xl font-bold text-foreground">{formatRate(hourlyRate)}</p>
          <p className="text-sm text-muted mt-1">{formatMoney(currentAnnualLeftover)}/yr</p>
        </div>

        {/* Middle: New Rate + Amount Change */}
        <div className="text-center border-l border-r border-blue-200 dark:border-blue-800 px-2">
          <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">New Rate</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatRate(Math.round(scenarioRate))}</p>
          <p className={`text-sm font-semibold mt-1 ${annualDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {annualDiff > 0 ? '+' : ''}{formatMoney(Math.round(annualDiff))}/yr
          </p>
        </div>

        {/* Right: Percentage Change */}
        <div className="text-center">
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Change</p>
          <p className={`text-2xl font-bold ${adjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {adjustment > 0 ? '+' : ''}{adjustment}%
          </p>
          <p className="text-xs text-muted mt-1">{formatMoney(scenarioAnnualLeftover)}/yr</p>
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="-20"
        max="50"
        value={adjustment}
        onChange={(e) => setAdjustment(parseInt(e.target.value))}
        className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-muted mt-1">
        <span>-20%</span>
        <span>0%</span>
        <span>+50%</span>
      </div>
    </Card>
  )
}
