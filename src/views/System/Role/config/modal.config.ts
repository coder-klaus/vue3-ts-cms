import { Config } from '/src/components/Form/types'

type Fields = 'name' | 'intro'

export const formItems: Config<Record<Fields, never>>[] = [
  {
    field: 'name',
    type: 'input',
    label: '角色名',
    placeholder: '请输入角色名'
  },
  {
    field: 'intro',
    type: 'input',
    label: '角色介绍',
    placeholder: '请输入角色介绍'
  }
]

export const modalConfig = {
  title: '新增用户',
  width: '500px',
  formConfig: {
    configs: formItems,
    labelWidth: '100px',
    colLayout: {
      span: 24
    }
  }
}
