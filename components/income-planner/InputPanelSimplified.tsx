'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'

export default function InputPanelSimplified() {
  const {
    hourlyRate,
    hoursPerWeek,
    weeksWorkedPerYear,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    taxRate,
    currency,
    billingCurrency,
    spendingCurrency,
    userExchangeRate,
    language,
    setHourlyRate,
    setHoursPerWeek,
    setWeeksWorkedPerYear,
    setMonthlyBusinessExpenses,
    setMonthlyPersonalNeed,
    setTaxRate,
    setCurrency,
    setBillingCurrency,
    setSpendingCurrency,
    setUserExchangeRate,
  } = useIncomePlannerStore()

  const t = useTranslation(language)

  const handleInputChange = (
    value: string,
    setter: (val: number) => void,
    allowDecimal = false
  ) => {
    if (value === '') {
      setter(0)
      return
    }
    const num = parseFloat(value)
    if (!isNaN(num) && isFinite(num)) {
      // Round to whole number unless decimals are explicitly allowed (for exchange rate)
      const finalValue = allowDecimal ? num : Math.round(num)
      setter(finalValue)
    }
  }

  const handleNullableInputChange = (
    value: string,
    setter: (val: number | null) => void
  ) => {
    if (value === '') {
      setter(null)
      return
    }
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setter(num)
    }
  }

  const isCrossCurrency = billingCurrency !== spendingCurrency

  return (
    <Card className="p-6">
      <h2 className="text-xl font-heading font-bold mb-6">{t.inputs.title}</h2>

      <div className="space-y-6">
        {/* Smart Currency Selector - moved to top */}
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block mb-2 text-xs font-bold text-muted-strong uppercase">
                {t.inputs?.billingCurrency || 'I Bill In'}
              </Label>
              <select
                className="w-full p-2 border border-muted-strong/30 rounded bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent"
                value={billingCurrency}
                onChange={(e) => setBillingCurrency(e.target.value as any)}
              >
                <option value="USD">USD ($)</option>
                <option value="MXN">MXN ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <div>
              <Label className="block mb-2 text-xs font-bold text-muted-strong uppercase">
                {t.inputs?.spendingCurrency || 'I Spend In'}
              </Label>
              <select
                className="w-full p-2 border border-muted-strong/30 rounded bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent"
                value={spendingCurrency}
                onChange={(e) => setSpendingCurrency(e.target.value as any)}
              >
                <option value="USD">USD ($)</option>
                <option value="MXN">MXN ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>

          {/* Conditionally show exchange rate field */}
          {isCrossCurrency && (
            <div className="pt-2 animate-fade-in">
              <Label className="block mb-2 text-sm">
                {t.inputs?.exchangeRate || 'Exchange Rate'} (1 {billingCurrency} = ? {spendingCurrency})
                <Tooltip text={t.inputs?.exchangeRateTooltip || 'The exchange rate used to convert your billing currency to your spending currency.'} />
              </Label>
              <Input
                id="exchangeRate"
                type="number"
                value={userExchangeRate ?? ''}
                onChange={(e) =>
                  handleNullableInputChange(e.target.value, setUserExchangeRate)
                }
                min="0"
                step="0.01"
                placeholder="18.50"
              />
            </div>
          )}
        </div>

        {/* Billing Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-strong uppercase tracking-wide">
            {t.inputs.billingSection}
          </h3>

          <div>
            <Label htmlFor="hourlyRate" className="block mb-2">
              {t.inputs.hourlyRate} ({billingCurrency})
            </Label>
            <Input
              id="hourlyRate"
              type="number"
              value={hourlyRate}
              onChange={(e) => handleInputChange(e.target.value, setHourlyRate, true)}
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <Label htmlFor="hoursPerWeek" className="block mb-2">
              {t.inputs.hoursPerWeek}
            </Label>
            <Input
              id="hoursPerWeek"
              type="number"
              value={hoursPerWeek}
              onChange={(e) => handleInputChange(e.target.value, setHoursPerWeek)}
              min="0"
              max="168"
            />
          </div>

          <div>
            <Label htmlFor="weeksWorkedPerYear" className="block mb-2">
              {t.inputs.weeksWorkedPerYear}
            </Label>
            <Input
              id="weeksWorkedPerYear"
              type="number"
              value={weeksWorkedPerYear}
              onChange={(e) => handleInputChange(e.target.value, setWeeksWorkedPerYear)}
              min="1"
              max="52"
            />
          </div>
        </div>

        {/* Deductions Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-strong uppercase tracking-wide">
            {t.inputs.deductionsSection}
          </h3>

          <div>
            <Label htmlFor="taxRate" className="block mb-2">
              {t.inputs.taxRate}
            </Label>
            <Input
              id="taxRate"
              type="number"
              value={taxRate}
              onChange={(e) => handleInputChange(e.target.value, setTaxRate, true)}
              min="0"
              max="100"
              step="0.1"
            />
            <p className="text-xs text-muted mt-1">{t.inputs.taxRateHelp}</p>
          </div>

          <div>
            <Label htmlFor="monthlyBusinessExpenses" className="block mb-2">
              {t.inputs.monthlyBusinessExpenses} ({spendingCurrency})
            </Label>
            <Input
              id="monthlyBusinessExpenses"
              type="number"
              value={monthlyBusinessExpenses}
              onChange={(e) =>
                handleInputChange(e.target.value, setMonthlyBusinessExpenses)
              }
              min="0"
              step="1"
            />
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Label htmlFor="monthlyPersonalNeed">
                {t.inputs.monthlyPersonalNeed} ({spendingCurrency})
              </Label>
              <Tooltip text={t.inputs?.burnRateTooltip || "Your 'Burn Rate'. Rent, food, and essentials to survive."} />
            </div>
            <Input
              id="monthlyPersonalNeed"
              type="number"
              value={monthlyPersonalNeed ?? ''}
              onChange={(e) =>
                handleNullableInputChange(e.target.value, setMonthlyPersonalNeed)
              }
              min="0"
              step="1"
              placeholder={t.inputs.optional}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
