
/*
 * @Author: lihuan
 * @Date: 2024-08-05 20:25:53
 * @LastEditors: lihuan
 * @LastEditTime: 2024-11-25 21:09:25
 * @Email: 17719495105@163.com
 */
import { getTokenByOpenId } from "@/services/user"
import { useGetOpenid } from "@/hooks/useGetOpenid"
import { useStorage } from "@/hooks/useStorage"
import { useEffect } from "react"
import { storageTokenKey } from "@/utils/request"
const Login = () => {
  const { openid } = useGetOpenid()
  const { updateStorageData } = useStorage(storageTokenKey)
  useEffect(() => {
    if (openid) {
      // 获取token
      getTokenByOpenId(openid).then(token => {
        updateStorageData({token})
       })
    }
  },[openid])
  return <></>
  }


  export default Login
