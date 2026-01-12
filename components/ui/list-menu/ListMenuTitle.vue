<template>
    <div class="ListMenuTitle">
        <span>
            {{ title }}
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListMenuTitle',

  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss">

.ListMenuTitle {
    display: block;
    margin: 0.5em 1em;

    span {
        opacity: 0.5;
        font-size: 0.8em;
        text-transform: uppercase;
    }
}

</style>
