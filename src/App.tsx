import './App.css'
// @ts-expect-error
import routes from '~react-pages'
import { Suspense } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { setDarkClass } from './utils/browser'

function App() {
  const [isDarkMode] = useDarkMode()
  setDarkClass(isDarkMode)

  return (
    <ConfigProvider locale={zhCN}>
      <Suspense fallback={<div>Loading...</div>}>{useRoutes(routes)}</Suspense>
    </ConfigProvider>
  )
}

export default App
