/*
 * @Author: lihuan
 * @Date: 2024-07-17 22:26:55
 * @LastEditors: lihuan
 * @LastEditTime: 2024-08-21 22:42:31
 * @Email: 17719495105@163.com
 */

import { View } from "@tarojs/components"
import './index.scss'
import { FC, useState } from "react"
import classNames from "classnames"
import { runFunction } from "@/utils/runFunction";
import { useClsPrefix } from "@/utils/styles";

interface IProps {
  onChange?: (value: string) => void;
  defaultValue?: string
  items?: { label?: React.ReactNode, value?: string }[]
}

const TabBar: FC<IProps> = (props) => {
  const { items, defaultValue, onChange } = props
  const [current, setCurrent] = useState(defaultValue || items?.[0].value)
  const { getCls } = useClsPrefix('tab-bar')
  return <>
    <View className={getCls()}>
      {
        items?.map((item) =>
          <View className={classNames([getCls('item'), 'l-click'], { [getCls('active')]: current === item.value })} onClick={() => {
            setCurrent(item.value)
            runFunction(onChange, item.value)
          }}>
            {item.label}
          </View>)
      }
    </View>
  </>
}

export default TabBar
