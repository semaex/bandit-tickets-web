<template>
    <a class="ListMenuItem"
       :class="{'ListMenuItem--isEmpty': isEmpty, 'ListMenuItem--isActive': isActive}"
       @click="handleClick($event)"
       :href="href"
       :target="target"
    >
        <slot></slot>
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListMenuItem',

  props: {
    isEmpty: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: undefined
    },
    target: {
      type: String,
      default: undefined
    }
  },

  emits: ['click'],

  methods: {
    handleClick(event: MouseEvent) {
      this.$emit('click', event)
    }
  }
})
</script>

<style lang="scss">

.ListMenuItem {
    display: flex;
    background-color: inherit;
    padding: 0.5em 1em;
    white-space: nowrap;
    font-size: 14px;
    gap: 0.5em;
    user-select: none;
    cursor: pointer;

    &--isEmpty {
        font-style: italic;
        color: var(--color-placeholder);
    }

    &:hover {
        text-decoration: none;
        background: rgba(var(--color-interaction-rgb), 0.15);
    }

    &--isActive {
        text-decoration: none;
        background: rgba(var(--color-interaction-rgb), 0.25);
    }

    .Icon {
        color: var(--color-N70);
        display: inline-block;
        position: relative;
    }
}

</style>
