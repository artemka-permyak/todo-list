<script setup lang="ts">
import { Modal } from '@/shared/ui'
import { defineProps, defineEmits } from 'vue'
import {
  DeleteTaskModalEmits,
  DeleteTaskModalProps,
} from '@/widget/delete-task-modal/types'
import { useDefaultStore } from '@/shared/model/store/store'
import { useRouter } from 'vue-router'
import { routes } from '@/shared/lib/routes'

const props = defineProps<DeleteTaskModalProps>()
const emits = defineEmits<DeleteTaskModalEmits>()
const { deleteTask: deleteTaskStore } = useDefaultStore()
const router = useRouter()

function deleteTask(id: string) {
  deleteTaskStore(id)
  emits('update:model-value', false)
  router.push(routes.main)
}
</script>

<template>
  <Modal
    :model-value="props.modelValue"
    @update:model-value="emits('update:model-value', $event)"
    title="Удаление задачи"
    size="small"
    @confirm="deleteTask(props.id)"
    confirm-text="Удалить"
  >
    Подтвердите удаление задачи
  </Modal>
</template>

<style scoped lang="scss"></style>
