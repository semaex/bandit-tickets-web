<template>
  <MicrositeLayout>
    <div class="EventPage">
      <!-- Loading State -->
      <div v-if="loading" class="EventPage-loading">
        <div class="container">
          <p>{{ trans('eventPage.loading') || 'Cargando evento...' }}</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="EventPage-error">
        <div class="container">
          <p>{{ error }}</p>
        </div>
      </div>

      <!-- Event Content -->
      <template v-else>
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
                  :venue-address="eventData.venueAddress"
                  :venue-google-maps-url="eventData.venueGoogleMapsUrl"
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
              :venue-address="eventData.venueAddress"
              :venue-google-maps-url="eventData.venueGoogleMapsUrl"
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

                <ButtonCustom
                  type="primary"
                  :disabled="totalTickets === 0"
                  :full-width="true"
                  @click="handleCtaClick"
                >
                  {{ totalTickets > 0 ? trans('eventPage.continue_to_payment') : trans('eventPage.select_tickets_button') }}
                </ButtonCustom>
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
            <ButtonCustom
              type="primary"
              :disabled="totalTickets === 0"
              @click="handleCtaClick"
            >
              {{ totalTickets > 0 ? trans('eventPage.continue_to_payment') : trans('eventPage.select_tickets_button_mobile') }}
            </ButtonCustom>
          </div>
        </div>
      </div>

      <!-- Footer spacer for mobile CTA -->
      <div v-if="isOnSale" class="EventPage-mobile-spacer"></div>
      </template>
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
import ButtonCustom from '../../ui/ButtonCustom.vue'
import { useCheckout } from '../../../composables/useCheckout'
import { useAppLanguage } from '../../../composables/useAppLanguage'
import { findEventBySlug } from '../../../model/Event/Event.services'
import type { Event as EventModel } from '../../../model/Event/Event'
import { findVenueById } from '../../../model/Venue/Venue.services'
import { findPromoterProfileById } from '../../../model/PromoterProfile/PromoterProfile.services'
import { findTicketTypesByEvent } from '../../../model/TicketType/TicketType.services'
import { StringMultilanguage } from '../../../model/Shared/StringMultilanguage'
import { Locale } from '../../../model/Shared/Locale'
import eventPageTranslations from './event-page.i18n.json'
import { translationService } from '../../../services/translation.service'

const props = defineProps<{
  slug: string
}>()

// Load translations
translationService.addTranslations('eventPage', eventPageTranslations)

// Use translation composable
const { trans, appLanguage } = useAppLanguage()

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
  venueAddress?: string
  venueGoogleMapsUrl?: string
  promoter: string
  saleStatus: 'on-sale' | 'coming-soon' | 'closed'
  closeDate?: string
  genres: string[]
  description: string
  conditions: string
  tickets: Ticket[]
  image?: string
}

const loading = ref(true)
const error = ref<string | null>(null)
const eventData = ref<EventData>({
  title: '',
  date: '',
  time: '',
  venue: '',
  city: '',
  promoter: '',
  saleStatus: 'coming-soon',
  genres: [],
  description: '',
  conditions: '',
  tickets: []
})

const getLocalizedText = (text: StringMultilanguage | null, fallback: string = ''): string => {
  if (!text || text.isEmpty()) return fallback
  
  const currentLocale = Locale.fromString(appLanguage.value)
  const fallbackLocale = Locale.fromString('es-ES')
  
  return text.valueWithFallback(currentLocale, fallbackLocale) || fallback
}

const formatDate = (date: Date | null): string => {
  if (!date) return ''
  try {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return ''
  }
}

const formatTime = (time: import('../../../model/Shared/Time').Time | null): string => {
  if (!time) return ''
  return time.toShortString() + 'h'
}

const formatDates = (dates: Date[]): string => {
  if (!dates || dates.length === 0) return ''
  if (dates.length === 1) return formatDate(dates[0])
  return [dates[0], dates[1]].map((d) => formatDate(d)).filter(Boolean).join(' · ')
}


