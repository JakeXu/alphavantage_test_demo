import { API_URL, API_KEY } from '@constants/index'
import { StockData, IntelligenceData, EconomicIndicatorData, TechnicalIndicatorData } from '@models/task'
import { StockApiTypes, IntelligenceTypes, EconomicIndicatorTypes, TechnicalIndicatorTypes } from '@constants/index'

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
  })
  const result = await response.json()
  return result as T
}

const getStockData = async (func: string): Promise<StockData> => {
  let url = `${API_URL}&symbol=IBM&interval=5min&function=${func}`
  switch (func) {
    case StockApiTypes.TIME_SERIES_INTRADAY:
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${API_KEY}`
      break
    case StockApiTypes.TIME_SERIES_DAILY:
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${API_KEY}`
      break
    case StockApiTypes.TIME_SERIES_DAILY_ADJUSTED:
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=${API_KEY}`
      break
    case StockApiTypes.TIME_SERIES_WEEKLY:
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=${API_KEY}`
      break
    case StockApiTypes.TIME_SERIES_WEEKLY_ADJUSTED:
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&apikey=${API_KEY}`
      break
    case StockApiTypes.TIME_SERIES_MONTHLY:
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=${API_KEY}`
      break
    case StockApiTypes.TIME_SERIES_MONTHLY_ADJUSTED:
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=IBM&apikey=${API_KEY}`
      break
    default:
  }

  return fetchData(url)
}

const getIntelligenceData = async (func: string): Promise<IntelligenceData> => {
  let url = `${API_URL}&tickers=AAPL&function=${func}`
  switch (func) {
    case IntelligenceTypes.NEWS_SENTIMENT:
      url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=${API_KEY}`
      break
    case IntelligenceTypes.TOP_GAINERS_LOSERS:
      url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`
      break
    default:
  }

  return fetchData(url)
}

const getEconomicIndicatorData = async (func: string): Promise<EconomicIndicatorData> => {
  let url = `${API_URL}&tickers=AAPL&function=${func}`
  switch (func) {
    case EconomicIndicatorTypes.REAL_GDP:
      url = `https://www.alphavantage.co/query?function=${func}&interval=annual&apikey=${API_KEY}`
      break
    case EconomicIndicatorTypes.REAL_GDP_PER_CAPITA:
    case EconomicIndicatorTypes.INFLATION:
    case EconomicIndicatorTypes.RETAIL_SALES:
    case EconomicIndicatorTypes.DURABLES:
    case EconomicIndicatorTypes.UNEMPLOYMENT:
    case EconomicIndicatorTypes.NONFARM_PAYROLL:
      url = `https://www.alphavantage.co/query?function=${func}&apikey=${API_KEY}`
      break
    case EconomicIndicatorTypes.TREASURY_YIELD:
    case EconomicIndicatorTypes.CPI:
      url = `https://www.alphavantage.co/query?function=${func}&interval=monthly&maturity=10year&apikey=${API_KEY}`
    case EconomicIndicatorTypes.FEDERAL_FUNDS_RATE:
      url = `https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey=${API_KEY}`
      break
    default:
  }

  return fetchData(url)
}

const getTechnicalIndicatorData = async (func: string): Promise<TechnicalIndicatorData> => {
  let url = `https://www.alphavantage.co/query?function=${func}&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=${API_KEY}`
  switch (func) {
    case TechnicalIndicatorTypes.MAMA:
      url = `https://www.alphavantage.co/query?function=MAMA&symbol=IBM&interval=daily&series_type=close&fastlimit=0.02&apikey=${API_KEY}`
      break
    case TechnicalIndicatorTypes.MACDEXT:
      url = `https://www.alphavantage.co/query?function=MACDEXT&symbol=IBM&interval=daily&series_type=open&apikey=${API_KEY}`
      break
    case TechnicalIndicatorTypes.STOCH:
      url = `https://www.alphavantage.co/query?function=STOCH&symbol=IBM&interval=daily&apikey=${API_KEY}`
      break
    case TechnicalIndicatorTypes.STOCHF:
      url = `https://www.alphavantage.co/query?function=STOCHF&symbol=IBM&interval=daily&apikey=${API_KEY}`
      break
    case TechnicalIndicatorTypes.WILLR:
    case TechnicalIndicatorTypes.ADX:
    case TechnicalIndicatorTypes.ADXR:
      url = `https://www.alphavantage.co/query?function=${func}&symbol=IBM&interval=daily&time_period=10&apikey=${API_KEY}`
      break
    case TechnicalIndicatorTypes.STOCHRSI:
      url = `https://www.alphavantage.co/query?function=STOCHRSI&symbol=IBM&interval=daily&time_period=10&series_type=close&fastkperiod=6&fastdmatype=1&apikey=${API_KEY}`
      break
    case TechnicalIndicatorTypes.APO:
    case TechnicalIndicatorTypes.PPO:
      url = `https://www.alphavantage.co/query?function=${func}&symbol=IBM&interval=daily&series_type=close&fastperiod=10&matype=1&apikey=${API_KEY}`
      break
    default:
  }

  return fetchData(url)
}

const TaskService = {
  getStockData,
  getIntelligenceData,
  getEconomicIndicatorData,
  getTechnicalIndicatorData,
}

export default TaskService
