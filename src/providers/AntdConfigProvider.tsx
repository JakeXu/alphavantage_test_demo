import { ConfigProvider } from 'antd'

type Props = {
  children: React.ReactNode
}

const AntdConfigProvider = ({ children }: Props) => <ConfigProvider>{children}</ConfigProvider>

export default AntdConfigProvider
