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

<script lang="ts">
import { defineComponent } from 'vue'
import { iconMap } from './iconMap'

export default defineComponent({
  name: 'Icon',

  props: {
    name: { type: String, required: true },
    size: {
      type: String as () => 'xs' | 'sm' | 'md' | 'lg' | 'xl',
      default: 'md'
    },
    color: { type: String, default: undefined },
    clickable: { type: Boolean, default: false }
  },

  emits: ['click'],

  computed: {
    iconStyle (): Record<string, string> {
      const style: Record<string, string> = {}
      if (this.color) {
        style.color = this.color
      }
      return style
    },

    svgContent (): string {
      const rawSvg = (iconMap as Record<string, string>)[this.name]

      if (!rawSvg) {
        console.warn(`Icon "${this.name}" not found in iconMap`)
        return ''
      }

      let svgText = rawSvg

      if (this.color) {
        svgText = svgText.replace(/stroke="[^"]*"/g, `stroke="${this.color}"`)
      }

      return svgText
    }
  },

  methods: {
    handleClick (event: MouseEvent) {
      if (this.clickable) {
        this.$emit('click', event)
      }
    }
  }
})
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

