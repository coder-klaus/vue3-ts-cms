export interface Category {
  id: number
  name: string
  goodsCount: number
}

export interface Favor {
  id: number
  name: string
  goodsFavor: number
}

export interface Address {
  address: string
  count: number
}

export interface LineData {
  xAxis: string[]
  data: number[]
}

export interface BarData {
  dataAxis: string[]
  data: number[]
}
