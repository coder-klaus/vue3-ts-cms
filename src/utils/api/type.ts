import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface Interceptor {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  requestInterceptorCatch?: (err: unknown) => unknown
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
  responseInterceptorCatch?: (err: unknown) => unknown
}

export interface Config extends AxiosRequestConfig {
  interceptor?: Interceptor
  showLoading?: boolean
}
