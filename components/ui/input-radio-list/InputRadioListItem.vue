<template>
    <div class="InputRadioListItem">
        <label>
            <input type="radio"
                   :indeterminate.prop="indeterminate"
                   v-model="proxyValue"
                   :value="radioValue"
                   @click="$emit('click', radioValue)"
            >
            <div class="InputRadioListItem-content">
                <span v-if="label">
                    {{ label }}
                </span>
                <slot></slot>
            </div>
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InputRadioListItem',

    props: {
        modelValue: { required: false },
        label: { type: String, default: '' },
        inline: { type: Boolean, default: false },
        radioValue: { required: false },
        indeterminate: { type: Boolean, default: false },
    },

    emits: ['update:modelValue', 'change', 'click'],

    computed: {
        proxyValue: {
            get() {
                return this.modelValue
            },
            set(val: any) {
                this.$emit('update:modelValue', val)
                this.$emit('change', val)
            }
        }
    }
})
</script>

<style lang="scss">
.InputRadioListItem {
    label {
        display: flex;
        align-items: flex-start;
        gap: 0.5em;
        cursor: pointer;
    }

    input[type="radio"] {
        margin-top: 0.6em;
        flex-shrink: 0;
    }
}
</style>
