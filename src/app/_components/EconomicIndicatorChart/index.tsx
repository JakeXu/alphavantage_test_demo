import React, { useState, useEffect, useMemo } from 'react'
import { Card, Select, Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { EconomicIndicatorTypes, EconomicIndicatorTypesOptions } from '@constants/index'
import { EconomicIndicatorData, LineValue } from '@models/task'
import { useFetchDataSchema } from '@utils/task'
import TaskService from '@services/TaskService'
import LineChart from '@components/LineChart'

export default function EconomicIndicatorChart() {
  const [economicIndicatorType, setEconomicIndicatorType] = useState<keyof typeof EconomicIndicatorTypes>(EconomicIndicatorTypes.REAL_GDP)
  const [data, dispatchData] = useFetchDataSchema<EconomicIndicatorData>()

  const asyncFetch = async () => {
    try {
      dispatchData({ isFetching: true, error: null })
      dispatchData({ data: await TaskService.getEconomicIndicatorData(economicIndicatorType) })
    } catch (error: any) {
      console.error(error)
      dispatchData({ error })
    } finally {
      dispatchData({ isFetching: false })
    }
  }

  const { tooltip, economicIndicatorData } = useMemo(() => {
    if (!data.data) return {}

    const { name, interval, unit } = data.data
    const content = (
      <>
        <p key="name">{`Name: ${name}`}</p>
        <p key="interval">{`Interval: ${interval}`}</p>
        <p key="unit">{`Unit: ${unit}`}</p>
      </>
    )

    return {
      tooltip: (
        <Popover placement="leftBottom" content={content}>
          <InfoCircleOutlined />
        </Popover>
      ),
      economicIndicatorData: data.data.data.reverse().map(row => ({ ...row, value: parseFloat(String(row.value)) })),
    }
  }, [data])

  const onChange = (value: string) => setEconomicIndicatorType(value as keyof typeof EconomicIndicatorTypes)

  const cardTitle = useMemo(
    () => (
      <>
        <span className="mr-4">Economic Indicators</span>
        <Select style={{ width: 240 }} options={EconomicIndicatorTypesOptions} value={economicIndicatorType} onChange={onChange} />
      </>
    ),
    [economicIndicatorType],
  )

  useEffect(() => {
    asyncFetch()
  }, [economicIndicatorType])

  return (
    <Card title={cardTitle} className="h-full w-full" extra={tooltip} loading={data.isFetching}>
      <LineChart data={economicIndicatorData as LineValue[]} />
    </Card>
  )
}
