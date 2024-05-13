import React, { useState, useEffect, useMemo } from 'react'
import { Card, Select, Popover, Table } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { IntelligenceTypes, IntelligenceTypeOptions } from '@constants/index'
import { IntelligenceData, Feed, TopGainer } from '@models/task'
import { useFetchDataSchema } from '@utils/task'
import FeedTable from '@components/FeedTable'
import TopGainerTable from '@components/TopGainerTable'
import TaskService from '@services/TaskService'

export default function AlphaIntelligenceTable() {
  const [intelligenceType, setIntelligenceType] = useState<keyof typeof IntelligenceTypes>(IntelligenceTypes.NEWS_SENTIMENT)
  const [data, dispatchData] = useFetchDataSchema<IntelligenceData>()

  const asyncFetch = async () => {
    try {
      dispatchData({ isFetching: true, error: null })
      dispatchData({ data: await TaskService.getIntelligenceData(intelligenceType) })
    } catch (error: any) {
      console.error(error)
      dispatchData({ error })
    } finally {
      dispatchData({ isFetching: false })
    }
  }

  const { tooltip, intelligenceData } = useMemo(() => {
    if (!data.data) return {}

    const { items, sentiment_score_definition, relevance_score_definition, metadata, last_updated } = data.data

    let content = (
      <>
        <p key="items">{`Items: ${items}`}</p>
        <p key="sentiment_score_definition">{`Sentiment Score Definition: ${sentiment_score_definition}`}</p>
        <p key="relevance_score_definition">{`Relevance Score Definition: ${relevance_score_definition}`}</p>
      </>
    )

    if (intelligenceType === IntelligenceTypes.TOP_GAINERS_LOSERS) {
      content = (
        <>
          <p key="metadata">{`Metadata: ${metadata}`}</p>
          <p key="last_updated">{`Last Updated: ${last_updated}`}</p>
        </>
      )
    }

    return {
      tooltip: (
        <Popover placement="leftBottom" content={content}>
          <InfoCircleOutlined />
        </Popover>
      ),
      intelligenceData: intelligenceType === IntelligenceTypes.TOP_GAINERS_LOSERS ? data.data.top_gainers : data.data.feed,
    }
  }, [data])

  const onChange = (value: string) => setIntelligenceType(value as keyof typeof IntelligenceTypes)

  const cardTitle = useMemo(
    () => (
      <>
        <span className="mr-4">Alpha Intelligence™</span>
        <Select style={{ width: 240 }} options={IntelligenceTypeOptions} value={intelligenceType} onChange={onChange} />
      </>
    ),
    [intelligenceType],
  )

  useEffect(() => {
    asyncFetch()
  }, [intelligenceType])

  return (
    <Card title={cardTitle} className="h-full w-full" extra={tooltip} loading={data.isFetching}>
      {intelligenceType === IntelligenceTypes.NEWS_SENTIMENT ? (
        <FeedTable data={intelligenceData as Feed[]} />
      ) : (
        <TopGainerTable data={intelligenceData as TopGainer[]} />
      )}
    </Card>
  )
}
