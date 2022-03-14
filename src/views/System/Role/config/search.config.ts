import { FormConfig, Config } from '/src/components/SearchBar/types'
import { IRole } from '../types'

export const configs: Config<IRole>[] = [
  {
    type: 'input',
    label: '用户id',
    placeholder: '请输入id',
    field: 'id'
  },

  {
    type: 'input',
    label: '角色名',
    placeholder: '请输入角色名',
    field: 'name'
  },

  {
    type: 'input',
    label: '角色介绍',
    placeholder: '请输入角色介绍',
    field: 'intro'
  },

  {
    type: 'datepicker',
    label: '创建时间',
    otherOptions: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'daterange'
    },
    field: 'createAt'
  }
]

export const formConfig: FormConfig<IRole> = {
  configs,
  labelWidth: '100px',

  itemStyle: {
    padding: '10px'
  },

  colLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  }
}
