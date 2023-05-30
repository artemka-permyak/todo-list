import { IconName } from '@/shared/ui/icons'

export type ButtonProps = {
  label: string
  variant: 'secondary' | 'primary'
  icon?: IconName
  disabled?: boolean
}

export type ButtonEmits = {
  (e: 'click'): void
}
