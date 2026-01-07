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
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    setScenario,
    setTaxRate,
    setTaxMode,
    setMonthlyBusinessExpenses,
    setMonthlyPersonalNeed,
    billingCurrency,
    spendingCurrency,
    language,
  } = useIncomePlannerStore()
  const t = useTranslation(language)

  const handleTaxRateChange = (value: number) => {
    setTaxRate(value)
  }

  const handleBusinessExpensesChange = (value: number) => {
    setMonthlyBusinessExpenses(Math.round(value))
  }

  const handlePersonalExpensesChange = (value: number) => {
    setMonthlyPersonalNeed(Math.round(value))
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
                  label={`${t.inputs.hourlyRate} (${billingCurrency})`}
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

      {/* Adjustable Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Tax Rate Slider */}
        <Card className="p-5 bg-card-bg border-card-border min-h-[140px] flex flex-col justify-between">
          <div className="flex flex-col gap-1 mb-4">
            <Label className="text-[10px] font-bold text-muted uppercase tracking-widest truncate w-full">
              {t.inputs.taxRate}
            </Label>
            <span className="text-3xl font-black tracking-tight">{taxRate.toFixed(1)}%</span>
          </div>
          
          <div className="relative w-full h-6 flex items-center mb-2">
            {/* Background Track */}
            <div className="absolute w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--slider-track-bg)' }}>
              {/* Fill Track */}
              <div 
                className="h-full transition-all duration-100 ease-out"
                style={{ 
                  width: `${(taxRate / 50) * 100}%`,
                  background: 'var(--slider-track-fill)'
                }}
              />
            </div>
            
            {/* Native Range Input */}
            <input
              type="range"
              min="0"
              max="50"
              step="0.1"
              value={taxRate}
              onChange={(e) => handleTaxRateChange(parseFloat(e.target.value))}
              className="horizontal-slider absolute w-full opacity-0 cursor-pointer z-20"
            />
            
            {/* Visual Thumb */}
            <div 
              className="absolute w-5 h-5 bg-white border-4 rounded-full shadow-md z-10 pointer-events-none transition-all duration-100 ease-out"
              style={{ 
                left: `calc(${(taxRate / 50) * 100}% - 10px)`,
                borderColor: 'var(--accent)'
              }}
            />
          </div>
          
          <div className="flex justify-between text-[10px] text-muted/50 font-bold mt-2">
            <span>0%</span>
            <span>50%</span>
          </div>
        </Card>

        {/* Business Expenses Slider */}
        <Card className="p-5 bg-card-bg border-card-border min-h-[140px] flex flex-col justify-between">
          <div className="flex flex-col gap-1 mb-4">
            <Label className="text-[10px] font-bold text-muted uppercase tracking-widest truncate w-full">
              {t.inputs.businessExpenses}
            </Label>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-muted">{spendingCurrency}</span>
              <span className="text-3xl font-black tracking-tight">{monthlyBusinessExpenses.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="relative w-full h-6 flex items-center mb-2">
            {/* Background Track */}
            <div className="absolute w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--slider-track-bg)' }}>
              {/* Fill Track */}
              <div 
                className="h-full transition-all duration-100 ease-out"
                style={{ 
                  width: `${(monthlyBusinessExpenses / 50000) * 100}%`,
                  background: 'var(--slider-track-fill)'
                }}
              />
            </div>
            
            {/* Native Range Input */}
            <input
              type="range"
              min="0"
              max="50000"
              step="100"
              value={monthlyBusinessExpenses}
              onChange={(e) => handleBusinessExpensesChange(parseFloat(e.target.value))}
              className="horizontal-slider absolute w-full opacity-0 cursor-pointer z-20"
            />
            
            {/* Visual Thumb */}
            <div 
              className="absolute w-5 h-5 bg-white border-4 rounded-full shadow-md z-10 pointer-events-none transition-all duration-100 ease-out"
              style={{ 
                left: `calc(${(monthlyBusinessExpenses / 50000) * 100}% - 10px)`,
                borderColor: 'var(--accent)'
              }}
            />
          </div>
          
          <div className="flex justify-between text-[10px] text-muted/50 font-bold mt-2">
            <span>0</span>
            <span>50k</span>
          </div>
        </Card>

        {/* Personal Expenses Slider */}
        <Card className="p-5 bg-card-bg border-card-border min-h-[140px] flex flex-col justify-between">
          <div className="flex flex-col gap-1 mb-4">
            <Label className="text-[10px] font-bold text-muted uppercase tracking-widest truncate w-full">
              {t.inputs.personalNeed}
            </Label>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-muted">{spendingCurrency}</span>
              <span className="text-3xl font-black tracking-tight">{(monthlyPersonalNeed || 0).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="relative w-full h-6 flex items-center mb-2">
            {/* Background Track */}
            <div className="absolute w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--slider-track-bg)' }}>
              {/* Fill Track */}
              <div 
                className="h-full transition-all duration-100 ease-out"
                style={{ 
                  width: `${((monthlyPersonalNeed || 0) / 50000) * 100}%`,
                  background: 'var(--slider-track-fill)'
                }}
              />
            </div>
            
            {/* Native Range Input */}
            <input
              type="range"
              min="0"
              max="50000"
              step="100"
              value={monthlyPersonalNeed || 0}
              onChange={(e) => handlePersonalExpensesChange(parseFloat(e.target.value))}
              className="horizontal-slider absolute w-full opacity-0 cursor-pointer z-20"
            />
            
            {/* Visual Thumb */}
            <div 
              className="absolute w-5 h-5 bg-white border-4 rounded-full shadow-md z-10 pointer-events-none transition-all duration-100 ease-out"
              style={{ 
                left: `calc(${((monthlyPersonalNeed || 0) / 50000) * 100}% - 10px)`,
                borderColor: 'var(--accent)'
              }}
            />
          </div>
          
          <div className="flex justify-between text-[10px] text-muted/50 font-bold mt-2">
            <span>0</span>
            <span>50k</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
