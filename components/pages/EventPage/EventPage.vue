<template>
  <MicrositeLayout>
    <div class="EventPage">
      <!-- Loading State -->
      <div v-if="loading" class="EventPage-loading">
        <div class="container">
          <p>{{ trans('eventPage.loading') }}</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="EventPage-error">
        <div class="container">
          <p>{{ error }}</p>
        </div>
      </div>

      <!-- Event Content -->
      <template v-else-if="event!==null">
      <!-- Hero Section - Full Width (if image exists) -->
      <section v-if="hasHeroImage" class="EventPage-hero-full">
        <div class="EventPage-hero-image-wrapper">
          <img
            :src="eventImageUrl"
            :alt="event.title.valueForLocaleOrAutoFallback(currentLocale) || ''"
            class="EventPage-hero-image"
          />
        </div>
        <div class="container">
          <h1 class="EventPage-hero-title">{{ event?.title.valueForLocaleOrAutoFallback(currentLocale) || '' }}</h1>
          <p v-if="event?.subtitle && !event.subtitle.isEmpty() && event.subtitle.valueForLocaleOrAutoFallback(currentLocale)" class="EventPage-hero-subtitle">
            {{ event.subtitle.valueForLocaleOrAutoFallback(currentLocale) }}
          </p>
          
          <!-- Quick Info - Desktop -->
          <div class="EventPage-hero-info-desktop">
            <EventInfo
              :date="eventDate"
              :time="eventTime"
              :venue="eventVenue"
              :city="eventCity"
              :venue-address="eventVenueAddress"
              :venue-google-maps-url="eventVenueGoogleMapsUrl"
              :promoter="eventPromoter"
            />
          </div>
        </div>
      </section>

      <!-- Hero Section - Regular Layout (if no image) -->
      <section v-else class="EventPage-hero">
        <div class="container">
          <div class="EventPage-hero-content">
            <!-- Event Image -->
            <div class="EventPage-image-wrapper">
              <div class="EventPage-image-container">
                <img
                  :src="eventImageUrl || '/placeholder-event.jpg'"
                  :alt="event?.title.valueForLocaleOrAutoFallback(currentLocale) || ''"
                  class="EventPage-image"
                />
              </div>
            </div>

            <!-- Event Header Info -->
            <div class="EventPage-header">
              <SaleStatus
                v-if="event"
                :status="event.saleStatus"
                :close-date="eventTicketSaleClosesAt"
              />
              <h1 class="EventPage-title">{{ event?.title.valueForLocaleOrAutoFallback(currentLocale) || '' }}</h1>
              <p v-if="event?.subtitle && !event.subtitle.isEmpty() && event.subtitle.valueForLocaleOrAutoFallback(currentLocale)" class="EventPage-subtitle">
                {{ event.subtitle.valueForLocaleOrAutoFallback(currentLocale) }}
              </p>
              
              <!-- Quick Info - Desktop -->
              <div class="EventPage-info-desktop">
                <EventInfo
                  :date="eventDate"
                  :time="eventTime"
                  :venue="eventVenue"
                  :city="eventCity"
                  :venue-address="eventVenueAddress"
                  :venue-google-maps-url="eventVenueGoogleMapsUrl"
                  :promoter="eventPromoter"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <main class="EventPage-main">
        <div class="container">
          <!-- Event Info - Mobile only OR after hero image -->
          <section :class="hasHeroImage ? 'EventPage-info-after-hero' : 'EventPage-info-mobile'">
            <EventInfo
              :date="eventDate"
              :time="eventTime"
              :venue="eventVenue"
              :city="eventCity"
              :venue-address="eventVenueAddress"
              :venue-google-maps-url="eventVenueGoogleMapsUrl"
              :promoter="eventPromoter"
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
                    v-for="ticketType in publishedTicketTypes"
                    :key="ticketType.id.toString()"
                    :name="getTicketName(ticketType)"
                    :description="getTicketDescription(ticketType)"
                    :price="ticketType.price!"
                    :quantity="quantities[ticketType.id.toString()] || 0"
                    :available="ticketType.available"
                    @quantity-change="(qty: number) => handleQuantityChange(ticketType.id.toString(), qty)"
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
                      v-for="genre in eventMusicGenres"
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

                <!-- Minors Policy -->
                <section
                  v-if="eventHasMinorsPolicy"
                  class="EventPage-section"
                >
                  <h2 class="EventPage-section-title">{{ trans('eventPage.minors_policy') }}</h2>
                  <div class="EventPage-description">
                    <p
                      v-for="(paragraph, index) in minorsPolicyParagraphs"
                      :key="index"
                      class="EventPage-description-paragraph"
                    >
                      {{ paragraph }}
                    </p>
                  </div>
                  <div v-if="minorsPolicyFile" class="EventPage-file-download">
                    <a
                      :href="minorsPolicyFile.url.toString()"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="EventPage-file-link"
                    >
                      <Icon name="download" size="sm" class="EventPage-file-link-icon" />
                      {{ trans('eventPage.download_authorization_file') }}
                    </a>
                  </div>
                </section>

                <!-- Conditions -->
                <section class="EventPage-section EventPage-section--bordered">
                  <h2 class="EventPage-section-title">{{ trans('eventPage.conditions') }}</h2>
                  <p class="EventPage-conditions" v-html="formattedTerms"></p>
                </section>
              </div>
            </div>

            <!-- Right: Sticky Purchase Summary -->
            <aside v-if="isOnSale" class="EventPage-summary">
              <div class="EventPage-summary-card">
                <h3 class="EventPage-summary-title">{{ trans('eventPage.purchase_summary') }}</h3>
                
                <div v-if="selectedTicketTypes.length > 0" class="EventPage-summary-items">
                  <div
                    v-for="ticketType in selectedTicketTypes"
                    :key="ticketType.id.toString()"
                    class="EventPage-summary-item"
                  >
                    <span class="EventPage-summary-item-name">
                      {{ quantities[ticketType.id.toString()] }}x {{ getTicketName(ticketType) }}
                    </span>
                    <span class="EventPage-summary-item-price">
                      {{ ticketType.price!.multiply(quantities[ticketType.id.toString()]).formatted() }}
                    </span>
                  </div>
                  <div class="EventPage-summary-line">
                    <span class="EventPage-summary-label">{{ trans('eventPage.subtotal') }}</span>
                    <span class="EventPage-summary-value">{{ subtotal.formatted() }}</span>
                  </div>
                  <div class="EventPage-summary-line">
                    <span class="EventPage-summary-label">{{ trans('eventPage.service_fee') }}</span>
                    <span class="EventPage-summary-value">{{ serviceFee.formatted() }}</span>
                  </div>
                </div>
                <p v-else class="EventPage-summary-empty">
                  {{ trans('eventPage.no_tickets_selected') }}
                </p>

                <div class="EventPage-summary-total">
                  <span class="EventPage-summary-total-label">{{ trans('eventPage.total') }}</span>
                  <span class="EventPage-summary-total-value">{{ totalPrice.formatted() }}</span>
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
                {{ totalPrice.formatted() }}
              </p>
              <p v-else class="EventPage-mobile-cta-from">
                {{ trans('eventPage.from') }} {{ minPrice.formatted() }}
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
import ButtonCustom from '../../ui/button-custom/ButtonCustom.vue'
import Icon from '../../ui/icon/Icon.vue'
import { useCheckout } from '../../../composables/useCheckout'
import { useAppLanguage } from '../../../composables/useAppLanguage'
import { findEventBySlug } from '../../../model/Event/Event.services'
import type { Event as EventModel } from '../../../model/Event/Event'
import { findVenueById } from '../../../model/Venue/Venue.services'
import { findPromoterProfileById } from '../../../model/PromoterProfile/PromoterProfile.services'
import { findTicketTypesByEvent } from '../../../model/TicketType/TicketType.services'
import type { TicketType } from '../../../model/TicketType/TicketType'
import { findFileById } from '../../../model/File/File.services'
import type { File as FileModel } from '../../../model/File/File'
import type { Venue } from '../../../model/Venue/Venue'
import type { PromoterProfile } from '../../../model/PromoterProfile/PromoterProfile'
import { StringMultilanguage } from '../../../model/Shared/StringMultilanguage'
import { Locale } from '../../../model/Shared/Locale'
import { Money } from '../../../model/Shared/Money'
import { Currency } from '../../../model/Shared/Currency'
import eventPageTranslations from './event-page.i18n.json'
import { translationService } from '../../../services/translation.service'

