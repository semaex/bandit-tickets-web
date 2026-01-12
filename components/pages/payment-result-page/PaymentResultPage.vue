<template>
  <MicrositeLayout>
    <div class="PaymentResultPage">
      <div class="container PaymentResultPage-container">
        <!-- Success State -->
        <div v-if="isSuccess" class="PaymentResultPage-success">
          <!-- Success Icon -->
          <div class="PaymentResultPage-icon-wrapper PaymentResultPage-icon-wrapper--success">
            <svg class="PaymentResultPage-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <!-- Success Message -->
          <div class="PaymentResultPage-message">
            <h1 class="PaymentResultPage-title">{{ trans('paymentResultPage.success_title') }}</h1>
            <p class="PaymentResultPage-subtitle">
              {{ trans('paymentResultPage.success_subtitle') }}
            </p>
            <p v-if="paymentData?.orderNumber" class="PaymentResultPage-order">
              {{ trans('paymentResultPage.order_number') }}
              <span class="PaymentResultPage-order-number">{{ paymentData.orderNumber }}</span>
            </p>
          </div>

          <!-- Event Details Card -->
          <div class="PaymentResultPage-card">
            <h2 class="PaymentResultPage-card-title">{{ trans('paymentResultPage.event_details') }}</h2>
            
            <div class="PaymentResultPage-event-details">
              <h3 class="PaymentResultPage-event-title">
                {{ paymentData?.eventTitle || trans('paymentResultPage.event') }}
              </h3>
              
              <div class="PaymentResultPage-event-info">
                <svg class="PaymentResultPage-event-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ paymentData?.eventDate || trans('paymentResultPage.event_date') }}</span>
              </div>
              
              <div class="PaymentResultPage-event-info">
                <svg class="PaymentResultPage-event-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ paymentData?.eventVenue || trans('paymentResultPage.event_venue') }}</span>
              </div>

              <div v-if="paymentData?.items && paymentData.items.length > 0" class="PaymentResultPage-tickets">
                <p class="PaymentResultPage-tickets-title">{{ trans('paymentResultPage.tickets') }}</p>
                <ul class="PaymentResultPage-tickets-list">
                  <li
                    v-for="(item, index) in paymentData.items"
                    :key="index"
                    class="PaymentResultPage-tickets-item"
                  >
                    {{ item.quantity }}x {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Email Confirmation -->
          <div class="PaymentResultPage-email">
            <div class="PaymentResultPage-email-icon-wrapper">
              <svg class="PaymentResultPage-email-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="PaymentResultPage-email-title">
                {{ trans('paymentResultPage.email_title') }}
              </h3>
              <p class="PaymentResultPage-email-text">
                {{ trans('paymentResultPage.email_text') }}
                <span class="PaymentResultPage-email-address">{{ paymentData?.email || 'tu correo' }}</span>
                {{ trans('paymentResultPage.email_text_2') }}
              </p>
            </div>
          </div>

          <!-- Download Section -->
          <div class="PaymentResultPage-card">
            <h3 class="PaymentResultPage-card-title">{{ trans('paymentResultPage.download_title') }}</h3>
            <p class="PaymentResultPage-download-text">
              {{ trans('paymentResultPage.download_text') }}
            </p>
            <button class="PaymentResultPage-download-button">
              <svg class="PaymentResultPage-download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ trans('paymentResultPage.download_button') }}
            </button>
          </div>

          <!-- Back to Event -->
          <div class="PaymentResultPage-back">
            <button class="PaymentResultPage-back-button" @click="handleBack">
              {{ trans('paymentResultPage.back_to_event') }}
            </button>
          </div>
        </div>

        <!-- Error State -->
        <div v-else class="PaymentResultPage-error">
          <!-- Error Icon -->
          <div class="PaymentResultPage-icon-wrapper PaymentResultPage-icon-wrapper--error">
            <svg class="PaymentResultPage-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <!-- Error Message -->
          <div class="PaymentResultPage-message">
            <h1 class="PaymentResultPage-title">{{ trans('paymentResultPage.error_title') }}</h1>
            <p class="PaymentResultPage-subtitle">
              {{ trans('paymentResultPage.error_subtitle') }}
            </p>
          </div>

          <!-- Error Details -->
          <div class="PaymentResultPage-error-details">
            <h3 class="PaymentResultPage-error-title">{{ trans('paymentResultPage.error_details_title') }}</h3>
            <ul class="PaymentResultPage-error-list">
              <li class="PaymentResultPage-error-item">
                {{ trans('paymentResultPage.error_item_1') }}
              </li>
              <li class="PaymentResultPage-error-item">
                {{ trans('paymentResultPage.error_item_2') }}
              </li>
              <li class="PaymentResultPage-error-item">
                {{ trans('paymentResultPage.error_item_3') }}
              </li>
              <li class="PaymentResultPage-error-item">
                {{ trans('paymentResultPage.error_item_4') }}
              </li>
            </ul>
          </div>

          <!-- Actions -->
          <div class="PaymentResultPage-actions">
            <button class="PaymentResultPage-action-button PaymentResultPage-action-button--primary" @click="handleRetry">
              <svg class="PaymentResultPage-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {{ trans('paymentResultPage.retry_button') }}
            </button>
            
            <button class="PaymentResultPage-action-button PaymentResultPage-action-button--secondary" @click="handleBack">
              <svg class="PaymentResultPage-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              {{ trans('paymentResultPage.back_to_event') }}
            </button>
          </div>

          <!-- Help Text -->
          <p class="PaymentResultPage-help">
            {{ trans('paymentResultPage.help_text') }}
            <a href="mailto:soporte@ejemplo.com" class="PaymentResultPage-help-link">
              soporte@ejemplo.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </MicrositeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MicrositeLayout from '../../layout/microsite-layout/MicrositeLayout.vue'
import { useCheckout } from '../../../composables/useCheckout'
import { useAppLocale } from '../../../composables/useAppLocale'
import paymentResultPageTranslations from './payment-result-page.i18n.json'
import { translationService } from '../../../services/translation.service'

translationService.addTranslations('paymentResultPage', paymentResultPageTranslations)

interface PaymentData {
  success: boolean
  orderNumber?: string
  eventTitle?: string
  eventDate?: string
  eventVenue?: string
  items?: { name: string; quantity: number }[]
  email?: string
}

export default defineComponent({
  name: 'PaymentResultPage',

  components: {
    MicrositeLayout
  },

  data () {
    const { trans } = useAppLocale()
    const checkout = useCheckout()

    return {
      trans,
      checkout,
      paymentData: null as PaymentData | null
    }
  },

  computed: {
    isSuccess (): boolean {
      return this.paymentData?.success ?? false
    }
  },

  mounted () {
    this.paymentData = this.checkout.getPaymentData()
  },

  methods: {
    handleBack () {
      this.$router.push('/event')
    },

    handleRetry () {
      this.$router.push('/checkout')
    }
  }
})
</script>

<style lang="scss">
.PaymentResultPage {
  min-height: 100vh;
  background-color: var(--color-background);
  padding: var(--spacing-2xl) 0;

  &-container {
    max-width: 42rem;
    padding: 0 var(--spacing-md);
  }

  &-icon-wrapper {
    width: 96px;
    height: 96px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-xl) auto;

    &--success {
      background-color: var(--color-success-light);
    }

    &--error {
      background-color: var(--color-destructive-light);
    }
  }

  &-icon {
    width: 56px;
    height: 56px;

    .PaymentResultPage-icon-wrapper--success & {
      color: var(--color-success);
    }

    .PaymentResultPage-icon-wrapper--error & {
      color: var(--color-destructive);
    }
  }

  &-message {
    text-align: center;
    margin-bottom: var(--spacing-2xl);
  }

  &-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-md) 0;
  }

  &-subtitle {
    font-size: 1.125rem;
    color: var(--color-muted-foreground);
    margin: 0;
  }

  &-order {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin: var(--spacing-sm) 0 0 0;
  }

  &-order-number {
    font-family: monospace;
    font-weight: 600;
  }

  &-card {
    background-color: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }

  &-card-title {
    font-weight: 600;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-md) 0;
  }

  &-event-details {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &-event-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-foreground);
    margin: 0;
  }

  &-event-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--color-muted-foreground);
  }

  &-event-icon {
    width: 16px;
    height: 16px;
  }

  &-tickets {
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--color-border);
    margin-top: var(--spacing-md);
  }

  &-tickets-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-sm) 0;
  }

  &-tickets-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &-tickets-item {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
  }

  &-email {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    background-color: var(--color-primary-light);
    border: 1px solid var(--color-primary-light-20);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }

  &-email-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    background-color: var(--color-primary-light);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &-email-icon {
    width: 20px;
    height: 20px;
    color: var(--color-primary);
  }

  &-email-title {
    font-weight: 600;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-xs) 0;
  }

  &-email-text {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin: 0;
  }

  &-email-address {
    font-weight: 500;
    color: var(--color-foreground);
  }

  &-download-text {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin: 0 0 var(--spacing-md) 0;
  }

  &-download-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    background-color: var(--color-card);
    color: var(--color-foreground);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-base);

    &:hover {
      background-color: var(--color-secondary);
    }
  }

  &-download-icon {
    width: 16px;
    height: 16px;
  }

  &-back {
    text-align: center;
  }

  &-back-button {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    background: none;
    border: none;
    cursor: pointer;
    transition: color var(--transition-base);

    &:hover {
      color: var(--color-foreground);
    }
  }

  &-error-details {
    background-color: var(--color-destructive-light);
    border: 1px solid var(--color-destructive-light-20);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }

  &-error-title {
    font-weight: 600;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-md) 0;
  }

  &-error-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &-error-item {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);

    &::before {
      content: '•';
      color: var(--color-destructive);
      margin-top: 2px;
    }
  }

  &-actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
  }

  &-action-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--radius-lg);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-base);
    border: none;

    &--primary {
      background-color: var(--color-primary);
      color: white;

      &:hover {
        background-color: var(--color-primary-hover);
      }
    }

    &--secondary {
      background-color: var(--color-card);
      color: var(--color-foreground);
      border: 1px solid var(--color-border);

      &:hover {
        background-color: var(--color-secondary);
      }
    }
  }

  &-action-icon {
    width: 16px;
    height: 16px;
  }

  &-help {
    text-align: center;
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin: var(--spacing-xl) 0 0 0;
  }

  &-help-link {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

