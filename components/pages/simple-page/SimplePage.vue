<template>
  <MicrositeLayout>
    <div class="SimplePage">
      <div class="SimplePage-container">
        <div class="SimplePage-content">
          <slot />
        </div>
      </div>
    </div>
  </MicrositeLayout>
</template>

<script lang="ts">
import MicrositeLayout from '../../layout/microsite-layout/MicrositeLayout.vue'

export default {
  name: 'SimplePage',
  components: {
    MicrositeLayout
  },
}
</script>

<style lang="scss">
.SimplePage {
  padding: 2rem;
  
  &-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  &-content {
    line-height: 1.6;
  }
}
</style>
