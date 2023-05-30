import { v4 } from 'uuid'

export function getDefaultSubtask() {
  return {
    id: v4(),
    title: '',
    checked: false,
  }
}
