'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { validateAndClampConfig, IncomeConfig } from './calculations'

export type Currency = 'MXN' | 'USD'
export type Language = 'en' | 'es'
export type ViewMode = 'snapshot' | 'forecast'

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
  vacationWeeks: number
  taxRate: number
  targetAnnualNet: number | null
  currency: Currency
  language: Language

  // Forecast mode - three scenarios
  scenarios: {
    pessimistic: ScenarioInputs
    realistic: ScenarioInputs
    optimistic: ScenarioInputs
  }

  // Actions
  setViewMode: (mode: ViewMode) => void
  setHourlyRate: (value: number) => void
  setHoursPerWeek: (value: number) => void
  setVacationWeeks: (value: number) => void
  setTaxRate: (value: number) => void
  setTargetAnnualNet: (value: number | null) => void
  setCurrency: (currency: Currency) => void
  setLanguage: (language: Language) => void
  setScenario: (scenario: 'pessimistic' | 'realistic' | 'optimistic', inputs: Partial<ScenarioInputs>) => void
  resetToDefaults: () => void
  getConfig: () => IncomeConfig
}

const DEFAULT_CONFIG: IncomeConfig = {
  hourlyRate: 500,
  hoursPerWeek: 40,
  vacationWeeks: 2,
  taxRate: 25,
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
    vacationWeeks: DEFAULT_CONFIG.vacationWeeks,
    taxRate: DEFAULT_CONFIG.taxRate,
    targetAnnualNet: null,
    currency: 'MXN',
    language: 'en',

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

    setVacationWeeks: (value: number) => {
      const validated = validateAndClampConfig({ vacationWeeks: value })
      set({ vacationWeeks: validated.vacationWeeks })
    },

    setTaxRate: (value: number) => {
      const validated = validateAndClampConfig({ taxRate: value })
      set({ taxRate: validated.taxRate })
    },

    setTargetAnnualNet: (value: number | null) => {
      set({ targetAnnualNet: value })
    },

    setCurrency: (currency: Currency) => {
      set({ currency })
    },

    setLanguage: (language: Language) => {
      set({ language })
    },

    setScenario: (scenario: 'pessimistic' | 'realistic' | 'optimistic', inputs: Partial<ScenarioInputs>) => {
      const state = get()
      const validated = validateAndClampConfig({
        hourlyRate: inputs.hourlyRate ?? state.scenarios[scenario].hourlyRate,
        hoursPerWeek: inputs.hoursPerWeek ?? state.scenarios[scenario].hoursPerWeek,
        vacationWeeks: inputs.vacationWeeks ?? state.scenarios[scenario].vacationWeeks,
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

    resetToDefaults: () => {
      set({
        hourlyRate: DEFAULT_CONFIG.hourlyRate,
        hoursPerWeek: DEFAULT_CONFIG.hoursPerWeek,
        vacationWeeks: DEFAULT_CONFIG.vacationWeeks,
        taxRate: DEFAULT_CONFIG.taxRate,
        targetAnnualNet: null,
      })
    },

    getConfig: () => {
      const state = get()
      return {
        hourlyRate: state.hourlyRate,
        hoursPerWeek: state.hoursPerWeek,
        vacationWeeks: state.vacationWeeks,
        taxRate: state.taxRate,
      }
    },
    }),
    {
      name: 'income-planner-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        hourlyRate: state.hourlyRate,
        hoursPerWeek: state.hoursPerWeek,
        vacationWeeks: state.vacationWeeks,
        taxRate: state.taxRate,
        currency: state.currency,
        language: state.language,
        scenarios: state.scenarios,
        viewMode: state.viewMode,
      }),
    }
  )
)
