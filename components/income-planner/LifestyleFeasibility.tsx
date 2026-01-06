'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome } from '@/lib/calculations'
import { formatCurrency } from '@/lib/formatters'
import { convertCurrency } from '@/lib/currency-conversion'
import { Card } from '@/components/ui/Card'
import { Tooltip } from '@/components/ui/Tooltip'
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

export default function LifestyleFeasibility() {
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

  const config = {
    hourlyRate,
    hoursPerWeek,
    unbillableHoursPerWeek: 0,
    vacationWeeks: 52 - weeksWorkedPerYear,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
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
    })
  }

  // Calculate true net leftover using cash flow logic
  const weeksPerMonth = 52 / 12
  const monthlyGrossBilling = hourlyRate * hoursPerWeek * weeksPerMonth
  const monthlyGrossInSpending = convertToSpending(monthlyGrossBilling)
  const monthlyTax = convertToSpending(result.annualTaxPaid / 12)
  const monthlyPersonalExp = monthlyPersonalNeed || 0
  
  // Net leftover = gross - taxes - business expenses - personal expenses
  const netLeftoverRaw = monthlyGrossInSpending - monthlyTax - monthlyBusinessExpenses - monthlyPersonalExp
  const netMonthly = Math.round(netLeftoverRaw)
  
  // Total burn rate = taxes + business + personal (all cash going out)
  const totalBurnRate = monthlyTax + monthlyBusinessExpenses + monthlyPersonalExp

  if (totalBurnRate === 0) {
    return null
  }

  // Calculate how much income covers the total burn rate
  const coverageMultiple = monthlyGrossInSpending / totalBurnRate
  const coveragePercent = (coverageMultiple * 100)

  // 🔴 Red (< 100%): Losing money
  // 🟡 Yellow (100% - 125%): Surviving
  // 🟢 Green (> 125%): Thriving
  const getStatus = () => {
    if (coveragePercent < 100) {
      return {
        color: 'red',
        icon: <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />,
        text: t.feasibility?.unsustainable || 'Unsustainable',
        description: t.feasibility?.losingMoney || 'You are losing money. Income < Expenses',
        bgColor: 'bg-red-50 dark:bg-red-950/20',
        borderColor: 'border-red-200 dark:border-red-800',
        progressBg: 'bg-red-200 dark:bg-red-900',
        progressFill: 'bg-red-500',
        textColor: 'text-red-600',
      }
    } else if (coveragePercent < 125) {
      return {
        color: 'yellow',
        icon: <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />,
        text: t.feasibility?.tight || 'Tight',
        description: t.feasibility?.surviving || 'You cover bills, but one emergency will break you.',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        progressBg: 'bg-yellow-200 dark:bg-yellow-900',
        progressFill: 'bg-yellow-500',
        textColor: 'text-yellow-600',
      }
    } else {
      return {
        color: 'green',
        icon: <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />,
        text: t.feasibility?.sustainable || 'Sustainable',
        description: t.feasibility?.thriving || 'You have a 25% buffer for savings and errors.',
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        borderColor: 'border-green-200 dark:border-green-800',
        progressBg: 'bg-green-200 dark:bg-green-900',
        progressFill: 'bg-green-500',
        textColor: 'text-green-600',
      }
    }
  }

  const status = getStatus()

  const formatMoney = (value: number): string => {
    return formatCurrency({ value, currency: spendingCurrency, language, maximumFractionDigits: 0 })
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-heading font-bold mb-6 flex items-center">
        {t.summary.feasibilityTitle}
        <Tooltip text={`Income ÷ Total Burn = ${formatMoney(monthlyGrossInSpending)} ÷ ${formatMoney(totalBurnRate)} = ${coverageMultiple.toFixed(2)}x (Burn includes taxes + business + personal)`} />
      </h2>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          {status.icon}
          <div>
            <p className={`text-lg font-semibold ${status.textColor}`}>
              {status.text}
            </p>
            <p className="text-muted mt-1 text-sm">
              {status.description}
            </p>
            <p className="text-muted mt-2 text-sm">
              You are <strong>{coverageMultiple.toFixed(1)}x</strong> over your monthly burn rate of {formatMoney(totalBurnRate)}.
            </p>
          </div>
        </div>

        <div className={`${status.bgColor} rounded-lg p-4 border ${status.borderColor}`}>
          <div className={`h-4 ${status.progressBg} rounded-full overflow-hidden`}>
            <div
              className={`h-4 ${status.progressFill} rounded-full transition-all`}
              style={{ width: `${Math.min(100, coveragePercent)}%` }}
            />
          </div>
          <p className="text-xs text-muted mt-2 text-center">
            {t.summary.coveringNeeds?.replace(
              '{percent}',
              Math.round(coveragePercent).toString()
            ) || `Covering ${Math.round(coveragePercent)}% of your needs`}
          </p>
        </div>
      </div>
    </Card>
  )
}