const props = defineProps<{
  slug: string
}>()

// Load translations
translationService.addTranslations('eventPage', eventPageTranslations)

// Use translation composable
const { trans, appLanguage } = useAppLanguage()

const loading = ref(true)
const error = ref<string | null>(null)
const event = ref<EventModel | null>(null)
const venue = ref<Venue | null>(null)
const promoterProfile = ref<PromoterProfile | null>(null)
const ticketTypes = ref<TicketType[]>([])
const minorsPolicyFile = ref<FileModel | null>(null)
const currency = ref<Currency>(Currency.EUR)

const currentLocale = computed(() => Locale.fromString(appLanguage.value))

const getTicketName = (ticket: TicketType): string => {
  if (!ticket.name || ticket.name.isEmpty()) return ''
  return ticket.name.valueForLocaleOrAutoFallback(currentLocale.value) || ''
}

const getTicketDescription = (ticket: TicketType): string => {
  if (!ticket.description || ticket.description.isEmpty()) return ''
  return ticket.description.valueForLocaleOrAutoFallback(currentLocale.value) || ''
}

const publishedTicketTypes = computed(() => {
  return ticketTypes.value.filter(tt => tt.isPublished) as TicketType[]
})


const eventDate = computed(() => {
  return event.value ? formatDates(event.value.dates) : ''
})

