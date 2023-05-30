<template>
  <div class="update-task">
    <div class="update-task__name">
      <Checkbox
        v-if="props.status"
        :id="props.form.id"
        :name="props.form.title"
        :checked="props.form.checked"
        @on-change="handleTaskCheckboxChange"
      />
      <Input
        :model-value="props.form.title"
        placeholder="Укажите название"
        :id="props.form.id"
        @update:model-value="handleUpdateFormTitle"
      />
    </div>
    <div class="update-task-subtasks">
      <div class="update-task-subtasks__heading">
        <h4 class="update-task-subtasks__title">Подзадачи</h4>
        <div @click="addSubtaskTaskForm">
          <Icon
            name="Plus"
            :size="12"
            class="update-task-subtasks__plus-icon"
          />
        </div>
      </div>
      <div
        class="update-task-subtask"
        v-for="(subtask, index) in props.form.subtasks"
        :key="subtask.id"
      >
        <Checkbox
          v-if="props.status"
          :id="subtask.id"
          :name="subtask.title"
          :checked="subtask.checked"
          @on-change="handleCheckboxSubtaskChange($event, props.form.id)"
        />
        <Input
          :model-value="subtask.title"
          placeholder="Укажите название"
          :id="subtask.id"
          @update:model-value="handleUpdateFormSubtaskTitle($event, subtask.id)"
        />
        <div
          v-if="props.form.subtasks?.length > 1"
          @click="deleteSubtaskTaskForm(index)"
        >
          <Icon
            name="Trash"
            :size="16"
            class="update-task-subtask__trash-icon"
          />
        </div>
      </div>
      <div v-if="!props.form.subtasks">Нет подзадач</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Checkbox, CheckboxOnChange, Icon, Input } from '@/shared/ui'
import { TaskFormEmits, TaskFormProps } from '@/widget/task-form/types'
import { cloneDeep } from 'lodash'
import { getDefaultSubtask } from '@/shared/model/store/store-helpers'

const props = defineProps<TaskFormProps>()
const emits = defineEmits<TaskFormEmits>()

function addSubtaskTaskForm() {
  emits(
    'change',
    {
      ...props.form,
      subtasks: [...props.form.subtasks, getDefaultSubtask()],
    },
    props.form,
  )
}

function deleteSubtaskTaskForm(index: number) {
  const subtasks = cloneDeep(props.form.subtasks)
  subtasks && subtasks.splice(index, 1)
  emits(
    'change',
    {
      ...props.form,
      subtasks,
    },
    props.form,
  )
}

function handleUpdateFormTitle(title: string) {
  emits('change', { ...props.form, title }, props.form)
}

function handleUpdateFormSubtaskTitle(title: string, id: string) {
  const subtasks = cloneDeep(props.form.subtasks || []).map((subtask) => {
    if (subtask.id === id) subtask.title = title
    return subtask
  })
  emits('change', { ...props.form, subtasks }, props.form)
}

function handleTaskCheckboxChange(params: CheckboxOnChange) {
  emits('task-checkbox-change', params)
}

function handleCheckboxSubtaskChange(params: CheckboxOnChange, taskId: string) {
  emits('subtask-checkbox-change', params, taskId)
}
</script>

<style scoped lang="scss">
.update-task {
  &__name {
    padding-top: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &-subtasks {
    &__heading {
      display: flex;
      align-items: center;
      padding-top: 20px;
    }

    &__title {
      padding-right: 10px;
    }

    &__plus-icon {
      cursor: pointer;
    }
  }

  &-subtask {
    display: flex;
    align-items: center;
    padding-top: 10px;
    gap: 10px;

    &__trash-icon {
      color: $red;
      cursor: pointer;
    }
  }
}
</style>
