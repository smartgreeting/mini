/*
 * @Author: lihuan
 * @Date: 2024-08-07 20:58:28
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-22 21:22:57
 * @Email: 17719495105@163.com
 */
import { ProxyTaro } from "./proxyTaro"
import { delay } from ".";
import { h } from "@/utils/h";
export const storageTokenKey = '__storageTokenKey__'

interface IOnReadly {
  stop: () => void;
}
interface IOptions {
  onReadly?: (opt: IOnReadly) => void;
  toast?: boolean;
  successToast?: boolean;
  errorToast?: boolean;
  bool?: boolean;
  loading?: boolean;
}
interface IReqData {
  params?: Record<string, any>;
  method?: keyof Taro.request.Method
};

const baseUrl = process.env.TARO_APP_BASE_URL

export const request = async <T = any>(url?: string, data: IReqData = {}, options: IOptions = {}) => {
  const { params, method = 'POST' } = data
  const { onReadly, toast = true, successToast = true, errorToast = true, bool = false, loading = true, } = options
  const { token } = ProxyTaro.getStorageSync(storageTokenKey)
  const promise = ProxyTaro.request({ url: `${baseUrl}${url}`, data: params, method, header: { Authorization: `Bearer ${token}` } })

  if (onReadly) {
    onReadly({
      stop: () => {
        promise.abort()
      }
    })
  }
  if (loading) {
    // ProxyTaro.showLoading({ title: '加载中' })
    // await delay(3000)
  }
  const res = await promise
  // 防止请求过快 loading闪屏
  if (loading) {
    ProxyTaro.HToast({title: h('text', { style: { color: '#fff' } }, 'loading')})
    await delay(3000)
  }
  if (res.statusCode === 200) {
    const { code, data, msg } = res.data
    ProxyTaro.HToast({title: h('text', { style: { color: 'blue' } }, '31313')})

    if (toast) {
      if (successToast && code === 2000) {
        // ProxyTaro.showToast({
        //   title: msg,
        //   icon: 'success',
        //   duration: 2000,
        // })
      } else if (errorToast && code !== 2000) {
        ProxyTaro.showToast({
          title: msg,
          icon: 'error',
          duration: 2000
        })
      }

    }
    if (bool) {
      return code === 2000
    }
    return data as Promise<T>
  }
}
