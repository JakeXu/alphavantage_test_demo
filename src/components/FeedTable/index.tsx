import { Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { Feed } from '@models/task'
import { getDateWith12HoursFormat } from '@utils/task'

interface DataType {
  title: string
  source: string
  time_published: string
  source_domain: string
  overall_sentiment_score: number
  overall_sentiment_label: string
}

interface ExpandedDataType {
  ticker: string
  relevance_score: string
  ticker_sentiment_score: string
  ticker_sentiment_label: string
}

type Props = {
  data?: Feed[]
}

export default function FeedTable({ data }: Props) {
  if (!data) return null

  const expandedRowRender = (record: Feed) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Ticker', dataIndex: 'ticker', key: 'ticker' },
      { title: 'Relevance Score', dataIndex: 'relevance_score', key: 'relevance_score' },
      { title: 'Ticker Sentiment Score', dataIndex: 'ticker_sentiment_score', key: 'ticker_sentiment_score' },
      { title: 'Ticker Sentiment Label', dataIndex: 'ticker_sentiment_label', key: 'ticker_sentiment_label' },
    ]

    return <Table rowKey="ticker" size="middle" columns={columns as any} dataSource={record.ticker_sentiment} pagination={false} />
  }

  const columns: TableColumnsType<DataType> = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    {
      title: 'Time Published',
      dataIndex: 'time_published',
      key: 'time_published',
      className: 'ant-table-cell-ellipsis',
      render: (text: string) => getDateWith12HoursFormat(text),
    },
    { title: 'Source', dataIndex: 'source', key: 'source', className: 'ant-table-cell-ellipsis' },
    {
      title: 'Source Domain',
      dataIndex: 'source_domain',
      key: 'source_domain',
      className: 'ant-table-cell-ellipsis',
      render: (text: string) => (
        <a href={`//${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Overall Sentiment Score',
      dataIndex: 'overall_sentiment_score',
      key: 'overall_sentiment_score',
      className: 'ant-table-cell-ellipsis',
    },
    {
      title: 'Overall Sentiment Label',
      dataIndex: 'overall_sentiment_label',
      key: 'overall_sentiment_label',
      className: 'ant-table-cell-ellipsis',
    },
  ]

  return <Table rowKey="title" size="middle" columns={columns as any} expandable={{ expandedRowRender }} dataSource={data} />
}
