/*
 * @Author: lihuan
 * @Date: 2024-09-22 11:32:10
 * @LastEditors: lihuan
 * @LastEditTime: 2024-09-22 12:27:17
 * @Email: 17719495105@163.com
 */
import { isString } from "@tarojs/shared";
import Taro from "@tarojs/taro";
import { DependencyList, useCallback, useMemo } from "react";


interface IUpdateStorageData {
  exp?: number; // 过期时间 分钟
}
export const useStorage =<T = Record<string,any>> (key: string, dep: DependencyList = []) => {

  const updateStorageData = useCallback((values: IUpdateStorageData & T) => {
    Taro.setStorageSync(key, { exp: 0, t: Date.now(), ...values })
  }, [key])

  const storageData = useMemo(() => {
    const val = Taro.getStorageSync(key)
    const time = Date.now() - val.t  < val.exp * 1000 * 60
    console.log(Date.now() , val.t,Date.now() - val.t)
    if (val.exp === 0 || time) return val
    return {}
  }, [key, ...dep]) as T
  return {
    storageData,
    updateStorageData
  }
}
