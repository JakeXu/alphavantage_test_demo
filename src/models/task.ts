import z from 'zod'

export interface FetchDataSchema<T> {
  isFetching: boolean
  data: T | null
  error: Error | null
}

export const StockValue = z.object({
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number().nullish(),
})

export type StockValue = z.TypeOf<typeof StockValue>

export const LineValue = z.object({
  date: z.string(),
  value: z.number(),
  type: z.string().nullish(),
})

export type LineValue = z.TypeOf<typeof LineValue>

export const StockUnitValue = z.object({
  '1. open': z.string(),
  '2. high': z.string(),
  '3. low': z.string(),
  '4. close': z.string(),
  '5. volume': z.string().nullish(),
  '5. adjusted close': z.string().nullish(),
  '6. volume': z.string().nullish(),
  '7. dividend amount': z.string().nullish(),
  '8. split coefficient': z.string().nullish(),
})

export type StockUnitValue = z.TypeOf<typeof StockUnitValue>

export const StockData = z.object({
  'Meta Data': z.record(z.string(), z.any()),
  'Time Series (5min)': z.record(z.string(), StockUnitValue).nullish(),
  'Time Series (Daily)': z.record(z.string(), StockUnitValue).nullish(),
  'Weekly Time Series': z.record(z.string(), StockUnitValue).nullish(),
  'Weekly Adjusted Time Series': z.record(z.string(), StockUnitValue).nullish(),
  'Monthly Time Series': z.record(z.string(), StockUnitValue).nullish(),
  'Monthly Adjusted Time Series': z.record(z.string(), StockUnitValue).nullish(),
})

export type StockData = z.TypeOf<typeof StockData>

export const TopGainer = z.object({
  ticker: z.string(),
  price: z.string(),
  change_amount: z.string(),
  change_percentage: z.string(),
  volume: z.string(),
})

export type TopGainer = z.TypeOf<typeof TopGainer>

export const TickerSentiment = z.object({
  ticker: z.string(),
  relevance_score: z.string(),
  ticker_sentiment_score: z.string(),
  ticker_sentiment_label: z.string(),
})

export type TickerSentiment = z.TypeOf<typeof TickerSentiment>

export const Feed = z.object({
  title: z.string(),
  url: z.string(),
  time_published: z.string(),
  authors: z.array(z.string()),
  summary: z.string(),
  banner_image: z.string(),
  source: z.string(),
  category_within_source: z.string(),
  source_domain: z.string(),
  topics: z.array(z.record(z.string(), z.string())),
  overall_sentiment_score: z.string(),
  overall_sentiment_label: z.string(),
  ticker_sentiment: z.array(TickerSentiment),
})

export type Feed = z.TypeOf<typeof Feed>

export const IntelligenceData = z.object({
  items: z.string(),
  sentiment_score_definition: z.string(),
  relevance_score_definition: z.string(),
  metadata: z.string(),
  last_updated: z.string(),
  top_gainers: z.array(TopGainer),
  feed: z.array(Feed),
})

export type IntelligenceData = z.TypeOf<typeof IntelligenceData>

export const EconomicIndicatorData = z.object({
  name: z.string(),
  interval: z.string(),
  unit: z.string(),
  data: z.array(LineValue),
})

export type EconomicIndicatorData = z.TypeOf<typeof EconomicIndicatorData>

const TechnicalIndicatorMetaData = z.object({
  'Meta Data': z.record(z.string(), z.any()),
})

export const TechnicalIndicatorData = z.union([TechnicalIndicatorMetaData, z.record(z.string(), z.record(z.string(), z.any()))])

export type TechnicalIndicatorData = z.TypeOf<typeof TechnicalIndicatorData>
