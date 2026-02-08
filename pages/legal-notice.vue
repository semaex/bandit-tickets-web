<template>
    <SimplePage>
        <LegalNotice/>
    </SimplePage>
</template>

<script setup lang="ts">
import SimplePage from "../components/pages/simple/SimplePage.vue"
import LegalNotice from "../components/common/legal-content/LegalNotice.vue"

defineI18nRoute({
    paths: {
        es: '/aviso-legal',
        en: '/legal-notice',
        ca: '/avis-legal',
        eu: '/lege-ohartxo',
        gl: '/aviso-legal'
    }
})
</script>
