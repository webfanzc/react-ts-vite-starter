import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios'
import axios from 'axios'
import { throttle } from './utils'
import { message } from 'antd'
// 创建一个错误
function errorCreate(msg: string) {
  if (msg === 'method repeat') return
  const error = new Error(msg)
  errorLog(error)
  // throw error
}
const throttleErrorCreate = throttle(errorCreate, 1000)

// 记录和显示错误
function errorLog(error: Error) {
  message.error(error.message, 5 * 1000)
}
// 定义接口
interface PendingType {
  url?: string
  method?: string
  params: any
  data: any
  cancel: Function
}

// 取消重复请求
const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken
// 创建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL || '/',
  timeout: 20000, // 请求超时时间
  withCredentials: true,
})
// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  pending.forEach((item, index) => {
    // 当前请求在数组中存在时执行cancel
    if (
      item.url === config.url &&
      item.method === config.method &&
      JSON.stringify(item.params) === JSON.stringify(config.params) &&
      JSON.stringify(item.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      item.cancel('method repeat')
      // 从数组中移除记录
      pending.splice(index, 1)
    }
  })
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    removePending(config)
    config.cancelToken = new CancelToken((c) => {
      pending.push({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
        cancel: c,
      })
    })

    return config
  },
  (error) => {
    // 发送失败
    return Promise.reject(error)
  }
)

export interface IAxios<D = null> {
  code: number
  msg: string
  data: D
}
// 响应拦截器
service.interceptors.response.use(
  <T>(response: AxiosResponse<IAxios<T>>) => {
    return response
  },
  (error: AxiosError) => {
    error?.message && errorCreate(`${error.message!}`)
    return Promise.reject(error)
  }
)

export default service
