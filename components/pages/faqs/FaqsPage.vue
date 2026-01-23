<template>
  <div class="FaqsPage">
    <h1 class="FaqsPage-title">{{ trans('faqsPage.title') }}</h1>
    <p class="FaqsPage-intro">{{ trans('faqsPage.intro') }}</p>

    <div class="FaqsPage-list">
      <div class="FaqsPage-item">
        <h2 class="FaqsPage-question">{{ trans('faqsPage.q1_title') }}</h2>
        <p class="FaqsPage-answer">{{ trans('faqsPage.q1_body') }}</p>
      </div>

      <div class="FaqsPage-item">
        <h2 class="FaqsPage-question">{{ trans('faqsPage.q2_title') }}</h2>
        <p class="FaqsPage-answer">{{ trans('faqsPage.q2_body') }}</p>
      </div>

      <div class="FaqsPage-item">
        <h2 class="FaqsPage-question">{{ trans('faqsPage.q3_title') }}</h2>
        <p class="FaqsPage-answer">{{ trans('faqsPage.q3_body') }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppLocale } from '../../../composables/useAppLocale'
import { translationService } from '../../../services/translation.service'
import faqsPageTranslations from './faqs-page.i18n.json'

translationService.addTranslations('faqsPage', faqsPageTranslations)

export default defineComponent({
  name: 'FaqsPage',

  data () {
    const { trans } = useAppLocale()

    return {
      trans
    }
  }
})
</script>

<style lang="scss">
.FaqsPage {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &-title {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-foreground);
  }

  &-intro {
    margin: 0;
    color: var(--color-muted-foreground);
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &-item {
    padding: 16px;
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: 16px;
  }

  &-question {
    margin: 0 0 8px 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-foreground);
  }

  &-answer {
    margin: 0;
    color: var(--color-muted-foreground);
    line-height: 1.6;
  }
}
</style>

