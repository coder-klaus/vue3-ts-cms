import axios from 'axios'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { Config } from './type'

import 'nprogress/nprogress.css'

interface IResponse {
  code: number
  data: unknown
}

NProgress.configure({ showSpinner: false })

export default class {
  instance: AxiosInstance

  constructor(config: Config) {
    this.instance = axios.create(config)

    if (config.interceptor) {
      const { interceptor } = config
      this.instance.interceptors.request.use(interceptor.requestInterceptor, interceptor.requestInterceptorCatch)
      this.instance.interceptors.response.use(interceptor.responseInterceptor, interceptor.responseInterceptorCatch)
    }

    this.#registerGlobalInterceptor()
  }

  #registerGlobalInterceptor() {
    this.instance.interceptors.request.use(
      (config: Config) => {
        const customConfig = { ...config }

        NProgress.start()

        const token = Cookies.get('token')

        if (token) {
          customConfig.headers = { ...config.headers, Authorization: `Bearer ${token}` }
        }

        return customConfig
      },
      err => err
    )

    this.instance.interceptors.response.use(
      res => {
        NProgress.done()

        return res.data
      },
      err => {
        NProgress.done()
        return err
      }
    )
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }

  get<R = IResponse>(url: string, config: AxiosRequestConfig = {}) {
    return this.instance.get<unknown, R>(url, config)
  }

  post<T = unknown, R = IResponse>(url: string, data: T, config: AxiosRequestConfig = {}) {
    return this.instance.post<unknown, R>(url, data, config)
  }

  delete<R = IResponse>(url: string) {
    return this.instance.delete<unknown, R>(url)
  }

  patch<T = unknown, R = IResponse>(url: string, data: T) {
    return this.instance.patch<unknown, R>(url, data)
  }
}
