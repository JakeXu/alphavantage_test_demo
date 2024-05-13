import React, { useState, useEffect, useMemo } from 'react'
import { Card, Select, Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { TechnicalIndicatorTypes, TechnicalIndicatorTypesOptions } from '@constants/index'
import { TechnicalIndicatorData, LineValue } from '@models/task'
import { useFetchDataSchema } from '@utils/task'
import TaskService from '@services/TaskService'
import LineChart from '@components/LineChart'

export default function TechnicalIndicatorChart() {
  const [technicalIndicatorType, setTechnicalIndicatorType] = useState<keyof typeof TechnicalIndicatorTypes>(TechnicalIndicatorTypes.SMA)
  const [data, dispatchData] = useFetchDataSchema<TechnicalIndicatorData>()

  const asyncFetch = async () => {
    try {
      dispatchData({ isFetching: true, error: null })
      dispatchData({ data: await TaskService.getTechnicalIndicatorData(technicalIndicatorType) })
    } catch (error: any) {
      console.error(error)
      dispatchData({ error })
    } finally {
      dispatchData({ isFetching: false })
    }
  }

  const { tooltip, technicalIndicatorData } = useMemo(() => {
    if (!data.data || data.isFetching) return {}

    const metaData = data.data?.['Meta Data'] || {}
    const content = Object.keys(metaData).map(key => <p key={key}>{`${key}: ${metaData[key]}`}</p>)
    const rows = (data.data as Record<string, Record<string, any>>)[`Technical Analysis: ${technicalIndicatorType}`]

    return {
      tooltip: (
        <Popover placement="leftBottom" content={content}>
          <InfoCircleOutlined />
        </Popover>
      ),
      technicalIndicatorData: Object.keys(rows)
        .reverse()
        .map(date => {
          let key = technicalIndicatorType as string
          switch (technicalIndicatorType) {
            case TechnicalIndicatorTypes.MACDEXT:
              key = 'MACD'
              break
            case TechnicalIndicatorTypes.STOCH:
              key = 'SlowK'
              break
            case TechnicalIndicatorTypes.STOCHF:
            case TechnicalIndicatorTypes.STOCHRSI:
              key = 'FastK'
              break
            default:
          }
          return { date, value: parseFloat(rows[date][key]) }
        }),
    }
  }, [data])

  const onChange = (value: string) => setTechnicalIndicatorType(value as keyof typeof TechnicalIndicatorTypes)

  const cardTitle = useMemo(
    () => (
      <>
        <span className="mr-4">Technical Indicators</span>
        <Select style={{ width: 120 }} options={TechnicalIndicatorTypesOptions} value={technicalIndicatorType} onChange={onChange} />
      </>
    ),
    [technicalIndicatorType],
  )

  useEffect(() => {
    asyncFetch()
  }, [technicalIndicatorType])
  console.log(technicalIndicatorData)

  return (
    <Card title={cardTitle} className="h-full w-full" extra={tooltip} loading={data.isFetching}>
      <LineChart data={technicalIndicatorData as LineValue[]} />
    </Card>
  )
}
