import { Config } from '/src/components/Form/types'

type Fields = 'name' | 'realname' | 'password' | 'cellphone' | 'departmentId' | 'roleId'

export const formItems: Config<Record<Fields, never>>[] = [
  {
    field: 'name',
    type: 'input',
    label: '用户名',
    placeholder: '请输入用户名'
  },
  {
    field: 'realname',
    type: 'input',
    label: '真实姓名',
    placeholder: '请输入真实姓名'
  },
  {
    field: 'password',
    type: 'password',
    label: '用户密码',
    placeholder: '请输入密码'
  },
  {
    field: 'cellphone',
    type: 'input',
    label: '电话号码',
    placeholder: '请输入电话号码'
  },

  {
    field: 'departmentId',
    type: 'select',
    label: '选择部门',
    placeholder: '请选择部门',
    options: []
  },
  {
    field: 'roleId',
    type: 'select',
    label: '选择角色',
    placeholder: '请选择角色',
    options: []
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
