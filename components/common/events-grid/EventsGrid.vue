<template>
  <div class="EventsGrid">
    <EventCard
      v-for="event in events"
      :key="event.id.toString()"
      :event="event"
      :show-genres="showGenres"
      class="EventsGrid-item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { EventListView } from '../../../public-model/Event/EventListView'
import EventCard from '../event-card/EventCard.vue'

export default defineComponent({
  name: 'EventsGrid',

  components: {
    EventCard
  },

  props: {
    events: {
      type: Array as () => EventListView[],
      required: true
    },
    showGenres: {
      type: Boolean,
      required: false,
      default: true
    }
  }
})
</script>

<style lang="scss" scoped>
.EventsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  &-item {
    min-width: 0;
  }
}
</style>
