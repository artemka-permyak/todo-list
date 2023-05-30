import { ModalProps } from '@/shared/ui/modal/modal.type'

export type DeleteTaskModalProps = Pick<ModalProps, 'modelValue'> & {
  id: string
}
export type DeleteTaskModalEmits = {
  (e: 'update:model-value', value: boolean): void
}
