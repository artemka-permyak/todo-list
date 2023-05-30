<script setup lang="ts">
import * as svgIcons from './icons-list'
import { defineProps } from 'vue'
import { IconName, IconProps } from '@/shared/ui/icons'

const props = defineProps<
  Partial<Pick<IconProps, 'size'>> &
    Pick<IconProps, 'className'> & { name: IconName }
>()
const icons = Object(svgIcons)
const CurrentIcon = icons[props.name]
</script>

<template>
  <current-icon :size="props.size" :class="props.className" />
</template>

<style scoped lang="scss"></style>
