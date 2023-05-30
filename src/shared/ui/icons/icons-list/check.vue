<script setup lang="ts">
import { defineProps } from 'vue'
import { IconProps } from '@/shared/ui/icons'

const props = defineProps<IconProps>()
</script>

<template>
  <div :class="props.className">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      fill="none"
      viewBox="0 0 8 6"
    >
      <path
        fill="currentColor"
        d="M1.695 2.28A1 1 0 00.28 3.696l2 2a1 1 0 001.414 0l4-4A1 1 0 006.28.28L2.988 3.574 1.695 2.28z"
      ></path>
    </svg>
  </div>
</template>
