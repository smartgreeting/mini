
/*
 * @Author: lihuan
 * @Date: 2024-12-17 19:58:39
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-19 21:27:33
 * @Email: 17719495105@163.com
 */
import type { IEventParams } from "@/utils/events";
import { createContext, useContext, useReducer } from "react";

export type IPageWrapperContext = {
  state: IEventParams
  dispatch: React.Dispatch<IActionType>
}

export const PageWrappercontext = createContext<IPageWrapperContext>({state:{}} as IPageWrapperContext)


export const PageWrapperProvider = PageWrappercontext.Provider



export const usePageWrapperContext = () => {
  const value = useContext(PageWrappercontext)
  return value
}
interface IActionType {
  type?: keyof IEventParams;
  payload?:IEventParams
}
const reducer = (state:IEventParams, action:IActionType) => {
  return {...state,...action?.payload}
}
export const usePageWrapperContextSet = () => {
  const [state, dispatch] = useReducer(reducer, {})
  return {
    state,
    dispatch
  }
}
