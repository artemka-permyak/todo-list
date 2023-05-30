<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import { InputEmits, InputProps } from '@/shared/ui/input/input.type'

const props = defineProps<InputProps>()
const emits = defineEmits<InputEmits>()
const isFocus = ref(false)
const labelRef = ref<HTMLLabelElement | null>(null)

watch(
  () => ({
    isFocus: isFocus.value,
    value: props.modelValue,
    label: labelRef.value,
  }),
  ({ value, isFocus, label }) => {
    if (isFocus || value) {
      label?.classList.add('input-label--input-value-exists')
      label?.classList.remove('input-label--input-value-non-exists')
    } else {
      label?.classList.add('input-label--input-value-non-exists')
      label?.classList.remove('input-label--input-value-exists')
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

function handleInput(value: string) {
  emits('update:modelValue', value)
}

function handleFocus() {
  isFocus.value = true
}

function handleBlur() {
  isFocus.value = false
}
</script>

<template>
  <div class="input-wrapper">
    <input
      :value="props.modelValue"
      :id="props.id"
      :type="props.type"
      class="input"
      @input="handleInput($event.currentTarget.value)"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <label
      ref="labelRef"
      class="input-label input-label--input-value-non-exists"
      :for="props.id"
    >
      {{ props.placeholder }}
    </label>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  width: 100%;
  height: 56px;
  position: relative;

  .input-label {
    position: absolute;
    left: 16px;
    transition: all 0.2s;
    color: $gray_400;
    cursor: text;

    &--input-value-exists {
      top: 8px;
      cursor: default;
      transform: translateY(0);
    }

    &--input-value-non-exists {
      top: 50%;
      transform: translateY(-50%);
      cursor: text;
    }
  }

  .input {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    border: 1px solid $gray_200;
    outline: none;
    padding: 26px 16px 6px;
    color: $black;
  }
}
</style>
