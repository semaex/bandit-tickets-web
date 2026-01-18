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
        inverted: {type: Boolean, default: false},
        size: {type: String as () => 'md' | 'sm' | undefined, required: false, validator: (value: string) => ['md', 'sm'].indexOf(value) !== -1},
        minimal: {type: Boolean, default: false}
    },
    computed: {
        classes(): Record<string, boolean> {
            return {
                'IconButton--inverted': this.inverted,
                'IconButton--sm': this.size === 'sm',
                'IconButton--minimal': this.minimal
            }
        }
    }
})
</script>

<style lang="scss">
.IconButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-N60);
    transition: var(--transition-base, 0.2s);
    width: 1.6em;
    height: 1.6em;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    border:1px solid transparent;

    &:hover {
        color: var(--color-N30);
        background-color: rgba(var(--color-N0-rgb), 0.05);
        border:1px solid rgba(var(--color-N0-rgb), 0.1);
    }

    &--inverted {
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

