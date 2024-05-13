'use client'
import { Card } from 'antd'
import dynamic from 'next/dynamic' // use it to avoid ReferenceError: document is not defined
// import CoreStockChart from './_components/CoreStockChart'
// import AlphaIntelligenceTable from './_components/AlphaIntelligenceTable'
// import EconomicIndicatorChart from './_components/EconomicIndicatorChart'
// import TechnicalIndicatorChart from './_components/TechnicalIndicatorChart'

const CoreStockChart = dynamic(
  () => {
    return import('./_components/CoreStockChart')
  },
  { ssr: false, loading: () => <Card loading /> },
)
const AlphaIntelligenceTable = dynamic(
  () => {
    return import('./_components/AlphaIntelligenceTable')
  },
  { ssr: false, loading: () => <Card loading /> },
)
const EconomicIndicatorChart = dynamic(
  () => {
    return import('./_components/EconomicIndicatorChart')
  },
  { ssr: false, loading: () => <Card loading /> },
)
const TechnicalIndicatorChart = dynamic(
  () => {
    return import('./_components/TechnicalIndicatorChart')
  },
  { ssr: false, loading: () => <Card loading /> },
)

import styles from './page.module.scss' // show how to use sass global variables in nextjs

export default function Home() {
  return (
    <main className="flex gap-8 py-8 px-20 flex-wrap justify-center">
      <h1 className={`mb-4 text-4xl font-extrabold leading-none tracking-tight ${styles.header}`}>Alpha Vantage Stock Data Presentation</h1>
      <div className="h-3/6 bg-white w-full">
        <CoreStockChart />
      </div>
      <div className="h-3/6 bg-white w-full">
        <AlphaIntelligenceTable />
      </div>
      <div className="h-3/6 bg-white w-full">
        <EconomicIndicatorChart />
      </div>
      <div className="h-3/6 bg-white w-full">
        <TechnicalIndicatorChart />
      </div>
    </main>
  )
}
