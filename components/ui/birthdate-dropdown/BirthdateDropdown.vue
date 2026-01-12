<template>
    <div class="BirthdateDropdown">
        <dropdown-select
            :model-value="day"
            :options="dayOptions"
            :placeholder="trans('general.day')"
            class="BirthdateDropdown-item"
            @update:model-value="onDayChange"
        />
        <dropdown-select
            :model-value="month"
            :options="monthOptions"
            :placeholder="trans('general.month')"
            class="BirthdateDropdown-item"
            @update:model-value="onMonthChange"
        />
        <dropdown-select
            :model-value="year"
            :options="yearOptions"
            :placeholder="trans('general.year')"
            class="BirthdateDropdown-item"
            @update:model-value="onYearChange"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import DropdownSelect from '../dropdown/DropdownSelect.vue'
import { useAppLocale } from '../../../composables/useAppLocale'

export default defineComponent({
  name: 'BirthdateDropdown',

  components: {
    DropdownSelect
  },

  props: {
    modelValue: {
      type: String as PropType<string | null>, // YYYY-MM-DD
      default: null
    }
  },

  emits: ['update:modelValue', 'change'],

  setup() {
    const { trans } = useAppLocale()
    return { trans }
  },

  data() {
    return {
      day: null as number | null,
      month: null as number | null,
      year: null as number | null
    }
  },

  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.day = null
          this.month = null
          this.year = null
          return
        }
        const [y, m, d] = val.split('-').map(Number)
        this.day = d
        this.month = m
        this.year = y
      }
    }
  },

  computed: {
    dayOptions() {
      return Array.from({ length: 31 }, (_, i) => ({
        value: i + 1,
        label: String(i + 1)
      }))
    },
    monthOptions() {
      return Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: this.trans(`general.month_${i + 1}`)
      }))
    },
    yearOptions() {
      const currentYear = new Date().getFullYear()
      return Array.from({ length: 100 }, (_, i) => ({
        value: currentYear - i,
        label: String(currentYear - i)
      }))
    }
  },

  methods: {
    onDayChange(val: number | null) {
      this.day = val
      this.updateValue()
    },
    onMonthChange(val: number | null) {
      this.month = val
      this.updateValue()
    },
    onYearChange(val: number | null) {
      this.year = val
      this.updateValue()
    },
    updateValue() {
      if (this.day && this.month && this.year) {
        const formattedDate = `${this.year}-${String(this.month).padStart(2, '0')}-${String(this.day).padStart(2, '0')}`
        this.$emit('update:modelValue', formattedDate)
        this.$emit('change', formattedDate)
      } else {
        this.$emit('update:modelValue', null)
        this.$emit('change', null)
      }
    }
  }
})
</script>

<style lang="scss">
.BirthdateDropdown {
    display: flex;
    gap: 0.5rem;

    &-item {
        flex: 1;
    }
}
</style>
