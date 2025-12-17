<template>
  <MicrositeLayout>
    <div class="HomePage">
      <h1 class="HomePage-title">Bandit Tickets</h1>
      <p class="HomePage-description">Welcome to the ticket sales platform</p>
    </div>
  </MicrositeLayout>
</template>

<script setup lang="ts">
import MicrositeLayout from '../../layout/MicrositeLayout/MicrositeLayout.vue'
</script>

<style lang="scss">
.HomePage {
    padding: 20px;

    &-title {
        font-size: 2rem;
        color: #f3304a;
    }
}
</style>

