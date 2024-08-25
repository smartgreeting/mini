/*
 * @Author: lihuan
 * @Date: 2024-08-19 21:15:39
 * @LastEditors: lihuan
 * @LastEditTime: 2024-08-21 22:35:42
 * @Email: 17719495105@163.com
 */
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useClsPrefix } from '@/utils/styles'
import DefaultNavBar, { IDefaultNavBarProps } from './default-nav-bar'
import React, { PropsWithChildren } from 'react'

import './index.scss'

type IProps = {
  bgImg?: string;
} & IDefaultNavBarProps
const CustomNavBar = (props: PropsWithChildren<IProps>) => {
  const { title, children, bgImg = 'https://tse1-mm.cn.bing.net/th/id/OIP-C.cGjCuP5ghtV5SuGhFWIqUAHaHa?rs=1&pid=ImgDetMain' } = props
  const { getCls } = useClsPrefix('custom-nav-bar')
  const { statusBarHeight } = Taro.getSystemInfoSync()
  const { top, height } = Taro.getMenuButtonBoundingClientRect()
  const narBarHeight = (top - statusBarHeight!) * 2 + height
  const style: React.CSSProperties = {
    paddingTop: statusBarHeight,
    height: narBarHeight,
    backgroundImage: `url(${bgImg})`
  }
  return <>
    <View className={getCls()} style={style}>
      {children ? children : <DefaultNavBar title={title} narBarHeight={narBarHeight} />}
    </View>
  </>
}

export default CustomNavBar
