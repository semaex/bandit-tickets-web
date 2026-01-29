<template>
  <ArtistEventsPage :artist-id="artistId" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArtistEventsPage from '../../components/pages/artist-events/ArtistEventsPage.vue'

export default defineComponent({
  name: 'ArtistPage',

  components: {
    ArtistEventsPage
  },

  computed: {
    artistId (): string {
      return (this.$route.params.artistId as string) ?? ''
    }
  }
})
</script>
