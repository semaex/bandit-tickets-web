<template>
    <div class="FormSeparator" :class="classes">

    </div>
</template>

<script lang="ts">
export default {

    props: {
        small: Boolean,
        withLine: Boolean
    },

    computed: {
        classes() {
            return {
                'FormSeparator--small': this.small,
                'FormSeparator--withLine': this.withLine
            }
        }
    }
}
</script>

<style lang="scss">

.FormSeparator {
    height: 50px;
    position: relative;

    &--small {
        height: 20px;
    }

    &--withLine {

        &:after {
            content: '';
            position: absolute;
            width: 100%;
            border-bottom: 1px solid rgba(black,0.08);
            left: 0;
            top: 50%;
        }
    }
}

@media (max-width: 767.98px) {
  .FormSeparator {
    height: 30px;

    &--small {
      height: 15px;
    }
  }
}

</style>
