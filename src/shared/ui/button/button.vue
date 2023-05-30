<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { ButtonEmits, ButtonProps } from '@/shared/ui/button/button.type'
import Icon from '@/shared/ui/icons/icon.vue'

const props = defineProps<ButtonProps>()
const emits = defineEmits<ButtonEmits>()
</script>

<template>
  <div class="button-wrapper">
    <button
      :class="{
        button: true,
        'button--primary': props.variant === 'primary',
        'button--secondary': props.variant === 'secondary',
        'button--disabled': !!props.disabled,
      }"
      @click="emits('click')"
      :disabled="props.disabled"
    >
      <div v-if="props.icon" class="button__icon-wrapper">
        <Icon :name="props.icon" :size="12" />
      </div>
      {{ props.label }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.button-wrapper {
  .button {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 100px;
    cursor: pointer;

    &--primary {
      color: $white;
      background: $blue;
    }

    &--secondary {
      background: $white;
      border: 1px solid $blue;
    }

    &--disabled {
      background: $gray_400;
      cursor: not-allowed;
    }

    &__icon-wrapper {
      padding-right: 8px;
    }
  }
}
</style>
