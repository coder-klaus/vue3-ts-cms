export interface IUser {
  id: number | string
  name: string
  realname: string
  cellphone: string
  password: string
  enable: number
  departmentId: number
  roleId: number
  createAt: Date | string
  updateAt: Date | string
}
