<template>
  <PrivacyPolicyPage />
</template>

<script setup lang="ts">
import PrivacyPolicyPage from '../components/pages/PrivacyPolicyPage/PrivacyPolicyPage.vue'

defineI18nRoute({
  paths: {
    es: '/politica-privacidad',
    en: '/privacy-policy',
    ca: '/politica-de-privacitat',
    eu: '/pribatutasun-politika',
    gl: '/politica-de-privacidade'
  }
})
</script>
