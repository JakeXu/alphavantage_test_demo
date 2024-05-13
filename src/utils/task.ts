import { Reducer, useReducer } from 'react'
import { FetchDataSchema, StockData, StockValue, LineValue } from '@models/task'
import { StockApiTypes } from '@constants/index'

export function useSimpleReducer<T>(initialValue: T) {
  return useReducer<Reducer<T, Partial<T>>>((prevState, newState) => ({ ...prevState, ...newState }), initialValue)
}

export function useFetchDataSchema<Data>(
  defaultValue: FetchDataSchema<Data> = {
    isFetching: false,
    data: null,
    error: null,
  },
) {
  return useSimpleReducer<FetchDataSchema<Data>>(defaultValue)
}

export function buildStockData(type: keyof typeof StockApiTypes, data?: StockData | null): StockValue[] | LineValue[] {
  let stockData: StockValue[] = []
  let lineData: LineValue[] = []
  if (!data) return stockData

  switch (type) {
    case StockApiTypes.TIME_SERIES_INTRADAY:
      const rows = data['Time Series (5min)'] || {}
      stockData = Object.keys(rows)
        .reverse()
        .map(date => {
          const row = rows[date]
          const open = parseFloat(row['1. open'])
          const high = parseFloat(row['2. high'])
          const low = parseFloat(row['3. low'])
          const close = parseFloat(row['4. close'])
          return { date, open, high, low, close }
        })
      break
    case StockApiTypes.TIME_SERIES_DAILY:
      {
        const rows = data['Time Series (Daily)'] || {}
        stockData = Object.keys(rows)
          .reverse()
          .map(date => {
            const row = rows[date]
            const open = parseFloat(row['1. open'])
            const high = parseFloat(row['2. high'])
            const low = parseFloat(row['3. low'])
            const close = parseFloat(row['4. close'])
            return { date, open, high, low, close }
          })
      }
      break
    case StockApiTypes.TIME_SERIES_DAILY_ADJUSTED:
      {
        const rows = data['Time Series (Daily)'] || {}
        stockData = Object.keys(rows)
          .reverse()
          .map(date => {
            const row = rows[date]
            const open = parseFloat(row['1. open'])
            const high = parseFloat(row['2. high'])
            const low = parseFloat(row['3. low'])
            const close = parseFloat(row['5. adjusted close'] || '0')
            return { date, open, high, low, close }
          })
      }
      break
    case StockApiTypes.TIME_SERIES_WEEKLY:
      {
        const rows = data['Weekly Time Series'] || {}
        Object.keys(rows)
          .reverse()
          .forEach(date => {
            const row = rows[date]
            const open = parseFloat(row['1. open'])
            const high = parseFloat(row['2. high'])
            const low = parseFloat(row['3. low'])
            const close = parseFloat(row['4. close'])
            lineData = [
              ...lineData,
              { date, value: open, type: 'open' },
              { date, value: high, type: 'high' },
              { date, value: low, type: 'low' },
              { date, value: close, type: 'close' },
            ]
          })

        return lineData
      }
      break
    case StockApiTypes.TIME_SERIES_WEEKLY_ADJUSTED:
      {
        const rows = data['Weekly Adjusted Time Series'] || {}
        Object.keys(rows)
          .reverse()
          .forEach(date => {
            const row = rows[date]
            const open = parseFloat(row['1. open'])
            const high = parseFloat(row['2. high'])
            const low = parseFloat(row['3. low'])
            const close = parseFloat(row['5. adjusted close'] || '0')
            lineData = [
              ...lineData,
              { date, value: open, type: 'open' },
              { date, value: high, type: 'high' },
              { date, value: low, type: 'low' },
              { date, value: close, type: 'close' },
            ]
          })

        return lineData
      }
      break
    case StockApiTypes.TIME_SERIES_MONTHLY:
      {
        const rows = data['Monthly Time Series'] || {}
        Object.keys(rows)
          .reverse()
          .forEach(date => {
            const row = rows[date]
            const open = parseFloat(row['1. open'])
            const high = parseFloat(row['2. high'])
            const low = parseFloat(row['3. low'])
            const close = parseFloat(row['4. close'])
            lineData = [
              ...lineData,
              { date, value: open, type: 'open' },
              { date, value: high, type: 'high' },
              { date, value: low, type: 'low' },
              { date, value: close, type: 'close' },
            ]
          })

        return lineData
      }
      break
    case StockApiTypes.TIME_SERIES_MONTHLY_ADJUSTED:
      {
        const rows = data['Monthly Adjusted Time Series'] || {}
        Object.keys(rows)
          .reverse()
          .forEach(date => {
            const row = rows[date]
            const open = parseFloat(row['1. open'])
            const high = parseFloat(row['2. high'])
            const low = parseFloat(row['3. low'])
            const close = parseFloat(row['5. adjusted close'] || '0')
            lineData = [
              ...lineData,
              { date, value: open, type: 'open' },
              { date, value: high, type: 'high' },
              { date, value: low, type: 'low' },
              { date, value: close, type: 'close' },
            ]
          })

        return lineData
      }
      break
    default:
  }

  return stockData
}

export function getDateWith12HoursFormat(dateStr: string) {
  const date = new Date(dateStr.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3T$4:$5:$6'))
  if (Number.isNaN(date.valueOf())) {
    return dateStr
  }
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
