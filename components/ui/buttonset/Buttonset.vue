<template>
    <div class="Buttonset">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Buttonset"
}
</script>

<style lang="scss">

.Buttonset {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 1em;
    align-items: center;
}
</style>
