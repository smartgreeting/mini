/*
 * @Author: lihuan
 * @Date: 2024-09-21 21:55:14
 * @LastEditors: lihuan
 * @LastEditTime: 2024-09-22 11:19:43
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
