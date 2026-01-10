<template>
  <MicrositeLayout>
    <div class="HomePage">
      <h1 class="HomePage-title">{{ trans('homePage.title') }}</h1>
      <p class="HomePage-description">{{ trans('homePage.description') }}</p>
    </div>
  </MicrositeLayout>
</template>

<script setup lang="ts">
import MicrositeLayout from '../../layout/MicrositeLayout/MicrositeLayout.vue'
import { useAppLocale } from '../../../composables/useAppLocale'
import homePageTranslations from './home-page.i18n.json'
import { translationService } from '../../../services/translation.service'

// Load translations
translationService.addTranslations('homePage', homePageTranslations)

// Use translation composable
const { trans } = useAppLocale()
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

