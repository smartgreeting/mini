/*
 * @Author: lihuan
 * @Date: 2024-09-21 21:53:27
 * @LastEditors: lihuan
 * @LastEditTime: 2024-09-22 17:57:25
 * @Email: 17719495105@163.com
 */
import { getOpenId } from "@/services/user"
import Taro from "@tarojs/taro"
import { useEffect, useState } from "react"
import { useStorage } from "./useStorage"
export const OpenidStorageKey = '__OpenidStorageKey__'
export const useGetOpenid = () => {
  const [openId, setOpenId] = useState('')
  const { storageData, updateStorageData } = useStorage<{openid:string}>(OpenidStorageKey)
  useEffect(() => {
    if (storageData.openid) {
      setOpenId(storageData.openid)
      return
    }
    Taro.login({
      success: function (res) {
        if (res.code) {
          getOpenId(res.code).then(r => {
            const { errcode, openid } = r
            if (errcode == 0) {
              setOpenId(openid)
              updateStorageData({ openid })
            }
          })
        } else {
          console.log('获取Openid失败！' + res.errMsg)
        }
      },
      fail(res) {
        console.log(res, '222')
      },
    })
  }, [storageData])
  return { openid:openId }

}
