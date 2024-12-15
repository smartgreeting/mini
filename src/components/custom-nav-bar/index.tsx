/*
 * @Author: lihuan
 * @Date: 2024-08-19 21:15:39
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-15 13:59:03
 * @Email: 17719495105@163.com
 */
import { View } from '@tarojs/components'
import { ProxyTaro } from "@/utils/proxyTaro"
import { useClsPrefix } from '@/utils/styles'
import DefaultNavBar, { IDefaultNavBarProps } from './default-nav-bar'
import React, { FC } from 'react'

import './index.scss'
type IRenderProps = { statusBarHeight?: number; narBarHeight: number; top: number; height: number; }
export type ICustomNavBarProps = {
  bgImg?: string;
  render?: (props: IRenderProps) => React.ReactNode
} & IDefaultNavBarProps
const CustomNavBar: FC<ICustomNavBarProps> = (props) => {
  const { title, render, bgImg = 'https://tse1-mm.cn.bing.net/th/id/OIP-C.cGjCuP5ghtV5SuGhFWIqUAHaHa?rs=1&pid=ImgDetMain' } = props
  const { getCls } = useClsPrefix('custom-nav-bar')
  const { statusBarHeight } = ProxyTaro.getWindowInfo()
  const { top, height } = ProxyTaro.getMenuButtonBoundingClientRect()
  const narBarHeight = (top - statusBarHeight!) * 2 + height
  const style: React.CSSProperties = {
    paddingTop: statusBarHeight,
    height: narBarHeight,
    backgroundImage: `url(${bgImg})`
  }
  return <>
    <View className={getCls()} style={style}>
      {render ? render?.({ statusBarHeight, narBarHeight, top, height })
        : <DefaultNavBar title={title} narBarHeight={narBarHeight} />}
    </View>
  </>
}

export default CustomNavBar
