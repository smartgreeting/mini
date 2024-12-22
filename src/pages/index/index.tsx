/*
 * @Author: lihuan
 * @Date: 2024-07-10 22:07:02
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-21 12:35:03
 * @Email: 17719495105@163.com
 */

import PageWrapper from "@/components/page-wrapper"
import { useClsPrefix } from "@/utils/styles"
import { View, Text } from "@tarojs/components"
import './index.scss'
import { getCurrentPages } from "@tarojs/taro"

const Index = () => {
  const { getCls } = useClsPrefix('index-wrapper')
  const handleClick = (index: number) => {
    getCurrentPages()
  }
  return <PageWrapper customNavBarProps={{ title: <Text style={{ color: '#fff' }}>自定义NavBar</Text> }} renderFooter={<><View>Footer</View></>}>
    <View className={getCls()}>
      {/* {Array.from({ length: 10 }).map((_, index) => <View key={index} onClick={()=> handleClick(index)}>PageWrapper : {index}</View>)} */}
    </View>

  </PageWrapper>

}
export default Index
