import z from 'zod'
import { SelectProps } from 'antd'

export const StockApiTypes = z.enum([
  'TIME_SERIES_INTRADAY',
  'TIME_SERIES_DAILY',
  'TIME_SERIES_DAILY_ADJUSTED',
  'TIME_SERIES_WEEKLY',
  'TIME_SERIES_WEEKLY_ADJUSTED',
  'TIME_SERIES_MONTHLY',
  'TIME_SERIES_MONTHLY_ADJUSTED',
]).Enum

export const StockApiTypeOptions: SelectProps['options'] = [
  { value: StockApiTypes.TIME_SERIES_INTRADAY, label: 'Intraday' },
  { value: StockApiTypes.TIME_SERIES_DAILY, label: 'Daily' },
  { value: StockApiTypes.TIME_SERIES_DAILY_ADJUSTED, label: 'Daily Adjusted', disabled: true },
  { value: StockApiTypes.TIME_SERIES_WEEKLY, label: 'Weekly' },
  { value: StockApiTypes.TIME_SERIES_WEEKLY_ADJUSTED, label: 'Weekly Adjusted' },
  { value: StockApiTypes.TIME_SERIES_MONTHLY, label: 'Monthly' },
  { value: StockApiTypes.TIME_SERIES_MONTHLY_ADJUSTED, label: 'Monthly Adjusted' },
]

export const IntelligenceTypes = z.enum(['NEWS_SENTIMENT', 'TOP_GAINERS_LOSERS']).Enum

export const IntelligenceTypeOptions: SelectProps['options'] = [
  { value: IntelligenceTypes.NEWS_SENTIMENT, label: 'Market News & Sentiment' },
  { value: IntelligenceTypes.TOP_GAINERS_LOSERS, label: 'Top Gainers & Losers' },
]

export const EconomicIndicatorTypes = z.enum([
  'REAL_GDP',
  'REAL_GDP_PER_CAPITA',
  'TREASURY_YIELD',
  'FEDERAL_FUNDS_RATE',
  'CPI',
  'INFLATION',
  'RETAIL_SALES',
  'DURABLES',
  'UNEMPLOYMENT',
  'NONFARM_PAYROLL',
]).Enum

export const EconomicIndicatorTypesOptions: SelectProps['options'] = [
  { value: EconomicIndicatorTypes.REAL_GDP, label: 'Real GDP' },
  { value: EconomicIndicatorTypes.REAL_GDP_PER_CAPITA, label: 'Real GDP per Capita' },
  { value: EconomicIndicatorTypes.TREASURY_YIELD, label: 'Treasury Yield' },
  { value: EconomicIndicatorTypes.FEDERAL_FUNDS_RATE, label: 'Federal Funds (Interest) Rate' },
  { value: EconomicIndicatorTypes.CPI, label: 'CPI' },
  { value: EconomicIndicatorTypes.INFLATION, label: 'Inflation' },
  { value: EconomicIndicatorTypes.RETAIL_SALES, label: 'Retail Sales' },
  { value: EconomicIndicatorTypes.DURABLES, label: 'Durable Goods Orders' },
  { value: EconomicIndicatorTypes.UNEMPLOYMENT, label: 'Unemployment Rate' },
  { value: EconomicIndicatorTypes.NONFARM_PAYROLL, label: 'Nonfarm Payroll' },
]

export const TechnicalIndicatorTypes = z.enum([
  'SMA',
  'EMA',
  'WMA',
  'DEMA',
  'TEMA',
  'TRIMA',
  'KAMA',
  'MAMA',
  'VWAP',
  'T3',
  'MACD',
  'MACDEXT',
  'STOCH',
  'STOCHF',
  'RSI',
  'STOCHRSI',
  'WILLR',
  'ADX',
  'ADXR',
  'APO',
  'PPO',
]).Enum

export const TechnicalIndicatorTypesOptions: SelectProps['options'] = [
  { value: TechnicalIndicatorTypes.SMA, label: 'SMA' },
  { value: TechnicalIndicatorTypes.EMA, label: 'EMA' },
  { value: TechnicalIndicatorTypes.WMA, label: 'WMA' },
  { value: TechnicalIndicatorTypes.DEMA, label: 'DEMA' },
  { value: TechnicalIndicatorTypes.TEMA, label: 'TEMA' },
  { value: TechnicalIndicatorTypes.TRIMA, label: 'TRIMA' },
  { value: TechnicalIndicatorTypes.KAMA, label: 'KAMA' },
  { value: TechnicalIndicatorTypes.MAMA, label: 'MAMA' },
  { value: TechnicalIndicatorTypes.VWAP, label: 'VWAP', disabled: true },
  { value: TechnicalIndicatorTypes.T3, label: 'T3' },
  { value: TechnicalIndicatorTypes.MACD, label: 'MACD', disabled: true },
  { value: TechnicalIndicatorTypes.MACDEXT, label: 'MACDEXT' },
  { value: TechnicalIndicatorTypes.STOCH, label: 'STOCH' },
  { value: TechnicalIndicatorTypes.STOCHF, label: 'STOCHF' },
  { value: TechnicalIndicatorTypes.RSI, label: 'RSI' },
  { value: TechnicalIndicatorTypes.STOCHRSI, label: 'STOCHRSI' },
  { value: TechnicalIndicatorTypes.WILLR, label: 'WILLR' },
  { value: TechnicalIndicatorTypes.ADX, label: 'ADX' },
  { value: TechnicalIndicatorTypes.ADXR, label: 'ADXR' },
  { value: TechnicalIndicatorTypes.APO, label: 'APO' },
  { value: TechnicalIndicatorTypes.PPO, label: 'PPO' },
]

export const API_URL = `https://www.alphavantage.co/query`

// Use demo apikey instead of real apikey because always get error ino 'Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits.'
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'demo'
