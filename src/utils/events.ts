
/*
 * @Author: lihuan
 * @Date: 2024-12-18 21:51:13
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-21 13:30:32
 * @Email: 17719495105@163.com
 */
import { ProxyTaro } from "./proxyTaro";
import type { IModal } from "@/components/modal";
import type { IToast } from "@/components/toast";

let costomEvnet:TaroGeneral.Events
export const initEventCenter = () => {
  costomEvnet = ProxyTaro.eventCenter
  return costomEvnet
}
const actionMap = {
  'toast': 'toast',
  'modal': 'modal',
}

export interface IEventParams {
  toast?: IToast;
  modal?: IModal;
  __type__?: keyof IEventParams;
}


export const triggerEvent = (params: IEventParams) => {
  for (const key in actionMap) {
    if (params[key]) {
      costomEvnet.trigger(key, {...params,__type__:key})
      break
    }
  }
}
export const onEvent = (cb: (params: IEventParams) => void) => {
  for (const key in actionMap) {
    costomEvnet.on(key, cb)
  }

}


