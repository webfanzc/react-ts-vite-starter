import { Button } from 'antd'
import { getIndexConfig } from '~/api'

export default function Test() {
  const [dark, setDark] = useDarkMode()
  const { data, loading, error } = useRequest(getIndexConfig)

  return (
    <>
      <div content text-2xl font-bold c-green >
        <h1>Test</h1>
        {loading && <h2>request loading </h2>}
        {data && <h2> data is {JSON.stringify(data)}</h2>}
        {error && <h2>error is {JSON.stringify(error.message)}</h2>} 

        <Button type="primary" onClick={() => setDark()}>
          切换黑夜模式{dark ? '开' : '关'}
        </Button>
      </div>

      <i className="i-carbon:3d-cursor inline-block" />
    </>
  )
}
