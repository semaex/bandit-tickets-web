<template>
  <MicrositeLayout>
    <div class="EventPage">
      <!-- Loading State -->
      <div v-if="loading" class="EventPage-loading">
        <div class="container">
          <Loader />
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="EventPage-error">
        <div class="container">
          <p>{{ error }}</p>
        </div>
      </div>

      <!-- Event Content -->
      <template v-else-if="eventView!==null">
      <!-- Hero Section - Full Width (if image exists) -->
      <section v-if="hasHeroImage" class="EventPage-hero-full">
        <div class="EventPage-hero-image-wrapper">
          <img
            :src="eventImageUrl"
            :alt="eventView.title.valueForLocaleOrAutoFallback(currentLocale) || ''"
            class="EventPage-hero-image"
          />
        </div>
        <div class="container">
          <h1 class="EventPage-hero-title">{{ eventView?.title.valueForLocaleOrAutoFallback(currentLocale) || '' }}</h1>
          <p v-if="eventView?.subtitle && !eventView.subtitle.isEmpty() && eventView.subtitle.valueForLocaleOrAutoFallback(currentLocale)" class="EventPage-hero-subtitle">
            {{ eventView.subtitle.valueForLocaleOrAutoFallback(currentLocale) }}
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
                  :alt="eventView?.title.valueForLocaleOrAutoFallback(currentLocale) || ''"
                  class="EventPage-image"
                />
              </div>
            </div>

            <!-- Event Header Info -->
            <div class="EventPage-header">
              <h1 class="EventPage-title">{{ eventView?.title.valueForLocaleOrAutoFallback(currentLocale) || '' }}</h1>
              <p v-if="eventView?.subtitle && !eventView.subtitle.isEmpty() && eventView.subtitle.valueForLocaleOrAutoFallback(currentLocale)" class="EventPage-subtitle">
                {{ eventView.subtitle.valueForLocaleOrAutoFallback(currentLocale) }}
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
                  <div v-if="minorsPolicyFileView" class="EventPage-file-download">
                    <a
                      :href="minorsPolicyFileView.url.toString()"
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

                <!-- Purchase Info -->
                <section v-if="buyerSupportView" class="EventPage-section EventPage-section--bordered">
                  <EventPurchaseInfo
                    :buyer-support-view="buyerSupportView"
                  />
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
                  <div v-if="selectedTicketTypes.length > 1 && !serviceFee.isZero()" class="EventPage-summary-line">
                    <span class="EventPage-summary-label">{{ trans('eventPage.subtotal') }}</span>
                    <span class="EventPage-summary-value">{{ subtotal.formatted() }}</span>
                  </div>
                  <div class="EventPage-summary-line">
                    <span class="EventPage-summary-label">{{ serviceFeeLabel }}</span>
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

<script lang="ts">
import { defineComponent, nextTick } from 'vue'

import MicrositeLayout from '../../layout/MicrositeLayout/MicrositeLayout.vue'
import EventInfo from '../../common/EventInfo/EventInfo.vue'
import TicketCard from '../../common/TicketCard/TicketCard.vue'
import GenreChip from '../../common/GenreChip/GenreChip.vue'
import EventPurchaseInfo from '../../common/EventPurchaseInfo/EventPurchaseInfo.vue'
import ButtonCustom from '../../ui/button-custom/ButtonCustom.vue'
import Icon from '../../ui/icon/Icon.vue'
import Loader from '../../ui/loader/Loader.vue'

import { useCheckout } from '../../../composables/useCheckout'
import { useAppLocale } from '../../../composables/useAppLocale'

import { findEventPurchaseViewBySlug } from '../../../public-model/Event/EventView.services'
import type { EventPurchaseView } from '../../../public-model/Event/EventPurchaseView'
import type { EventBuyerSupportView } from '../../../public-model/Event/EventBuyerSupportView'
import { findTicketTypeViewsByEvent } from '../../../public-model/TicketType/TicketTypeView.services'
import type { TicketTypeView } from '../../../public-model/TicketType/TicketTypeView'
import { findFileViewById } from '../../../public-model/File/FileView.services'
import type { FileView } from '../../../public-model/File/FileView'

