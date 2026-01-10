<template>
  <component
    :is="componentType"
    :href="href"
    :to="to"
    :class="classes"
    :type="buttonType"
    :disabled="disabled || loading"
    :title="title"
    :target="target"
    @click.stop="$emit('click', $event)"
  >
    <div v-if="icon" class="ButtonCustom-icon">
      {{ icon }}
    </div>
    <div v-if="hasSlot" class="ButtonCustom-slot">
      <slot></slot>
    </div>
    <div v-if="loading" class="ButtonCustom-loader">
      <span class="ButtonCustom-loader-spinner"></span>
    </div>
    <div v-if="dropdown && !readonly && !loading" class="ButtonCustom-caret">
      ▼
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonCustom',

  props: {
    type: {
      type: String as () => 'default' | 'primary' | 'secondary' | 'transparent',
      default: 'default'
    },
    to: {
      type: [String, Object],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: undefined
    },
    size: {
      type: String as () => 'xs' | 'sm' | 'xl' | undefined,
      default: undefined
    },
    title: {
      type: String,
      default: undefined
    },
    dropdown: {
      type: Boolean,
      default: false
    },
    readonly: {
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
    },
    tag: {
      type: String,
      default: undefined
    },
    hideContentOnMobile: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  computed: {
    componentType (): string {
      if (this.tag) {
        return this.tag
      }
      if (this.href) {
        return 'a'
      }
      if (this.to) {
        return 'router-link'
      }
      return 'button'
    },

    buttonType (): string | undefined {
      return this.componentType === 'button' ? 'button' : undefined
    },

    classes (): Record<string, boolean> {
      return {
        ButtonCustom: true,
        'ButtonCustom--default': !this.type || this.type === 'default',
        'ButtonCustom--primary': this.type === 'primary',
        'ButtonCustom--secondary': this.type === 'secondary',
        'ButtonCustom--transparent': this.type === 'transparent',
        'ButtonCustom--active': this.active,
        'ButtonCustom--xs': this.size === 'xs',
        'ButtonCustom--sm': this.size === 'sm',
        'ButtonCustom--xl': this.size === 'xl',
        'ButtonCustom--loading': this.loading,
        'ButtonCustom--hideContentOnMobile': this.hideContentOnMobile,
        'ButtonCustom--fullWidth': this.fullWidth
      }
    },

    hasSlot (): boolean {
      return !!this.$slots.default
    }
  }
})
</script>


<style lang="scss">
:root {
  --color-button-primary-text: white;
  --color-button-active-bg: var(--color-interaction-70);
  --color-button-active-text: var(--color-interaction-20);
  --color-button-active-border: var(--color-interaction-60);
  --color-button-active-hover-bg: var(--color-interaction-70);
  --color-button-active-hover-text: var(--color-interaction-30);
  --color-button-active-hover-border: var(--color-interaction-40);
  --color-button-active-disabled-bg: var(--color-interaction-70);
  --color-button-active-disabled-text: var(--color-interaction-40);
  --color-button-active-badge-bg: var(--color-interaction-30);
  --color-button-active-badge-text: var(--color-interaction-70);
}

.theme-dark {
  --color-button-primary-text: white;
  --color-button-active-bg: var(--color-interaction-10);
  --color-button-active-text: var(--color-interaction-90);
  --color-button-active-border: var(--color-interaction-40);
  --color-button-active-hover-bg: var(--color-interaction-15);
  --color-button-active-hover-text: var(--color-interaction-90);
  --color-button-active-hover-border: var(--color-interaction-50);
  --color-button-active-disabled-bg: var(--color-interaction-20);
  --color-button-active-disabled-text: var(--color-interaction-70);
  --color-button-active-badge-bg: var(--color-interaction-70);
  --color-button-active-badge-text: var(--color-interaction-20);
}

