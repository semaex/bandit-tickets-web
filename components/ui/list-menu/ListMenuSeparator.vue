<template>
    <div class="ListMenuSeparator"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListMenuSeparator'
})
</script>

<style lang="scss">

.ListMenuSeparator {
    display: block;
    background-color: inherit;
    margin: 0.5em 1em;
    border-bottom: 1px solid rgba(var(--color-N0-rgb), 0.06);
}

</style>
