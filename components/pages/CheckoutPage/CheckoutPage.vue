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
            <svg class="CheckoutPage-back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="CheckoutPage-back-text">Volver</span>
          </button>
        </div>
      </header>

      <main class="CheckoutPage-main">
        <div class="container">
          <div class="CheckoutPage-wrapper">
            <h1 class="CheckoutPage-title">Finalizar compra</h1>

            <div v-if="!checkoutData || checkoutData.items.length === 0" class="CheckoutPage-empty">
              <h2 class="CheckoutPage-empty-title">No hay entradas seleccionadas</h2>
              <button class="CheckoutPage-empty-button" @click="handleBack">
                Volver al evento
              </button>
            </div>

            <div v-else class="CheckoutPage-grid">
              <!-- Form Column -->
              <div class="CheckoutPage-form-section">
                <!-- Guest Checkout Form -->
                <div class="CheckoutPage-card">
                  <div class="CheckoutPage-card-header">
                    <div class="CheckoutPage-icon-wrapper">
                      <svg class="CheckoutPage-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 class="CheckoutPage-card-title">Datos del comprador</h2>
                      <p class="CheckoutPage-card-subtitle">
                        Necesitamos tu información para enviarte las entradas
                      </p>
                    </div>
                  </div>

                  <form @submit.prevent="handleSubmit" class="CheckoutPage-form">
                    <div class="CheckoutPage-form-group">
                      <label for="name" class="CheckoutPage-label">Nombre completo</label>
                      <div class="CheckoutPage-input-wrapper">
                        <svg class="CheckoutPage-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                          id="name"
                          v-model="formData.name"
                          type="text"
                          class="CheckoutPage-input"
                          placeholder="Tu nombre y apellidos"
                          required
                        />
                      </div>
                    </div>

                    <div class="CheckoutPage-form-group">
                      <label for="email" class="CheckoutPage-label">Email</label>
                      <div class="CheckoutPage-input-wrapper">
                        <svg class="CheckoutPage-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <input
                          id="email"
                          v-model="formData.email"
                          type="email"
                          class="CheckoutPage-input"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                      <p class="CheckoutPage-hint">
                        Recibirás las entradas en este email
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
                        Acepto los
                        <a href="#" class="CheckoutPage-link">términos y condiciones</a>
                        y la
                        <a href="#" class="CheckoutPage-link">política de privacidad</a>
                      </label>
                    </div>

                    <!-- Mobile Submit -->
                    <div class="CheckoutPage-mobile-submit">
                      <button
                        type="submit"
                        class="CheckoutPage-submit-button"
                        :disabled="isSubmitting"
                      >
                        {{ isSubmitting ? 'Procesando...' : 'Pagar ahora' }}
                      </button>
                    </div>
                  </form>
                </div>

                <!-- Security Note -->
                <div class="CheckoutPage-security">
                  <svg class="CheckoutPage-security-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p class="CheckoutPage-security-title">Compra segura</p>
                    <p class="CheckoutPage-security-text">
                      Tus datos están protegidos con encriptación SSL de 256 bits
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
                      <svg class="CheckoutPage-event-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4v-3a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <div class="CheckoutPage-event-details">
                      <h3 class="CheckoutPage-event-title">{{ checkoutData.eventTitle }}</h3>
                      <p class="CheckoutPage-event-date">{{ checkoutData.eventDate }}</p>
                      <p class="CheckoutPage-event-venue">{{ checkoutData.eventVenue }}</p>
                    </div>
                  </div>

                  <!-- Items -->
                  <div class="CheckoutPage-items">
                    <h4 class="CheckoutPage-items-title">Tus entradas</h4>
                    <div
                      v-for="item in checkoutData.items"
                      :key="item.id"
                      class="CheckoutPage-item"
                    >
                      <span class="CheckoutPage-item-name">
                        {{ item.quantity }}x {{ item.name }}
                      </span>
                      <span class="CheckoutPage-item-price">
                        {{ (item.price * item.quantity).toFixed(2) }} €
                      </span>
                    </div>
                  </div>

                  <!-- Totals -->
                  <div class="CheckoutPage-totals">
                    <div class="CheckoutPage-total-line">
                      <span class="CheckoutPage-total-label">Subtotal</span>
                      <span class="CheckoutPage-total-value">
                        {{ checkoutData.subtotal.toFixed(2) }} €
                      </span>
                    </div>
                    <div class="CheckoutPage-total-line">
                      <span class="CheckoutPage-total-label">Gastos de gestión</span>
                      <span class="CheckoutPage-total-value">
                        {{ checkoutData.serviceFee.toFixed(2) }} €
                      </span>
                    </div>
                  </div>

                  <!-- Total -->
                  <div class="CheckoutPage-final-total">
                    <span class="CheckoutPage-final-total-label">Total</span>
                    <span class="CheckoutPage-final-total-value">
                      {{ checkoutData.total.toFixed(2) }} €
                    </span>
                  </div>

                  <!-- Desktop Submit -->
                  <button
                    type="submit"
                    class="CheckoutPage-desktop-submit"
                    :disabled="isSubmitting"
                    @click="handleSubmit"
                  >
                    {{ isSubmitting ? 'Procesando...' : 'Pagar ahora' }}
                  </button>
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
import { useCheckout } from '../../../composables/useCheckout'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CheckoutData {
  items: CartItem[]
  quantities: Record<string, number>
  subtotal: number
  serviceFee: number
  total: number
  eventTitle: string
  eventDate: string
  eventVenue: string
}

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
  router.push('/event')
}

const handleSubmit = async () => {
  if (!formData.value.email || !formData.value.name) {
    alert('Por favor, completa todos los campos.')
    return
  }

  if (!acceptTerms.value) {
    alert('Debes aceptar los términos y condiciones para continuar.')
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
      items: checkoutData.value?.items.map((item) => ({
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
    width: 16px;
    height: 16px;
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
    width: 20px;
    height: 20px;
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
    width: 16px;
    height: 16px;
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

  &-submit-button {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color var(--transition-base);

    &:hover:not(:disabled) {
      background-color: var(--color-primary-hover);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
    width: 20px;
    height: 20px;
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
    width: 20px;
    height: 20px;
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

  &-desktop-submit {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color var(--transition-base);

    &:hover:not(:disabled) {
      background-color: var(--color-primary-hover);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>

