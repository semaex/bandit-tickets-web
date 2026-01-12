<template>
  <div class="EventPurchaseInfo">
    <!-- Customer Service Info -->
    <section class="EventPurchaseInfo-section">
      <h3 class="EventPurchaseInfo-title">
        {{ trans('eventPurchaseInfo.support_info_title') }}
      </h3>

      <p class="EventPurchaseInfo-text">
        <template v-if="typedBuyerSupportView.responsible === BuyerSupportResponsibility.PROMOTER">
          {{ supportInfoPromoterText }}
        </template>
        <template v-else>
          {{ supportInfoBanditText }}
        </template>
      </p>
    </section>

    <!-- Billing Info -->
    <section class="EventPurchaseInfo-section">
      <h3 class="EventPurchaseInfo-title">
        {{ trans('eventPurchaseInfo.billing_info_title') }}
      </h3>

      <p class="EventPurchaseInfo-text">
        {{ trans('eventPurchaseInfo.billing_info_text') }}
      </p>

      <p class="EventPurchaseInfo-text EventPurchaseInfo-text--small">
        {{ trans('eventPurchaseInfo.ticket_amount_includes_taxes') }}
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppLocale } from '../../../composables/useAppLocale'
import eventPurchaseInfoTranslations from './event-purchase-info.i18n.json'
import { translationService } from '../../../services/translation.service'
import type { EventBuyerSupportView } from '../../../public-model/Event/EventBuyerSupportView'
import { BuyerSupportResponsibility } from '../../../shared/BuyerSupportResponsibility'

// Load translations (una vez al importar el componente)
translationService.addTranslations(
  'eventPurchaseInfo',
  eventPurchaseInfoTranslations
)

export default defineComponent({
  name: 'EventPurchaseInfo',

  props: {
    buyerSupportView: {
      type: Object,
      required: true
    } as { type: typeof Object; required: true }
  },

  data () {
    const { trans } = useAppLocale()

    return {
      trans,
      BuyerSupportResponsibility
    }
  },

  computed: {
    typedBuyerSupportView (): EventBuyerSupportView {
      return this.buyerSupportView as EventBuyerSupportView
    },

    supportContactInfo (): string {
      const view = this.typedBuyerSupportView
      return view.email
        ? view.email.toString()
        : view.name
    },

    supportInfoPromoterText (): string {
      return this.trans('eventPurchaseInfo.support_info_promoter_case')
        .replace('%s', this.supportContactInfo)
    },

    supportInfoBanditText (): string {
      return this.trans('eventPurchaseInfo.support_info_bandit_case')
        .replace('%s', this.supportContactInfo)
    }
  }
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
