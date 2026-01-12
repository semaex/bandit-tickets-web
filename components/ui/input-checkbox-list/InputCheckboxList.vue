<template>
    <div class="InputCheckboxList" :class="classes">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InputCheckboxList',

    props: {
        inline: { type: Boolean, default: false },
        columns: { type: Boolean, default: false }
    },

    computed: {
        classes() {
            return {
                'InputCheckboxList--inline': this.inline,
                'InputCheckboxList--columns': this.columns
            }
        }
    }
})
</script>

<style lang="scss">

.InputCheckboxList {
    user-select: none;

    .InputCheckboxListItem {
        &:not(:last-child) {
            margin-bottom: 0.5em;
        }
    }

    &--inline {

        .InputCheckboxListItem {
            display: inline-block;

            label {
                margin: 0;
            }

            &:not(:last-child) {
                margin-right: 1em;
            }
        }
    }
}

</style>
