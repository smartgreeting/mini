/*
 * @Author: lihuan
 * @Date: 2024-07-10 22:07:02
 * @LastEditors: lihuan
 * @LastEditTime: 2024-08-19 22:48:01
 * @Email: 17719495105@163.com
 */
import Redirect from '@/components/redirect'
import Layout from '@/layout'
import { BrowserRouter } from 'react-router-dom'


const Index = () => {

  return <>
    <BrowserRouter>
      <Layout />
      <Redirect path='home'/>
    </BrowserRouter>
  </>

}
export default Index
