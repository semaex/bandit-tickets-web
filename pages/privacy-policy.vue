<template>
    <SimplePage>
        <PrivacyPolicy/>
    </SimplePage>
</template>

<script lang="ts">

import { defineComponent } from "vue"
import SimplePage from "../components/pages/simple-page/SimplePage.vue"
import PrivacyPolicy from "../components/common/legal-content/PrivacyPolicy.vue"

defineI18nRoute({
    paths: {
        es: '/politica-privacidad',
        en: '/privacy-policy',
        ca: '/politica-de-privacitat',
        eu: '/pribatutasun-politika',
        gl: '/politica-de-privacidade'
    }
})

export default defineComponent({
    components: {PrivacyPolicy, SimplePage}
})
</script>
