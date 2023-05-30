export type CheckboxProps = {
  name: string
  checked: boolean
  id: string
}

export type CheckboxEmits = {
  (e: 'onChange', params: CheckboxOnChange): void
}

export type CheckboxOnChange = Pick<CheckboxProps, 'id' | 'checked'> & {
  event: Event
}
