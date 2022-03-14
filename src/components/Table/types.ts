interface ITableRowConfig {
  prop: string
  label: string
  width?: string
  slotName?: string
  align?: 'left' | 'center' | 'right'
}
interface IRowExpand {
  'row-key': string
  'tree-props': {
    children: string
  }
}

export interface ITableConfig {
  data: ITableRowConfig[]

  showIndex?: {
    label: string
    width?: string
    align?: 'left' | 'center' | 'right'
  }

  handler?: Omit<ITableRowConfig, 'prop' | 'slotName'> & { slotName: string }

  expand?: IRowExpand
}
