/*
 * @Author: lihuan
 * @Date: 2024-09-21 21:55:14
 * @LastEditors: lihuan
 * @LastEditTime: 2024-09-22 21:47:26
 * @Email: 17719495105@163.com
 */
import { request } from "@/utils/request"

export const getOpenId =async (code: string) => {
 return request('/v1/user/getOpenId',{
   method: 'GET',
   params: {
    code
   }
    })
}


export const getTokenByOpenId = (openid:string) => {
  return request('/v1/user/getTokenByOpenId',{
    method: "GET",
    params: {
      openid
    }
     })
}

