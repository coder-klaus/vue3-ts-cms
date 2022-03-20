import api from '../utils/api'
import { IResponseType } from '/src/types'

export function getList<T = unknown, R = unknown>(field: string, query: T) {
  return api.post<T, IResponseType<R>>(`${field}/list`, query)
}

export function delPageData<R = unknown>(url: string) {
  return api.delete<IResponseType<R>>(url)
}

export function patchPageData<T = unknown, R = unknown>(url: string, data: T) {
  return api.patch<T, IResponseType<R>>(url, data)
}

export function createPageData<T = unknown, R = unknown>(url: string, query: T) {
  return api.post<T, IResponseType<R>>(url, query)
}
