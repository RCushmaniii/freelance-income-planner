'use client'

import { useEffect, useMemo, useState } from 'react'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { calculateIncome, getDefaultProgressiveTaxBrackets } from '@/lib/calculations'
import { formatCurrency } from '@/lib/formatters'
import { convertAmount } from '@/lib/fx'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'

type Currency = 'MXN' | 'USD'

type MoneyByCurrency = Record<Currency, number>

type BenchmarkBand = {
  key:
    | 'international'
    | 'universities'
    | 'private'
    | 'public'
    | 'language'
    | 'usJunior'
    | 'usMid'
    | 'usSenior'
  minMonthly: MoneyByCurrency
  maxMonthly: MoneyByCurrency
}

type CompareMode = 'local' | 'us'

const benchmarkSets: Record<CompareMode, BenchmarkBand[]> = {
  local: [
    {
      key: 'international',
      minMonthly: { MXN: 35000, USD: 1925 },
      maxMonthly: { MXN: 50000, USD: 2750 },
    },
    {
      key: 'universities',
      minMonthly: { MXN: 20000, USD: 1100 },
      maxMonthly: { MXN: 40000, USD: 2200 },
    },
    {
      key: 'private',
      minMonthly: { MXN: 15000, USD: 825 },
      maxMonthly: { MXN: 30000, USD: 1650 },
    },
    {
      key: 'public',
      minMonthly: { MXN: 10000, USD: 550 },
      maxMonthly: { MXN: 20000, USD: 1100 },
    },
    {
      key: 'language',
      minMonthly: { MXN: 10000, USD: 550 },
      maxMonthly: { MXN: 25000, USD: 1375 },
    },
  ],
  us: [
    {
      key: 'usJunior',
      minMonthly: { MXN: 110000, USD: 6000 },
      maxMonthly: { MXN: 185000, USD: 10000 },
    },
    {
      key: 'usMid',
      minMonthly: { MXN: 185000, USD: 10000 },
      maxMonthly: { MXN: 295000, USD: 16000 },
    },
    {
      key: 'usSenior',
      minMonthly: { MXN: 295000, USD: 16000 },
      maxMonthly: { MXN: 460000, USD: 25000 },
    },
  ],
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min
  if (value < min) return min
  if (value > max) return max
  return value
}