const eventTime = computed(() => {
  if (!event.value) return ''
  if (!event.value.startTime) return ''
  const timeStr = formatTime(event.value.startTime as import('../../../model/Shared/Time').Time)
  const doorsTime = event.value.doorsOpenTime ? ` (Apertura de puertas: ${formatTime(event.value.doorsOpenTime as import('../../../model/Shared/Time').Time)})` : ''
  return `${timeStr}${doorsTime}`
})

const eventVenue = computed(() => {
  return venue.value?.name || trans('eventPage.venue_to_confirm')
})

const eventCity = computed(() => {
  return venue.value?.city || (venue.value?.countryCode ? venue.value.countryCode.toString() : (event.value?.countryCode ? event.value.countryCode.toString() : ''))
})

const eventVenueAddress = computed(() => {
  return venue.value?.address || undefined
})

const eventVenueGoogleMapsUrl = computed(() => {
  if (!venue.value?.coords) return undefined
  return `https://www.google.com/maps?q=${venue.value.coords.latitude()},${venue.value.coords.longitude()}`
})

const eventPromoter = computed(() => {
  return promoterProfile.value?.brandName || (event.value?.promoterProfileId ? trans('eventPage.organizer_to_confirm') : (event.value?.promoterId ? event.value.promoterId.toString() : ''))
})

const eventTicketSaleClosesAt = computed(() => {
  return event.value?.ticketSaleClosesAt ? formatDate(event.value.ticketSaleClosesAt) : undefined
})

const eventMusicGenres = computed(() => {
  return event.value?.musicGenres || []
})

const eventDescription = computed(() => {
  if (!event.value || !event.value.description || event.value.description.isEmpty()) return ''
  return event.value.description.valueForLocaleOrAutoFallback(currentLocale.value) || ''
})

const eventTerms = computed(() => {
  if (!event.value || !event.value.terms || event.value.terms.isEmpty()) return ''
  return event.value.terms.valueForLocaleOrAutoFallback(currentLocale.value) || ''
})

const eventImageUrl = computed(() => {
  return event.value?.imageUrl ? event.value.imageUrl.toString() : undefined
})

const eventHasMinorsPolicy = computed(() => {
  return event.value?.hasMinorsPolicy || false
})

