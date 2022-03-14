import api from '../utils/api'
import { IResponseType } from '/src/types'

export function getList<T = unknown, R = unknown>(field: string, query: T) {
  return api.post<T, IResponseType<R>>(`${field}/list`, query)
}