function interpolate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{${key}}`, value)
  }, template)
}

export default function RateBenchmarkPanel() {
  const {
    hourlyRate,
    hoursPerWeek,
    vacationWeeks,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses,
    taxRate,
    taxMode,
    currency,
    language,
    mxnToUsdRate,
  } = useIncomePlannerStore()

  const t = useTranslation(language)

  const [compareMode, setCompareMode] = useState<CompareMode>('local')
  const [riskPremiumEnabled, setRiskPremiumEnabled] = useState(false)
  const [targetHourlyRate, setTargetHourlyRate] = useState(hourlyRate)

  useEffect(() => {
    setTargetHourlyRate(hourlyRate)
  }, [hourlyRate])

  const taxBrackets = taxMode === 'smart' ? getDefaultProgressiveTaxBrackets(currency) : undefined

  const income = calculateIncome({
    hourlyRate: targetHourlyRate,
    hoursPerWeek,
    vacationWeeks,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses,
    taxRate,
    taxMode,
    taxBrackets,
  })

  const currencyCode = currency as Currency

  const formatMoney = (value: number): string => {
    return formatCurrency({
      value,
      currency: currencyCode,
      language,
      maximumFractionDigits: 0,
    })
  }

  const youMonthlyNet = 'error' in income ? null : income.monthlyNet

  const tutoringMinMxn = 200
  const tutoringMaxMxn = 500

  const fxReady =
    typeof mxnToUsdRate === 'number' &&
    Number.isFinite(mxnToUsdRate) &&
    mxnToUsdRate > 0

  const tutoringMin =
    currencyCode === 'USD' && fxReady
      ? convertAmount({
          amount: tutoringMinMxn,
          from: 'MXN',
          to: 'USD',
          rateBaseToTarget: mxnToUsdRate,
        })
      : tutoringMinMxn

  const tutoringMax =
    currencyCode === 'USD' && fxReady
      ? convertAmount({
          amount: tutoringMaxMxn,
          from: 'MXN',
          to: 'USD',
          rateBaseToTarget: mxnToUsdRate,
        })
      : tutoringMaxMxn

  const riskPremiumMultiplier = riskPremiumEnabled ? 1.3 : 1

  const bands = useMemo(() => {
    return benchmarkSets[compareMode].map((band) => {
      const min = band.minMonthly[currencyCode] * riskPremiumMultiplier
      const max = band.maxMonthly[currencyCode] * riskPremiumMultiplier
      return {
        ...band,
        minMonthly: { ...band.minMonthly, [currencyCode]: min },
        maxMonthly: { ...band.maxMonthly, [currencyCode]: max },
      }
    })
  }, [compareMode, currencyCode, riskPremiumMultiplier])

  const mins = bands.map((b) => b.minMonthly[currencyCode])
  const maxs = bands.map((b) => b.maxMonthly[currencyCode])

  const globalMin = Math.min(...mins)
  const globalMax = Math.max(...maxs)
  const denom = Math.max(1, globalMax - globalMin)

  const youPos =
    typeof youMonthlyNet === 'number'
      ? ((clamp(youMonthlyNet, globalMin, globalMax) - globalMin) / denom) * 100
      : null

  const positionBadge = useMemo(() => {
    if (typeof youMonthlyNet !== 'number') return null
    if (youMonthlyNet < globalMin) {
      return {
        variant: 'muted',
        text: t.rateBenchmark.positionBelow,
      }
    }
    if (youMonthlyNet > globalMax) {
      const multiple = Math.max(1, youMonthlyNet / Math.max(1, globalMax))
      return {
        variant: 'accent',
        text: interpolate(t.rateBenchmark.positionAbove, {
          multiple: multiple.toFixed(1),
        }),
      }
    }
    const pct = Math.round(((youMonthlyNet - globalMin) / denom) * 100)
    return {
      variant: 'muted',
      text: interpolate(t.rateBenchmark.positionPercentile, {
        percentile: pct.toString(),
      }),
    }
  }, [
    denom,
    globalMax,
    globalMin,
    t.rateBenchmark.positionAbove,
    t.rateBenchmark.positionBelow,
    t.rateBenchmark.positionPercentile,
    youMonthlyNet,
  ])

  const sliderConfig = useMemo(() => {
    if (currencyCode === 'USD') {
      return { min: 10, max: 200, step: 1 }
    }
    return { min: 100, max: 5000, step: 25 }
  }, [currencyCode])

  return (
    <Card>
      <header className="mb-6">
        <h3 className="font-heading text-xl font-bold">
          {t.rateBenchmark.title}
        </h3>
        <p className="text-sm text-muted mt-2">{t.rateBenchmark.subtitle}</p>
      </header>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-muted">
              {t.rateBenchmark.compareToLabel}
            </p>
            <div className="inline-flex rounded-lg border border-muted-strong/20 overflow-hidden">
              <Button
                type="button"
                variant={compareMode === 'local' ? 'secondary' : 'ghost'}
                size="sm"
                className="rounded-none h-8"
                onClick={() => setCompareMode('local')}
              >
                {t.rateBenchmark.compareToOptions.local}
              </Button>
              <Button
                type="button"
                variant={compareMode === 'us' ? 'secondary' : 'ghost'}
                size="sm"
                className="rounded-none h-8"
                onClick={() => setCompareMode('us')}
              >
                {t.rateBenchmark.compareToOptions.us}
              </Button>
            </div>
          </div>

          <Label className="flex items-center gap-2 text-xs text-muted select-none">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={riskPremiumEnabled}
              onChange={(e) => setRiskPremiumEnabled(e.target.checked)}
            />
            <span>
              {t.rateBenchmark.riskPremiumLabel}{' '}
              <span className="text-muted">
                {t.rateBenchmark.riskPremiumHelp}
              </span>
            </span>
          </Label>
        </div>

        <div className="border border-muted-strong/20 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-foreground">
                {t.rateBenchmark.targetSliderLabel}
              </p>
              <p className="text-xs text-muted mt-1">
                {t.rateBenchmark.targetSliderHelp}
              </p>
            </div>
            <p className="text-xs text-muted">
              <span className="font-semibold text-foreground">
                {t.rateBenchmark.yourHourlyRate}
              </span>{' '}
              {formatMoney(targetHourlyRate)} {t.rateBenchmark.perHour}
            </p>
          </div>
          <input
            type="range"
            className="w-full mt-3"
            min={sliderConfig.min}
            max={sliderConfig.max}
            step={sliderConfig.step}
            value={clamp(targetHourlyRate, sliderConfig.min, sliderConfig.max)}
            onChange={(e) => setTargetHourlyRate(Number(e.target.value))}
            aria-label={t.rateBenchmark.targetSliderLabel}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h4 className="font-heading text-sm font-semibold text-foreground">
              {t.rateBenchmark.monthlyRangesTitle}
            </h4>
            {typeof youMonthlyNet === 'number' && (
              <p className="text-xs text-muted">
                <span className="font-semibold text-foreground">
                  {t.rateBenchmark.you}
                </span>{' '}
                {formatMoney(youMonthlyNet)} {t.rateBenchmark.perMonthNet}
              </p>
            )}
          </div>

          {positionBadge && (
            <div
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-4 ${
                positionBadge.variant === 'accent'
                  ? 'bg-accent/15 text-accent'
                  : 'bg-muted-strong/15 text-muted'
              }`}
            >
              {positionBadge.text}
            </div>
          )}

          <div className="space-y-4">
            {bands.map((band) => {
              const min = band.minMonthly[currencyCode]
              const max = band.maxMonthly[currencyCode]

              const leftPct = ((min - globalMin) / denom) * 100
              const widthPct = ((max - min) / denom) * 100

              return (
                <div key={band.key} className="space-y-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-sm font-semibold text-foreground">
                      {t.rateBenchmark.institutions[band.key]}
                    </p>
                    <p className="text-sm text-muted">
                      {formatMoney(min)}–{formatMoney(max)}
                    </p>
                  </div>

                  <div className="relative h-4 rounded-full bg-muted-strong/15 overflow-hidden">
                    <div
                      className="absolute top-0 h-full rounded-full bg-accent/40"
                      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                    />
                    {typeof youPos === 'number' && (
                      <div
                        className="absolute top-0 h-full"
                        style={{ left: `${youPos}%` }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                          <div
                            className="h-3 w-3 bg-accent rotate-45 rounded-[2px] shadow-sm"
                            aria-label={t.rateBenchmark.youMarker}
                          />
                        </div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 bg-accent" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-xs text-muted mt-5">
            {t.rateBenchmark.disclaimer}
          </p>
        </div>

        <aside className="space-y-4">
          <div className="border border-muted-strong/20 rounded-lg p-4">
            <h4 className="font-heading text-sm font-semibold text-foreground mb-2">
              {t.rateBenchmark.tutoringTitle}
            </h4>
            <p className="text-sm text-muted">
              {t.rateBenchmark.tutoringPrivateLessons}{' '}
              <span className="font-semibold text-foreground">
                {formatMoney(tutoringMin)}–{formatMoney(tutoringMax)}
              </span>{' '}
              {t.rateBenchmark.perHour}
            </p>
            {currencyCode === 'USD' && !fxReady && (
              <p className="text-xs text-muted mt-2">
                {t.rateBenchmark.fxUnavailable}
              </p>
            )}
            <p className="text-xs text-muted mt-2">
              {t.rateBenchmark.tutoringNote}
            </p>
          </div>

          <div className="border border-muted-strong/20 rounded-lg p-4">
            <h4 className="font-heading text-sm font-semibold text-foreground mb-2">
              {t.rateBenchmark.factorsTitle}
            </h4>
            <ul className="text-sm text-muted space-y-2">
              <li>{t.rateBenchmark.factors.experience}</li>
              <li>{t.rateBenchmark.factors.schoolType}</li>
              <li>{t.rateBenchmark.factors.hours}</li>
            </ul>
          </div>
        </aside>
      </div>
    </Card>
  )
}
