/*
 * @Author: lihuan
 * @Date: 2024-12-15 13:54:00
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-15 13:58:04
 * @Email: 17719495105@163.com
 */
import { isFunction } from "@tarojs/shared"
import Taro from "@tarojs/taro"

export const ProxyTaro = new Proxy(Taro, {
  get(target, prop, receiver) {
    if (isFunction(target[prop])) {
      return (...args) => target[prop].apply(target, args)
    }
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    return Reflect.set(target, prop, value, receiver);
  },
  has(target, prop) {
    return Reflect.has(target, prop);
  },
  ownKeys(target) {
    return Reflect.ownKeys(target);
  }
})
