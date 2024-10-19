
/*
 * @Author: lihuan
 * @Date: 2024-08-05 20:24:58
 * @LastEditors: lihuan
 * @LastEditTime: 2024-09-26 21:09:14
 * @Email: 17719495105@163.com
 */

import { navigateTo } from "@/utils/navigate"
import { View } from "@tarojs/components"



const Home = () => {
  const na = (url:string) => {
    navigateTo({url})
  }
  console.log('Home')
  return <>
    1123
    <View onClick={()=> na('/pages/sub-pages/aa/index')}>index</View>
  </>
}


export default Home
