<template>
  <div class="EventInfo">
    <div class="EventInfo-item">
      <Icon name="calendar" size="md" color="var(--color-primary)" class="EventInfo-icon" />
      <span class="EventInfo-text EventInfo-text--bold">{{ date }}</span>
    </div>
    
    <div class="EventInfo-item">
      <Icon name="clock" size="md" color="var(--color-primary)" class="EventInfo-icon" />
      <span class="EventInfo-text">{{ time }}</span>
    </div>
    
    <div class="EventInfo-item">
      <Icon name="map-pin" size="md" color="var(--color-primary)" class="EventInfo-icon" />
      <div class="EventInfo-venue">
        <span class="EventInfo-text EventInfo-text--bold">{{ venue }}</span>
        <span class="EventInfo-separator"> · </span>
        <span class="EventInfo-text EventInfo-text--muted">{{ city }}</span>
        <template v-if="venueAddress">
          <span class="EventInfo-separator"> · </span>
          <span class="EventInfo-text EventInfo-text--muted EventInfo-text--small">{{ venueAddress }}</span>
        </template>
        <template v-if="venueGoogleMapsUrl">
          <span class="EventInfo-separator"> · </span>
          <a 
            :href="venueGoogleMapsUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="EventInfo-google-maps-link"
          >
            {{ trans('eventInfo.view_on_google_maps') }}
          </a>
        </template>
      </div>
    </div>
    
    <div class="EventInfo-item">
      <Icon name="user" size="md" color="var(--color-primary)" class="EventInfo-icon" />
      <span class="EventInfo-text EventInfo-text--muted EventInfo-text--small">
        {{ trans('eventInfo.organized_by') }} {{ promoter }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppLanguage } from '../../../composables/useAppLanguage'
import eventInfoTranslations from './event-info.i18n.json'
import { translationService } from '../../../services/translation.service'
import Icon from '../../ui/icon/Icon.vue'

// Load translations
translationService.addTranslations('eventInfo', eventInfoTranslations)

// Use translation composable
const { trans } = useAppLanguage()

interface Props {
  date: string
  time: string
  venue: string
  city: string
  venueAddress?: string
  venueGoogleMapsUrl?: string
  promoter: string
}

defineProps<Props>()
</script>

<style lang="scss">
.EventInfo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    color: var(--color-foreground);
  }

  &-icon {
    width: 20px;
    height: 20px;
    color: var(--color-primary);
    flex-shrink: 0;
  }

  &-text {
    font-size: 1rem;
    color: var(--color-foreground);

    &--bold {
      font-weight: 600;
    }

    &--muted {
      color: var(--color-muted-foreground);
    }

    &--small {
      font-size: 0.875rem;
    }
  }

  &-venue {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 0;
    line-height: 1.5;
  }

  &-separator {
    color: var(--color-muted-foreground);
    margin: 0 var(--spacing-xs);
  }

  &-google-maps-link {
    color: var(--color-primary);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color var(--transition-base);

    &:hover {
      color: var(--color-primary-hover);
      text-decoration: underline;
    }
  }
}
</style>

