import { Stock } from '@ant-design/charts'
import { StockValue } from '@models/task'

type Props = {
  data?: StockValue[]
}

export default function StockChart({ data }: Props) {
  if(!data) return null

  return (
    <Stock
      xField="date"
      yField={['open', 'close', 'high', 'low']}
      data={data}
      axis={{
        x: {
          labelAutoRotate: false,
          labelAutoHide: true,
        },
      }}
      scrollbar={{ x: {} }}
    />
  )
}
