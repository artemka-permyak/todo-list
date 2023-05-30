import { defineStore } from 'pinia'
import { TaskItem } from '@/shared/model/task'
import { ValueOf } from '@/shared/model/common'
import { cloneDeep, set } from 'lodash'

export type DefaultStoreType = {
  tasks: TaskItem[]
}

export const useDefaultStore = defineStore('default-store', {
  state: (): DefaultStoreType => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || JSON.parse('')) || [],
  }),
  getters: {
    getTasks(): TaskItem[] {
      return this.tasks
    },
  },
  actions: {
    setTask(task: TaskItem) {
      this.tasks.push(cloneDeep(task))
    },
    updateTask(id: string, key: string, value: ValueOf<TaskItem>) {
      const index = this.tasks.findIndex((task) => task.id === id)
      if (index === -1) return
      const updatedTask = set(this.tasks[index], key, value)
      this.tasks.splice(index, 1, updatedTask)
      if (!this.tasks[index].subtasks) return
      if (key === 'checked') {
        if (value) {
          this.updateTask(
            id,
            'subtasks',
            (this.tasks[index].subtasks || []).map((subtask) => {
              subtask.checked = true
              return subtask
            }),
          )
        } else {
          this.updateTask(
            id,
            'subtasks',
            (this.tasks[index].subtasks || []).map((subtask) => {
              subtask.checked = false
              return subtask
            }),
          )
        }
      } else if (key.match(/subtasks[0-9].checked/)) {
        if (
          (this.tasks[index].subtasks || []).every((subtask) => subtask.checked)
        ) {
          this.updateTask(id, `checked`, true)
        } else {
          this.updateTask(id, `checked`, false)
        }
      }
    },
    replaceTask(task: TaskItem) {
      const index = this.tasks.findIndex(({ id }) => id === task.id)
      if (index === -1) return
      this.tasks.splice(index, 1, task)
    },
    deleteTask(id: string) {
      const index = this.tasks.findIndex((task) => task.id === id)
      if (index === -1) return
      this.tasks.splice(index, 1)
    },
  },
})
