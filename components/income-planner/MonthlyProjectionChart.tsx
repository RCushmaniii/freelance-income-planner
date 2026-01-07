'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import {
  generateRunwayProjection,
  generateSeasonalProjection,
} from '@/lib/chartData'
import { formatCurrency } from '@/lib/formatters'
import { getDefaultProgressiveTaxBrackets } from '@/lib/calculations'
import { convertCurrency } from '@/lib/currency-conversion'
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function MonthlyProjectionChart() {
  const {
    scenarios,
    taxRate,
    taxMode,
    unbillableHoursPerWeek,
    monthlyBusinessExpenses,
    monthlyPersonalNeed,
    currentSavings,
    targetAnnualNet,
    billingCurrency,
    spendingCurrency,
    userExchangeRate,
    monthlyMultipliers,
    language,
  } = useIncomePlannerStore()
  const t = useTranslation(language)

  // Convert from spending currency to billing currency
  const convertToBilling = (amount: number): number => {
    return convertCurrency({
      amount,
      fromCurrency: spendingCurrency,
      toCurrency: billingCurrency,
      exchangeRate: userExchangeRate,
      billingCurrency,
      spendingCurrency,
    })
  }

  // Convert from billing currency to spending currency
  const convertToSpending = (amount: number): number => {
    return convertCurrency({
      amount,
      fromCurrency: billingCurrency,
      toCurrency: spendingCurrency,
      exchangeRate: userExchangeRate,
      billingCurrency,
      spendingCurrency,
    })
  }
  // Seasonal pattern is now controlled by monthlyMultipliers from the equalizer

  const taxBrackets =
    taxMode === 'smart' ? getDefaultProgressiveTaxBrackets(billingCurrency) : undefined

  const data = generateSeasonalProjection(
    {
      ...scenarios.pessimistic,
      unbillableHoursPerWeek,
      monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
      monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
      currentSavings,
      taxRate,
      taxMode,
      taxBrackets,
    },
    {
      ...scenarios.realistic,
      unbillableHoursPerWeek,
      monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
      monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
      currentSavings,
      taxRate,
      taxMode,
      taxBrackets,
    },
    {
      ...scenarios.optimistic,
      unbillableHoursPerWeek,
      monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
      monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
      currentSavings,
      taxRate,
      taxMode,
      taxBrackets,
    },
    monthlyMultipliers,
    language
  )

  const runwayData = generateRunwayProjection(
    {
      ...scenarios.pessimistic,
      unbillableHoursPerWeek,
      monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
      monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
      currentSavings,
      taxRate,
      taxMode,
      taxBrackets,
    },
    {
      ...scenarios.realistic,
      unbillableHoursPerWeek,
      monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
      monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
      currentSavings,
      taxRate,
      taxMode,
      taxBrackets,
    },
    {
      ...scenarios.optimistic,
      unbillableHoursPerWeek,
      monthlyBusinessExpenses: convertToBilling(monthlyBusinessExpenses),
      monthlyPersonalNeed: monthlyPersonalNeed ? convertToBilling(monthlyPersonalNeed) : null,
      currentSavings,
      taxRate,
      taxMode,
      taxBrackets,
    },
    monthlyMultipliers,
    language
  )

  // Convert chart data to spending currency for display
  const dataWithRange = data.map((d) => ({
    ...d,
    pessimistic: convertToSpending(d.pessimistic),
    realistic: convertToSpending(d.realistic),
    optimistic: convertToSpending(d.optimistic),
    rangeBand: Math.max(0, convertToSpending(d.optimistic) - convertToSpending(d.pessimistic)),
  }))

  if (dataWithRange.length === 0) {
    return (
      <Card className="p-6 text-center text-muted">
        {t.errors.unableToGenerateChartData}
      </Card>
    )
  }

  const formatMoneyCompact = (value: number): string => {
    return formatCurrency({
      value,
      currency: spendingCurrency,
      language,
      compact: true,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
  }

  const formatMoney = (value: number): string => {
    return formatCurrency({
      value,
      currency: spendingCurrency,
      language,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
  }

  const targetMonthly =
    typeof targetAnnualNet === 'number' &&
    Number.isFinite(targetAnnualNet) &&
    targetAnnualNet > 0
      ? targetAnnualNet / 12
      : null

  return (
    <Card className="p-8">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold">
          {t.chart.title}
        </h2>
        <p className="text-sm text-muted mt-1">
          {t.chart.subtitle}
        </p>
      </div>

      {/* Income Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataWithRange}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--muted-strong)"
              opacity={0.25}
            />
            <XAxis
              dataKey="month"
              stroke="var(--muted-strong)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="var(--muted-strong)"
              style={{ fontSize: '12px' }}
              tickFormatter={formatMoneyCompact}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--muted-strong)',
                borderRadius: '8px',
                color: 'var(--foreground)',
              }}
              formatter={(value, name) => {
                const n =
                  typeof value === 'number' && Number.isFinite(value)
                    ? value
                    : 0

                if (name === 'rangeBand') {
                  return [formatMoney(n), t.chartLegend.rangeBand]
                }
                if (name === 'pessimistic') {
                  return [formatMoney(n), t.chartLegend.pessimistic]
                }
                if (name === 'realistic') {
                  return [formatMoney(n), t.chartLegend.realistic]
                }
                if (name === 'optimistic') {
                  return [formatMoney(n), t.chartLegend.optimistic]
                }
                return [formatMoney(n), name]
              }}
              labelStyle={{ color: 'var(--muted)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '32px' }} iconType="line" />

            <Area
              type="monotone"
              dataKey="pessimistic"
              stackId="range"
              stroke="transparent"
              fill="transparent"
              activeDot={false}
              name={t.chartLegend.pessimistic}
            />
            <Area
              type="monotone"
              dataKey="rangeBand"
              stackId="range"
              stroke="transparent"
              fill="var(--accent)"
              fillOpacity={0.12}
              activeDot={false}
              name={t.chartLegend.rangeBand}
            />

            {typeof targetMonthly === 'number' && (
              <ReferenceLine
                y={targetMonthly}
                stroke="var(--accent)"
                strokeDasharray="6 6"
                strokeWidth={2}
                ifOverflow="extendDomain"
                label={{
                  value: t.chartLegend.target,
                  position: 'insideTopRight',
                  fill: 'var(--accent)',
                  fontSize: 12,
                }}
              />
            )}

            <Line
              type="monotone"
              dataKey="realistic"
              stroke="var(--chart-realistic)"
              strokeWidth={2}
              dot={{ fill: 'var(--chart-realistic)', r: 3 }}
              activeDot={{ r: 5 }}
              name={t.chartLegend.realistic}
            />
            <Line
              type="monotone"
              dataKey="pessimistic"
              stroke="var(--chart-pessimistic)"
              strokeWidth={2}
              dot={{ fill: 'var(--chart-pessimistic)', r: 3 }}
              activeDot={{ r: 5 }}
              name={t.chartLegend.pessimistic}
            />
            <Line
              type="monotone"
              dataKey="optimistic"
              stroke="var(--chart-optimistic)"
              strokeWidth={2}
              dot={{ fill: 'var(--chart-optimistic)', r: 3 }}
              activeDot={{ r: 5 }}
              name={t.chartLegend.optimistic}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Runway Chart */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-lg font-semibold">
            {t.chart.runwayTitle}
          </h3>
        </div>

        {runwayData.length === 0 ? (
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-xs text-muted">
            {t.chart.runwayNotSet}
          </div>
        ) : (
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={runwayData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--muted-strong)"
                  opacity={0.25}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-strong)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="var(--muted-strong)"
                  style={{ fontSize: '12px' }}
                  tickFormatter={formatMoneyCompact}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--muted-strong)',
                    borderRadius: '8px',
                    color: 'var(--foreground)',
                  }}
                  formatter={(value, name) => {
                    const n =
                      typeof value === 'number' && Number.isFinite(value)
                        ? value
                        : 0

                    if (name === 'pessimistic') {
                      return [formatMoney(n), t.chartLegend.pessimistic]
                    }
                    if (name === 'realistic') {
                      return [formatMoney(n), t.chartLegend.realistic]
                    }
                    if (name === 'optimistic') {
                      return [formatMoney(n), t.chartLegend.optimistic]
                    }
                    return [formatMoney(n), name]
                  }}
                  labelStyle={{ color: 'var(--muted)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '32px' }} iconType="line" />

                <ReferenceLine
                  y={0}
                  stroke="var(--muted-strong)"
                  strokeDasharray="6 6"
                  strokeWidth={1}
                  ifOverflow="extendDomain"
                />

                <Line
                  type="monotone"
                  dataKey="pessimistic"
                  stroke="var(--chart-pessimistic)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                  name={t.chartLegend.pessimistic}
                />
                <Line
                  type="monotone"
                  dataKey="realistic"
                  stroke="var(--chart-realistic)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                  name={t.chartLegend.realistic}
                />
                <Line
                  type="monotone"
                  dataKey="optimistic"
                  stroke="var(--chart-optimistic)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                  name={t.chartLegend.optimistic}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Pattern Description - Removed, now controlled by equalizer */}
    </Card>
  )
}
