
/*
 * @Author: lihuan
 * @Date: 2024-11-25 21:10:49
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-15 20:56:04
 * @Email: 17719495105@163.com
 */
import { runFunction } from "@/utils/runFunction";
import { useClsPrefix } from "@/utils/styles";
import { View } from "@tarojs/components";
import { PropsWithChildren } from "react";
import CustomNavBar, { ICustomNavBarProps } from "../custom-nav-bar";
import { ProxyTaro } from "@/utils/proxyTaro";

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
  const isCustomNavBar = ProxyTaro.Current.page?.config?.navigationStyle === 'custom'
  return <>
    {isCustomNavBar && <CustomNavBar {...customNavBarProps} />}
    <View className={getCls()}>
      {children}
      <View className={getCls('footer')}>
        {runFunction(renderFooter)}
      </View>
    </View>
  </>
}

export default PageWrapper
