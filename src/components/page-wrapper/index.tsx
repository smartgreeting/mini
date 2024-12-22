
/*
 * @Author: lihuan
 * @Date: 2024-11-25 21:10:49
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-21 12:24:21
 * @Email: 17719495105@163.com
 */
import { runFunction } from "@/utils/runFunction";
import { useClsPrefix } from "@/utils/styles";
import { View } from "@tarojs/components";
import { PropsWithChildren } from "react";
import CustomNavBar, { ICustomNavBarProps } from "../custom-nav-bar";
import { ProxyTaro } from "@/utils/proxyTaro";
import Toast from '@/components/toast'
import Login from "@/components/login";
import { useListenerEvent } from "./_utills/event";

import './index.scss'


interface IProps {
  renderFooter?: (() => React.ReactNode) | React.ReactNode;
  /**
   * @description
   * index.config 开启生效 navigationStyle:'custom'
   * 修改配置需要会重启项目
   */
  customNavBarProps?: ICustomNavBarProps
}
const PageWrapper = (props: PropsWithChildren<IProps>) => {
  const { children, renderFooter, customNavBarProps } = props
  const { getCls } = useClsPrefix('page-wrapper')
  const { state } = useListenerEvent()
  const isCustomNavBar = ProxyTaro.Current.page?.config?.navigationStyle === 'custom'
  return <>
    {isCustomNavBar && <CustomNavBar {...customNavBarProps} />}
    <View className={getCls()}>
      <View className={getCls('content')}>
        {children}
      </View>
      <View className={getCls('footer')}>
        {runFunction(renderFooter)}
      </View>
    </View>
    <Toast {...state.toast} />
    <Login />
  </>
}

export default PageWrapper
