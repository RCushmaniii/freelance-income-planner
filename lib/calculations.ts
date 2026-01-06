/**
 * Income Planner Calculation Utilities
 * 
 * Pure functions for calculating income based on hourly rate, hours per week,
 * vacation weeks, and tax rate. All functions are side-effect free and fully testable.
 */

export interface IncomeConfig {
  hourlyRate: number
  hoursPerWeek: number
  unbillableHoursPerWeek?: number
  vacationWeeks: number
  monthlyBusinessExpenses?: number
  monthlyPersonalNeed?: number | null
  currentSavings?: number | null
  targetAnnualNet?: number | null
  taxRate: number
  taxMode?: TaxMode
  taxBrackets?: ProgressiveTaxBracket[]
}

export interface IncomeResult {
  dailyGross: number
  dailyNet: number
  weeklyGross: number
  weeklyNet: number
  monthlyGross: number
  monthlyNet: number
  annualGross: number
  annualNet: number
  effectiveHourlyRate: number
  takeHomePerBillableHour: number
  unbillablePercentage: number
  annualBusinessExpenses: number
  annualTaxableIncome: number
  annualTaxPaid: number
  monthlyCashFlow: number | null
  runwayMonths: number | null
  runwayIsSustainable: boolean
}

export interface CalculationError {
  success: false
  error: string
}

export type TaxMode = 'simple' | 'smart'

export type ProgressiveTaxBracket = {
  upTo: number | null
  rate: number
}

export function calculateProgressiveTax(
  annualGross: number,
  brackets: ProgressiveTaxBracket[]
): number {
  const safeGross = Number.isFinite(annualGross) ? Math.max(0, annualGross) : 0
  if (!Array.isArray(brackets) || brackets.length === 0) return 0

  let remaining = safeGross
  let previousLimit = 0
  let tax = 0

  for (const bracket of brackets) {
    if (remaining <= 0) break
    const rate = Number.isFinite(bracket.rate) ? bracket.rate : 0
    if (rate <= 0) {
      previousLimit = bracket.upTo ?? previousLimit
      continue
    }

    const limit = bracket.upTo
    const bracketCap = limit === null ? remaining : Math.max(0, limit - previousLimit)
    const taxableHere = Math.min(remaining, bracketCap)

    tax += taxableHere * rate
    remaining -= taxableHere

    if (limit !== null) {
      previousLimit = limit
    }
  }

  return tax
}

export function getDefaultProgressiveTaxBrackets(
  currency: 'USD' | 'MXN'
): ProgressiveTaxBracket[] {
  const base = currency === 'MXN' ? 2_000_000 : 100_000
  return [
    { upTo: base, rate: 0.15 },
    { upTo: base * 2, rate: 0.25 },
    { upTo: null, rate: 0.35 },
  ]
}

/**
 * Calculate income at various intervals (daily, weekly, monthly, annual)
 * 
 * Formula:
 * - billableWeeks = 52 - vacationWeeks (minimum 1)
 * - annualGross = hourlyRate × hoursPerWeek × billableWeeks
 * - annualNet = annualGross × (1 - taxRate/100)
 * - Other intervals derived from annual
 * 
 * @param config - Income configuration with rate, hours, vacation, and tax
 * @returns Income result object or error
 */
