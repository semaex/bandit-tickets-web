<template>
    <dropdown-panel class="DropdownMenu" :fixed="fixed" :anchorElement="anchorElement">
        <list-menu :filterable="filterable">
            <slot></slot>
        </list-menu>
    </dropdown-panel>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ListMenu from '../list-menu/ListMenu.vue'
import DropdownPanel from './DropdownPanel.vue'

export default defineComponent({
    name: 'DropdownMenu',
    components: {
        DropdownPanel,
        ListMenu
    },
    props: {
        filterable: {type: Boolean, default: false},
        fixed: {type: Boolean, default: true},
        anchorElement: {
            type: Object as PropType<HTMLElement | null>,
            default: null
        }
    }
})
</script>

<style lang="scss">


</style>

