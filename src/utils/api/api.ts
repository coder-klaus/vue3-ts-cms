import axios from 'axios'
import { ElLoading } from 'element-plus'
import Cookies from 'js-cookie'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import type { Config } from './type'

import 'element-plus/theme-chalk/el-loading.css'

interface IResponse {
  code: number
  data: unknown
}

export default class {
  instance: AxiosInstance

  loading: LoadingInstance | undefined

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

        if (!this.loading && (customConfig?.showLoading ?? true)) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }

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
        this.loading?.close()

        return res.data
      },
      err => {
        this.loading?.close()
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
}
