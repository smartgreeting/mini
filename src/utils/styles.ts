/*
 * @Author: lihuan
 * @Date: 2024-08-21 20:26:30
 * @LastEditors: lihuan
 * @LastEditTime: 2024-08-22 19:57:33
 * @Email: 17719495105@163.com
 */
// 和variables一致
export const $prifix = 'lh'
export const useClsPrefix = (comp: string) => {
  const getCls = (prefix?: string) => {
    if (prefix) {
      return `${$prifix}-${comp}__${prefix}`
    }
    return `${$prifix}-${comp}`
  }

  return {
    getCls
  }
}

