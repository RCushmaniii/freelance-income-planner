'use client'

import { useIncomePlannerStore } from '@/lib/store'
import ScenarioBuilder from './ScenarioBuilder'
import RangeVisualization from './RangeVisualization'
import MonthlyIncomeEqualizer from './MonthlyIncomeEqualizer'
import MonthlyProjectionChart from './MonthlyProjectionChart'
import StrategicSimulator from './StrategicSimulator'

export default function ForecastView() {
  const { viewMode } = useIncomePlannerStore()

  if (viewMode !== 'forecast') return null

  return (
    <div className="space-y-8">
      <ScenarioBuilder />
      <RangeVisualization />
      <MonthlyIncomeEqualizer />
      <MonthlyProjectionChart />
      <StrategicSimulator />
    </div>
  )
}