export function calculateIncome(
  config: IncomeConfig
): IncomeResult | CalculationError {
  try {
    const {
      hourlyRate,
      hoursPerWeek,
      unbillableHoursPerWeek = 0,
      vacationWeeks,
      monthlyBusinessExpenses = 0,
      monthlyPersonalNeed = null,
      currentSavings = null,
      taxRate,
      taxMode = 'simple',
      taxBrackets,
    } = config

    // Validate inputs
    if (
      !Number.isFinite(hourlyRate) ||
      !Number.isFinite(hoursPerWeek) ||
      !Number.isFinite(unbillableHoursPerWeek) ||
      !Number.isFinite(vacationWeeks) ||
      !Number.isFinite(monthlyBusinessExpenses) ||
      !Number.isFinite(taxRate)
    ) {
      return {
        success: false,
        error: 'Invalid input values',
      }
    }

    // Calculate billable weeks (52 weeks - vacation, minimum 1)
    const billableWeeks = Math.max(1, 52 - vacationWeeks)

    // Calculate annual gross income
    const annualGross = hourlyRate * hoursPerWeek * billableWeeks

    const annualBusinessExpenses = Math.max(0, monthlyBusinessExpenses) * 12
    const annualTaxableIncome = Math.max(0, annualGross - annualBusinessExpenses)

    const annualTaxPaid = (() => {
      if (taxMode === 'smart' && Array.isArray(taxBrackets) && taxBrackets.length > 0) {
        return calculateProgressiveTax(annualTaxableIncome, taxBrackets)
      }
      return annualTaxableIncome * (taxRate / 100)
    })()

    // Calculate annual net income (after tax)
    const annualNet = Math.max(0, annualTaxableIncome - annualTaxPaid)

    // Derive other intervals
    const dailyGross = annualGross / 365
    const dailyNet = annualNet / 365

    const weeklyGross = annualGross / 52
    const weeklyNet = annualNet / 52

    const monthlyGross = annualGross / 12
    const monthlyNet = annualNet / 12

    const totalWorkHoursPerYear = Math.max(0, (hoursPerWeek + unbillableHoursPerWeek) * billableWeeks)
    const billableHoursPerYear = Math.max(0, hoursPerWeek * billableWeeks)

    const effectiveHourlyRate = totalWorkHoursPerYear > 0 ? annualNet / totalWorkHoursPerYear : 0
    const takeHomePerBillableHour = billableHoursPerYear > 0 ? annualNet / billableHoursPerYear : 0
    const unbillablePercentage = (() => {
      const weeklyTotal = hoursPerWeek + unbillableHoursPerWeek
      if (weeklyTotal <= 0) return 0
      return (unbillableHoursPerWeek / weeklyTotal) * 100
    })()

    const monthlyCashFlow = (() => {
      if (monthlyPersonalNeed === null) return null
      if (!Number.isFinite(monthlyPersonalNeed) || monthlyPersonalNeed < 0) return null
      return monthlyNet - monthlyPersonalNeed
    })()

    const runway = (() => {
      if (monthlyCashFlow === null) {
        return { runwayMonths: null, runwayIsSustainable: false }
      }
      if (monthlyCashFlow >= 0) {
        return { runwayMonths: null, runwayIsSustainable: true }
      }
      if (currentSavings === null) {
        return { runwayMonths: null, runwayIsSustainable: false }
      }
      if (!Number.isFinite(currentSavings) || currentSavings <= 0) {
        return { runwayMonths: 0, runwayIsSustainable: false }
      }
      return { runwayMonths: currentSavings / Math.abs(monthlyCashFlow), runwayIsSustainable: false }
    })()

    return {
      dailyGross,
      dailyNet,
      weeklyGross,
      weeklyNet,
      monthlyGross,
      monthlyNet,
      annualGross,
      annualNet,
      effectiveHourlyRate,
      takeHomePerBillableHour,
      unbillablePercentage,
      annualBusinessExpenses,
      annualTaxableIncome,
      annualTaxPaid,
      monthlyCashFlow,
      runwayMonths: runway.runwayMonths,
      runwayIsSustainable: runway.runwayIsSustainable,
    }
  } catch (error) {
    return {
      success: false,
      error: 'Calculation failed',
    }
  }
}

export function calculateRequiredHourlyRateForAnnualNet(
  config: IncomeConfig,
  targetAnnualNet: number
): { requiredRate: number } | CalculationError {
  try {
    if (!Number.isFinite(targetAnnualNet) || targetAnnualNet <= 0) {
      return {
        success: false,
        error: 'Invalid target income',
      }
    }

    const baseConfig = validateAndClampConfig(config)

    const evalAtRate = (rate: number): number | CalculationError => {
      const res = calculateIncome({ ...baseConfig, hourlyRate: rate })
      if ('error' in res) return res
      return res.annualNet
    }

    let low = 0
    let high = Math.max(50, baseConfig.hourlyRate)

    for (let i = 0; i < 20; i += 1) {
      const netAtHigh = evalAtRate(high)
      if (typeof netAtHigh !== 'number') {
        return netAtHigh
      }
      if (netAtHigh >= targetAnnualNet) break
      high *= 2
    }

    const netAtHigh = evalAtRate(high)
    if (typeof netAtHigh !== 'number') {
      return netAtHigh
    }
    if (netAtHigh < targetAnnualNet) {
      return {
        success: false,
        error: 'Unable to reach target with current constraints',
      }
    }

    for (let i = 0; i < 30; i += 1) {
      const mid = (low + high) / 2
      const netAtMid = evalAtRate(mid)
      if (typeof netAtMid !== 'number') {
        return netAtMid
      }

      if (netAtMid >= targetAnnualNet) {
        high = mid
      } else {
        low = mid
      }
    }

    return { requiredRate: high }
  } catch {
    return {
      success: false,
      error: 'Calculation failed',
    }
  }
}

