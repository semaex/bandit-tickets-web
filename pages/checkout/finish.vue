<template>
  <CheckoutFinishPage />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CheckoutFinishPage from '../../components/pages/checkout-finish/CheckoutFinishPage.vue'

export default defineComponent({
  name: 'CheckoutFinish',

  components: {
    CheckoutFinishPage
  }
})
</script>

