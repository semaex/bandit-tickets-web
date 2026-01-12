<template>
  <div class="InputCustom" :class="wrapperClasses">
    <Icon
      v-if="icon"
      :name="icon"
      :size="iconSize"
      class="InputCustom-icon"
    />
    <input
      class="input-custom"
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :name="name"
      :autocomplete="autocomplete"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="handleInput"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '../icon/Icon.vue'

export default defineComponent({
  name: 'InputCustom',

  components: {
    Icon
  },

  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: String,
      default: undefined
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: undefined
    },
    autocomplete: {
      type: String,
      default: undefined
    },
    maxlength: {
      type: [String, Number],
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    },
    iconSize: {
      type: String as () => 'xs' | 'sm' | 'md' | 'lg' | 'xl',
      default: 'sm'
    },
    fullWidth: {
      type: Boolean,
      default: true
    }
  },

  emits: ['update:modelValue', 'focus', 'blur', 'change'],

  computed: {
    wrapperClasses() {
      return {
        'InputCustom--hasIcon': !!this.icon,
        'InputCustom--fullWidth': this.fullWidth
      }
    }
  },

  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('update:modelValue', target.value)
    }
  }
})
</script>

<style lang="scss">
.InputCustom {
  position: relative;
  display: inline-block;

  &--fullWidth {
    width: 100%;
  }

  &-icon {
    position: absolute;
    left: 0.75em;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-muted-foreground);
    pointer-events: none;
    z-index: 1;
  }

  &--hasIcon input {
    padding-left: 2.3em;
  }
}
</style>

