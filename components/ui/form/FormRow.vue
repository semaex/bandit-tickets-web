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
@use '../../../assets/scss/mixins' as *;

.FormRow {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 20px;

    &:last-child {
        margin-bottom: -1em;
    }

    &--alignBottom {
        align-items: flex-end;
    }

    .FormGroup {
        width: unset;
    }

    &--spaceBetween {
        justify-content: space-between;
    }

    &--alignCenter {
        align-items: center;
    }
}

@include mobile {
  .FormRow {
    gap: 10px;
  }
}

</style>
