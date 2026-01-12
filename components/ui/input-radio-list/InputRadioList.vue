<template>
    <div class="InputRadioList" :class="classes">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InputRadioList',

    props: {
        inline: { type: Boolean, default: false },
        columns: { type: Boolean, default: false }
    },

    computed: {
        classes() {
            return {
                'InputRadioList--inline': this.inline,
                'InputRadioList--columns': this.columns
            }
        }
    }
})
</script>

<style lang="scss">

.InputRadioList {

    .InputRadioListItem {
        &:not(:last-child) {
            margin-bottom: 0.5em;
        }
    }

    &--inline {

        .InputRadioListItem {
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
