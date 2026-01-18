<template>
    <SimplePage>
        <TermsAndConditions/>
    </SimplePage>
</template>

<script setup lang="ts">
import SimplePage from "../components/pages/simple/SimplePage.vue"
import TermsAndConditions from "../components/common/legal-content/TermsAndConditions.vue"

defineI18nRoute({
    paths: {
        es: '/terminos-y-condiciones',
        en: '/terms-and-conditions',
        ca: '/termes-i-condicions',
        eu: '/termitasun-erlazioak',
        gl: '/termos-e-condicións'
    }
})
</script>
