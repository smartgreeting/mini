/*
 * @Author: lihuan
 * @Date: 2024-09-22 11:32:10
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-16 20:37:38
 * @Email: 17719495105@163.com
 */
import { ProxyTaro } from "@/utils/proxyTaro";
import { DependencyList, useCallback, useMemo } from "react";


interface IUpdateStorageData {
  exp?: number; // 过期时间 分钟
}
export const useStorage =<T = Record<string,any>> (key: string, dep: DependencyList = []) => {

  const updateStorageData = useCallback((values: IUpdateStorageData | T) => {
    ProxyTaro.setStorageSync(key, { exp: 0, t: Date.now(), ...values })
  }, [key])

  const storageData = useMemo(() => {
    const val = ProxyTaro.getStorageSync(key)
    const time = Date.now() - val.t  < val.exp * 1000 * 60
    if (val.exp === 0 || time) return val
    return {}
  }, [key, ...dep]) as T
  return {
    storageData,
    updateStorageData
  }
}
