import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type * as URLKEYS from './URL_CONSTANT'
import type { ResponseType } from './apiResponseType'
import { GET_INDEX_CONFIG } from './URL_CONSTANT'
import axios from '~/utils/request'
import type { ObjectValues } from '~/types/utils'

export interface ServerResponse<T = any> {
  data: T
}

export type RequestKeyType = ObjectValues<typeof URLKEYS>
type AxiosRequestConfigWithURL<T extends RequestKeyType> =
  AxiosRequestConfig & { url: T }

function request<T extends RequestKeyType>(
  config: AxiosRequestConfigWithURL<T>
) {
  return new Promise<ServerResponse<ResponseType[T]>>((resolve, reject) => {
    /*
    传递泛型给http中的拦截器
    */
    axios
      .request<AxiosResponse<ResponseType[T]>>({
        url: config.url,
        data: config.data || '',
        params: config.params || '',
        method: config.method || 'get',
        headers: config.headers || {},
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/**
 * get请求错误捕获函数包装
 * @param url 请求的地址
 * @param params 请求参数
 * @returns Promise
 */
const getCaptured = async <T extends RequestKeyType>(
  url: T,
  params: Object = {},
  config: AxiosRequestConfig = {}
) => {
  return request<T>({
    ...config,
    method: 'get',
    url,
    params,
  })
}

/**
 * post请求错误捕获函数包装
 * @param url 请求的地址
 * @param data 请求参数
 * @param config
 * @returns Promise
 */

const postCaptured = async <T extends RequestKeyType>(
  url: T,
  data: Object = {},
  config: AxiosRequestConfig = {}
) => {
  return request<T>({
    ...config,
    method: 'post',
    url,
    data,
  })
}
// 一个测试
export const getIndexConfig = () => {
  return getCaptured(GET_INDEX_CONFIG)
}
