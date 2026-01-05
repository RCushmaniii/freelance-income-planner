import { calculateIncome, IncomeConfig } from './calculations'

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

/**
 * Generate monthly income projection data for all three scenarios
 * Returns an array of 12 data points (one per month)
 */
export function generateMonthlyProjection(
  pessimisticConfig: IncomeConfig,
  realisticConfig: IncomeConfig,
  optimisticConfig: IncomeConfig
): MonthlyDataPoint[] {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

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
  seasonalPattern: 'steady' | 'q4-heavy' | 'summer-slow' = 'steady'
): MonthlyDataPoint[] {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  // Seasonal multipliers for different patterns
  const patterns = {
    steady: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    'q4-heavy': [0.8, 0.8, 0.9, 0.9, 1.0, 1.0, 0.9, 0.9, 1.0, 1.1, 1.2, 1.3],
    'summer-slow': [1.0, 1.0, 1.1, 1.1, 0.9, 0.7, 0.7, 0.8, 1.0, 1.1, 1.1, 1.0],
  }

  const multipliers = patterns[seasonalPattern]

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
  seasonalPattern: 'steady' | 'q4-heavy' | 'summer-slow' = 'steady'
): RunwayDataPoint[] {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const patterns = {
    steady: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    'q4-heavy': [0.8, 0.8, 0.9, 0.9, 1.0, 1.0, 0.9, 0.9, 1.0, 1.1, 1.2, 1.3],
    'summer-slow': [1.0, 1.0, 1.1, 1.1, 0.9, 0.7, 0.7, 0.8, 1.0, 1.1, 1.1, 1.0],
  }

  const multipliers = patterns[seasonalPattern]

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
