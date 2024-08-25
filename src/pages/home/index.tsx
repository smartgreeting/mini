
/*
 * @Author: lihuan
 * @Date: 2024-08-05 20:24:58
 * @LastEditors: lihuan
 * @LastEditTime: 2024-08-22 20:54:29
 * @Email: 17719495105@163.com
 */

import { getTestReq } from "@/services"

import { useRequest } from "taro-hooks"

const Home = () => {
  const { data } = useRequest(getTestReq)
  return <>
    Home {data?.smsCode}

  </>
}


export default Home
