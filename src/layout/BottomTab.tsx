
/*
 * @Author: lihuan
 * @Date: 2024-08-05 21:16:22
 * @LastEditors: lihuan
 * @LastEditTime: 2024-08-21 21:50:27
 * @Email: 17719495105@163.com
 */
import TabBar from "@/components/tab-bar/TabBar"
import { routes } from "@/router"
import Taro from "@tarojs/taro"
import { useNavigate } from "react-router-dom"
const BottomTab = () => {
  const navigation = useNavigate()
  const tabs = routes.filter(i => i.isTabBar).map(item => ({ value: item.path, label: item.title }))
  const onChange = (value: string) => {
    Taro.hideToast()
    navigation(value)
  }
  return <>
    <TabBar items={tabs} onChange={onChange} />
  </>

}

export default BottomTab
