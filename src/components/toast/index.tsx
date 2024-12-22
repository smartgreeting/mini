
/*
 * @Author: lihuan
 * @Date: 2024-12-16 20:41:13
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-22 21:25:24
 * @Email: 17719495105@163.com
 */

import { useClsPrefix } from "@/utils/styles"
import { View } from "@tarojs/components"
import './index.scss'
import { FC, useEffect, useState } from "react"
export interface IToast {
  title?: React.ReactNode;
  content?: React.ReactNode;
  open?: boolean;
  __id?: number;
}
const HToast: FC<IToast> = (props) => {
  const { title, open: propsOpen, content, __id } = props
  const { getCls } = useClsPrefix('toast-wrapper')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(!!propsOpen)
  const timer =  setTimeout(() => {
      setOpen(false)
    }, 4000);
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [propsOpen, __id])
  return <View className={getCls()}>
    {
      open && <View className={getCls('body')}>
        <View>
          {title}
        </View>
        <View>
          {content}
        </View>
      </View>
    }

  </View>
}

export default HToast
