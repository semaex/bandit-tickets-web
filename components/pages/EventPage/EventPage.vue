<template>
  <MicrositeLayout>
    <div class="EventPage">
      <!-- Hero Section -->
      <section class="EventPage-hero">
        <div class="container">
          <div class="EventPage-hero-content">
            <!-- Event Image -->
            <div class="EventPage-image-wrapper">
              <div class="EventPage-image-container">
                <img
                  :src="eventData.image || '/placeholder-event.jpg'"
                  :alt="eventData.title"
                  class="EventPage-image"
                />
              </div>
            </div>

            <!-- Event Header Info -->
            <div class="EventPage-header">
              <SaleStatus
                :status="eventData.saleStatus"
                :close-date="eventData.closeDate"
              />
              <h1 class="EventPage-title">{{ eventData.title }}</h1>
              <p v-if="eventData.subtitle" class="EventPage-subtitle">
                {{ eventData.subtitle }}
              </p>
              
              <!-- Quick Info - Desktop -->
              <div class="EventPage-info-desktop">
                <EventInfo
                  :date="eventData.date"
                  :time="eventData.time"
                  :venue="eventData.venue"
                  :city="eventData.city"
                  :promoter="eventData.promoter"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <main class="EventPage-main">
        <div class="container">
          <!-- Event Info - Mobile only -->
          <section class="EventPage-info-mobile">
            <EventInfo
              :date="eventData.date"
              :time="eventData.time"
              :venue="eventData.venue"
              :city="eventData.city"
              :promoter="eventData.promoter"
            />
          </section>

          <!-- Two Column Layout -->
          <div class="EventPage-grid">
            <!-- Left: Main Content -->
            <div class="EventPage-content">
              <!-- Ticket Selection -->
              <section
                v-if="isOnSale"
                ref="ticketSectionRef"
                class="EventPage-tickets"
              >
                <h2 class="EventPage-section-title">{{ trans('eventPage.select_tickets') }}</h2>
                <div class="EventPage-tickets-list">
                  <TicketCard
                    v-for="ticket in eventData.tickets"
                    :key="ticket.id"
                    :name="ticket.name"
                    :description="ticket.description"
                    :price="ticket.price"
                    :quantity="quantities[ticket.id] || 0"
                    :available="ticket.available"
                    @quantity-change="(qty: number) => handleQuantityChange(ticket.id, qty)"
                  />
                </div>
              </section>

              <!-- Info Sections -->
              <div class="EventPage-info-sections">
                <!-- Genres -->
                <section class="EventPage-section">
                  <h2 class="EventPage-section-title">{{ trans('eventPage.genres') }}</h2>
                  <div class="EventPage-genres">
                    <GenreChip
                      v-for="genre in eventData.genres"
                      :key="genre"
                      :genre="genre"
                    />
                  </div>
                </section>

                <!-- Description -->
                <section class="EventPage-section">
                  <h2 class="EventPage-section-title">{{ trans('eventPage.about_event') }}</h2>
                  <div class="EventPage-description">
                    <p
                      v-for="(paragraph, index) in descriptionParagraphs"
                      :key="index"
                      class="EventPage-description-paragraph"
                    >
                      {{ paragraph }}
                    </p>
                  </div>
                </section>

                <!-- Conditions -->
                <section class="EventPage-section EventPage-section--bordered">
                  <h2 class="EventPage-section-title">{{ trans('eventPage.conditions') }}</h2>
                  <p class="EventPage-conditions">
                    {{ eventData.conditions }}
                  </p>
                </section>
              </div>
            </div>

            <!-- Right: Sticky Purchase Summary -->
            <aside v-if="isOnSale" class="EventPage-summary">
              <div class="EventPage-summary-card">
                <h3 class="EventPage-summary-title">{{ trans('eventPage.purchase_summary') }}</h3>
                
                <div v-if="selectedTickets.length > 0" class="EventPage-summary-items">
                  <div
                    v-for="ticket in selectedTickets"
                    :key="ticket.id"
                    class="EventPage-summary-item"
                  >
                    <span class="EventPage-summary-item-name">
                      {{ quantities[ticket.id] }}x {{ ticket.name }}
                    </span>
                    <span class="EventPage-summary-item-price">
                      {{ (ticket.price * quantities[ticket.id]).toFixed(2) }} €
                    </span>
                  </div>
                  <div class="EventPage-summary-line">
                    <span class="EventPage-summary-label">{{ trans('eventPage.subtotal') }}</span>
                    <span class="EventPage-summary-value">{{ subtotal.toFixed(2) }} €</span>
                  </div>
                  <div class="EventPage-summary-line">
                    <span class="EventPage-summary-label">{{ trans('eventPage.service_fee') }}</span>
                    <span class="EventPage-summary-value">{{ serviceFee.toFixed(2) }} €</span>
                  </div>
                </div>
                <p v-else class="EventPage-summary-empty">
                  {{ trans('eventPage.no_tickets_selected') }}
                </p>

                <div class="EventPage-summary-total">
                  <span class="EventPage-summary-total-label">{{ trans('eventPage.total') }}</span>
                  <span class="EventPage-summary-total-value">{{ totalPrice.toFixed(2) }} €</span>
                </div>

                <button
                  class="EventPage-cta-button"
                  :disabled="totalTickets === 0"
                  @click="handleCtaClick"
                >
                  {{ totalTickets > 0 ? trans('eventPage.continue_to_payment') : trans('eventPage.select_tickets_button') }}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <!-- Mobile Sticky CTA -->
      <div v-if="isOnSale" class="EventPage-mobile-cta">
        <div class="container">
          <div class="EventPage-mobile-cta-content">
            <div class="EventPage-mobile-cta-info">
              <p v-if="totalTickets > 0" class="EventPage-mobile-cta-tickets">
                {{ totalTickets }} {{ totalTickets === 1 ? trans('eventPage.ticket') : trans('eventPage.tickets') }}
              </p>
              <p
                v-if="totalTickets > 0"
                class="EventPage-mobile-cta-price"
              >
                {{ totalPrice.toFixed(2) }} €
              </p>
              <p v-else class="EventPage-mobile-cta-from">
                {{ trans('eventPage.from') }} {{ minPrice.toFixed(2) }} €
              </p>
            </div>
            <button
              class="EventPage-mobile-cta-button"
              :disabled="totalTickets === 0"
              @click="handleCtaClick"
            >
              {{ totalTickets > 0 ? trans('eventPage.continue_to_payment') : trans('eventPage.select_tickets_button_mobile') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Footer spacer for mobile CTA -->
      <div v-if="isOnSale" class="EventPage-mobile-spacer"></div>
    </div>
  </MicrositeLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import MicrositeLayout from '../../layout/MicrositeLayout/MicrositeLayout.vue'
import EventInfo from '../../common/EventInfo/EventInfo.vue'
import SaleStatus from '../../common/SaleStatus/SaleStatus.vue'
import TicketCard from '../../common/TicketCard/TicketCard.vue'
import GenreChip from '../../common/GenreChip/GenreChip.vue'
import { useCheckout } from '../../../composables/useCheckout'
import { useAppLanguage } from '../../../composables/useAppLanguage'
import eventPageTranslations from './event-page.i18n.json'
import { translationService } from '../../../services/translation.service'

// Load translations
translationService.addTranslations('eventPage', eventPageTranslations)

// Use translation composable
const { trans } = useAppLanguage()

interface Ticket {
  id: string
  name: string
  description: string
  price: number
  available: boolean
}

interface EventData {
  title: string
  subtitle?: string
  date: string
  time: string
  venue: string
  city: string
  promoter: string
  saleStatus: 'on-sale' | 'coming-soon' | 'closed'
  closeDate?: string
  genres: string[]
  description: string
  conditions: string
  tickets: Ticket[]
  image?: string
}

// Mock event data - in production this would come from an API
const eventData: EventData = {
  title: 'AURORA WORLD TOUR',
  subtitle: "Presentando su nuevo álbum 'The Gods We Can Touch'",
  date: 'Sábado, 15 de Marzo 2025',
  time: '21:00h (Apertura de puertas: 19:30h)',
  venue: 'Wizink Center',
  city: 'Madrid',
  promoter: 'Live Nation España',
  saleStatus: 'on-sale',
  closeDate: '15 de Marzo 2025, 18:00h',
  genres: ['Indie Pop', 'Art Pop', 'Electronic', 'Folk'],
  description: `Después de conquistar escenarios en todo el mundo, AURORA regresa a España con su esperada gira mundial. La artista noruega, conocida por su voz etérea y sus espectáculos visuales únicos, presentará los temas de su aclamado álbum "The Gods We Can Touch" junto a sus éxitos más emblemáticos.

Este concierto promete ser una experiencia inmersiva donde la música, el arte visual y la conexión emocional se fusionan en un espectáculo inolvidable. AURORA ha cautivado a millones de fans con canciones como "Runaway", "Cure for Me" y "Exist for Love", consolidándose como una de las artistas más originales de su generación.

No te pierdas la oportunidad de vivir en directo la magia de AURORA en una noche que promete ser verdaderamente especial.`,
  tickets: [
    {
      id: 'general',
      name: 'Entrada General',
      description: 'Acceso a la zona de pista',
      price: 45.0,
      available: true
    },
    {
      id: 'vip',
      name: 'VIP Experience',
      description: 'Acceso preferente + zona VIP + merchandising exclusivo',
      price: 120.0,
      available: true
    },
    {
      id: 'meet',
      name: 'Meet & Greet',
      description: 'Incluye VIP + foto con el artista + soundcheck',
      price: 250.0,
      available: false
    }
  ],
  conditions: `Al adquirir tu entrada aceptas los términos y condiciones del evento. Las entradas son nominativas e intransferibles. Se requiere documento de identidad para el acceso. No se permiten cámaras profesionales ni grabación de video. El organizador se reserva el derecho de admisión. En caso de cancelación, se procederá al reembolso según la política vigente. Menores de 16 años deben ir acompañados de un adulto. Prohibida la reventa.`
}

const router = useRouter()
const ticketSectionRef = ref<HTMLElement | null>(null)
const ticketsVisible = ref(true)

const quantities = ref<Record<string, number>>({
  general: 0,
  vip: 0,
  meet: 0
})

const totalTickets = computed(() => {
  return Object.values(quantities.value).reduce((a, b) => a + b, 0)
})

const subtotal = computed(() => {
  return eventData.tickets.reduce((total, ticket) => {
    return total + ticket.price * (quantities.value[ticket.id] || 0)
  }, 0)
})

const serviceFee = computed(() => {
  return subtotal.value * 0.1 // 10% gastos de gestión
})

const totalPrice = computed(() => {
  return subtotal.value + serviceFee.value
})

const selectedTickets = computed(() => {
  return eventData.tickets.filter((ticket) => quantities.value[ticket.id] > 0)
})

const isOnSale = computed(() => {
  return eventData.saleStatus === 'on-sale'
})

const minPrice = computed(() => {
  return Math.min(...eventData.tickets.map((t) => t.price))
})

const descriptionParagraphs = computed(() => {
  return eventData.description.split('\n\n').filter((p) => p.trim())
})

const handleQuantityChange = (ticketId: string, quantity: number) => {
  quantities.value = { ...quantities.value, [ticketId]: quantity }
}

const scrollToTickets = () => {
  ticketSectionRef.value?.scrollIntoView({ behavior: 'smooth' })
}

const handleCtaClick = () => {
  if (!ticketsVisible.value && totalTickets.value === 0) {
    scrollToTickets()
  } else if (totalTickets.value > 0) {
    const { setCheckoutData } = useCheckout()
    setCheckoutData({
      items: selectedTickets.value.map((ticket) => ({
        id: ticket.id,
        name: ticket.name,
        price: ticket.price,
        quantity: quantities.value[ticket.id]
      })),
      quantities: quantities.value,
      subtotal: subtotal.value,
      serviceFee: serviceFee.value,
      total: totalPrice.value,
      eventTitle: eventData.title,
      eventDate: eventData.date,
      eventVenue: `${eventData.venue}, ${eventData.city}`
    })
    router.push('/checkout')
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (ticketSectionRef.value) {
    observer = new IntersectionObserver(
      ([entry]) => {
        ticketsVisible.value = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(ticketSectionRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style lang="scss">
.EventPage {
  min-height: 100vh;
  background: var(--gradient-subtle);

  &-hero {
    padding: var(--spacing-xl) 0;
  }

  &-hero-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);

    @media (min-width: 768px) {
      flex-direction: row;
      gap: var(--spacing-xl);
      align-items: flex-start;
    }
  }

  &-image-wrapper {
    width: 100%;

    @media (min-width: 768px) {
      width: 280px;
      flex-shrink: 0;
    }

    @media (min-width: 1024px) {
      width: 360px;
    }
  }

  &-image-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    aspect-ratio: 750 / 420;
  }

  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-header {
    flex: 1;
    min-width: 0;
  }

  &-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-foreground);
    margin: 0 0 0 0;
    line-height: 1.2;

    @media (min-width: 768px) {
      font-size: 2.25rem;
    }

    @media (min-width: 1024px) {
      font-size: 3rem;
    }
  }

  &-subtitle {
    font-size: 1rem;
    color: var(--color-muted-foreground);
    margin: var(--spacing-sm) 0 0 0;

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  }

  &-info-desktop {
    display: none;
    margin-top: var(--spacing-lg);

    @media (min-width: 768px) {
      display: block;
    }
  }

  &-info-mobile {
    margin-bottom: var(--spacing-xl);

    @media (min-width: 768px) {
      display: none;
    }
  }

  &-main {
    padding-bottom: var(--spacing-xl);
  }

  &-grid {
    display: grid;
    gap: var(--spacing-lg);

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 340px;
      gap: var(--spacing-xl);
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  &-tickets {
    margin-bottom: var(--spacing-2xl);
  }

  &-tickets-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
  }

  &-section {
    margin-bottom: var(--spacing-xl);

    &--bordered {
      border-top: 1px solid var(--color-border);
      padding-top: var(--spacing-xl);
    }
  }

  &-section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-md) 0;
  }

  &-genres {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  &-description {
    max-width: 48rem;
  }

  &-description-paragraph {
    color: var(--color-muted-foreground);
    line-height: 1.75;
    margin-bottom: var(--spacing-md);
  }

  &-conditions {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    line-height: 1.75;
    max-width: 48rem;
  }

  &-summary {
    display: none;

    @media (min-width: 1024px) {
      display: block;
    }
  }

  &-summary-card {
    position: sticky;
    top: var(--spacing-lg);
    background-color: var(--color-card);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
  }

  &-summary-title {
    font-weight: 600;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-md) 0;
  }

  &-summary-items {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  &-summary-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
  }

  &-summary-item-name {
    color: var(--color-muted-foreground);
  }

  &-summary-item-price {
    font-weight: 500;
    color: var(--color-foreground);
  }

  &-summary-line {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    padding-top: var(--spacing-sm);
    border-top: 1px solid var(--color-border);
  }

  &-summary-label {
    color: var(--color-muted-foreground);
  }

  &-summary-value {
    color: var(--color-foreground);
  }

  &-summary-empty {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin-bottom: var(--spacing-md);
  }

  &-summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--color-border);
    padding-top: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  &-summary-total-label {
    font-weight: 600;
    color: var(--color-foreground);
  }

  &-summary-total-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-foreground);
  }

  &-cta-button {
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

  &-mobile-cta {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--color-border);
    padding: var(--spacing-md);
    z-index: 50;

    @media (min-width: 1024px) {
      display: none;
    }
  }

  &-mobile-cta-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);
  }

  &-mobile-cta-info {
    display: flex;
    flex-direction: column;
  }

  &-mobile-cta-tickets {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin: 0;
  }

  &-mobile-cta-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-foreground);
    margin: 0;
  }

  &-mobile-cta-from {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin: 0;
  }

  &-mobile-cta-button {
    padding: var(--spacing-md) var(--spacing-lg);
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color var(--transition-base);
    white-space: nowrap;

    &:hover:not(:disabled) {
      background-color: var(--color-primary-hover);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &-mobile-spacer {
    height: 96px;

    @media (min-width: 1024px) {
      display: none;
    }
  }
}
</style>

