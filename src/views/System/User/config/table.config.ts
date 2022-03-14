import { ITableConfig } from '/src/components/Table/types'

export const tableConfig: ITableConfig = {
  data: [
    { prop: 'id', label: '用户ID' },
    { prop: 'name', label: '用户名' },
    { prop: 'realname', label: '真实姓名' },
    { prop: 'cellphone', label: '手机号码' },
    { prop: 'enable', label: '状态', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      width: '180'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      width: '180'
    }
  ],

  showIndex: {
    label: '序号'
  },

  handler: {
    label: '操作',
    slotName: 'handler',
    width: '200'
  }
}
