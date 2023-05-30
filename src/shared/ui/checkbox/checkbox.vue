<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Icon from '@/shared/ui/icons/icon.vue'
import {
  CheckboxEmits,
  CheckboxOnChange,
  CheckboxProps,
} from '@/shared/ui/checkbox/checkbox.type'

const props = defineProps<CheckboxProps>()
const emits = defineEmits<CheckboxEmits>()

function handleChangeChecked({ id, checked, event }: CheckboxOnChange) {
  emits('onChange', { id, checked, event })
}
</script>

<template>
  <div class="checkbox-wrapper">
    <input
      :checked="props.checked"
      type="checkbox"
      :name="props.name"
      :id="props.id"
      @change="
        handleChangeChecked({
          checked: $event.target.checked,
          id: props.id,
          event: $event,
        })
      "
      class="checkbox-input"
    />
    <div
      :class="{
        checkbox: true,
        'checkbox--active': props.checked,
        'checkbox--non-active': !props.checked,
      }"
      @click="
        handleChangeChecked({
          checked: !props.checked,
          id: props.id,
          event: $event,
        })
      "
    >
      <Icon
        v-if="props.checked"
        name="Check"
        :size="7"
        class="checkbox__icon"
      />
    </div>
  </div>
</template>

<style lang="scss">
.checkbox-wrapper {
  display: flex;
  align-items: center;

  .checkbox-input {
    display: none !important;
  }

  .checkbox {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    user-select: none;
    cursor: pointer;
    background: $white;
    border-radius: 4px;

    &--active {
      &::before {
        scale: 1;
        opacity: 1;
      }
      border: none;
    }

    &--non-active {
      &::before {
        scale: 0;
        opacity: 0;
      }
      border: 1px solid $gray_400;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: $green;
      border-radius: 4px;
      transition: all 0.175s;
    }

    &__icon {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $white;
    }
  }
}
</style>
