import api from '/src/utils/api'
import { IResponseType } from '/src/types'

import { Category, Favor, Address } from '../views/Analysis/Dashboard/components/Charts/types'

export function getCategoryCount() {
  return api.get<IResponseType<Category[]>>('/goods/category/count')
}

export function getCategorySale() {
  return api.get<IResponseType<Category[]>>('/goods/category/sale')
}

export function getCategoryFavor() {
  return api.get<IResponseType<Favor[]>>('/goods/category/favor')
}

export function getAddressSale() {
  return api.get<IResponseType<Address[]>>('/goods/address/sale')
}
