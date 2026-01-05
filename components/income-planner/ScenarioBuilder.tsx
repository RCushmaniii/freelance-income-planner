'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'

export default function ScenarioBuilder() {
  const {
    scenarios,
    taxRate,
    taxMode,
    setScenario,
    setTaxRate,
    setTaxMode,
    language,
  } = useIncomePlannerStore()
  const t = useTranslation(language)

  const handleTaxRateChange = (value: string) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setTaxRate(num)
    }
  }

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
      color: 'var(--chart-pessimistic)',
    },
    {
      key: 'realistic' as const,
      label: t.scenarios.realistic,
      description: t.scenarios.realisticDesc,
      color: 'var(--chart-realistic)',
    },
    {
      key: 'optimistic' as const,
      label: t.scenarios.optimistic,
      description: t.scenarios.optimisticDesc,
      color: 'var(--chart-optimistic)',
    },
  ]

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-6 text-center">
        {t.scenarios.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarioData.map((scenario) => (
          <Card
            key={scenario.key}
            className="p-6"
          >
            <h3 className="font-heading text-lg font-bold mb-1" style={{ color: scenario.color }}>
              {scenario.label}
            </h3>
            <p className="text-xs text-muted mb-4">{scenario.description}</p>

            <div className="space-y-4">
              {/* Hourly Rate */}
              <div>
                <Input
                  label={t.inputs.hourlyRate}
                  type="number"
                  value={scenarios[scenario.key].hourlyRate}
                  onChange={(e) =>
                    handleScenarioChange(scenario.key, 'hourlyRate', e.target.value)
                  }
                  className="px-3 py-2 text-sm"
                />
              </div>

              {/* Hours Per Week */}
              <div>
                <Input
                  label={t.inputs.hoursPerWeek}
                  type="number"
                  value={scenarios[scenario.key].hoursPerWeek}
                  onChange={(e) =>
                    handleScenarioChange(scenario.key, 'hoursPerWeek', e.target.value)
                  }
                  className="px-3 py-2 text-sm"
                />
              </div>

              {/* Vacation Weeks */}
              <div>
                <Input
                  label={t.inputs.vacationWeeks}
                  type="number"
                  value={scenarios[scenario.key].vacationWeeks}
                  onChange={(e) =>
                    handleScenarioChange(scenario.key, 'vacationWeeks', e.target.value)
                  }
                  className="px-3 py-2 text-sm"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Shared Tax */}
      <Card className="mt-8 max-w-md mx-auto p-6">
        <Label className="block text-sm font-medium mb-3 text-center">
          {t.scenarios.sharedTaxRate}
        </Label>

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => setTaxMode('simple')}
            variant={taxMode === 'simple' ? 'primary' : 'outline'}
            className="flex-1 py-2.5"
          >
            {t.inputs.taxModeSimple}
          </Button>
          <Button
            type="button"
            onClick={() => setTaxMode('smart')}
            variant={taxMode === 'smart' ? 'primary' : 'outline'}
            className="flex-1 py-2.5"
          >
            {t.inputs.taxModeSmart}
          </Button>
        </div>

        {taxMode === 'simple' ? (
          <div className="mt-4">
            <Input
              label={t.inputs.taxRate}
              type="number"
              value={taxRate}
              onChange={(e) => handleTaxRateChange(e.target.value)}
              placeholder="25"
              className="px-3 py-2 text-sm"
              helperText={`${t.inputs.rangeLabel}: 0 - 50%`}
            />
          </div>
        ) : (
          <p className="text-xs text-muted-strong mt-3 text-center">{t.inputs.taxModeHelp}</p>
        )}
      </Card>
    </div>
  )
}
