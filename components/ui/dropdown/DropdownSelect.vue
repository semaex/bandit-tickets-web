<template>
    <div
        class="DropdownSelect"
        :class="{
            'DropdownSelect--open': expanded,
            'DropdownSelect--disabled': disabled,
            'DropdownSelect--readonly': readonly,
            'DropdownSelect--hasImages': hasImages
        }"
        ref="dropdownSelect"
    >
        <div class="DropdownSelect-label" @click="toggle"
             v-click-outside="{ handler: close, ignore: ['.ListMenu-searchBox', '.InputSearch', '.InputSearch input', '.InputSearch-clearButton'] }">
            <img v-if="hasImages && selectedOption"
                 :src="selectedOption.image"
                 alt=""
                 class="DropdownSelect-label-image"
            />
            <span
                class="DropdownSelect-label-text"
                :class="{ 'DropdownSelect-label-text--placeholder': isPlaceholder }"
            >
                {{ selectedLabel || placeholder }}
            </span>
            <span class="DropdownSelect-caret"><Icon name="arrow-down"/></span>
        </div>

        <dropdown-menu
            v-if="expanded"
            :filterable="filterable"
            :anchor-element="dropdownSelectRef"
            :fixed="fixed"
        >
            <list-menu-item
                v-if="allowEmptyValue"
                is-empty
                @click="select(emptyOptionValue)"
            >
                {{ emptyOptionLabel }}
            </list-menu-item>
            <template v-for="(option, index) in options">
                <list-menu-separator v-if="option.type === 'separator'" :key="'sep-' + index"/>
                <list-menu-item
                    v-else
                    :key="option.value ?? `option-${index}`"
                    @click="select(option.value)"
                >
                    <span class="DropdownSelect-option-content">
                        <img
                            v-if="hasImages"
                            :src="option.image"
                            alt=""
                            class="DropdownSelect-option-image"
                        />
                        <span class="DropdownSelect-option-label">{{ option.label }}</span>
                    </span>
                </list-menu-item>
            </template>
        </dropdown-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Icon from '../icon/Icon.vue'
import DropdownMenu from './DropdownMenu.vue'
import ListMenuItem from '../list-menu/ListMenuItem.vue'
import ListMenuSeparator from '../list-menu/ListMenuSeparator.vue'

interface DropdownOption {
  value: string | number | null
  label: string
  image?: string
  type?: 'separator'
}

export default defineComponent({
  name: 'DropdownSelect',

  components: {
    Icon,
    DropdownMenu,
    ListMenuItem,
    ListMenuSeparator
  },

  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number | null>,
      default: null
    },
    options: {
      type: Array as PropType<DropdownOption[]>,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    allowEmptyValue: {
      type: Boolean,
      default: false
    },
    emptyOptionValue: {
      type: [String, Number] as PropType<string | number | null>,
      default: null
    },
    emptyOptionLabel: {
      type: String,
      default: '-'
    },
    hasImages: {
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'change'],

  data() {
    return {
      expanded: false
    }
  },

  computed: {
    dropdownSelectRef(): HTMLElement | undefined {
      return this.$refs.dropdownSelect as HTMLElement | undefined
    },

    selectedOption(): DropdownOption | null {
      return this.options.find((o) => o.value === this.modelValue) || null
    },

    selectedLabel(): string | null {
      const match = this.options.find((o) => o.value === this.modelValue)
      return match ? match.label : null
    },

    isPlaceholder(): boolean {
      return !this.selectedLabel && !!this.placeholder
    }
  },

  methods: {
    toggle() {
      if (!this.$props.disabled && !this.$props.readonly) {
        this.expanded = !this.expanded
      }
    },
    close() {
      this.expanded = false
    },
    select(val: string | number | null) {
      this.$emit('update:modelValue', val)
      this.$emit('change', val)
      this.close()
    }
  }
})
</script>

<style lang="scss">
$image-border-radius: 4px;
$image-height: 60px;
$image-height-sm: 50px;

.DropdownSelect {
    display: block;
    position: relative;

    &--disabled {
        pointer-events: none;
        border-color: transparent;

        .DropdownSelect-caret {
            display: none;
        }
    }

    &--readonly {
        .DropdownSelect-label {
            border-color: transparent;
            pointer-events: none; // evita hover/click
            background-color: var(--color-N100);
            color: var(--color-input-foreground);
            opacity: 1;
        }

        .DropdownSelect-caret {
            display: none;
        }
    }

    &--open {

        .DropdownSelect-label {
            
        }
    }

    &-label {
        display: flex;
        justify-content: flex-start;
        gap: 1em;
        align-items: center;
        width: 100%;
        font-size: var(--input-font-size);
        border: var(--input-border);
        border-radius: var(--input-border-radius);
        background-color: var(--color-input-background);
        padding: var(--input-padding);
        padding-right: calc(2.4em);
        transition: 0.15s;
        min-height: var(--input-height);
        line-height: 1.3;
        user-select: none;
        cursor: pointer;

        &-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: var(--font-family-primary);

            &--placeholder {
                color: var(--color-placeholder);
                font-style: italic;
                font-weight: normal;
            }
        }
    }

    &-caret {
        font-size: 0.8em;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.6em;
        color: var(--color-N45);
    }

    &-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 1000;
        padding-top: 2px;

        .DropdownMenu {
            width: 100%;
            max-height: 50vh;
            padding-top: 0;

            .ListMenuItem {
                font-size: 15px;
            }
        }
    }

    &-option {

        &-content {
            display: flex;
            align-items: center;
            gap: 1em;
        }

        &-image {
            height: $image-height;
            object-fit: contain;
            border-radius: $image-border-radius;
        }
    }

    &--hasImages {

        .DropdownSelect {

            &-label {
                height: unset;

                &-image {
                    height: $image-height;
                    object-fit: contain;
                    border-radius: $image-border-radius;
                    flex-shrink: 0;
                }
            }

            .ListMenuItem {
                padding: 0.4em 1em;
                border-bottom: 1px solid var(--color-N90);
            }
        }

        &.DropdownSelect--readonly {

            .DropdownSelect-label {
                border-color: var(--color-input-border);
            }
        }
    }
}

@media (max-width: 767.98px) {

    .DropdownSelect {

        &-option {

            &-image {
                height: $image-height-sm;
            }
        }
    }

}
</style>
