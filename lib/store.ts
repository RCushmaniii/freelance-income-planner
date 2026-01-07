'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { validateAndClampConfig, IncomeConfig, TaxMode } from './calculations'

export type Currency = 'MXN' | 'USD' | 'EUR'
export type Language = 'en' | 'es'
export type ViewMode = 'snapshot' | 'forecast'
export type Theme = 'light' | 'dark'
export type FxStatus = 'idle' | 'loading' | 'ready' | 'error'

function getInitialTheme(): Theme {
  try {
    if (typeof window === 'undefined') return 'dark'
    if (typeof window.matchMedia !== 'function') return 'dark'
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export interface ScenarioInputs {
  hourlyRate: number
  hoursPerWeek: number
  vacationWeeks: number
}

export interface IncomePlannerState {
  // View mode
  viewMode: ViewMode

  // Snapshot mode - single scenario (current inputs)
  hourlyRate: number
  hoursPerWeek: number
  unbillableHoursPerWeek: number
  weeksWorkedPerYear: number
  vacationWeeks: number
  monthlyBusinessExpenses: number
  monthlyPersonalNeed: number | null
  currentSavings: number | null
  targetAnnualNet: number | null
  taxRate: number
  taxMode: TaxMode
  currency: Currency // Legacy field - keeping for backward compatibility
  billingCurrency: Currency
  spendingCurrency: Currency
  language: Language
  userExchangeRate: number | null

  // UI
  theme: Theme

  // FX
  mxnToUsdRate: number | null
  mxnToUsdRateUpdatedAt: number | null
  fxStatus: FxStatus

  // Forecast mode - three scenarios
  scenarios: {
    pessimistic: ScenarioInputs
    realistic: ScenarioInputs
    optimistic: ScenarioInputs
  }

  // Monthly income multipliers for seasonal variations (1.0 = 100%)
  monthlyMultipliers: number[]

  // Actions
  setViewMode: (mode: ViewMode) => void
  setHourlyRate: (value: number) => void
  setHoursPerWeek: (value: number) => void
  setUnbillableHoursPerWeek: (value: number) => void
  setWeeksWorkedPerYear: (value: number) => void
  setVacationWeeks: (value: number) => void
  setMonthlyBusinessExpenses: (value: number) => void
  setMonthlyPersonalNeed: (value: number | null) => void
  setCurrentSavings: (value: number | null) => void
  setTargetAnnualNet: (value: number | null) => void
  setTaxRate: (value: number) => void
  setTaxMode: (mode: TaxMode) => void
  setCurrency: (currency: Currency) => void
  setBillingCurrency: (currency: Currency) => void
  setSpendingCurrency: (currency: Currency) => void
  switchCurrency: (nextCurrency: Currency, mxnToUsdRate: number | null) => void
  setLanguage: (language: Language) => void
  setTheme: (theme: Theme) => void
  setFxStatus: (status: FxStatus) => void
  setMxnToUsdRate: (rate: number | null, updatedAt: number | null) => void
  setUserExchangeRate: (rate: number | null) => void
  setScenario: (
    scenario: 'pessimistic' | 'realistic' | 'optimistic',
    inputs: Partial<ScenarioInputs>
  ) => void
  setMonthlyMultipliers: (multipliers: number[]) => void
  resetToDefaults: () => void
  getConfig: () => IncomeConfig
}

const DEFAULT_CONFIG: IncomeConfig = {
  hourlyRate: 500,
  hoursPerWeek: 40,
  unbillableHoursPerWeek: 0,
  vacationWeeks: 0,
  monthlyBusinessExpenses: 0,
  monthlyPersonalNeed: null,
  currentSavings: null,
  taxRate: 30,
}

/**
 * Zustand store for Income Planner state
 *
 * Manages:
 * - Input values (rate, hours, vacation, tax)
 * - Target annual net income
 * - Currency and language preferences
 *
 * All numeric inputs are validated and clamped on set.
 */
export const useIncomePlannerStore = create<IncomePlannerState>()(
  persist(
    (set, get) => ({
      // Initial state
      viewMode: 'snapshot',
      hourlyRate: DEFAULT_CONFIG.hourlyRate,
      hoursPerWeek: DEFAULT_CONFIG.hoursPerWeek,
      unbillableHoursPerWeek: 0,
      weeksWorkedPerYear: 48,
      vacationWeeks: 4,
      monthlyBusinessExpenses: DEFAULT_CONFIG.monthlyBusinessExpenses ?? 0,
      monthlyPersonalNeed: DEFAULT_CONFIG.monthlyPersonalNeed ?? null,
      currentSavings: DEFAULT_CONFIG.currentSavings ?? null,
      targetAnnualNet: null,
      taxRate: DEFAULT_CONFIG.taxRate,
      taxMode: 'simple' as TaxMode,
      currency: 'MXN', // Legacy field
      billingCurrency: 'USD',
      spendingCurrency: 'MXN',
      language: 'en',
      userExchangeRate: 18.50,

      // UI
      theme: getInitialTheme(),

      // FX
      mxnToUsdRate: null,
      mxnToUsdRateUpdatedAt: null,
      fxStatus: 'idle',

      // Forecast scenarios with smart defaults
      scenarios: {
        pessimistic: {
          hourlyRate: DEFAULT_CONFIG.hourlyRate * 0.8,
          hoursPerWeek: 25,
          vacationWeeks: 6,
        },
        realistic: {
          hourlyRate: DEFAULT_CONFIG.hourlyRate,
          hoursPerWeek: DEFAULT_CONFIG.hoursPerWeek,
          vacationWeeks: DEFAULT_CONFIG.vacationWeeks,
        },
        optimistic: {
          hourlyRate: DEFAULT_CONFIG.hourlyRate * 1.2,
          hoursPerWeek: 45,
          vacationWeeks: 1,
        },
      },

      // Monthly multipliers - default to 100% for all months
      monthlyMultipliers: Array(12).fill(1.0),

      // Actions with validation
      setViewMode: (mode: ViewMode) => {
        set({ viewMode: mode })
      },

      setHourlyRate: (value: number) => {
        const validated = validateAndClampConfig({ hourlyRate: value })
        set({ hourlyRate: validated.hourlyRate })
      },

      setHoursPerWeek: (value: number) => {
        const validated = validateAndClampConfig({ hoursPerWeek: value })
        set({ hoursPerWeek: validated.hoursPerWeek })
      },

      setUnbillableHoursPerWeek: (value: number) => {
        const clamped = Math.max(0, Math.min(168, value))
        set({ unbillableHoursPerWeek: clamped })
      },

      setWeeksWorkedPerYear: (value: number) => {
        const clamped = Math.max(1, Math.min(52, value))
        const vacationWeeks = 52 - clamped
        set({ weeksWorkedPerYear: clamped, vacationWeeks })
      },

      setVacationWeeks: (value: number) => {
        const clamped = Math.max(0, Math.min(52, value))
        const weeksWorkedPerYear = 52 - clamped
        set({ vacationWeeks: clamped, weeksWorkedPerYear })
      },

      setMonthlyBusinessExpenses: (value: number) => {
        const validated = validateAndClampConfig({ monthlyBusinessExpenses: value })
        set({ monthlyBusinessExpenses: validated.monthlyBusinessExpenses ?? 0 })
      },

      setMonthlyPersonalNeed: (value: number | null) => {
        const validated = validateAndClampConfig({ monthlyPersonalNeed: value })
        set({ monthlyPersonalNeed: validated.monthlyPersonalNeed ?? null })
      },

      setCurrentSavings: (value: number | null) => {
        const validated = validateAndClampConfig({ currentSavings: value })
        set({ currentSavings: validated.currentSavings ?? null })
      },

      setTargetAnnualNet: (value: number | null) => {
        const clamped = value === null ? null : Math.max(0, Math.min(100_000_000, value))
        set({ targetAnnualNet: clamped })
      },

      setTaxRate: (value: number) => {
        const validated = validateAndClampConfig({ taxRate: value })
        set({ taxRate: validated.taxRate })
      },

      setTaxMode: (mode: TaxMode) => {
        set({ taxMode: mode })
      },

      setCurrency: (currency: Currency) => {
        set({ currency })
      },

      setBillingCurrency: (currency: Currency) => {
        set({ billingCurrency: currency })
      },

      setSpendingCurrency: (currency: Currency) => {
        set({ spendingCurrency: currency })
      },

      switchCurrency: (nextCurrency: Currency, mxnToUsdRate: number | null) => {
        const state = get()
        const currentCurrency = state.currency
        if (nextCurrency === currentCurrency) return

        const rate = mxnToUsdRate
        const canConvert =
          typeof rate === 'number' && Number.isFinite(rate) && rate > 0

        const convert = (amount: number): number => {
          if (!canConvert) return amount
          if (currentCurrency === 'MXN' && nextCurrency === 'USD') return amount * rate
          if (currentCurrency === 'USD' && nextCurrency === 'MXN') return amount / rate
          return amount
        }

        const nextSnapshot = validateAndClampConfig({
          hourlyRate: convert(state.hourlyRate),
          hoursPerWeek: state.hoursPerWeek,
          unbillableHoursPerWeek: state.unbillableHoursPerWeek,
          vacationWeeks: 52 - state.weeksWorkedPerYear,
          monthlyBusinessExpenses: convert(state.monthlyBusinessExpenses),
          monthlyPersonalNeed:
            state.monthlyPersonalNeed === null ? null : convert(state.monthlyPersonalNeed),
          currentSavings:
            state.currentSavings === null ? null : convert(state.currentSavings),
          targetAnnualNet:
            state.targetAnnualNet === null ? null : convert(state.targetAnnualNet),
          taxRate: state.taxRate,
          taxMode: state.taxMode,
        })

        const nextPessimistic = validateAndClampConfig({
          hourlyRate: convert(state.scenarios.pessimistic.hourlyRate),
          hoursPerWeek: state.scenarios.pessimistic.hoursPerWeek,
          vacationWeeks: state.scenarios.pessimistic.vacationWeeks,
          taxRate: state.taxRate,
        })

        const nextRealistic = validateAndClampConfig({
          hourlyRate: convert(state.scenarios.realistic.hourlyRate),
          hoursPerWeek: state.scenarios.realistic.hoursPerWeek,
          vacationWeeks: state.scenarios.realistic.vacationWeeks,
          taxRate: state.taxRate,
        })

        const nextOptimistic = validateAndClampConfig({
          hourlyRate: convert(state.scenarios.optimistic.hourlyRate),
          hoursPerWeek: state.scenarios.optimistic.hoursPerWeek,
          vacationWeeks: state.scenarios.optimistic.vacationWeeks,
          taxRate: state.taxRate,
        })

        set({
          currency: nextCurrency,
          hourlyRate: nextSnapshot.hourlyRate,
          hoursPerWeek: nextSnapshot.hoursPerWeek,
          unbillableHoursPerWeek: nextSnapshot.unbillableHoursPerWeek,
          weeksWorkedPerYear: 52 - nextSnapshot.vacationWeeks,
          vacationWeeks: nextSnapshot.vacationWeeks,
          monthlyBusinessExpenses: nextSnapshot.monthlyBusinessExpenses ?? 0,
          monthlyPersonalNeed: nextSnapshot.monthlyPersonalNeed ?? null,
          currentSavings: nextSnapshot.currentSavings ?? null,
          targetAnnualNet: nextSnapshot.targetAnnualNet ?? null,
          taxRate: nextSnapshot.taxRate,
          taxMode: nextSnapshot.taxMode,
          scenarios: {
            pessimistic: {
              hourlyRate: nextPessimistic.hourlyRate,
              hoursPerWeek: nextPessimistic.hoursPerWeek,
              vacationWeeks: nextPessimistic.vacationWeeks,
            },
            realistic: {
              hourlyRate: nextRealistic.hourlyRate,
              hoursPerWeek: nextRealistic.hoursPerWeek,
              vacationWeeks: nextRealistic.vacationWeeks,
            },
            optimistic: {
              hourlyRate: nextOptimistic.hourlyRate,
              hoursPerWeek: nextOptimistic.hoursPerWeek,
              vacationWeeks: nextOptimistic.vacationWeeks,
            },
          },
        })
      },

      setLanguage: (language: Language) => {
        set({ language })
      },

      setTheme: (theme: Theme) => {
        set({ theme })
      },

      setFxStatus: (status: FxStatus) => {
        set({ fxStatus: status })
      },

      setMxnToUsdRate: (rate: number | null, updatedAt: number | null) => {
        set({ mxnToUsdRate: rate, mxnToUsdRateUpdatedAt: updatedAt })
      },

      setUserExchangeRate: (rate: number | null) => {
        set({ userExchangeRate: rate })
      },

      setScenario: (
        scenario: 'pessimistic' | 'realistic' | 'optimistic',
        inputs: Partial<ScenarioInputs>
      ) => {
        const state = get()
        const validated = validateAndClampConfig({
          hourlyRate: inputs.hourlyRate ?? state.scenarios[scenario].hourlyRate,
          hoursPerWeek:
            inputs.hoursPerWeek ?? state.scenarios[scenario].hoursPerWeek,
          vacationWeeks:
            inputs.vacationWeeks ?? state.scenarios[scenario].vacationWeeks,
          taxRate: state.taxRate,
        })

        set({
          scenarios: {
            ...state.scenarios,
            [scenario]: {
              hourlyRate: validated.hourlyRate,
              hoursPerWeek: validated.hoursPerWeek,
              vacationWeeks: validated.vacationWeeks,
            },
          },
        })
      },

      setMonthlyMultipliers: (multipliers: number[]) => {
        if (multipliers.length === 12) {
          set({ monthlyMultipliers: multipliers })
        }
      },

      resetToDefaults: () => {
        set({
          hourlyRate: DEFAULT_CONFIG.hourlyRate,
          hoursPerWeek: DEFAULT_CONFIG.hoursPerWeek,
          unbillableHoursPerWeek: 0,
          weeksWorkedPerYear: 48,
          vacationWeeks: 4,
          monthlyBusinessExpenses: DEFAULT_CONFIG.monthlyBusinessExpenses ?? 0,
          monthlyPersonalNeed: DEFAULT_CONFIG.monthlyPersonalNeed ?? null,
          currentSavings: DEFAULT_CONFIG.currentSavings ?? null,
          targetAnnualNet: null,
          taxRate: DEFAULT_CONFIG.taxRate,
          taxMode: 'simple' as TaxMode,
          userExchangeRate: 20,
        })
      },

      getConfig: () => {
        const state = get()
        return {
          hourlyRate: state.hourlyRate,
          hoursPerWeek: state.hoursPerWeek,
          unbillableHoursPerWeek: state.unbillableHoursPerWeek,
          vacationWeeks: 52 - state.weeksWorkedPerYear,
          monthlyBusinessExpenses: state.monthlyBusinessExpenses,
          monthlyPersonalNeed: state.monthlyPersonalNeed,
          currentSavings: state.currentSavings,
          targetAnnualNet: state.targetAnnualNet,
          taxRate: state.taxRate,
          taxMode: state.taxMode,
        }
      },
    }),
    {
      name: 'income-planner-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        hourlyRate: state.hourlyRate,
        hoursPerWeek: state.hoursPerWeek,
        unbillableHoursPerWeek: state.unbillableHoursPerWeek,
        weeksWorkedPerYear: state.weeksWorkedPerYear,
        vacationWeeks: state.vacationWeeks,
        monthlyBusinessExpenses: state.monthlyBusinessExpenses,
        monthlyPersonalNeed: state.monthlyPersonalNeed,
        currentSavings: state.currentSavings,
        targetAnnualNet: state.targetAnnualNet,
        taxRate: state.taxRate,
        taxMode: state.taxMode,
        currency: state.currency,
        billingCurrency: state.billingCurrency,
        spendingCurrency: state.spendingCurrency,
        language: state.language,
        userExchangeRate: state.userExchangeRate,
        scenarios: state.scenarios,
        monthlyMultipliers: state.monthlyMultipliers,
        viewMode: state.viewMode,
        theme: state.theme,
        mxnToUsdRate: state.mxnToUsdRate,
        mxnToUsdRateUpdatedAt: state.mxnToUsdRateUpdatedAt,
      }),
    }
  )
)
