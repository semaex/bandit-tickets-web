<template>
    <SimplePage>
        <FaqsPage />
    </SimplePage>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SimplePage from "../components/pages/simple/SimplePage.vue"
import FaqsPage from "../components/pages/faqs/FaqsPage.vue"

defineI18nRoute({
    paths: {
        es: '/preguntas-frecuentes',
        en: '/faqs',
        ca: '/preguntes-frequents',
        eu: '/ohiko-galderak',
        gl: '/preguntas-frecuentes'
    }
})

export default defineComponent({
    components: {FaqsPage, SimplePage}
})
</script>

