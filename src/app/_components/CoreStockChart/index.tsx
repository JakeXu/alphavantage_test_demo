import React, { useState, useEffect, useMemo } from 'react'
import { Card, Select, Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { StockApiTypes, StockApiTypeOptions } from '@constants/index'
import { StockData, StockValue, LineValue } from '@models/task'
import { useFetchDataSchema, buildStockData } from '@utils/task'
import TaskService from '@services/TaskService'
import StockChart from '@components/StockChart'
import LineChart from '@components/LineChart'

export default function CoreStockChart() {
  const [stockApiType, setStockApiType] = useState<keyof typeof StockApiTypes>(StockApiTypes.TIME_SERIES_INTRADAY)
  const [data, dispatchData] = useFetchDataSchema<StockData>()

  const asyncFetch = async () => {
    try {
      dispatchData({ isFetching: true, error: null })
      dispatchData({ data: await TaskService.getStockData(stockApiType) })
    } catch (error: any) {
      console.error(error)
      dispatchData({ error })
    } finally {
      dispatchData({ isFetching: false })
    }
  }

  const { tooltip, stockData } = useMemo(() => {
    if (!data.data) return {}

    const metaData = data.data?.['Meta Data'] || {}
    const content = Object.keys(metaData).map(key => <p key={key}>{`${key}: ${metaData[key]}`}</p>)

    return {
      tooltip: (
        <Popover placement="leftBottom" content={content}>
          <InfoCircleOutlined />
        </Popover>
      ),
      stockData: buildStockData(stockApiType, data.data),
    }
  }, [data])

  const onChange = (value: string) => setStockApiType(value as keyof typeof StockApiTypes)

  const cardTitle = useMemo(
    () => (
      <>
        <span className="mr-4">Core Stock APIs</span>
        <Select style={{ width: 160 }} options={StockApiTypeOptions} value={stockApiType} onChange={onChange} />
      </>
    ),
    [stockApiType],
  )

  useEffect(() => {
    asyncFetch()
  }, [stockApiType])

  return (
    <Card title={cardTitle} className="h-full w-full" extra={tooltip} loading={data.isFetching}>
      {StockApiTypes.TIME_SERIES_INTRADAY === stockApiType ||
      StockApiTypes.TIME_SERIES_DAILY === stockApiType ||
      StockApiTypes.TIME_SERIES_DAILY_ADJUSTED === stockApiType ? (
        <StockChart data={stockData as StockValue[]} />
      ) : (
        <LineChart data={stockData as LineValue[]} />
      )}
    </Card>
  )
}
