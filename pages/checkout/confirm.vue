<template>
  <CheckoutConfirmPage />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CheckoutConfirmPage from '../../components/pages/checkout-confirm-page/CheckoutConfirmPage.vue'

export default defineComponent({
  name: 'CheckoutConfirm',

  components: {
    CheckoutConfirmPage
  }
})
</script>

