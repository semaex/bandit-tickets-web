<template>
    <form :class="classes" v-on:submit.prevent="submit" ref="form">
        <button class="Form-buttonEnterPrevent" v-if="preventButtonClickOnEnter"></button>
        <slot></slot>
    </form>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default {

    props: {
        vertical: {type: Boolean},
        columns: {type: Boolean},
        preventButtonClickOnEnter: {type: Boolean, default: true},
        submit: {
            type: Function as PropType<(e: SubmitEvent) => void>,
            default: (e: SubmitEvent) => {
                e.preventDefault();
            }
        }
    },

    data() {
        return {
            classes: {
                'Form': true,
                'Form--vertical': this.vertical,
                'Form--columns': this.columns,
            }
        }
    }
}
</script>

<style lang="scss">

.Form {

    &-buttonEnterPrevent {
        display: none;
    }

    &--vertical {

        .FormGroup {
            display: block;
            margin-bottom: 1em;

            > *:not(label) {
                margin-left: unset;
            }

            &:nth-child(2) {
                margin-top: 0;
            }

            > label {
                width: unset;
                line-height: 1.3;
                margin-bottom: 0.5em;
            }
        }

        .FormRow {

            .FormGroup {
                margin-top: 0;
            }
        }
    }

    &--columns {
        display: flex;
        align-items: flex-start;
        gap: 50px;
    }
}
</style>
