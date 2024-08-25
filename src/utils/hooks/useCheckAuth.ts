
/*
 * @Author: lihuan
 * @Date: 2024-08-01 21:04:05
 * @LastEditors: lihuan
 * @LastEditTime: 2024-08-03 12:15:38
 * @Email: 17719495105@163.com
 */
import { IRouteObject } from "@/router";
import { isArray, isBoolean, isFunction } from "@tarojs/shared";

export const useCheckAuth = (route: IRouteObject): boolean => {
  const { shouldAuth } = route || {}
  if (shouldAuth === undefined) return true;
  if (isBoolean(shouldAuth)) {

    return false
  }
  if (isFunction(shouldAuth)) {
    return shouldAuth(route)
  }
  const auth = isArray(shouldAuth) ? shouldAuth : [shouldAuth]
  if (auth) {
    return true
  }

  return true
}
