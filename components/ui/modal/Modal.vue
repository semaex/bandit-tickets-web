<template>
    <transition name="Modal" @after-leave="onAfterLeave">
        <div class="Modal" :class="classes" v-if="isVisible">
            <div class="Modal-mask">
                <div class="Modal-wrapper" ref="modalWrapper" @mousedown="clickOutside" @keydown.enter="handleEnter">
                    <div class="Modal-container">

                        <div class="Modal-closeButton" v-if="allowClose">
                            <icon-button icon="close" @click="close()"/>
                        </div>

                        <div class="Modal-content">

                            <div class="Modal-header" v-if="hasHeader || hasTitle">
                                <div class="Modal-title" v-if="hasTitle">
                                    {{ title }}
                                </div>
                                <slot name="header" v-if="hasHeader"></slot>
                            </div>

                            <div class="Modal-body">
                                <slot></slot>
                            </div>

                            <div class="Modal-footer" v-if="hasFooter || hasButtonset">

                                <div class="Modal-buttonset" v-if="hasButtonset">
                                    <buttonset>
                                        <slot name="buttonset"></slot>
                                    </buttonset>
                                </div>

                                <slot name="footer" v-if="hasFooter"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconButton from '../icon-button/IconButton.vue'
import Buttonset from '../buttonset/Buttonset.vue'

interface BodyStylesCache {
    bodyOverflow: string
    bodyPosition: string
    bodyTop: string
    bodyWidth: string
    htmlOverflow: string
}

export default defineComponent({
    name: 'Modal',
    components: {
        Buttonset,
        IconButton
    },
    props: {
        full: {
            type: Boolean,
            required: false,
            default: false
        },
        title: {
            type: String,
            required: false,
            default: undefined
        },
        closeOnClickOutside: {
            type: Boolean,
            default: true
        },
        allowClose: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isVisible: true,
            scrollPosition: 0,
            bodyStylesCache: {
                bodyOverflow: '',
                bodyPosition: '',
                bodyTop: '',
                bodyWidth: '',
                htmlOverflow: ''
            } as BodyStylesCache,
            isUnlocked: false,
            escapeHandler: null as ((e: KeyboardEvent) => void) | null
        }
    },
    computed: {
        classes(): Record<string, boolean> {
            return {
                'Modal--full': this.full
            }
        },
        hasHeader(): boolean {
            return !!this.$slots.header
        },
        hasTitle(): boolean {
            return this.title !== null && this.title !== undefined && this.title !== ''
        },
        hasFooter(): boolean {
            return !!this.$slots.footer
        },
        hasButtonset(): boolean {
            return !!this.$slots.buttonset
        }
    },
    created() {
        this.lockBodyScroll()
        this.escKeyClose()
    },
    beforeUnmount() {
        this.unlockBodyScroll()
        if (this.escapeHandler) {
            document.removeEventListener('keydown', this.escapeHandler)
        }
    },
    methods: {
        close(): void {
            if (!this.isVisible) return
            this.isVisible = false
            this.$emit('close')
        },
        clickOutside(e: MouseEvent): void {
            if (e.target !== this.$refs.modalWrapper) {
                return
            }
            if (this.closeOnClickOutside && this.allowClose) {
                this.close()
            }
        },
        lockBodyScroll(): void {
            this.isUnlocked = false
            this.scrollPosition = window.scrollY || document.documentElement.scrollTop || 0
            this.bodyStylesCache = {
                bodyOverflow: document.body.style.overflow,
                bodyPosition: document.body.style.position,
                bodyTop: document.body.style.top,
                bodyWidth: document.body.style.width,
                htmlOverflow: document.documentElement.style.overflow
            }
            document.documentElement.style.overflow = 'hidden'
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.top = `-${this.scrollPosition}px`
            document.body.style.width = '100%'
        },
        unlockBodyScroll(): void {
            if (this.isUnlocked) return
            this.isUnlocked = true
            
            document.documentElement.style.overflow = this.bodyStylesCache.htmlOverflow || ''
            document.body.style.overflow = this.bodyStylesCache.bodyOverflow || ''
            document.body.style.position = this.bodyStylesCache.bodyPosition || ''
            document.body.style.top = this.bodyStylesCache.bodyTop || ''
            document.body.style.width = this.bodyStylesCache.bodyWidth || ''
            
            this.$nextTick(() => {
                window.scrollTo(0, this.scrollPosition)
            })
        },
        onAfterLeave(): void {
            this.unlockBodyScroll()
        },
        escKeyClose(): void {
            this.escapeHandler = (e: KeyboardEvent) => {
                if (e.key === 'Escape' && this.allowClose) {
                    this.close()
                }
            }
            document.addEventListener('keydown', this.escapeHandler)
        },
        handleEnter(e: KeyboardEvent): void {
            const activeElement = document.activeElement as HTMLElement
            if (!activeElement) return
            
            const tag = activeElement.tagName.toLowerCase()
            const type = (activeElement as HTMLInputElement).type

            if (tag === 'textarea' || type === 'submit' || type === 'button') return

            const button = (this.$el as HTMLElement)?.querySelector('.Modal-footer .ButtonCustom--primary') as HTMLElement

            if (button) {
                e.preventDefault()
                button.click()
            }
        }
    }
})
</script>

