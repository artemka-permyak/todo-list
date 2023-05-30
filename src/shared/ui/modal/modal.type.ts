export type ModalProps = {
  modelValue?: boolean
  title: string
  size?: 'small' | 'medium' | 'large'
  confirmText?: string
  confirmDisabled?: boolean
  cancelText?: string
}

export type ModalEmits = {
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'closed'): void
}
