<template>
  <MicrositeLayout>
    <div class="container ArtistEventsPage">
      <div v-if="pending" class="ArtistEventsPage-loading">
        <p>{{ trans('artistEventsPage.loading_events') }}</p>
      </div>
      <div v-else-if="error" class="ArtistEventsPage-error">
        <p>{{ error.message }}</p>
      </div>
      <template v-else>
        <header v-if="artist" class="ArtistEventsPage-hero">
          <div class="ArtistEventsPage-hero-image-wrap">
            <ArtistImage
              :image-url="artist.imageUrl ?? undefined"
              :alt="artist.name"
            />
          </div>
          <div class="ArtistEventsPage-hero-content">
            <h1 class="ArtistEventsPage-hero-title">{{ artist.name }}</h1>
            <div v-if="artist.musicGenres && artist.musicGenres.length" class="ArtistEventsPage-hero-genres">
              <GenreChip
                v-for="genre in artist.musicGenres.slice(0, 6)"
                :key="genre"
                :genre="genre"
                class="ArtistEventsPage-hero-genre"
              />
            </div>
            <p v-if="data !== null" class="ArtistEventsPage-hero-count">
              {{ trans('artistEventsPage.scheduled_events_count', { count: String(data.total) }) }}
            </p>
          </div>
        </header>
        <template v-if="data">
          <h2 class="ArtistEventsPage-title">{{ trans('artistEventsPage.upcoming_dates_title') }}</h2>
          <EventsGrid
            v-if="data.items.length"
            :events="data.items as EventListView[]"
            :show-genres="false"
            class="ArtistEventsPage-grid"
          />
          <p v-else class="ArtistEventsPage-empty">{{ trans('artistEventsPage.empty_state') }}</p>
        </template>
      </template>
    </div>
  </MicrositeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MicrositeLayout from '../../layout/microsite-layout/MicrositeLayout.vue'
import EventsGrid from '../../common/events-grid/EventsGrid.vue'
import ArtistImage from '../../common/artist-image/ArtistImage.vue'
import GenreChip from '../../common/genre-chip/GenreChip.vue'
import { findUpcomingEventsByArtist } from '../../../public-model/Event/EventView.services'
import type { Paginated } from '../../../shared/Pagination'
import type { EventListView } from '../../../public-model/Event/EventListView'
import { useAppLocale } from '../../../composables/useAppLocale'
import { translationService } from '../../../services/translation.service'
import artistEventsPageTranslations from './artist-events-page.i18n.json'

translationService.addTranslations('artistEventsPage', artistEventsPageTranslations)

export default defineComponent({
  name: 'ArtistEventsPage',

  components: {
    MicrositeLayout,
    EventsGrid,
    ArtistImage,
    GenreChip
  },

  props: {
    artistId: {
      type: String,
      required: true
    }
  },

  data () {
    const { trans } = useAppLocale()

    return {
      trans,
      artist: null as { id: string; name: string; slug: string; imageUrl: string | null; musicGenres: string[] } | null,
      data: null as Paginated<EventListView> | null,
      pending: true,
      error: null as Error | null
    }
  },

  mounted () {
    const artistPromise = $fetch<{ id: string; name: string; slug: string; imageUrl: string | null; musicGenres: string[] }>(`/api/artists/${this.artistId}`).catch(() => null)
    const eventsPromise = findUpcomingEventsByArtist(this.artistId, { page: 1, limit: 24 })

    Promise.all([artistPromise, eventsPromise])
      .then(([artist, eventsResult]) => {
        this.artist = artist ?? null
        this.data = eventsResult
        this.pending = false
      })
      .catch((err) => {
        this.error = err instanceof Error ? err : new Error(String(err))
        this.pending = false
      })
  }
})
</script>

<style lang="scss">
.ArtistEventsPage {

  &-hero {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: var(--spacing-xl);
    padding: var(--spacing-2xl) var(--spacing-lg);
    color: var(--color-foreground);

    &-image-wrap {
      position: relative;
      box-shadow: var(--shadow-md);
      border-radius: var(--radius-xl);
      overflow: hidden;
      width: 350px;
    }

    &-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      padding-top: var(--spacing-xs);
    }

    &-title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
      line-height: 1.2;
      color: var(--color-foreground);
    }

    &-genres {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
    }

    &-genre {
      flex-shrink: 0;

      .GenreChip {
        background-color: var(--color-N90);
        color: var(--color-foreground);
        border-radius: var(--radius-full);
      }
    }

    &-count {
      font-size: 0.9375rem;
      color: var(--color-muted-foreground);
      margin: 0;
    }
  }

  &-loading,
  &-error,
  &-empty {
    text-align: center;
    padding: var(--spacing-xl) var(--spacing-lg);
    color: var(--color-muted-foreground);
  }

  &-error p {
    color: var(--color-error);
  }

  &-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 var(--spacing-lg);
    padding: 0 var(--spacing-lg);
    color: var(--color-foreground);
  }

  &-grid {
    margin-top: 0;
    padding: 0 var(--spacing-lg) var(--spacing-lg);
  }

  &-empty {
    padding-left: var(--spacing-lg);
    padding-right: var(--spacing-lg);
  }
}

@media (max-width: 767.98px) {
  .ArtistEventsPage-hero {
    flex-direction: column;
    align-items: stretch;
  }

  .ArtistEventsPage-hero-image-wrap {
    max-width: 100%;
    width: 100%;
  }
}
</style>
