import api from '../utils/api'

export function userLogin<T, R>(account: T) {
  return api.post<T, R>('/login', account)
}

export function getUserInfo<R>(id: number) {
  return api.get<R>(`/users/${id}`)
}

export function getMenu<R>(id: number) {
  return api.get<R>(`/role/${id}/menu`)
}
