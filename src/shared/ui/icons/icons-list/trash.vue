<script setup lang="ts">
import { defineProps } from 'vue'
import { IconProps } from '@/shared/ui/icons'

const props = defineProps<IconProps>()
</script>

<template>
  <div :class="props.className">
    <svg
      :width="props.size"
      :height="props.size"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.33594 8.16667V13.1667M9.66927 8.16667V13.1667M1.33594 4.83333H14.6693M13.8359 4.83333L13.1134 14.9517C13.0835 15.3722 12.8954 15.7657 12.5869 16.053C12.2784 16.3403 11.8725 16.5 11.4509 16.5H4.55427C4.13272 16.5 3.72683 16.3403 3.41834 16.053C3.10986 15.7657 2.9217 15.3722 2.89177 14.9517L2.16927 4.83333H13.8359ZM10.5026 4.83333V2.33333C10.5026 2.11232 10.4148 1.90036 10.2585 1.74408C10.1022 1.5878 9.89028 1.5 9.66927 1.5H6.33594C6.11492 1.5 5.90296 1.5878 5.74668 1.74408C5.5904 1.90036 5.5026 2.11232 5.5026 2.33333V4.83333H10.5026Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>
