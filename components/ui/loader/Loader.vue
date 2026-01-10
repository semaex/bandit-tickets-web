<template>
    <div class="Loader" ref="element" :style="{
        borderColor: borderColor,
        borderLeftColor: bgcolor
    }"
    ></div>
</template>

<script lang="ts">
export default {

    props: {
        color: String
    },

    data() {
        return {
            bgcolor: 'inherit'
        }
    },

    computed: {

        borderColor() {
            if ( !this.bgcolor.startsWith( 'rgb' ) ) {
                return this.bgcolor
            }

            return this.bgcolor.replace( 'rgb', 'rgba' ).replace( ')', ',0.2)' )
        }
    },

    mounted() {
        const element = this.$refs.element as HTMLElement | undefined
        if ( element ) {
            this.bgcolor = window.getComputedStyle( element ).color
        }
    }
}
</script>

<style lang="scss">

/** https://projects.lukehaas.me/css-loaders/ */

.Loader,
.Loader:after {
    border-radius: 50%;
    width: 1em;
    height: 1em;
    display: inline-block;
}

.Loader {
    position: relative;
    text-indent: -9999em;
    color: inherit;
    border: 0.2em solid rgba(var(--color-primary-rgb), 0.2);
    border-left: 0.2em solid var(--color-primary);
    transform: translateZ(0);
    animation: load8 1.1s infinite linear;
}

@-webkit-keyframes load8 {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes load8 {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>
