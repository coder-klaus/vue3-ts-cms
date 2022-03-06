type ConfigType = 'input' | 'password' | 'select' | 'datepicker'

type Option = {
  label: string
  value: string
}

export interface Config {
  type: ConfigType
  label: string
  rules?: unknown[]
  placeholder?: string
  options?: Option[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  otherOptions?: any
}

type Layout =
  | {
      span: number
    }
  | {
      xl: number
      lg: number
      md: number
      sm: number
      xs: number
    }

export interface FormConfig {
  configs: Config[]
  labelWidth?: string
  colLayout?: Layout
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemStyle: any
}
