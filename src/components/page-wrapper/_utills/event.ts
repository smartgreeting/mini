/*
 * @Author: lihuan
 * @Date: 2024-12-19 20:48:24
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-22 21:19:37
 * @Email: 17719495105@163.com
 */
import { useEffect } from "react"
import { usePageWrapperContext } from "../context"
import { onEvent } from "@/utils/events"

export const useListenerEvent = () => {
  const {dispatch, state} = usePageWrapperContext()
  useEffect(() => {
    onEvent((payload) => {
      dispatch({type:payload.__type__,payload})
    })
  }, [])
  return {
    state
  }
}
