<template>
    <div class="InputSearch">
        <input type="text"
               ref="input"
               :placeholder="placeholder"
               :value="inputValue"
               @input="handleInput"
        >
        <icon class="InputSearch-searchIcon" name="search"/>
        <icon class="InputSearch-clearButton" name="input-clear" @click="clear" v-show="inputValue !== ''" :clickable="true"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '../icon/Icon.vue'

export default defineComponent({
    name: 'InputSearch',
    components: {
        Icon
    },
    props: {
        modelValue: {type: String, required: false},
        placeholder: {type: String}
    },
    data() {
        return {
            inputValue: (this.modelValue || '') as string
        }
    },
    mounted() {
        ['keyup', 'keydown', 'keypress', 'focus', 'blur'].forEach(event => {
            const inputRef = this.$refs.input as HTMLInputElement | undefined
            if (inputRef) {
                inputRef.addEventListener(event, ($event: Event) => this.$emit(event, $event));
            }
        });
    },
    methods: {
        handleInput(evt: Event) {
            const target = evt.target as HTMLInputElement
            if (target) {
                this.inputValue = target.value
            }
        },
        clear() {
            this.inputValue = ''
            const inputRef = this.$refs.input as HTMLInputElement | undefined
            if (inputRef) {
                inputRef.focus()
            }
        }
    },
    watch: {
        modelValue() {
            this.inputValue = (this.modelValue || '') as string
        },
        inputValue() {
            this.$emit('update:modelValue', this.inputValue)
        }
    }
})
</script>

<style lang="scss">
.InputSearch {
    position: relative;
    font-size: 14px;

    input[type="text"] {
        width: 100%;
        padding-left: 2.5em;
        padding-right: 2em;
        border-radius: 1em;
        border: 1px solid var(--color-border);
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        font-size: inherit;
    }

    &-searchIcon {
        position: absolute;
        left: 0.5em;
        top: 50%;
        transform: translateY(-50%);
        color: var(--color-muted-foreground);
        pointer-events: none;
    }

    &-clearButton {
        position: absolute;
        right: 0.5em;
        top: 50%;
        transform: translateY(-50%);
        color: var(--color-muted-foreground);
        cursor: pointer;
    }
}
</style>

