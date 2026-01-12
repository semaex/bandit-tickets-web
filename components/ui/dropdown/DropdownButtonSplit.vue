<template>
    <div class="DropdownButtonSplit">
        <div class="DropdownButtonSplit-inner"
             ref="DropdownButtonSplit-inner">
            <button-custom
                :href="href"
                :to="to"
                :disabled="disabled"
                :readonly="readonly"
                :icon="icon"
                :title="title"
                :type="type"
                :size="size"
                :style="buttonStyle"
                :loading="loading"
                :target="target"
                :class="{ 'ButtonCustom--iconOnly': !!icon && (!label || label.length === 0) }"
            >{{ label }}
            </button-custom>
            <button-custom
                :disabled="disabled"
                :readonly="readonly"
                :dropdown="true"
                :type="type"
                @click="toggleMenu"
                v-click-outside="collapseMenu"
                :size="size"
                :style="buttonStyle"
            ></button-custom>
        </div>
        <component :is="menu ? 'dropdown-menu' : 'dropdown-panel'" v-show="menuExpanded" :anchorElement="anchorElement" :fixed="fixed">
            <slot></slot>
        </component>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ButtonCustom from '../button-custom/ButtonCustom.vue'
import DropdownMenu from './DropdownMenu.vue'

export default defineComponent({
  name: 'DropdownButtonSplit',

  components: {
    ButtonCustom,
    DropdownMenu
  },

  props: {
    menu: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: undefined
    },
    type: {
      type: String as () => 'default' | 'primary' | 'secondary' | 'transparent' | undefined,
      default: undefined
    },
    title: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as () => 'xs' | 'sm' | 'xl' | undefined,
      default: undefined
    },
    buttonStyle: {
      type: Object as () => Record<string, string> | undefined,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: undefined
    },
    to: {
      type: [String, Object],
      default: undefined
    },
    target: {
      type: String,
      default: undefined
    },
    fixed: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      menuExpanded: false,
      anchorElement: null as HTMLElement | null
    }
  },

  mounted() {
    const ref = this.$refs['DropdownButtonSplit-inner'] as HTMLElement | undefined
    if (ref) {
      this.anchorElement = ref
    }
  },

  methods: {
    toggleMenu() {
      if (this.$props.readonly) {
        return
      }

      this.menuExpanded = !this.menuExpanded
    },

    collapseMenu() {
      this.menuExpanded = false
    }
  }
})
</script>

<style lang="scss">

.DropdownButtonSplit {
    position: relative;

    &-inner {
        position: relative;
        display: inline-flex;
        vertical-align: middle;

        > .ButtonCustom {
            min-width: unset;
            border-radius: 0;

            &:first-child {
                border-top-left-radius: $button-border-radius;
                border-bottom-left-radius: $button-border-radius;
            }

            &:nth-child(2) {
                border-top-right-radius: $button-border-radius;
                border-bottom-right-radius: $button-border-radius;
                margin-left: -1px;
                border-left: 1px solid rgba(var(--color-N0-rgb), 0.10);
            }
        }

        > .ButtonCustom.ButtonCustom--iconOnly {
            gap: 0;
        }

        [dropdown="true"] {
            padding-right: 0.5em;
            padding-left: 0.5em;
        }
    }

    .DropdownPanel {
        right: 0;
        top: 100%;
        padding-top: 0.5em;
    }
}

</style>
