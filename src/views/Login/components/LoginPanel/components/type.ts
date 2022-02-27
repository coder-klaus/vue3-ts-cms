interface ValidateError {
  message?: string
  fieldValue?: unknown
  field?: string
}

export type Field = Record<'name' | 'password', ValidateError[]>
