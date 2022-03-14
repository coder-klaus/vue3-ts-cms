import { ITableConfig } from '/src/components/Table/types'

export const tableConfig: ITableConfig = {
  data: [
    { prop: 'id', label: '菜单ID', width: '120' },
    { prop: 'name', label: '菜单名' },
    { prop: 'type', label: '菜单层级', slotName: 'type' },
    { prop: 'permission', label: '权限', slotName: 'permission' },
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

  handler: {
    label: '操作',
    slotName: 'handler',
    width: '200'
  },

  expand: {
    'row-key': 'id',
    'tree-props': {
      children: 'children'
    }
  }
}
