<template>
  <MicrositeLayout>
    <div class="CheckoutPage">
      <!-- Header -->
      <header class="CheckoutPage-header">
        <div class="container">
          <button
            class="CheckoutPage-back-button"
            @click="handleBack"
          >
            <Icon name="chevron-left" size="sm" class="CheckoutPage-back-icon" />
            <span class="CheckoutPage-back-text">{{ trans('checkoutPage.back') }}</span>
          </button>
        </div>
      </header>

      <main class="CheckoutPage-main">
        <div class="container">
          <div class="CheckoutPage-wrapper">
            <h1 class="CheckoutPage-title">{{ trans('checkoutPage.title') }}</h1>

            <div v-if="!checkoutData || checkoutData.items.length === 0" class="CheckoutPage-empty">
              <h2 class="CheckoutPage-empty-title">{{ trans('checkoutPage.empty_title') }}</h2>
              <button class="CheckoutPage-empty-button" @click="handleBack">
                {{ trans('checkoutPage.back_to_event') }}
              </button>
            </div>

            <div v-else class="CheckoutPage-grid">
              <!-- Form Column -->
              <div class="CheckoutPage-form-section">
                <!-- Guest Checkout Form -->
                <div class="CheckoutPage-card">
                  <div class="CheckoutPage-card-header">
                    <div class="CheckoutPage-icon-wrapper">
                      <Icon name="user" size="md" class="CheckoutPage-icon" />
                    </div>
                    <div>
                      <h2 class="CheckoutPage-card-title">{{ trans('checkoutPage.buyer_data_title') }}</h2>
                      <p class="CheckoutPage-card-subtitle">
                        {{ trans('checkoutPage.buyer_data_subtitle') }}
                      </p>
                    </div>
                  </div>

                  <form @submit.prevent="handleSubmit" class="CheckoutPage-form">
                    <div class="CheckoutPage-form-group">
                      <label for="name" class="CheckoutPage-label">{{ trans('checkoutPage.full_name_label') }}</label>
                      <div class="CheckoutPage-input-wrapper">
                        <Icon name="user" size="sm" class="CheckoutPage-input-icon" />
                        <input
                          id="name"
                          v-model="formData.name"
                          type="text"
                          class="CheckoutPage-input"
                          :placeholder="trans('checkoutPage.full_name_placeholder')"
                          required
                        />
                      </div>
                    </div>

                    <div class="CheckoutPage-form-group">
                      <label for="email" class="CheckoutPage-label">{{ trans('checkoutPage.email_label') }}</label>
                      <div class="CheckoutPage-input-wrapper">
                        <Icon name="mail" size="sm" class="CheckoutPage-input-icon" />
                        <input
                          id="email"
                          v-model="formData.email"
                          type="email"
                          class="CheckoutPage-input"
                          :placeholder="trans('checkoutPage.email_placeholder')"
                          required
                        />
                      </div>
                      <p class="CheckoutPage-hint">
                        {{ trans('checkoutPage.email_hint') }}
                      </p>
                    </div>

                    <div class="CheckoutPage-checkbox-group">
                      <input
                        id="terms"
                        v-model="acceptTerms"
                        type="checkbox"
                        class="CheckoutPage-checkbox"
                      />
                      <label for="terms" class="CheckoutPage-checkbox-label">
                        {{ trans('checkoutPage.accept_terms_prefix') }}
                        <a href="#" class="CheckoutPage-link">{{ trans('checkoutPage.terms_and_conditions') }}</a>
                        {{ trans('checkoutPage.and_the') }}
                        <a href="#" class="CheckoutPage-link">{{ trans('checkoutPage.privacy_policy') }}</a>
                      </label>
                    </div>

                    <!-- Mobile Submit -->
                    <div class="CheckoutPage-mobile-submit">
                      <ButtonCustom
                        type="primary"
                        :disabled="isSubmitting"
                        :full-width="true"
                        @click="handleSubmit"
                      >
                        {{ isSubmitting ? trans('checkoutPage.processing') : trans('checkoutPage.pay_now') }}
                      </ButtonCustom>
                    </div>
                  </form>
                </div>

                <!-- Security Note -->
                <div class="CheckoutPage-security">
                  <Icon name="shield-check" size="md" class="CheckoutPage-security-icon" />
                  <div>
                    <p class="CheckoutPage-security-title">{{ trans('checkoutPage.secure_purchase_title') }}</p>
                    <p class="CheckoutPage-security-text">
                      {{ trans('checkoutPage.secure_purchase_text') }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Order Summary Column -->
              <aside class="CheckoutPage-summary">
                <div class="CheckoutPage-summary-card">
                  <!-- Event Info -->
                  <div class="CheckoutPage-event-info">
                    <div class="CheckoutPage-event-icon-wrapper">
                      <Icon name="ticket" size="md" class="CheckoutPage-event-icon" />
                    </div>
                    <div class="CheckoutPage-event-details">
                      <h3 class="CheckoutPage-event-title">{{ checkoutData.eventTitle }}</h3>
                      <p class="CheckoutPage-event-date">{{ checkoutData.eventDate }}</p>
                      <p class="CheckoutPage-event-venue">{{ checkoutData.eventVenue }}</p>
                    </div>
                  </div>

                  <!-- Items -->
                  <div class="CheckoutPage-items">
                    <h4 class="CheckoutPage-items-title">{{ trans('checkoutPage.your_tickets') }}</h4>
                    <div
                      v-for="item in checkoutData.items"
                      :key="item.id"
                      class="CheckoutPage-item"
                    >
                      <span class="CheckoutPage-item-name">
                        {{ item.quantity }}x {{ item.name }}
                      </span>
                      <span class="CheckoutPage-item-price">
                        {{ item.price.multiply(item.quantity).formatted() }}
                      </span>
                    </div>
                  </div>

                  <!-- Totals -->
                  <div class="CheckoutPage-totals">
                    <div class="CheckoutPage-total-line">
                      <span class="CheckoutPage-total-label">{{ trans('checkoutPage.subtotal') }}</span>
                      <span class="CheckoutPage-total-value">
                        {{ checkoutData.subtotal.formatted() }}
                      </span>
                    </div>
                    <div class="CheckoutPage-total-line">
                      <span class="CheckoutPage-total-label">{{ trans('checkoutPage.service_fee') }}</span>
                      <span class="CheckoutPage-total-value">
                        {{ checkoutData.serviceFee.formatted() }}
                      </span>
                    </div>
                  </div>

                  <!-- Total -->
                  <div class="CheckoutPage-final-total">
                    <span class="CheckoutPage-final-total-label">{{ trans('checkoutPage.total') }}</span>
                    <span class="CheckoutPage-final-total-value">
                      {{ checkoutData.total.formatted() }}
                    </span>
                  </div>

                  <!-- Desktop Submit -->
                  <ButtonCustom
                    type="primary"
                    :disabled="isSubmitting"
                    :full-width="true"
                    @click="handleSubmit"
                  >
                    {{ isSubmitting ? trans('checkoutPage.processing') : trans('checkoutPage.pay_now') }}
                  </ButtonCustom>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  </MicrositeLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MicrositeLayout from '../../layout/MicrositeLayout/MicrositeLayout.vue'
import ButtonCustom from '../../ui/button-custom/ButtonCustom.vue'
import Icon from '../../ui/icon/Icon.vue'
import { useCheckout, type CheckoutData } from '../../../composables/useCheckout'
import { useAppLanguage } from '../../../composables/useAppLanguage'
import checkoutPageTranslations from './checkout-page.i18n.json'
import { translationService } from '../../../services/translation.service'

// Load translations
translationService.addTranslations('checkoutPage', checkoutPageTranslations)

// Use translation composable
const { trans } = useAppLanguage()

const router = useRouter()
const { getCheckoutData, setCheckoutData } = useCheckout()

const checkoutData = ref<CheckoutData | null>(null)

onMounted(() => {
  checkoutData.value = getCheckoutData()
})

const formData = ref({
  email: '',
  name: ''
})

const acceptTerms = ref(false)
const isSubmitting = ref(false)

const handleBack = () => {
  const eventSlug = checkoutData.value?.eventSlug
  if (eventSlug) {
    router.push(`/event/${eventSlug}`)
  } else {
    router.push('/')
  }
}

const handleSubmit = async () => {
  if (!formData.value.email || !formData.value.name) {
    alert(trans('checkoutPage.alert_complete_fields'))
    return
  }

  if (!acceptTerms.value) {
    alert(trans('checkoutPage.alert_accept_terms'))
    return
  }

  isSubmitting.value = true

  // Simulate payment processing
  setTimeout(() => {
    const { setPaymentData } = useCheckout()
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`

    setPaymentData({
      success: true,
      orderNumber,
      eventTitle: checkoutData.value?.eventTitle,
      eventDate: checkoutData.value?.eventDate,
      eventVenue: checkoutData.value?.eventVenue,
      items: checkoutData.value?.items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity
      })),
      email: formData.value.email
    })

    router.push('/payment-result')
  }, 1500)
}
</script>

<style lang="scss">
.CheckoutPage {
  min-height: 100vh;
  background: var(--gradient-subtle);

  &-header {
    border-bottom: 1px solid var(--color-border);
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  &-back-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--color-muted-foreground);
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-md) 0;
    transition: color var(--transition-base);

    &:hover {
      color: var(--color-foreground);
    }
  }

  &-back-icon {
    flex-shrink: 0;
  }

  &-back-text {
    font-size: 0.875rem;
    font-weight: 500;
  }

  &-main {
    padding: var(--spacing-xl) 0;
  }

  &-wrapper {
    max-width: 64rem;
    margin: 0 auto;
  }

  &-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-xl) 0;

    @media (min-width: 768px) {
      font-size: 1.875rem;
    }
  }

  &-empty {
    text-align: center;
    padding: var(--spacing-2xl) var(--spacing-md);
  }

  &-empty-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-md) 0;
  }

  &-empty-button {
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

  &-grid {
    display: grid;
    gap: var(--spacing-xl);

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 380px;
    }
  }

  &-form-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  &-card {
    background-color: var(--color-card);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
  }

  &-card-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }

  &-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    background-color: var(--color-primary-light);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &-icon {
    color: var(--color-primary);
  }

  &-card-title {
    font-weight: 600;
    color: var(--color-foreground);
    margin: 0;
  }

  &-card-subtitle {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin: 0;
  }

  &-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &-form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-foreground);
  }

  &-input-wrapper {
    position: relative;
  }

  &-input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-muted-foreground);
    pointer-events: none;
  }

  &-input {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 40px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: 1rem;
    color: var(--color-foreground);
    background-color: var(--color-background);
    transition: border-color var(--transition-base);

    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }

  &-hint {
    font-size: 0.75rem;
    color: var(--color-muted-foreground);
    margin: 0;
  }

  &-checkbox-group {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    padding-top: var(--spacing-md);
  }

  &-checkbox {
    margin-top: 2px;
    cursor: pointer;
  }

  &-checkbox-label {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    line-height: 1.5;
    cursor: pointer;
  }

  &-link {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &-mobile-submit {
    padding-top: var(--spacing-md);

    @media (min-width: 1024px) {
      display: none;
    }
  }

  &-security {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background-color: rgba(243, 67, 22, 0.05);
    border: 1px solid var(--color-primary-light-20);
    border-radius: var(--radius-lg);
  }

  &-security-icon {
    color: var(--color-primary);
    flex-shrink: 0;
    margin-top: 2px;
  }

  &-security-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-xs) 0;
  }

  &-security-text {
    font-size: 0.75rem;
    color: var(--color-muted-foreground);
    margin: 0;
  }

  &-summary {
    display: none;

    @media (min-width: 1024px) {
      display: block;
    }
  }

  &-summary-card {
    position: sticky;
    top: 96px;
    background-color: var(--color-card);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
  }

  &-event-info {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
    margin-bottom: var(--spacing-md);
  }

  &-event-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    background-color: var(--color-primary-light);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &-event-icon {
    color: var(--color-primary);
  }

  &-event-details {
    min-width: 0;
  }

  &-event-title {
    font-weight: 600;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-xs) 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-event-date,
  &-event-venue {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin: 0;
  }

  &-items {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
    margin-bottom: var(--spacing-md);
  }

  &-items-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-sm) 0;
  }

  &-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
  }

  &-item-name {
    color: var(--color-muted-foreground);
  }

  &-item-price {
    font-weight: 500;
    color: var(--color-foreground);
  }

  &-totals {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
    margin-bottom: var(--spacing-md);
  }

  &-total-line {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
  }

  &-total-label {
    color: var(--color-muted-foreground);
  }

  &-total-value {
    color: var(--color-foreground);
  }

  &-final-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }

  &-final-total-label {
    font-weight: 600;
    color: var(--color-foreground);
  }

  &-final-total-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-foreground);
  }
}
</style>

