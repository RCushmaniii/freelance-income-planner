'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import toast from 'react-hot-toast'

export default function InputPanel() {
  const {
    hourlyRate,
    hoursPerWeek,
    vacationWeeks,
    taxRate,
    currency,
    language,
    setHourlyRate,
    setHoursPerWeek,
    setVacationWeeks,
    setTaxRate,
    setCurrency,
    setLanguage,
  } = useIncomePlannerStore()
  const t = useTranslation(language)

  const handleInputChange = (
    value: string,
    setter: (val: number) => void,
    fieldName: string
  ) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setter(num)
    }
  }

  const handleCurrencyChange = (newCurrency: 'MXN' | 'USD') => {
    setCurrency(newCurrency)
    toast.success(`${t.toast.currencyChanged} ${newCurrency}`)
  }

  const handleLanguageChange = (newLanguage: 'en' | 'es') => {
    setLanguage(newLanguage)
    const msg = newLanguage === 'en' ? t.toast.languageChanged : t.toast.languageChangedEs
    toast.success(msg)
  }

  return (
    <div className="bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold mb-6">
        {t.inputs.title}
      </h2>

      <div className="space-y-6">
        {/* Hourly Rate */}
        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium mb-2">
            {t.inputs.hourlyRate}
          </label>
          <div className="relative">
            <input
              type="number"
              id="hourlyRate"
              value={hourlyRate}
              onChange={(e) => handleInputChange(e.target.value, setHourlyRate, 'hourlyRate')}
              className="w-full bg-background border border-muted-strong/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-sm">
              {currency}
            </span>
          </div>
          <p className="text-xs text-muted-strong mt-1">{t.inputs.rangeLabel}: 50 - 5000</p>
        </div>

        {/* Hours Per Week */}
        <div>
          <label htmlFor="hoursPerWeek" className="block text-sm font-medium mb-2">
            {t.inputs.hoursPerWeek}
          </label>
          <input
            type="number"
            id="hoursPerWeek"
            value={hoursPerWeek}
            onChange={(e) => handleInputChange(e.target.value, setHoursPerWeek, 'hoursPerWeek')}
            className="w-full bg-background border border-muted-strong/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="40"
          />
          <p className="text-xs text-muted-strong mt-1">{t.inputs.rangeLabel}: 0 - 60</p>
        </div>

        {/* Vacation Weeks */}
        <div>
          <label htmlFor="vacationWeeks" className="block text-sm font-medium mb-2">
            {t.inputs.vacationWeeks}
          </label>
          <input
            type="number"
            id="vacationWeeks"
            value={vacationWeeks}
            onChange={(e) => handleInputChange(e.target.value, setVacationWeeks, 'vacationWeeks')}
            className="w-full bg-background border border-muted-strong/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="2"
          />
          <p className="text-xs text-muted-strong mt-1">{t.inputs.rangeLabel}: 0 - 12</p>
        </div>

        {/* Tax Rate */}
        <div>
          <label htmlFor="taxRate" className="block text-sm font-medium mb-2">
            {t.inputs.taxRate}
          </label>
          <input
            type="number"
            id="taxRate"
            value={taxRate}
            onChange={(e) => handleInputChange(e.target.value, setTaxRate, 'taxRate')}
            className="w-full bg-background border border-muted-strong/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="25"
          />
          <p className="text-xs text-muted-strong mt-1">{t.inputs.rangeLabel}: 0 - 50%</p>
        </div>

        {/* Currency Toggle */}
        <div>
          <label className="block text-sm font-medium mb-2">{t.inputs.currency}</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleCurrencyChange('MXN')}
              className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all ${
                currency === 'MXN'
                  ? 'bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20'
                  : 'bg-background border border-muted-strong/30 text-muted hover:text-foreground hover:border-accent/50'
              }`}
            >
              MXN
            </button>
            <button
              onClick={() => handleCurrencyChange('USD')}
              className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all ${
                currency === 'USD'
                  ? 'bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20'
                  : 'bg-background border border-muted-strong/30 text-muted hover:text-foreground hover:border-accent/50'
              }`}
            >
              USD
            </button>
          </div>
        </div>

        {/* Language Toggle */}
        <div>
          <label className="block text-sm font-medium mb-2">{t.inputs.language}</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20'
                  : 'bg-background border border-muted-strong/30 text-muted hover:text-foreground hover:border-accent/50'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('es')}
              className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all ${
                language === 'es'
                  ? 'bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20'
                  : 'bg-background border border-muted-strong/30 text-muted hover:text-foreground hover:border-accent/50'
              }`}
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