/**
 * Calculate required hourly rate to achieve a target annual net income
 * 
 * Formula:
 * - requiredRate = targetAnnualNet / ((1 - taxRate/100) × hoursPerWeek × billableWeeks)
 * 
 * @param config - Income configuration
 * @param targetAnnualNet - Target annual net income
 * @returns Required hourly rate or error
 */
export function calculateRequiredRate(
  config: IncomeConfig,
  targetAnnualNet: number
): { requiredRate: number } | CalculationError {
  try {
    const { hoursPerWeek, vacationWeeks, taxRate } = config

    if (!Number.isFinite(targetAnnualNet) || targetAnnualNet <= 0) {
      return {
        success: false,
        error: 'Invalid target income',
      }
    }

    const billableWeeks = Math.max(1, 52 - vacationWeeks)
    const taxMultiplier = 1 - taxRate / 100

    // Prevent division by zero
    if (hoursPerWeek === 0 || billableWeeks === 0 || taxMultiplier === 0) {
      return {
        success: false,
        error: 'Cannot calculate with zero hours or 100% tax rate',
      }
    }

    const requiredRate = targetAnnualNet / (taxMultiplier * hoursPerWeek * billableWeeks)

    return { requiredRate }
  } catch (error) {
    return {
      success: false,
      error: 'Calculation failed',
    }
  }
}

/**
 * Calculate required hours per week to achieve a target annual net income
 * 
 * Formula:
 * - requiredHours = targetAnnualNet / ((1 - taxRate/100) × hourlyRate × billableWeeks)
 * 
 * @param config - Income configuration
 * @param targetAnnualNet - Target annual net income
 * @returns Required hours per week or error
 */
export function calculateRequiredHours(
  config: IncomeConfig,
  targetAnnualNet: number
): { requiredHours: number } | CalculationError {
  try {
    const { hourlyRate, vacationWeeks, taxRate } = config

    if (!Number.isFinite(targetAnnualNet) || targetAnnualNet <= 0) {
      return {
        success: false,
        error: 'Invalid target income',
      }
    }

    const billableWeeks = Math.max(1, 52 - vacationWeeks)
    const taxMultiplier = 1 - taxRate / 100

    // Prevent division by zero
    if (hourlyRate === 0 || billableWeeks === 0 || taxMultiplier === 0) {
      return {
        success: false,
        error: 'Cannot calculate with zero rate or 100% tax rate',
      }
    }

    const requiredHours = targetAnnualNet / (taxMultiplier * hourlyRate * billableWeeks)

    return { requiredHours }
  } catch (error) {
    return {
      success: false,
      error: 'Calculation failed',
    }
  }
}

/**
 * Clamp a numeric value within min and max bounds
 * 
 * @param value - Value to clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Clamped value
 */
export function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Validate and clamp all input values
 * 
 * @param config - Income configuration
 * @returns Validated and clamped configuration
 */
export function validateAndClampConfig(config: Partial<IncomeConfig>): IncomeConfig {
  return {
    hourlyRate: clampValue(config.hourlyRate ?? 500, 0, 100000),
    hoursPerWeek: clampValue(config.hoursPerWeek ?? 40, 0, 168),
    unbillableHoursPerWeek: clampValue(config.unbillableHoursPerWeek ?? 0, 0, 168),
    vacationWeeks: clampValue(config.vacationWeeks ?? 2, 0, 52),
    monthlyBusinessExpenses: clampValue(config.monthlyBusinessExpenses ?? 0, 0, 10_000_000),
    monthlyPersonalNeed:
      config.monthlyPersonalNeed === null
        ? null
        : clampValue(config.monthlyPersonalNeed ?? 0, 0, 10_000_000),
    currentSavings:
      config.currentSavings === null
        ? null
        : clampValue(config.currentSavings ?? 0, 0, 100_000_000),
    taxRate: clampValue(config.taxRate ?? 25, 0, 100),
    taxMode: config.taxMode,
    taxBrackets: config.taxBrackets,
  }
}
