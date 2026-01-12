<template>
  <MicrositeLayout>
    <div class="SimplePage">
      <div class="SimplePage-container">
        <h1 class="SimplePage-title">{{ title }}</h1>
        <div class="SimplePage-content">
          <slot />
        </div>
      </div>
    </div>
  </MicrositeLayout>
</template>

<script lang="ts">
import MicrositeLayout from '../../layout/MicrositeLayout/MicrositeLayout.vue'

export default {
  name: 'SimplePage',
  components: {
    MicrositeLayout
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.SimplePage {
  padding: 2rem;
  
  &-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  &-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  &-content {
    line-height: 1.6;
  }
}
</style>
