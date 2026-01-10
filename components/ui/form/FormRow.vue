<template>
    <div class="FormRow" :class="classes">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {

    name: 'FormRow',

    props: {
        spaceBetween: { type: Boolean },
        alignCenter: { type: Boolean },
        alignBottom: { type: Boolean },
    },

    computed: {

        classes () {
            return {
                'FormRow--spaceBetween': this.spaceBetween,
                'FormRow--alignCenter': this.alignCenter,
                'FormRow--alignBottom': this.alignBottom,
            }
        }

    }
}
</script>

<style lang="scss">

.FormRow {
    width: calc(100% + 20px);
    display: inline-flex;
    margin-left: -10px;
    margin-right: -10px;
    flex-wrap: wrap;
    align-items: flex-start;

    &:last-child {
        margin-bottom: -1em;
    }

    &--alignBottom {
        align-items: flex-end;
    }

    .FormGroup {
        width: unset;
        padding-left: 10px;
        padding-right: 10px;
    }

    &--spaceBetween {
        justify-content: space-between;
    }

    &--alignCenter {
        align-items: center;
    }
}

@media (max-width: $sm-max) {

    .FormRow {
        width: calc(100% + 10px);
        margin-left: -5px;
        margin-right: -5px;

        .FormGroup {
            padding-left: 5px;
            padding-right: 5px;
        }
    }
}

</style>
