<template>
    <dropdown-select
        :model-value="modelValue"
        :options="genderOptions"
        :readonly="readonly"
        :disabled="disabled"
        :allow-empty-value="true"
        @update:model-value="onGenderChange"
        @change="onGenderChange"
    />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import DropdownSelect from '../dropdown/DropdownSelect.vue'
import { useAppLocale } from '../../../composables/useAppLocale'

interface GenderOption {
  value: string
  label: string
}

export default defineComponent({
  name: 'GenderDropdown',

  components: {
    DropdownSelect
  },

  props: {
    modelValue: {
      type: String as PropType<string | null>,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'change'],

  setup() {
    const { trans } = useAppLocale()
    return { trans }
  },

  computed: {
    genderOptions(): GenderOption[] {
      return [
        { value: 'male', label: this.trans('general.gender.male') },
        { value: 'female', label: this.trans('general.gender.female') },
        { value: 'non_binary', label: this.trans('general.gender.non_binary') },
        { value: 'prefer_not_to_say', label: this.trans('general.gender.prefer_not_to_say') }
      ]
    }
  },

  methods: {
    onGenderChange(gender: string | null) {
      this.$emit('update:modelValue', gender)
      this.$emit('change', gender)
    }
  }
})
</script>
