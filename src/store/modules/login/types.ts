export interface IAccount {
  name: string
  password: string
}

export interface ILoginType {
  id: number
  name: string
  token: string
}

interface Role {
  id: number
  name: string
  intro: string
  createAt: Date
  updateAt: Date
}

interface Department {
  id: number
  name: string
  parentId: number
  createAt: Date
  updateAt: Date
  leader: string
}

export interface IUserInfo {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: Date
  updateAt: Date
  role: Role
  department: Department
}
