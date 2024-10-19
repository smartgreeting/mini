/*
 * @Author: lihuan
 * @Date: 2024-07-10 22:07:02
 * @LastEditors: lihuan
 * @LastEditTime: 2024-09-26 21:16:02
 * @Email: 17719495105@163.com
 */
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/home/index',
    'pages/shop-center/index',
  ],
  subPackages: [{
    name: 'sub-pages0',
    root: 'pages/sub-pages',
    pages: ['aa/index'],

  }],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
  },
  permission: {

  },
  // lazyCodeLoading:'requiredComponents'
})
