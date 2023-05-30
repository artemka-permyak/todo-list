import { TaskItem } from '@/shared/model/task'
import { CheckboxOnChange } from '@/shared/ui'

export type TaskFormProps = {
  form: TaskItem
  status?: boolean
  showCancelUpdates?: boolean
}

export type TaskFormEmits = {
  (e: 'change', form: TaskItem): void
  (e: 'task-checkbox-change', params: CheckboxOnChange): void
  (e: 'subtask-checkbox-change', params: CheckboxOnChange, taskId: string): void
}
