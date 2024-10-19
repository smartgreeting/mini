/*
 * @Author: lihuan
 * @Date: 2024-07-10 22:07:02
 * @LastEditors: lihuan
 * @LastEditTime: 2024-10-19 11:37:56
 * @Email: 17719495105@163.com
 */
import { FileDownload } from '@/utils/downlaodFile'
import { Video, View } from '@tarojs/components'


const Index = () => {
  const down =  new FileDownload()
  return <>
    <Video src='' />


    <View onClick={()=> down.run('')}>

      下载
    </View>

  </>

}
export default Index