<style lang="scss">
$modal-padding-horizontal: 30px;
$modal-padding-horizontal-sm: 15px;
$modal-padding-vertical: 20px;
$modal-padding-vertical-sm: 15px;
$modal-separator-color: var(--color-N90);
$modal-border-radius: var(--radius-lg);

.Modal {

    &-mask {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    &-wrapper {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    &-container {
        display: inline-block;
        max-width: 90%;
        max-height: 95vh;
        margin: 0 auto;
        background-color: var(--color-N100);
        border-radius: $modal-border-radius;
        box-shadow: var(--shadow-z1);
        transition: all 0.3s ease;
        position: relative;
        text-align: left;
        overflow: hidden;
    }

    &-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        max-height: 95vh;
    }

    &-closeButton {
        position: absolute;
        top: 15px;
        right: 20px;
        cursor: pointer;
        font-size: 14px;
        z-index: 10;
    }

    &-title {
        font-size: 18px;
        font-weight: bold;
    }

    &-header {
        flex-shrink: 0;
        padding: $modal-padding-vertical calc(#{$modal-padding-horizontal} + 40px) $modal-padding-vertical $modal-padding-horizontal;
        border-bottom: 1px solid $modal-separator-color;
    }

    &-body {
        flex: 1 1 auto;
        overflow-y: auto;
        max-width: 100%;
        padding: $modal-padding-vertical $modal-padding-horizontal;

        & .Form > .FormGroup:first-child {
            margin-top: 0;
        }
    }

    &-footer {
        flex-shrink: 0;
        border-top: 1px solid $modal-separator-color;
        padding: $modal-padding-vertical $modal-padding-horizontal;
    }

    &-buttonset {
        text-align: right;
    }

    &--full {
        > .Modal-mask > .Modal-wrapper > .Modal-container {
            width: 90vw;
            height: 95vh;

            > .Modal-content {
                position: absolute;
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;

                > .Modal-header,
                > .Modal-footer {
                    flex-shrink: 0;
                }

                > .Modal-body {
                    flex: 1 1 auto;
                    overflow-y: auto;
                    margin: 0;
                    padding: 0;
                }
            }
        }
    }

    /* Transition component classes */
    &-enter {
        opacity: 0;
    }

    &-leave-active {
        opacity: 0;
    }

    &-enter &-container,
    &-leave-active &-container {
        transform: scale(1.1);
    }
}

@media (max-width: 767.98px) {

    .Modal {

        &-container {
            width: 100%;
            max-height: 90vh;
            max-width: 96vw;
        }

        &-content {
            max-height: 90vh;
        }

        &-title {
            font-size: 16px;
        }

        &-header {
            padding: $modal-padding-vertical-sm calc(#{$modal-padding-horizontal-sm} + 40px) $modal-padding-vertical-sm $modal-padding-horizontal-sm;
        }

        &-body {
            padding: $modal-padding-vertical-sm $modal-padding-horizontal-sm;
        }

        &-footer {
            padding: $modal-padding-vertical-sm $modal-padding-horizontal-sm;
        }

        &-closeButton {
            top: 8px;
            right: 6px;
        }

        &--full {

            > .Modal-mask > .Modal-wrapper {
                vertical-align: bottom;

                > .Modal-container {
                    display: block;
                    width: 100vw;
                    height: 90vh;
                    max-height: unset;
                    max-width: unset;
                    border-radius: $modal-border-radius $modal-border-radius 0 0;

                    > .Modal-content {
                        display: flex;
                        flex-direction: column;
                        height: 100%;

                        > .Modal-header,
                        > .Modal-footer {
                            flex-shrink: 0;
                        }

                        > .Modal-body {
                            flex: 1 1 auto;
                            overflow-y: auto;
                            margin: 0;
                            padding: 0;
                        }
                    }
                }
            }
        }
    }
}

</style>
