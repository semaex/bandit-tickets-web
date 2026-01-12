<template>
    <div class="InputCheckboxListItem" :class="cssClass">
        <label>
            <input type="checkbox"
                   :indeterminate.prop="indeterminate"
                   v-model="proxyValue"
                   :value="checkboxValue"
                   :readonly="readonly"
                   :disabled="disabled"
                   @click="$emit('click', checkboxValue)"
            >
            <div class="InputCheckboxListItem-content">
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
    name: 'InputCheckboxListItem',

    props: {
        modelValue: { required: false },
        label: { type: String, default: '' },
        inline: { type: Boolean, default: false },
        checkboxValue: { required: false },
        indeterminate: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        truncate: { type: Boolean, default: false }
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
        },
        cssClass() {
            return {
                'InputCheckboxListItem--inline': this.inline,
                'InputCheckboxListItem--truncate': this.truncate
            }
        }
    }
})
</script>

<style lang="scss">
.InputCheckboxListItem {
    label {
        display: flex;
        align-items: flex-start;
        gap: 0.5em;
    }

    input[type="checkbox"] {
        margin-top: 0.6em;
        flex-shrink: 0;
    }

    &--truncate {
        label {
            align-items: center;

            span {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
}
</style>
