import { FormConfig, Config } from '/src/components/SearchBar/types'
import { IUser } from '../types'

export const configs: Config<IUser>[] = [
  {
    type: 'input',
    label: '用户id',
    placeholder: '请输入id',
    field: 'id'
  },

  {
    type: 'input',
    label: '用户名',
    placeholder: '请输入用户名',
    field: 'name'
  },

  {
    type: 'input',
    label: '手机号',
    placeholder: '请输入手机号',
    field: 'cellphone'
  },

  {
    type: 'select',
    label: '是否启用',
    options: [
      { value: '1', label: '启用' },
      { value: '0', label: '禁用' }
    ],
    field: 'enable'
  }

  // {
  //   type: 'datepicker',
  //   label: '创建时间',
  //   otherOptions: {
  //     startPlaceholder: '开始时间',
  //     endPlaceholder: '结束时间',
  //     type: 'daterange'
  //   },
  //   field: 'createAt'
  // }
]

export const formConfig: FormConfig<IUser> = {
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
