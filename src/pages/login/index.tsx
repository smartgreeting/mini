
/*
 * @Author: lihuan
 * @Date: 2024-08-05 20:25:53
 * @LastEditors: lihuan
 * @LastEditTime: 2024-09-22 18:19:29
 * @Email: 17719495105@163.com
 */
import { getTokenByOpenId } from "@/services/user"
import { useGetOpenid } from "@/utils/hooks/useGetOpenid"
import { useStorage } from "@/utils/hooks/useStorage"
import { useEffect } from "react"
export const storageTokenKey = '__storageTokenKey__'
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
  return <>Login</>
  }


  export default Login