const eventMinorsPolicyDescription = computed(() => {
  if (!event.value || !event.value.minorsPolicyDescription || event.value.minorsPolicyDescription.isEmpty()) return ''
  return event.value.minorsPolicyDescription.valueForLocaleOrAutoFallback(currentLocale.value) || ''
})

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

const formattedTerms = computed(() => {
  return (eventTerms.value ?? '').replace(/\n/g, '<br />')
})

const hasHeroImage = computed(() => {
  return !!eventImageUrl.value
})

const formatDates = (dates: Date[]): string => {
  if (!dates || dates.length === 0) return ''
  if (dates.length === 1) return formatDate(dates[0])
  return [dates[0], dates[1]].map((d) => formatDate(d)).filter(Boolean).join(' · ')
}


const loadEvent = async () => {
  loading.value = true
  error.value = null
  
  try {
    const eventModel = await findEventBySlug(props.slug)
    
    const venueName = trans('eventPage.venue_to_confirm')
    const venueCity = eventModel.countryCode ? eventModel.countryCode.toString() : ''
    const organizerName = eventModel.promoterProfileId 
      ? trans('eventPage.organizer_to_confirm')
      : eventModel.promoterId.toString()
    
    event.value = eventModel
    
    loading.value = false
    
    loadVenueAndOrganizer(eventModel)
    loadTicketTypes(eventModel.id.toString())
    if (eventModel.hasMinorsPolicy && eventModel.minorsPolicyAthorizationFileId) {
      loadMinorsPolicyFile(eventModel.minorsPolicyAthorizationFileId.toString())
    }
  } catch (err) {
    error.value = 'Error al cargar el evento'
    console.error('Error loading event:', err)
    loading.value = false
  }
}

const loadVenueAndOrganizer = async (eventModel: EventModel) => {
  const promises: Promise<void>[] = []
  
  if (eventModel.venueId) {
    promises.push(
      findVenueById(eventModel.venueId.toString())
        .then((venueData) => {
          venue.value = venueData
        })
        .catch((venueErr) => {
          console.warn('Error loading venue:', venueErr)
        })
    )
  }

  if (eventModel.promoterProfileId) {
    promises.push(
      findPromoterProfileById(eventModel.promoterProfileId.toString())
        .then((profileData) => {
          promoterProfile.value = profileData
        })
        .catch((profileErr) => {
          console.warn('Error loading promoter profile:', profileErr)
        })
    )
  }
  
  await Promise.all(promises)
}

const loadMinorsPolicyFile = async (fileId: string) => {
  try {
    const file = await findFileById(fileId)
    minorsPolicyFile.value = file
  } catch (err) {
    console.warn('Error loading minors policy file:', err)
  }
}

