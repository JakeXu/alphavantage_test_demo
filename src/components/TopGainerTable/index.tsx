import { Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { TopGainer } from '@models/task'

interface DataType {
  ticker: string
  price: string
  change_amount: string
  change_percentage: string
  volume: number
}

type Props = {
  data?: TopGainer[]
}

export default function TopGainerTable({ data }: Props) {
  if (!data) return null

  const columns: TableColumnsType<DataType> = [
    { title: 'Ticker', dataIndex: 'ticker', key: 'ticker' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    { title: 'Change Amount', dataIndex: 'change_amount', key: 'change_amount' },
    {
      title: 'Change Percentage',
      dataIndex: 'change_percentage',
      key: 'change_percentage',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
    },
  ]

  return <Table rowKey="ticker" size="middle" columns={columns as any} dataSource={data} />
}
