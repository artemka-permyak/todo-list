<template>
  <div class="main-page">
    <div class="main-page-heading">
      <h1 class="main-page-heading__title">Список задач</h1>
      <Button
        label="Создать задачу"
        variant="primary"
        icon="Plus"
        @click="handleClickCreateTaskButton"
      />
    </div>
    <div v-for="task in tasks" :key="task.id" class="wrapper-task-item">
      <div
        :class="{ 'task-item': true, 'task-item--active': task.checked }"
        @click="handleTaskClick(task.id)"
      >
        <div class="task-item-heading">
          <Checkbox
            :id="task.id"
            :name="task.title"
            :checked="task.checked"
            @on-change="handleTaskCheckboxChange"
          />
          <div class="task-item__title">{{ task.title }}</div>
        </div>
        <div class="task-item-details">
          <div v-if="task.subtasks && task.subtasks.length">
            {{ getActiveSubtask(task.subtasks) }} / {{ task.subtasks.length }}
          </div>
          <div @click="handleEditTaskButtonClick($event, task.id)">
            <Icon name="Edit" :size="14" class="task-item-details__edit-icon" />
          </div>
          <div @click="handleDeleteTaskButtonClick($event, task.id)">
            <Icon
              name="Trash"
              :size="14"
              class="task-item-details__trash-icon"
            />
          </div>
        </div>
      </div>
      <div
        v-if="task.subtasks"
        :class="{
          'task-item-subtasks': true,
          'task-item-subtasks--active': getShowSubtasks(task.id),
        }"
      >
        <div
          v-for="subtask in task.subtasks"
          :key="subtask.id"
          :class="{
            'task-item-subtask': true,
            'task-item-subtask--active': subtask.checked,
          }"
        >
          <Checkbox
            :id="subtask.id"
            :name="subtask.title"
            :checked="subtask.checked"
            @on-change="handleCheckboxSubtaskChange($event, task.id)"
          />
          <div class="task-item-subtask__title">{{ subtask.title }}</div>
        </div>
      </div>
    </div>
    <div v-if="!tasks.length">Нет задач</div>
    <Modal
      v-model="showCreateModal"
      title="Создание задачи"
      size="medium"
      @confirm="createTask(newTaskForm)"
      :confirm-disabled="!newTaskForm.title"
      confirm-text="Создать"
    >
      <TaskForm :form="newTaskForm" @change="handleNewTaskFormChange" />
    </Modal>
    <DeleteTaskModal v-model="showDeleteModal" :id="deletedTaskId" />
  </div>
</template>

<script setup lang="ts">
import { useDefaultStore } from '@/shared/model/store/store'
import { Checkbox, CheckboxOnChange, Icon, Button, Modal } from '@/shared/ui'
import { SubtaskItem, TaskItem } from '@/shared/model/task'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { routes } from '@/shared/lib/routes'
import { TaskForm } from '@/widget/task-form'
import { getDefaultSubtask } from '@/shared/model/store/store-helpers'
import { DeleteTaskModal } from '@/widget/delete-task-modal'

const { getTasks: tasks, updateTask, setTask } = useDefaultStore()
const router = useRouter()
const showSubtasksTasksIds = ref([])
const showCreateModal = ref(false)
const newTaskForm = ref<TaskItem>(getDefaultNewTaskForm())
const showDeleteModal = ref(false)
const deletedTaskId = ref('')

watch(
  tasks,
  (newValue) => {
    localStorage.setItem('tasks', JSON.stringify(newValue))
  },
  {
    deep: true,
    immediate: true,
  },
)
function getDefaultNewTaskForm() {
  return {
    ...getDefaultSubtask(),
    subtasks: [getDefaultSubtask()],
  }
}

function createTask(task: TaskItem) {
  const filteredSubtask = (task.subtasks || []).filter(
    (subtask) => subtask.title,
  )
  setTask({
    ...task,
    subtasks: filteredSubtask,
  })
  showCreateModal.value = false
  newTaskForm.value = getDefaultNewTaskForm()
}

function handleNewTaskFormChange(form: TaskItem) {
  newTaskForm.value = form
}

function handleEditTaskButtonClick(event: Event, id: string) {
  event.stopPropagation()
  router.push(routes.main + id)
}

function handleDeleteTaskButtonClick(event: Event, id: string) {
  event.stopPropagation()
  showDeleteModal.value = true
  deletedTaskId.value = id
}

function handleTaskCheckboxChange({ event, id, checked }: CheckboxOnChange) {
  event.stopPropagation()
  updateTask(id, 'checked', checked)
}

function handleCheckboxSubtaskChange(
  { id, checked }: CheckboxOnChange,
  taskId: string,
) {
  const task = tasks.find((task) => task.id === taskId)
  const index = task?.subtasks?.findIndex((subtask) => subtask.id === id)
  if (index === -1) return
  updateTask(taskId, `subtasks[${index}].checked`, checked)
}

function handleTaskClick(id: string) {
  const ids = showSubtasksTasksIds.value
  if (ids.includes(id)) {
    ids.splice(ids.indexOf(id), 1)
  } else {
    ids.push(id)
  }
}

function handleClickCreateTaskButton() {
  showCreateModal.value = true
}

function getActiveSubtask(subtasks: SubtaskItem[]) {
  return subtasks.reduce((total, current) => {
    if (current.checked) total += 1
    return total
  }, 0)
}

function getShowSubtasks(id: string) {
  return showSubtasksTasksIds.value.includes(id)
}
</script>

<style scoped lang="scss">
.main-page {
  &-heading {
    display: flex;
    align-items: center;

    &__title {
      flex-grow: 1;
    }
  }

  .wrapper-task-item {
    &:nth-child(n + 1) {
      padding-top: 12px;
    }

    .task-item {
      width: 100%;
      height: auto;
      display: flex;
      padding: 10px;
      border: 1px solid $gray_200;
      border-radius: 8px;
      cursor: pointer;

      &--active {
        background: $green_bg;
      }

      &-heading {
        display: flex;
        align-items: center;
        flex-grow: 1;
      }

      &-details {
        display: flex;
        align-items: center;
        gap: 10px;

        &__edit-icon {
          color: $blue;
        }

        &__trash-icon {
          color: $red;
        }
      }

      &__title {
        padding-left: 10px;
      }
    }

    .task-item-subtasks {
      height: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-left: 20px;
      overflow: hidden;

      &--active {
        height: 100%;
        padding-top: 12px;
      }

      .task-item-subtask {
        display: flex;
        align-items: center;
        padding: 10px;
        border: 1px solid $gray_200;
        border-radius: 8px;

        &--active {
          background: $green_bg;
        }

        &__title {
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
