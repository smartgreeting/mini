/*
 * @Author: lihuan
 * @Date: 2024-07-10 22:07:02
 * @LastEditors: lihuan
 * @LastEditTime: 2024-09-05 22:30:13
 * @Email: 17719495105@163.com
 */
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/home/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
  },
  permission: {
    'scope.phoneNNumber': {
      desc:'获取用户手机号'
    }
  }
})
