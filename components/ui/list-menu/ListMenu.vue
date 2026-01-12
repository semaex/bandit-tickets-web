<template>
    <div class="ListMenu" :class="{'ListMenu--filtering': filtering}">
        <div class="ListMenu-inner">
            <div class="ListMenu-searchBox" v-if="filterable" v-focus-first-input>
                <input-search
                    v-model.trim="searchText"
                    @keyup.down="onArrowDown"
                    @keyup.up="onArrowUp"
                    @keyup.enter="onEnter"
                    @keyup.esc="close"
                    @keydown.tab="close"
                    ref="input"
                />
            </div>
            <div class="ListMenu-items" ref="items">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputSearch from '../input-search/InputSearch.vue'
import { stringPrepareToCompare } from '../../../utils/string-helpers'

export default defineComponent({
  name: 'ListMenu',

  components: {
    InputSearch
  },

  props: {
    filterable: {
      type: Boolean,
      default: false
    }
  },

  emits: ['close'],

  data() {
    return {
      searchText: '',
      filtering: false,
      arrowCounter: -1
    }
  },

  computed: {
    itemsRef(): HTMLElement | undefined {
      return this.$refs.items as HTMLElement | undefined
    },

    inputRef(): InstanceType<typeof InputSearch> | undefined {
      return this.$refs.input as InstanceType<typeof InputSearch> | undefined
    },

    activeMenuItemElement(): Element | null {
      if (this.itemsRef) {
        return this.itemsRef.querySelector('.ListMenuItem--isActive')
      }
      return null
    }
  },

  mounted() {
    if (this.filterable && this.inputRef) {
      this.$nextTick(() => {
        const inputEl = this.inputRef?.$el as HTMLElement | undefined
        if (inputEl) {
          inputEl.style.width = window.getComputedStyle(inputEl).width
        }
      })
    }
  },

  methods: {
    visibleMenuItems(): NodeListOf<Element> {
      if (!this.itemsRef) {
        return document.querySelectorAll('.ListMenuItem:not(.ListMenuItem--hidden)')
      }
      return this.itemsRef.querySelectorAll('.ListMenuItem:not(.ListMenuItem--hidden)')
    },

    deactivateAll() {
      if (!this.itemsRef) return
      const $items = this.itemsRef.querySelectorAll('.ListMenuItem')

      for (const $item of Array.from($items)) {
        $item.classList.remove('ListMenuItem--isActive')
      }
    },

    onArrowDown() {
      const visibleMenuItems = this.visibleMenuItems()

      if (this.arrowCounter < visibleMenuItems.length - 1) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },

    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },

    onEnter() {
      if (this.activeMenuItemElement) {
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        })
        this.activeMenuItemElement.dispatchEvent(clickEvent)
      }
    },

    close() {
      this.searchText = ''
      this.$emit('close')
    },

    filter() {
      if (this.searchText !== '') {
        this.filtering = true
        this.arrowCounter = -1
      } else {
        this.filtering = false
      }

      if (!this.itemsRef) return
      const $items = this.itemsRef.querySelectorAll('.ListMenuItem')

      for (const $item of Array.from($items)) {
        const itemText = stringPrepareToCompare($item.textContent || '')
        const searchText = stringPrepareToCompare(this.searchText)
        if (itemText.indexOf(searchText) === -1) {
          $item.classList.add('ListMenuItem--hidden')
        } else {
          $item.classList.remove('ListMenuItem--hidden')
        }
      }
    }
  },

  watch: {
    searchText() {
      if (this.filterable) {
        this.filter()
      }
    },

    arrowCounter() {
      if (this.arrowCounter === -1) {
        return
      }

      this.deactivateAll()

      const $items = this.visibleMenuItems()

      if ($items.length > 0 && this.arrowCounter < $items.length) {
        $items[this.arrowCounter].classList.add('ListMenuItem--isActive')
      }
    }
  }
})
</script>

<style lang="scss">
.ListMenu {
    &-inner {
        background-color: var(--color-card, #ffffff);
        border-radius: var(--radius-md, 0.5rem);
        padding: 0;
        position: relative;
    }

    &-searchBox {
        padding: 0.8em;

        .InputSearch {
            width: 100% !important;
        }

        .InputSearch input {
            font-size: 16px;
            font-weight: normal;
        }
    }

    &--filtering {
        .ListMenuItem--hidden {
            display: none;
        }

        .ListMenuSeparator {
            display: none;
        }
    }
}
</style>

