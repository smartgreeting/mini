/*
 * @Author: lihuan
 * @Date: 2024-08-05 21:10:27
 * @LastEditors: lihuan
 * @LastEditTime: 2024-08-05 21:12:11
 * @Email: 17719495105@163.com
 */
/** 如果是个方法执行一下它 */
export function runFunction<T extends any[]>(valueEnum: any, ...rest: T) {
  if (typeof valueEnum === 'function') {
    return valueEnum(...rest);
  }
  return valueEnum;
}
