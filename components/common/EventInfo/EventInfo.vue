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

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppLocale } from '../../../composables/useAppLocale'
import eventInfoTranslations from './event-info.i18n.json'
import { translationService } from '../../../services/translation.service'
import Icon from '../../ui/icon/Icon.vue'

translationService.addTranslations('eventInfo', eventInfoTranslations)

export default defineComponent({
  name: 'EventInfo',

  components: {
    Icon
  },

  props: {
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    venueAddress: { type: String, required: false, default: undefined },
    venueGoogleMapsUrl: { type: String, required: false, default: undefined },
    promoter: { type: String, required: true }
  },

  data () {
    const { trans } = useAppLocale()

    return {
      trans
    }
  }
})
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
