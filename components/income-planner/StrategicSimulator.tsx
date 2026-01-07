'use client'

import { useState } from 'react'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome, getDefaultProgressiveTaxBrackets } from '@/lib/calculations'
import { formatCurrency } from '@/lib/formatters'
import { convertCurrency } from '@/lib/currency-conversion'
import { TrendingUp, ShieldAlert, Clock, ArrowRight } from 'lucide-react'

export default function StrategicSimulator() {
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

  const [simulateChurn, setSimulateChurn] = useState(false)
  const [simulateCapacity, setSimulateCapacity] = useState(false)
  const [simulateRateHike, setSimulateRateHike] = useState(false)

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

  const formatMoney = (value: number): string => {
    return formatCurrency({ value, currency: spendingCurrency, language, maximumFractionDigits: 0 })
  }

  // Base realistic scenario calculation
  const baseResult = calculateIncome({
    ...scenarios.realistic,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
    monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
    currentSavings,
    taxRate,
    taxMode,
    taxBrackets,
  })

  if ('error' in baseResult) {
    return null
  }

  const baseAnnualNet = convertToSpending(baseResult.annualNet)
  const hourlyRate = scenarios.realistic.hourlyRate
  const hoursPerWeek = scenarios.realistic.hoursPerWeek

  // Total annual burn rate (expenses)
  const annualBurn = convertToSpending(
    (convertToBilling(monthlyBusinessExpenses) + (monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : 0)) * 12
  )

  // --- SCENARIO 1: Stress Test (20% Client Churn) ---
  const churnResult = calculateIncome({
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

  const churnedIncome = 'error' in churnResult ? 0 : convertToSpending(churnResult.annualNet)
  const isChurnSafe = churnedIncome > annualBurn

  // --- SCENARIO 2: Capacity Check (Optimistic Goal) ---
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

  const optimisticIncome = 'error' in optimisticResult ? 0 : convertToSpending(optimisticResult.annualNet)
  const workingWeeks = 48 // Realistic working weeks (accounting for vacation/sick time)
  const hoursNeededForOptimistic = Math.ceil(scenarios.optimistic.hoursPerWeek)

  let capacityColor = 'text-green-600'
  let capacityLabel = t.simulator.capacitySustainable
  if (hoursNeededForOptimistic > 35) {
    capacityColor = 'text-amber-600'
    capacityLabel = t.simulator.capacityHeavy
  }
  if (hoursNeededForOptimistic > 45) {
    capacityColor = 'text-red-600'
    capacityLabel = t.simulator.capacityBurnout
  }

  // --- SCENARIO 3: Growth (10% Rate Increase) ---
  const rateHikeResult = calculateIncome({
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

  const rateHikeIncome = 'error' in rateHikeResult ? 0 : convertToSpending(rateHikeResult.annualNet)
  const rateHikeDelta = rateHikeIncome - baseAnnualNet
  const newRate = hourlyRate * 1.1

  return (
    <div className="w-full bg-card-bg border border-card-border rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-card-border bg-gradient-to-r from-accent/5 to-accent/10">
        <div>
          <h3 className="text-base font-bold">{t.simulator.title}</h3>
          <p className="text-sm text-muted mt-1">
            {t.simulator.subtitle}
          </p>
        </div>
      </div>

      <div className="divide-y divide-card-border">
        
        {/* Row 1: Stress Test */}
        <div className="px-6 py-5 transition-colors hover:bg-accent/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-md transition-colors ${simulateChurn ? 'bg-red-500/10 text-red-600' : 'bg-muted/10 text-muted'}`}>
                  <ShieldAlert size={18} />
                </div>
                <span className="text-base font-semibold">{t.simulator.stressTestTitle}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed max-w-xl">
                {t.simulator.stressTestDesc}
                {simulateChurn && (
                  <span className={isChurnSafe ? ' text-green-600 font-medium ml-1' : ' text-red-600 font-medium ml-1'}>
                    {isChurnSafe ? t.simulator.stressTestSafe : t.simulator.stressTestRisk}
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1 min-w-[140px]">
              <label className="relative inline-flex items-center cursor-pointer mb-2">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={simulateChurn} 
                  onChange={() => setSimulateChurn(!simulateChurn)} 
                />
                <div className="w-11 h-6 bg-muted/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-muted/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
              {simulateChurn ? (
                <div className="text-right">
                  <span className={`block text-lg font-bold ${isChurnSafe ? 'text-foreground' : 'text-red-600'}`}>
                    {formatMoney(churnedIncome)}
                  </span>
                  <span className="text-xs font-medium text-muted uppercase tracking-wide">
                    {isChurnSafe ? t.simulator.stressTestSafeLabel : t.simulator.stressTestRiskLabel}
                  </span>
                </div>
              ) : <span className="text-sm text-muted font-medium mt-1">{t.simulator.toggleOff}</span>}
            </div>
          </div>
        </div>

        {/* Row 2: Capacity Check */}
        <div className="px-6 py-5 transition-colors hover:bg-accent/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-md transition-colors ${simulateCapacity ? 'bg-purple-500/10 text-purple-600' : 'bg-muted/10 text-muted'}`}>
                  <Clock size={18} />
                </div>
                <span className="text-base font-semibold">{t.simulator.capacityTitle}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {t.simulator.capacityDesc} <strong>{formatMoney(optimisticIncome)}</strong>.
              </p>
            </div>

            <div className="flex flex-col items-end gap-1 min-w-[140px]">
              <label className="relative inline-flex items-center cursor-pointer mb-2">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={simulateCapacity} 
                  onChange={() => setSimulateCapacity(!simulateCapacity)} 
                />
                <div className="w-11 h-6 bg-muted/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-muted/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
              {simulateCapacity ? (
                <div className="text-right">
                  <span className={`block text-lg font-bold ${capacityColor}`}>
                    {hoursNeededForOptimistic} hrs/wk
                  </span>
                  <span className="text-xs font-medium text-muted uppercase tracking-wide">{capacityLabel}</span>
                </div>
              ) : <span className="text-sm text-muted font-medium mt-1">{t.simulator.toggleOff}</span>}
            </div>
          </div>
        </div>

        {/* Row 3: Growth */}
        <div className="px-6 py-5 transition-colors hover:bg-accent/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-md transition-colors ${simulateRateHike ? 'bg-blue-500/10 text-blue-600' : 'bg-muted/10 text-muted'}`}>
                  <TrendingUp size={18} />
                </div>
                <span className="text-base font-semibold">{t.simulator.growthTitle}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {t.simulator.growthDesc} <strong>{formatMoney(newRate)}/hr</strong>.
              </p>
            </div>

            <div className="flex flex-col items-end gap-1 min-w-[140px]">
              <label className="relative inline-flex items-center cursor-pointer mb-2">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={simulateRateHike} 
                  onChange={() => setSimulateRateHike(!simulateRateHike)} 
                />
                <div className="w-11 h-6 bg-muted/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-muted/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              {simulateRateHike ? (
                <div className="text-right">
                  <span className="block text-lg font-bold text-green-600">
                    +{formatMoney(rateHikeDelta)}
                  </span>
                  <span className="text-xs font-medium text-muted uppercase tracking-wide">{t.simulator.growthLabel}</span>
                </div>
              ) : <span className="text-sm text-muted font-medium mt-1">{t.simulator.toggleOff}</span>}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
