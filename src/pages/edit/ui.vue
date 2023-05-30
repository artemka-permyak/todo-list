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
import { onMounted, ref } from 'vue'
import { TaskItem } from '@/shared/model/task'
import { TaskForm } from '@/widget/task-form'
import Button from '@/shared/ui/button/button.vue'
import { routes } from '@/shared/lib/routes'
import { CheckboxOnChange, Modal } from '@/shared/ui'
import { DeleteTaskModal } from '@/widget/delete-task-modal'

const route = useRoute()
const router = useRouter()
const { getTasks: tasks, replaceTask } = useDefaultStore()
const currentTask = ref<TaskItem | null>(null)
const showCancelModal = ref(false)
const showDeleteModal = ref(false)

onMounted(() => {
  const id = route.params.id
  const task = tasks.find((task) => task.id === id) || null
  currentTask.value = task
})

function handleEditFormChange(task: TaskItem) {
  currentTask.value = task
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
    currentTask.value.checked = checked
  }
}

function handleSubtaskCheckboxChange({ id, checked }: CheckboxOnChange) {
  if (currentTask.value) {
    if ('subtasks' in currentTask.value) {
      currentTask.value.subtasks = currentTask.value?.subtasks?.map(
        (subtask) => {
          if (subtask.id === id) {
            subtask.checked = checked
          }
          return subtask
        },
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
}
</style>
