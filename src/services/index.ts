/*
 * @Author: lihuan
 * @Date: 2024-08-07 21:17:30
 * @LastEditors: lihuan
 * @LastEditTime: 2024-08-18 19:43:44
 * @Email: 17719495105@163.com
 */
import { request } from "@/utils/request"

export const getTestReq = () => {
 return request('/v1/user/getSms',{
   method: 'GET',
   params: {
    phone:17719495105
   }
    }).then(res => {
      return res
    })
}
