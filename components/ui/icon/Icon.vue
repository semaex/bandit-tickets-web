<template>
  <span
    :class="['Icon', `Icon--${size}`, { 'Icon--clickable': clickable }]"
    :style="iconStyle"
    @click="handleClick"
  >
    <span v-if="svgContent" v-html="svgContent" class="Icon-svg-wrapper"></span>
    <span v-else class="Icon-placeholder">{{ name }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { iconMap } from './iconMap'

interface Props {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  clickable: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const iconStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style.color = props.color
  }
  return style
})

const svgContent = computed(() => {
  const rawSvg = iconMap[props.name]
  
  if (!rawSvg) {
    console.warn(`Icon "${props.name}" not found in iconMap`)
    return ''
  }
  
  let svgText = rawSvg
  
  if (props.color) {
    svgText = svgText.replace(/stroke="[^"]*"/g, `stroke="${props.color}"`)
  }
  
  return svgText
})

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style lang="scss">
.Icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  line-height: 1;
  vertical-align: middle;

  &--clickable {
    cursor: pointer;
    transition: opacity var(--transition-base);

    &:hover {
      opacity: 0.8;
    }
  }

  &--xs {
    width: 0.75rem;
    height: 0.75rem;
  }

  &--sm {
    width: 1rem;
    height: 1rem;
  }

  &--md {
    width: 1.25rem;
    height: 1.25rem;
  }

  &--lg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &--xl {
    width: 2rem;
    height: 2rem;
  }

  &-svg-wrapper {
    display: block;
    width: 100%;
    height: 100%;

    :deep(svg) {
      width: 100%;
      height: 100%;
      display: block;
    }

    :deep(path),
    :deep(circle),
    :deep(line),
    :deep(rect),
    :deep(polygon),
    :deep(polyline) {
      stroke: currentColor;
    }
  }

  &-placeholder {
    font-size: 0.75em;
    opacity: 0.5;
  }
}
</style>

