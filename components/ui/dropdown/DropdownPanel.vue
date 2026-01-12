<template>
    <div
        class="DropdownPanel"
        :class="{ 'DropdownPanel--fixed': fixed }"
        :style="computedStyles"
    >
        <div class="DropdownPanel-inner">
            <icon-button class="DropdownPanel-closeButton" icon="close" v-if="showCloseButton" @click="$emit('close')"/>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import IconButton from '../icon-button/IconButton.vue'

export default defineComponent({
    name: 'DropdownPanel',
    components: {IconButton},
    props: {
        fixed: {
            type: Boolean,
            default: true
        },
        anchorElement: {
            type: Object as PropType<HTMLElement | null>,
            default: null
        },
        fitToParentWidth: {
            type: Boolean,
            default: false
        },
        showCloseButton: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            calculatedTop: null as number | null,
            calculatedLeft: null as number | null,
            anchorWidth: undefined as string | undefined,
            resizeObserver: null as ResizeObserver | null
        };
    },
    computed: {
        dynamicStyles(): Record<string, string> {
            if (this.fixed && this.calculatedTop !== null && this.calculatedLeft !== null) {
                return {
                    top: `${this.calculatedTop}px`,
                    left: `${this.calculatedLeft}px`
                };
            }
            return {};
        },
        computedStyles(): Record<string, string | undefined> {
            const styles: Record<string, string | undefined> = {
                ...this.dynamicStyles
            };
            if (this.anchorWidth !== undefined) {
                styles['--anchor-width'] = this.anchorWidth;
            }
            return styles;
        }
    },
    watch: {
        fixed: {
            handler(isFixed: boolean) {
                if (isFixed) {
                    this.updatePosition();
                    this.addListeners();
                } else {
                    this.removeListeners();
                    this.calculatedTop = null;
                    this.calculatedLeft = null;
                    this.anchorWidth = undefined;
                    if (this.$el) {
                        (this.$el as HTMLElement).style.width = '';
                    }
                }
            },
            immediate: true
        },
        anchorElement() {
            if (this.fixed) {
                this.updatePosition();
            }
        }
    },
    mounted() {
        if (this.fixed) {
            this.updatePosition();
            this.addListeners();
        }
    },
    beforeUnmount() {
        this.removeListeners();
    },
    methods: {
        getAnchorElement(): HTMLElement | null {
            if (this.anchorElement) {
                return this.anchorElement;
            }

            if (this.$el && this.$el.parentElement) {
                return this.$el.parentElement as HTMLElement;
            }

            return null;
        },
        updatePositionInternal() {
            if (!this.fixed || !this.$el) {
                this.calculatedTop = null;
                this.calculatedLeft = null;
                this.anchorWidth = undefined;
                return;
            }

            const anchorElement = this.getAnchorElement();

            if (!anchorElement) {
                console.warn('[DropdownPanel] Could not find anchor element for positioning.');
                return;
            }
            const anchorRect = anchorElement.getBoundingClientRect();
            this.anchorWidth = `${anchorRect.width}px`;

            const dropdownHeight = (this.$el as HTMLElement).offsetHeight;
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            const spaceBelow = viewportHeight - anchorRect.bottom;
            const spaceAbove = anchorRect.top;

            let newTop: number;
            if (dropdownHeight <= 0) {
                newTop = anchorRect.bottom;
            } else if (spaceBelow >= dropdownHeight) {
                newTop = anchorRect.bottom;
            } else if (spaceAbove >= dropdownHeight) {
                newTop = anchorRect.top - dropdownHeight;
            } else {
                if (spaceBelow >= spaceAbove) {
                    newTop = anchorRect.bottom;
                } else {
                    newTop = anchorRect.top - dropdownHeight;
                }
            }

            let newLeft = anchorRect.left;
            const dropdownWidth = (this.$el as HTMLElement).offsetWidth;

            if (dropdownWidth > 0 && newLeft + dropdownWidth > viewportWidth) {
                newLeft = Math.max(0, anchorRect.right - dropdownWidth);
            }

            this.calculatedTop = newTop;
            this.calculatedLeft = newLeft;

            if (this.fixed) {
                (this.$el as HTMLElement).style.minWidth = `${anchorRect.width}px`;
            }

            if (this.fitToParentWidth) {
                (this.$el as HTMLElement).style.width = `${anchorRect.width}px`;
            }
        },
        updatePosition() {
            this.$nextTick(() => {
                this.updatePositionInternal();
            });
        },
        addListeners() {
            window.addEventListener('resize', this.updatePosition);
            window.addEventListener('scroll', this.updatePosition, true);

            if (window.ResizeObserver && !this.resizeObserver && this.$el) {
                this.resizeObserver = new ResizeObserver(() => {
                    this.updatePositionInternal();
                });
                this.resizeObserver.observe(this.$el as HTMLElement);
            }
        },
        removeListeners() {
            window.removeEventListener('resize', this.updatePosition);
            window.removeEventListener('scroll', this.updatePosition, true);

            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
                this.resizeObserver = null;
            }
        }
    }
})
</script>

<style lang="scss">
.DropdownPanel {
    position: absolute;
    font-size: 14px;
    z-index: 2;
    user-select: none;
    text-align: left;
    width: 100%;

    &--fixed {
        position: fixed;
        z-index: 1300;
        width: max-content;
        min-width: var(--anchor-width, auto);
    }

    &-inner {
        background-color: var(--color-card, #ffffff);
        border-radius: var(--radius-md, 0.5rem);
        border: 1px solid var(--color-border, #e5e7eb);
        padding: 0.5em 0;
        position: relative;
        box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
        max-height: 20em;
        overflow: auto;
        width: 100%;

        input[type=text],
        input[type=number],
        select {
            font-size: 14px;
            font-weight: normal;
        }
    }

    &-closeButton {
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        cursor: pointer;
        color: var(--color-muted-foreground, #6b7280);
        font-size: 0.8em;
        z-index: 1;
    }
}
</style>

