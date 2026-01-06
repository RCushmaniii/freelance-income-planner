'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { fetchFxQuote } from '@/lib/fx'
import toast from 'react-hot-toast'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'

export default function InputPanel() {
  const {
    hourlyRate,
    hoursPerWeek,
    unbillableHoursPerWeek,
    vacationWeeks,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    currentSavings,
    taxRate,
    taxMode,
    targetAnnualNet,
    currency,
    billingCurrency,
    spendingCurrency,
    userExchangeRate,
    language,
    mxnToUsdRate,
    mxnToUsdRateUpdatedAt,
    fxStatus,
    setHourlyRate,
    setHoursPerWeek,
    setUnbillableHoursPerWeek,
    setVacationWeeks,
    setMonthlyBusinessExpenses,
    setMonthlyPersonalNeed,
    setCurrentSavings,
    setTaxRate,
    setTaxMode,
    setTargetAnnualNet,
    setCurrency,
    setBillingCurrency,
    setSpendingCurrency,
    setUserExchangeRate,
    switchCurrency,
    setLanguage,
    setFxStatus,
    setMxnToUsdRate,
  } = useIncomePlannerStore()
  const t = useTranslation(language)

  const handleInputChange = (
    value: string,
    setter: (val: number) => void
  ) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setter(num)
    }
  }

  const handleNullableChange = (
    value: string,
    setter: (val: number | null) => void
  ) => {
    const trimmed = value.trim()
    if (trimmed.length === 0) {
      setter(null)
      return
    }

    const num = parseFloat(trimmed)
    if (!isNaN(num)) {
      setter(num)
    }
  }

  const handleTargetChange = (value: string) => {
    const trimmed = value.trim()
    if (trimmed.length === 0) {
      setTargetAnnualNet(null)
      return
    }

    const num = parseFloat(trimmed)
    if (!isNaN(num)) {
      setTargetAnnualNet(num)
    }
  }

  const ensureMxnToUsdRate = async (): Promise<number | null> => {
    if (typeof mxnToUsdRate === 'number' && Number.isFinite(mxnToUsdRate) && mxnToUsdRate > 0) {
      return mxnToUsdRate
    }

    setFxStatus('loading')
    try {
      const quote = await fetchFxQuote({ base: 'MXN', target: 'USD' })
      const updatedAt = typeof quote.timeLastUpdateUnix === 'number'
        ? quote.timeLastUpdateUnix * 1000
        : Date.now()
      setMxnToUsdRate(quote.rate, updatedAt)
      setFxStatus('ready')
      return quote.rate
    } catch (err) {
      setFxStatus('error')
      toast.error(t.toast.fxFetchError)
      return null
    }
  }

  const handleCurrencyChange = async (newCurrency: 'MXN' | 'USD') => {
    if (newCurrency === currency) return

    const rate = await ensureMxnToUsdRate()

    if (rate) {
      switchCurrency(newCurrency, rate)
    } else {
      setCurrency(newCurrency)
    }

    toast.success(`${t.toast.currencyChanged} ${newCurrency}`)
  }

  const handleLanguageChange = (newLanguage: 'en' | 'es') => {
    setLanguage(newLanguage)
    const msg = newLanguage === 'en' ? t.toast.languageChanged : t.toast.languageChangedEs
    toast.success(msg)
  }

  return (
    <Card>
      <h2 className="font-heading text-2xl font-bold mb-6">
        {t.inputs.title}
      </h2>

      <div className="space-y-6">
        {/* Hourly Rate */}
        <div>
          <Input
            id="hourlyRate"
            label={t.inputs.hourlyRate}
            type="number"
            value={hourlyRate}
            onChange={(e) => handleInputChange(e.target.value, setHourlyRate)}
            placeholder="500"
            rightElement={billingCurrency}
            helperText={`${t.inputs.rangeLabel}: 50 - 5000`}
          />
        </div>

        {/* Hours Per Week */}
        <div>
          <Input
            id="hoursPerWeek"
            label={t.inputs.hoursPerWeek}
            type="number"
            value={hoursPerWeek}
            onChange={(e) => handleInputChange(e.target.value, setHoursPerWeek)}
            placeholder="40"
            helperText={`${t.inputs.rangeLabel}: 0 - 60`}
          />
        </div>

        <div>
          <Input
            id="unbillableHoursPerWeek"
            label={t.inputs.unbillableHoursPerWeek}
            type="number"
            value={unbillableHoursPerWeek}
            onChange={(e) => handleInputChange(e.target.value, setUnbillableHoursPerWeek)}
            placeholder="10"
            helperText={`${t.inputs.rangeLabel}: 0 - 40`}
          />
        </div>

        {/* Vacation Weeks */}
        <div>
          <Input
            id="vacationWeeks"
            label={t.inputs.vacationWeeks}
            type="number"
            value={vacationWeeks}
            onChange={(e) => handleInputChange(e.target.value, setVacationWeeks)}
            placeholder="2"
            helperText={`${t.inputs.rangeLabel}: 0 - 12`}
          />
        </div>

        <div>
          <Input
            id="monthlyBusinessExpenses"
            label={t.inputs.monthlyBusinessExpenses}
            type="number"
            value={monthlyBusinessExpenses}
            onChange={(e) => handleInputChange(e.target.value, setMonthlyBusinessExpenses)}
            placeholder="0"
            rightElement={spendingCurrency}
          />
        </div>

        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <Label htmlFor="monthlyPersonalNeed">
                {t.inputs.monthlyPersonalNeed}
              </Label>
              <Tooltip text={t.inputs?.burnRateTooltip || "Your 'Burn Rate'. Rent, food, and essentials to survive."} />
            </div>
            <Input
              id="monthlyPersonalNeed"
              type="number"
              value={monthlyPersonalNeed ?? ''}
              onChange={(e) => handleNullableChange(e.target.value, setMonthlyPersonalNeed)}
              placeholder=""
              rightElement={spendingCurrency}
            />
          </div>

          <div>
            <Input
              id="currentSavings"
              label={t.inputs.currentSavings}
              type="number"
              value={currentSavings ?? ''}
              onChange={(e) => handleNullableChange(e.target.value, setCurrentSavings)}
              placeholder=""
              rightElement={spendingCurrency}
            />
          </div>
        </div>

        {/* Tax Rate */}
        <div>
          <Label className="block mb-2">{t.inputs.taxMode}</Label>

          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => setTaxMode('simple')}
              variant={taxMode === 'simple' ? 'primary' : 'outline'}
              className="flex-1"
            >
              {t.inputs.taxModeSimple}
            </Button>
            <Button
              type="button"
              onClick={() => setTaxMode('smart')}
              variant={taxMode === 'smart' ? 'primary' : 'outline'}
              className="flex-1"
            >
              {t.inputs.taxModeSmart}
            </Button>
          </div>

          {taxMode === 'simple' ? (
            <div className="mt-4">
              <Input
                id="taxRate"
                label={t.inputs.taxRate}
                type="number"
                value={taxRate}
                onChange={(e) => handleInputChange(e.target.value, setTaxRate)}
                placeholder="25"
                helperText={`${t.inputs.rangeLabel}: 0 - 50%`}
              />
            </div>
          ) : (
            <p className="text-xs text-muted-strong mt-2">{t.inputs.taxModeHelp}</p>
          )}
        </div>

        {/* Target Annual Net */}
        <div>
          <Input
            id="targetAnnualNet"
            label={t.inputs.targetAnnualNet}
            type="number"
            value={targetAnnualNet ?? ''}
            onChange={(e) => handleTargetChange(e.target.value)}
            placeholder="100000"
            rightElement={spendingCurrency}
            helperText={t.inputs.targetPlaceholder}
          />
        </div>

        {/* Smart Currency Selector */}
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
          {billingCurrency !== spendingCurrency && (
            <div className="pt-2 animate-fade-in">
              <Label className="block mb-2 text-sm">
                {t.inputs?.exchangeRate || 'Exchange Rate'} (1 {billingCurrency} = ? {spendingCurrency})
                <Tooltip text={t.inputs?.exchangeRateTooltip || 'The exchange rate used to convert your billing currency to your spending currency.'} />
              </Label>
              <Input
                id="exchangeRate"
                type="number"
                value={userExchangeRate ?? ''}
                onChange={(e) => handleNullableChange(e.target.value, setUserExchangeRate)}
                placeholder="18.50"
                helperText={t.inputs?.exchangeRateHelper || 'Enter the current exchange rate'}
              />
            </div>
          )}
        </div>

      </div>
    </Card>
  )
}
