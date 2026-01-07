import { calculateIncome, IncomeConfig } from './calculations'
import { translations, Language } from './i18n/translations'

export interface MonthlyDataPoint {
  month: string
  pessimistic: number
  realistic: number
  optimistic: number
}

export interface RunwayDataPoint {
  month: string
  pessimistic: number
  realistic: number
  optimistic: number
}

function getMonthNames(language: Language): string[] {
  const t = translations[language]
  return [
    t.months.jan,
    t.months.feb,
    t.months.mar,
    t.months.apr,
    t.months.may,
    t.months.jun,
    t.months.jul,
    t.months.aug,
    t.months.sep,
    t.months.oct,
    t.months.nov,
    t.months.dec,
  ]
}

/**
 * Generate monthly income projection data for all three scenarios
 * Returns an array of 12 data points (one per month)
 */
export function generateMonthlyProjection(
  pessimisticConfig: IncomeConfig,
  realisticConfig: IncomeConfig,
  optimisticConfig: IncomeConfig,
  language: Language = 'en'
): MonthlyDataPoint[] {
  const months = getMonthNames(language)

  const pessimisticResult = calculateIncome(pessimisticConfig)
  const realisticResult = calculateIncome(realisticConfig)
  const optimisticResult = calculateIncome(optimisticConfig)

  if (
    'error' in pessimisticResult ||
    'error' in realisticResult ||
    'error' in optimisticResult
  ) {
    return []
  }

  return months.map((month) => ({
    month,
    pessimistic: Math.round(pessimisticResult.monthlyNet),
    realistic: Math.round(realisticResult.monthlyNet),
    optimistic: Math.round(optimisticResult.monthlyNet),
  }))
}

/**
 * Generate monthly income projection with seasonal variation
 * Applies a multiplier to each month based on seasonal patterns
 */
export function generateSeasonalProjection(
  pessimisticConfig: IncomeConfig,
  realisticConfig: IncomeConfig,
  optimisticConfig: IncomeConfig,
  monthlyMultipliers: number[] = Array(12).fill(1.0),
  language: Language = 'en'
): MonthlyDataPoint[] {
  const months = getMonthNames(language)

  // Use custom monthly multipliers (default to steady if not provided)
  const multipliers = monthlyMultipliers.length === 12 ? monthlyMultipliers : Array(12).fill(1.0)

  const pessimisticResult = calculateIncome(pessimisticConfig)
  const realisticResult = calculateIncome(realisticConfig)
  const optimisticResult = calculateIncome(optimisticConfig)

  if (
    'error' in pessimisticResult ||
    'error' in realisticResult ||
    'error' in optimisticResult
  ) {
    return []
  }

  return months.map((month, index) => ({
    month,
    pessimistic: Math.round(pessimisticResult.monthlyNet * multipliers[index]),
    realistic: Math.round(realisticResult.monthlyNet * multipliers[index]),
    optimistic: Math.round(optimisticResult.monthlyNet * multipliers[index]),
  }))
}

export function generateRunwayProjection(
  pessimisticConfig: IncomeConfig,
  realisticConfig: IncomeConfig,
  optimisticConfig: IncomeConfig,
  monthlyMultipliers: number[] = Array(12).fill(1.0),
  language: Language = 'en'
): RunwayDataPoint[] {
  const months = getMonthNames(language)

  // Use custom monthly multipliers (default to steady if not provided)
  const multipliers = monthlyMultipliers.length === 12 ? monthlyMultipliers : Array(12).fill(1.0)

  const pessimisticResult = calculateIncome(pessimisticConfig)
  const realisticResult = calculateIncome(realisticConfig)
  const optimisticResult = calculateIncome(optimisticConfig)

  if (
    'error' in pessimisticResult ||
    'error' in realisticResult ||
    'error' in optimisticResult
  ) {
    return []
  }

  const monthlyNeed = pessimisticConfig.monthlyPersonalNeed ?? null
  const savings = pessimisticConfig.currentSavings ?? null

  if (monthlyNeed === null || savings === null) return []
  if (!Number.isFinite(monthlyNeed) || monthlyNeed < 0) return []
  if (!Number.isFinite(savings) || savings < 0) return []

  const monthlyNeedValue = monthlyNeed
  const startingSavings = savings

  let pessimisticBalance: number = startingSavings
  let realisticBalance: number = startingSavings
  let optimisticBalance: number = startingSavings

  return months.map((month, index) => {
    const multiplier = multipliers[index] ?? 1

    pessimisticBalance += pessimisticResult.monthlyNet * multiplier - monthlyNeedValue
    realisticBalance += realisticResult.monthlyNet * multiplier - monthlyNeedValue
    optimisticBalance += optimisticResult.monthlyNet * multiplier - monthlyNeedValue

    return {
      month,
      pessimistic: Math.round(pessimisticBalance),
      realistic: Math.round(realisticBalance),
      optimistic: Math.round(optimisticBalance),
    }
  })
}
