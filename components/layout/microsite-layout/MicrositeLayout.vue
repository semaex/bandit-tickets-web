<template>
  <div class="MicrositeLayout">
    <slot />
    <ClientOnly>
      <ToastNotifications />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import ToastNotifications from '../../common/toast-notifications/ToastNotifications.vue'
</script>

<style lang="scss">
.MicrositeLayout {
  min-height: 100vh;
  width: 100%;
}
</style>

