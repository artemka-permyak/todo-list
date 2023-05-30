<template>
  <div class="edit-page">
    <h1 class="edit-page__title">Редактирование задачи</h1>
    <div v-if="currentTask">
      <Modal
        v-model="showCancelModal"
        title="Отмена редактирования"
        size="small"
        @confirm="cancelEdit"
        confirm-text="Отменить"
      >
        Подтвердите отмену редактирования
      </Modal>
      <DeleteTaskModal v-model="showDeleteModal" :id="currentTask.id" />
      <div class="edit-page__cancel-updates">
        <Button
          label="Отменить изменение"
          variant="secondary"
          @click="cancelUpdate"
        />
        <!--        :disabled="currentFormIndex === 0 || forms.length < 2-->
        <Button
          label="Повторить отмененное изменение"
          variant="secondary"
          @click="repeatCancelUpdate"
        />
        <!--        :disabled="forms.length < 2"-->
      </div>
      <TaskForm
        :form="currentTask"
        @change="handleEditFormChange"
        @subtask-checkbox-change="handleSubtaskCheckboxChange"
        @task-checkbox-change="handleTaskCheckboxChange"
        show-cancel-updates
        status
      />
      <div class="edit-page__controls">
        <Button
          label="Удалить"
          variant="primary"
          @click="handleDeleteTaskButtonClick"
        />
        <Button
          label="Отменить"
          variant="secondary"
          @click="handleCancelEditClickButton"
        />
        <Button
          label="Сохранить"
          variant="primary"
          :disabled="!currentTask.title"
          @click="updateTask(currentTask)"
        />
      </div>
    </div>
    <div v-else>Задача не найдена</div>
  </div>
</template>

<script setup lang="ts">
import { useDefaultStore } from '@/shared/model/store/store'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { TaskItem } from '@/shared/model/task'
import { TaskForm } from '@/widget/task-form'
import Button from '@/shared/ui/button/button.vue'
import { routes } from '@/shared/lib/routes'
import { CheckboxOnChange, Modal } from '@/shared/ui'
import { DeleteTaskModal } from '@/widget/delete-task-modal'
import { cloneDeep } from 'lodash'

const route = useRoute()
const router = useRouter()
const { getTasks: tasks, replaceTask } = useDefaultStore()
const currentTask = ref<TaskItem | null>(null)
const showCancelModal = ref(false)
const showDeleteModal = ref(false)
const previousCurrentTasks = ref<TaskItem[]>([])
const currentTaskIndex = ref(-1)
const MAX_COUNT_CANCEL = 2

onMounted(() => {
  const id = route.params.id
  const task = tasks.find((task) => task.id === id) || null
  currentTask.value = cloneDeep(task)
})

function setPreviousCurrentTask(task: TaskItem) {
  if (currentTask.value) {
    previousCurrentTasks.value.pop()
    if (previousCurrentTasks.value.length === MAX_COUNT_CANCEL) {
      previousCurrentTasks.value.shift()
    }
    previousCurrentTasks.value.push(task)
    previousCurrentTasks.value.push(currentTask.value as TaskItem)
    currentTaskIndex.value = previousCurrentTasks.value.length - 1
  }
}

function handleEditFormChange(task: TaskItem, oldTask: TaskItem) {
  currentTask.value = task
  setPreviousCurrentTask(oldTask)
}

function updateTask(task: TaskItem) {
  const filteredSubtask = (task.subtasks || []).filter(
    (subtask) => subtask.title,
  )
  replaceTask({
    ...task,
    subtasks: filteredSubtask,
  })
  router.push(routes.main)
}

function handleTaskCheckboxChange({ checked }: CheckboxOnChange) {
  if ('checked' in currentTask.value) {
    setPreviousCurrentTask(cloneDeep(currentTask.value))
    currentTask.value.checked = checked
    currentTask.value.subtasks = (currentTask.value?.subtasks || []).map(
      (subtask) => {
        subtask.checked = checked
        return subtask
      },
    )
  }
}

function handleSubtaskCheckboxChange({ id, checked }: CheckboxOnChange) {
  if (currentTask.value) {
    if ('subtasks' in currentTask.value) {
      setPreviousCurrentTask(cloneDeep(currentTask.value))
      currentTask.value.subtasks = currentTask.value?.subtasks?.map(
        (subtask) => {
          if (subtask.id === id) {
            subtask.checked = checked
          }
          return subtask
        },
      )
      currentTask.value.checked = (currentTask.value?.subtasks || []).every(
        (subtask) => subtask.checked,
      )
    }
  }
}

function handleCancelEditClickButton() {
  showCancelModal.value = true
}

function cancelEdit() {
  router.push(routes.main)
}

function handleDeleteTaskButtonClick() {
  showDeleteModal.value = true
}

function cancelUpdate() {
  if (currentTaskIndex.value === 0 || currentTaskIndex.value === -1) return
  currentTaskIndex.value -= 1
  currentTask.value = previousCurrentTasks.value[currentTaskIndex.value]
}

function repeatCancelUpdate() {
  if (currentTaskIndex.value === previousCurrentTasks.value.length - 1) return
  currentTaskIndex.value += 1
  currentTask.value = previousCurrentTasks.value[currentTaskIndex.value]
}
</script>

<style scoped lang="scss">
.edit-page {
  &__title {
    padding-bottom: 12px;
  }

  &__controls {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 12px;
    gap: 12px;
  }

  &__cancel-updates {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
