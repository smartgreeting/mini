
/*
 * @Author: lihuan
 * @Date: 2024-08-05 20:24:58
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-14 21:24:59
 * @Email: 17719495105@163.com
 */

import { navigator } from "@/utils/navigator"
import { View } from "@tarojs/components"



const Home = () => {
  const na = (url:string) => {
    navigator({url})
  }
  console.log('Home')
  return <>
    1123
    <View onClick={()=> na('/pages/sub-pages/aa/index')}>index</View>
  </>
}


export default Home
