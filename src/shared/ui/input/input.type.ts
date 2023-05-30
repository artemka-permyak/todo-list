export type InputProps = {
  id: string
  placeholder: string
  modelValue?: string
  type?: 'text' | 'number'
}

export type InputEmits = {
  (e: 'update:modelValue', value: string): void
}
