<template>
  <div class="EventPurchaseInfo">
    <!-- Customer Service Info -->
    <section class="EventPurchaseInfo-section">
      <h3 class="EventPurchaseInfo-title">{{ trans('eventPurchaseInfo.support_info_title') }}</h3>
      <p class="EventPurchaseInfo-text">
        <template v-if="buyerSupportView.responsible === BuyerSupportResponsibility.PROMOTER">
          {{ supportInfoPromoterText }}
        </template>
        <template v-else>
          {{ supportInfoBanditText }}
        </template>
      </p>
    </section>

    <!-- Billing Info -->
    <section class="EventPurchaseInfo-section">
      <h3 class="EventPurchaseInfo-title">{{ trans('eventPurchaseInfo.billing_info_title') }}</h3>
      <p class="EventPurchaseInfo-text">
        {{ trans('eventPurchaseInfo.billing_info_text') }}
      </p>
      <p class="EventPurchaseInfo-text EventPurchaseInfo-text--small">
        {{ trans('eventPurchaseInfo.ticket_amount_includes_taxes') }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppLanguage } from '../../../composables/useAppLanguage'
import eventPurchaseInfoTranslations from './event-purchase-info.i18n.json'
import { translationService } from '../../../services/translation.service'
import type { EventBuyerSupportView } from '../../../public-model/Event/EventBuyerSupportView'
import { BuyerSupportResponsibility } from '../../../shared/BuyerSupportResponsibility'

// Load translations
translationService.addTranslations('eventPurchaseInfo', eventPurchaseInfoTranslations)

// Use translation composable
const { trans } = useAppLanguage()

const props = defineProps({
  buyerSupportView: {
    type: Object,
    required: true
  }
})

const buyerSupportView = computed(() => props.buyerSupportView as EventBuyerSupportView)

const supportInfoPromoterText = computed(() => {
  const contactInfo = buyerSupportView.value.email 
    ? buyerSupportView.value.email.toString() 
    : buyerSupportView.value.name
  return trans('eventPurchaseInfo.support_info_promoter_case').replace('%s', contactInfo)
})

const supportInfoBanditText = computed(() => {
  const contactInfo = buyerSupportView.value.email 
    ? buyerSupportView.value.email.toString() 
    : buyerSupportView.value.name
  return trans('eventPurchaseInfo.support_info_bandit_case').replace('%s', contactInfo)
})
</script>

<style lang="scss">
.EventPurchaseInfo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);

  &-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-foreground);
    margin: 0;
  }

  &-text {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    line-height: 1.6;
    margin: 0;

    &--small {
      font-size: 0.8125rem;
    }
  }
}
</style>

