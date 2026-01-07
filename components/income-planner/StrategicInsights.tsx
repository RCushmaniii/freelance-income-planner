'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome, getDefaultProgressiveTaxBrackets } from '@/lib/calculations'
import { formatCurrency } from '@/lib/formatters'
import { convertCurrency } from '@/lib/currency-conversion'
import { TrendingUp, ShieldCheck, AlertTriangle, Zap } from 'lucide-react'

export default function StrategicInsights() {
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

  // Calculate realistic scenario (baseline)
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

  if ('error' in realisticResult) {
    return null
  }

  const formatMoney = (value: number): string => {
    const converted = convertToSpending(value)
    return formatCurrency({ value: converted, currency: spendingCurrency, language, maximumFractionDigits: 0 })
  }

  // --- THE MATH ---

  // Base calculations from realistic scenario
  const baseAnnualGross = realisticResult.annualGross
  const baseAnnualNet = realisticResult.annualNet
  const hourlyRate = scenarios.realistic.hourlyRate
  const hoursPerWeek = scenarios.realistic.hoursPerWeek
  const weeksPerYear = 52 - scenarios.realistic.vacationWeeks

  // Total annual burn rate (expenses)
  const annualBurn = convertToSpending(
    (convertToBilling(monthlyBusinessExpenses) + (monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : 0)) * 12
  )

  // SCENARIO 1: The "Floor" (Pessimistic - 20% less volume)
  const floorScenario = calculateIncome({
    ...scenarios.realistic,
    hoursPerWeek: hoursPerWeek * 0.8,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
    monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
    currentSavings,
    taxRate,
    taxMode,
    taxBrackets,
  })

  const floorGross = 'error' in floorScenario ? 0 : convertToSpending(floorScenario.annualGross)
  const isFloorSafe = floorGross > annualBurn
  const shortfall = Math.max(0, annualBurn - floorGross)

  // SCENARIO 2: The "Ceiling" (Optimistic - 20% more volume)
  const ceilingHours = Math.round(hoursPerWeek * 1.2)
  const ceilingScenario = calculateIncome({
    ...scenarios.realistic,
    hoursPerWeek: hoursPerWeek * 1.2,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
    monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
    currentSavings,
    taxRate,
    taxMode,
    taxBrackets,
  })

  const ceilingGross = 'error' in ceilingScenario ? 0 : convertToSpending(ceilingScenario.annualGross)
  const isBurnoutRisk = ceilingHours > 45

  // SCENARIO 3: The "Lever" (10% Rate Increase)
  const raiseScenario = calculateIncome({
    ...scenarios.realistic,
    hourlyRate: hourlyRate * 1.1,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
    monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
    currentSavings,
    taxRate,
    taxMode,
    taxBrackets,
  })

  const raiseImpact = 'error' in raiseScenario 
    ? 0 
    : convertToSpending(raiseScenario.annualNet) - convertToSpending(baseAnnualNet)
  const newRate = hourlyRate * 1.1

  return (
    <div className="bg-card-bg border border-card-border rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-card-border" style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}>
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Zap size={20} className="text-yellow-500 fill-current" />
          {t.insights.strategicAnalysis}
        </h3>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* CARD 1: THE SAFETY NET (Pessimistic) */}
        <div 
          className={`p-5 rounded-lg border-l-4 ${
            isFloorSafe 
              ? 'border-l-4' 
              : 'border-l-4'
          }`}
          style={{
            backgroundColor: isFloorSafe ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            borderColor: isFloorSafe ? '#10b981' : '#ef4444'
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-bold">The &ldquo;Slow Month&rdquo; Test</h4>
            <ShieldCheck size={20} style={{ color: isFloorSafe ? '#10b981' : '#ef4444' }} />
          </div>
          
          <p className="text-sm text-muted mb-3">
            If you lose 20% of your clients, your annual income drops to <strong>{formatMoney(floorGross)}</strong>.
          </p>
          
          <div className="text-xs font-bold uppercase tracking-wide">
            {isFloorSafe ? (
              <span style={{ color: '#10b981' }}>✓ Safe: Covers your {formatMoney(annualBurn)} burn rate.</span>
            ) : (
              <span style={{ color: '#ef4444' }}>⚠ Risk: {formatMoney(shortfall)} shortfall. Keep savings high.</span>
            )}
          </div>
        </div>

        {/* CARD 2: THE BURNOUT CHECK (Optimistic) */}
        <div 
          className="p-5 rounded-lg border-l-4"
          style={{
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: '#3b82f6'
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-bold">Upside Potential</h4>
            <TrendingUp size={20} style={{ color: '#3b82f6' }} />
          </div>
          
          <p className="text-sm text-muted mb-3">
            To hit your &ldquo;Optimistic&rdquo; target of <strong>{formatMoney(ceilingGross)}</strong>, you need to work <strong>{ceilingHours} hours/week</strong>.
          </p>
          
          <div className="text-xs font-bold uppercase tracking-wide">
            {isBurnoutRisk ? (
              <span className="flex items-center gap-1" style={{ color: '#f97316' }}>
                <AlertTriangle size={12} /> High burnout risk. Raise rates instead.
              </span>
            ) : (
              <span style={{ color: '#3b82f6' }}>✓ Capacity Available.</span>
            )}
          </div>
        </div>

        {/* CARD 3: THE GOLDEN LEVER (Rate Impact) */}
        <div 
          className="col-span-1 md:col-span-2 p-5 rounded-lg border flex items-center justify-between"
          style={{
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderColor: 'rgba(99, 102, 241, 0.2)'
          }}
        >
          <div>
            <h4 className="font-bold mb-1" style={{ color: '#6366f1' }}>The Power of 10%</h4>
            <p className="text-sm" style={{ color: '#6366f1' }}>
              Increasing your rate to <strong>{formatMoney(newRate)}/hr</strong> adds <strong>{formatMoney(raiseImpact)}</strong> to your year.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
