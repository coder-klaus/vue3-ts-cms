import { ITableConfig } from '/src/components/Table/types'

export const tableConfig: ITableConfig = {
  data: [
    { prop: 'name', label: '角色名' },
    { prop: 'intro', label: '角色介绍' },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'updateAt',
      label: '更新时间'
    }
  ],

  showIndex: {
    label: '序号'
  },

  handler: {
    label: '操作',
    slotName: 'handler'
  }
}
