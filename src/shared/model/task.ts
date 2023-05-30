export interface TaskItem {
  id: string
  title: string
  checked: boolean
  subtasks?: SubtaskItem[]
}

export type SubtaskItem = Omit<TaskItem, 'subtasks'>