const loadTicketTypes = async (eventId: string) => {
  try {
    const loadedTicketTypes = await findTicketTypesByEvent(eventId)
    ticketTypes.value = loadedTicketTypes
    
    const published = loadedTicketTypes.filter(tt => tt.isPublished)
    const firstTicketTypeWithPrice = published.find(tt => tt.price !== null)
    
    if (!firstTicketTypeWithPrice || !firstTicketTypeWithPrice.price) {
      throw new Error('No ticket type with price found')
    }
    
    currency.value = firstTicketTypeWithPrice.price.currency()
    
    const initialQuantities: Record<string, number> = {}
    published.forEach(ticketType => {
      initialQuantities[ticketType.id.toString()] = 0
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

const subtotal = computed((): Money => {
  if (publishedTicketTypes.value.length === 0) {
    throw new Error('Cannot calculate subtotal without tickets')
  }
  const firstTicketType = publishedTicketTypes.value[0]
  if (!firstTicketType.price) {
    throw new Error('First ticket type must have a price')
  }
  const initialTotal = Money.zero(firstTicketType.price.currency())
  return publishedTicketTypes.value.reduce((total: Money, ticketType) => {
    if (!ticketType.price) return total
    const quantity = quantities.value[ticketType.id.toString()] || 0
    if (quantity === 0) return total
    const ticketPrice = ticketType.price as Money
    const multipliedPrice = (ticketPrice as any).multiply(quantity) as Money
    return (total as any).add(multipliedPrice) as Money
  }, initialTotal)
})

const serviceFee = computed((): Money => {
  return (subtotal.value as any).multiply(0.1) as Money // 10% gastos de gestión
})

const totalPrice = computed((): Money => {
  return (subtotal.value as any).add(serviceFee.value) as Money
})

const selectedTicketTypes = computed(() => {
  return publishedTicketTypes.value.filter((ticketType) => quantities.value[ticketType.id.toString()] > 0)
})

const isOnSale = computed(() => {
  return event.value?.saleStatus === 'on-sale'
})

const minPrice = computed(() => {
  if (publishedTicketTypes.value.length === 0) {
    return Money.zero(currency.value)
  }
  const ticketTypesWithPrice = publishedTicketTypes.value.filter(tt => tt.price !== null)
  if (ticketTypesWithPrice.length === 0) {
    return Money.zero(currency.value)
  }
  return ticketTypesWithPrice.reduce((min, ticketType) => {
    if (!ticketType.price) return min
    return ticketType.price.amount() < min.amount() ? ticketType.price : min
  }, ticketTypesWithPrice[0].price!)
})

const descriptionParagraphs = computed(() => {
  return (eventDescription.value ?? '').split('\n\n').filter((p) => p.trim())
})

const minorsPolicyParagraphs = computed(() => {
  if (!eventMinorsPolicyDescription.value) return []
  return eventMinorsPolicyDescription.value.split('\n\n').filter((p) => p.trim())
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
      items: selectedTicketTypes.value.map((ticketType) => ({
        id: ticketType.id.toString(),
        name: getTicketName(ticketType),
        price: ticketType.price!.amount(),
        quantity: quantities.value[ticketType.id.toString()]
      })),
      quantities: quantities.value,
      subtotal: subtotal.value.amount(),
      serviceFee: serviceFee.value.amount(),
      total: totalPrice.value.amount(),
      eventTitle: event.value?.title.valueForLocaleOrAutoFallback(currentLocale.value) || '',
      eventDate: eventDate.value,
      eventVenue: `${eventVenue.value}, ${eventCity.value}`
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

  &-hero-full {
    width: 100%;
    padding-top: var(--spacing-md);
    margin-bottom: var(--spacing-xl);

    @media (min-width: 768px) {
      margin-bottom: var(--spacing-2xl);
    }
  }

  &-hero-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 21 / 9;
    overflow: hidden;
    border-radius: var(--radius-lg);
    margin: 0 auto;
    max-width: 1280px;
    padding: 0 var(--spacing-md);

    @media (min-width: 768px) {
      aspect-ratio: 3 / 1;
      padding: 0 var(--spacing-md);
    }
  }

  &-hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-lg);
  }

  &-hero-status {
    position: absolute;
    bottom: var(--spacing-md);
    left: var(--spacing-xl);

    @media (min-width: 768px) {
      bottom: var(--spacing-lg);
      left: var(--spacing-2xl);
    }
  }

  &-hero-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-foreground);
    margin: var(--spacing-lg) 0 0 0;
    line-height: 1.2;

    @media (min-width: 768px) {
      font-size: 2rem;
    }

    @media (min-width: 1024px) {
      font-size: 2.5rem;
    }
  }

  &-hero-subtitle {
    font-size: 1rem;
    color: var(--color-muted-foreground);
    margin: var(--spacing-sm) 0 0 0;

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  }

  &-hero-info-desktop {
    display: none;
    margin-top: var(--spacing-lg);

    @media (min-width: 768px) {
      display: block;
    }
  }

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

  &-info-after-hero {
    margin-bottom: var(--spacing-xl);
    margin-top: var(--spacing-lg);

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

  &-file-download {
    margin-top: var(--spacing-md);
  }

  &-file-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    transition: color var(--transition-base);

    &:hover {
      color: var(--color-primary-hover);
      text-decoration: underline;
    }

    &-icon {
      flex-shrink: 0;
    }
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

