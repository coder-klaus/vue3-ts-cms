import { IMenu } from '/src/types'

export interface IRole {
  id: string
  name: string
  intro: string
  menuList: IMenu[] | number[]
  createAt: string
  updateAt: string
}
