import { FormConfig } from '/src/components/Form/types'

export interface Config<T = Record<string, never>> {
  width?: string
  formConfig: FormConfig<T>
}
