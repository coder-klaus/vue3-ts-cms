import api from '../utils/api'

// Record<K, T> --- 生成一个新的对象类型，键的类型为K, 值的类型为T
// Record<string, never> --- 等价于 空对象
export function login<T, R>(account: T) {
  return api.post<T, R>('/login', account)
}

export function getUserInfo<R>(id: number) {
  return api.get<R>(`/users/${id}`)
}

export function getMenu<R>(id: number) {
  return api.get<R>(`/role/${id}/menu`)
}