.ButtonCustom {
  position: relative;
  text-align: center;
  font-size: var(--font-size-base, 14px);
  font-family: var(--font-primary, inherit);
  line-height: 1.3;
  padding: 0.6em 0.9em;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--radius-lg, 8px);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  overflow: hidden;
  transition: 0.2s background-color;
  gap: 0.5em;
  text-decoration: none;

  & > * {
    display: inline-block;
    line-height: 1;
  }

  &-icon {
    font-size: 1.2em;
    height: 1em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &-slot {
    display: inline-flex;
    align-items: center;

    & > *:not(:last-child) {
      margin-right: 0.5em;
    }
  }

  &-loader {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &-spinner {
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
  }

  &-caret {
    font-size: 0.5em;
    margin-left: 0.25em;
  }

  input[type=file] {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    outline: none;
  }

  &[disabled] {
    cursor: default;
    pointer-events: none;
  }

  &--default {
    background-color: var(--color-N90, #f5f5f5);
    color: var(--color-text, #333);
    border-color: var(--color-button-border, #ddd);

    &:hover:not([disabled]),
    &:active,
    &:focus {
      background-color: var(--color-N85, #e8e8e8);
      color: var(--color-N15, #1a1a1a);
    }

    &[disabled] {
      color: var(--color-N45, #999);
      text-shadow: 1px 1px var(--color-N100, #000);
    }

    &.ButtonCustom--active {
      background-color: var(--color-button-active-bg);
      color: var(--color-button-active-text);
      border: 1px solid var(--color-button-active-border) !important;

      &:hover:not([disabled]),
      &:active,
      &:focus {
        background-color: var(--color-button-active-hover-bg);
        color: var(--color-button-active-hover-text);
        border: 1px solid var(--color-button-active-hover-border);
      }

      &[disabled] {
        background-color: var(--color-button-active-disabled-bg);
        color: var(--color-button-active-disabled-text);
        text-shadow: 1px 1px var(--color-button-active-disabled-text);
      }
    }
  }

  &--primary {
    padding: var(--spacing-md, 0.75rem) var(--spacing-lg, 1rem);
    background: var(--gradient-accent, linear-gradient(134deg, #7181db, #4be0e7));
    box-shadow: var(--shadow-glow, 0 0 30px hsl(199 67% 54% / .3));
    color: white;
    border: none;
    border-radius: var(--radius-lg, 8px);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity var(--transition-base, 0.2s ease), box-shadow var(--transition-base, 0.2s ease), transform var(--transition-base, 0.2s ease);

    &:hover:not([disabled]),
    &:focus {
      opacity: 0.9;
    }

    &:active:not([disabled]) {
      opacity: 0.9;
      transform: scale(0.98);
    }

    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }
  }

  &--secondary {
    background-color: var(--color-secondary, #6c757d);
    color: white;
    border: 1px solid var(--color-secondary, #6c757d);

    &:hover:not([disabled]),
    &:active,
    &:focus {
      background-color: var(--color-secondary-80, #5a6268);
      border-color: var(--color-secondary-80, #5a6268);
    }

    &[disabled] {
      background-color: var(--color-secondary-60, #868e96);
      opacity: 0.6;
    }
  }

  &--transparent {
    background-color: transparent;
    color: var(--color-text, #333);
    border-color: var(--color-button-border, #ddd);

    &:hover:not([disabled]),
    &:active,
    &:focus {
      background-color: var(--color-N90, #f5f5f5);
      color: var(--color-N20, #333);
    }

    &[disabled] {
      color: var(--color-N45, #999);
      text-shadow: 1px 1px var(--color-N100, #000);
    }
  }

  &--xs {
    font-size: 12px;
    padding: 0.3em 0.6em;
    border-radius: var(--radius-sm, 4px);
  }

  &--sm {
    font-size: 12px;
    padding: 0.5em 0.8em;
    border-radius: var(--radius-sm, 4px);
  }

  &--xl {
    font-size: 18px;
    padding: 0.5em 0.8em;
    border-radius: var(--radius-sm, 4px);
  }

  &--fullWidth {
    width: 100%;
    display: flex;
  }

  &--loading {
    cursor: wait;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .ButtonCustom {
    &--hideContentOnMobile {
      .ButtonCustom-slot {
        display: none;
      }
    }
  }
}
</style>

