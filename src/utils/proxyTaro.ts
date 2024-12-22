/*
 * @Author: lihuan
 * @Date: 2024-12-15 13:54:00
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-22 21:28:31
 * @Email: 17719495105@163.com
 */
import { isFunction } from "@tarojs/shared"
import Taro from "@tarojs/taro"
import { type IEventParams, triggerEvent } from "@/utils/events";

interface IProxyTaro extends Taro.TaroStatic {
  HToast:(props:IEventParams['toast'])=> void
  HModal:(props:IEventParams['modal'])=> void
}
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
})  as IProxyTaro
let id =1
ProxyTaro.HToast = (props: IEventParams['toast']) => {
  id ++
  triggerEvent({ toast:{...props,open: true,__id: id} })
}
ProxyTaro.HModal = (props: IEventParams['modal']) => {
  triggerEvent({ modal:{...props,open: true} })
}

// ProxyTaro.showToast = (props) => {
//   triggerEvent({ toast:{...props,open: true} })
// }
