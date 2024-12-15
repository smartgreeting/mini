
/*
 * @Author: lihuan
 * @Date: 2024-08-21 19:54:44
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-15 13:58:48
 * @Email: 17719495105@163.com
 */

import { useClsPrefix } from "@/utils/styles"
import { View,Text } from "@tarojs/components"
import React, { FC } from "react"
import { ProxyTaro } from "@/utils/proxyTaro"
import './index.scss'

export interface IDefaultNavBarProps {
  title?: React.ReactNode
  narBarHeight?:number
}
const DefaultNavBar: FC<IDefaultNavBarProps> = (props) => {
  const { title, narBarHeight } = props
  const { getCls } = useClsPrefix('default-nav-bar')
  const len = ProxyTaro.getCurrentPages().length
  const handleBack = () => {

  }
  return <>
    <View className={getCls()}>
      <View className={getCls('content')} style={{height:narBarHeight,lineHeight:`${narBarHeight}px`}}>
        <View className={getCls('left')} >
          {len > 1 && <Text onClick={() => handleBack()}>返 回</Text>}
        </View>
        <View className={getCls('center')}>{title}</View>
        <View className={getCls('right')}></View>
      </View>
    </View>
  </>
}

export default DefaultNavBar
