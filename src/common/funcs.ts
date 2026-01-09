import { debounce } from 'lodash'
import type { DebouncedFunc } from 'lodash'

/**
 * @description:防抖函数
 * @param {Function} func - 需要防抖的函数
 * @param {number} wait - 等待时间，默认2000ms
 * @param {boolean} imder - 是否立即执行，默认true
 * @return {Function} 防抖后的函数
 */
export function mydebounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 2000,
  imder: boolean = true
): DebouncedFunc<T> {
  return debounce(func, wait, {
    leading: imder,
    trailing: !imder
  })
}
