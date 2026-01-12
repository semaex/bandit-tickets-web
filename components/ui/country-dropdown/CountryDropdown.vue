<template>
    <dropdown-select
        :model-value="modelValue"
        :options="countryOptions"
        :readonly="readonly"
        :disabled="disabled"
        :allow-empty-value="allowEmptyValue"
        filterable
        @update:model-value="onCountryChange"
        @change="onCountryChange"
    />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import DropdownSelect from '../dropdown/DropdownSelect.vue'
import { COUNTRY_CODES } from '../../../shared/data/country-codes'
import { useAppLocale } from '../../../composables/useAppLocale'

interface CountryOption {
  value: string
  label: string
}

export default defineComponent({
  name: 'CountryDropdown',

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
    },
    allowEmptyValue: {
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
    countryOptions(): CountryOption[] {
      return COUNTRY_CODES.map((code) => ({
        value: code,
        label: this.trans(`countries.${code}`)
      }))
    }
  },

  methods: {
    onCountryChange(country: string | null) {
      this.$emit('update:modelValue', country)
      this.$emit('change', country)
    }
  }
})
</script>
