'use client'

import { useState } from 'react'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome } from '@/lib/calculations'
import { formatCurrency } from '@/lib/formatters'
import { convertCurrency } from '@/lib/currency-conversion'
import { ChevronDown, ChevronUp, Receipt } from 'lucide-react'

export default function CalculationBreakdown() {
  const [isExpanded, setIsExpanded] = useState(false)

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

  const isCrossCurrency = billingCurrency !== spendingCurrency
  const activeExchangeRate = isCrossCurrency ? (userExchangeRate ?? 1) : 1

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
    taxMode,
  }

  const result = calculateIncome(config)

  if (!result || 'error' in result) {
    return null
  }

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

  // Use engine values for consistency (accounts for vacation weeks correctly)
  const monthlyGrossBilling = result.monthlyGross
  const monthlyGrossInSpending = convertToSpending(monthlyGrossBilling)
  const monthlyTax = convertToSpending(result.annualTaxPaid / 12)
  const monthlyBusinessExp = monthlyBusinessExpenses
  const monthlyPersonalExp = monthlyPersonalNeed || 0
  const weeksPerMonth = weeksWorkedPerYear / 12

  // Total burn rate = taxes + business + personal expenses (all cash going out)
  const totalBurnRate = monthlyTax + monthlyBusinessExp + monthlyPersonalExp

  // Net leftover = gross - taxes - business - personal
  const netLeftover = monthlyGrossInSpending - monthlyTax - monthlyBusinessExp - monthlyPersonalExp

  const formatMoney = (value: number, currency = spendingCurrency): string => {
    return formatCurrency({ value, currency, language, maximumFractionDigits: 0 })
  }

  const formatMoneyBilling = (value: number): string => {
    return formatCurrency({ value, currency: billingCurrency, language, maximumFractionDigits: 0 })
  }

  return (
    <div className="border border-muted/30 rounded-lg overflow-hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 bg-muted/5 hover:bg-muted/10 transition-colors flex items-center justify-between text-sm font-medium"
      >
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4 text-muted-strong" />
          <span>{t.breakdown?.title || 'See how this is calculated'}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-strong" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-strong" />
        )}
      </button>

      {/* Breakdown Content - Cash Flow Logic */}
      {isExpanded && (
        <div className="p-4 bg-background space-y-3 text-sm border-t border-muted/20">
          
          {/* REVENUE - Gross Billings */}
          <div className="flex justify-between items-center pb-2 border-b border-muted/20">
            <span className="font-bold text-gray-700">{t.breakdown?.grossBillings || 'Gross Billings'}</span>
            <span className="font-bold text-gray-900">
              {isCrossCurrency ? formatMoneyBilling(monthlyGrossBilling) : formatMoney(monthlyGrossBilling)}
            </span>
          </div>
          <div className="text-xs text-muted pl-4 -mt-2 mb-3">
            {hoursPerWeek} hrs/wk × {formatMoneyBilling(hourlyRate)}/hr × {weeksPerMonth.toFixed(2)} wks/mo
          </div>

          {/* Currency Conversion (if applicable) */}
          {isCrossCurrency && (
            <div className="space-y-1 bg-blue-50 dark:bg-blue-950/20 p-2 rounded mb-3">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-blue-700 dark:text-blue-400">
                  {t.breakdown?.converted || 'Converted to'} {spendingCurrency}
                </span>
                <span className="font-semibold text-blue-700 dark:text-blue-400">
                  {formatMoney(monthlyGrossInSpending)}
                </span>
              </div>
              <div className="text-xs text-muted pl-4">
                {formatMoneyBilling(monthlyGrossBilling)} × {activeExchangeRate.toFixed(2)} {spendingCurrency}/{billingCurrency}
              </div>
            </div>
          )}

          {/* EXPENSES GROUP */}
          <div className="pl-4 space-y-2 border-l-2 border-red-100">
            {/* Taxes */}
            <div className="flex justify-between text-gray-600">
              <span>{t.breakdown?.lessTaxes || 'Less: Taxes'} ({taxRate}%)</span>
              <span className="text-red-500">-{formatMoney(monthlyTax)}</span>
            </div>

            {/* Business Expenses */}
            {monthlyBusinessExp > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>{t.breakdown?.lessExpenses || 'Less: Business Expenses'}</span>
                <span className="text-red-500">-{formatMoney(monthlyBusinessExp)}</span>
              </div>
            )}

            {/* Personal Expenses */}
            {monthlyPersonalExp > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Less: Personal Expenses</span>
                <span className="text-red-500">-{formatMoney(monthlyPersonalExp)}</span>
              </div>
            )}
          </div>

          {/* SUBTOTAL: BURN RATE */}
          {totalBurnRate > 0 && (
            <div className="flex justify-between items-center py-3 bg-muted/10 px-3 rounded border border-muted/20">
              <span className="text-sm font-semibold text-foreground">Your Total Monthly Burn Rate</span>
              <span className="text-base font-bold text-foreground">{formatMoney(totalBurnRate)} / mo</span>
            </div>
          )}

          {/* FINAL RESULT - Net Leftover */}
          <div className="flex justify-between items-center pt-3 border-t-2 border-muted/40 mt-2">
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-gray-800">
                {t.breakdown?.leftOver || 'Net Leftover'}
              </span>
              <span className="text-xs text-muted">Cash added to savings</span>
            </div>
            <span className={`text-2xl font-bold ${netLeftover > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {netLeftover > 0 ? '+' : ''}{formatMoney(netLeftover)}
            </span>
          </div>

        </div>
      )}
    </div>
  )
}