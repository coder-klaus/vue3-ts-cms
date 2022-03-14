export interface IResponseType<T> {
  code: number
  data: T
}

export interface IMenu {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  permission: string
  children?: IMenu[]
}

export interface IFetch {
  offset: number
  size: number
}
