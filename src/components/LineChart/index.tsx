import { Line } from '@ant-design/charts'
import { LineValue } from '@models/task'

type Props = {
  data?: LineValue[]
}

export default function LineChart({ data }: Props) {
  if(!data) return null

  return (
    <Line
      legend
      xField="date"
      yField="value"
      colorField="type"
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
