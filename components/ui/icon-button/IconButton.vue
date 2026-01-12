<template>
    <div class="IconButton" :class="classes" @click="$emit('click', $event)">
        <icon :name="icon"></icon>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '../icon/Icon.vue'

export default defineComponent({
    name: 'IconButton',
    components: {
        Icon
    },
    props: {
        icon: {type: String, required: true},
        theme: {type: String as () => 'dark' | 'light' | undefined, required: false, validator: (value: string) => ['dark', 'light'].indexOf(value) !== -1},
        size: {type: String as () => 'md' | 'sm' | undefined, required: false, validator: (value: string) => ['md', 'sm'].indexOf(value) !== -1},
        minimal: {type: Boolean, default: false}
    },
    computed: {
        classes(): Record<string, boolean> {
            return {
                'IconButton--dark': this.theme === 'dark',
                'IconButton--sm': this.size === 'sm',
                'IconButton--minimal': this.minimal
            }
        }
    }
})
</script>

<style lang="scss">
.IconButton {
    display: inline-block;
    vertical-align: baseline;
    color: var(--color-muted-foreground, #6b7280);
    transition: var(--transition-base, 0.2s);
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    cursor: pointer;
    position: relative;

    .Icon {
        line-height: 1;
        height: 1em;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        i {
            height: 1em;
            display: inline-block;
            line-height: 1;
        }
    }

    &:hover {
        color: var(--color-foreground, #1a1a1a);
        border: none;
        background-color: rgba(0, 0, 0, 0.05);
    }

    &--dark {
        color: var(--color-foreground, #1a1a1a);
        
        &:hover {
            color: var(--color-muted-foreground, #6b7280);
            border: none;
            background-color: rgba(255, 255, 255, 0.1);
        }
    }

    &--sm {
        width: 1.5em;
        height: 1.5em;
    }

    &--minimal {
        width: auto;
        height: auto;
        border-radius: 0;
        background: transparent;
        opacity: 0.6;
        padding: 0;

        .Icon {
            position: static;
            transform: none;
        }

        &:hover {
            opacity: 1;
            background: transparent;
        }
    }
}
</style>

