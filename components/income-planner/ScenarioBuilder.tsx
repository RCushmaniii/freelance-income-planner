'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'

export default function ScenarioBuilder() {
  const { scenarios, taxRate, setScenario, language } = useIncomePlannerStore()
  const t = useTranslation(language)

  const handleScenarioChange = (
    scenario: 'pessimistic' | 'realistic' | 'optimistic',
    field: 'hourlyRate' | 'hoursPerWeek' | 'vacationWeeks',
    value: string
  ) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setScenario(scenario, { [field]: num })
    }
  }

  const scenarioData = [
    {
      key: 'pessimistic' as const,
      label: t.scenarios.pessimistic,
      description: t.scenarios.pessimisticDesc,
      color: 'text-red-400',
    },
    {
      key: 'realistic' as const,
      label: t.scenarios.realistic,
      description: t.scenarios.realisticDesc,
      color: 'text-blue-400',
    },
    {
      key: 'optimistic' as const,
      label: t.scenarios.optimistic,
      description: t.scenarios.optimisticDesc,
      color: 'text-green-400',
    },
  ]

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-6 text-center">
        {t.scenarios.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarioData.map((scenario) => (
          <div
            key={scenario.key}
            className="bg-background border border-muted-strong/20 rounded-xl p-6"
          >
            <h3 className={`font-heading text-lg font-bold mb-1 ${scenario.color}`}>
              {scenario.label}
            </h3>
            <p className="text-xs text-muted mb-4">{scenario.description}</p>

            <div className="space-y-4">
              {/* Hourly Rate */}
              <div>
                <label className="block text-xs font-medium mb-1 text-muted-strong">
                  {t.inputs.hourlyRate}
                </label>
                <input
                  type="number"
                  value={scenarios[scenario.key].hourlyRate}
                  onChange={(e) =>
                    handleScenarioChange(scenario.key, 'hourlyRate', e.target.value)
                  }
                  className="w-full bg-background border border-muted-strong/30 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              {/* Hours Per Week */}
              <div>
                <label className="block text-xs font-medium mb-1 text-muted-strong">
                  {t.inputs.hoursPerWeek}
                </label>
                <input
                  type="number"
                  value={scenarios[scenario.key].hoursPerWeek}
                  onChange={(e) =>
                    handleScenarioChange(scenario.key, 'hoursPerWeek', e.target.value)
                  }
                  className="w-full bg-background border border-muted-strong/30 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>

              {/* Vacation Weeks */}
              <div>
                <label className="block text-xs font-medium mb-1 text-muted-strong">
                  {t.inputs.vacationWeeks}
                </label>
                <input
                  type="number"
                  value={scenarios[scenario.key].vacationWeeks}
                  onChange={(e) =>
                    handleScenarioChange(scenario.key, 'vacationWeeks', e.target.value)
                  }
                  className="w-full bg-background border border-muted-strong/30 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shared Tax Rate */}
      <div className="mt-6 max-w-xs mx-auto">
        <label className="block text-sm font-medium mb-2 text-center">
          {t.scenarios.sharedTaxRate}
        </label>
        <div className="text-center">
          <span className="text-2xl font-bold text-accent">{taxRate}%</span>
        </div>
      </div>
    </div>
  )
}
