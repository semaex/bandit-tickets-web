<template>
    <form-group>
        <p class="FormTitle">
            <slot></slot>
        </p>
    </form-group>
</template>

<script lang="ts">
import FormGroup from './FormGroup.vue'

export default {

    components: {
        FormGroup
    }
}
</script>

<style lang="scss">

.FormTitle {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0 0 0.5em 0;
}

</style>
