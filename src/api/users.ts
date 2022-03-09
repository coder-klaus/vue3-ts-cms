import api from '../utils/api'
import { IResponseType } from '/src/types'

// hard code
export function getUsers<T = unknown, R>(query: T) {
  return api.post<T, IResponseType<R>>('users/list', query)
}
