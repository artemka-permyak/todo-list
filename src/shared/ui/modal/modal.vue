<template>
  <div
    ref="ModalWrapperRef"
    :class="{
      'modal-wrapper': true,
      'modal-wrapper--active': !!modelValue,
      'modal-wrapper--non-active': !modelValue,
    }"
    @click="handleModalWrapperClick"
  >
    <div
      :class="{
        modal: true,
        'modal--small': props.size === 'small',
        'modal--medium': props.size === 'medium',
        'modal--large': props.size === 'large',
      }"
    >
      <div class="modal-heading">
        <h3 class="modal-heading__title">
          {{ props.title }}
        </h3>
        <div class="modal-heading__close-icon" @click="closeModal">
          <Icon name="Plus" :size="12" />
        </div>
      </div>
      <div v-if="showSlot" class="modal-body">
        <slot />
      </div>
      <div v-if="props.confirmText" class="modal-footer">
        <Button
          :label="props.confirmText"
          variant="primary"
          @click="handleConfirmModal"
          :disabled="props.confirmDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue'
import getDelay from '@/shared/lib/delay'
import { ModalEmits, ModalProps } from '@/shared/ui/modal/modal.type'
import { ANIMATION_DELAY } from '@/shared/ui/modal/lib'
import { Icon, Button } from '@/shared/ui'

const props = defineProps<ModalProps>()
const emits = defineEmits<ModalEmits>()
const ModalWrapperRef = ref<HTMLDivElement | null>(null)
const showSlot = ref(false)
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) showSlot.value = true
    else getDelay(ANIMATION_DELAY).then(() => (showSlot.value = false))
  },
)

function closeModal() {
  emits('update:modelValue', false)
  getDelay(ANIMATION_DELAY).then(() => emits('closed'))
}

function handleConfirmModal() {
  emits('confirm')
}

function handleModalWrapperClick(event: Event) {
  if (event.target instanceof HTMLDivElement) {
    event.target === ModalWrapperRef.value && closeModal()
  }
}
</script>

<style scoped lang="scss">
.modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  transition: all 0.175s;
  background: transparentize($black, 0.5);

  &--active {
    visibility: visible;
    opacity: 1;
  }

  &--non-active {
    visibility: hidden;
    opacity: 0;
  }

  .modal {
    position: relative;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    background: $white;
    border-radius: 12px;
    padding: 16px 24px 24px;
    margin: auto;
    margin-top: 16px;
    max-height: calc(100vh - 33px);

    &--small {
      width: 380px;
    }

    &--medium {
      width: 480px;
    }

    &--large {
      width: 580px;
    }

    &-heading {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      background: $white;
      padding: 0 8px;

      &__title {
        flex-grow: 1;
      }

      &__close-icon {
        rotate: 45deg;
        cursor: pointer;
      }
    }

    &-body {
      flex-grow: 1;
      padding-top: 8px;
      word-break: break-word;
      padding-right: 10px;
    }

    &-footer {
      position: sticky;
      bottom: 0;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 0;
      background: white;
    }
  }
}
</style>
