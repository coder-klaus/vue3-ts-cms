import { FormConfig, Config } from '/src/components/SearchBar/types'

export const configs: Config[] = [
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
    type: 'select',
    label: '喜欢的运动',
    placeholder: '请选择喜欢的运动',
    options: [
      { label: '篮球', value: 'basketball' },
      { label: '足球', value: 'football' }
    ],
    field: 'sport'
  },

  {
    type: 'datepicker',
    label: '创建时间',
    otherOptions: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'daterange'
    },
    field: 'createTime'
  }
]

export const formConfig: FormConfig = {
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
