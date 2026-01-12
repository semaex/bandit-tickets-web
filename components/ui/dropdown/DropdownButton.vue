<template>
    <div class="DropdownButton">
        <button-custom
            :disabled="disabled"
            :readonly="readonly"
            :icon="icon"
            :title="title"
            :dropdown="true"
            :type="type"
            @click="toggleMenu"
            v-click-outside="collapseMenu"
            :size="size"
            :style="buttonStyle"
            :loading="loading"
        >
            <slot name="label">{{ label }}</slot>
        </button-custom>
        <component :is="menu ? 'dropdown-menu' : 'dropdown-panel'" v-show="menuExpanded" :filterable="filterable" :fixed="fixed">
            <slot></slot>
        </component>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ButtonCustom from '../button-custom/ButtonCustom.vue'
import DropdownMenu from './DropdownMenu.vue'
import DropdownPanel from './DropdownPanel.vue'
import ListMenu from '../list-menu/ListMenu.vue'

export default defineComponent({
  name: 'DropdownButton',

  components: {
    ListMenu,
    DropdownPanel,
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
    filterable: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      menuExpanded: false,
      componentId: Math.random().toString(36).substring(2, 9),
      dropdownHandler: null as ((e: Event) => void) | null
    }
  },

  created() {
    this.dropdownHandler = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail && customEvent.detail[0]) {
        this.closeIfNotSelf(customEvent.detail[0])
      }
    }
    window.addEventListener('dropdown-opened', this.dropdownHandler)
  },

  beforeUnmount() {
    if (this.dropdownHandler) {
      window.removeEventListener('dropdown-opened', this.dropdownHandler)
    }
  },

  methods: {
    toggleMenu() {
      if (this.$props.readonly) {
        return
      }

      const wasExpanded = this.menuExpanded
      this.menuExpanded = !this.menuExpanded

      if (!wasExpanded && this.menuExpanded) {
        window.dispatchEvent(new CustomEvent('dropdown-opened', { detail: [this.componentId] }))
      }
    },

    collapseMenu() {
      this.menuExpanded = false
    },

    closeIfNotSelf(openedDropdownId: string) {
      if (openedDropdownId !== this.componentId && this.menuExpanded) {
        this.menuExpanded = false
      }
    }
  }
})
</script>

<style lang="scss">

.DropdownButton {
    position: relative;

    .DropdownPanel {
        left: 0;
        top: 100%;
        padding-top: 0.5em;
    }
}

</style>
