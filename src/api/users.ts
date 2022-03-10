import api from '../utils/api'
import { IResponseType } from '/src/types'

export function getUsers<T = unknown, R = unknown>(query: T) {
  return api.post<T, IResponseType<R>>('users/list', query)
}
