'use client'

import { useIncomePlannerStore } from '@/lib/store'
import {
  calculateIncome,
  calculateRequiredHourlyRateForAnnualNet,
  getDefaultProgressiveTaxBrackets,
} from '@/lib/calculations'
import { useTranslation } from '@/lib/i18n/translations'
import { formatCurrency } from '@/lib/formatters'
import { Lightbulb, Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export default function SummaryCards() {
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
    language,
  } = useIncomePlannerStore()

  const t = useTranslation(language)

  const taxBrackets = taxMode === 'smart' ? getDefaultProgressiveTaxBrackets(currency) : undefined

  const result = calculateIncome({
    hourlyRate,
    hoursPerWeek,
    unbillableHoursPerWeek,
    vacationWeeks,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    currentSavings,
    taxRate,
    taxMode,
    taxBrackets,
  })

  if ('error' in result) {
    return (
      <div>
        <h2 className="font-heading text-2xl font-bold mb-4">
          {t.summary.title}
        </h2>
        <Card className="text-center text-muted">
          {t.errors.unableToCalculateIncome}
        </Card>
      </div>
    )
  }

  const formatMoney = (value: number): string => {
    return formatCurrency({ value, currency, language, maximumFractionDigits: 0 })
  }

  const formatRate = (value: number): string => {
    return formatCurrency({ value, currency, language, maximumFractionDigits: 2 })
  }

  const summaryData = [
    {
      label: t.summary.perDay,
      gross: result.dailyGross,
      net: result.dailyNet,
    },
    {
      label: t.summary.perWeek,
      gross: result.weeklyGross,
      net: result.weeklyNet,
    },
    {
      label: t.summary.perMonth,
      gross: result.monthlyGross,
      net: result.monthlyNet,
    },
    {
      label: t.summary.perYear,
      gross: result.annualGross,
      net: result.annualNet,
    },
  ]

  // Calculate what-if: 10% rate increase
  const rateIncrease = calculateIncome({
    hourlyRate: hourlyRate * 1.1,
    hoursPerWeek,
    unbillableHoursPerWeek,
    vacationWeeks,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    currentSavings,
    taxRate,
    taxMode,
    taxBrackets,
  })

  const whatIfIncrease =
    'error' in rateIncrease
      ? 0
      : rateIncrease.annualNet - result.annualNet

  const showWhatIf = false

  const goal = (() => {
    if (typeof targetAnnualNet !== 'number' || !Number.isFinite(targetAnnualNet) || targetAnnualNet <= 0) {
      return null
    }

    const delta = result.annualNet - targetAnnualNet
    const isAhead = delta >= 0

    const requiredRate = (() => {
      if (isAhead) return null
      const req = calculateRequiredHourlyRateForAnnualNet(
        {
          hourlyRate,
          hoursPerWeek,
          unbillableHoursPerWeek,
          vacationWeeks,
          monthlyBusinessExpenses,
          monthlyPersonalNeed,
          currentSavings,
          taxRate,
          taxMode,
          taxBrackets,
        },
        targetAnnualNet
      )
      return 'error' in req ? null : req.requiredRate
    })()

    return {
      delta,
      isAhead,
      requiredRate,
    }
  })()

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-4">
        {t.summary.title}
      </h2>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-xs font-semibold tracking-widest text-muted-strong">
            {t.summary.realityTitle}
          </p>
          <p className="mt-3 text-sm text-muted">{t.summary.effectiveHourlyRate}</p>
          <p className="font-heading text-3xl font-bold text-accent mt-1">
            {formatRate(result.effectiveHourlyRate)}/hr
          </p>
        </Card>

        <Card className="p-6">
          <p className="text-xs font-semibold tracking-widest text-muted-strong">&nbsp;</p>
          <p className="mt-3 text-sm text-muted">{t.summary.unbillableTime}</p>
          <p className="font-heading text-3xl font-bold mt-1">
            {Math.round(result.unbillablePercentage)}%
          </p>
        </Card>

        <Card className="p-6">
          <p className="text-xs font-semibold tracking-widest text-muted-strong">&nbsp;</p>
          <p className="mt-3 text-sm text-muted">{t.summary.runway}</p>
          {result.runwayIsSustainable ? (
            <p className="font-heading text-3xl font-bold text-accent mt-1">
              {t.summary.runwaySustainable}
            </p>
          ) : typeof result.runwayMonths === 'number' ? (
            <p className="font-heading text-3xl font-bold text-accent mt-1">
              {result.runwayMonths.toFixed(1)}
            </p>
          ) : (
            <p className="text-sm text-muted mt-2">{t.summary.runwayNotSet}</p>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {summaryData.map((item) => (
          <Card
            key={item.label}
            className="p-6 hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all"
          >
            <h3 className="text-sm font-medium text-muted-strong mb-3">
              {item.label}
            </h3>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted mb-1">{t.summary.gross}</p>
                <p className="font-heading text-2xl font-bold">
                  {formatMoney(item.gross)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted mb-1">{t.summary.netAfterTax}</p>
                <p className="font-heading text-2xl font-bold text-accent">
                  {formatMoney(item.net)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {goal && (
        <div className="mt-6 bg-accent/5 border border-accent/20 rounded-lg p-4">
          <p className="text-sm text-muted">
            <span className="inline-flex align-middle mr-1">
              <Target className="w-4 h-4 text-accent" />
            </span>
            {goal.isAhead ? (
              <>
                <span className="font-medium text-foreground">{t.summary.goalAheadBy}</span>{' '}
                <span className="text-accent font-semibold">{formatMoney(Math.abs(goal.delta))}</span>
              </>
            ) : (
              <>
                <span className="font-medium text-foreground">{t.summary.goalBehindBy}</span>{' '}
                <span className="text-accent font-semibold">{formatMoney(Math.abs(goal.delta))}</span>
                {typeof goal.requiredRate === 'number' && (
                  <>
                    {' '}— <span className="font-medium text-foreground">{t.summary.goalRequiredRate}</span>{' '}
                    <span className="text-accent font-semibold">{formatRate(goal.requiredRate)}/hr</span>
                  </>
                )}
              </>
            )}
          </p>
        </div>
      )}

      {/* What-if suggestion */}
      {showWhatIf && (
        <div className="mt-6 bg-accent/5 border border-accent/20 rounded-lg p-4">
          <p className="text-sm text-muted">
            <span className="inline-flex align-middle mr-1">
              <Lightbulb className="w-4 h-4 text-accent" />
            </span>
            <span className="font-medium text-foreground">{t.summary.whatIf}</span>{' '}
            {t.summary.whatIfText}{' '}
            <span className="text-accent font-semibold">
              +{formatMoney(whatIfIncrease)}
            </span>{' '}
            {t.summary.whatIfSuffix}
          </p>
        </div>
      )}
    </div>
  )
}
