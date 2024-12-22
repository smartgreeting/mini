/*
 * @Author: lihuan
 * @Date: 2024-07-10 22:07:02
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-21 12:22:47
 * @Email: 17719495105@163.com
 */
import { PropsWithChildren, useEffect } from 'react'
import { PageWrapperProvider, usePageWrapperContextSet } from '@/components/page-wrapper/context'
import { initEventCenter } from '@/utils/events'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useEffect(() => {
    initEventCenter()
  }, [])

  const contextValaue = usePageWrapperContextSet()
  return <PageWrapperProvider value={contextValaue}>{children}</PageWrapperProvider>
}

export default App