import { Locale } from '../../../shared/Locale'
import { Money } from '../../../shared/Money'
import { Currency } from '../../../shared/Currency'

import eventPageTranslations from './event-page.i18n.json'
import { translationService } from '../../../services/translation.service'

translationService.addTranslations('eventPage', eventPageTranslations)

export default defineComponent({
  name: 'EventPage',

  components: {
    MicrositeLayout,
    EventInfo,
    TicketCard,
    GenreChip,
    EventPurchaseInfo,
    ButtonCustom,
    Icon,
    Loader
  },

  props: {
    slug: {
      type: String,
      required: true
    }
  },

  data () {
    // NOTE: usamos composable aquí para exponer `trans` + `appLanguage` a Options API
    const { trans, appLocale } = useAppLocale()

    return {
      // i18n
      trans,
      appLanguage: appLocale,

      // state
      loading: true,
      error: null as string | null,

      eventPurchaseView: null as EventPurchaseView | null,
      ticketTypeViews: [] as TicketTypeView[],
      minorsPolicyFileView: null as FileView | null,

      currency: Currency.EUR as Currency,
      quantities: {} as Record<string, number>,

      ticketsVisible: true,
      observer: null as IntersectionObserver | null
    }
  },

  computed: {
    currentLocale (): Locale {
      return Locale.fromString(this.appLanguage)
    },

    eventView () {
      return this.eventPurchaseView?.eventView || null
    },

    venueView () {
      return this.eventPurchaseView?.venueView || null
    },

    promoterProfileView () {
      return this.eventPurchaseView?.promoterProfileView || null
    },

    publishedTicketTypes (): TicketTypeView[] {
      return this.ticketTypeViews.filter(tt => tt.isPublished) as TicketTypeView[]
    },

    eventDate (): string {
      return this.eventView ? this.formatDates(this.eventView.dates) : ''
    },

    eventTime (): string {
      if (!this.eventView?.startTime) return ''
      const timeStr = this.formatTime(this.eventView.startTime as import('../../../shared/Time').Time)
      const doorsTime = this.eventView.doorsOpenTime
        ? ` (Apertura de puertas: ${this.formatTime(this.eventView.doorsOpenTime as import('../../../shared/Time').Time)})`
        : ''
      return `${timeStr}${doorsTime}`
    },

    eventVenue (): string {
      return this.venueView?.name || this.trans('eventPage.venue_to_confirm')
    },

    eventCity (): string {
      return this.venueView?.city
        || (this.venueView?.countryCode ? this.venueView.countryCode.toString() : (this.eventView?.countryCode ? this.eventView.countryCode.toString() : ''))
    },

    eventVenueAddress (): string | undefined {
      return this.venueView?.address || undefined
    },

    eventVenueGoogleMapsUrl (): string | undefined {
      if (!this.venueView?.coords) return undefined
      return `https://www.google.com/maps?q=${this.venueView.coords.latitude()},${this.venueView.coords.longitude()}`
    },

    eventPromoter (): string {
      return this.promoterProfileView?.brandName || (this.eventView?.promoterProfileId ? this.trans('eventPage.organizer_to_confirm') : '')
    },

    eventMusicGenres (): string[] {
      return this.eventView?.musicGenres || []
    },

    eventDescription (): string {
      if (!this.eventView?.description || this.eventView.description.isEmpty()) return ''
      return this.eventView.description.valueForLocaleOrAutoFallback(this.currentLocale) || ''
    },

    eventTerms (): string {
      if (!this.eventView?.terms || this.eventView.terms.isEmpty()) return ''
      return this.eventView.terms.valueForLocaleOrAutoFallback(this.currentLocale) || ''
    },

    formattedTerms (): string {
      return (this.eventTerms ?? '').replace(/\n/g, '<br />')
    },

    eventImageUrl (): string | undefined {
      return this.eventView?.imageUrl ? this.eventView.imageUrl.toString() : undefined
    },

    hasHeroImage (): boolean {
      return !!this.eventImageUrl
    },

    eventHasMinorsPolicy (): boolean {
      return this.eventView?.hasMinorsPolicy || false
    },

    eventMinorsPolicyDescription (): string {
      if (!this.eventView?.minorsPolicyDescription || this.eventView.minorsPolicyDescription.isEmpty()) return ''
      return this.eventView.minorsPolicyDescription.valueForLocaleOrAutoFallback(this.currentLocale) || ''
    },

    descriptionParagraphs (): string[] {
      return (this.eventDescription ?? '').split('\n\n').filter((p: string) => p.trim())
    },

    minorsPolicyParagraphs (): string[] {
      if (!this.eventMinorsPolicyDescription) return []
      return this.eventMinorsPolicyDescription.split('\n\n').filter((p: string) => p.trim())
    },

    totalTickets (): number {
      return Object.values(this.quantities).reduce((a, b) => a + b, 0)
    },

    subtotal (): Money {
      const tickets = this.publishedTicketTypes
      if (tickets.length === 0 || !tickets[0].price) {
        return Money.zero(this.currency)
      }

      return tickets.reduce((total: Money, ticketType: TicketTypeView) => {
        if (!ticketType.price) return total
        const quantity = this.quantities[ticketType.id.toString()] || 0
        if (quantity === 0) return total
        return (total as any).add((ticketType.price as any).multiply(quantity)) as Money
      }, Money.zero(tickets[0].price.currency()))
    },

    serviceFee (): Money {
      if (!this.eventPurchaseView) return Money.zero(this.currency)
      const feeDecimal = this.eventPurchaseView.buyerFeePercent / 100
      return (this.subtotal as any).multiply(feeDecimal) as Money
    },

    serviceFeeLabel (): string {
      const baseLabel = this.trans('eventPage.service_fee')
      const percent = this.eventPurchaseView?.buyerFeePercent ?? 0
      return percent > 0 ? `${baseLabel} (${percent}%)` : baseLabel
    },

    totalPrice (): Money {
      return (this.subtotal as any).add(this.serviceFee) as Money
    },

    selectedTicketTypes (): TicketTypeView[] {
      return this.publishedTicketTypes.filter((ticketType) => (this.quantities[ticketType.id.toString()] || 0) > 0)
    },

    isOnSale (): boolean {
      return true
    },

    minPrice (): Money {
      const tickets = this.publishedTicketTypes.filter(tt => tt.price !== null)
      if (tickets.length === 0) return Money.zero(this.currency)

      const first = tickets.find(t => t.price) || null
      if (!first?.price) return Money.zero(this.currency)

      return tickets.reduce((min, ticketType) => {
        if (!ticketType.price) return min
        return ticketType.price.amount() < min.amount() ? ticketType.price : min
      }, first.price)
    },

    buyerSupportView (): EventBuyerSupportView | null {
      return (this.eventPurchaseView?.buyerSupportView as EventBuyerSupportView) || null
    }
  },

  mounted () {
    this.loadEvent()

    // el ref existe después del render
    nextTick(() => {
      this.setupObserver()
    })
  },

  beforeUnmount () {
    this.teardownObserver()
  },

  methods: {
    getTicketName (ticket: TicketTypeView): string {
      if (!ticket.name || ticket.name.isEmpty()) return ''
      return ticket.name.valueForLocaleOrAutoFallback(this.currentLocale) || ''
    },

    getTicketDescription (ticket: TicketTypeView): string {
      if (!ticket.description || ticket.description.isEmpty()) return ''
      return ticket.description.valueForLocaleOrAutoFallback(this.currentLocale) || ''
    },

    formatDate (date: Date | null): string {
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
    },

    formatTime (time: import('../../../shared/Time').Time | null): string {
      if (!time) return ''
      return time.toShortString() + 'h'
    },

    formatDates (dates: Date[]): string {
      if (!dates || dates.length === 0) return ''
      if (dates.length === 1) return this.formatDate(dates[0])
      return [dates[0], dates[1]].map(d => this.formatDate(d)).filter(Boolean).join(' · ')
    },

    async loadEvent () {
      this.loading = true
      this.error = null

      try {
        const purchaseView = await findEventPurchaseViewBySlug(this.slug)
        this.eventPurchaseView = purchaseView

        if (purchaseView.eventView) {
          await this.loadTicketTypes(purchaseView.eventView.id.toString())

          // OJO: mantengo tu nombre tal cual (parece typo en el modelo)
          const fileId = (purchaseView.eventView as any).minorsPolicyAthorizationFileId
          if (purchaseView.eventView.hasMinorsPolicy && fileId) {
            await this.loadMinorsPolicyFile(fileId.toString())
          }
        }
      } catch (err) {
        this.error = 'Error al cargar el evento'
        console.error('Error loading event:', err)
      } finally {
        this.loading = false
      }
    },

    async loadMinorsPolicyFile (fileId: string) {
      try {
        this.minorsPolicyFileView = await findFileViewById(fileId)
      } catch (err) {
        console.warn('Error loading minors policy file:', err)
      }
    },

    async loadTicketTypes (eventId: string) {
      try {
        const loadedTicketTypes = await findTicketTypeViewsByEvent(eventId)
        this.ticketTypeViews = loadedTicketTypes

        const published = loadedTicketTypes.filter((tt: TicketTypeView) => tt.isPublished)
        const firstTicketTypeWithPrice = published.find((tt: TicketTypeView) => tt.price !== null)

        if (firstTicketTypeWithPrice?.price) {
          this.currency = firstTicketTypeWithPrice.price.currency()
        }

        const { getCheckoutData } = useCheckout()
        const savedCheckout = getCheckoutData()

        const initialQuantities: Record<string, number> = {}
        published.forEach((ticketType: TicketTypeView) => {
          const ticketId = ticketType.id.toString()
          if (savedCheckout && savedCheckout.eventSlug === this.slug && savedCheckout.quantities[ticketId] !== undefined) {
            initialQuantities[ticketId] = savedCheckout.quantities[ticketId]
          } else {
            initialQuantities[ticketId] = 0
          }
        })
        this.quantities = initialQuantities
      } catch (err) {
        console.warn('Error loading ticket types:', err)
      }
    },

    handleQuantityChange (ticketId: string, quantity: number) {
      this.quantities = { ...this.quantities, [ticketId]: quantity }
    },

    scrollToTickets () {
      const el = this.$refs.ticketSectionRef as HTMLElement | undefined
      el?.scrollIntoView({ behavior: 'smooth' })
    },

    handleCtaClick () {
      if (!this.ticketsVisible && this.totalTickets === 0) {
        this.scrollToTickets()
        return
      }

      if (this.totalTickets > 0) {
        const { setCheckoutData } = useCheckout()
        setCheckoutData({
          items: this.selectedTicketTypes.map((ticketType: TicketTypeView) => ({
            id: ticketType.id.toString(),
            name: this.getTicketName(ticketType),
            price: ticketType.price!,
            quantity: this.quantities[ticketType.id.toString()]
          })),
          quantities: this.quantities,
          subtotal: this.subtotal,
          serviceFee: this.serviceFee,
          total: this.totalPrice,
          eventSlug: this.slug,
          eventTitle: this.eventView?.title.valueForLocaleOrAutoFallback(this.currentLocale) || '',
          eventDate: this.eventDate,
          eventVenue: `${this.eventVenue}, ${this.eventCity}`
        })
        this.$router.push('/checkout')
      }
    },

    setupObserver () {
      const el = this.$refs.ticketSectionRef as HTMLElement | undefined
      if (!el) return

      this.observer = new IntersectionObserver(
        ([entry]) => {
          this.ticketsVisible = entry.isIntersecting
        },
        { threshold: 0.1 }
      )

      this.observer.observe(el)
    },

    teardownObserver () {
      if (this.observer) {
        this.observer.disconnect()
        this.observer = null
      }
    }
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
    color: var(--color-muted-foreground);
    font-size: 1.125rem;
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

