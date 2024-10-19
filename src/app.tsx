/*
 * @Author: lihuan
 * @Date: 2024-07-10 22:07:02
 * @LastEditors: lihuan
 * @LastEditTime: 2024-10-19 13:03:19
 * @Email: 17719495105@163.com
 */
import  { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    console.log('App launched.',children)
  })

  // children 是将要会渲染的页面
  return children
}

export default App
