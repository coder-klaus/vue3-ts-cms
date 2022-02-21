import axios from 'axios'
import { ElLoading } from 'element-plus'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import type { Config } from './type'

import 'element-plus/theme-chalk/el-loading.css'

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

    this.registerGlobalInterceptor()
  }

  registerGlobalInterceptor() {
    this.instance.interceptors.request.use((config: Config) => {
      if (config?.showLoading ?? true) {
        this.loading =  ElLoading.service({
          lock: true,
          text: 'Loading...',
          background: 'rgba(0, 0, 0, 0.7)',
        })
      }

      return config
    }, err => err)

    this.instance.interceptors.response.use(res => {
      this.loading?.close()

      return res.data
    }, err => {
      this.loading?.close()
      return err
    })
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }
}