const loadEvent = async () => {
  loading.value = true
  error.value = null
  
  try {
    const event = await findEventBySlug(props.slug)
    
    const venueName = trans('eventPage.venue_to_confirm')
    const venueCity = event.countryCode ? event.countryCode.toString() : ''
    const organizerName = event.promoterProfileId 
      ? trans('eventPage.organizer_to_confirm')
      : event.promoterId.toString()
    
    eventData.value = {
      title: getLocalizedText(event.title, 'Evento sin título'),
      subtitle: getLocalizedText(event.subtitle),
      date: formatDates(event.dates),
      time: event.startTime 
        ? `${formatTime(event.startTime)}${event.doorsOpenTime ? ` (Apertura de puertas: ${formatTime(event.doorsOpenTime)})` : ''}`
        : '',
      venue: venueName,
      city: venueCity,
      venueAddress: undefined,
      venueGoogleMapsUrl: undefined,
      promoter: organizerName,
      saleStatus: event.saleStatus,
      closeDate: event.ticketSaleClosesAt ? formatDate(event.ticketSaleClosesAt) : undefined,
      genres: event.musicGenres || [],
      description: getLocalizedText(event.description, ''),
      conditions: getLocalizedText(event.terms, ''),
      tickets: [],
      image: event.imageUrl ? event.imageUrl.toString() : undefined
    }
    
    loading.value = false
    
    loadVenueAndOrganizer(event)
    loadTicketTypes(event.id.toString())
    
    const initialQuantities: Record<string, number> = {}
    eventData.value.tickets.forEach(ticket => {
      initialQuantities[ticket.id] = 0
    })
    quantities.value = initialQuantities
  } catch (err) {
    error.value = 'Error al cargar el evento'
    console.error('Error loading event:', err)
    loading.value = false
  }
}

const loadVenueAndOrganizer = async (event: EventModel) => {
  const promises: Promise<void>[] = []
  
  if (event.venueId) {
    promises.push(
      findVenueById(event.venueId.toString())
        .then((venue) => {
          const venueGoogleMapsUrl = venue.coords 
            ? `https://www.google.com/maps?q=${venue.coords.latitude()},${venue.coords.longitude()}`
            : undefined
          
          eventData.value = {
            ...eventData.value,
            venue: venue.name,
            city: venue.city || (venue.countryCode ? venue.countryCode.toString() : eventData.value.city),
            venueAddress: venue.address || undefined,
            venueGoogleMapsUrl: venueGoogleMapsUrl
          }
        })
        .catch((venueErr) => {
          console.warn('Error loading venue:', venueErr)
        })
    )
  }

  if (event.promoterProfileId) {
    promises.push(
      findPromoterProfileById(event.promoterProfileId.toString())
        .then((profile) => {
          eventData.value = {
            ...eventData.value,
            promoter: profile.brandName
          }
        })
        .catch((profileErr) => {
          console.warn('Error loading promoter profile:', profileErr)
        })
    )
  }
  
  await Promise.all(promises)
}

const loadTicketTypes = async (eventId: string) => {
  try {
    const ticketTypes = await findTicketTypesByEvent(eventId)
    
    const currentLocale = Locale.fromString(appLanguage.value)
    const fallbackLocale = Locale.fromString('es-ES')
    
    eventData.value = {
      ...eventData.value,
      tickets: ticketTypes
        .filter(tt => tt.isPublished)
        .map(tt => ({
          id: tt.id.toString(),
          name: getLocalizedText(tt.name, 'Entrada sin nombre'),
          description: getLocalizedText(tt.description, ''),
          price: tt.price ? tt.price.amount() : 0,
          available: tt.available
        }))
    }
    
    const initialQuantities: Record<string, number> = {}
    eventData.value.tickets.forEach(ticket => {
      initialQuantities[ticket.id] = 0
    })
    quantities.value = initialQuantities
  } catch (err) {
    console.warn('Error loading ticket types:', err)
  }
}

onMounted(() => {
  loadEvent()
})

const router = useRouter()
const ticketSectionRef = ref<HTMLElement | null>(null)
const ticketsVisible = ref(true)

const quantities = ref<Record<string, number>>({})

const totalTickets = computed(() => {
  return Object.values(quantities.value).reduce((a, b) => a + b, 0)
})

const subtotal = computed(() => {
  return eventData.value.tickets.reduce((total: number, ticket) => {
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
  return eventData.value.tickets.filter((ticket) => quantities.value[ticket.id] > 0)
})

const isOnSale = computed(() => {
  return eventData.value.saleStatus === 'on-sale'
})

const minPrice = computed(() => {
  if (eventData.value.tickets.length === 0) return 0
  return Math.min(...eventData.value.tickets.map((t) => t.price))
})

const descriptionParagraphs = computed(() => {
  return eventData.value.description.split('\n\n').filter((p) => p.trim())
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
      eventTitle: eventData.value.title,
      eventDate: eventData.value.date,
      eventVenue: `${eventData.value.venue}, ${eventData.value.city}`
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

  &-mobile-spacer {
    height: 96px;

    @media (min-width: 1024px) {
      display: none;
    }
  }

  &-loading,
  &-error {
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xl) 0;
    text-align: center;
  }

  &-loading {
    p {
      color: var(--color-muted-foreground);
      font-size: 1.125rem;
    }
  }

  &-error {
    p {
      color: var(--color-error, #ef4444);
      font-size: 1.125rem;
      font-weight: 500;
    }
  }
}
</style>

