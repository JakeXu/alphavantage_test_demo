import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import AntdConfigProvider from '@providers/AntdConfigProvider'

import '@styles/globals.css'

export const metadata: Metadata = {
  title: 'Alpha Vantage Demo',
  description: 'Alpha Vantage provides realtime and historical financial market data through a set of powerful and developer-friendly data APIs and spreadsheets. From traditional asset classes (e.g., stocks, ETFs, mutual funds) to economic indicators, from foreign exchange rates to commodities, from fundamental data to technical indicators, Alpha Vantage is your one-stop-shop for enterprise-grade global market data delivered through cloud-based APIs, Excel, and Google Sheets.',
  icons: { icon: '/assets/logos/next-icon.svg' },
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <AntdRegistry>
        <AntdConfigProvider>
          <body className="h-full m-0 bg-slate-200">
            {children}
          </body>
        </AntdConfigProvider>
      </AntdRegistry>
    </html>
  )
}
