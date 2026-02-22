'use client'

import { useState } from 'react'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome } from '@/lib/calculations'
import { formatCurrency } from '@/lib/formatters'
import { convertCurrency } from '@/lib/currency-conversion'
import { Card } from '@/components/ui/Card'
import { ChevronDown, ChevronUp, BarChart3, Info } from 'lucide-react'
import CalculationBreakdown from './CalculationBreakdown'

export default function SummaryCardsSimplified() {
  const [isRealityCheckExpanded, setIsRealityCheckExpanded] = useState(false)
  const {
    hourlyRate,
    hoursPerWeek,
    weeksWorkedPerYear,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    taxRate,
    billingCurrency,
    spendingCurrency,
    userExchangeRate,
    language,
  } = useIncomePlannerStore()

  const t = useTranslation(language)

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

  const config = {
    hourlyRate,
    hoursPerWeek,
    unbillableHoursPerWeek: 0,
    vacationWeeks: 52 - weeksWorkedPerYear,
    monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
    monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
    currentSavings: null,
    taxRate,
  }

  const result = calculateIncome(config)

  if (!result || 'error' in result) {
    return (
      <Card className="p-6">
        <p className="text-muted">{t.errors.unableToCalculateIncome}</p>
      </Card>
    )
  }

  // Convert calculated values from billing currency to spending currency
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

  // Use engine values for consistency (accounts for vacation weeks correctly)
  const netLeftover = Math.round(convertToSpending(result.monthlyNet))
  const annualNetLeftover = Math.round(convertToSpending(result.annualNet))
  const weeklyNetLeftover = Math.round(convertToSpending(result.weeklyNet))

  // Gross per year from engine (before ANY deductions)
  const annualGrossInSpending = convertToSpending(result.annualGross)

  // Effective hourly rate from engine (net income ÷ total hours worked)
  const effectiveHourlyRate = convertToSpending(result.effectiveHourlyRate)

  const formatMoney = (value: number): string => {
    return formatCurrency({ value, currency: spendingCurrency, language, maximumFractionDigits: 0 })
  }

  const formatRate = (value: number): string => {
    const converted = convertToSpending(value)
    return formatCurrency({ value: converted, currency: spendingCurrency, language, maximumFractionDigits: 2 })
  }
  
  const formatRateDirect = (value: number): string => {
    return formatCurrency({ value, currency: spendingCurrency, language, maximumFractionDigits: 2 })
  }

  return (
    <div className="space-y-6">
      {/* Big Number - Net Monthly Income (True Net Leftover) */}
      <Card className="p-8 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
        <div className="text-center">
          <p className="text-sm font-semibold text-muted-strong uppercase tracking-wide mb-2">
            {t.summary.netMonthlyIncome}
          </p>
          <p className="text-5xl md:text-6xl font-heading font-bold text-accent mb-2">
            {formatMoney(netLeftover)}
          </p>
          <p className="text-sm text-muted">
            {t.summary.netAfterTaxExpenses}
          </p>
        </div>
      </Card>

      {/* Calculation Breakdown - Shows the math */}
      <CalculationBreakdown />

      {/* Reality Check Stats - Collapsible */}
      <div className="border border-muted/30 rounded-lg overflow-hidden">
        {/* Toggle Button */}
        <button
          onClick={() => setIsRealityCheckExpanded(!isRealityCheckExpanded)}
          className="w-full px-4 py-3 bg-muted/5 hover:bg-muted/10 transition-colors flex items-center justify-between text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-muted-strong" />
            <span>{t.summary.realityTitle}</span>
          </div>
          {isRealityCheckExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-strong" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-strong" />
          )}
        </button>

        {/* Reality Check Content */}
        {isRealityCheckExpanded && (
          <div className="p-4 bg-background border-t border-muted/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Effective Hourly Rate */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <p className="text-xs text-muted-strong uppercase tracking-wide">
                    {t.summary.effectiveHourlyRate}
                  </p>
                  <div className="group relative">
                    <Info className="w-3 h-3 text-muted cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                      Net Annual ÷ Hours Worked = {formatMoney(annualNetLeftover)} ÷ ({hoursPerWeek} hrs × {weeksWorkedPerYear} wks)
                    </div>
                  </div>
                </div>
                <p className="text-2xl font-bold">{formatRateDirect(effectiveHourlyRate)}</p>
                <p className="text-xs text-muted">
                  {t.summary.afterTaxesTimeOff}
                </p>
              </div>

              {/* Gross Per Year */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <p className="text-xs text-muted-strong uppercase tracking-wide">
                    {t.summary.gross} {t.summary.perYear}
                  </p>
                  <div className="group relative">
                    <Info className="w-3 h-3 text-muted cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                      {formatRate(hourlyRate)}/hr × {hoursPerWeek} hrs/wk × {weeksWorkedPerYear} wks/yr
                    </div>
                  </div>
                </div>
                <p className="text-2xl font-bold">{formatMoney(annualGrossInSpending)}</p>
                <p className="text-xs text-muted">
                  {t.summary.beforeDeductions}
                </p>
              </div>

              {/* Net Per Year */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <p className="text-xs text-muted-strong uppercase tracking-wide">
                    {t.summary.net} {t.summary.perYear}
                  </p>
                  <div className="group relative">
                    <Info className="w-3 h-3 text-muted cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                      Net Monthly × 12 = {formatMoney(netLeftover)} × 12
                    </div>
                  </div>
                </div>
                <p className="text-2xl font-bold">{formatMoney(annualNetLeftover)}</p>
                <p className="text-xs text-muted">
                  {t.summary.yourTakeHomePay}
                </p>
              </div>

              {/* Net Per Week */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <p className="text-xs text-muted-strong uppercase tracking-wide">
                    {t.summary.net} {t.summary.perWeek}
                  </p>
                  <div className="group relative">
                    <Info className="w-3 h-3 text-muted cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                      Net Annual ÷ 52 = {formatMoney(annualNetLeftover)} ÷ 52 weeks
                    </div>
                  </div>
                </div>
                <p className="text-2xl font-bold">{formatMoney(weeklyNetLeftover)}</p>
                <p className="text-xs text-muted">
                  {t.summary.averagePerWeek}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
