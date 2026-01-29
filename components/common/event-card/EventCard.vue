<template>
  <NuxtLink :to="`/event/${event.slug}`" class="EventCard">
    <div class="EventCard-image-wrap">
      <img
        v-if="event.imageUrl"
        :src="event.imageUrl.toString()"
        :alt="eventTitle"
        class="EventCard-image"
      />
      <div v-else class="EventCard-image EventCard-image-placeholder" />
    </div>
    <div class="EventCard-body">
      <h3 class="EventCard-title">{{ eventTitle }}</h3>
      <p v-if="firstDateFormatted" class="EventCard-meta">
        <Icon name="calendar" size="sm" color="var(--color-primary)" class="EventCard-icon" />
        {{ firstDateFormatted }}
      </p>
      <p v-if="venueLine" class="EventCard-meta">
        <Icon name="map-pin" size="sm" color="var(--color-primary)" class="EventCard-icon" />
        {{ venueLine }}
      </p>
      <hr v-if="firstDateFormatted || venueLine || fromPriceText" class="EventCard-separator" />
      <p v-if="fromPriceText" class="EventCard-from">
        <span class="EventCard-from-label">{{ fromLabel }}</span>
        <span class="EventCard-from-price">{{ fromPriceFormatted }}</span>
      </p>
      <div v-if="showGenres && event.musicGenres.length" class="EventCard-genres">
        <GenreChip
          v-for="genre in event.musicGenres.slice(0, 3)"
          :key="genre"
          :genre="genre"
          class="EventCard-genre"
        />
      </div>
      <span v-if="event.isSoldOut" class="EventCard-soldout">Sold out</span>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import { defineComponent, type Ref } from 'vue'
import type { EventListView } from '../../../public-model/Event/EventListView'
import { useAppLocale } from '../../../composables/useAppLocale'
import { Locale } from '../../../shared/Locale'
import GenreChip from '../genre-chip/GenreChip.vue'
import Icon from '../../ui/icon/Icon.vue'

export default defineComponent({
  name: 'EventCard',

  components: {
    GenreChip,
    Icon
  },

  props: {
    event: {
      type: Object as () => EventListView,
      required: true
    },
    showGenres: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  computed: {
    eventTitle (): string {
      const { appLocale } = useAppLocale()
      const locale = (appLocale as Ref<string>).value ?? 'es-ES'
      return this.event.title.valueForLocaleOrAutoFallback(Locale.fromString(locale)) ?? ''
    },

    firstDateFormatted (): string | null {
      const first = this.event.dates[0]
      if (!first) return null
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
        timeZone: 'UTC'
      }).format(first)
    },

    venueLine (): string | null {
      if (!this.event.venue) return null
      const parts = [this.event.venue.name, this.event.venue.city].filter(Boolean)
      return parts.length ? parts.join(', ') : null
    },

    fromPriceText (): string | null {
      if (this.event.isSoldOut) return null
      if (!this.event.fromPrice) return null
      return `Desde ${this.event.fromPrice.formatted()}`
    },

    fromLabel (): string {
      return 'Desde'
    },

    fromPriceFormatted (): string | null {
      if (this.event.isSoldOut) return null
      if (!this.event.fromPrice) return null
      return this.event.fromPrice.formatted()
    }
  }
})
</script>

<style lang="scss" scoped>
.EventCard {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--color-foreground);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-card);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-base), box-shadow var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &-wrap {
      aspect-ratio: 16 / 10;
      overflow: hidden;
      border-top-left-radius: var(--radius-lg);
      border-top-right-radius: var(--radius-lg);
    }

    &-placeholder {
      background: var(--color-border);
    }
  }

  &-body {
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &-title {
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
    color: var(--color-foreground);
  }

  &-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin: 0;
  }

  &-icon {
    flex-shrink: 0;
    color: var(--color-primary);
  }

  &-separator {
    border: none;
    border-top: 1px solid var(--color-border);
    margin: var(--spacing-xs) 0;
  }

  &-from {
    font-size: 0.875rem;
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
  }

  &-from-label {
    font-weight: 400;
    color: var(--color-muted-foreground);
  }

  &-from-price {
    font-weight: 700;
    color: var(--color-foreground);
  }

  &-genres {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }

  &-genre {
    flex-shrink: 0;
  }

  &-soldout {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-error);
    margin-top: auto;
  }
}
</style>
