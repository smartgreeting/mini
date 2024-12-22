
/*
 * @Author: lihuan
 * @Date: 2024-12-16 20:41:13
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-22 21:28:23
 * @Email: 17719495105@163.com
 */

import { useClsPrefix } from "@/utils/styles"
import { View } from "@tarojs/components"
import './index.scss'
import { FC, useEffect, useState } from "react"
export interface IModal {
  title?: React.ReactNode;
  content?: React.ReactNode;
  open?: boolean;
}
const HModal: FC<IModal> = (props) => {
  const { title, open: propsOpen, content } = props
  const { getCls } = useClsPrefix('toast-wrapper')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(!!propsOpen)
    setTimeout(() => {
      setOpen(false)
    }, 3000);
  }, [propsOpen])
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

export default HModal
