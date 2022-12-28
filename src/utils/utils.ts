/**
 * 工具类模块 提供一些常用的工具方法 非浏览器内置方法
 * @module utils/utils
 */
import type { JSONString, PickType } from '~/types/utils'
/**
 * 增加指定的前缀字符串
 * @param prefix 前缀字符串
 * @returns {Function} 一个新的函数 接收一个url作为参数 并返回一个带有前缀的url
 */
export const withPrefix =
  <T extends string>(prefix: T) =>
  <U extends string>(url: U): `${T}${U}` =>
    `${prefix}${url}`

/**
 * 阻塞一段时间
 * @param timeout 超时时间
 * @returns {Promise<void>}
 */
export const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

/**
 * @description 检查传入参数是否是一个对象
 * @export utils/utils
 * @param {any} obj
 * @return {boolean}
 */
export function isObject<T>(obj: T): T extends object ? true : false {
  // @ts-expect-error
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}

/**
 * @description 深拷贝
 * @export
 * @param {T} source
 * @param {WeakMap} [hash=new WeakMap()]
 * @return {T}  深克隆后的新对象
 */
export function deepClone<T>(source: T, hash = new WeakMap()): T {
  if (!isObject(source)) return source
  if (hash.has(source as Object)) return hash.get(source as Object)

  const target = Array.isArray(source) ? [...source] : { ...source }
  hash.set(source as Object, target)
  // @ts-expect-error
  Reflect.ownKeys(target).forEach((key) => {
    // @ts-expect-error
    if (isObject(source[key])) {
      // @ts-expect-error
      target[key] = deepClone(source[key], hash)
    } else {
      // @ts-expect-error
      target[key] = source[key]
    }
  })

  // @ts-expect-error
  return target
}

export function compose<T extends Function>(...funcs: Function[]): T {
  const length = funcs.length
  let index = length
  while (index--) {
    if (typeof funcs[index] !== 'function')
      throw new TypeError('Expected a function')
  }

  // @ts-expect-error
  return function (this, ...args: any[]) {
    let index = 0
    let result = length ? funcs[index].apply(this, args) : args[0]
    while (++index < length) result = funcs[index].call(this, result)

    return result
  }
}

export function debounce<T extends (...arg: any[]) => any>(
  fn: T,
  delay: number,
  immediate = true
): (...arg: Parameters<T>) => ReturnType<T> {
  let timer: NodeJS.Timer | null = null // 声明计时器

  return function (...arg: Parameters<T>) {
    timer && clearTimeout(timer)

    if (immediate && !timer) return fn(...arg)

    timer = setTimeout(() => {
      return fn(...arg)
    }, delay)
  }
}

export function throttle<T extends (...arg: any[]) => any>(
  func: T,
  duration: number
): (...arg: Parameters<T>) => ReturnType<T> {
  let lastCallTime = 0

  return (...arg: Parameters<T>) => {
    if (Date.now() - lastCallTime > duration) {
      lastCallTime = Date.now()
      return func(...arg)
    }
  }
}

// 字符串排序
export function localeCompare(a: string, b: string) {
  return a.localeCompare(b)
}

// 千分位
export function toThousand(num: string | number) {
  if (typeof num === 'undefined') return '0'

  return num
    .toString()
    .trim()
    .replace(/(?<!\.\d*)\B(?=(\d{3})+(\.\d+)?$)/g, ',')
}

// 过滤html标签
export function filterHTMLMark(content: string) {
  return content
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/[\r\n]/g, '')
    .replace(/\s+/g, '')
}

/**
 * bex颜色转为rgba
 * @param String #ff00ff #f0f
 * @param Number a 0-1
 * @return String rgba(r,g,b,a)
 */
export function hexToRgba(hex: string, a: number) {
  if (!hex?.includes('#')) return 'rgba(0,0,0,0)'

  if (hex.length !== 7 && hex.length !== 4) {
    console.error(`${hex} is not hex color`)
    return 'rgba(0,0,0,0)'
  }
  const colors = hex.replace('#', '').match(/^(..?)(..?)(..?)/)
  if (!colors || colors.length !== 4) return 'rgba(0,0,0,0)'

  return `rgba(${parseInt(
    `0x${colors[1]}${colors[1].length === 1 ? colors[1] : ''}`,
    16
  )},${parseInt(
    `0x${colors[2]}${colors[2].length === 1 ? colors[2] : ''}`,
    16
  )},${parseInt(
    `0x${colors[3]}${colors[3].length === 1 ? colors[3] : ''}`,
    16
  )},${Number(a) || 1})`
}
